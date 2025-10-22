# JENGE Impact Fund Donation Platform - Design Guidelines

## Design Approach: Reference-Based (New Story Homes Inspired)

Drawing inspiration from New Story Homes' professional, impact-focused aesthetic while incorporating Kenya-specific visual identity and cultural elements.

### Design Principles
1. **Trust & Transparency**: Clean, professional design that conveys organizational credibility
2. **Emotional Connection**: Compelling imagery showcasing real youth impact and solidarity
3. **Clarity of Action**: Clear pathways to donate with immediate understanding of impact
4. **African Pride**: Incorporate Kenya-specific colors, patterns, and cultural elements

## Core Design Elements

### A. Color Palette

**Primary Colors (Kenya Flag Inspired)**
- Deep Green: 145 40% 25% (primary brand, headers, CTAs)
- Warm Red: 0 75% 45% (accents, urgency indicators)
- Rich Black: 0 0% 10% (text, backgrounds)
- Clean White: 0 0% 98% (backgrounds, cards)

**Supporting Colors**
- Golden Yellow: 45 90% 55% (achievement badges, tier highlights)
- Earth Brown: 30 30% 35% (grounding elements, secondary text)
- Soft Cream: 40 40% 95% (subtle backgrounds, card variations)

**Dark Mode Palette**
- Background: 0 0% 8%
- Card Background: 0 0% 12%
- Text Primary: 0 0% 95%
- Border Subtle: 0 0% 20%

### B. Typography

**Font Stack**
- **Primary**: "Inter" (Google Fonts) - Clean, modern sans-serif for UI elements, navigation, and body text
- **Display**: "Playfair Display" (Google Fonts) - Elegant serif for hero headlines and impact statistics
- **Accent**: "Inter" medium/semibold for builder tier names and key metrics

**Hierarchy**
- Hero Headlines: Playfair Display, 4xl-6xl, font-bold (responsive)
- Section Headers: Inter, 3xl-4xl, font-semibold
- Card Titles: Inter, xl-2xl, font-medium
- Body Text: Inter, base-lg, font-normal, leading-relaxed
- Impact Numbers: Playfair Display, 5xl-7xl, font-bold
- Captions: Inter, sm, font-normal

### C. Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 consistently
- Micro spacing (between elements): 4, 6
- Standard spacing (cards, sections): 8, 12, 16
- Large spacing (section padding): 20, 24
- Extra-large (hero sections): 32

**Grid System**
- Container: max-w-7xl for main content sections
- Content max-width: max-w-6xl for reading-focused sections
- Card grids: 3 columns desktop (lg:grid-cols-3), 2 tablet (md:grid-cols-2), 1 mobile
- Asymmetric layouts for visual interest in impact stories section

**Responsive Breakpoints**
- Mobile: Default styles
- Tablet: md: (768px+)
- Desktop: lg: (1024px+)
- Large Desktop: xl: (1280px+)

### D. Component Library

**Navigation**
- Sticky header with logo left, navigation center, "Donate Now" CTA right
- Transparent on hero with blur backdrop, white on scroll
- Mobile: Hamburger menu with slide-in drawer
- Include progress indicator showing campaign milestone achievement

**Hero Section**
- Full-width hero (h-screen or min-h-[600px])
- Large background image (Kenya youth working together, creative sector activity)
- Overlay gradient: from-black/60 to-black/30
- Centered content with large headline, supporting text, dual CTAs
- Campaign progress bar prominently displayed with live countdown timer

**Builder Tier Cards**
- 6 cards in responsive grid (2x3 desktop, 2x3 tablet, 1x6 mobile)
- Each card: Tier name with icon, annual amount (large), 15-year total, key benefits list
- Distinct colors per tier: Palladium (platinum gray), Platinum (silver), Gold (golden), Diamond (crystal blue), Silver (light gray), Bronze (copper)
- Hover effect: subtle scale and shadow increase
- "Commit Now" button prominent at bottom

