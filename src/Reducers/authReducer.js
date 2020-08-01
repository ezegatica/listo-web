const initState = {
    authError: null
}
const authReducer = (state = initState, action) =>{
    switch(action.type){

        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state, 
                authError: 'Error al loguearse'
            }

        case 'LOGIN_SUCCESS':
            console.log('login success')
            return {
                ...state,
                authError: null,
                
            }
        
        case 'LOGOUT':
            console.log('logout owo')
            return state
        
        case 'SIGNUP_SUCCESS':
            console.log("register good")
            return {
                ...state,
                authError: null
            }

        case 'SIGNUP_ERROR':
            console.log("register bad")
            return {
                ...state,
                authError: 'ERROR AL REGISTRARSE: ' + action.err.message
            }


            default:
                return state
        }
    }

export default authReducer