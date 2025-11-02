import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const { userId } = getAuth(req)

        if(!userId){
            return NextResponse.json({
                success: false, 
                message: "User not authenticated"
            }, { status: 401 })
        }
        
        // Prepare the chat data to be saved in the database
        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
        };

        // Connect to the database and create a new chat
        await connectDB();
        const newChat = await Chat.create(chatData);

        return NextResponse.json({ 
            success: true, 
            message: "Chat created",
            data: newChat 
        })

    } catch (error) {
        console.error('Error creating chat:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Failed to create chat" 
        }, { status: 500 });
    }
}