import React, { useEffect } from "react";
import classes from "./ListMusic.module.scss";
import { useSelector, useDispatch } from "react-redux";

const ListMusic = (props) => {
  const index = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClickUpdateSong = (index) => {
    dispatch({ type: "click", clickSong: index });
  };

  useEffect(() => {
    const activeSong = document.querySelector(
      `.${classes.active}.${classes["item-song"]}`
    );
    setTimeout(() => {
      activeSong.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  });

  let itemMusic = props.songs.map((child, i) => (
    <li
      className={`${classes["item-song"]} ${index === i ? classes.active : ""}`}
      onClick={() => handleClickUpdateSong(i)}
      key={i}
    >
      <div className={classes.img}>
        <div
          className={classes["img-song"]}
          style={{ backgroundImage: `url(${child.image})` }}
        ></div>
      </div>
      <div className={classes["info-song"]}>
        <div className={classes["name-song"]}>{child.name}</div>
        <div className={classes.author}>{child.singer}</div>
      </div>
      <div className={classes["info-more"]}>
        <span className="material-icons">more_horiz</span>
      </div>
    </li>
  ));

  return <ul className={classes["list-song"]}>{itemMusic}</ul>;
};

export default ListMusic;
