
import {useState} from "react";
import {Flex, Input, Button} from 'antd';
import {LeftCircleFilled} from "@ant-design/icons";

export default function ChatForm (props: {onSendMessage: CallableFunction}) {
    const {onSendMessage} = props;
    const [message, setMessage] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage({content: message, author: 'You'});
            setMessage('')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Flex>
                <Input
                    type="text"
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                    placeholder="type your message"
                />
                <Button type="primary" icon={<LeftCircleFilled/>} onClick={handleSubmit}></Button>
            </Flex>
        </form>
    );
}