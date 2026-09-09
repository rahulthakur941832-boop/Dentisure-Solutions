import {
  FAQItem,
  HeroPerspective,
  MetricFocus,
  ResourceArticle,
  ServicePillar,
  TestimonialItem,
  LeadSubmission,
} from '../types';

export const BRAND = {
  name: 'DentiSure Solutions',
  legalEntityName: 'DentiSure Solutions Pvt. Ltd.',
  tagline: 'Your Certainty in Dental Revenue',
  contactEmail: 'contact@dentisuresolutions.com',
  inquiriesEmail: 'info@dentisuresolutions.com',
  phone: '+91 98765 43210',
  phoneDirect: '+91 80 4567 8900',
  address: 'DLF Cyber City, Gurugram, Haryana / Bengaluru, India [Pan-India Practice Support]',
  usBusinessAddress: 'Cyber City, Gurugram & Indiranagar, Bengaluru, India',
  mailingAddress: 'DentiSure Solutions, Tech Park, Indiranagar, Bengaluru, Karnataka, 560038',
  billingAddress: 'Electronic Invoicing, UPI & Direct NEFT / RTGS Bank Transfer Available',
  businessSetupType: 'Registered Indian Dental Billing & Healthcare Administration Entity',
  einTaxIdNotice: '[GSTIN & MSME Registration on File — Disclosed upon Service Agreement]',
  hours: 'Mon – Sat: 9:00 AM – 7:00 PM IST (Pan-India Clinic Support)',
};

export const HERO_OPTIONS: Record<HeroPerspective, {
  badge: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  highlightPills: string[];
}> = {
  elite: {
    badge: 'The Elite Standard in Dental RCM',
    headline: 'Dental Billing, Perfected.',
    subheadline: 'No guesswork. No lost revenue. Just a streamlined, DPDP & NABH-aligned system that captures every rupee your dental practice earns.',
    primaryCta: 'Request Confidential Revenue Audit',
    secondaryCta: 'Explore Our Process',
    highlightPills: ['Encrypted Remote PMS Access', '98%+ Clean Claim Acceptance', 'Dedicated Dental Billing Specialists'],
  },
  'stress-free': {
    badge: 'The Stress-Free Practice Partner',
    headline: 'Stop Chasing Payments. Start Focusing on Care.',
    subheadline: 'We handle the relentless billing and third-party reimbursement maze for you, ensuring your practice gets paid accurately and on time while your front desk focuses on patients.',
    primaryCta: 'Schedule a Free Practice Consultation',
    secondaryCta: 'Learn How We Work',
    highlightPills: ['Reclaim 20+ Front Desk Hours/Week', 'Zero Billing Follow-up Hassles for Staff', 'Dedicated Account Manager'],
  },
  growth: {
    badge: 'Strategic Revenue Multiplication',
    headline: 'Turn Your Billing Department into a Profit Center.',
    subheadline: 'A dedicated revenue cycle team that recovers hidden revenue leakage, slashes aging balances, and accelerates healthy cash flow.',
    primaryCta: 'Calculate Your Practice ROI',
    secondaryCta: 'See Financial Benchmarks',
    highlightPills: ['Average ₹3.5 Lakhs+ Recovered in 90 Days', '50% Reduction in Aging AR', 'Contingency-Aligned Pricing'],
  },
};

