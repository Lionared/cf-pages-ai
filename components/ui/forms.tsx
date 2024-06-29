import { useState } from "react";
import { Flex, Input, Button } from "antd";
import { LeftCircleFilled } from "@ant-design/icons";

export default function ChatForm(props: {
  onSendMessage: CallableFunction;
  isAnswering: boolean;
}) {
  const { onSendMessage, isAnswering } = props;
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!message || isAnswering) return;
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  return (
    <form
        onSubmit={handleSubmit}
    >
      <Flex>
        <Input
          type="text"
          value={message}
          onChange={(e: any) => setMessage(e.target.value)}
          placeholder="type your message"
        />
        <Button
          type="primary"
          icon={<LeftCircleFilled />}
          onClick={handleSubmit}
        ></Button>
      </Flex>
    </form>
  );
}
