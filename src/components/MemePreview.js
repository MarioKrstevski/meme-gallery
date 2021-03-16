import React, { useState, useEffect } from "react";
import Meme from "./Meme";
import endpoint from "../services/endpoints";
import { getRandomNumber } from "../utilities/helpers";

function MemePreview({ saveMeme }) {
  const [meme, setMeme] = useState(null);
  const [memes, setMemes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [shouldGetMemes, setShouldGetMemes] = useState(true);

  async function fetchMemes() {
    try {
      setIsLoading(true);
      if (isOnline) {
        if (shouldGetMemes) {
          const { memes } = await endpoint.getMemes();
          setMemes(memes);
        } else {
          const memes = await endpoint.getPhotos();
          setMemes(memes);
        }
      } else {
        const memes = await endpoint.getLocalMemes();
        setMemes(memes);
      }
      setIsLoading(false);
    } catch (error) {}
  }
  useEffect(function () {
    fetchMemes();
  }, []);

  function selectNewMeme() {
    if (memes) {
      if (meme) {
        const filtered = memes.filter((mim) => mim.url !== meme.url);
        setMeme(filtered[getRandomNumber(0, filtered.length)]);
      } else {
        setMeme(memes[getRandomNumber(0, memes.length)]);
      }
    }
  }
  useEffect(
    function () {
      selectNewMeme();
    },
    [memes]
  );

  return (
    <div style={{ paddingLeft: 50 }}>
      {/* Example for printing all elements we fetch in small boxes */}
      {/* <div style={{
                width:'1000px',
                height: '90px',
                flexWrap:'wrap',
        }}>
                {memes.map(mim => <Meme key={mim.url} noTitle meme={mim} height={20} width={20} />)}
        </div> */}
      <div className="meme-showcase">
        <Meme meme={meme} isLoading={isLoading} />
      </div>
      <button onClick={fetchMemes} children={"Get Meme Set"} />
      <button onClick={selectNewMeme} children={"Change Meme"} />
      <button onClick={() => saveMeme(meme)}> Save </button>
      <br />
      <br />
      <button
        className={isOnline ? "is-online" : "is-offline"}
        onClick={() => setIsOnline(!isOnline)}
      >
        {isOnline ? "ONLINE" : "OFFLINE"}
      </button>
      <label>Should get memes:</label>
      <button
        className={shouldGetMemes ? "is-online" : "is-offline"}
        onClick={() => setShouldGetMemes(!shouldGetMemes)}
      >
        {shouldGetMemes ? "YES" : "NO"}
      </button>
    </div>
  );
}

export default MemePreview;
