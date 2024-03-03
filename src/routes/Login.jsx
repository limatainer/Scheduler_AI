import { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/homeuser');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}
