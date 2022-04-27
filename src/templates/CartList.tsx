import { List, makeStyles } from '@material-ui/core'
import { CartListItem } from 'components/Products'
import { PrimaryButton } from '../components/Uikit'
import GreyButton from '../components/Uikit/GreyButton'
import { push } from 'connected-react-router'
import React from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'reducks/store/store'
import { getProductsInCart } from 'reducks/users/selectors'

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%',
  },
})

const CartList = (): JSX.Element => {
  const classes = useStyles()
  const selector = useSelector((state: AppState) => state)
  const productsInCart = getProductsInCart(selector)
  const dispatch = useDispatch()

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  }, [])

  const backToHome = useCallback(() => {
    dispatch(push('/'))
  }, [])

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">
        ショッピングカート
      </h2>
      <List>
        {productsInCart.length > 0 &&
          productsInCart.map((productsInCart, index) => <CartListItem product={productsInCart} key={index} />
        )}
      </List>
      <div className="module-spacer--small" />
      <div className="p-grid__column">
        <PrimaryButton label={'レジへ進む'} onClick={goToOrder} />
        <div className="module-spacer--extra-small" />
        <GreyButton label={'ショッピングを続ける'} onClick={backToHome} />
      </div>
    </section>
  )
}

export default CartList;