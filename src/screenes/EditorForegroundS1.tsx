import { Button, Checkbox, Input, Select, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { convertSVGToPng } from "../CombinedImage";
import { EmojiMetadata, emojiMetadataToFilename } from "../types/emojiMetadata";
import { PreviewImageStatus } from "../types/previewImageStatus";


const { Option } = Select;
const { Text, Title } = Typography;

const pathOptions = (
    <>
        <Option value="emoji/">emoji/</Option>
        <Option value="parts/">parts/</Option>
    </>
)

type Props = {
    json: EmojiMetadata,
    setJson: (arg0: EmojiMetadata) => void,
    setImagePreview: (image: string) => void,
    setPreviewImagestatus: (status: PreviewImageStatus) => void,
    nextPage: () => void,
}

function EditorForegroundS1({ json, setJson, setImagePreview, setPreviewImagestatus, nextPage }: Props) {

    const [image, setImage] = useState("");
    const [imagePathStart, setImagePathStart] = useState("emoji/");
    const [imageWithFace, setImageWithFace] = useState("");
    const [imageWithFacePathStart, setImageWithFacePathStart] = useState("parts/");
    const [overrideFace, setOverrideFace] = useState(false);

    useEffect(() => {
        setImage(emojiMetadataToFilename(json, false));
        previewImage(emojiMetadataToFilename(json, false), "emoji/");
    }, []);

    function previewImage(fileName: string, startPath: string) {
        const filePath = "./screenes/svgFiles/" + startPath + fileName + ".svg";
        setPreviewImagestatus("loading");
        return new Promise<void>(async (resolve, reject) => {
            await convertSVGToPng(filePath, 8, 0).then(result => {
                setImagePreview(result as string);
                setPreviewImagestatus("displayed");
                resolve();
            })
                .catch(error => {
                    setPreviewImagestatus("error");
                    resolve();
                });

        });
    }

    function submit() {
        let newJson = { ...json };
        newJson.foreground = {
            image: imagePathStart + image + ".svg",
            overrideFace: overrideFace,
            imageWithFace: imageWithFace ? imageWithFacePathStart + imageWithFace + ".svg" : undefined,
            position: "middle"
        }

        setJson(newJson);
        nextPage();
    }

    return (
        <Space direction="vertical">
            <Title level={4}>Settings</Title>
            <Checkbox checked={overrideFace} onChange={(e) => setOverrideFace(e.target.checked)}>Override face</Checkbox>
            <Text type="secondary">If background image does not have face, optional image with face will be used</Text>
            <Title level={4}>Images</Title>
            <Space>
                <Text>Image: </Text>
                <Input
                    addonBefore={(
                        <Select value={imagePathStart} onChange={(value) => { setImagePathStart(value) }}>
                            {pathOptions}
                        </Select>)}
                    addonAfter=".svg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="fox_color"
                />
                <Button type="dashed" onClick={() => previewImage(image, imagePathStart)}>Preview</Button>
            </Space>
            {overrideFace && (
                <Space>
                    <Text>With face: </Text>
                    <Input
                        addonBefore={(
                            <Select value={imageWithFacePathStart} onChange={(value) => { setImageWithFacePathStart(value) }}>
                                {pathOptions}
                            </Select>)}
                        addonAfter=".svg"
                        value={imageWithFace}
                        placeholder="fox (optional)"
                        onChange={(e) => setImageWithFace(e.target.value)}
                    />
                    <Button type="dashed" onClick={() => previewImage(imageWithFace, imageWithFacePathStart)}>Preview</Button>
                </Space>
            )}
            <Button
                type="primary"
                disabled={image.length <= 1}
                style={{ marginTop: 16 }}
                onClick={() => submit()}
            >
                Next
            </Button>
        </Space>

    )
}

export default EditorForegroundS1;