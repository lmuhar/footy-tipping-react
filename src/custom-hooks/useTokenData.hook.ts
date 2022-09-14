import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

interface UserData {
  id: string;
  email: string;
  role: string;
  username: string;
}

interface Token {
  user: UserData;
}

export default function useTokenData() {
  const { push } = useRouter()
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decoded: Token = jwtDecode(localStorage.getItem('token') || '');
      setUser(decoded.user);
    } else {
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    push('/login')
  }

  return { user, logout };
}