export const METRICS_DATA: Record<MetricFocus, {
  title: string;
  subtitle: string;
  stats: { value: string; label: string; detail: string }[];
}> = {
  cashflow: {
    title: 'Accelerated Collections & Liquidity',
    subtitle: 'Proven benchmarks compared to standard Indian dental clinic averages',
    stats: [
      { value: '14–21 Days', label: 'Average Days in AR', detail: 'Versus 35–50 days industry standard' },
      { value: '>95%', label: 'First-Pass Acceptance', detail: 'Clean claims paid without delays' },
      { value: '<5%', label: 'Claim Denial Rate', detail: 'Over 60% lower than typical averages' },
      { value: '>98%', label: 'Net Collection Ratio', detail: 'Every legitimate rupee captured' },
    ],
  },
  efficiency: {
    title: 'Operational Hours & Friction Saved',
    subtitle: 'Freeing your front-desk team from time-consuming billing paperwork',
    stats: [
      { value: '20+ Hrs', label: 'Saved Per Week', detail: 'Reclaimed for patient care & treatment acceptance' },
      { value: '24–48 Hours', label: 'Turnaround Time', detail: 'Full ledger update and reconciliation' },
      { value: 'Daily', label: 'Payment Posting', detail: 'Electronic transfers and card reconciliation' },
      { value: '0 Backlog', label: 'Aging Claim Discipline', detail: 'Unresolved balances reviewed every week' },
    ],
  },
  outcomes: {
    title: 'Documented Practice Impact',
    subtitle: 'Measured across general practices, orthodontic clinics, and multispecialty dental chains',
    stats: [
      { value: '50%+', label: 'Reduction in Aging AR', detail: 'Within the first 90 days of onboarding' },
      { value: '₹3.5L–₹8.5L', label: 'Cash Flow Unlocked', detail: 'From dormant and unresolved aging claims' },
      { value: '88%', label: 'Appeals Overturned', detail: 'Recovering money written off by other practices' },
      { value: '100%', label: 'PMS Compatibility', detail: 'Practo Ray, Clinicea, Dentrix, Open Dental' },
    ],
  },
};

export const WHY_CHOOSE_ITEMS = [
  {
    num: '01',
    title: 'Maximize Every Claim',
    description: 'We ensure all claims are properly documented, accurately coded with current CDT standards, and submitted with essential attachments and clinical narratives.',
    benefit: 'Higher revenue per procedure with zero accidental unbundling or under-coding.',
  },
  {
    num: '02',
    title: 'Reduce Payment Delays',
    description: 'Proactive tracking and rapid electronic submissions mean claims are accepted, adjudicated, and paid faster than standard in-house manual cycles.',
    benefit: 'Consistent, predictable weekly cash deposits rather than erratic 45-day payment cycles.',
  },
  {
    num: '03',
    title: 'Minimize Denials & Costly Rework',
    description: 'Payer-specific scrubbing filters catch missing x-rays, periodontal charts, and narrative mismatches before claims cross clearinghouses.',
    benefit: 'Less time chasing rejected claims, virtually eliminating avoidable denials.',
  },
  {
    num: '04',
    title: 'Complete Revenue Cycle Visibility',
    description: 'Weekly transparent reports and real-time PMS documentation keep you informed without having to micromanage billing details.',
    benefit: 'You maintain full visibility and total financial control without the administrative burden.',
  },
  {
    num: '05',
    title: 'True Dental Billing Specialists',
    description: 'Our specialists only do dental billing. We understand the nuances of PPO fee schedules, dual coverage, pre-authorizations, and frequency limitations.',
    benefit: 'Expertise that general medical billing companies simply cannot match.',
  },
  {
    num: '06',
    title: 'A True Extension of Your Practice',
    description: 'We operate inside your practice management software via secure VPN. Your patients experience no disruption, and your team gets a supportive partner.',
    benefit: 'Reliable, seamless integration with your existing team and daily office rhythm.',
  },
];

