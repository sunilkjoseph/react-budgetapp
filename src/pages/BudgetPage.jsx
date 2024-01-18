// React Router DOM imports
import { useLoaderData } from "react-router-dom";

// Toast library
import { toast } from "react-toastify";

// Component imports
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// Helper functions
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

// Loader function to fetch budget and expenses data
export async function budgetLoader({ params }) {
  // Fetching the budget with the specified id
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  // Fetching expenses related to the budget
  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  // If the budget doesn't exist, throw an error
  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  // Returning the fetched budget and expenses
  return { budget, expenses };
}

// Action function to handle budget-related actions
export async function budgetAction({ request }) {
  // Extracting form data from the request
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // Handling the creation of a new expense
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      // Displaying a success toast message
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      // Handling errors during expense creation
      throw new Error("There was a problem creating your expense.");
    }
  }

  // Handling the deletion of an expense
  if (_action === "deleteExpense") {
    try {
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

// BudgetPage component
const BudgetPage = () => {
  // Fetching data using the useLoaderData hook
  const { budget, expenses } = useLoaderData();

  // Rendering the BudgetPage component
  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        {/* Displaying the BudgetItem component with delete option */}
        <BudgetItem budget={budget} showDelete={true} />
        {/* Displaying the AddExpenseForm component with the current budget */}
        <AddExpenseForm budgets={[budget]} />
      </div>
      {/* Displaying expenses if there are any */}
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          {/* Displaying the Table component with expenses */}
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

// Exporting the BudgetPage component as the default export
export default BudgetPage;
