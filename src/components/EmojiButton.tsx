import { EmojiMetadata } from "../types/emojiMetadata";

type Props = {
	emoji: EmojiMetadata;
	selectedOption?: EmojiMetadata;
	setSelectedOption: (option: EmojiMetadata) => void;
	disabled?: boolean;
}

const EmojiButton = ({ emoji, selectedOption, setSelectedOption, disabled }: Props) => {
	let isSelected = selectedOption === emoji;
	let className = isSelected ? "emoji-box selected" : "emoji-box";

	return (
		<button
			disabled={disabled}
			className={className}
			onClick={() => setSelectedOption(emoji)}>
			<img alt={emoji.tts} key={emoji.unicode} src={emoji.url} draggable={"false"} />
		</button>
	)

}

export default EmojiButton;