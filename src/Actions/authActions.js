

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

// export const UpdateProfileWithNewFavs = () => {
//     return (dispatch, getState, { getFirebase }) => {
//         console.log("EN EL ACTIONS!");
//         dispatch({type: 'UpdateProfile'})
//         setTimeout(() => {
//             dispatch({type: 'ResetProfileUpdater'})
//         }, 500);
//     }
// }

export const subirImagen = (data) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        console.log("DATA: ", data)
        if (data.actual !== "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/user.png?alt=media") {
            dispatch({ type: 'IMAGEN_SUCCESS' })
            console.log("YA TIENE LA NUEVA IMAGEN, SKIPPING");
        }
        else {
            console.log("NO TIENE IMAGEN PERONALIZADA, SETTEANDO LA NUEVA");

            return firestore.collection('usuarios').doc(data.uid).update({
                foto: data.url,
            }).then(() => {
                return firestore.collection('restaurantes').doc(data.uid).update({
                    foto: data.url
                }).then(() => {
                    dispatch({ type: 'IMAGEN_SUCCESS' })
                }).catch((err) => {
                    dispatch({ type: 'IMAGEN_ERROR', err })
                })
            }).catch((err) => {
                dispatch({ type: 'IMAGEN_ERROR', err })
            })
        }
    }
}

