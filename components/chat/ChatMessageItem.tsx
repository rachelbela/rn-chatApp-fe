import { ChatMessage } from '@/types/chat'
import React from 'react'
import AIMessage from './AIMessage'
import UserMessage from './UserMessage'

export default function ChatMessageItem({ item }: { item: ChatMessage }) {
    return (
        item.role === "user" ? <UserMessage content={item.content} /> : <AIMessage item={item} />
    )
}