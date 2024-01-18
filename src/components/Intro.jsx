// React Router DOM import
import { Form } from "react-router-dom";

// Heroicons import
import { UserPlusIcon } from "@heroicons/react/24/solid";

// Asset import
import illustration from "../assets/illustration.jpg";

// Intro component
const Intro = () => {
  // Rendering the Intro component
  return (
    <div className="intro">
      <div>
        {/* Heading and description */}
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your journey today.
        </p>
        {/* Form for creating a new user account */}
        <Form method="post">
          {/* Input field for user name */}
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          {/* Hidden input for identifying the form action */}
          <input type="hidden" name="_action" value="newUser" />
          {/* Submit button for creating the account */}
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      {/* Image illustration */}
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};

// Exporting the Intro component as the default export
export default Intro;
