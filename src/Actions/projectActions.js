
export const createProject = (project) =>{
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('proyectos').add({
            ...project,
            autorNombre: 'GUEST',
            autorApellido: 'blank',
            autorUUID: 123,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_PROJECT', project})
        }).catch((err) =>{
            dispatch({type:'CREATE_PROJECT_ERROR', err})
        })
        
    }
};
