import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending, setError } = useLogin(); // Destructure error and setError from useLogin

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format. Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password is too short');
      return;
    }

    login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="flex flex-col w-full max-w-md p-12 space-y-4 
      text-center bg-gray-100 rounded-lg"
      >
        <h1 className="text-3xl font-semibold">Log in to your account</h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-400 m-4">
              Email address
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                placeholder="Email address"
                autoComplete="username"
                className="ml-2 rounded-t-md border-gray-600 focus:ri focus:border-violet-400"
              />
            </label>
            <label htmlFor="password" className="text-gray-400 m-4">
              Password
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                autoComplete="current-password"
                className="ml-2 rounded-t-md border-gray-600 focus:ri focus:border-violet-400"
              />
            </label>
          </div>

          {!isPending && (
            <button type="submit" className="button">
              Sign in
            </button>
          )}
          {isPending && (
            <button className="button" disabled>
              Loading
            </button>
          )}
          {error && error.includes('INVALID_LOGIN_CREDENTIALS') && (
            <p className="text-2xl text-accent">Wrong user or password</p>
          )}
          {error && error === 'Password is too short' && (
            <p className="text-red-500">{error}</p>
          )}
          {error &&
            error ===
              'Invalid email format. Please enter a valid email address.' && (
              <p className="text-red-500">{error}</p>
            )}
        </form>
      </div>
    </div>
  );
}