export const SOLUTION_PILLARS: ServicePillar[] = [
  {
    id: 'verification',
    title: 'Pre-Visit Insurance Eligibility & Verification',
    subtitle: 'Eliminate surprise copays and unexpected denials before the patient sits in the operatory.',
    iconName: 'ShieldCheck',
    badge: 'Critical Front-End Step',
    deliverables: [
      'Comprehensive 23-point breakdown verified 48–72 hours prior to appointment',
      'Remaining maximums, deductibles, waiting periods, and frequency limits checked',
      'Direct data entry into Dentrix, Eaglesoft, Open Dental, or Curve',
      'Accurate patient out-of-pocket estimates ready for front-desk presentation',
    ],
    metricsImpact: 'Reduces front-desk check-in delays by 80% & cuts eligibility denials to <1%',
    workflowDetail: 'Our team pulls your schedule 2-3 days in advance, calls payers, verifies online portals, and notes exact plan coverage directly in the patient file.',
  },
  {
    id: 'claims',
    title: 'Daily Clean Claim Submission & Coding Scrubbing',
    subtitle: 'Accurate CDT coding, clinical attachments, and zero-day batch turnaround.',
    iconName: 'FileCheck2',
    badge: 'Daily Core Engine',
    deliverables: [
      'Daily electronic batch scrubbing and validation through your clearinghouse',
      'Mandatory x-ray, photo, and perio chart attachments matched to CDT requirements',
      'Custom clinical narrative formulation for major restorative & periodontal treatments',
      'Dual-coverage coordination of benefits (COB) handled accurately',
    ],
    metricsImpact: '98%+ clean claim first-pass acceptance rate within 24 hours of treatment',
    workflowDetail: 'We log into your PMS daily, review completed procedures, verify clinical chart notes, and submit clean claims before the end of the business day.',
  },
  {
    id: 'appeals',
    title: 'Assertive Denial Management & Targeted Appeals',
    subtitle: 'We do not accept arbitrary insurance rejections. We fight for every legitimate earned dollar.',
    iconName: 'AlertCircle',
    badge: 'Revenue Defense',
    deliverables: [
      'Instant triage of clearinghouse and payer rejections within 48 hours',
      'Detailed root-cause analysis preventing repeat denials from same payers',
      'Comprehensive appeal packages with doctor clinical notes and surgical photos',
      'Direct peer-to-peer and supervisor escalations for delayed claims',
    ],
    metricsImpact: '88% overturned appeal success rate for previously denied claims',
    workflowDetail: 'Whenever an EOB arrives with an improper denial, our appeal specialists craft evidence-backed appeals citing CDT guidelines and contract terms.',
  },
  {
    id: 'ar-cleanup',
    title: 'Aging Accounts Receivable (AR) Cleanup & Recovery',
    subtitle: 'Systematic triage to rescue aging 30, 60, 90, and 120+ day balances.',
    iconName: 'TrendingUp',
    badge: 'Instant Cash Injection',
    deliverables: [
      'Full audit and triage of all claims over 30 days old',
      'Systematic payer follow-up via phone, portals, and written demands',
      'Identification and correction of unposted payments or unapplied credits',
      'Bi-weekly progress dashboard detailing aging balance burn-down',
    ],
    metricsImpact: 'Cuts 90+ day insurance AR by 50% in the first 90 days of engagement',
    workflowDetail: 'We systematically work your aging report from highest balance and oldest age down, leaving detailed clinical notes on every single patient account.',
  },
  {
    id: 'posting',
    title: 'Payment Posting & Daily Financial Reconciliation',
    subtitle: 'Precision EOB and EFT posting so practice collections mirror bank reality.',
    iconName: 'DollarSign',
    badge: 'Financial Integrity',
    deliverables: [
      'Daily posting of insurance checks, virtual credit cards, and EFT payments',
      'Accurate contractual write-offs and PPO fee schedule adjustments',
      'Clear secondary claim generation immediately after primary payment post',
      'Transparent patient billing balance calculations ready for statements',
    ],
    metricsImpact: '100% reconciliation matching bank deposits with PMS ledger',
    workflowDetail: 'Every payment is posted line-by-line against specific tooth numbers and procedures. Adjustments are verified against your contracted fee schedules.',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Verify & Prepare',
    desc: 'We check patient benefits 48-72h in advance and ensure all clinical narratives and x-rays are ready.',
  },
  {
    step: '02',
    title: 'Scrub & Submit',
    desc: 'Claims are audited against payer-specific rules and transmitted electronically within 24 hours of service.',
  },
  {
    step: '03',
    title: 'Track & Follow Up',
    desc: 'Real-time clearinghouse tracking catches rejections instantly. Aging claims are pursued every 14 days.',
  },
  {
    step: '04',
    title: 'Post & Reconcile',
    desc: 'EFTs, checks, and allowable adjustments are posted line-by-line directly into your dental practice software.',
  },
  {
    step: '05',
    title: 'Appeal & Recover',
    desc: 'Denied or underpaid claims are vigorously contested with full clinical documentation until paid.',
  },
  {
    step: '06',
    title: 'Report & Advise',
    desc: 'You receive weekly transparent executive summaries showing collections, clean claim rate, and AR aging.',
  },
];

