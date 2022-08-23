import { Card, Col, Result, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { EditorStage } from "../types/editorStage";
import { EmojiMetadata } from "../types/emojiMetadata";
import { PreviewImageStatus } from "../types/previewImageStatus";
import EditorBackground from "./EditorBackground";

import EditorForeground from "./EditorForeground";
import EditorStart from "./EditorStart";

function Editor() {

	const [stages, setStages] = useState<EditorStage[]>(["start"]);
	const [currentStage, setCurrentStage] = useState(0);
	const [json, setJson] = useState<EmojiMetadata>();
	const [previewImage, setPreviewImage] = useState("");
	const [previewImageStatus, setPreviewImagestatus] = useState<PreviewImageStatus>("noImage");

	// function tempSetJson(json: EmojiMetadata) {
	// 	console.log("PRE: " + JSON.stringify(json));
	// 	setJson(json);
	// 	console.log("POST: " + JSON.stringify(json));
	// }

	useEffect(() => {
		console.log("JSON updated: " + JSON.stringify(json));
	}, [json]);

	function nextPage() {
		setCurrentStage(currentStage + 1);
	}

	function setupAfterStart(background: boolean, foreground: boolean, newJson: EmojiMetadata) {
		setJson(newJson);
		// if (background) {
		// 	setStages(stages => [...stages, <EditorBackground json={json} setJson={setJson} />]);
		// }
		if (foreground) {
			setStages(stages => [...stages, "foreground"]);
		}
		nextPage();
	}

	function setImagePreview(image: string) {
		if (image.length > 0) {
			setPreviewImage(image);
		}
	}

	function returnStage() {
		switch (stages[currentStage]) {
			case "start":
				return <EditorStart setupAfterStart={setupAfterStart} />;

			case "foreground":
				return <EditorForeground json={json!} setJson={setJson} setImagePreview={setImagePreview} setPreviewImagestatus={setPreviewImagestatus} />

			case "background":
				return <EditorBackground json={json!} setJson={setJson} />;

			default:
				return (<p>No stage</p>);
		}
	}

	function preview() {
		if (previewImageStatus === "noImage") {
			return (
				<Result
					status="info"
					title="No preview selected"
				/>
			)
		} else if (previewImageStatus === "error") {
			return (
				<Result
					status="warning"
					title="Incorrect file"
				/>
			)
		} else if (previewImageStatus === "loading") {
			return (
				<Spin style={{
					margin: "0 auto",
				}} size="large">
					<img width={"100%"} src={previewImage} alt="" />
				</Spin>
			)
		}
		return <img width={"100%"} src={previewImage} alt="" />;
	}

	return (
		<Row gutter={16} style={{ padding: 16, maxWidth: 1000, margin: "0 auto" }}>
			<Col xs={14}>
				<Card>
					<h1>Creator</h1>
					{returnStage()}
					<p>Editor: {JSON.stringify(json)}</p>
					{/* <Button onClick={() => setJson({test: "test"})}>Add to JSON editor</Button> */}
				</Card>
			</Col>
			<Col xs={10}>
				<Card>
					<h1>Preview</h1>
					<>{preview()}</>
				</Card>
			</Col>
		</Row>
	)
}

// 1. Start (background, foreground, detail)

// Background
// 2. Graphic/Graphic with face
// 3. Position Top
// 4. Position Middle
// 5. Position top_right
// 6. Position above_face (if graphic with face)

// Foreground/Detail
// 2. Graphic/Graphic with face (override face)
// 3. Position


export default Editor;