export const deleteAlias = (alias, user) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore()
        return firestore.collection('restaurantes').doc(user).update({
            alias: firestore.FieldValue.delete()
        }).then(() => {
            return firestore.collection('usuarios').doc(user).update({
                alias: firestore.FieldValue.delete()
            }).then(() => {
                return firestore.collection('alias').doc(alias).delete(
                ).then(() => {
                    console.log("BORRADO!")
                    setTimeout(() => {
                        dispatch({ type: 'RESET' })
                    }, 500)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }
}


export const UpdateAlias = (alias, user, actual) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('alias').doc(alias).get()
            .then((snapshot) => {
                console.log("-----------------");
                console.log("ALIAS: ", alias)
                console.log("ALIAS ACTUAL: ", actual)
                console.log("USER: ", user)
                console.log("^^^^^^^^^^^^^^^^");
                if (snapshot.exists) {
                    if (snapshot.data().restaurante !== user) {
                        console.log("EXISTE, NO SOS EL DUEÑO, NO TENES PERMISO!");
                        dispatch({ type: 'ALIAS_DUEÑO_NO' })
                        setTimeout(() => {
                            dispatch({ type: 'RESET' })
                        }, 50)
                    } else {
                        console.log("EXISTE, SOS EL DUEÑO, ES LA MISMA QUE TENES");
                        dispatch({ type: 'ALIAS_DUEÑO_IGUAL' })
                        setTimeout(() => {
                            dispatch({ type: 'RESET' })
                        }, 50)
                    }
                } else {
                    if (actual === undefined) {
                        console.log("NO TIENE ALIAS, CREANDO UNO...");
                        return firestore.collection('restaurantes').doc(user).set({
                            alias: alias
                        }, { merge: true }).then(() => {
                            return firestore.collection('usuarios').doc(user).set({
                                alias: alias
                            }, { merge: true }).then(() => {
                                return firestore.collection('alias').doc(alias).set({
                                    restaurante: user
                                }).then(() => {
                                    console.log("HECHO!")
                                    setTimeout(() => {
                                        dispatch({ type: 'RESET' })
                                    }, 500)
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }).catch((err) => {
                                console.log(err)
                            })
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    if (actual !== alias && alias !== "" && actual !== undefined) {
                        console.log("YA TIENE UN ALIAS, ACTUALIZANDOLO AL NUEVO...");
                        return firestore.collection('restaurantes').doc(user).update({
                            alias: alias
                        }).then(() => {
                            return firestore.collection('usuarios').doc(user).update({
                                alias: alias
                            }).then(() => {
                                return firestore.collection('alias').doc(actual).delete(
                                ).then(() => {
                                    return firestore.collection('alias').doc(alias).set({
                                        restaurante: user
                                    }).then(() => {
                                        console.log("HECHO!")
                                        setTimeout(() => {
                                            dispatch({ type: 'RESET' })
                                        }, 500)
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }).catch((err) => {
                                console.log(err)
                            })
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                }

            })
    }
}

// export const UpdateAliasBASE = (alias, user, actual) => {
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         console.log("-----------------");
//         console.log("ALIAS: ", alias)
//         console.log("ALIAS ACTUAL: ", actual)
//         console.log("USER: ", user)
//         if (actual === alias) {
//             return console.log("EL NUEVO ES IGUAL AL MISMO");
//         }
//         if (alias === "") {
//             console.log("ALIAS VACIO!");
//             if (actual !== undefined) {
//                 console.log("borrar alias");
//             }
//         }
//         if (actual === undefined) {
//             if (alias === "") {
//                 console.log("NO TIENE ACTUAL, Y EL NUEVO ESTA VACIO, NO HACER NADA");
//             } else {
//                 console.log("CREAR ALIAS EN ", alias)
//             }
//         }
//         if (actual !== alias && alias !== "" && actual !== undefined) {
//             console.log("PONER ALIAS EN: ", alias);
//         }
//     }
// }
// export const UpdateAliasFUNCIONES = (alias, user, actual) => {
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore()
//         console.log("-----------------");
//         console.log("ALIAS: ", alias)
//         console.log("ALIAS ACTUAL: ", actual)
//         console.log("USER: ", user)
//         if (actual === alias) {
//             return console.log("EL NUEVO ES IGUAL AL MISMO");
//         }
//         if (alias === "") {
//             console.log("ALIAS VACIO!");
//             if (actual !== undefined) {
//                 return firestore.collection('restaurantes').doc(user).update({
//                     alias: firestore.FieldValue.delete()
//                 }).then(() => {
//                     return firestore.collection('usuarios').doc(user).update({
//                         alias: firestore.FieldValue.delete()
//                     }).then(() => {
//                         return firestore.collection('alias').doc(actual).delete(
//                         ).then(() => {
//                             console.log("HECHO!")
//                             setTimeout(() => {
//                                 dispatch({ type: 'RESET' })
//                             }, 500)
//                         }).catch((err) => {
//                             console.log(err)
//                         })
//                     }).catch((err) => {
//                         console.log(err)
//                     })
//                 }).catch((err) => {
//                     console.log(err)
//                 })
//             }
//         }
//         if (actual === undefined) {
//             if (alias === "") {
//                 console.log("NO TIENE ACTUAL, Y EL NUEVO ESTA VACIO, NO HACER NADA");
//             } else {
//                 return firestore.collection('restaurantes').doc(user).set({
//                     alias: alias
//                 }, { merge: true }).then(() => {
//                     return firestore.collection('usuarios').doc(user).set({
//                         alias: alias
//                     }, { merge: true }).then(() => {
//                         return firestore.collection('alias').doc(alias).set({
//                             restaurante: user
//                         }).then(() => {
//                             console.log("HECHO!")
//                             setTimeout(() => {
//                                 dispatch({ type: 'RESET' })
//                             }, 500)
//                         }).catch((err) => {
//                             console.log(err)
//                         })
//                     }).catch((err) => {
//                         console.log(err)
//                     })
//                 }).catch((err) => {
//                     console.log(err)
//                 })
//             }
//         }
//         if (actual !== alias && alias !== "" && actual !== undefined) {
//             console.log("PONER ALIAS EN: ", alias);
//         }
//     }
// }




export const subirImagenProducto = (data) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        console.log("DATA: ", data)
        return firestore.collection('restaurantes').doc(data.uid).collection('productos').doc(data.productoId).update({
            foto: data.url
        }).then(() => {
            dispatch({ type: 'IMAGEN_SUCCESS' })
            setTimeout(() => {
                dispatch({ type: 'RESET' })
            }, 500)
        }).catch((err) => {
            dispatch({ type: 'IMAGEN_ERROR', err })
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
                            console.log("ES RESTO RESTO")
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
                            console.log("NO ES RESTO (ES USUARIO)")
                            console.log("BORRANDO USUARIO DEL AUTH")
                            firebase.auth().currentUser.delete()
                                .then(() => {
                                    console.log("BORRADO exitosamente DEL AUTH")
                                    dispatch({ type: 'DELETE_SUCCESS' });
                                }).catch((err) => {
                                    dispatch({ type: 'DELETE_ERROR', err });
                                    console.log("ERROR: ", err)
                                })
                        }
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
                    cat: "",
                    cat2: "",
                    foto: "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/user.png?alt=media"
                }).then(() => {
                    return firestore.collection('usuarios').doc(resp.user.uid).set({
                        nombre: newUser.nombre,
                        initials: newUser.nombre[0],
                        isResto: true,
                        cat: "",
                        cat2: "",
                        foto: "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/user.png?alt=media"
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
export const SetCategorias = (cat1, cat2) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const USER = firebase.auth().currentUser.uid
        console.log("RECIBIDO CATEGORIA 1: ", cat1);
        console.log("RECIBIDO CATEGORIA 2: ", cat2);
        console.log("USUARIO LOGUEADO ACTUALMENTE: ", USER)
        return firestore.collection('usuarios').doc(USER).update({
            cat: cat1,
            cat2: cat2
        }).then(() => {
            return firestore.collection('restaurantes').doc(USER).update({
                cat: cat1,
                cat2: cat2
            }).then(() => {
                dispatch({ type: 'CATEGORIA_SUCCESS' })
                setTimeout(() => {
                    dispatch({ type: 'RESET' })
                }, 100)
            }).catch((err) => {
                dispatch({ type: 'CATEGORIA_ERROR', err })
            })
        }).catch((err) => {
            dispatch({ type: 'CATEGORIA_ERROR', err })
        })
    }
}
export const SetCategoriasASD = (cat1, cat2) => { //prueba
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log("recibido en el actions de prueba")
        setTimeout(() => {
            const firebase = getFirebase();
            const USER = firebase.auth().currentUser.uid
            console.log("RECIBIDO CATEGORIA 1: ", cat1);
            console.log("RECIBIDO CATEGORIA 2: ", cat2);
            console.log("USUARIO LOGUEADO ACTUALMENTE: ", USER)
            dispatch({ type: 'CATEGORIA_SUCCESS' })
            setTimeout(() => {
                dispatch({ type: 'CLEAR' })
            }, 1000)
        }, 1000)
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
    return (dispatch) => {
        dispatch({ type: 'CLEAR' })
    }
}