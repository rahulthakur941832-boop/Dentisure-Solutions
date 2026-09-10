import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

let supabaseClient: any = null;
if (supabaseUrl && supabaseKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  } catch (_) {}
}

const dataDir = path.join(process.cwd(), 'data');
const leadsFilePath = path.join(dataDir, 'leads.json');

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return res.status(200).json({ leads: data, provider: 'supabase' });
        }
      } catch (_) {}
    }

    if (fs.existsSync(leadsFilePath)) {
      try {
        const local = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
        return res.status(200).json({ leads: local, provider: 'local' });
      } catch (_) {}
    }

    return res.status(200).json({ leads: [], provider: 'empty' });
  }

  if (req.method === 'POST') {
    const newLead = req.body;
    if (!newLead || !newLead.doctorName) {
      return res.status(400).json({ error: 'Missing required lead fields' });
    }

    if (supabaseClient) {
      try {
        await supabaseClient.from('leads').insert([
          {
            doctor_name: newLead.doctorName,
            practice_name: newLead.practiceName,
            email: newLead.email,
            phone: newLead.phone,
            state: newLead.state,
            monthly_claims: newLead.monthlyClaims,
            primary_software: newLead.primarySoftware,
            status: newLead.status || 'New Inquiry',
            data: newLead,
          },
        ]);
      } catch (err: any) {
        console.warn('[Leads API] Supabase lead insert note:', err.message);
      }
    }

    try {
      let currentLeads: any[] = [];
      if (fs.existsSync(leadsFilePath)) {
        currentLeads = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
      }
      currentLeads.unshift(newLead);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(leadsFilePath, JSON.stringify(currentLeads, null, 2), 'utf8');
    } catch (_) {}

    return res.status(200).json({ success: true, lead: newLead });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
