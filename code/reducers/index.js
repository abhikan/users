export const users = (state ={users:[]}, action) => {

    switch(action.type){
        case 'USERS':
        return {...state, users: action.data}

        default:
            return state;
    }
}
