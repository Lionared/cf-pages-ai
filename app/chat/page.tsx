'use client';

import React, {useState} from "react";
import {Layout} from 'antd';
import {Message} from "@/components/types/types.ts";
import ChatMessage from "@/components/ui/chat_message.tsx";
import ChatForm from '@/components/ui/forms.tsx';

const {Header, Content, Footer} = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
    lineHeight: '30px',
    // color: '#fff',
    backgroundColor: '#fff',
};

const footerStyle: React.CSSProperties = {
    // textAlign: 'center',
    width: '100%',
    color: '#fff',
    backgroundColor: '#4096ff',
    position: 'absolute',
    bottom: 10,
};

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    }

    return (
        <Layout>
            <Header style={headerStyle}>
                <h1>Cloudflare GPT</h1>
            </Header>
            <Content style={contentStyle}>
                <div id='messages'>
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message}/>
                    ))}
                </div>
            </Content>
            <Footer style={footerStyle}>
                <ChatForm onSendMessage={sendMessage}/>
            </Footer>
        </Layout>
    );
}