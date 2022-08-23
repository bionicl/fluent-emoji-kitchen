
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
		positions: EmojiPosition[][]
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

export type EmojiPosition = {
	position: string,
	rotation?: number,
	x: number,
	y: number,
	size: number,
}

export function emojiMetadataToFilename(metadata: EmojiMetadata, withSVG: boolean = true): string {
	let output = `${metadata.tts.replaceAll(" ", "_")}_color`;
	if (withSVG) {
		output += ".svg";
	}
	return output
}