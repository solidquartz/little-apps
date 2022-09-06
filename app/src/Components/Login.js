import React, { useContext } from "react";
import { LoginContext } from "../Contexts/LoginContext";

function Login() {

  //destructure what we need from LoginContext
  //rather than setting state here and worrying about prop drilling etc, we import it.
  //we only need the setter here, so we don't bother with username, only setUsername
  const { setUsername, setShowProfile } = useContext(LoginContext);

  return (

    <>
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
      />
      <button
        onClick={() => {
          setShowProfile(true);
        }}
      >
        LOG IN
      </button>

    </>

  );
}

export default Login;