import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';
export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // sign the user out
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });
      // Redireciona para a página inicial
      navigate('/');
      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
