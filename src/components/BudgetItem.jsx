// React Router DOM imports
import { Form, Link } from "react-router-dom";

// Heroicons imports
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";

// Helper functions import
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";

// BudgetItem component
const BudgetItem = ({ budget, showDelete = false }) => {
  // Extracting properties from the budget object
  const { id, name, amount, color } = budget;

  // Calculating the amount spent for the current budget
  const spent = calculateSpentByBudget(id);

  // Rendering the BudgetItem component
  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      {/* Displaying budget name and budgeted amount */}
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      {/* Progress bar indicating budget spent */}
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      {/* Displaying spent and remaining amounts */}
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {/* Conditional rendering based on whether to show delete button */}
      {showDelete ? (
        // Form for deleting the budget
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              // Confirmation prompt before deleting the budget
              if (
                !window.confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            {/* Delete Budget button */}
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        // Link to view details of the budget
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

// Exporting the BudgetItem component as the default export
export default BudgetItem;
