"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import {Layout} from "antd";
import {type Message} from "@/components/types/types.ts";
import ChatMessage from "@/components/ui/chat_message.tsx";
import ChatForm from "@/components/ui/forms.tsx";
import {sendGPT} from "@/components/server/ai_worker.ts";

const { Header, Content, Footer } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const contentStyle: React.CSSProperties = {
  lineHeight: "30px",
  // color: '#fff',
  backgroundColor: "#fff",
  height: "calc(100vh - 64px - 80px)",
  overflow: "auto",
  padding: 10,
};

const footerStyle: React.CSSProperties = {
  // textAlign: 'center',
  width: "100%",
  color: "#fff",
  backgroundColor: "#4096ff",
  position: "absolute",
  bottom: 0,
};

export default function Page() {
  // 所有数据
  const [messages, setMessages] = useState<Message[]>([]);

  // 是否在回答中
  const [isAnswering, setIsAnswering] = useState<boolean>(false);

  const ContainerRef: any = useRef(null);

  const sendMessage = async (message: string) => {
    const newMessageObj: Message = {
      user: message,
      gpt: "",
    };
    setMessages([...messages, newMessageObj]);
    setIsAnswering(true);
    const stream = await readStream(message);
    if (stream !== undefined && stream !== null) {
      await readStreamData(stream);
    }
  };
  const readStream = async (msg: string) => {
    return await sendGPT(msg);
  };

  const readStreamData = useCallback(
    async (stream: ReadableStream) => {
      if (stream) {
        // 获取读取器
        const reader = stream.getReader();

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            console.log("Stream has been read to completion.");
            setIsAnswering(false);
            break;
          }
          let data = new TextDecoder("utf-8").decode(value);
          data = data.replace("data: ", "");
          try {
            let obj = JSON.parse(data);
            setMessages((prv) => {
              const msg = JSON.parse(JSON.stringify(prv));
              msg[msg.length - 1].gpt = `${msg[msg.length - 1].gpt}${
                obj.response
              }`;
              return msg;
            });
          } catch (errInfo) {
            // console.log(errInfo);
          }
        }
      }
    },
    [messages]
  );

  useEffect(() => {
    if (ContainerRef.current) {
      ContainerRef.current.scrollTop = ContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Layout>
      <Header style={headerStyle}>
        <h1>{"Lion's GPT"}</h1>
      </Header>
      <Content style={contentStyle} ref={ContainerRef}>
        <div id="messages">
          {messages.length === 0 && <div>你好！有什么可以帮助你...</div>}

          {messages.length > 0 &&
            messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                isAnswering={isAnswering}
                isCurAnswer={index === messages.length - 1}
              />
            ))}
        </div>
      </Content>
      <Footer style={footerStyle}>
        <ChatForm onSendMessage={sendMessage} isAnswering={isAnswering} />
      </Footer>
    </Layout>
  );
}
