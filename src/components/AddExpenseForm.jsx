// React imports
import { useEffect, useRef } from "react";

// React Router DOM imports
import { useFetcher } from "react-router-dom";

// Heroicons import
import { PlusCircleIcon } from "@heroicons/react/24/solid";

// AddExpenseForm component
const AddExpenseForm = ({ budgets }) => {
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
      // Clearing form
      formRef.current.reset();
      // Resetting focus
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  // Rendering the AddExpenseForm component
  return (
    <div className="form-wrapper">
      <h2 className="h3">Add New{" "}
        {/* Displaying budget name if there's only one */}
        <span className="accent">
          {budgets.length === 1 && `${budgets[0].name}`}
        </span>{" "}
        Expense
      </h2>
      {/* Using fetcher.Form for form handling */}
      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            {/* Input for expense name */}
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            {/* Input for expense amount */}
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
            />
          </div>
        </div>
        {/* Dropdown for selecting budget category, hidden if only one budget */}
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {
              // Mapping through budgets and creating options
              budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))
            }
          </select>
        </div>
        {/* Hidden input for identifying the form action */}
        <input type="hidden" name="_action" value="createExpense" />
        {/* Submit button */}
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {/* Conditional rendering based on submission state */}
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Add Expense</span>
                <PlusCircleIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  );
};

// Exporting the AddExpenseForm component as the default export
export default AddExpenseForm;
