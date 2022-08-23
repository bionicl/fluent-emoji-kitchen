import { Button, Select, Space, Typography } from "antd";
import { EmojiForegroundPosition } from "../types/emojiForegroundPosition";
import { EmojiMetadata } from "../types/emojiMetadata";
import { PreviewImageStatus } from "../types/previewImageStatus";

const { Option } = Select;
const { Text, Title } = Typography;

type Props = {
	json: EmojiMetadata,
	setJson: (arg0: EmojiMetadata) => void,
	setImagePreview: (image: string) => void,
	setPreviewImagestatus: (status: PreviewImageStatus) => void,
	nextPage: () => void
}

function EditorForegroundS2({ json, setJson, setImagePreview, setPreviewImagestatus, nextPage }: Props) {

	function changePosition(newPos: EmojiForegroundPosition) {
		let newJson = { ...json };
		newJson.foreground!.position = newPos;
		setJson(newJson);
	}

	function submit() {
		nextPage();
	}

	return (
		<Space direction="vertical">
			<Title level={4}>Position</Title>
			<Select value={json.foreground!.position as EmojiForegroundPosition} style={{ width: 120 }} onChange={changePosition}>
				<Option value="top">Top</Option>
				<Option value="middle">Middle</Option>
				<Option value="top_right">Top right</Option>
				<Option value="above_face">Above face</Option>
			</Select>
			<Title level={4}>Preview</Title>
			<Button
				type="primary"
				style={{ marginTop: 16 }}
				onClick={() => submit()}
			>
				Finish
			</Button>
		</Space>
	)
}

export default EditorForegroundS2;