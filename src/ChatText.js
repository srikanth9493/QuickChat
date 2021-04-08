import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Chattext.css";
import { useStateValue } from "./StateProvider";
import ReactTimeAgo from "react-time-ago";

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
                    : { background: "#4DA39C" }
                }
              >
                {text}
                <div className="chattext__container">
                  <span className="chattext__time">
                    <ReactTimeAgo date={time} locale="en-US" />
                  </span>
                </div>
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
