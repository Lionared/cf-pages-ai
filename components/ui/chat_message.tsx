import { Message } from "@/components/types/types.ts";

const cursor: React.CSSProperties = {
  animation: "flicker 0.8s infinite",
};

export default function ChatMessage(props: {
  message: Message;
  isAnswering: boolean; // 是否在回答问题
  isCurAnswer: boolean; // 是否在回答当前这条
}) {
  const { message, isAnswering, isCurAnswer } = props;
  return (
    <div>
      <div>
        <strong>user:</strong> {message.user}
      </div>
      <div>
        <strong>gpt:</strong> {message.gpt}{" "}
        {isAnswering && isCurAnswer && <span style={cursor}>|</span>}
      </div>
    </div>
  );
}
