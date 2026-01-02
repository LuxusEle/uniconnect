"use client";

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X, ChevronRight, ChevronLeft, Bot } from 'lucide-react';
import { useAI } from '@/contexts/AIContext';
import { useAuth } from '@/contexts/AuthContext';

const AICopilot = () => {
    const { isOpen, toggleSidebar, messages, sendMessage, isLoading, currentTip } = useAI();
    const { role } = useAuth();
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, currentTip]);

    const handleSend = async () => {
        if (inputRef.current && inputRef.current.value.trim()) {
            const val = inputRef.current.value;
            inputRef.current.value = '';
            await sendMessage(val);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Toggle Button (Visible when closed or on mobile) */}
            <motion.button
                initial={false}
                animate={{ right: isOpen ? '20rem' : '1rem' }}
                onClick={toggleSidebar}
                className={`fixed top-1/2 -translate-y-1/2 z-50 p-2 rounded-l-xl shadow-lg transition-colors border-y border-l border-white/20
                    ${isOpen
                        ? 'translate-x-[20rem] bg-zinc-900/50 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white right-0 rounded-r-none'
                    } hidden lg:flex items-center justify-center`}
            >
                {isOpen ? <ChevronRight size={20} /> : <Bot size={24} />}
            </motion.button>

            {/* Sidebar Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-zinc-900 shadow-2xl z-40 border-l border-gray-200 dark:border-zinc-800 flex flex-col font-sans"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                    <Sparkles size={16} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm">UniCopilot</h3>
                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{role || 'Student'} Assistant</p>
                                </div>
                            </div>
                            <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-zinc-900/50">

                            {/* Proactive Tip */}
                            <AnimatePresence>
                                {currentTip && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl shadow-sm"
                                    >
                                        <div className="flex gap-2">
                                            <span className="text-lg">💡</span>
                                            <p className="text-xs text-indigo-800 dark:text-indigo-200 leading-relaxed font-medium">
                                                {currentTip}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Welcome Message */}
                            {messages.length === 0 && !currentTip && (
                                <div className="text-center mt-12 px-4">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full mx-auto flex items-center justify-center mb-4 text-gray-400">
                                        <Bot size={32} />
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Hi! I'm here to help you navigate UniConnect. Ask me anything about your courses, fees, or schedule.
                                    </p>
                                </div>
                            )}

                            {/* Chat History */}
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`
                                            max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm
                                            ${msg.role === 'user'
                                                ? 'bg-blue-600 text-white rounded-tr-sm'
                                                : msg.role === 'system'
                                                    ? 'bg-red-50 text-red-600 border border-red-100'
                                                    : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-zinc-700 rounded-tl-sm'
                                            }
                                        `}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-zinc-700">
                                        <div className="flex gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
                            <div className="relative">
                                <input
                                    ref={inputRef}
                                    onKeyDown={handleKeyDown}
                                    type="text"
                                    placeholder="Type your message..."
                                    className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 text-gray-700 dark:text-gray-200 placeholder-gray-400"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                            <p className="text-[9px] text-center text-gray-400 mt-2">
                                AI can make mistakes. Please verify important info.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AICopilot;
