export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        })

    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'LOGOUT' })
        })
    }
}

export const nuevoResto = (newUser) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        if (newUser.nombre !== "" && newUser.apellido !== "") {
            const firebase = getFirebase();
            const firestore = getFirestore();
            console.log("NUEVO USUARIO", newUser)
            firebase.auth().createUserWithEmailAndPassword(
                newUser.email,
                newUser.password
            ).then((resp) => {
                console.log("UID: ",resp.user.uid)
                return firestore.collection('restaurantes').doc(resp.user.uid).set({
                    nombre: newUser.nombre,
                    initials: newUser.nombre[0],
                }).then(() => {
                    return firestore.collection('usuarios').doc(resp.user.uid).set({
                        nombre: newUser.nombre,
                        initials: newUser.nombre[0],
                        isResto: true
                    }).catch((err) => {
                        firebase.auth().currentUser.delete()
                        dispatch({ type: 'SIGNUP_ERROR', err });
                    });
                })
            }).then(() => {
                dispatch({ type: 'SIGNUP_SUCCESS' });
            }).catch((err) => {
                firebase.auth().currentUser.delete()
                dispatch({ type: 'SIGNUP_ERROR', err });
            });
        }
        else {
            dispatch({ type: 'SIGNUP_NONAME' })
        }
    }
}

export const signUp = (newUser) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        if (newUser.nombre !== "" && newUser.apellido !== "") {
            const firebase = getFirebase();
            const firestore = getFirestore();
            console.log("NUEVO USUARIO", newUser)
            console.log("PASO EL IF")
            firebase.auth().createUserWithEmailAndPassword(
                newUser.email,
                newUser.password
            ).then((resp) => {
                return firestore.collection('usuarios').doc(resp.user.uid).set({
                    nombre: newUser.nombre,
                    apellido: newUser.apellido,
                    initials: newUser.nombre[0]
                });
            }).then(() => {
                dispatch({ type: 'SIGNUP_SUCCESS' });
            }).catch((err) => {
                dispatch({ type: 'SIGNUP_ERROR', err });
            });
        }
        else {
            console.log("NO PASO EL IF")
            dispatch({ type: 'SIGNUP_NONAME' })
        }
    }
}

export const sendLink = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        console.log("received", credentials.email)
        if (credentials.email !== '') {
            firebase.auth().sendPasswordResetEmail(credentials.email)
                .then(() => {
                    dispatch({ type: 'RECOVERY_SUCCESS' });
                }).catch((err) => {
                    dispatch({ type: 'RECOVERY_ERROR' });
                });
        }
        else {
            dispatch({ type: 'RECOVERY_EMPTY' })
        }

    }
}