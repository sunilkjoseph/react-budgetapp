// React Router DOM imports
import { Form, NavLink } from "react-router-dom";

// Heroicons import
import { TrashIcon } from '@heroicons/react/24/solid';

// Asset import
import logomark from "../assets/logomark.svg";

// Nav component
const Nav = ({ userName }) => {
  // Rendering the Nav component
  return (
    <nav>
      {/* Logo and home link */}
      <NavLink
        to="/"
        aria-label="Go to home"
      >
        <img src={logomark} alt="" height={30} />
        <span>HomeBudget</span>
      </NavLink>
      {/* Conditional rendering of logout button if user is logged in */}
      {
        userName && (
          <Form
            method="post"
            action="logout"
            onSubmit={(event) => {
              // Confirmation prompt before logging out
              if (!window.confirm("Delete user and all data?")) {
                event.preventDefault();
              }
            }}
          >
            {/* Logout button with delete user option */}
            <button type="submit" className="btn btn--warning">
              <span>Delete User</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        )
      }
    </nav>
  );
};

// Exporting the Nav component as the default export
export default Nav;
