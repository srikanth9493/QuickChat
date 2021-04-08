import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { makeStyles } from "@material-ui/core/styles";

import { Avatar } from "@material-ui/core";
import SidebarNames from "./SidebarNames";
import db from "./firebase";
import { Link, BrowserRouter as Router, useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  verylarge: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
}));

function SidebarChat() {
  const [roomName, setroomName] = useState([]);
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setroomName(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );
  }, []);

  console.log("database nrooms", roomName);

  const classes = useStyles();
  const [{ user }, dispatch] = useStateValue();
  console.log("user", user);

  return (
    <div className="sidebarchat">
      {/* <div className="sidebar__logo">
        <Avatar
          alt="Remy Sharp"
          src="https://w7.pngwing.com/pngs/805/719/png-transparent-computer-icons-computer-network-gateway-internet-others-computer-network-logo-online-chat.png"
          className={classes.large}
        />
        <h2>Quick Chat</h2>
      </div> */}

      {/* sidebar header */}
      {/* <div className="sidebar__container"> */}
      <div className="sidebar__bio">
        <Avatar
          alt="Remy Sharp"
          className={classes.verylarge}
          src={user.photoURL}
          className="sidebar__bio__logo"
        />
        <div className="sidebar__desc">
          <h3>{user.displayName}</h3>
          <p>Lead Full Stack Developer</p>
        </div>
      </div>

      {/* sidebar search */}
      <div className="sidebar__search"></div>

      {/* sidebar  Names*/}

      <div className="sidebar__names">
        {/* <div className="sidebar__names__container"> */}
        <SidebarNames addNewChat={true}></SidebarNames>

        {roomName.map(({ id, name }) => (
          <Link to={`/room/${id}`}>
            <SidebarNames
              key={id}
              name={name}
              addNewChat={false}
            ></SidebarNames>
          </Link>
        ))}
        {/* </div> */}
      </div>
      {/* </div> */}
    </div>
  );
}

export default SidebarChat;
