import React, { useEffect, useState } from "react";
import { auth } from '../firebase';
import { login, logout } from '../features/userSlice'
import Chat from '../Chat';
import Sidebar from '../Sidebar';
import Login from '../Login';
import { selectUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux'

const ChatPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {

      // console.log(authUser)

      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])

  // console.log(user)


  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>

      ) : (
          <Login />
        )}
    </div>
  );
};

export default ChatPage;
