// Funciones
import { formatMoney } from "@/helpers/functions.helper";

// Interfaces
import { IExpense } from "@/Interfaces/expenses.interfaces";

// ----------------

const ExpenseCard: React.FC<IExpense> = ({
    id,
    name,
    issue_date,
    expiration_date,
    total_amount,
    status,
    active,
    consortium,
    expenditures,
    functional_units_expenses,
}: IExpense) => {
    return (
        <div className="flex justify-between py-2 text-center text-black bg-gray-200 rounded-lg hover:bg-slate-400 hover:text-white">
            <div className="w-1/5">{name}</div>
            <div className="w-1/5">
                <h1>{issue_date}</h1>
            </div>
            <div className="w-1/5">
                <h1>{expiration_date}</h1>
            </div>
            <div className="w-1/5">
                <h1>{status}</h1>
            </div>
            <div className="w-1/5">
                <h1>{formatMoney(total_amount)}</h1>
            </div>
        </div>
    );
};

export default ExpenseCard;