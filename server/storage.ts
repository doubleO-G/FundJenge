import {
  type Donation,
  type InsertDonation,
  type BuilderPledge,
  type InsertBuilderPledge,
  type Inquiry,
  type InsertInquiry,
  type Story,
  type InsertStory,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Donations
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonation(id: string): Promise<Donation | undefined>;
  getDonationByReference(reference: string): Promise<Donation | undefined>;
  updateDonationStatus(id: string, status: string): Promise<Donation>;
  updateDonationReference(id: string, reference: string): Promise<Donation>;
  getAllDonations(): Promise<Donation[]>;
  getDonationStats(): Promise<{ total: number; pledged: number; builders: number }>;

  // Builder Pledges
  createBuilderPledge(pledge: InsertBuilderPledge): Promise<BuilderPledge>;
  getBuilderPledge(id: string): Promise<BuilderPledge | undefined>;
  getAllBuilderPledges(): Promise<BuilderPledge[]>;

  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getAllInquiries(): Promise<Inquiry[]>;

  // Stories
  createStory(story: InsertStory): Promise<Story>;
  getAllStories(): Promise<Story[]>;
}

export class MemStorage implements IStorage {
  private donations: Map<string, Donation>;
  private builderPledges: Map<string, BuilderPledge>;
  private inquiries: Map<string, Inquiry>;
  private stories: Map<string, Story>;

  constructor() {
    this.donations = new Map();
    this.builderPledges = new Map();
    this.inquiries = new Map();
    this.stories = new Map();

    // Seed some initial data
    this.seedInitialData();
  }

  private seedInitialData() {
    // Add some sample donations to show progress
    const sampleDonations: Donation[] = [
      {
        id: randomUUID(),
        donorName: "Jane Kamau",
        donorEmail: "jane@example.com",
        amount: 25000,
        donationType: "builder",
        builderTier: "palladium",
        isRecurring: true,
        paystackReference: "ref_001",
        status: "success",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        donorName: "David Ochieng",
        donorEmail: "david@example.com",
        amount: 10000,
        donationType: "builder",
        builderTier: "gold",
        isRecurring: true,
        paystackReference: "ref_002",
        status: "success",
        createdAt: new Date(),
      },
    ];

    sampleDonations.forEach(donation => this.donations.set(donation.id, donation));
  }

  // Donations
  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = randomUUID();
    const donation: Donation = {
      ...insertDonation,
      id,
      createdAt: new Date(),
    };
    this.donations.set(id, donation);
    return donation;
  }

  async getDonation(id: string): Promise<Donation | undefined> {
    return this.donations.get(id);
  }

  async getDonationByReference(reference: string): Promise<Donation | undefined> {
    return Array.from(this.donations.values()).find(
      (donation) => donation.paystackReference === reference
    );
  }

  async updateDonationStatus(id: string, status: string): Promise<Donation> {
    const donation = this.donations.get(id);
    if (!donation) throw new Error("Donation not found");
    
    const updated = { ...donation, status };
    this.donations.set(id, updated);
    return updated;
  }

  async updateDonationReference(id: string, reference: string): Promise<Donation> {
    const donation = this.donations.get(id);
    if (!donation) throw new Error("Donation not found");
    
    const updated = { ...donation, paystackReference: reference };
    this.donations.set(id, updated);
    return updated;
  }

  async getAllDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }

  async getDonationStats(): Promise<{ total: number; pledged: number; builders: number }> {
    const allDonations = Array.from(this.donations.values());
    const successfulDonations = allDonations.filter(d => d.status === 'success');
    
    const pledged = successfulDonations.reduce((sum, d) => sum + d.amount, 0);
    const builders = new Set(
      successfulDonations
        .filter(d => d.donationType === 'builder')
        .map(d => d.donorEmail)
    ).size;

    return {
      total: successfulDonations.length,
      pledged,
      builders,
    };
  }

  // Builder Pledges
  async createBuilderPledge(insertPledge: InsertBuilderPledge): Promise<BuilderPledge> {
    const id = randomUUID();
    const pledge: BuilderPledge = {
      ...insertPledge,
      id,
      createdAt: new Date(),
    };
    this.builderPledges.set(id, pledge);
    return pledge;
  }

  async getBuilderPledge(id: string): Promise<BuilderPledge | undefined> {
    return this.builderPledges.get(id);
  }

  async getAllBuilderPledges(): Promise<BuilderPledge[]> {
    return Array.from(this.builderPledges.values());
  }

  // Inquiries
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = {
      ...insertInquiry,
      id,
      createdAt: new Date(),
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  // Stories
  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = randomUUID();
    const story: Story = {
      ...insertStory,
      id,
      createdAt: new Date(),
    };
    this.stories.set(id, story);
    return story;
  }

  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values());
  }
}

export const storage = new MemStorage();
