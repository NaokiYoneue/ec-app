import React from 'react'
import { TextInput, PrimaryButton } from '../components/Uikit'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { resetPassword } from 'reducks/users/operations'
import { push } from 'connected-react-router'

const Reset = (): JSX.Element => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')

  const inputEmail = useCallback((event) => setEmail(event.target.value), [setEmail])

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードリセット</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton label={'パスワードリセット'} onClick={() => dispatch(resetPassword(email))} />
        <div className="module-spacer--small" />
        <p className="clickable" onClick={() => dispatch(push('/signin'))}>
          ログイン画面へ戻る
        </p>
      </div>
    </div>
  )
}

export default Reset