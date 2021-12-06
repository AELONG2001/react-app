import React from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/photos',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
  };
  

const SignInPage = () => {
    return (
       <div>
          <div className="text-center">
              <h2>Login</h2>  
              <p>or login with social accounts</p>
          </div>

          <div>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
       </div>
    )
}

export default SignInPage
