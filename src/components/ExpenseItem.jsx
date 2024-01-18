// React Router DOM imports
import { Link, useFetcher } from "react-router-dom";

// Heroicons import
import { TrashIcon } from "@heroicons/react/24/solid";

// Helper imports
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";

// ExpenseItem component
const ExpenseItem = ({ expense, showBudget }) => {
  // Using useFetcher hook for form submission
  const fetcher = useFetcher();

  // Fetching the associated budget for the expense
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  // Rendering the ExpenseItem component
  return (
    <>
      {/* Displaying expense name */}
      <td>{expense.name}</td>
      {/* Displaying formatted expense amount */}
      <td>{formatCurrency(expense.amount)}</td>
      {/* Displaying formatted expense creation date */}
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {/* Conditional rendering of budget link based on showBudget prop */}
      {showBudget && (
        <td>
          {/* Link to the associated budget with accent color */}
          <Link
            to={`/budget/${budget.id}`}
            style={{
              "--accent": budget.color,
            }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      {/* Form for deleting the expense */}
      <td>
        <fetcher.Form method="post">
          {/* Hidden input for identifying the form action */}
          <input type="hidden" name="_action" value="deleteExpense" />
          {/* Hidden input for storing the expense ID */}
          <input type="hidden" name="expenseId" value={expense.id} />
          {/* Delete Expense button */}
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

// Exporting the ExpenseItem component as the default export
export default ExpenseItem;
