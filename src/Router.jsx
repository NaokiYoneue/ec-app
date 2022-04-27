import React from "react";
import {Route, Switch} from "react-router";
import {Login, Home} from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path ="/login" compornent={Login} />  {/*pathの値(URL)の末尾が「/login」に完全一致(exact)だったらLoginコンポーネント*/}
      <Route exact path ="(/)?" compornent={Home} />  {/*pathの値(URL)の末尾に「/」があっても無くてもHomeコンポーネント*/}
    </Switch>
  );
};

export default Router;