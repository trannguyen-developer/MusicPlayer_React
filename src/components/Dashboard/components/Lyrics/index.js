import React, { useEffect, useState, useRef } from "react";
import { lyricSongs } from "../../constant";
import classes from "./styles.module.scss";

const inRange = (number, min, max) => {
  return number >= min && number <= max;
};

const Lyrics = ({ currentTimeAudio, indexSong }) => {
  const [indexLyricActive, setIndexLyricAcitve] = useState(0);
  const [screenLyricParam, setScreenLyricParam] = useState({
    height: "",
    opacity: "",
  });
  const screenLyric = useRef(null);

  useEffect(() => {
    const lyricsActive = document.querySelector(`.${classes.active}`);
    setTimeout(() => {
      lyricsActive?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }, [indexLyricActive]);

  useEffect(() => {
    lyricSongs?.[indexSong]?.forEach((child, index) => {
      if (inRange(currentTimeAudio, ...child.range)) {
        setIndexLyricAcitve(child.id);
      }
    });
  }, [currentTimeAudio, indexSong]);

  useEffect(() => {
    const screenLyricHeight = screenLyric?.current?.offsetHeight;
    document?.addEventListener("scroll", function () {
      let heightElement = screenLyricHeight - window?.scrollY;
      heightElement = heightElement >= 252 ? 252 : heightElement;

      heightElement = heightElement > 0 ? heightElement : "0";
      setScreenLyricParam({
        height: heightElement + "px",
        opacity: heightElement / screenLyricHeight,
      });
    });
  }, []);

  useEffect(() => {
    console.log("currentTimeAudio", Math.floor(currentTimeAudio));
  }, [currentTimeAudio]);

  return (
    <div className={classes.lyrics} ref={screenLyric} style={screenLyricParam}>
      <ul>
        {console.log("indexLyricActive", indexLyricActive)}
        {lyricSongs?.[indexSong]?.map((lyric) => (
          <li
            className={indexLyricActive === lyric.id && classes.active}
            key={lyric.id}
          >
            {lyric.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lyrics;