export const ONBOARDING_TIMELINE = [
  {
    days: 'Days 1–2',
    title: 'Discovery & Practice Audit',
    desc: '30-minute Zoom deep dive. We review your current PMS, clearinghouse setup, fee schedules, and top pain points.',
  },
  {
    days: 'Days 3–4',
    title: 'Secure Remote Setup & BAA',
    desc: 'We sign our mutual HIPAA Business Associate Agreement (BAA) and configure secure, encrypted VPN access to your PMS.',
  },
  {
    days: 'Days 5–6',
    title: 'Team Alignment & SOP Sync',
    desc: 'Introduction to your dedicated US billing manager. We establish clear communication channels and daily posting rules.',
  },
  {
    days: 'Day 7+',
    title: 'Go-Live & Immediate Relief',
    desc: 'DentiSure assumes daily billing operations and begins rapid cleanup of pending claims and aging AR.',
  },
];

export const COMPATIBLE_PMS = [
  { name: 'Dentrix', desc: 'Dentrix G5, G6, G7 & Ascend', logoText: 'Dentrix' },
  { name: 'Eaglesoft', desc: 'Patterson Eaglesoft v18–v21', logoText: 'Eaglesoft' },
  { name: 'Open Dental', desc: 'Open Dental Cloud & On-Premise', logoText: 'Open Dental' },
  { name: 'Curve Dental', desc: 'Curve Hero Cloud PMS', logoText: 'Curve Dental' },
  { name: 'Denticon', desc: 'Planet DDS Denticon Cloud', logoText: 'Denticon' },
  { name: 'CareStack', desc: 'CareStack Enterprise Cloud', logoText: 'CareStack' },
  { name: 'Fuse', desc: 'Patterson Fuse Cloud', logoText: 'Patterson Fuse' },
  { name: 'Oryx Dental', desc: 'Oryx Cloud AI Dental PMS', logoText: 'Oryx' },
];

export const CLEARINGHOUSES = [
  'DentalXChange',
  'Vyne Dental (FastAttach)',
  'Change Healthcare',
  'Claim.MD',
  'Apex EDI',
  'Office Ally',
];

export const PRICING_TIERS = [
  {
    name: 'Eligibility Verification Only',
    tag: 'Prevent Denials Front-End',
    idealFor: 'Practices with in-house billers who need front-desk phone relief',
    price: '$3.50',
    unit: 'per verified patient',
    features: [
      'Full 23-point breakdown 48-72h in advance',
      'Direct entry into your dental PMS',
      'Remaining maximums & deductible tracking',
      'Frequency limits (FMX, Prophy, Crowns)',
      'Patient copay breakdown for check-in',
      'No long-term contracts (cancel anytime)',
    ],
    highlight: false,
    cta: 'Get Started with Verification',
  },
  {
    name: 'Full Revenue Cycle Management',
    tag: 'Most Popular for High-Production Practices',
    idealFor: 'Solo practices, group clinics, and growing dental offices wanting complete certainty',
    price: '2.9% – 3.8%',
    unit: 'of insurance collections (contingency)',
    features: [
      'Complete claim scrubbing & daily electronic submission',
      'All mandatory x-ray & narrative attachments',
      'Daily payment posting & adjustment reconciliation',
      'Aggressive denial appeals & peer reviews',
      'Dedicated Account Billing Specialist',
      'Weekly transparent performance dashboards',
      'Contingency pricing: We only get paid when you get paid',
    ],
    highlight: true,
    cta: 'Request Custom Practice Proposal',
  },
  {
    name: 'Aging AR Recovery Sprint',
    tag: 'Rapid Cash Injection Project',
    idealFor: 'Offices with large 60, 90, and 120+ day balances tied up in insurance limbo',
    price: 'Audit + Contingency',
    unit: 'based on recovered funds',
    features: [
      'Exhaustive audit of every claim older than 30 days',
      'Direct phone follow-ups with insurance examiners',
      'Unapplied credit and unposted payment cleanup',
      'Resubmission of lost claims with required attachments',
      'Bi-weekly cash collection report',
      'Hands-off execution: Zero burden on your front desk',
    ],
    highlight: false,
    cta: 'Rescue Your Aging AR',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    doctorName: 'Dr. Rajesh Sharma, MDS',
    role: 'Lead Dentist & Owner',
    practiceName: 'Apex Multispecialty Dental Care',
    location: 'Bengaluru, KA',
    pms: 'Practo Ray & Open Dental',
    quote: 'Before DentiSure, our front desk was drowning in billing paperwork and follow-up calls. Our 60-day aging was sitting at ₹5.8 Lakhs. Within 60 days of partnering with DentiSure, that backlog was cleared down to under ₹80,000, and our collections jumped noticeably in the first month alone.',
    metricsResult: '79% Reduction in Aging AR in 60 Days',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 't2',
    doctorName: 'Dr. Priya Nair, BDS, MDS',
    role: 'Managing Partner',
    practiceName: 'Zenith Smiles Dental Clinic',
    location: 'Mumbai, MH',
    pms: 'Clinicea & Dentrix',
    quote: 'DentiSure feels like they are sitting in the room next door, but without the payroll overhead. They log into our PMS every single afternoon, reconcile every payment, and resolve queries before I even notice them. It restored total peace of mind to our clinic.',
    metricsResult: 'Reclaimed 22 Hours/Week for Front Desk',
    image: 'https://images.unsplash.com/photo-1594824813580-f094a97491cf?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 't3',
    doctorName: 'Dr. Amitav Banerjee, MDS',
    role: 'Founder & Periodontist',
    practiceName: 'Capital Dental Specialists',
    location: 'New Delhi, DL',
    pms: 'Dentrix & Custom PMS',
    quote: 'Complex surgical and implant procedure reimbursements require precise documentation. DentiSure’s team knows exactly what narratives and clinical records are required. Our first-pass acceptance rate is now 98.4%, and our practice cash flow has never been more predictable.',
    metricsResult: '98.4% Clean First-Pass Acceptance',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80',
  },
];

