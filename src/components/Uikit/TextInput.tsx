import React from 'react'
import TextField from '@material-ui/core/TextField'

const TextInput = (props:any) => {
  return (
    <TextField
    fullWidth={props.fullWidth} //幅をMaxにするかしないかをboolean型で設定できる
    label={props.label}
    margin="dense"
    multiline={props.multiline} //複数行の入力を許可するかをboolean型で設定できる
    required={props.required} //入力を必須項目とするかをboolean型で設定できる
    rows={props.rows} //multilineを指定した時に、n行でTextFieldを見せておくという設定
    value={props.value} //TextFieldの値
    type={props.type} 
    onChange={props.onChange} //入力値を変更した際にその変更を親コンポーネントに伝える
    />
  )
}

export default TextInput