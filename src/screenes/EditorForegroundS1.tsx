import { Button, Card, Checkbox, Input, Space, Typography } from "antd";
import { useState } from "react";
import { convertSVGToPng } from "../CombinedImage";
import { EmojiMetadata } from "../types/emojiMetadata";

const { TextArea } = Input;
const { Text, Title } = Typography;

type Props = {
    json: object,
	setJson: (arg0: object) => void,
    setImagePreview: (image: string) => void
}

function EditorForegroundS1({json, setJson, setImagePreview} : Props) {

    const [image, setImage] = useState("");
    const [imageWithFace, setImageWithFace] = useState("");
    const [overrideFace, setOverrideFace] = useState(false);

    function previewImage(fileName : string) {
        const filePath = "./screenes/svgFiles/" + fileName;
        return new Promise<void>(async (resolve, reject) => {
            let png = await convertSVGToPng(filePath, 8, 0) as string;
            setImagePreview(png);
            resolve();
        });
    }

    return (
        <Space direction="vertical">
            <Title level={4}>Settings</Title>
            <Checkbox value={overrideFace} onChange={(e) => setOverrideFace(e.target.checked)}>Override face</Checkbox>
            <Text type="secondary">If background image does not have face, optional image with face will be used</Text>
            <Title level={4}>Images</Title>
            <Space>
                <Text>Image: </Text>
                <Input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="emoji/fox_color.svg"
                />
                <Button onClick={() => previewImage(image)}>Preview</Button>
            </Space>
            {overrideFace && (
                <Space>
                    <Text>Image with face: </Text>
                    <Input
                        value={imageWithFace}
                        placeholder="parts/fox.svg (optional)"
                        onChange={(e) => setImageWithFace(e.target.value)}
                    />
                    <Button onClick={() => previewImage(imageWithFace)}>Preview</Button>
                </Space>
            )}
            <Button
				type="primary"
				disabled={!image.includes(".svg")}
                style={{marginTop: 16}}
				// onClick={() => setupAfterStart(background, foreground)}
				>
					Next
			</Button>
        </Space>

    )
}

export default EditorForegroundS1;