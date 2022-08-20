import { Button, Card, Checkbox, Col, Divider, Input, Radio, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import EditorBackground from "./EditorBackground";
import EditorForeground from "./EditorForeground";
import EditorStart from "./EditorStart";

function Editor() {

	const [stages, setStages] = useState<JSX.Element[]>([]);
	const [currentStage, setCurrentStage] = useState(0);
	const [json, setJson] = useState({});
	const [previewImage, setPreviewImage] = useState("");

	useEffect(() => {
		setStages([<EditorStart setJson={setJson} setupAfterStart={setupAfterStart} />]);
		setCurrentStage(0);
	}, []);

	function nextPage() {
		setCurrentStage(currentStage + 1);
	}

	function setupAfterStart(background: boolean, foreground: boolean) {
		if (background) {
			setStages(stages => [...stages, <EditorBackground json={json} setJson={setJson} />]);
		}
		if (foreground) {
			setStages(stages => [...stages, <EditorForeground json={json} setJson={setJson} setImagePreview={setImagePreview}/>]);
		}
		nextPage();
	}

	function setImagePreview(image : string) {
		if (image.length > 0) {
			setPreviewImage(image);
		}
	}

	return (
		<Row gutter={16} style={{ padding: 16, maxWidth: 1000, margin: "0 auto" }}>
			<Col xs={14}>
				<Card>
					<h1>Creator</h1>
					{stages[currentStage]}
				</Card>
			</Col>
			<Col xs={10}>
				<Card>
					<h1>Preview</h1>
					{previewImage && (
						<img width={332} src={previewImage} alt="" />
					)}
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