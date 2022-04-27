import React from 'react'
import { Switch, Route } from 'react-router'
import {
  SignIn,
  SignUp,
  Reset,
  ProductEdit,
  ProductList,
  ProductDetail,
  CartList,
  OrderConfirm,
  OrderHistory,
} from './templates/index'
import Auth from 'Auth';

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path ={"/signup"} compornent={SignUp} /> 
      <Route exact path ={"/signin"} compornent={SignIn} />  {/*pathの値(URL)の末尾が「/signin」に完全一致(exact)だったらSigninコンポーネント*/}
      <Route exact path ={"/signin/Reset"} compornent={Reset} />

      <Auth>
      <Route exact path ={"(/)?"} compornent={ProductList} />  {/*pathの値(URL)の末尾に「/」があっても無くてもHomeコンポーネント*/}
      <Route exact path ={"/product/:id"} compornent={ProductEdit} />
      <Route path ={"/product/edit(/:id)?"} compornent={ProductDetail} />
      <Route exact path="/order/confirm" component={OrderConfirm} />
      <Route exact path="/order/history" component={OrderHistory} />
      </Auth>
    </Switch>
  );
};

export default Router;