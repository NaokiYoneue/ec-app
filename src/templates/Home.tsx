import React from "react";
import {getUserId, getUsername} from "../reducks/users/selectors";
import {useSelector} from "react-redux";

export const Home: React.VFC = () => {
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);

  return (
    <>
      this is home
      <p>ユーザーID:{uid}</p>
      <p>ユーザー名:{username}</p>
    </>
  )
}

export default Home;