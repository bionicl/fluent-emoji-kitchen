import { Button, Checkbox, Input, Space, Typography } from "antd";
import { useState } from "react";
import { EmojiMetadata } from "../types/emojiMetadata";

const { TextArea } = Input;
const { Text, Title } = Typography;

type Props = {
	setupAfterStart: (background: boolean, foreground: boolean, newJson: EmojiMetadata) => void
}

function EditorStart({ setupAfterStart }: Props) {
	const [metadataText, setMetadataText] = useState("");
	const [validJson, setValidJson] = useState(false);
	const [background, setBackground] = useState(false);
	const [foreground, setForeground] = useState(false);
	const [json, setJson] = useState<EmojiMetadata>();

	return (
		<Space direction="vertical">
			<Text type="secondary">Let's start creating new emoji! Please select what kind of emoji it is and paste in JSON metadata from Microsoft.</Text>
			<Title level={4}>Type</Title>
			{/* <Checkbox checked={background} onChange={(e) => setBackground(e.target.checked)}>Background</Checkbox> */}
			<Checkbox checked={foreground} onChange={(e) => setForeground(e.target.checked)}>Foreground</Checkbox>
			<Title level={4}>JSON metadata</Title>
			<TextArea style={{ width: 300 }} value={metadataText} onChange={(e) => {
				setMetadataText(e.target.value);
				try {
					let json: EmojiMetadata = JSON.parse(e.target.value);
					if (json) {
						setJson(json);
						setValidJson(true);
					}
				} catch (error) {
					setValidJson(false);
				}
			}} />
			{!validJson && (
				<Text type="danger">Please enter correct JSON file!</Text>
			)}
			<Button
				type="primary"
				disabled={!validJson || (!foreground && !background)}
				onClick={() => setupAfterStart(background, foreground, json!)}
			>
				Start
			</Button>
		</Space>
	)
}

export default EditorStart;