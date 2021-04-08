import { Button, useScrollTrigger } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import ChatText from "./ChatText";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import ReactScrollableFeed from "react-scrollable-feed";
import FlipMove from "react-flip-move";
import audio from "./fb_chat_2011.mp3";
const { Howl, Howler } = require("howler");
// import ReactHowler from "react-howler";
function Chat() {
  const [input, setinput] = useState("");
  const [message, setmessage] = useState([]);
  const [chat, setchat] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  console.log("chat user", user);
  // console.log(message)
  const sendMessage = (e) => {
    e.preventDefault();
    setmessage([...message, input]);

    db.collection("rooms").doc(roomId).collection("messsages").add({
      // const[{user},dispatch]=useStateValue();
      username: user.displayName,
      message: input,
      timestamp: new Date(),
      photoURL: user.photoURL,
    });

    // const sound = new Howl({ src: [audio] });
    // sound.play();

    setinput("");
  };

  //    useEffect(() => {
  //        db.collection('rooms').
  //        return () => {
  //            cleanup
  //        }
  //    }, [])

  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      console.log("useEffect", roomId);
      db.collection("rooms")
        .doc(roomId)
        .collection("messsages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setchat(
            snapshot.docs.map(
              (doc) => doc.data()
              //   {
              //   id: doc.id,
              //   name: doc.data().username,
              //   text: doc.data().message,
              //   time: doc.data().timestamp,
              // }
            )
          );
          const sound = new Howl({ src: [audio] });
          sound.play();
        });
    }
  }, [roomId]);

  console.log("Params", chat, roomId);
  return (
    <div className="chat">
      <div className="chat__body">
        <ReactScrollableFeed>
          <FlipMove>
            {chat.map(({ id, username, message, timestamp, photoURL }) => (
              <ChatText
                key={id}
                name={username}
                text={message}
                // new Date(timestamp?.toDate()).toUTCString()
                time={new Date(timestamp?.toDate()).toUTCString()}
                photo={photoURL}
              ></ChatText>
            ))}
          </FlipMove>
        </ReactScrollableFeed>
      </div>

      <div className="chat__bottom">
        <form>
          <input
            value={input}
            onChange={(event) => setinput(event.target.value)}
          ></input>
          <Button disabled={!input} type="submit" onClick={sendMessage}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
