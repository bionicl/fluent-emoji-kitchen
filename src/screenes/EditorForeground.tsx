import { Button, Card, Checkbox, Input, Space, Typography } from "antd";
import { useState } from "react";
import { EmojiMetadata } from "../types/emojiMetadata";

const { TextArea } = Input;
const { Text, Title } = Typography;

type Props = {
    json: object,
	setJson: (arg0: object) => void
}

function EditorForeground({json, setJson} : Props) {
    return (
        <Text>foreground editor</Text>
    )
}

export default EditorForeground;