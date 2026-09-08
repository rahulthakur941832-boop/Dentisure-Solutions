import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Security and parse headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(express.json({ limit: '500kb' }));

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
function applyRateLimit(limit: number, windowMs: number) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const clientRecord = rateLimitMap.get(ip);

    if (!clientRecord || now > clientRecord.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (clientRecord.count >= limit) {
      res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
      return;
    }

    clientRecord.count += 1;
    next();
  };
}

// In-memory leads storage synced with client
const submittedLeads: any[] = [];

// Gemini Client Lazy Initializer
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'DentiSure Solutions API',
    security: 'HIPAA-Ready Architecture Enforced',
    timestamp: new Date().toISOString(),
  });
});

// Leads submission endpoint with rate limiting
app.post('/api/leads', applyRateLimit(20, 60000), (req, res) => {
  const newLead = req.body;
  if (!newLead || !newLead.doctorName) {
    res.status(400).json({ error: 'Missing required lead fields' });
    return;
  }
  submittedLeads.unshift(newLead);
  console.log(`[DentiSure Leads] New audit requested for ${newLead.doctorName} (${newLead.practiceName}) - Forwarding alert to usmilesbilling@gmail.com`);
  res.json({ success: true, lead: newLead, count: submittedLeads.length });
});

app.get('/api/leads', (req, res) => {
  res.json({ leads: submittedLeads });
});

// AI Chatbot endpoint with rate limiting (Gemini with Knowledge Base fallback)
app.post('/api/chat', applyRateLimit(30, 60000), async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const ai = getGeminiClient();

  if (ai) {
    try {
      const systemInstruction = `You are the official AI Practice Assistant for "DentiSure Solutions", a premier dental insurance billing and revenue cycle management service operating nationwide for US dental practices.
Brand Tagline: "Your Certainty in Dental Revenue"
Administrator: Nisha Yadav (usmilesbilling@gmail.com)
Phone: (888) 542-SURE

Core Facts & Directives:
1. DentiSure provides: Pre-visit insurance verification (72h in advance, full 23-point breakdown), daily clean claim submission & scrubbing, assertive denial appeals (88% overturned rate), aging AR recovery (reduces 90+ day AR by 50%+ in 90 days), and line-by-line payment posting.
2. Technology & Security: HIPAA-ready architecture and security safeguards. Connects directly to existing practice software (Dentrix, Eaglesoft, Open Dental, Curve Dental, CareStack, etc.) via encrypted remote VPN or zero-trust desktop access. Signs a mutual HIPAA Business Associate Agreement (BAA) before accessing any practice systems. All patient data remains strictly inside the practice's authorized PMS.
3. Billing Team: Dedicated dental billing and revenue cycle specialists experienced with ADA CDT coding, payer clearinghouses, and denial appeal protocols.
4. Business Setup: US registered business setup providing nationwide remote dental revenue cycle management for dental practices across all 50 US states. Do not invent physical office locations or claim physical staff in the US.
5. Pricing: Transparent performance-aligned pricing. Full RCM is 2.9% to 3.8% contingency on insurance collections (only pay when you collect). Verification only starts at $3.50/verified patient.
6. Onboarding: Rapid 1-week (5-7 business days) onboarding.
7. Important Rule: If a user asks something unrelated to dental billing, dental practices, or DentiSure services, reply with:
"I'm sorry, I don't have enough information to answer that accurately. I can connect you with a DentiSure representative who can help you with this."

Keep responses concise, professional, warm, and focused on dental practice success.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] },
        ],
      });

      const replyText = response.text || '';
      if (replyText.trim()) {
        res.json({ reply: replyText.trim() });
        return;
      }
    } catch (err) {
      console.warn('Gemini chat error, proceeding to fallback:', err);
    }
  }

  // Fallback response matching the spreadsheet FAQ
  const q = message.toLowerCase();
  let reply = "I'm sorry, I don't have enough information to answer that accurately. I can connect you with a DentiSure representative who can help you with this.";

  if (q.includes('vpn') || q.includes('access') || q.includes('remote') || q.includes('hipaa') || q.includes('security')) {
    reply = "We connect directly to your existing practice management software (Dentrix, Eaglesoft, Open Dental, Curve, etc.) via an enterprise-grade, encrypted HIPAA-ready remote VPN. We sign a formal mutual Business Associate Agreement (BAA) before any work begins, and all data stays strictly inside your practice system.";
  } else if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('percentage')) {
    reply = "Our pricing is transparent and performance-based. For Full Revenue Cycle Management, our fee is typically 2.9% to 3.8% of insurance collections (contingency — we only get paid when you collect). For pre-visit eligibility verification only, it starts at $3.50 per verified patient with no long-term contracts.";
  } else if (q.includes('onboard') || q.includes('start') || q.includes('timeline') || q.includes('how quickly')) {
    reply = "Our onboarding takes just 5 to 7 business days! We begin with a 30-minute discovery Zoom, execute our mutual BAA, set up secure remote VPN credentials, align on fee schedules, and go live with zero disruption to your daily chair schedule.";
  } else if (q.includes('denial') || q.includes('appeal') || q.includes('reject')) {
    reply = "We track every claim daily. If a claim is denied or rejected, our dental specialists perform root-cause analysis, gather clinical chart notes and radiographs, and submit aggressive appeals. We maintain an 88% success rate in overturning dental insurance denials.";
  } else if (q.includes('staff') || q.includes('front desk') || q.includes('replace')) {
    reply = "We do not replace your front-desk team—we empower them! We eliminate the exhausting 45-minute phone hold times and insurance paperwork, freeing your front desk to focus on greeting patients, presenting treatment plans, and increasing same-day case acceptance.";
  } else if (q.includes('software') || q.includes('pms') || q.includes('dentrix') || q.includes('eaglesoft') || q.includes('open dental') || q.includes('curve')) {
    reply = "DentiSure is natively compatible with all major dental practice management systems including Dentrix, Eaglesoft, Open Dental, Curve Dental, CareStack, Denticon, and Patterson Fuse. No software change is required.";
  } else if (q.includes('who are you') || q.includes('what is dentisure')) {
    reply = "DentiSure Solutions is a premier dental insurance billing and revenue cycle partner serving practices nationwide. Our tagline is 'Your Certainty in Dental Revenue'. We provide pre-visit eligibility verification, daily clean claim submissions, aggressive denial appeals, and aging AR recovery.";
  }

  res.json({ reply });
});

// Setup Vite middleware or static serving
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DentiSure Solutions server running on http://localhost:${PORT}`);
  });
}

start();