export const FAQ_BANK: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is DentiSure Solutions?',
    answer: 'DentiSure Solutions is a premier dental practice revenue cycle management and billing support service assisting dental clinics nationwide across India. We handle treatment pre-authorizations, clean billing submissions, payment reconciliation, aging recovery, and dispute resolution under the tagline: Your Certainty in Dental Revenue.',
  },
  {
    id: 'faq-2',
    category: 'Security & Tech',
    question: 'How do you access our dental software securely?',
    answer: 'We connect directly to your existing practice management software (Dentrix, Practo Ray, Clinicea, Open Dental, etc.) using an encrypted, secure VPN or remote access protocol. We execute a mutual Non-Disclosure and DPDP Data Processing Agreement before any work begins, and all patient data remains strictly inside your own clinic software.',
  },
  {
    id: 'faq-3',
    category: 'Billing & Claims',
    question: 'How does your team specialize in dental clinic billing?',
    answer: 'Our dedicated team consists of seasoned dental revenue coordinators with comprehensive expertise in dental clinical codes, corporate tie-up claims, third-party billing protocols, and payment reconciliation. We operate with zero software migration, working directly within your authorized PMS.',
  },
  {
    id: 'faq-4',
    category: 'Onboarding',
    question: 'How quickly can our dental clinic get started?',
    answer: 'Our rapid onboarding takes just 3 to 5 business days. After a quick discovery call, we configure secure remote access, align on your practice fee schedules and protocols, sign the service agreement, and begin active support.',
  },
  {
    id: 'faq-5',
    category: 'Pricing',
    question: 'What is your pricing structure?',
    answer: 'We offer transparent, performance-aligned pricing tailored for Indian dental practices. Our Full Revenue Cycle service is typically aligned as a modest contingency percentage of recovered collections (meaning we only earn when your clinic collects), or fixed monthly packages for solo clinics. We do not lock you into rigid long-term contracts.',
  },
  {
    id: 'faq-6',
    category: 'Billing & Claims',
    question: 'How do you handle denied or rejected claims?',
    answer: 'We track every rejection within 24–48 hours of transmission. For denied claims, our specialists conduct a root-cause review, gather necessary doctor chart notes, x-rays, and narratives, and file formal appeals. We boast an 88% success rate in overturning unjustified dental insurance denials.',
  },
  {
    id: 'faq-7',
    category: 'General',
    question: 'What happens to our existing front-desk team?',
    answer: 'DentiSure does not replace your front desk—we empower them! By taking over the exhausting 45-minute insurance phone calls, hold times, and billing paperwork, your front desk can focus entirely on greeting patients, presenting treatment plans, filling chair schedule gaps, and increasing same-day case acceptance.',
  },
  {
    id: 'faq-8',
    category: 'Billing & Claims',
    question: 'Do you work with specialized dental practices?',
    answer: 'Yes. In addition to general and family dentistry, we have specialized billing protocols for pediatric dentistry, orthodontics, periodontics, endodontics, and oral and maxillofacial surgery (including cross-coding medical billing for dental procedures when applicable).',
  },
  {
    id: 'faq-9',
    category: 'Billing & Claims',
    question: 'How do we track what DentiSure is doing on our accounts?',
    answer: 'You have 100% transparency. Every note, action, and adjustment is recorded directly inside your dental software ledger in real time. In addition, we deliver weekly and monthly executive dashboards highlighting collections, clean-claim rates, and AR aging trends.',
  },
  {
    id: 'faq-10',
    category: 'General',
    question: 'How do I request a free Practice Revenue Audit?',
    answer: 'You can request a Confidential Practice Revenue Audit directly through our website. We will review your 30/60/90+ aging reports, identify dormant money sitting in insurance accounts, and provide a clear roadmap to collect every dollar you are owed.',
  },
];

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    id: 'checklist-23',
    title: 'The 23-Point Dental Insurance Verification Checklist',
    category: 'Practice Guides',
    readTime: '6 min read',
    date: 'Updated March 2026',
    author: 'DentiSure Clinical Billing Team',
    snippet: 'Missing even one plan limitation can turn an expected $1,200 crown reimbursement into an uncollectable patient dispute. Here are the 23 essential items your team must verify 72 hours prior to every appointment.',
    content: [
      '1. Verification Basics: Effective date, termination date, subscriber ID, and exact group number.',
      '2. Annual Maximums: Total benefit maximum, amount used year-to-date, and date of plan reset (calendar year vs. fiscal year).',
      '3. Deductibles: Individual vs. family deductible, whether preventive services apply to the deductible.',
      '4. Preventive & Diagnostic Frequencies: 2 cleanings per calendar year vs. 1 every 6 months to the day; bitewing frequencies (1 set every 12 months) and FMX/Panoramic limits (once every 3 to 5 years).',
      '5. Basic & Major Restorative: Waiting periods, missing tooth clause, downgrade policies on posterior composites, and crown replacement frequency rules (5, 7, or 10 years).',
      '6. Periodontal Guidelines: Prior history of scaling and root planing, pocket depth requirements, and periodontal maintenance limitations.',
      '7. Payer Submission Preferences: Electronic Payer ID, attachment requirements, and timely filing limits (often 90 to 180 days).',
    ],
    downloadableChecklist: 'Printable_23_Point_Dental_Verification_Checklist.pdf',
  },
  {
    id: 'ar-costs',
    title: 'Why 90+ Day Dental AR is Costing You Far More Than You Think',
    category: 'Revenue Cycle',
    readTime: '5 min read',
    date: 'February 2026',
    author: 'DentiSure Financial RCM Group',
    snippet: 'According to ADA financial benchmarks, once a dental claim passes 90 days unpaid, its collection probability drops below 60%. At 180 days, it plummets to under 20%.',
    content: [
      'Dental practices often view their accounts receivable as money in the bank that simply takes time to arrive. In reality, aging AR suffers severe decay over time.',
      'Timely Filing Traps: Many major payers (including UnitedHealthcare and certain Delta Dental plans) enforce strict 90 or 180-day timely filing cutoffs. An unworked claim quickly becomes an unappealable contractual write-off.',
      'Staff Burnout: Front-desk team members dread calling insurance companies, enduring 45-minute hold times only to be told a claim was "never received." This leads to turnover and deferred patient care.',
      'Solution: Implementing a systematic 14-day claim touch cycle where no claim remains untouched for more than two weeks restores collection predictability.',
    ],
  },
  {
    id: 'denial-prevention',
    title: 'Top 7 Reasons Dental Claims Get Denied in 2026 & How to Prevent Them',
    category: 'Coding & Compliance',
    readTime: '7 min read',
    date: 'January 2026',
    author: 'DentiSure Claims Audit Team',
    snippet: 'Over 68% of dental claim denials are completely avoidable with pre-submission scrubbing. Here are the most frequent triggers and their immediate remedies.',
    content: [
      '1. Missing Radiographs or Diagnostic Imagery: Failing to attach diagnostic periapical or bitewing x-rays for crowns, bridges, and endodontics.',
      '2. Incomplete Periodontal Charting: Submitting D4341/D4342 without full 6-point probing depths, bleeding indices, and radiographic bone loss evidence.',
      '3. Missing Narrative Justification: Not documenting why a fractured tooth cannot be restored with a conventional composite filling instead of a crown.',
      '4. Incorrect Primary/Secondary Payers: Failing to properly follow standard Coordination of Benefits (COB) and Birthday Rule guidelines.',
      '5. Outdated CDT Procedure Codes: Using deleted codes or missing new code updates introduced in the latest ADA CDT code cycle.',
      '6. Missing Tooth Clause Mismatches: Failing to check if missing teeth extracted prior to plan enrollment are excluded from prosthetic coverage.',
    ],
  },
];

