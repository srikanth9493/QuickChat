import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Chattext.css";
import { useStateValue } from "./StateProvider";

const ChatText = forwardRef(({ id, name, text, time, photo }, ref) => {
  const [{ user }, dispatch] = useStateValue();
  console.log("Hello", name, text, time);

  let sender = user.displayName == name;
  return (
    // className="chat__box"
    <div>
      <div
        ref={ref}
        className={sender ? "chattext__sender" : "chattext__receiver"}
      >
        <div
          className={
            sender ? "chattext__avatar__sender" : "chattext__avatar__receiver"
          }
        >
          <Avatar src={sender ? user.photoURL : photo}></Avatar>
          <div className="charttext__body">
            {/* <div className="chattext__name"> {name}</div> */}
            <div className="chattext__text">
              <p
                style={
                  sender
                    ? { background: "black", color: "white" }
                    : { background: "white" }
                }
              >
                {text} <span className="chattext__time"> {time}</span>
              </p>
            </div>
            {/* <div ></div> */}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ChatText;
