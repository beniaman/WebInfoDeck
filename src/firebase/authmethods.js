import firebase from 'firebase'
import 'firebase/auth'

export const authMethods = {
  signin: (email, password, setErrors, setToken) => {
    //change from create users to...

    if( email === 'admin@gmail.com'  && password === 'admin1'){   
    firebase.auth().signInWithEmailAndPassword(email, password) 
      //everything is almost exactly the same as the function above
      .then( async res => {
        const token = await Object.entries(res.user)[5][1].b
          //set token to localStorage 
          await localStorage.setItem('token', token)
          
          setToken(window.localStorage.token)
        })
        .catch(err => {
          setErrors(prev => ([...prev, err.message]))
        })
      }
    },
      //no need for email and password
      signout: (setErrors, setToken) => {
      // signOut is a no argument function
    firebase.auth().signOut().then( res => {
      //remove the token
      localStorage.removeItem('token')
        //set the token back to original state
        setToken(null)
    })
    .catch(err => {
      //there shouldn't every be an error from firebase but just in case
      setErrors(prev => ([...prev, err.message]))
      //whether firebase does the trick or not i want my user to do there thing.
        localStorage.removeItem('token')
          setToken(null)
            console.error(err.message)
    })
    },
  }