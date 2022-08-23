import { Button, Card, Checkbox, Input, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { EmojiMetadata } from "../types/emojiMetadata";
import { PreviewImageStatus } from "../types/previewImageStatus";
import EditorForegroundS1 from "./EditorForegroundS1";

const { TextArea } = Input;
const { Text, Title } = Typography;

type Props = {
    json: object,
	setJson: (arg0: object) => void
    setImagePreview: (image: string) => void
    setPreviewImagestatus: (status: PreviewImageStatus) => void
}

function EditorForeground({json, setJson, setImagePreview, setPreviewImagestatus} : Props) {

    const [stages, setStages] = useState<JSX.Element[]>([]);
	const [currentStage, setCurrentStage] = useState(0);

    useEffect(() => {
		setStages([<EditorForegroundS1 json={json} setJson={setJson} setImagePreview={setImagePreview} setPreviewImagestatus={setPreviewImagestatus} />]);
		setCurrentStage(0);
	}, []);

    return (
        stages[currentStage]
    )
}

export default EditorForeground;