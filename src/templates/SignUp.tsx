//import React = require("react");
import React, {useCallback,useState} from 'react'
import { useDispatch } from 'react-redux'
//import * as React from 'react';
import initialState from 'reducks/store/initialState'
import {PrimaryButton, TextInput} from '../components/Uikit'
import {signUp} from '../reducks/users/operations'

const SignUp = () => {

  const dispatch =useDispatch()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfimPassword] = useState("");

  //ユーザー名のonChangeイベント
  const inputUsername = useCallback( (event:any) => { //event:onChangeが動いた時の値。暗黙でany型となるがエラー表記になる為any型を明示的に指定
    setUsername(event.target.value)
  }, [setUsername]);

  //メールアドレスのonChangeイベント
  const inputEmail = useCallback( (event:any) => { //event:onChangeが動いた時の値。暗黙でany型となるがエラー表記になる為any型を明示的に指定
    setEmail(event.target.value)
  }, [setEmail]);

  //パスワードのonChangeイベント
  const inputPassword = useCallback( (event:any) => { //event:onChangeが動いた時の値。暗黙でany型となるがエラー表記になる為any型を明示的に指定
    setPassword(event.target.value)
  }, [setPassword]);

  //パスワード（確認）のonChangeイベント
  const inputConfimPassword = useCallback( (event:any) => { //event:onChangeが動いた時の値。暗黙でany型となるがエラー表記になる為any型を明示的に指定
    setConfimPassword(event.target.value)
  }, [setConfimPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
        rows={1} value={username} type={"text"} onChange={inputUsername}
      />
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <TextInput
        fullWidth={true} label={"パスワード（確認）"} multiline={false} required={true}
        rows={1} value={confirmPassword} type={"password"} onChange={inputConfimPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
        />
      </div>
    </div>
  )
}

export default SignUp