export type EmojiMetadata = {
	// from Microsoft
	cldr: string,
	fromVersion: string,
	glyph: string,
	glyphAsUtfInEmoticons: string[],
	group: string,
	keywords: string[],
	mappedToEmoticons: string[],
	tts: string,
	unicode: string,

	// overlay info
	background?: {
		image: string,
		positions: {
			position: string,
			x: number,
			y: number,
			size: number,
		}[]
	},
	foreground?: {
		image: string,
		position: string,
	}

	// internal
	url?: string,
}

export function emojiMetadataToFilename(metadata: EmojiMetadata): string {
	return `${metadata.tts.replaceAll(" ", "_")}_color.svg`
}