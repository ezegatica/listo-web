const initState = {
    mensaje: null,
    cargando: false,
    done: false,
    id: null
}
const projectReducer = (state = initState, action, props) =>{
    switch  (action.type) {
        case 'RESET':
            return {
                ...state,
                done: false,
                id: null,
                cargando: false,
                mensaje: null,
            }
        case 'URL_IMAGEN':
            console.log("ID PRODUCTO: ", action.id)
            return {
                ...state,
                id: action.id
            }
        case 'CREATE_PROJECT':
            console.log('PROYECTO CREADO: ', action.project);
            return state;
        
        case 'CREATE_PROJECT_ERROR':
            console.log("ERROR AL CREAR PROJECTO: ", action.err);
            return state;

        case 'EDIT_PROJECT':
            console.log("EDITADO EL PROYECTO: ", action.project);
            return state;

        case 'EDIT_PROJECT_ERROR':
            console.log("ERROR AL EDITAR EL PROYECTO: ", action.err);
            return state;

        case 'PRODUCTO_SUCCESS':
            console.log("CREADO PRODUCTO");
            return {
                ...state,
                mensaje: "HECHO!",
                done: true
            };

        case 'PRODUCTO_ERROR':
            console.log("ERROR AL CREAR PRODUCTO", action.err);
            return state;
        
        case 'PRODUCTO_EDIT_SUCCESS':
            console.log("EDITADO PRODUCTO", action.producto);
            return {
                ...state,
                done: true
            }
            
            case 'PRODUCTO_ELIMINADO':
            console.log("EXITO AL ELIMINAR PRODUCTO")
            return {
                ...state,
                done: true
            }
        
        case 'PRODUCTO_ELIMINADO_ERROR':
            console.log("ERROR AL ELIMINAR PRODUCTO", action.err)
        return state

        case 'PRODUCTO_EDIT_ERROR':
            console.log("ERROR AL EDITAR PRODUCTO", action.err);
            return state;
            
        default: 
            return state;
    }
}

export default projectReducer