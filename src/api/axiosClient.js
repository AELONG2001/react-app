import axios from 'axios'
import queryString from 'query-string'
import firebase from "firebase/compat/app"

const getFirebaseToken = async () => {
   const currentUser = firebase.auth().currentUser
   if(currentUser) {
       return currentUser.getIdToken()
   }

   //user logout
   const keyLocalStorage = 'firebase:host:notereact-bb3bb-default-rtdb.firebaseio.com'
   const hasRememberAccount = 
     localStorage.getItem(keyLocalStorage)
   if(!hasRememberAccount) return null

   //user login but current user is not fetched ==> wait 10s
   return new Promise((resolve, reject) => {
    const unregisterAuthObserver = 
      firebase.auth().onAuthStateChanged(async user => {
        const timer = setTimeout(() => {
           reject(null)
        }, 10000)
        if(!user) {
          reject(null)
        }
  
        const token = await user.getIdToken()
        // console.log('Account Name: ', user.displayName)
        // console.log('[Axios] Token: ',token)

        resolve(token)
        
        unregisterAuthObserver()
        clearTimeout(timer)
    });
   })

}

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
    const token = await getFirebaseToken()
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})


axiosClient.interceptors.response.use((response) => {
    if(response && response.data) {
        return response.data
    }

    return response
}, 
  (error) => {
    throw error
})

export default axiosClient
