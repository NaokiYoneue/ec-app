import { Image, Size } from '../../components/Products/types'
import firebase from 'firebase/app'

export type ProductsState = {
  list: ProductData[]
}

export type ProductData = {
  id: string
  category: string
  description: string
  gender: string
  name: string
  price: number
  images: Image[]
  sizes: Size[]
  updated_at: firebase.firestore.Timestamp
  created_at?: firebase.firestore.Timestamp
}

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS'

export type ProductsAction = {
  type: typeof FETCH_PRODUCTS | typeof DELETE_PRODUCTS
  payload: ProductData[]
}

export type OrderedProduct = {
  id: string
  images: Image[]
  name: string
  price: number
  size: string
}

export type OrderHistoty = {
  amount: number
  created_at: firebase.firestore.Timestamp
  id: string
  products: OrderedProduct[]
  shippingDate: firebase.firestore.Timestamp
  updated_at: firebase.firestore.Timestamp
}