**Donation Pathway Cards**
- Large feature cards (similar to New Story's "Choose your giving journey")
- 3 options displayed prominently: Become a Builder, Fund a Program, Partner With Us
- Each with: compelling image, title, description, commitment details, CTA button
- Side-by-side layout on desktop, stacked on mobile

**Statistics Display**
- Large numbers (using Playfair Display) with supporting text
- Grid layout: 4 stats across (75% youth, 67% unemployment, 703K jobs, 5% GDP)
- Animated count-up on scroll into view
- Icons for each statistic (youth icon, chart decline, briefcase, percentage)

**Impact Stories Section**
- Masonry-style or card grid layout
- Each story: Large hero image, excerpt text, "Read More" link
- Showcase real Kenya youth success stories
- Quote pull-outs with large typography

**Campaign Progress Tracker**
- Prominent bar showing KES 1,520,000 pledged of KES 20M Milestone 1
- Percentage completion, amount raised, goal amount
- Visual milestone markers (showing all 60 milestones pathway to KES 1.2B)
- Countdown timer to campaign deadline

**SESS Impact Model Diagram**
- Visual representation of Solidarity, Enterprise, Sustainability, Systems
- Circular or interconnected design showing relationship
- Icons for each pillar with brief description
- Can be interactive (click to expand details)

**Forms**
- Clean, minimal design with clear labels
- Donation amount selector: preset amounts + custom input
- Builder tier selection dropdown
- Payment integration (Stripe) with secure badge
- Multi-step form for larger commitments with progress indicator

**Footer**
- Comprehensive with: About JENGE, Quick Links, Contact Info, Social Media
- Newsletter signup section
- Trust indicators (registration numbers, transparency commitments)
- Kenya-inspired pattern or subtle graphic element

### E. Imagery Strategy

**Required Images:**

1. **Hero Section**: Large, inspiring image of Kenyan youth collaborating in creative workspace or solidarity enterprise setting. Should show diversity, energy, and hope. Full-width, high-quality.

2. **Donation Pathway Cards**: 
   - Builder card: Hands stacking/building together
   - Fund a Program: Youth in workshop/training setting
   - Partner card: Handshake or partnership visual

3. **Impact Stories**: 4-6 authentic photos of JENGE beneficiaries in their work environments, showing real results

4. **Statistics Section**: Background image of Kenya creative sector (can be subtle, with overlay)

5. **About/Mission Section**: Community gathering or youth empowerment event

6. **Testimonial/Social Proof**: Headshots of builders or beneficiaries with quotes

**Image Treatment:**
- Warm color grading favoring earth tones and Kenya's natural palette
- Authentic, documentary-style photos (not overly staged)
- High contrast for impact, subtle vignettes on hero images
- Ensure diverse representation of Kenya's youth

### F. Animations & Interactions

**Minimal, Purposeful Animations:**
- Progress bar fill animation on page load
- Count-up animation for statistics on scroll
- Smooth scroll to sections
- Card hover: transform scale(1.02) with shadow increase
- Button hover: subtle color shift, no dramatic effects
- Page transitions: simple fade

**Interaction Patterns:**
- Sticky navigation with color change on scroll
- FAQ accordion expand/collapse
- Donation amount button selection (active state highlight)
- Mobile menu slide-in drawer

### G. Accessibility & Dark Mode

**Dark Mode Implementation:**
- Toggle in navigation (sun/moon icon)
- All text maintains WCAG AA contrast ratios
- Images slightly dimmed with overlay in dark mode
- Card backgrounds: subtle dark gray (not pure black)
- Green and red colors adjusted for dark mode visibility
- Form inputs with proper dark backgrounds and borders

**Accessibility:**
- All interactive elements keyboard navigable
- Focus states clearly visible (ring-2 ring-green-500)
- Alt text for all images describing Kenya context
- ARIA labels for icon buttons
- Skip to main content link

## Page Structure

### Home Page Sections (in order):
1. Hero with campaign headline, progress bar, CTAs
2. Three donation pathways (large feature cards)
3. Builder tier showcase (6-card grid)
4. Impact statistics (4 key numbers)
5. SESS Model explanation (visual diagram)
6. Impact stories (masonry or card grid)
7. FAQ accordion
8. Contact/inquiry form
9. Footer with comprehensive links

### Visual Flow:
- Start with emotional impact (hero image + mission)
- Immediately show pathways to give
- Build credibility with statistics and model
- Inspire with real stories
- Remove barriers with FAQ
- Close with clear contact options

**Key Differentiators from New Story:**
- Kenya flag colors prominently featured
- African visual patterns as subtle design elements
- Youth-focused imagery (not housing, but employment/creativity)
- 15-year builder commitment emphasis
- Campaign milestone tracking prominent throughout