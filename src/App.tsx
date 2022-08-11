import { useEffect, useState } from 'react';
import './App.css';
import mergeImages from "merge-images";
import { EmojiMetadata, emojiMetadataToFilename } from './types/emojiMetadata';
import emojiConfig from "./emojiConfig.json";
import { EmojiConfigFile } from './types/emojiConfigFile';
import EmojiButton from './components/EmojiButton';

const saveSvgAsPng = require('save-svg-as-png')


function App() {

  const [src, setSrc] = useState<string>("");
  const [baseEmojis, setBaseEmojis] = useState<EmojiMetadata[]>([]);

  useEffect(() => {
    emojiConfig.baseEmoji.map((emoji, index) => {
      const fileName = emojiMetadataToFilename(emoji);
      const filePath = "./svgFiles/base/" + fileName;
      import(`${filePath}`).then(obj => {
        if (!baseEmojis.includes(obj.default)) {
          setBaseEmojis(prevState => [...prevState, {...emoji, url: obj.default}]);
        }
      }).catch(err => {
        console.log(err);
      });
    })
  }, []);
  
  async function mergeMultiple() {

    const image1 = await convertSVGToPng("./svgFiles/base/face_vomiting_color.svg") as string;
    const image2 = await convertSVGToPng("./svgFiles/base/dolphin_color.svg") as string;

    mergeImages([
      {
        src:
        image1,
        x: 0,
        y: 0
      },
      {
        src: image2,
        x: 0,
        y: 0
      }
    ])
      .then((src) => setSrc(src))
      .catch((err) => console.log(err));
  }
  

  function returnSvgFileFromPath(path : string) {
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

  async function convertSVGToPng(path: string) {
    
    const imageOptions = {
      encoderOptions: 1,
      scale: 8
    };

    return new Promise(async (resolve, reject) => {
      const svgFile : string = await returnSvgFileFromPath(path) as string;
      var parser = new DOMParser();
      var doc = parser.parseFromString(svgFile, "image/svg+xml");
      const svg : SVGElement = doc.querySelector('svg') as SVGElement;

      saveSvgAsPng.svgAsPngUri(svg, imageOptions).then((uri: any) => {
        resolve(uri);
      });
    });
  }
  
  return (
    <div className="App">
      <h1>Emojis</h1>
      <div className='emoji-container'>
        {baseEmojis.map((emoji, index) => {
          return <EmojiButton emoji={emoji} key={index} />
        })}
      </div>
      <h1>Combined Image</h1>
      {src && <img width={300} src={src} alt="" />}
      <button onClick={() => {convertSVGToPng("./svgFiles/base/face_vomiting_color.svg")}}>Convert SVG to PNG</button>
      <button onClick={() => mergeMultiple()}>Merge multiple</button>
    </div>
  );
}

export default App;
