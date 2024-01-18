// React Router DOM imports
import { Link, useLoaderData } from "react-router-dom";

// Toast library
import { toast } from "react-toastify";

// Component imports
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// Helper functions
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../helpers";

// Loader function to fetch data for the dashboard
export function dashboardLoader() {
  // Fetching user data, budgets, and expenses
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");

  // Returning the fetched data
  return { userName, budgets, expenses };
}

// Action function to handle dashboard-related actions
export async function dashboardAction({ request }) {
  // Adding a delay for a loading effect
  await waait();

  // Extracting form data from the request
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // Handling new user submission
  if (_action === "newUser") {
    try {
      // Saving the user's name in local storage
      localStorage.setItem("userName", JSON.stringify(values.userName));
      // Displaying a welcome toast message
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      // Handling errors during account creation
      throw new Error("There was a problem creating your account.");
    }
  }

  // Handling the creation of a new budget
  if (_action === "createBudget") {
    try {
      // Creating a new budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      // Displaying a success toast message
      return toast.success("Budget created!");
    } catch (e) {
      // Handling errors during budget creation
      throw new Error("There was a problem creating your budget.");
    }
  }

  // Handling the creation of a new expense
  if (_action === "createExpense") {
    try {
      // Creating a new expense
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
      // Deleting an expense
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

// Dashboard component
const Dashboard = () => {
  // Fetching data using the useLoaderData hook
  const { userName, budgets, expenses } = useLoaderData();

  // Rendering the Dashboard component
  return (
    <>
      {/* Checking if a user is logged in */}
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {/* Checking if budgets exist */}
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  {/* Displaying the AddBudgetForm and AddExpenseForm components */}
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {/* Mapping through budgets and displaying BudgetItem components */}
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {/* Checking if expenses exist */}
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    {/* Displaying a subset of recent expenses in the Table component */}
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {/* Displaying a link to view all expenses if there are more than 8 */}
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                {/* Displaying the AddBudgetForm component */}
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        // Displaying the Intro component if no user is logged in
        <Intro />
      )}
    </>
  );
};

// Exporting the Dashboard component as the default export
export default Dashboard;