export const BROCHURE_SECTIONS = [
  {
    sectionNum: '01',
    title: 'Cover & Executive Summary',
    headline: 'DentiSure Solutions: Your Certainty in Dental Revenue',
    subtitle: 'Dental Billing. Claims. Revenue Cycle. Simplified.',
    text: 'A dedicated brochure for US dental practice owners, managing dentists, and office managers seeking financial predictability, eliminated claims backlog, and elevated patient care.',
  },
  {
    sectionNum: '02',
    title: 'The DentiSure Promise',
    headline: 'Every Dollar Earned, Accurately Collected.',
    subtitle: 'No Guesswork. No Cash Flow Halts. Pure Transparency.',
    text: 'We promise that your practice will never leave rightful revenue on the table due to administrative friction, insurance delays, or unworked claims. We operate as an aligned extension of your practice with 100% visibility.',
  },
  {
    sectionNum: '03',
    title: 'Why Dental Practices Choose DentiSure',
    headline: 'Engineered Exclusively for the Dental Profession',
    subtitle: 'Not Generic Medical Billing. Pure Dental Expertise.',
    text: 'Dental billing operates on unique CDT codes, tooth-specific attachments, intraoral photos, and PPO fee schedules. DentiSure’s US specialists master these intricacies daily so your team never has to fight hold music again.',
  },
  {
    sectionNum: '04',
    title: 'Core Solutions Portfolio',
    headline: 'End-to-End Revenue Cycle Management',
    subtitle: 'From Pre-Appointment to Final Bank Reconciliation',
    text: '1. Pre-Visit Eligibility Verification (72h prior)\n2. Daily Clean Claim Scrubbing & Submission\n3. Assertive Denial Management & Targeted Appeals\n4. Aging Accounts Receivable (AR) Recovery\n5. Line-Item Payment Posting & Daily Bank Reconciliation',
  },
  {
    sectionNum: '05',
    title: 'How It Works (Workflow & Timeline)',
    headline: 'Seamless Integration into Your Daily Rhythm',
    subtitle: 'Direct Login via Secure VPN — Zero Disruption',
    text: 'We connect directly to Dentrix, Eaglesoft, Open Dental, or Curve through a secure encrypted VPN. You maintain total custody of your patient data while our specialists handle the execution daily.',
  },
  {
    sectionNum: '06',
    title: 'The DentiSure Advantage',
    headline: 'Technology-Powered, Expert-Executed',
    subtitle: 'The Perfect Union of Automation and Human Oversight',
    text: 'Payer-specific scrubbing algorithms catch 98%+ of errors before submission, while veteran US dental billers manage complex appeals, multi-tier insurance coordination, and peer reviews.',
  },
  {
    sectionNum: '07',
    title: 'Designed for Dental Practices',
    headline: 'Customized for Solo, Group & DSO Environments',
    subtitle: 'Scalable RCM Architecture Tailored to Your Operatories',
    text: 'Whether you are a solo practitioner doing $60K/month looking to free up your front desk, or a multi-location DSO producing $500K+/month needing standardized reporting, DentiSure adapts seamlessly.',
  },
  {
    sectionNum: '08',
    title: 'What We Help Practices Achieve',
    headline: 'Quantifiable Financial & Operational Results',
    subtitle: 'Real Benchmarks Documented Nationwide',
    text: '• 50%+ Reduction in 90+ Day Aging AR within 90 days\n• 98%+ Clean Claim First-Pass Acceptance Rate\n• 18–24 Day Average Days in AR (Industry avg: 35+)\n• 20+ Hours per week reclaimed for front-desk patient care',
  },
  {
    sectionNum: '09',
    title: 'Our Security & HIPAA Commitment',
    headline: 'Enterprise Security & Uncompromising Integrity',
    subtitle: 'HIPAA-Ready Architecture, BAA Signed, Encrypted Access',
    text: 'All billing specialists work within secure, monitored environments with strict access logs, multi-factor authentication, and encrypted VPN tunnels. Patient health information (PHI) never leaves your practice control.',
  },
  {
    sectionNum: '10',
    title: 'Take the First Step (Final Call to Action)',
    headline: 'Claim Your Complimentary Practice Revenue Audit',
    subtitle: 'Uncover Hidden Revenue & Streamline Your Office Today',
    text: 'Call us at (888) 542-SURE or request your confidential practice audit online. We will evaluate your current accounts receivable, pinpoint insurance leakages, and outline your customized cash recovery plan.',
  },
];

