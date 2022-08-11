import { EmojiMetadata } from "../types/emojiMetadata";

type Props = {
	emoji: EmojiMetadata;
	selectedOption?: EmojiMetadata;
	setSelectedOption: (option: EmojiMetadata) => void;
}

const EmojiButton = ({emoji, selectedOption, setSelectedOption} : Props) => {
	let isSelected = selectedOption === emoji;
	let className = isSelected ? "emoji-box selected" : "emoji-box";

	return (
		<button
			className={className}
			onClick={() => setSelectedOption(emoji)}>
			<img key={emoji.unicode} src={emoji.url} draggable={"false"} />
		</button>
	)

}

export default EmojiButton;