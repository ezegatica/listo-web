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

export const deleteUser = (user) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log("LLEGO")
        return firestore.collection("usuarios").doc(user).get()
            .then(snapshot => {
                console.log("PASO EL GET")
                const Resto = snapshot.data().isResto;
                console.log(Resto)
                console.log("BORRANDO USUARIO")
                return firestore.collection('usuarios').doc(user).delete()
                    .then(() => {
                        console.log("BORRADO USUARIOS")
                        if (Resto) {
                            console.log("BORRANDO RESTO")
                            return firestore.collection('restaurantes').doc(user).delete()
                                .then(() => {
                                    console.log("BORRADO EXITOSO DEL RESTAURANTE")
                                    return firebase.auth().currentUser.delete()
                                        .then(() => {
                                            console.log("BORRADO RESTAURANTE EXITOSAMENTE DEL AUTH")
                                            dispatch({ type: 'DELETE_SUCCESS' });
                                        }).catch((err) => {
                                            dispatch({ type: 'DELETE_ERROR', err });
                                            console.log("ERROR: ", err)
                                        })
                                }).catch((err) => {
                                    dispatch({ type: 'DELETE_ERROR', err });
                                    console.log("ERROR: ", err)
                                })
                        } else {
                            console.log("NO ES RESTO")
                        }
                        console.log("BORRANDO DEL AUTH")
                        firebase.auth().currentUser.delete()
                            .then(() => {
                                console.log("BORRADO exitosamente DEL AUTH")
                                dispatch({ type: 'DELETE_SUCCESS' });
                            }).catch((err) => {
                                dispatch({ type: 'DELETE_ERROR', err });
                                console.log("ERROR: ", err)
                            })
                    }).catch((err) => {
                        dispatch({ type: 'DELETE_ERROR', err });
                        console.log("ERROR: ", err)
                    })
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
                console.log("UID: ", resp.user.uid)
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
                    initials: newUser.nombre[0] + newUser.apellido[0]
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
export const Clear = () => {
    return (dispatch)=> {
        dispatch({type: 'CLEAR'})
    }
}