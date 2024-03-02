import { Link, useNavigate } from 'react-router-dom';

import Error404 from '/assets/404.svg';

export default function ErrorPage() {
  const navigate = useNavigate();

  // Redirect to the home page after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <section
      className="flex items-center h-full sm:p-16 bg-primary 
    text-accent"
    >
      <div
        className="container flex flex-col items-center justify-center px-5 
      mx-auto my-8 space-y-8 text-center sm:max-w-md"
      >
        <img src={Error404} alt="SVG Image" />
        <p className="text-3xl">
          Looks like this page services is currently offline.
        </p>
        <p>
          Redirecting to the <Link to="/">Home</Link> page...
        </p>
      </div>
    </section>
  );
}
