// React Router DOM imports
import { useLoaderData } from "react-router-dom";

// Toast library import
import { toast } from "react-toastify";

// Component import
import Table from "../components/Table";

// Helper functions
import { deleteItem, fetchData } from "../helpers";

// Loader function to fetch expenses data
export async function expensesLoader() {
  // Fetching expenses data from storage
  const expenses = fetchData("expenses");
  return { expenses };
}

// Action function to handle expenses-related actions
export async function expensesAction({ request }) {
  // Extracting form data from the request
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // Handling the deletion of an expense
  if (_action === "deleteExpense") {
    try {
      // Deleting the expense using helper function
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      // Displaying a success toast message
      return toast.success("Expense deleted!");
    } catch (e) {
      // Handling errors during expense deletion
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

// ExpensesPage component
const ExpensesPage = () => {
  // Fetching data using the useLoaderData hook
  const { expenses } = useLoaderData();

  // Rendering the ExpensesPage component
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          {/* Displaying the Table component with expenses */}
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

// Exporting the ExpensesPage component as the default export
export default ExpensesPage;
