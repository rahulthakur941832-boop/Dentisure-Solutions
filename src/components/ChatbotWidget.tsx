import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import {
  MessageSquare,
  X,
  Send,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Headphones,
  UserCheck,
} from 'lucide-react';

interface ChatbotWidgetProps {
  onOpenAuditModal: () => void;
  onOpenBrochureModal: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  onOpenAuditModal,
  onOpenBrochureModal,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-init',
      sender: 'assistant',
      text: "Welcome to DentiSure Solutions. I'm here to assist with your practice management software setup, encrypted HIPAA VPN access, claims recovery timelines, or pricing tiers. How can we support your dental practice today?",
      timestamp: 'Just now',
      suggestedPrompts: [
        'How do you access our PMS?',
        'What is your pricing model?',
        'How fast can we onboard?',
        'How do you handle denials?',
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Rule-based knowledge retriever matching the spreadsheet FAQ
  const getKnowledgeAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('vpn') || q.includes('access') || q.includes('remote') || q.includes('hipaa') || q.includes('security')) {
      return "We connect directly to your existing practice management software (Dentrix, Eaglesoft, Open Dental, Curve, etc.) via an enterprise-grade, encrypted HIPAA-compliant VPN. We sign a formal Business Associate Agreement (BAA) before any work begins, and all patient data stays strictly inside your office system.";
    }

    if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('fee') || q.includes('percentage') || q.includes('tier')) {
      return "Our pricing is transparent and performance-based. For Full Revenue Cycle Management, our contingency fee is typically 2.9% to 3.8% of insurance collections (we only earn when you collect). For pre-visit eligibility verification only, it starts at $3.50 per verified patient with no long-term contracts.";
    }

    if (q.includes('onboard') || q.includes('start') || q.includes('timeline') || q.includes('how quickly') || q.includes('how long')) {
      return "Our onboarding takes just 5 to 7 business days! We begin with a 30-minute discovery Zoom, execute our mutual BAA, set up secure VPN credentials, align on billing rules, and go live with zero disruption to your daily chair schedule.";
    }

    if (q.includes('denial') || q.includes('appeal') || q.includes('reject') || q.includes('resubmit')) {
      return "We track every claim daily. If a claim is denied or rejected, our senior dental specialists conduct root-cause analysis, gather clinical chart notes and radiographs, and submit aggressive appeals. We maintain an 88% success rate in overturning dental insurance denials.";
    }

    if (q.includes('staff') || q.includes('front desk') || q.includes('replace') || q.includes('team')) {
      return "We do not replace your front-desk team—we empower them! We eliminate the exhausting 45-minute phone hold times and insurance paperwork, freeing your front desk to focus on greeting patients, presenting treatment plans, and increasing same-day case acceptance.";
    }

    if (q.includes('software') || q.includes('pms') || q.includes('dentrix') || q.includes('eaglesoft') || q.includes('open dental') || q.includes('curve')) {
      return "DentiSure is natively compatible with all major dental practice management systems including Dentrix, Eaglesoft, Open Dental, Curve Dental, CareStack, Denticon, and Patterson Fuse. No software changes or data migrations required.";
    }

    if (q.includes('who are you') || q.includes('what is dentisure') || q.includes('about')) {
      return "DentiSure Solutions is a premier US-based dental billing and revenue cycle partner. Our tagline is 'Your Certainty in Dental Revenue'. We provide pre-visit eligibility verification, daily clean claim submissions, aggressive denial appeals, and aging AR recovery.";
    }

    // Default out-of-scope response explicitly requested in spreadsheet:
    return "I'm sorry, I don't have enough information to answer that accurately. I can connect you with a DentiSure representative who can help you with this.";
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    let botReply = '';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });
      if (res.ok) {
        const data = await res.json();
        botReply = data.reply;
      }
    } catch {
      // Fallback
    }

    if (!botReply) {
      botReply = getKnowledgeAnswer(query);
    }

    setTimeout(() => {
      setIsTyping(false);
      const isOutOfScope = botReply.includes("I don't have enough information");
      const assistantMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'assistant',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLink: isOutOfScope
          ? { label: 'Request Practice Audit', action: 'audit' }
          : undefined,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button - Professional Support Desk */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#12304A] hover:bg-[#16A6A3] text-white rounded-full shadow-xl transition-all hover:scale-105 cursor-pointer border border-slate-700"
          aria-label="Open DentiSure Claims Support Desk"
        >
          <div className="relative">
            <Headphones className="w-4 h-4 text-teal-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <span className="text-xs font-bold tracking-wide pr-1">
            Claims Support Desk
          </span>
        </button>
      )}

      {/* Support Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[390px] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          {/* Top Bar */}
          <div className="bg-[#12304A] text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>DentiSure Practice Concierge</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </h4>
                <p className="text-[10px] text-slate-300">
                  US Claims Specialists &bull; HIPAA Protected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFB]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#12304A] text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-none'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.timestamp}</span>

                {/* Quick Prompts */}
                {m.suggestedPrompts && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {m.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-[10px] font-semibold text-[#12304A] bg-teal-50 hover:bg-teal-100 border border-teal-200/80 px-2 py-1 rounded-md transition-colors text-left cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Out of scope fallback action link */}
                {m.actionLink && (
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenAuditModal();
                      }}
                      className="px-3 py-1.5 bg-[#12304A] hover:bg-[#16A6A3] text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{m.actionLink.label}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 p-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                ></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Ribbon */}
          <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
            <button
              onClick={onOpenAuditModal}
              className="text-[#16A6A3] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Free Revenue Audit</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
            <span className="text-slate-400">Nisha Yadav & Senior RCM Desk</span>
          </div>

          {/* Chat Input Bar */}
          <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about dental billing, VPN, Dentrix..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#16A6A3]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputVal.trim()}
              className="p-2 bg-[#12304A] hover:bg-[#16A6A3] disabled:opacity-30 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
