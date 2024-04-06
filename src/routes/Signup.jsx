import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);
    signup(email, password, displayName);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col w-full max-w-md p-12 space-y-4 text-center bg-gray-100 rounded-lg">
        <h1 className="text-3xl font-semibold">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col ">
            <label htmlFor="email" className="text-gray-400 mt-4">
              Email address
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                required
                placeholder="Email address"
                autoComplete="username"
                className="ml-2 rounded-t-md border-gray-600 focus:ri focus:border-violet-400"
              />
            </label>
            <label htmlFor="password" className="text-gray-400 mt-4">
              Password
              <input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                autoComplete="new-password"
                className="ml-2 rounded-t-md border-gray-600 focus:ri focus:border-violet-400"
              />
            </label>
            <label htmlFor="confirmPassword" className="text-gray-400 mt-4">
              Confirm Password
              <input
                id="confirmPassword"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="Confirm Password"
                autoComplete="new-password"
                className="ml-2 rounded-t-md border-gray-600 focus:ri focus:border-violet-400"
              />
            </label>
            <label htmlFor="displayName" className="text-gray-400 mt-4">
              Display Name
              <input
                type="text"
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
                id="displayName"
                required
                placeholder="Display Name"
                className="ml-2 rounded-t-md border-gray-600 focus:ri focus:border-violet-400"
              />
            </label>
          </div>
          {!isPending && (
            <button type="submit" className="button">
              Sign up
            </button>
          )}
          {isPending && (
            <button className="button" disabled>
              Loading
            </button>
          )}
          {/* use sweet alert here */}
          {passwordMatchError && (
            <p className="text-red-500">Passwords do not match.</p>
          )}
          {error && !passwordMatchError && (
            <p className="text-red-500">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
