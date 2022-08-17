import { EmojiMetadata } from "./types/emojiMetadata";
import mergeImages from "merge-images";
import { useEffect, useState } from "react";
const saveSvgAsPng = require('save-svg-as-png');

type Props = {
	selectedOption1?: EmojiMetadata;
	selectedOption2?: EmojiMetadata;
	imageVer: number;
}

const CombinedImage = ({ selectedOption1, selectedOption2, imageVer }: Props) => {

	const [src, setSrc] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		mergeMultiple();
	}, [imageVer]);

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

	async function convertSVGToPng(path: string, scale: number = 8, rotation = 0) {

		const imageOptions = {
			encoderOptions: 1,
			scale: scale,
		};

		return new Promise(async (resolve, reject) => {
			const svgFile: string = await returnSvgFileFromPath(path) as string;
			var parser = new DOMParser();
			var doc = parser.parseFromString(svgFile, "image/svg+xml");
			let svg: SVGElement = doc.querySelector('svg') as SVGElement;
			svg.style.transform = "rotate(" + rotation + "deg)";

			saveSvgAsPng.svgAsPngUri(svg, imageOptions).then((uri: any) => {
				resolve(uri);
			});
		});
	}

	async function mergeMultiple() {
		if (selectedOption1 && selectedOption2) {
			setLoading(true);

			let option1 = selectedOption1;
			let option2 = selectedOption2;
			if (!((option1.background != undefined && option2.background == undefined) || (option1.foreground == undefined && option2.foreground != undefined))) {
				if (!(option1.background && option2.foreground && option2.foreground.overrideFace == false)) {
					[option1, option2] = [option2, option1];
				}
			}

			// Get images
			let backgroundImage = option1.background!.image;
			let foregroundImage = option2.foreground!.image;
			if (option2.foreground!.overrideFace == false) {
				if (option1.background?.imageWithFace) {
					backgroundImage = option1.background!.imageWithFace;
				} else if (option2.foreground!.imageWithFace){
					foregroundImage = option2.foreground!.imageWithFace;
				}
			}
			// get coordinates, size
			let position = option1.background!.positions.find(pos => pos.position == option2.foreground?.position);
			if (option2.foreground!.overrideFace == false) {
				const searchResult = option1.background!.positions.find(pos => pos.position == "above_face");
				position = searchResult ? searchResult : position;
			}
			const size = position?.size;
			const x = position?.x;
			const y = position?.y;
			const rotation = position?.rotation ? position.rotation : 0;

			const image1 = await convertSVGToPng("./screenes/svgFiles/" + backgroundImage) as string;
			const image2 = await convertSVGToPng("./screenes/svgFiles/" + foregroundImage, size, rotation) as string;

			mergeImages([
				{
					src: image1,
					x: 0,
					y: 0,
				},
				{
					src: image2,
					x: x,
					y: y,
				}
			])
				.then((src) => {
					setSrc(src);
					setLoading(false);
				})
				.catch((err) => console.log(err));
		}
	}

	const imageClasses = ["output-image"]
	if (loading) {
		imageClasses.push("loading-image");
	}
	if (!selectedOption2) {
		imageClasses.push("not-selected-image");
		// setPreviouslyNotSelected(true);
	}

	return (
		<div style={{marginTop: 70}}>
			<h1>Combined Image</h1>
			{src && <img className={imageClasses.join(" ")} width={300} src={src} alt="" />}
			{/* <button onClick={() => mergeMultiple()}>Merge multiple</button> */}
		</div>
	)

}

export default CombinedImage;