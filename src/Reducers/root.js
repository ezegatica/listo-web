import authReducer from './authReducer'
import projectReducer from './projectReducer'
import {combineReducers} from 'redux'

const Reducer = combineReducers({
    auth: authReducer,
    project: projectReducer
})

export default Reducer