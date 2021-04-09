import { Avatar } from "@material-ui/core";
import React from "react";
import db from "./firebase";
import "./Sidebarnames.css";
function SidebarNames({ name, addNewChat }) {
  const addRoom = () => {
    const name = prompt("enter Room Name");
    if (name !== "") {
      db.collection("rooms").add({ name: name });
    } else {
      alert("Name Must not be Empty");
    }
  };

  const addHandler = () => {
    //  sidebarchat;

    const sidebar_chat = document.querySelector(".sidebarchat");
    console.log(sidebar_chat, "bio is clicked");

    sidebar_chat.classList.toggle("hidden");

    const chat = document.querySelector(".chat");
    chat.classList.toggle("show");
  };

  return addNewChat == false ? (
    <div className="sidebarnames" onClick={addHandler}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <div className="sidebarnames__names">
        <h3>{name}</h3>
      </div>
    </div>
  ) : (
    <div onClick={addRoom} className="sidebarnames">
      <h3>Add New Room</h3>
    </div>
  );
}

export default SidebarNames;
