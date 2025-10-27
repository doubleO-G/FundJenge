import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Donation schema for tracking all donations
export const donations = pgTable("donations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  donorName: text("donor_name").notNull(),
  donorEmail: text("donor_email").notNull(),
  amount: integer("amount").notNull(), // Amount in KES
  donationType: text("donation_type").notNull(), // 'builder', 'program', 'operations', 'partner'
  builderTier: text("builder_tier"), // 'palladium', 'platinum', 'gold', 'diamond', 'silver', 'bronze'
  isRecurring: boolean("is_recurring").default(false),
  paystackReference: text("paystack_reference"),
  status: text("status").notNull().default('pending'), // 'pending', 'success', 'failed'
  createdAt: timestamp("created_at").defaultNow(),
});

// Builder pledges for long-term commitments
export const builderPledges = pgTable("builder_pledges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  donorName: text("donor_name").notNull(),
  donorEmail: text("donor_email").notNull(),
  builderTier: text("builder_tier").notNull(),
  annualAmount: integer("annual_amount").notNull(),
  yearsCommitted: integer("years_committed").default(15),
  totalPledged: integer("total_pledged").notNull(),
  paystackReference: text("paystack_reference"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact inquiries
export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  inquiryType: text("inquiry_type").default('general'), // 'general', 'partnership', 'builder'
  createdAt: timestamp("created_at").defaultNow(),
});

// Impact stories
export const stories = pgTable("stories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  imageUrl: text("image_url"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas and types
export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  createdAt: true,
});

export const insertBuilderPledgeSchema = createInsertSchema(builderPledges).omit({
  id: true,
  createdAt: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export const insertStorySchema = createInsertSchema(stories).omit({
  id: true,
  createdAt: true,
});

export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;

export type InsertBuilderPledge = z.infer<typeof insertBuilderPledgeSchema>;
export type BuilderPledge = typeof builderPledges.$inferSelect;

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;

export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;

// Builder tier configuration
export const builderTiers = {
  palladium: {
    name: 'Palladium Rock Builders',
    annualAmount: 25000,
    color: 'from-purple-400 to-purple-600',
    icon: 'Palladium_1761595836748.png',
  },
  platinum: {
    name: 'Platinum Rock Builders',
    annualAmount: 20000,
    color: 'from-cyan-400 to-cyan-600',
    icon: 'Platinum_1761595836748.png',
  },
  gold: {
    name: 'Gold Rock Builders',
    annualAmount: 10000,
    color: 'from-yellow-400 to-yellow-600',
    icon: 'Gold_1761595836750.png',
  },
  diamond: {
    name: 'Diamond Rock Builders',
    annualAmount: 5000,
    color: 'from-blue-400 to-blue-600',
    icon: 'Diamond_1761595836749.png',
  },
  silver: {
    name: 'Silver Rock Builders',
    annualAmount: 2000,
    color: 'from-gray-300 to-gray-500',
    icon: 'Silver_1761595836747.png',
  },
  bronze: {
    name: 'Bronze Rock Builders',
    annualAmount: 1000,
    color: 'from-orange-400 to-orange-600',
    icon: 'Bronze_1761595836750.png',
  },
} as const;

export type BuilderTierKey = keyof typeof builderTiers;
