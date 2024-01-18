// React Router DOM import for redirection
import { redirect } from "react-router-dom";

// Toast library import
import { toast } from "react-toastify";

// Helper functions import
import { deleteItem, getAllMatchingItems } from "../helpers";

// Function to delete a budget and its associated expenses
export function deleteBudget({ params }) {
  try {
    // Deleting the budget
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    // Fetching associated expenses for the deleted budget
    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    // Deleting each associated expense
    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    // Displaying success toast message
    toast.success("Budget deleted successfully!");
  } catch (e) {
    // Handling errors and throwing a specific error message
    throw new Error("There was a problem deleting your budget.");
  }

  // Redirecting to the home page after successful deletion
  return redirect("/");
}
