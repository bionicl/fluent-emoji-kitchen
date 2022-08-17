import { Button, Card, Checkbox, Col, Divider, Input, Radio, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { start } from "repl";
import EditorStart from "./EditorStart";

function Editor() {

	const [stages, setStages] = useState<JSX.Element[]>([]);
	const [currentStage, setCurrentStage] = useState(0);
	const [json, setJson] = useState({});

	useEffect(() => {
		let test = [];
		test.push(<EditorStart json={json} setJson={setJson}/>);
		setStages([]);
		setCurrentStage(0);
	}, []);

	

	return (
		<Row gutter={23}>
			<Col xl={8}>
				<Card>
					<h1>Creator</h1>
					<EditorStart json={json} setJson={setJson}/>
				</Card>
			</Col>
			<Col xl={16}>
				<h1>Preview</h1>
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