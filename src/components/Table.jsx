// Component import
import ExpenseItem from "./ExpenseItem";

// Table component
const Table = ({ expenses, showBudget = true }) => {
  // Rendering the Table component
  return (
    <div className="table">
      {/* Table structure with headers */}
      <table>
        <thead>
          <tr>
            {/* Mapping headers based on provided array */}
            {["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map(
              (header, index) => (
                <th key={index}>{header}</th>
              )
            )}
          </tr>
        </thead>
        {/* Table body with expense items */}
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              {/* Rendering ExpenseItem component for each expense */}
              <ExpenseItem expense={expense} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Exporting the Table component as the default export
export default Table;
