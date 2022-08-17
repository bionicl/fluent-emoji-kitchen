import { Switch } from 'antd';
import { useState } from 'react';
import './App.css';
import Combinator from './screenes/Combinator';
import Editor from './screenes/Editor';

function App() {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <Switch checked={editMode} onChange={(checked: boolean) => setEditMode(checked)} />
      {editMode ? <Editor/> : <Combinator/>}
    </>
  );
}

export default App;
