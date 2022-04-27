//import React = require("react");
import React, {useCallback,useState} from 'react'
import { useDispatch } from 'react-redux'
//import * as React from 'react';
import { initialState } from 'reducks/store/initialState'
import {PrimaryButton, TextInput} from '../components/Uikit'
import {signIn} from '../reducks/users/operations'

const SignIn = () => {

  const dispatch =useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //メールアドレスのonChangeイベント
  const inputEmail = useCallback( (event:any) => { //event:onChangeが動いた時の値。暗黙でany型となるがエラー表記になる為any型を明示的に指定
    setEmail(event.target.value)
  }, [setEmail]);

  //パスワードのonChangeイベント
  const inputPassword = useCallback( (event:any) => { //event:onChangeが動いた時の値。暗黙でany型となるがエラー表記になる為any型を明示的に指定
    setPassword(event.target.value)
  }, [setPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"Sign in"}
          onClick={() => dispatch(signIn(email, password))}
        />
      </div>
    </div>
  )
}

export default SignIn