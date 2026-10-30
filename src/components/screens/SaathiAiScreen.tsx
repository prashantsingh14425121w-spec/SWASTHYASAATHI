/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  ShieldAlert,
  Info,
  Layers,
  ArrowRight,
  User,
  Bot,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useOffline } from '../../context/OfflineContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { askSaathiAi } from '../../services/gemini';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: string[];
}

export const SaathiAiScreen: React.FC = () => {
  const { t, currentLanguageOption } = useLanguage();
  const { effectiveOnline } = useOffline();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `नमस्ते! I am **Saathi AI**, your community health assistant for Rampur village. 

I can summarize family health registers, check immunization due dates, highlight high-risk pregnancies, and organize your home visit notes.

*Important Note: I assist with record management and follow-up planning. I do not diagnose illnesses or prescribe treatments.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['Sub-Center Chandpur Register', 'Gram Panchayat Rampur Health Records'],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Summarize Meena Yadav’s pregnancy records',
    'Which children have overdue vaccines in Rampur?',
    'What are my priority home visits this week?',
    'Create a checklist for anemia nutrition counseling',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await askSaathiAi(query, currentLanguageOption.name);
      const aiMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Sorry, I encountered an issue retrieving records. Please check local records or try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      // If browser speech recognition is not supported, provide a friendly simulated transcription
      setIsListening(true);
      setTimeout(() => {
        setInputQuery('Summarize upcoming vaccination dues for Rampur children');
        setIsListening(false);
      }, 1500);
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLanguageOption.code === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*_#•]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = currentLanguageOption.code === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-cleared',
        sender: 'assistant',
        text: `Chat history cleared. How can I assist you with your health records in Rampur today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-12">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2EAE5]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#075C45] to-[#087F5B] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#17231E] flex items-center gap-2">
              <span>Saathi AI Assistant</span>
              <span className="text-[10px] uppercase font-bold text-[#087F5B] bg-[#E8F5EF] px-2 py-0.5 rounded-full border border-[#bfe3d4]">
                Google Gemini
              </span>
            </h1>
            <p className="text-xs text-[#78857E]">
              Grounding in 48 household registers, 6 maternal ANC entries & vaccination schedules
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearChat}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Clear Chat
          </Button>
        </div>
      </div>

      {/* Mandatory Clinical Boundary Banner */}
      <div className="p-3 rounded-xl bg-[#F8FAF8] border border-[#E2EAE5] flex items-center gap-2.5 text-xs text-[#78857E]">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
        <p className="leading-tight">
          <strong className="text-[#17231E]">AI Safety Boundary:</strong> Saathi AI organizes records and alerts. It does not provide medical diagnoses or prescribe medications. Refer clinical cases to PHC.
        </p>
      </div>

      {/* Suggested Query Chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-[#78857E] uppercase tracking-wider block">
          Suggested Record Inquiries:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs px-3 py-1.5 rounded-xl bg-white border border-[#E2EAE5] hover:border-[#087F5B] hover:text-[#087F5B] text-[#17231E] transition-all shadow-2xs font-medium text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Box */}
      <Card variant="default" padding="none" className="h-[480px] sm:h-[520px] flex flex-col overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-[#E8F5EF] text-[#075C45] flex items-center justify-center shrink-0 border border-[#bfe3d4]">
                  <Sparkles className="w-4 h-4 text-[#087F5B]" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 space-y-2 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#087F5B] text-white shadow-xs rounded-tr-none'
                    : 'bg-[#F8FAF8] text-[#17231E] border border-[#E2EAE5] rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line prose-xs">{msg.text}</div>

                {/* Sources / Grounded references if present */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-2 border-t border-slate-200/60 text-[10px] space-y-1">
                    <span className="font-semibold text-[#78857E] block uppercase tracking-wider">
                      Supporting Records:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {msg.sources.map((src, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white border border-[#E2EAE5] text-[#075C45] font-medium"
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`flex items-center justify-between pt-1 text-[10px] ${
                    msg.sender === 'user' ? 'text-emerald-100' : 'text-[#78857E]'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'assistant' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakText(msg.text)}
                        className="hover:text-[#087F5B] flex items-center gap-1 font-semibold"
                        title="Listen to response"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen</span>
                      </button>
                      <button
                        onClick={() => copyToClipboard(msg.id, msg.text)}
                        className="hover:text-[#087F5B] flex items-center gap-1"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-[#087F5B]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-[#087F5B] text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#E8F5EF] text-[#075C45] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 animate-spin text-[#087F5B]" />
              </div>
              <div className="bg-[#F8FAF8] border border-[#E2EAE5] p-3 rounded-2xl rounded-tl-none text-xs text-[#78857E] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-pulse" />
                <span>Saathi AI is analyzing Rampur registers...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#E2EAE5] space-y-2">
          {isListening && (
            <div className="text-[11px] text-[#087F5B] font-semibold flex items-center gap-1.5 animate-pulse">
              <Mic className="w-3.5 h-3.5" />
              <span>Listening... Speak your healthcare query in {currentLanguageOption.name}...</span>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleToggleVoiceInput}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-colors ${
                isListening
                  ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                  : 'bg-[#F8FAF8] border-[#E2EAE5] text-[#78857E] hover:text-[#087F5B]'
              }`}
              title="Voice dictation"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask Saathi AI about families, visits, or vaccine due dates..."
              className="flex-1 min-h-[44px] px-4 rounded-xl border border-[#E2EAE5] bg-white text-xs text-[#17231E] focus:outline-none focus:ring-2 focus:ring-[#087F5B] placeholder:text-[#78857E]/70"
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!inputQuery.trim() || isLoading}
              className="font-bold min-h-[44px] shrink-0"
              rightIcon={<Send className="w-4 h-4" />}
            >
              Ask
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
