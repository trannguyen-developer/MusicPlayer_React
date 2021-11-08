import React, { useState, useEffect } from "react";
import classes from "./Dashboard.module.scss";
import { FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import Playing from "./components/Playing";
import { listTab } from "./constant";

const Dashboard = ({ songs }) => {
  const [checked, setChecked] = useState(true);
  const [indexTab, setIndexTab] = useState(0);

  // function event
  const toggleChecked = () => {
    setChecked(!checked);
    if (checked) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.removeItem("mode");
    }
  };

  useEffect(() => {
    if (checked) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, [checked]);
  useEffect(() => {
    if (localStorage.getItem("mode") === "dark") {
      setChecked(false);
    }
  }, []);

  return (
    <div className={`${classes.dashboard} p-3`}>
      <ul className={classes.state}>
        {listTab.map((tab, index) => (
          <li
            key={index}
            className={indexTab === index && classes.active}
            onClick={() => setIndexTab(index)}
          >
            {tab}
          </li>
        ))}
        <FormGroup
          className={`${classes["btn-toggle"]} ${classes["MuiSlider-rail"]}`}
        >
          <FormControlLabel
            control={
              <Switch size="small" checked={checked} onChange={toggleChecked} />
            }
          />
        </FormGroup>
      </ul>
      <div>
        <Playing indexTab={indexTab} songs={songs} />
      </div>
    </div>
  );
};

export default Dashboard;
