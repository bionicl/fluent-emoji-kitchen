import { EmojiMetadata } from "../types/emojiMetadata";

type Props = {
	emoji: EmojiMetadata;
}

const EmojiButton = ({emoji} : Props) => {
	return (
		<button className="emoji-box">
			<img key={emoji.unicode} src={emoji.url} />
		</button>
	)

}

export default EmojiButton;