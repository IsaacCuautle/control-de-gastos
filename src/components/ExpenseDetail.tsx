import { Expense } from "../types"

type ExpenseDetailProps = {
    expense : Expense
}

export default function ExpenseDetail( { expense } : ExpenseDetailProps ) {
  return (
    <div>
        <p>{expense.expenseName}</p>
        <p>{expense.amount}</p>
        <p>{expense.date?.toLocaleString()}</p>
        <p>{expense.category}</p>
    </div>
  )
}
