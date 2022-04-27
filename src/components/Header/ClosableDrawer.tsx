import React, { ChangeEvent } from 'react'
import { IconButton, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { TextInput } from '../Uikit'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { signOut } from 'reducks/users/operations'

const useStyles = makeStyles( (theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexshrink: 0,
      width: 256
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256
  },
  searchField: {
    alignItems: 'center',
    diplay: 'flex',
    marginLeft: 32
  }
}));

const ClosableDrawer = (props: any): JSX.Element => {
  const classes = useStyles()
  const {container} = props;
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value)
  },[setKeyword]);

  const selectMenu = (event: any, path: string) => {
    dispatch(push(path));
    props.onClose(event)
  }

  const menus = [
    {func: selectMenu, label: "商品登録",    icon: <AddCircleIcon />, id: "register", value: "/product/edit"},
    {func: selectMenu, label: "注文履歴",    icon: <HistoryIcon />,   id: "history",  value: "/order/history"},
    {func: selectMenu, label: "プロフィール", icon: <PersonIcon />,    id: "profile",  value: "/user/mypage"}
  ];

  return(
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
        <div
          onKeyDown={(e) => props.onClose(e)}
        >
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false} label={"キーワードを入力"} multiline ={false}
              onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map(menu => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key ="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer;