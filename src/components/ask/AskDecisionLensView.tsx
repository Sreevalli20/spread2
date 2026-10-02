import React, { useState, useRef, useEffect } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  MessageSquareCode,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

export const AskDecisionLensView: React.FC = () => {
  const {
    chatMessages,
    isAiThinking,
    sendChatMessage,
    analysis,
    openEvidenceDrawer,
  } = useAnalytics();

  const [inputQuestion, setInputQuestion] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What is driving revenue?',
    'What should I investigate first?',
    'Which anomalies matter most?',
    'Where are margins weakest?',
    'What changed over time?',
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuestion.trim() || isAiThinking) return;
    sendChatMessage(inputQuestion);
    setInputQuestion('');
  };

  const handleSuggestedClick = (q: string) => {
    if (isAiThinking) return;
    sendChatMessage(q);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiThinking]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-4xl mx-auto pb-4">
      {/* Header Context Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/60 px-4 py-3 rounded-t-xl shrink-0 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Decision Intelligence Co-Pilot</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              Grounding Context: {analysis?.dataset_name || 'No dataset'} (
              {analysis?.data_quality?.row_count || 0} rows)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Deterministic Audit Active</span>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-[#0A0E1A]/40 border-x border-slate-200 dark:border-white/8">
        {chatMessages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 mt-1">
                  <Bot className="h-3.5 w-3.5" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-xl p-4 text-xs leading-relaxed space-y-2.5 ${
                  isUser
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white dark:bg-[#101625] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/8 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] opacity-75 font-mono">
                  <span>{isUser ? 'Executive Query' : 'Synthesized Analysis'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {msg.content}
                </p>

                {/* Evidence References & Limitations */}
                {!isUser && (
                  <>
                    {msg.evidenceReferences && msg.evidenceReferences.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 dark:border-white/8 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          Source Evidence:
                        </span>
                        {msg.evidenceReferences.map((evId) => (
                          <button
                            key={evId}
                            onClick={() => openEvidenceDrawer(evId)}
                            className="inline-flex items-center gap-1 rounded bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 px-2 py-0.5 font-mono text-[11px] text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 transition-colors"
                          >
                            <span>{evId}</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </button>
                        ))}
                      </div>
                    )}

                    {msg.limitations && msg.limitations.length > 0 && (
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono italic">
                        {msg.limitations.join(' · ')}
                      </div>
                    )}
                  </>
                )}
              </div>

              {isUser && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-700 text-white mt-1 shadow-xs">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {/* AI Thinking State */}
        {isAiThinking && (
          <div className="flex gap-3 justify-start">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625] p-3 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 animate-spin" />
              <span>Querying dataset ledger and cross-referencing statistical bounds...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Bar */}
      <div className="bg-slate-100 dark:bg-[#0C111E] border-x border-slate-200 dark:border-white/8 px-4 py-2 overflow-x-auto flex items-center gap-2">
        <span className="text-[10px] font-mono uppercase text-slate-500 whitespace-nowrap">
          Suggested:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestedClick(q)}
            disabled={isAiThinking}
            className="rounded-md border border-slate-200 dark:border-white/8 bg-white dark:bg-white/3 px-2.5 py-1 text-xs text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-700 dark:hover:text-white whitespace-nowrap transition-colors disabled:opacity-50 shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Composer */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625] p-3 rounded-b-xl shadow-xs"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Ask a question about revenue drivers, cost inflation, or specific cohorts..."
          disabled={isAiThinking}
          className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden"
        />

        <button
          type="submit"
          disabled={!inputQuestion.trim() || isAiThinking}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors disabled:opacity-40 cursor-pointer shadow-xs"
          aria-label="Send query"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
};
