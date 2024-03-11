import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      dispatch({ type: 'LOGIN', payload: res.user });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes('user-not'));
      if (isCancelled) {
        if (error.code === 'auth/user-not-found') {
          setError('User not found. Please check your email.');
        } else if (error.code === 'auth/wrong-password') {
          setError('Incorrect password. Please try again.');
        } else if (error.code === 'auth/invalid-email') {
          setError('Invalid email format. Please enter a valid email address.');
        } else {
          setError(error.message);
        }

        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error, setError };
};
