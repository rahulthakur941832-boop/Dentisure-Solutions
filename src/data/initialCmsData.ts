import { CmsData } from '../types';
import {
  BRAND,
  HERO_OPTIONS,
  WHY_CHOOSE_ITEMS,
  SOLUTION_PILLARS,
  PRICING_TIERS,
  TESTIMONIALS,
  FAQ_BANK,
  RESOURCE_ARTICLES,
} from './contentData';

export const INITIAL_CMS_DATA: CmsData = {
  brand: {
    name: BRAND.name,
    legalEntityName: BRAND.legalEntityName,
    tagline: BRAND.tagline,
    contactEmail: BRAND.contactEmail,
    inquiriesEmail: BRAND.inquiriesEmail,
    phone: BRAND.phone,
    phoneDirect: BRAND.phoneDirect,
    address: BRAND.address,
    usBusinessAddress: BRAND.usBusinessAddress,
    mailingAddress: BRAND.mailingAddress,
    billingAddress: BRAND.billingAddress,
    businessSetupType: BRAND.businessSetupType,
    einTaxIdNotice: BRAND.einTaxIdNotice,
    hours: BRAND.hours,
  },

  header: {
    topNotice: 'Encrypted Remote VPN Dental RCM — Nationwide Coverage Across All 50 US States',
    topNoticeBadge: 'Live Operations',
    phoneLabel: 'Practice Advisory Desk:',
    auditButtonText: 'Free Revenue Audit',
    portalLinkText: 'Admin CMS Portal',
  },

  topTickerItems: [
    { category: 'Insurance Verification', title: '72-Hour Pre-Visit Breakdown Entered Directly in Your PMS', badge: 'Active' },
    { category: 'Claim Scrubbing', title: 'Clean Submissions with Tooth-Specific Radiographs & Narratives', badge: 'Active' },
    { category: 'Payment Posting', title: 'Daily Line-Item Reconciliation of EFTs, ERAs & Checks', badge: 'Active' },
    { category: 'Denial Appeals', title: '88% Overturned Appeals on Crowns, Perio & Surgical Procedures', badge: 'Active' },
    { category: 'Aging Recovery', title: 'Zero Unworked Claims Over 30 Days — Disciplined 14-Day Cycle', badge: 'Active' },
  ],

  hero: {
    badge: 'Dedicated Dental Billing & Revenue Cycle Specialists',
    headline: 'Dental Billing, Perfected.',
    highlightText: 'Your Certainty in Dental Revenue.',
    subheadline: 'We connect directly to Dentrix, Eaglesoft, Open Dental, or Curve via encrypted HIPAA-ready remote VPN. Capture every dollar your practice earns without front-desk hold times or insurance chaos.',
    primaryCtaText: 'Request Free Revenue Audit',
    secondaryCtaText: 'Explore Claim Solutions',
    phoneNotice: 'Or speak directly with a dental billing coordinator:',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&auto=format&fit=crop&q=80',
    stat1Value: '98%+',
    stat1Label: 'First-Pass Clean Claim Acceptance',
    stat2Value: '<10%',
    stat2Label: 'Claims Remaining in 90+ Day Aging',
    stat3Value: '72 Hrs',
    stat3Label: 'Pre-Visit Eligibility Verified & Charted',
    trustCardBadge: 'HIPAA-Ready Architecture & BAA Execution',
  },

  secondarySlider: [
    {
      id: 'sl-1',
      category: 'PMS Integration',
      title: 'Direct Dentrix & Eaglesoft Remote Access',
      desc: 'No duplicate data entry. We work directly inside your practice management software.',
    },
    {
      id: 'sl-2',
      category: 'Verification SOP',
      title: '23-Point Insurance Verification Breakdown',
      desc: 'Full deductibles, remaining maximums, frequency limits, and history entered 72h prior.',
    },
    {
      id: 'sl-3',
      category: 'Claims Scrubbing',
      title: 'Daily Clean Electronic Submissions',
      desc: 'Intraoral photos, perio charts, and doctor clinical narratives attached before batch transmit.',
    },
    {
      id: 'sl-4',
      category: 'Denial Recovery',
      title: 'Aggressive Appeals on Unjustified Denials',
      desc: '88% overturn rate on crown downgrades, surgical extractions, and periodontal coding.',
    },
    {
      id: 'sl-5',
      category: 'Payment Posting',
      title: 'Line-Item Tooth Reconciliation & EOB Balancing',
      desc: 'Every EFT, ERA, and insurance check posted and balanced against bank deposits daily.',
    },
    {
      id: 'sl-6',
      category: 'AR Management',
      title: '14-Day Systematic Touch Cycle on Aging Balances',
      desc: 'Zero claims forgotten or written off due to timely filing deadlines.',
    },
  ],

  trustMetrics: [
    {
      id: 'tm-1',
      value: '98%+',
      label: 'Clean Claim First-Pass Rate',
      subtext: 'Scrubbed against payer clearinghouse edits before transmission',
    },
    {
      id: 'tm-2',
      value: '<10%',
      label: 'AR Over 90 Days',
      subtext: 'Compared to the national dental average of 25–35%',
    },
    {
      id: 'tm-3',
      value: '20+ Hrs',
      label: 'Weekly Front-Desk Time Saved',
      subtext: 'Staff freed from hold times to focus on patient case acceptance',
    },
    {
      id: 'tm-4',
      value: '100%',
      label: 'Dedicated Billing Specialists',
      subtext: 'Assigned dental revenue cycle coordinator for your specific practice',
    },
  ],

  photoShowcase: {
    title: 'Real Dental Teams. Verified Clinical Outcomes.',
    subtitle: 'See how leading solo, pediatric, and group practices across the United States run smoother, higher-margin operations with DentiSure.',
    items: [
      {
        id: 'ps-1',
        title: 'Austin General & Family Dentistry',
        doctorName: 'Dr. Michael Chen, DDS',
        role: 'Practice Owner (4 Operatories)',
        clinic: 'Westlake Family Dental',
        location: 'Austin, TX',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80',
        tag: '$64,000 Recovered in 60 Days',
      },
      {
        id: 'ps-2',
        title: 'Sonoma Smiles & Implant Center',
        doctorName: 'Dr. Sarah Jenkins, DMD',
        role: 'Managing Partner',
        clinic: 'Sonoma Smiles Dentistry',
        location: 'Santa Rosa, CA',
        image: 'https://images.unsplash.com/photo-1594824813580-f094a97491cf?w=800&auto=format&fit=crop&q=80',
        tag: '22 Hours Saved Weekly',
      },
      {
        id: 'ps-3',
        title: 'North Texas Periodontics & Surgery',
        doctorName: 'Dr. Robert Vance, DDS',
        role: 'Founder & Periodontist',
        clinic: 'North Texas Periodontics',
        location: 'Plano, TX',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&auto=format&fit=crop&q=80',
        tag: '98.4% Clean First-Pass Rate',
      },
    ],
  },

  whyChoose: {
    badge: 'Why Dental Practices Choose DentiSure',
    title: 'Engineered Specifically for Modern Dental Practices',
    subtitle: 'We are not a generic medical billing company trying to do dental. Dental billing is our only focus.',
    items: WHY_CHOOSE_ITEMS.map((item, idx) => ({
      id: `wc-${idx + 1}`,
      num: item.num,
      title: item.title,
      description: item.description,
      benefit: item.benefit,
    })),
  },

  services: {
    title: 'Comprehensive Dental Revenue Cycle Management',
    subtitle: 'From the moment a patient schedules until the final dollar is deposited in your bank, we manage the entire lifecycle.',
    pillars: SOLUTION_PILLARS,
  },

  pricing: {
    title: 'Transparent, Performance-Aligned Pricing',
    subtitle: 'No hidden setup penalties, no software fees, and no restrictive multi-year contracts. We only win when you collect.',
    guaranteeText: '30-Day Risk-Free Performance Guarantee on all Full Revenue Cycle contracts.',
    tiers: PRICING_TIERS,
  },

  testimonials: TESTIMONIALS,

  faqs: FAQ_BANK,

  footer: {
    aboutText: 'DentiSure Solutions is the premier dental billing and revenue cycle partner for dental practices across all 50 US states. Our certified US billers log into your PMS via secure HIPAA-compliant VPN to eliminate insurance backlogs and maximize rightful practice collections.',
    disclaimer: 'DentiSure Solutions operates as an independent dental administrative support organization (ASO/RCM partner) under signed HIPAA Business Associate Agreements. All client patient health information remains strictly confidential within provider PMS vaults.',
    copyright: `© ${new Date().getFullYear()} DentiSure Solutions LLC. All rights reserved. Registered Dental RCM Organization.`,
    pmsList: [
      'Dentrix (G4–G7+ & Ascend)',
      'Eaglesoft (v17–v21+)',
      'Open Dental (v18–v24+)',
      'Curve Dental Cloud',
      'Carestream Dental',
      'Planet DDS (Denticon)',
    ],
  },

  aboutPage: {
    heroTitle: 'Dedicated Exclusively to Dental Revenue Cycle Excellence',
    heroSubtitle: 'Built by veteran dental billing managers and clinical consultants who understand that behind every claim is a doctor who worked hard and deserves to be paid in full.',
    missionTitle: 'Our Uncompromising Mission',
    missionText: 'To eliminate the administrative burden of insurance billing so dental providers can focus entirely on high-quality clinical care, confident that every dollar earned is collected promptly and accurately.',
    storyTitle: 'Founded on the Front Lines of Dental Practices',
    storyText: 'In 2018, our founders managed multi-location dental offices struggling with chronic insurance hold times, sudden billing staff resignations, and mounting 90+ day aging accounts. Generic medical billing companies failed repeatedly because they did not understand CDT codes, tooth numbers, intraoral attachment requirements, or PPO fee schedules.\n\nWe created DentiSure to provide dentists with an elite, dedicated remote billing department that operates with clinical precision, full ledger transparency, and zero employee turnover risk.',
    stats: [
      { label: 'Insurance Collections Rate', value: '98.6%' },
      { label: 'Average Days in AR', value: '18 Days' },
      { label: 'Clean Claim 1st-Pass Rate', value: '99.1%' },
      { label: 'States Actively Served', value: 'All 50 US States' },
    ],
    leadership: [
      {
        name: 'Sarah Mitchell, RDH, CRCR',
        role: 'Co-Founder & Chief Compliance Officer',
        credentials: 'RDH, CRCR, HIPAA Compliance Officer',
        bio: 'Former clinical hygienist and practice administrator with 16+ years managing multi-specialty dental groups.',
        experience: '16+ Years Dental RCM Experience',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      },
      {
        name: 'Marcus Vance, MBA',
        role: 'Co-Founder & Operations Director',
        credentials: 'MBA Healthcare Finance, CMPE',
        bio: 'Specialist in dental financial engineering, clearinghouse integrations, and fee schedule optimization.',
        experience: '14+ Years Practice Management',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      },
      {
        name: 'Elena Rostova, CPC, CPB',
        role: 'Director of Insurance Claims & Appeals',
        credentials: 'AAPC Certified Professional Coder (CPC, CPB)',
        bio: 'Senior certified dental billing coder specializing in complex periodontal and oral surgery appeals across commercial and Medicaid payers.',
        experience: '11+ Years Claims Adjudication',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      },
    ],
  },

  solutionsPage: {
    heroTitle: 'End-to-End Dental Billing Services & Claim Execution',
    heroSubtitle: 'Every stage of your revenue cycle handled with clinical rigor, CDT coding mastery, and daily accountability directly inside your dental software.',
    claimCycleStages: [
      {
        stageNumber: 1,
        name: 'Pre-Visit Breakdown & Eligibility',
        description: '48–72 hours prior to arrival, full 23-point breakdown verified and entered directly into your PMS.',
        outcome: 'Zero surprise copays & front-desk friction',
      },
      {
        stageNumber: 2,
        name: 'Clinical Narrative & Attachment Assembly',
        description: 'Mandatory perio charting, pre-op radiographs, intraoral photographs, and doctor narratives attached per payer rules.',
        outcome: 'Eliminates attachment request stalls',
      },
      {
        stageNumber: 3,
        name: 'Daily Clean Electronic Batch Submission',
        description: 'Every claim scrubbed against clearinghouse edits and transmitted before close of business.',
        outcome: '98%+ first-pass acceptance within 24h',
      },
      {
        stageNumber: 4,
        name: 'EFT, Check & Line-Item Payment Posting',
        description: 'Insurance disbursements and allowable contractual adjustments posted to exact tooth numbers.',
        outcome: '100% reconciliation with bank deposits',
      },
      {
        stageNumber: 5,
        name: 'Assertive Denial Investigation & Appeals',
        description: 'Immediate triage of rejections with peer-to-peer clinical narratives and regulatory appeals.',
        outcome: '88% overturned appeal recovery rate',
      },
      {
        stageNumber: 6,
        name: 'Active Aging AR Follow-Up & Reporting',
        description: 'Every outstanding claim older than 30 days worked systematically every 14 business days until paid.',
        outcome: '<10% AR remaining over 90 days',
      },
    ],
  },

  blog: RESOURCE_ARTICLES,

  legal: {
    terms: {
      title: 'Terms of Service & Engagement Agreement',
      lastUpdated: 'March 1, 2026',
      intro: 'These Terms of Service ("Agreement") govern the dental revenue cycle management (RCM), insurance billing, verification, and administrative consulting services provided by DentiSure Solutions LLC ("DentiSure", "we", "us", or "our") to your dental practice or business entity ("Client", "Practice", or "you").',
      sections: [
        {
          heading: '1. Scope of Dental Billing Services',
          body: 'DentiSure agrees to perform remote dental administrative and insurance revenue cycle management services as selected by the Practice, including but not limited to: insurance eligibility verification, electronic claim scrubbing and batch submission, EOB/ERA line-item payment posting, aging accounts receivable (AR) follow-up, and insurance denial appeals. All services are performed directly within the Practice Management Software (PMS) authorized by the Practice.',
        },
        {
          heading: '2. Practice Responsibilities & Clinical Authority',
          body: 'The Practice retains complete and exclusive responsibility for patient clinical diagnosis, treatment plans, fees charged, and the clinical veracity of patient records and doctor narratives. Practice agrees to maintain secure remote VPN or software credentials for DentiSure specialists and promptly provide diagnostic x-rays, perio charts, and clinical notes required for claim attachments.',
        },
        {
          heading: '3. Fees, Contingency Billing & Invoicing',
          body: 'Service fees are invoiced monthly based upon the agreed contingency percentage of gross insurance collections or per-verification flat rates established in the signed Statement of Work (SOW). Invoices are due within ten (10) business days of issuance via ACH electronic debit or authorized payment method. Late payments beyond thirty (30) days may incur a 1.5% monthly service charge.',
        },
        {
          heading: '4. Non-Exclusivity & Independent Contractor Relationship',
          body: 'DentiSure acts solely as an independent contractor. Nothing in this Agreement shall be construed to create a partnership, joint venture, or employer-employee relationship between DentiSure and the Practice or any of its team members.',
        },
        {
          heading: '5. Term, Cancellation & Performance Guarantee',
          body: 'Unless otherwise stipulated in an individual SOW, services operate on a month-to-month basis after the initial 30-day onboarding period. Either party may terminate the engagement by providing thirty (30) calendar days written notice. DentiSure offers a 30-Day Risk-Free Performance Guarantee as detailed in the applicable agreement.',
        },
        {
          heading: '6. Governing Law & Dispute Resolution',
          body: 'This Agreement shall be governed by and construed in accordance with the applicable laws of the United States and the State of company registration, without regard to its conflict of law principles. Any dispute arising under this Agreement shall first be submitted to good-faith mediation before formal legal proceedings.',
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy & Data Security',
      lastUpdated: 'March 1, 2026',
      intro: 'DentiSure Solutions LLC ("DentiSure") is dedicated to protecting the privacy, confidentiality, and security of our dental practice partners, prospective clients, and any information processed through our digital platforms and remote billing systems.',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'We collect business information submitted voluntarily through our website, such as doctor names, dental practice names, practice email addresses, phone numbers, PMS software types, and estimated monthly production volumes when you request a Practice Revenue Audit, fee consultation, or download informational guides.',
        },
        {
          heading: '2. How We Use Practice Information',
          body: 'Information gathered through website forms is used exclusively to prepare customized revenue analyses, contact you regarding scheduled audit appointments, provide requested billing proposals, and deliver practice improvement insights. We never sell, rent, or trade your practice contact details to third-party advertisers.',
        },
        {
          heading: '3. Protected Health Information (PHI) Protection',
          body: 'DentiSure never extracts, downloads, or stores unencrypted patient protected health information (PHI) onto external local computers. All billing operations occur strictly inside the Practice Management Software via secure, encrypted VPN or authorized cloud portals in strict adherence to HIPAA and HITECH requirements.',
        },
        {
          heading: '4. Cookies & Website Analytics',
          body: 'Our website uses standard session cookies and anonymous analytical tracking (such as Google Analytics) to improve user navigation, monitor page responsiveness, and evaluate engagement with practice guides. You may disable cookies through your web browser preferences at any time.',
        },
        {
          heading: '5. Security Protocols & Safeguards',
          body: 'We maintain multi-factor authentication (MFA), end-to-end TLS 1.3 encryption, role-based access controls, and regular security audits across all remote workstations utilized by our dental billing specialists.',
        },
      ],
    },
    hipaa: {
      title: 'HIPAA & HITECH Security Statement / BAA Standards',
      lastUpdated: 'March 1, 2026',
      intro: 'DentiSure Solutions LLC operates in full alignment with the Health Insurance Portability and Accountability Act of 1996 (HIPAA), the Health Information Technology for Economic and Clinical Health Act (HITECH), and the HIPAA Omnibus Rule. We execute a formal Business Associate Agreement (BAA) with every dental practice partner prior to accessing any electronic protected health information (ePHI).',
      sections: [
        {
          heading: '1. Mandatory Business Associate Agreement (BAA)',
          body: 'Before any DentiSure specialist is granted access to your Practice Management Software (Dentrix, Eaglesoft, Open Dental, Curve, etc.), our executive team executes a legally binding, comprehensive HIPAA Business Associate Agreement. This agreement explicitly delineates our duties to safeguard patient confidentiality and restricts ePHI usage strictly to permitted healthcare billing operations.',
        },
        {
          heading: '2. Technical Safeguards & Encrypted Remote Access',
          body: 'All remote access to client systems is conducted over dedicated AES-256 encrypted VPN connections or authorized zero-trust remote desktop solutions. Direct downloads, unencrypted caching, or external storage of patient rosters, radiographs, or ledger balances to non-approved local drives are technologically blocked and prohibited.',
        },
        {
          heading: '3. Administrative Safeguards & Workforce Training',
          body: 'All DentiSure billing specialists, account managers, and audit leaders undergo rigorous mandatory HIPAA compliance training upon onboarding and annual recertification thereafter. All personnel sign non-disclosure agreements with strict legal liability provisions.',
        },
        {
          heading: '4. Physical Safeguards & Workstation Security',
          body: 'Workstations utilized by our billing team are configured with automatic inactivity screen locks, encrypted storage, disabled unauthorized USB mass-storage capabilities, up-to-date endpoint detection and response (EDR) software, and privacy safeguards.',
        },
        {
          heading: '5. Breach Notification & Incident Response Protocol',
          body: 'In accordance with 45 CFR §§ 164.400–414, DentiSure maintains a written incident response plan. In the unlikely event of a suspected security incident or impermissible disclosure of ePHI, DentiSure will notify the impacted Covered Entity in writing without unreasonable delay and in no case later than twenty-four (24) hours following discovery.',
        },
      ],
    },
  },

  seo: {
    siteTitle: 'DentiSure Solutions | Dental Billing, Claims & Revenue Cycle Management',
    metaDescription: 'Eliminate dental insurance aging AR and reclaim front-desk peace of mind. Specialized dental revenue cycle specialists connecting securely to Dentrix, Eaglesoft, Open Dental, and Curve.',
    keywords: 'dental billing company, dental RCM, dental insurance verification, dental claims scrubbing, dentist aging AR recovery, Dentrix billing service, Eaglesoft billing service, Open Dental billing, dental practice revenue cycle',
    ogTitle: 'DentiSure Solutions | Your Certainty in Dental Revenue',
    ogDescription: 'Stop chasing payments. Partner with dental billing specialists who eliminate denials and maximize clean claim collections.',
    ogImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&auto=format&fit=crop&q=80',
    canonicalUrl: 'https://dentisuresolutions.com',
    analyticsId: 'G-DENTISURE2026',
    robots: 'index, follow',
  },
  mediaLibrary: [
    {
      id: 'media-hero-1',
      name: 'Main Hero Practice & Doctor',
      url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
      category: 'heroes',
      dimensions: '1200x800',
      altText: 'Doctor reviewing dental ledger analytics in modern clinic',
      updatedAt: '2026-09-01',
    },
    {
      id: 'media-showcase-1',
      name: 'Dr. Aris Thorne - Apex Dental',
      url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
      category: 'showcase',
      dimensions: '600x400',
      altText: 'Dr Aris Thorne clinical consultation',
      updatedAt: '2026-09-01',
    },
    {
      id: 'media-showcase-2',
      name: 'Dr. Jennifer Hayes - Premier Smiles',
      url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&auto=format&fit=crop&q=80',
      category: 'showcase',
      dimensions: '600x400',
      altText: 'Dr Jennifer Hayes in dental operatory',
      updatedAt: '2026-09-01',
    },
    {
      id: 'media-showcase-3',
      name: 'Dr. Carlos Ramirez - Metro Pediatric',
      url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&auto=format&fit=crop&q=80',
      category: 'showcase',
      dimensions: '600x400',
      altText: 'Dr Carlos Ramirez dental team',
      updatedAt: '2026-09-01',
    },
    {
      id: 'media-team-1',
      name: 'Sarah Mitchell - CCO',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      category: 'team',
      dimensions: '400x400',
      altText: 'Sarah Mitchell RDH CRCR portrait',
      updatedAt: '2026-09-01',
    },
    {
      id: 'media-team-2',
      name: 'Marcus Vance - Operations',
      url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      category: 'team',
      dimensions: '400x400',
      altText: 'Marcus Vance MBA portrait',
      updatedAt: '2026-09-01',
    },
    {
      id: 'media-team-3',
      name: 'Elena Rostova - Claims Director',
      url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      category: 'team',
      dimensions: '400x400',
      altText: 'Elena Rostova CPC CPB portrait',
      updatedAt: '2026-09-01',
    },
    {
      id: 'media-test-1',
      name: 'Dr. Jennifer Hayes Avatar',
      url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
      category: 'testimonials',
      dimensions: '150x150',
      altText: 'Dr Jennifer Hayes portrait',
      updatedAt: '2026-09-01',
    },
    {
      id: 'media-test-2',
      name: 'Dr. Aris Thorne Avatar',
      url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      category: 'testimonials',
      dimensions: '150x150',
      altText: 'Dr Aris Thorne portrait',
      updatedAt: '2026-09-01',
    },
    {
      id: 'media-test-3',
      name: 'Dr. Carlos Ramirez Avatar',
      url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
      category: 'testimonials',
      dimensions: '150x150',
      altText: 'Dr Carlos Ramirez portrait',
      updatedAt: '2026-09-01',
    },
    {
      id: 'media-blog-1',
      name: 'Verification Checklist Cover',
      url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
      category: 'blog',
      dimensions: '800x450',
      altText: 'Dental billing verification checklist cover',
      updatedAt: '2026-09-01',
    },
    {
      id: 'media-blog-2',
      name: 'Medical Cross-Coding Cover',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      category: 'blog',
      dimensions: '800x450',
      altText: 'Medical cross coding dental guide',
      updatedAt: '2026-09-01',
    },
  ],
};
