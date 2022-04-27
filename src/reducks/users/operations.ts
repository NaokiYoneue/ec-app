import React from "react";
import {push} from "connected-react-router";
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { auth, db, FirebaseTimestamp } from '../../firebase/index'
import {fetchOrdersHistoryAction, fetchProductsInCartActoin, signInAction, signOutAction} from "./actions";
import { AppState } from 'reducks/store/store'
import { AddedProduct, UserState } from './types'
import { OrderHistoty } from 'reducks/products/types'
import firebase from "firebase/app";

export const addProductToCart = (addedProduct: AddedProduct): ThunkAction<void, AppState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const cartRef = db.collection('users').doc(uid).collection('cart').doc()
    addedProduct['cartId'] = cartRef.id
    await cartRef.set(addedProduct)
    dispatch(push('/'))
  }
}

export const fetchProductsInCart = (products: AddedProduct[]): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartActoin(products))
  }
}

export const fetchOrderedHistory = (): ThunkAction<void, AppState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const list: OrderHistoty[] = []

    db.collection('users')
      .doc(uid)
      .collection('orders')
      .orderBy('updated_at', 'desc')
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data() as OrderHistoty
          list.push(data)
        })
        dispatch(fetchOrdersHistoryAction(list))
      })
  }
}

//サインインしているかどうか監視し返す関数
export const listenAuthState = (): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid
        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data() as UserState
            if (!data) return
            dispatch(
              signInAction({
                isSignedIn: true,
                orders: data.orders ? data.orders : [],
                role: data.role,
                uid: uid,
                username: data.username,
                cart: data.cart ? data.cart : [],
              })
            )
          })
      } else {
        dispatch(push('/signin'))
      }
    })
  }
}

//サインインする時に実行する関数
export const signIn = (email: string, password: string): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    if (email === '' || password === '') {
      alert('必須項目を入力してください')
      return false
    }

    const { user } = await auth.signInWithEmailAndPassword(email, password)
    if (user) {
      const uid = user.uid
      const snapshot = await db.collection('users').doc(uid).get()
      const data = snapshot.data()
      if (data) {
        dispatch(
          signInAction({
            isSignedIn: true,
            orders: data.orders ? data.orders : [],
            role: data.role,
            uid: data.uid,
            username: data.username,
            cart: data.cart ? data.cart : [],
          })
        )
        dispatch(push('/'))
      }
    }
  }
}

export const signUp = (username: string, email: string, password: string, confirmPassword: string): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    //バリデーション
    //usernameとemailとpasswordとconfirmPasswordが空の場合alertを出す
    //TODO バリデーションをちゃんとする
    if (username === "" || email === "" || password === '' || confirmPassword === "") {
      alert("必須項目が未入力です");
      return false;
    }

    //passwordとconfirmPasswordが一致しない場合alertを出す
    //TODO バリデーションをちゃんとする
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。");
      return false;
    }

    //emailとpasswordでユーザーを作成する
    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;

        //アカウント作成が成功していたら処理を続ける
        if (user) {
          const uid = user.uid;
          //現在の時間を設定する
          const timestamp = FirebaseTimestamp.now();

          //ユーザーのデータの雛形に当てはめる
          const userInitialData = {
            created_at: timestamp,
            email,
            role: "customer",
            uid,
            updated_at: timestamp,
            username
          }

          //firebaseのusersのuidが一致すれば保存しhomeに遷移させる
          db.collection('users').doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push('/'));
            })
        }
      })
  }
}

//サインアウトする時に実行する関数
export const signOut = () => {
  return async (dispatch: React.Dispatch<unknown>) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction());
        dispatch(push('/signin'))
      })
  }
}

//パスワードをリセットする時に実行する関数
export const resetPassword = (email: string) => {
  return async (dispatch: React.Dispatch<unknown>) => {
    //メールアドレスに入力がない場合
    if (email === '') {
      alert('メールアドレスが空です。');
      return false;
    } else {
      return auth.sendPasswordResetEmail(email)
        .then(() => {
          alert('パスワードのリセットメールを送信しました。');
          dispatch(push('/signin'));
        }).catch(() => {
          alert('パスワードリセットに失敗しました。');
        })
    }
  }
}