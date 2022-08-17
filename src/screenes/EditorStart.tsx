import { Button, Card, Checkbox, Input, Space, Typography } from "antd";
import { useState } from "react";
import { EmojiMetadata } from "../types/emojiMetadata";

const { TextArea } = Input;
const { Text, Title } = Typography;

type Props = {
	json: object,
	setJson: (arg0: object) => void,
}

function EditorStart({json, setJson} : Props) {
	const [metadataText, setMetadataText] = useState("");

	return (
		<Space direction="vertical">
			<Text type="secondary">Let's start creating new emoji! Please select what kind of emoji it is and paste in JSON metadata from Microsoft.</Text>
			<Title level={4}>Type</Title>
			<Checkbox>Background</Checkbox>
			<Checkbox>Foreground</Checkbox>
			<Title level={4}>JSON metadata</Title>
			<TextArea style={{width: 300}}value={metadataText} onChange={(e) => {
				setMetadataText(e.target.value);
			}} />
			<Button>Start</Button>
		</Space>
	)
}

export default EditorStart;