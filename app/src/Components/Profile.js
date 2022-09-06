import React, { useContext } from 'react';
import { LoginContext } from "../Contexts/LoginContext";

function Profile() {

  //rather than grabbing state here and worrying about prop drilling etc, we import it. we don't use setUsername here, so we don't bother accessing or declaring it!
  const { username } = useContext(LoginContext);

  return (
    <div>
      <h1>Profile</h1>
      <h2>Username: { username }</h2>
    </div>
  );
}

export default Profile;