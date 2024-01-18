// React Router DOM imports
import { Outlet, useLoaderData } from "react-router-dom";

// Asset import
import waveImage from "../assets/wave.svg";

// Component import
import Nav from "../components/Nav";

// Helper function
import { fetchData } from "../helpers";

// Loader function to fetch main layout data
export function mainLoader() {
  // Fetching user name from storage
  const userName = fetchData("userName");
  return { userName };
}

// Main component for the layout
const Main = () => {
  // Fetching data using the useLoaderData hook
  const { userName } = useLoaderData();

  // Rendering the Main component
  return (
    <div className="layout">
      {/* Displaying the navigation component with the user name */}
      <Nav userName={userName} />
      <main>
        {/* Displaying the content of the nested route */}
        <Outlet />
      </main>
      {/* Displaying a wave image */}
      <img src={waveImage} alt="" />
    </div>
  );
};

// Exporting the Main component as the default export
export default Main;
