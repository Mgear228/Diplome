import React, { useContext, useState } from "react"
import { user } from "../../pages/SignUpPage/SignUpPage";

type UserContextValueType = {
    user: user;
    changeUser: (theme: user) => void;
};

const defaultContextTypeValue: UserContextValueType = {
    user: {
        name: '',
        email: '',
        password: '',
        films: [],
    },
    changeUser: () => {},
};

export const useInitUserContext = () => {
    const [user, setUser] = useState<user>({name: '', email: '', password: '', films: []});
    const changeUser = (newUser: user) => {
        setUser(() => newUser);
    };
    return {
        user,
        changeUser,
    };
};

export const UserContext = React.createContext<UserContextValueType>(
    defaultContextTypeValue
);

export const useUserContext = () => {
    const useUserContext = useContext(UserContext);
    return useUserContext;
};