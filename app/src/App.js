import React, { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { LoginContext} from "./Contexts/LoginContext";


function App() {

  const [showProfile, setShowProfile] = useState(false);
  const [username, setUsername] = useState('');

  return (

    <div className="App">
      <LoginContext.Provider value={{ username, setUsername, setShowProfile }}>
        {showProfile ? <Profile /> : <Login />}
      </LoginContext.Provider>
    </div>


  );
}

//context is imported and wrapped around the component where it is needed
//provider value passes states we need 

export default App;
