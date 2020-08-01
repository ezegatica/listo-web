export const signIn = (credentials) =>{
    return (dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() =>{
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        })

    }
}

export const signOut = () =>{
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'LOGOUT'})
        })
    }
}

export const signUp = (newUser) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('usuarios').doc(resp.user.uid).set({
                nombre: newUser.nombre,
                apellido: newUser.apellido,
                initials: newUser.nombre[0] + newUser.apellido[0]
            });
        }).then(() => {
          dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => {
          dispatch({ type: 'SIGNUP_ERROR', err});
        });
      }
    }