import React, { useEffect, useState } from "react";
import { lyricsWhyNotMe } from "../../constant";
import classes from "./styles.module.scss";

const Lyrics = () => {
  const [indexLyricActive, setIndexLyricAcitve] = useState(0);
  useEffect(() => {
    const lyricsActive = document.querySelector(`.${classes.active}`);
    setTimeout(() => {
      lyricsActive.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  });

  useEffect(() => {
    const updateIndexActive = setInterval(() => {
      setIndexLyricAcitve(indexLyricActive + 1);
      console.log("tttt", indexLyricActive);
    }, 200000);

    return () => {
      clearInterval(updateIndexActive);
    };
  }, [indexLyricActive]);

  return (
    <div className={classes.lyrics}>
      <ul>
        {lyricsWhyNotMe.map((lyric, index) => (
          <li
            className={indexLyricActive === index && classes.active}
            key={index}
          >
            {lyric}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lyrics;
