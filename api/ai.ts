import { GoogleGenAI } from '@google/genai';

interface VercelReq {
  method?: string;
  body?: any;
  query?: any;
  headers?: Record<string, any>;
}

interface VercelRes {
  status: (code: number) => VercelRes;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => VercelRes;
  end: () => void;
}

// Pre-packaged smart generator for instant client demos (even if API key isn't active yet)
const DEMO_FALLBACKS: Record<string, (topic: string, current: string) => string> = {
  blog_title: (t) => {
    const titles = [
      `The 2026 Dental Billing Blueprint: How Practices Eliminate 90% of Claim Denials`,
      `Mastering Pre-Visit Insurance Verifications: Protecting Dental Practice Cash Flow`,
      `Aging AR Recovery Sprint: How Multi-Chair Dental Clinics Reclaim 30+ Day Balances`,
      `Fee Schedule Optimization: Maximizing Dental Practice Production and Collections`,
      `Preventing Costly Dental Coding Mismatches (CDT Code Changes & Documentation)`,
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  },
  blog_outline: (t) => {
    return [
      `### Executive Summary\nDental revenue cycle management requires rigorous upstream verification. Up to 67% of dental claim rejections stem directly from missing eligibility breakdowns or outdated patient subscriber IDs.\n\n`,
      `### 1. The Pre-Visit Verification Protocol\nEnsure that all patient insurances are scrubbed and verified at least 48 to 72 hours before the scheduled appointment. Capture fee schedules, remaining deductibles, frequency limitations, and waiting periods.\n\n`,
      `### 2. Upfront Patient Portion Estimation\nWhen the patient sits in the operatory chair, your front desk should have an unambiguous financial ledger. Collecting patient co-pays at checkout cuts aging accounts receivable by over 45%.\n\n`,
      `### 3. Dedicated Daily Claim Submission & Scrubbing\nNever batch claims weekly. Daily electronic submissions paired with automated CDT-scrubbing catch missing tooth numbers, quadrant labels, or necessary diagnostic attachments before the payer receives them.\n\n`,
      `### Key Practice Action Items:\n- Review top 5 denial reasons in your PMS weekly\n- Enforce same-day attachment submission for periodontal charting and crown build-ups\n- Track net collection percentage (target > 98%)`,
    ].join('');
  },
  description: (t, cur) => {
    return `Specialized US dental revenue cycle management (RCM) and claims billing. We connect directly to your PMS to eliminate aging AR, slash claim denials, and accelerate practice cash flow with 98%+ clean claim rates.`;
  },
  title: (t) => {
    return `Dental Billing & Revenue Cycle Management | Maximize Collections & Minimize Denials`;
  },
  seo: (t) => {
    return `Expert dental billing service for US practices. Remote PMS claims processing, pre-visit insurance eligibility verification, and aging AR recovery. Free Practice Revenue Audit.`;
  },
  rephrase: (t, cur) => {
    if (!cur) return `Streamline your dental practice finances with dedicated remote billing experts who capture every dollar earned.`;
    return cur.length > 20
      ? `Our dedicated dental revenue specialists optimize ${cur.trim().toLowerCase()} to maximize clean claim acceptance and shorten reimbursement cycles.`
      : `High-efficiency dental revenue cycle management engineered to increase collections.`;
  }
};

export default async function handler(req: VercelReq, res: VercelRes) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type = 'title', prompt = '', currentText = '', context = '' } = req.body || {};

  // Try real Gemini API if key is present
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      let systemPrompt = `You are a high-level healthcare copywriter and dental revenue cycle management (RCM) consultant for US dental practices.
Write crisp, compelling, professional content. Do not include markdown code block quotes or greetings. Output only the requested copy directly.`;

      let userPrompt = '';
      if (type === 'blog_title') {
        userPrompt = `Generate a compelling, SEO-friendly headline for a dental billing article on: "${prompt || 'Dental claim denial reduction'}". Output only 1 strong title.`;
      } else if (type === 'blog_outline' || type === 'blog_content') {
        userPrompt = `Write an authoritative, actionable 3-4 section guide for dental practice owners about: "${prompt || 'Eliminating dental insurance claim denials'}". Include markdown subheadings (###) and bulleted actionable tips.`;
      } else if (type === 'description' || type === 'seo') {
        userPrompt = `Write a high-converting, concise meta description (140-160 characters) for a dental billing service website. Topic/focus: "${prompt || 'US dental insurance billing'}". Current: "${currentText}".`;
      } else if (type === 'title') {
        userPrompt = `Write a clean, professional website title (under 60 characters) for dental billing services focused on: "${prompt || 'Practice Revenue Cycle'}". Current: "${currentText}".`;
      } else {
        userPrompt = `Refine and improve the following text for a professional dental billing website: "${currentText || prompt}". Make it professional and authoritative.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      const generated = response.text?.trim();
      if (generated) {
        return res.status(200).json({
          result: generated,
          isDemo: true,
          provider: 'gemini-3.8-flash',
          watermark: '✨ AI Content Assistant (Demo - Client Preview)',
        });
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to intelligent demo generator:', err);
    }
  }

  // Fallback demo response for client demonstration
  const fallbackFn = DEMO_FALLBACKS[type] || DEMO_FALLBACKS.description;
  const result = fallbackFn(prompt, currentText);

  return res.status(200).json({
    result,
    isDemo: true,
    provider: 'demo-generator',
    watermark: '✨ AI Content Assistant (Demo - Client Preview)',
  });
}
