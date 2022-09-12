import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface userData {
  id: string;
  email: string;
  role: string;
  username: string;
}

interface token {
  user: userData;
}

export default function useTokenData(): any {
  const [token, setToken] = useState<userData | null>(null);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decoded: token = jwtDecode(localStorage.getItem('token') || '');
      setToken(decoded.user);
    } else {
      setToken(null);
    }
  }, []);

  return token;
}