export const INITIAL_LEADS: LeadSubmission[] = [
  {
    id: 'lead-1',
    doctorName: 'Dr. Marcus Vance, DDS',
    practiceName: 'Vance Family & Cosmetic Dentistry',
    email: 'marcus@vancedentalcare.com',
    phone: '(512) 555-0192',
    pmsSoftware: 'Dentrix G7',
    locationsCount: 1,
    monthlyProduction: '$85,000 – $120,000',
    primaryChallenge: 'Aging 90+ day AR is over $55k and front desk cannot keep up with phone calls.',
    servicesInterested: ['Full Revenue Cycle Management', 'Aging AR Recovery Sprint'],
    submissionDate: '2026-03-05',
    status: 'Audit Scheduled',
    preferredDate: '2026-03-10',
    preferredTime: '2:00 PM CST',
    notes: 'Requested Zoom audit. Sent 90-day aging summary. Very interested in 30-day turnaround.',
  },
  {
    id: 'lead-2',
    doctorName: 'Dr. Elena Rostova, DMD',
    practiceName: 'Summit Pediatric & Ortho Dental',
    email: 'erostova@summitkidsdental.com',
    phone: '(303) 555-0841',
    pmsSoftware: 'Open Dental',
    locationsCount: 2,
    monthlyProduction: '$150,000 – $250,000',
    primaryChallenge: 'Verification errors leading to surprise copays for parents and frequent ortho claim rejections.',
    servicesInterested: ['Eligibility Verification Only', 'Full Revenue Cycle Management'],
    submissionDate: '2026-03-06',
    status: 'New',
    preferredDate: '2026-03-12',
    preferredTime: '10:30 AM CST',
    notes: 'Multi-location practice. Needs 72-hour pre-visit verification for 40+ patients daily.',
  },
  {
    id: 'lead-3',
    doctorName: 'Dr. Gregory Hayes, DDS',
    practiceName: 'Pecan Grove Dental Group',
    email: 'ghayes@pecangrovedental.com',
    phone: '(214) 555-9273',
    pmsSoftware: 'Eaglesoft',
    locationsCount: 1,
    monthlyProduction: '$60,000 – $85,000',
    primaryChallenge: 'Our in-house biller retired last month. Claims are piling up unsubmitted.',
    servicesInterested: ['Full Revenue Cycle Management'],
    submissionDate: '2026-03-07',
    status: 'Contacted',
    preferredDate: '2026-03-09',
    preferredTime: '1:00 PM CST',
    notes: 'Urgent need. Ready for 1-week onboarding. Eaglesoft v21 on-premise with VPN.',
  },
];
