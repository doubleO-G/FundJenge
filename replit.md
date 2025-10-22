# JENGE Impact Fund - WE BUILD Campaign Platform

## Overview
Professional donation platform for JENGE Impact Fund, a Kenyan youth employment endowment fund. The platform supports the "WE BUILD" campaign aiming to raise KES 1.2 billion over 15 years by mobilizing 55,000 "builders" to support solidarity-driven enterprises in Kenya's creative sector.

## Tech Stack
- **Frontend**: React + TypeScript + Wouter (routing) + TailwindCSS + Shadcn UI
- **Backend**: Express.js + TypeScript
- **Payment**: Paystack (supports African payment methods)
- **Storage**: In-memory (MemStorage) for MVP
- **Design**: Kenya flag-inspired colors (deep green #1B4332, warm red #D32F2F)

## Application Structure

### Pages
1. **Home (/)** - Landing page with:
   - Hero section with campaign progress tracker
   - 3 donation pathway cards (One-Time, Become a Builder, Partner with Us)
   - 6 builder tier cards (Palladium 25K, Platinum 20K, Gold 10K, Diamond 5K, Silver 2K, Bronze 1K)
   - Statistics showcase
   - SESS model diagram
   - Impact stories
   - FAQ section
   - Contact form

2. **About (/about)** - Mission and campaign details:
   - JENGE mission
   - SESS model explanation
   - WE BUILD campaign overview
   - Kenya creative sector context

3. **Donate (/donate)** - Payment page:
   - Donation type selection (one-time vs builder)
   - Builder tier selection
   - Donor information form
   - Paystack payment integration

### Key Features
- **Campaign Progress Tracker**: Shows KES 1,520,000 pledged of KES 20M Milestone 1 goal with countdown timer
- **Builder Tiers**: 6 annual commitment tiers from Bronze (1K) to Palladium (25K) for 15 years
- **Paystack Integration**: Initialize payment → verify callback → update donation status
- **Dark Mode**: Full support with theme toggle
- **Responsive Design**: Mobile-first approach

### Payment Flow
1. User fills donation form on /donate page
2. Frontend calls POST /api/donations/initialize
3. Backend creates donation record and calls Paystack API
4. Backend updates donation with Paystack reference
5. User redirected to Paystack payment page
6. Paystack calls GET /api/donations/verify callback
7. Backend verifies with Paystack and updates status
8. For builder tiers: creates pledge record
9. User redirected to home with success/failure message

### API Endpoints
- `POST /api/donations/initialize` - Initialize Paystack payment
- `GET /api/donations/verify` - Verify Paystack callback
- `GET /api/campaign/stats` - Get campaign statistics
- `POST /api/inquiries` - Submit contact form
- `GET /api/stories` - Get impact stories

### Design Guidelines
- Colors defined in design_guidelines.md
- Kenya-inspired visual identity
- Professional nonprofit aesthetic
- High contrast for accessibility
- Consistent spacing and typography

## Current Status
✅ All pages implemented and styled
✅ Paystack integration working correctly
✅ Campaign progress tracking functional
✅ Builder tier system implemented
✅ Contact form operational
✅ Dark mode fully supported
✅ Architect approved implementation
