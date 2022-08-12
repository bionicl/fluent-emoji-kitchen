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
		imageWithFace?: string,
		positions: {
			position: string,
			x: number,
			y: number,
			size: number,
		}[]
	},
	foreground?: {
		image: string,
		overrideFace: boolean,
		imageWithFace?: string, //only if overrideFace is false
		position: string,
	}

	// internal
	url?: string,
}

export function emojiMetadataToFilename(metadata: EmojiMetadata): string {
	return `${metadata.tts.replaceAll(" ", "_")}_color.svg`
}