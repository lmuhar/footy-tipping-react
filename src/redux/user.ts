import { Action } from "redux";

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

const USER_LOGIN = 'USER_LOGIN';
const USER_REGISTER = 'USER_REGISTER';

interface UserLogin {
    type: typeof USER_LOGIN,
    payload: User
}

// type UserLogin = Action<typeof USER_LOGIN>;
type UserRegister = Action<typeof USER_REGISTER>;

export const userLogin = (data: User): UserLogin => ({
    type: USER_LOGIN,
    payload: data
});

export const userRegister = (): UserRegister => ({
    type: USER_REGISTER
});

const userReducer = (state: UserState = initialState, action: UserLogin | UserRegister) => {
    console.log(action);
    switch (action.type) {
        case USER_LOGIN: 
            return {...state, login: action.payload}
        case USER_REGISTER: 
            return {...state, userLogin: {user: {id: '234234', name: 'register'}}}
        default: return state;
    }
}

export default userReducer;
