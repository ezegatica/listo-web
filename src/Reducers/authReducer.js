const initState = {
    authError: null,
    mensaje: null,
    done: false,
    YaExiste: false,
    ElMismo: false,
}
const authReducer = (state = initState, action) =>{
    switch(action.type){

        case 'ALIAS_DUEÑO_NO':
            return{
                ...state,
                YaExiste: true
            }
        case 'ALIAS_DUEÑO_IGUAL':
            return{
                ...state,
                ElMismo: true
            }

        case 'CATEGORIA_SUCCESS':
            console.log("CATEGORIA EDITADA EXITOSAMENTE!")
            return{
                ...state,
                done: true
            }
        case 'CATEGORIA_ERROR':
            console.log("ERROR AL EDITAR CATEGORIA!", action.err)
            return{
                ...state
            }
        
            case 'IMAGEN_SUCCESS':
                return{
                    ...state,
                    done: true
                }

        case 'CLEAR':
            console.log("CLEARING!")
            return {
                ...state,
                authError: null,
                mensaje: null,
                done: false
            }
        case 'RESET':
            return {
                ...state,
                authError: null,
                mensaje: null,
                done: false,
                YaExiste: false,
                ElMismo: false
            }
        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state, 
                authError: 'Error al loguearse'
            }
        case 'DELETED_SUCCESS':
            console.log("ELIMINADO EXITOSAMENTE")
            return{
                ...state,
                authError: null
            }
        case 'DELETED_ERROR':
            console.log("ERROR ELIMINANDO USUARIO")
            return{
                ...state,
                authError: 'ERROR AL ELIMINAR USUARIO'
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
            console.log("register bad", action.err)
            return {
                ...state,
                authError: 'ERROR AL REGISTRARSE'
            }
        case 'SIGNUP_NONAME':
            return {
                ...state,
                authError: 'Debes especificar un nombre y un apellido',
                done: true
            }
        
        case 'RECOVERY_SUCCESS':
            console.log("Recovery link sent!")
            return{
                ...state,
                mensaje: "Listo! Recibiras un correo en breve con un link para restablecer tu contraseña!",
                authError: null
            }
        
        case 'RECOVERY_ERROR':
            console.log("Error sending Recovery link")
            return{
                ...state,
                authError: "El mail que ingresaste parece ser incorrecto o no esta registrado",
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