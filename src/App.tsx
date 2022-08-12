import { SetStateAction, useEffect, useState } from 'react';
import './App.css';
import { EmojiMetadata, emojiMetadataToFilename } from './types/emojiMetadata';
import emojiConfig from "./emojiConfig.json";
import { EmojiConfigFile } from './types/emojiConfigFile';
import EmojiButton from './components/EmojiButton';
import CombinedImage from './CombinedImage';


function App() {

  const [baseEmojis, setBaseEmojis] = useState<EmojiMetadata[]>([]);
  const [selectedOption1, setSelectedOption1] = useState<EmojiMetadata>();
  const [selectedOption2, setSelectedOption2] = useState<EmojiMetadata>();
  const [disabledOptions , setDisabledOptions] = useState<EmojiMetadata[]>([]);

  function loadEmojiOptions() {
    emojiConfig.baseEmoji.map((emoji, index) => {
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
    if (selectedOption1 == undefined) {
      baseEmojis.forEach(emoji => {
        toDisable.push(emoji);
      });
    } else if (selectedOption1.background == undefined) {
      baseEmojis.forEach(emoji => {
        if (emoji.background == undefined) {
          toDisable.push(emoji);
        }
      });
    } else if (selectedOption1.foreground == undefined) {
      baseEmojis.forEach(emoji => {
        if (emoji.foreground == undefined) {
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
    
    console.log(selectedOption1);
    setDisabledOptions(toDisable);
  }

  useEffect(() => {
    loadEmojiOptions();
  }, []);

  useEffect(() => {
    checkForDisabledOptions();
  }, [selectedOption1]);

  return (
    <div className="App">
      <div className="row">
        <div className="column">
          <h1>Emoji 1</h1>
          <div className='emoji-container'>
            {baseEmojis.map((emoji, index) => {
              return <EmojiButton emoji={emoji} selectedOption={selectedOption1} setSelectedOption={setSelectedOption1} key={index} />
            })}
          </div>
        </div>
        <div className="column">
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
        </div>
      </div>
      <CombinedImage selectedOption1={selectedOption1} selectedOption2={selectedOption2}/>
    </div>
  );
}

export default App;
