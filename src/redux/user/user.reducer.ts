import * as UserActions from "./user.types";

interface User {
    id?: string;
    username: string;
    password: string;
    email: string;
} 

interface UserState {
    loggedInUser: User | null;
}

const initialState: UserState = {
    loggedInUser: null
}

const userReducer = (state: UserState = initialState, action: UserActions.UserActions) => {
    console.log(action);
    switch (action.type) {
        case UserActions.USER_LOGIN: 
            return {...state, login: action.payload}
        case UserActions.USER_REGISTER: 
            return {...state, userLogin: {user: {id: '234234', name: 'register'}}}
        default: return state;
    }
}

export default userReducer;
