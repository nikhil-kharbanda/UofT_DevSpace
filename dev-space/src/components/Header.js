import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Button } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  appbar: {
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto'
  },
  appbarTitle: {
    flexGrow: '1'
  },
  icon: {
    color: 'white',
    fontSize: '2rem'
  },
  title: {
    color: 'white'
  },
  red: {
    color: 'red'
  },
  btn: {
    color: 'white',
    fontWeight: 'bolder'
  },
  main: {
    textAlign: 'center'
  }
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
          <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>Home<span className={classes.red}>.</span></h1>
          <IconButton>
              <SortIcon className={classes.icon}></SortIcon>
          </IconButton>
          </Toolbar>
      </AppBar>
      <div className={classes.main}>
        <h1 className={classes.title}>Welcome to <br /><span className={classes.red}>Dev Space</span>.</h1>
        <Button className={classes.btn}>Enter</Button>
      </div>
    </div>
  );
};