import React from "react";
import Meme from "./Meme";

function MyGallery(props) {
  const { savedMemes, deleteMeme } = props;

  if (!savedMemes.length) {
    return (
      <div>
        <h2>My Gallery</h2>
        <p>Nothing saved yet</p>
      </div>
    );
  }

  return (
    <div className="my-gallery">
      <h2>My Gallery</h2>

      <div className="meme-list">
        {savedMemes.map((meme) => (
          <Meme deleteMeme={deleteMeme} key={meme.url} meme={meme} width={120} height={120} noTitle />
        ))}
      </div>
    </div>
  );
}

export default MyGallery;
