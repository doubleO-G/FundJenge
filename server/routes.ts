import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDonationSchema, insertBuilderPledgeSchema, insertInquirySchema, builderTiers } from "@shared/schema";
import Parser from 'rss-parser';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Paystack payment
  app.post("/api/donations/initialize", async (req, res) => {
    try {
      if (!PAYSTACK_SECRET_KEY) {
        return res.status(500).json({
          success: false,
          message: 'Payment service is not configured. Please contact support.',
        });
      }

      const validatedData = insertDonationSchema.parse(req.body);
      
      // Create donation record
      const donation = await storage.createDonation({
        ...validatedData,
        status: 'pending',
      });

      // Calculate amount in kobo (Paystack uses smallest currency unit)
      const amountInKobo = validatedData.amount * 100;

      // Generate unique reference
      const reference = `JENGE_${donation.id}_${Date.now()}`;

      // Initialize Paystack transaction
      const paystackResponse = await fetch(
        `${PAYSTACK_BASE_URL}/transaction/initialize`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: validatedData.donorEmail,
            amount: amountInKobo,
            reference,
            callback_url: `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000'}/api/donations/verify`,
            metadata: {
              donationId: donation.id,
              donorName: validatedData.donorName,
              donationType: validatedData.donationType,
              builderTier: validatedData.builderTier,
              isRecurring: validatedData.isRecurring,
            },
          }),
        }
      );

      if (!paystackResponse.ok) {
        throw new Error(`Paystack API error: ${paystackResponse.statusText}`);
      }

      const paystackData = await paystackResponse.json();

      // Update donation with Paystack reference (fix: don't create twice, update existing)
      const updatedDonation = await storage.updateDonationReference(donation.id, reference);

      res.json({
        success: true,
        donationId: updatedDonation.id,
        authorizationUrl: paystackData.data.authorization_url,
        reference: reference,
      });
    } catch (error: any) {
      console.error('Payment initialization error:', error.message);
      res.status(500).json({
        success: false,
        message: error.message || 'Error initializing payment',
      });
    }
  });

  // Verify Paystack payment
  app.get("/api/donations/verify", async (req, res) => {
    try {
      if (!PAYSTACK_SECRET_KEY) {
        return res.redirect('/?payment=failed');
      }

      const { reference } = req.query;

      if (!reference || typeof reference !== 'string') {
        return res.redirect('/?payment=failed');
      }

      // Verify transaction with Paystack
      const paystackResponse = await fetch(
        `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      if (!paystackResponse.ok) {
        throw new Error(`Paystack verification error: ${paystackResponse.statusText}`);
      }

      const paystackData = await paystackResponse.json();
      const { status, metadata } = paystackData.data;

      // Find donation by reference
      const donation = await storage.getDonationByReference(reference);

      if (!donation) {
        return res.redirect('/?payment=failed');
      }

      if (status === 'success') {
        // Update donation status
        await storage.updateDonationStatus(donation.id, 'success');

        // If it's a builder pledge, create the pledge record
        if (metadata.isRecurring && metadata.builderTier) {
          const tier = builderTiers[metadata.builderTier as keyof typeof builderTiers];
          await storage.createBuilderPledge({
            donorName: metadata.donorName,
            donorEmail: donation.donorEmail,
            builderTier: metadata.builderTier,
            annualAmount: tier.annualAmount,
            yearsCommitted: 15,
            totalPledged: tier.annualAmount * 15,
            paystackReference: reference,
          });
        }

        return res.redirect('/?payment=success');
      } else {
        await storage.updateDonationStatus(donation.id, 'failed');
        return res.redirect('/?payment=failed');
      }
    } catch (error: any) {
      console.error('Payment verification error:', error.message);
      res.redirect('/?payment=failed');
    }
  });

  // Get campaign statistics
  app.get("/api/campaign/stats", async (_req, res) => {
    try {
      const stats = await storage.getDonationStats();
      
      // Add campaign goal and deadline
      const campaignData = {
        pledged: stats.pledged + 1520000, // Add initial pledged amount
        goal: 20000000, // Milestone 1 goal
        builders: stats.builders + 25, // Add initial builders
        deadline: new Date('2027-12-31').toISOString(),
      };

      res.json(campaignData);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching campaign stats' });
    }
  });

  // Get all donations (for admin purposes)
  app.get("/api/donations", async (_req, res) => {
    try {
      const donations = await storage.getAllDonations();
      res.json(donations);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching donations' });
    }
  });

  // Create inquiry
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.json({ success: true, inquiry });
    } catch (error: any) {
      res.status(400).json({ message: 'Invalid inquiry data', error: error.message });
    }
  });

  // Get all inquiries
  app.get("/api/inquiries", async (_req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching inquiries' });
    }
  });

  // Get all builder pledges
  app.get("/api/builder-pledges", async (_req, res) => {
    try {
      const pledges = await storage.getAllBuilderPledges();
      res.json(pledges);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching builder pledges' });
    }
  });

  // Get all stories
  app.get("/api/stories", async (_req, res) => {
    try {
      const stories = await storage.getAllStories();
      res.json(stories);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching stories' });
    }
  });

  // Get latest Medium stories
  app.get("/api/medium-stories", async (_req, res) => {
    try {
      const parser = new Parser({
        customFields: {
          item: ['content:encoded', 'description']
        }
      });
      const feed = await parser.parseURL('https://medium.com/feed/jengestories');
      
      // Helper function to extract text from HTML
      const extractText = (html: string): string => {
        if (!html) return '';
        // Remove HTML tags and decode entities
        const text = html
          .replace(/<[^>]*>/g, ' ')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/\s+/g, ' ')
          .trim();
        return text.substring(0, 250) + (text.length > 250 ? '...' : '');
      };
      
      // Get latest 3 stories
      const latestStories = feed.items.slice(0, 3).map(item => {
        const content = (item as any)['content:encoded'] || item.content || item.description || '';
        return {
          title: item.title || '',
          excerpt: extractText(content),
          link: item.link || '',
          pubDate: item.pubDate || '',
          thumbnail: content.match(/<img[^>]+src="([^">]+)"/)?.[1] || '',
        };
      });

      res.json({ success: true, stories: latestStories });
    } catch (error: any) {
      console.error('Error fetching Medium stories:', error.message);
      res.status(500).json({ 
        success: false, 
        message: 'Error fetching Medium stories',
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
