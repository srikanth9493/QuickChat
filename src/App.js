import logo from "./logo.svg";
import "./App.css";
import SidebarChat from "./SidebarChat";
import Chat from "./Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, setuser] = useStateValue();
  console.log("App", user);
  return (
    <div className="App" className="app">
      {!user ? (
        <Login></Login>
      ) : (
        <div className="app__body">
          <Router>
            <SidebarChat></SidebarChat>
            <Switch>
              <Route path="/room/:roomId">
                <Chat></Chat>
              </Route>
              <Route path="/">
                <Chat></Chat>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
