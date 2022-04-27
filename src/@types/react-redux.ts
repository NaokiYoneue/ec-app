import 'react-redux'
import {RootStateType} from "@src/reducks/type";

declare module 'react-redux' {
  interface DefaultRootState extends RootStateType {
  }
}