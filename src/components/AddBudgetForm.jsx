// React imports
import { useEffect, useRef } from "react";

// React Router DOM imports
import { Form, useFetcher } from "react-router-dom";

// Heroicons import
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

// AddBudgetForm component
const AddBudgetForm = () => {
  // Using useFetcher hook for form submission
  const fetcher = useFetcher();

  // Checking if form is currently submitting
  const isSubmitting = fetcher.state === "submitting";

  // Ref for the form and focus
  const formRef = useRef();
  const focusRef = useRef();

  // Resetting form and setting focus when isSubmitting changes
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  // Rendering the AddBudgetForm component
  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Create budget
      </h2>
      {/* Using fetcher.Form for form handling */}
      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          {/* Input for budget name */}
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          {/* Input for budget amount */}
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
          />
        </div>
        {/* Hidden input for identifying the form action */}
        <input type="hidden" name="_action" value="createBudget" />
        {/* Submit button */}
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {/* Conditional rendering based on submission state */}
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Create budget</span>
                <CurrencyDollarIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  );
};

// Exporting the AddBudgetForm component as the default export
export default AddBudgetForm;
