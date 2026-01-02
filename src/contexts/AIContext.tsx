"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/lib/firebase/schema';

type Message = {
    role: 'user' | 'model' | 'system';
    content: string;
    timestamp: Date;
    isProactive?: boolean;
};

interface AIContextType {
    isOpen: boolean;
    toggleSidebar: () => void;
    messages: Message[];
    sendMessage: (content: string) => Promise<void>;
    isLoading: boolean;
    currentTip: string | null;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true); // Default open on desktop
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTip, setCurrentTip] = useState<string | null>(null);

    const pathname = usePathname();
    const { user, role } = useAuth();

    // Proactive Monitoring Logic
    useEffect(() => {
        // Reset tip on navigation
        setCurrentTip(null);

        // Define route-based tips
        const tips: Record<string, string> = {
            '/dashboard/academics/registration': "👋 Ready to register? Make sure you have your course catalog and advisor approval handy!",
            '/dashboard/financial/mahapola': "💰 Checking Mahapola? Have your student ID and bank passbook details ready.",
            '/dashboard/welfare/hostel': "🏠 Applying for hostel? You'll need your distance certificate and Grama Niladhari letter.",
            '/staff/exams/marks': "📝 Entering marks? Please double-check the student IDs against the physical attendance sheet.",
        };

        // Check if current path matches a tip
        const matchingTip = Object.entries(tips).find(([path, tip]) => pathname?.includes(path));

        if (matchingTip) {
            setCurrentTip(matchingTip[1]);
            // Optionally add to chat history if it's a new session or relevant
            // setMessages(prev => [...prev, { role: 'system', content: matchingTip[1], timestamp: new Date(), isProactive: true }]);
        }

    }, [pathname]);

    const toggleSidebar = () => setIsOpen(prev => !prev);

    const sendMessage = async (content: string) => {
        // Add user message
        const userMsg: Message = { role: 'user', content, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg], // Send history
                    context: {
                        route: pathname,
                        role: role || 'student', // Default to student
                        userId: user?.uid
                    }
                })
            });

            if (!response.ok) throw new Error('Failed to fetch AI response');

            const data = await response.json();

            // Add AI response
            const aiMsg: Message = { role: 'model', content: data.reply, timestamp: new Date() };
            setMessages(prev => [...prev, aiMsg]);

        } catch (error) {
            console.error(error);
            const errorMsg: Message = { role: 'system', content: "I'm having trouble connecting right now. Please try again.", timestamp: new Date() };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AIContext.Provider value={{ isOpen, toggleSidebar, messages, sendMessage, isLoading, currentTip }}>
            {children}
        </AIContext.Provider>
    );
};

export const useAI = () => {
    const context = useContext(AIContext);
    if (!context) throw new Error('useAI must be used within an AIProvider');
    return context;
};
