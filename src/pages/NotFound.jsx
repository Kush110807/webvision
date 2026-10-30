import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="so-page">
      <div className="so-container so-container-narrow">
        <div className="so-empty-state">
          <Compass size={30} aria-hidden="true" />
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist in this prototype.</p>
          <Link to="/" className="so-btn so-btn-primary">Back to home</Link>
        </div>
      </div>
    </div>
  );
}
