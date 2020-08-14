const initState = {}
const projectReducer = (state = initState, action, props) =>{
    switch  (action.type) {
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
            console.log("CREADO PRODUCTO", action.project);
            return state;
        case 'PRODUCTO_ERROR':
            console.log("ERROR AL CREAR PRODUCTO", action.err);
            return state;
        
        case 'PRODUCTO_EDIT_SUCCESS':
            console.log("EDITADO PRODUCTO", action.producto);
            window.location.reload(false);
            return state;
        case 'PRODUCTO_ELIMINADO':
            console.log("EXITO AL ELIMINAR PRODUCTO", action.producto)
            return state
        
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