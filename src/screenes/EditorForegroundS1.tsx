import { Button, Card, Checkbox, Input, Space, Typography } from "antd";
import { useState } from "react";
import { EmojiMetadata } from "../types/emojiMetadata";

const { TextArea } = Input;
const { Text, Title } = Typography;

type Props = {
    json: object,
	setJson: (arg0: object) => void
}

function EditorForegroundS1({json, setJson} : Props) {

    const [image, setImage] = useState("");
    const [imageWithFace, setImageWithFace] = useState("");
    const [overrideFace, setOverrideFace] = useState(false);

    return (
        <Space direction="vertical">
            <Title level={4}>Settings</Title>
            <Checkbox value={overrideFace} onChange={(e) => setOverrideFace(e.target.checked)}>Override face</Checkbox>
            <Text type="secondary">If background image does not have face, optional image with face will be used</Text>
            <Title level={4}>Images</Title>
            <Space>Image: <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="emoji/fox_color.svg" /></Space>
            {overrideFace && (
                <Space>Image with face: <Input placeholder="parts/fox.svg (optional)" /></Space>
            )}
            <Button
				type="primary"
				disabled={!image.includes(".svg")}
				// onClick={() => setupAfterStart(background, foreground)}
				>
					Next
			</Button>
        </Space>

    )
}

export default EditorForegroundS1;