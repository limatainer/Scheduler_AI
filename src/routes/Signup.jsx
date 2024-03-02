import { useEffect, useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { signup, isPending, error } = useSignup();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-center mx-auto max-w-md min-h-screen"
    >
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <label className="block mb-2">
        <span className="text-sm">Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-violet-400"
        />
      </label>
      <label className="block mb-2">
        <span className="text-sm">Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-violet-400"
        />
      </label>
      <label className="block mb-4">
        <span className="text-sm">Display Name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-violet-400"
        />
      </label>
      {!isPending && <button className="button w-full">Sign Up</button>}
      {isPending && (
        <button className="button w-full" disabled>
          Loading
        </button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
