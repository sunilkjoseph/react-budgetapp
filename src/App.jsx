// Importing necessary components and functions from external libraries and modules
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing layout components and actions
import MainLayout, { mainLoader as mainLayoutLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";

// Importing page components, actions, and loaders
import DashboardPage, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import ErrorPage from "./pages/Error";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";

// Creating the router configuration
const appRouterConfig = [
  {
    path: "/",
    element: <MainLayout />,
    loader: mainLayoutLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
];

// Creating the router using the configuration
const appRouter = createBrowserRouter(appRouterConfig);

// Main application component
function App() {
  return (
    <div className="App">
      {/* Providing the router to the app */}
      <RouterProvider router={appRouter} />
      {/* Displaying toast messages */}
      <ToastContainer />
    </div>
  );
}

// Exporting the App component as the default export
export default App;
