import authReducer from './authReducer'
import projectReducer from './projectReducer'
import userReducer from './userReducer'
import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const Reducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    usuario: userReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default Reducer