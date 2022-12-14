import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import CombinedImage from './../CombinedImage';
import EmojiButton from './../components/EmojiButton';
import emojiConfig from "./../emojiConfig.json";
import { EmojiMetadata, emojiMetadataToFilename } from './../types/emojiMetadata';

function Combinator() {

	const [baseEmojis, setBaseEmojis] = useState<EmojiMetadata[]>([]);
	const [selectedOption1, setSelectedOption1] = useState<EmojiMetadata>();
	const [selectedOption2, setSelectedOption2] = useState<EmojiMetadata>();
	const [disabledOptions, setDisabledOptions] = useState<EmojiMetadata[]>([]);
	const [imageVer, setImageVer] = useState<number>(0);

	function loadEmojiOptions() {
		emojiConfig.baseEmoji.forEach(emoji => {
			if (!baseEmojis.find(e => e.unicode === emoji.unicode)) {
				const fileName = emojiMetadataToFilename(emoji);
				const filePath = "./svgFiles/emoji/" + fileName;
				import(`${filePath}`).then(obj => {
					if (!baseEmojis.includes(obj.default)) {
						setBaseEmojis(prevState => [...prevState, { ...emoji, url: obj.default }]);
					}
				}).catch(err => {
					console.log(err);
				});
			}
		});
	}

	function checkForDisabledOptions() {
		let toDisable: EmojiMetadata[] = [];
		if (selectedOption1 === undefined) {
			baseEmojis.forEach(emoji => {
				toDisable.push(emoji);
			});
		} else if (selectedOption1.background === undefined) {
			baseEmojis.forEach(emoji => {
				if (emoji.background === undefined) {
					toDisable.push(emoji);
				}
			});
		} else if (selectedOption1.foreground === undefined) {
			baseEmojis.forEach(emoji => {
				if (emoji.foreground === undefined) {
					toDisable.push(emoji);
				}
			});
		}
		if (selectedOption1) {
			toDisable.push(selectedOption1);
		}

		if (selectedOption2 && toDisable.includes(selectedOption2)) {
			setSelectedOption2(undefined);
		}
		setDisabledOptions(toDisable);
	}

	useEffect(() => {
		loadEmojiOptions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		checkForDisabledOptions();
		if (selectedOption1 && selectedOption2) {
			setImageVer(prevState => prevState + 1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption1, selectedOption2]);

	return (
		<div style={{ textAlign: "center" }}>
			<Row>
				<Col xl={12}>
					<h1>Emoji 1</h1>
					<div className='emoji-container'>
						{baseEmojis.sort((a, b) => a.cldr > b.cldr ? 1 : -1).map((emoji, index) => {
							return <EmojiButton emoji={emoji} selectedOption={selectedOption1} setSelectedOption={setSelectedOption1} key={index} />
						})}
					</div>
				</Col>
				<Col xl={12}>
					<h1>Emoji 2</h1>
					<div className='emoji-container'>
						{baseEmojis.map((emoji, index) => {
							return <EmojiButton
								disabled={disabledOptions.includes(emoji)}
								emoji={emoji}
								selectedOption={selectedOption2}
								setSelectedOption={setSelectedOption2}
								key={index}
							/>
						})}
					</div>
				</Col>
			</Row>
			<CombinedImage selectedOption1={selectedOption1} selectedOption2={selectedOption2} imageVer={imageVer} />
		</div>
	);

}

export default Combinator;