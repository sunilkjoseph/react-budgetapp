// React Router DOM import for redirection
import { redirect } from "react-router-dom";

// Toast library import
import { toast } from "react-toastify";

// Helper function import for deleting items
import { deleteItem } from "../helpers";

// Async function to handle user logout
export async function logoutAction() {
  // Deleting user-related data (username, budgets, and expenses)
  deleteItem({
    key: "userName"
  });
  deleteItem({
    key: "budgets"
  });
  deleteItem({
    key: "expenses"
  });

  // Displaying success toast message
  toast.success("You’ve deleted your account!");

  // Returning a redirection to the home page after successful logout
  return redirect("/");
}
