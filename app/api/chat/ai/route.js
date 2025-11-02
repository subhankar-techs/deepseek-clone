export const maxDuration = 60;
import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";


// Initialize OpenAI client with DeepSeek API key and base URL
if (!process.env.DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY is not configured');
}

const openai = new OpenAI({
    baseURL: process.env.DEEPSEEK_API_BASE_URL,
    apiKey: process.env.DEEPSEEK_API_KEY
});

export async function POST(req){
    try {
        const {userId} = getAuth(req)

        if(!userId){
            return NextResponse.json({
                success: false,
                message: "User not authenticated",
              }, { status: 401 });
        }

        // Extract chatId and prompt from the request body
        const { chatId, prompt } = await req.json();

        if(!chatId || !prompt?.trim()){
            return NextResponse.json({
                success: false,
                message: "Chat ID and prompt are required",
              }, { status: 400 });
        }

        // Find the chat document in the database based on userId and chatId
        await connectDB()
        const data = await Chat.findOne({userId, _id: chatId})

        if(!data){
            return NextResponse.json({
                success: false,
                message: "Chat not found",
              }, { status: 404 });
        }

        // Create a user message object
        const userPrompt = {
            role: "user",
            content: prompt.trim(),
            timestamp: Date.now()
        };

        data.messages.push(userPrompt);

        // Call the DeepSeek API to get a chat completion
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt.trim() }],
            model: "deepseek-chat",
            store: true,
        });

        if(!completion?.choices?.[0]?.message){
            throw new Error("Invalid response from AI service");
        }

        const message = completion.choices[0].message;
        message.timestamp = Date.now()
        data.messages.push(message);
        await data.save();

        return NextResponse.json({success: true, data: message})
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Internal server error" 
        }, { status: 500 });
    }
}