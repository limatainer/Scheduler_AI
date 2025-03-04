import React, { createContext, useReducer, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useLocalStorage } from '../hooks/useStorage';
import { getAuthErrorMessage } from '../utils/errorUtils';
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    error: null,
  });
  const [persistedUser, setPersistedUser] = useLocalStorage('user', null);
  useEffect(() => {
    let isInitialMount = true;
    const unsubscribe = projectAuth.onAuthStateChanged(
      (user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          };
          dispatch({ type: 'AUTH_IS_READY', payload: userData });
          if (!isInitialMount) {
            setPersistedUser(userData);
          }
        } else {
          dispatch({ type: 'AUTH_IS_READY', payload: null });
          if (!isInitialMount) {
            setPersistedUser(null);
          }
        }
        isInitialMount = false;
      },
      (error) => {
        console.error('Firebase auth state change error:', error);
        dispatch({ type: 'AUTH_IS_READY', payload: null });

        if (!isInitialMount) {
          setPersistedUser(null);
        }
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, []); // Empty dependency array - only run once on mount

  // Login function with error handling
  const login = async (email, password) => {
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      if (!res || !res.user) {
        throw new Error('Could not complete login');
      }

      const userData = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      };

      dispatch({ type: 'LOGIN', payload: userData });
      setPersistedUser(userData);

      return userData;
    } catch (error) {
      logError(error, { method: 'login', email });
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  // Signup function with error handling
  const signup = async (email, password, displayName) => {
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res || !res.user) {
        throw new Error('Could not complete signup');
      }

      // Add display name to user
      await res.user.updateProfile({ displayName });

      // Create user object with just the data we need
      const userData = {
        uid: res.user.uid,
        email: res.user.email,
        displayName,
        photoURL: res.user.photoURL,
      };

      dispatch({ type: 'LOGIN', payload: userData });
      setPersistedUser(userData);

      return userData;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  // Logout function with error handling
  const logout = async () => {
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      await projectAuth.signOut();
      dispatch({ type: 'LOGOUT' });
      setPersistedUser(null);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      await projectAuth.sendPasswordResetEmail(email);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  // Update user profile function
  const updateProfile = async (displayName, photoURL) => {
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const user = projectAuth.currentUser;

      if (!user) {
        throw new Error('No user is currently logged in');
      }

      await user.updateProfile({ displayName, photoURL });

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.displayName,
        photoURL: photoURL || user.photoURL,
      };

      dispatch({ type: 'LOGIN', payload: userData });
      setPersistedUser(userData);

      return userData;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  // Clear any auth errors
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Only log state in development and avoid logging during render
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AuthContext state:', state);
    }
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        signup,
        resetPassword,
        updateProfile,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
