import { Typography } from "antd";
import { EmojiMetadata } from "../types/emojiMetadata";

const { Text } = Typography;

type Props = {
    json: EmojiMetadata,
    setJson: (arg0: EmojiMetadata) => void
}

function EditorBackground({ json, setJson }: Props) {
    return (
        <Text>background editor</Text>
    )
}

export default EditorBackground;