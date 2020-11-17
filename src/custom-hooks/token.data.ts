import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export default function useTokenData(): any {
    const [token, setToken] = useState(null);
    useEffect(() => {
            setToken(jwtDecode(localStorage.getItem('token')));
    }, [])

    return token;
}