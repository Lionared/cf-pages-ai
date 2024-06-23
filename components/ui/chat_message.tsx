import {Message} from "@/components/types/types.ts";

export default function ChatMessage (props: {message: Message}) {
    const {message} = props
    return (
        <div>
            <strong>{message.author}:</strong> {message.content}
        </div>
    );
}