import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import NotFound from './components/NotFound/NotFound'
import Header from './components/Header/Header';
import MainPage from './features/Photo/page/Main/MainPage'
import AddEditPage from './features/Photo/page/AddEdit/AddEditPage'
import ProductApi from 'api/productApi';
import SignInPage from 'features/Auth/pages/SignIn';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useDispatch } from 'react-redux';
import { getMe } from 'slice-common/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
};
firebase.initializeApp(config);


function App() {

  const [products, setProducts] = useState([]);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch()


  useEffect(() => {
    
    const getProductApi = async () => {
      try {
       const params = {
         _page: 1,
         _limit: 10,
       }

        const response = await ProductApi.getAll(params)
        setProducts(response.data)
      } catch(error) {
         console.log('Failed to fetch product list', error)
      }
    }

    getProductApi()
    
  }, []);


  //login with socials
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
      if(!user) {
        //user logout, handle something here
        console.log('User is not login')
        return
      }

      //Get me when signIn
      try {
        const actionResult = await dispatch(getMe())
        unwrapResult(actionResult)
        setLogin(true)

      } catch (error) {
        console.log('Failed to login: ', error.message)
      }

    });
   
    return () => unregisterAuthObserver()
  }, []);


  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Header
            loginBtnClick={login}
          />

          <Routes>
             <Route path="photos" element={<MainPage />} />
              <Route path="photos/add" element={<AddEditPage />}>
                <Route path=":photoId" element={<Outlet />} />
              </Route>
              <Route path="/sign-in" element={<SignInPage />} />
             <Route element={<NotFound/>} />
          </Routes>
          
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
