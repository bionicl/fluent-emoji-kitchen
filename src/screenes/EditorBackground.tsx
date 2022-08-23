import { Typography } from "antd";

const { Text } = Typography;

type Props = {
    json: object,
    setJson: (arg0: object) => void
}

function EditorBackground({ json, setJson }: Props) {
    return (
        <Text>background editor</Text>
    )
}

export default EditorBackground;