// React Router DOM imports
import { useRouteError, Link, useNavigate } from "react-router-dom";

// Heroicons imports
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

// Error component for handling route errors
const Error = () => {
  // Retrieving error information from the route
  const error = useRouteError();

  // Hook for navigating between routes
  const navigate = useNavigate();

  return (
    <div className="error">
      <h1>Uh oh! We’ve got a problem.</h1>
      {/* Displaying the error message or status text */}
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        {/* Button to go back to the previous page */}
        <button
          className="btn btn--dark"
          onClick={() => navigate(-1)}
        >
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button>
        {/* Link to go back to the home page */}
        <Link to="/" className="btn btn--dark">
          <HomeIcon width={20} />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  );
};

// Exporting the Error component as the default export
export default Error;
