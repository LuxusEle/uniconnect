import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from '@google/generative-ai';
import { adminDb } from '@/lib/firebase/admin'; // We need admin SDK for backend ops

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define Tools
const tools = [
    {
        functionDeclarations: [
            {
                name: "readRecord",
                description: "Read a record from the database. Use this to fetch grades, fees, or profile info.",
                parameters: {
                    type: FunctionDeclarationSchemaType.OBJECT,
                    properties: {
                        collection: { type: FunctionDeclarationSchemaType.STRING, description: "Collection path (e.g. 'users', 'courses')" },
                        id: { type: FunctionDeclarationSchemaType.STRING, description: "Document ID" }
                    },
                    required: ["collection", "id"]
                }
            },
            {
                name: "notifyRole",
                description: "Send a notification/request to another role (e.g. Dean, Staff).",
                parameters: {
                    type: FunctionDeclarationSchemaType.OBJECT,
                    properties: {
                        targetRole: { type: FunctionDeclarationSchemaType.STRING, description: "Target role (admin, dean, staff)" },
                        message: { type: FunctionDeclarationSchemaType.STRING, description: "Message content" }
                    },
                    required: ["targetRole", "message"]
                }
            }
        ]
    }
];

// RBAC Guard
const canPerformAction = (role: string, tool: string, args: any): boolean => {
    if (role === 'admin') return true;

    // Students can only read their own data (simplified for this demo - real app needs more strict checks)
    if (role === 'student') {
        if (tool === 'readRecord') return true;
        if (tool === 'notifyRole') return true;
        return false;
    }

    // Staff can read/write academic data
    if (role === 'staff') {
        if (tool === 'readRecord') return true;
        return true;
    }

    return false;
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { messages, context } = body;
        const lastMessage = messages[messages.length - 1].content;
        const role = context.role;

        // System Instruction grounded in Role
        const systemInstruction = `
        You are UniCopilot, an intelligent assistant for the University Management System.
        
        CURRENT CONTEXT:
        - User Role: ${role}
        - Current Page: ${context.route}
        - User ID: ${context.userId}
        
        YOUR RESPONSIBILITIES:
        1. Assist the user with tasks relevant to their role.
        2. Proactively warn them if they are missing requirements (e.g. "Do you have your NIC?").
        3. STRICTLY ADHERE to your role's permissions. You cannot perform actions outside your scope.
        4. If a student asks for something you can't do (e.g. Change Grade), advise them to use 'notifyRole' to contact the Staff.
        
        TONE:
        - Professional, helpful, and concise.
        - If the user is a Student, be encouraging.
        - If the user is Staff/Admin, be efficient.
        `;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: systemInstruction,
            tools: tools
        });

        const chat = model.startChat({
            history: messages.slice(0, -1).map((m: any) => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }]
            }))
        });

        const result = await chat.sendMessage(lastMessage);
        const response = result.response;
        const functionCalls = response.functionCalls();

        let finalText = "";

        if (functionCalls && functionCalls.length > 0) {
            // Handle Tool Calls
            for (const call of functionCalls) {
                const { name, args } = call;

                // Permission Check
                if (!canPerformAction(role, name, args)) {
                    finalText += `[PERMISSION DENIED] I cannot perform '${name}' as a ${role}. Please contact an Administrator. `;
                    continue;
                }

                // Execute Tool (Mocked for Demo if DB not fully set)
                // In production, valid calls would execute here.
                if (name === 'readRecord') {
                    finalText += `(Reading record ${args.collection}/${args.id}...) [Data Fetched] `;
                } else if (name === 'notifyRole') {
                    finalText += `(Notification sent to ${args.targetRole}: "${args.message}") ✅ `;
                }
            }

            // Re-prompt model with tool outputs if needed, or just append confirmation
            finalText += response.text();

        } else {
            finalText = response.text();
        }

        return NextResponse.json({ reply: finalText });

    } catch (error: any) {
        console.error("AI Error:", error);
        return NextResponse.json({ reply: "I encountered an error processing your request." }, { status: 500 });
    }
}
