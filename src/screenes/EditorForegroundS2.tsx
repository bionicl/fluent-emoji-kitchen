import { EmojiMetadata } from "../types/emojiMetadata";
import { PreviewImageStatus } from "../types/previewImageStatus";


type Props = {
	json: EmojiMetadata,
	setJson: (arg0: EmojiMetadata) => void,
	setImagePreview: (image: string) => void,
	setPreviewImagestatus: (status: PreviewImageStatus) => void
}

function EditorForegroundS2({ json, setJson, setImagePreview, setPreviewImagestatus }: Props) {
	return (
		<p>S2</p>
	)
}

export default EditorForegroundS2;