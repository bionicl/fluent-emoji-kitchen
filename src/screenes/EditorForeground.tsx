import { useState } from "react";
import { EditorForegroundStage } from "../types/editorStage";
import { EmojiMetadata } from "../types/emojiMetadata";
import { PreviewImageStatus } from "../types/previewImageStatus";
import EditorForegroundS1 from "./EditorForegroundS1";
import EditorForegroundS2 from "./EditorForegroundS2";

type Props = {
    json: EmojiMetadata,
    setJson: (arg0: EmojiMetadata) => void
    setImagePreview: (image: string) => void
    setPreviewImagestatus: (status: PreviewImageStatus) => void
}

function EditorForeground({ json, setJson, setImagePreview, setPreviewImagestatus }: Props) {

    const [stages, setStages] = useState<EditorForegroundStage[]>(["start"]);
    const [currentStage, setCurrentStage] = useState(0);

    function nextPage() {
        setCurrentStage(currentStage + 1);
    }

    function returnStage() {
        switch (stages[currentStage]) {
            case "start":
                return <EditorForegroundS1 json={json} setJson={setJson} setImagePreview={setImagePreview} setPreviewImagestatus={setPreviewImagestatus} />;

            case "position":
                return <EditorForegroundS2 json={json!} setJson={setJson} setImagePreview={setImagePreview} setPreviewImagestatus={setPreviewImagestatus} />

            default:
                return (<p>No stage</p>);
        }
    }

    return (returnStage());
}

export default EditorForeground;