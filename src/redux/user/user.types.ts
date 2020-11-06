interface User {
    id?: string;
    username: string;
    password: string;
    email: string;
}

export const USER_LOGIN = 'USER_LOGIN';
export const USER_REGISTER = 'USER_REGISTER';

interface UserLogin {
    type: typeof USER_LOGIN,
    payload: User
}

interface UserRegister {
    type: typeof USER_REGISTER,
    payload: User
}

export const userLogin = (data: User): UserLogin => ({
    type: USER_LOGIN,
    payload: data
});

export const userRegister = (data: User): UserRegister => ({
    type: USER_REGISTER,
    payload: data
});

export type UserActions = UserLogin | UserRegister;