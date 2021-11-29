import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header'
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `URL(https://images.squarespace-cdn.com/content/v1/58bfb8c059cc68cc36914ea9/1558833618922-DYDAI6EFLTGOLOIKE35S/DevChats_Banner.png?format=1000w)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline></CssBaseline>
      <Header />
    </div>
  );
};
