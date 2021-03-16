import React, { useState, useEffect } from "react";
import "./App.css";
import MemePreview from "./components/MemePreview";
import MyGallery from "./components/MyGallery";

function App() {
  const [savedMemes, setSavedMemes] = useState([]);

  function saveMeme(meme) {
    const element = savedMemes.find(function (mim) {
      if (mim.url === meme.url) {
        return mim;
      }
      return null;
    });

    if (!element) {
      const extended = [...savedMemes, meme];
      setSavedMemes(extended);
      sessionStorage.setItem("gallery", JSON.stringify(extended));
    }
  }

  useEffect(function () {
    if (sessionStorage.getItem("gallery")) {
      setSavedMemes(JSON.parse(sessionStorage.getItem("gallery")));
    }
  }, []);

  function deleteMeme(url) {
    const filtered = savedMemes.filter((sM) => sM.url !== url);
    setSavedMemes(filtered);
    sessionStorage.setItem("gallery", JSON.stringify(filtered));
  }

  return (
    <div>
      <MemePreview saveMeme={saveMeme} />
      <MyGallery savedMemes={savedMemes} deleteMeme={deleteMeme} />
    </div>
  );
}

export default App;
