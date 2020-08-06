const initState = {
    authError: null,
    mensaje: null
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
        
        case 'RECOVERY_SUCCESS':
            console.log("Recovery link sent!")
            return{
                ...state,
                mensaje: "Listo! Recibiras un correo en breve!",
                authError: null
            }
        
        case 'RECOVERY_ERROR':
            console.log("Error sending Recovery link")
            return{
                ...state,
                authError: "El mail que ingresaste parece ser incorrecto",
                mensaje: null
            }
        case 'RECOVERY_EMPTY':
            console.log("EL FORM ESTA VACIO PA")
            return{
                ...state,
                authError: "Debe ingresar una direccion de correo"
            }

            default:
                return state
        }
    }

export default authReducer