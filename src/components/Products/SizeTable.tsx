import React from 'react'
import { TableContainer, Table, TableBody, TableRow, IconButton, TableCell } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { TextInput } from '../Uikit'
import { useState } from 'react'
import { useCallback } from 'react'
import { Size } from './types'
import { useMemo } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

type SizeTableProps = {
  sizes: Size[]
  addProduct: (selctedSize: string) => void
}

const useStyles = makeStyles( {
  iconCell:{
    padding: 0,
    height: 48,
    width: 48
  }
});

const SizeTable = (props: SizeTableProps): JSX.Element => {
  const classes = useStyles();

  const sizes = props.sizes;

  return (
    <TableContainer>
      <table>
        <TableBody>
          {sizes.length > 0 && (
            sizes.map(size => (
              <TableRow key={size.size}>
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell>
                  残り{size.quantity}点
                </TableCell>
                <TableCell className={classes.iconCell}>
                  {size.quantity > 0 ? (
                    <IconButton>
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                    <div>売切</div>
                  )}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </table>
    </TableContainer>
  )
}

export default SizeTable;