import { EmojiMetadata } from "./types/emojiMetadata";
import mergeImages from "merge-images";
import { useState } from "react";
const saveSvgAsPng = require('save-svg-as-png');

type Props = {
	selectedOption1?: EmojiMetadata;
	selectedOption2?: EmojiMetadata;
}

const CombinedImage = ({ selectedOption1, selectedOption2 }: Props) => {

	const [src, setSrc] = useState<string>("");

	function returnSvgFileFromPath(path: string) {
		console.log(path);
		return new Promise((resolve, reject) => {
			import(`${path}`).then(obj => {
				fetch(obj.default)
					.then(response => response.text())
					.then(text => {
						resolve(text);
					})
					.catch(err => {
						reject("Error: " + err.message);
					});
			});
		});
	}

	async function convertSVGToPng(path: string, scale: number = 8) {

		const imageOptions = {
			encoderOptions: 1,
			scale: scale
		};

		return new Promise(async (resolve, reject) => {
			const svgFile: string = await returnSvgFileFromPath(path) as string;
			var parser = new DOMParser();
			var doc = parser.parseFromString(svgFile, "image/svg+xml");
			const svg: SVGElement = doc.querySelector('svg') as SVGElement;

			saveSvgAsPng.svgAsPngUri(svg, imageOptions).then((uri: any) => {
				resolve(uri);
			});
		});
	}

	async function mergeMultiple() {
		console.log(selectedOption1);
		if (selectedOption1 && selectedOption2) {
			console.log("merging...");
			let image1, image2, x, y;

			if (selectedOption1.background != undefined) {
				image1 = await convertSVGToPng("./svgFiles/parts/" + selectedOption1.background.image + ".svg") as string;
				const position = selectedOption1.background.positions.find(pos => pos.position == selectedOption2.foreground?.position);
				const size = position?.size;
				x = position?.x;
				y = position?.y;
				image2 = await convertSVGToPng("./svgFiles/parts/" + selectedOption2.foreground!.image + ".svg", size) as string;
			} else {
				image1 = await convertSVGToPng("./svgFiles/parts/" + selectedOption2.background!.image + ".svg") as string;
				const position = selectedOption2.background!.positions.find(pos => pos.position == selectedOption1.foreground?.position);
				const size = position?.size;
				x = position?.x;
				y = position?.y;
				image2 = await convertSVGToPng("./svgFiles/parts/" + selectedOption1.foreground!.image + ".svg", size) as string;
			}

			mergeImages([
				{

					src:
						image1,
					x: 0,
					y: 0,

				},
				{
					src: image2,
					x: x,
					y: y,
				}
			])
				.then((src) => setSrc(src))
				.catch((err) => console.log(err));
		}
	}

	return (
		<div style={{marginTop: 70}}>
			<h1>Combined Image</h1>
			{src && <img width={300} src={src} alt="" />}
			<button onClick={() => mergeMultiple()}>Merge multiple</button>
		</div>
	)

}

export default CombinedImage;