export type EmojiMetadata = {
	cldr: string,
	fromVersion: string,
	glyph: string,
	glyphAsUtfInEmoticons: string[],
	group: string,
	keywords: string[],
	mappedToEmoticons: string[],
	tts: string,
	unicode: string,
	url?: string
}

export function emojiMetadataToFilename(metadata: EmojiMetadata): string {
	return `${metadata.tts.replace(" ", "_")}_color.svg`
}