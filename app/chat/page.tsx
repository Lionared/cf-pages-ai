'use client';

import React, {useEffect, useState} from "react";
import {Layout} from 'antd';
import {type Message} from "@/components/types/types.ts";
import ChatMessage from "@/components/ui/chat_message.tsx";
import ChatForm from '@/components/ui/forms.tsx';
import {sendGPT} from "@/components/server/ai_worker.ts";

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
    const [streamData, setStreamData] = useState('');
    const [messageSend, setMessageSend] = useState<Message>();
    const [stream, setStream] = useState<ReadableStream<Uint8Array>>();

    const sendMessage = async (message: Message) => {
        setMessageSend(message);
        setMessages((prevMessages) => [...prevMessages, message]);
        const resMessage: Message = {content: streamData, author: 'GPT'};
        const _stream = await readStream();
        if (_stream !== undefined && _stream !== null) {
            setStream(_stream);
        }
        setMessages((prevMessages) => [...prevMessages, resMessage]);
    }
    const readStream = async () => {
        if (messageSend === undefined) {
            return;
        }
        const stream = await sendGPT(messageSend.content);
        console.log("sendGPT result:" + stream);
        return stream;
    }

    useEffect(() => {
        stream?.getReader().read().then((p) => {
            if (p.done) {
                return;
            }
            console.log("readStream:", p.value);
            // data: {"response":"Here","p":"abcdefghijklmnopqrst"}
            let data = new TextDecoder('utf-8').decode(p.value);
            data = data.replace('data: ', '')
            let obj = JSON.parse(data);
            setStreamData(prevData => prevData.concat(obj.response))
        })
    }, [stream, streamData])

    return (
        <Layout>
            <Header style={headerStyle}>
                <h1>{"Lion's GPT"}</h1>
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