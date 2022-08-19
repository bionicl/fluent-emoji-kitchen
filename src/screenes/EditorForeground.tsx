import { Button, Card, Checkbox, Input, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { EmojiMetadata } from "../types/emojiMetadata";
import EditorForegroundS1 from "./EditorForegroundS1";

const { TextArea } = Input;
const { Text, Title } = Typography;

type Props = {
    json: object,
	setJson: (arg0: object) => void
}

function EditorForeground({json, setJson} : Props) {

    const [stages, setStages] = useState<JSX.Element[]>([]);
	const [currentStage, setCurrentStage] = useState(0);

    useEffect(() => {
		setStages([<EditorForegroundS1 json={json} setJson={setJson}/>]);
		setCurrentStage(0);
	}, []);

    return (
        stages[currentStage]
    )
}

export default EditorForeground;