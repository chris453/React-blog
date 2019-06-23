const initalState = {
    avatar: '',
    usernamenumber:'',

};

const loggedInUser = (state = initalState, action) => {

    switch (action.type) {
        case 'AVATAR':
            return Object.assign({}, state, { avatar: action.content })

        case 'USERNAMENUMBER':
            return Object.assign({}, state, { usernamenumber: action.content })
        default:
            return state;   

    }


}
export default loggedInUser;
