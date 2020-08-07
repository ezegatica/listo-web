const initState = {
    projects:[
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
        {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
    ]
}
const projectReducer = (state = initState, action) =>{
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
            
        default: 
            return state;
    }
}

export default projectReducer