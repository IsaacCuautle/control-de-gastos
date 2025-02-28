import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'

import AmountDisplayed from "./AmountDisplayed"
import { useBudget } from "../hooks/useBudget"

export default function BudgetTracker() {

    const { dispatch, state, totalExpenses, remainingBudget } = useBudget()

    const percentage = +( (totalExpenses * 100) / state.budget ).toFixed(2)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Grafica */}
            <div className="flex justify-center">
                <CircularProgressbar
                    value={ percentage }
                    styles={ buildStyles({

                        pathColor: percentage === 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F2F2F2',
                        textSize: 10,
                        textColor: percentage === 100 ? '#DC2626' : '#3B82F6'

                    }) }
                    text={`${percentage}% Gastado`}
                />
            </div>
        
            <div className="flex flex-col justify-center items-center gap-8">
                <button 
                    type="button" 
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer hover:bg-pink-800"
                    onDoubleClick={
                        () => dispatch( { type : 'reset' } )
                    }
                >
                    Resetear
                </button>

                <AmountDisplayed
                    label="Presupuesto"
                    amount={ state.budget }
                />
                
                <AmountDisplayed
                    label="Disponible"
                    amount={ remainingBudget }
                />
                
                <AmountDisplayed
                    label="Gastado"
                    amount={ totalExpenses }
                />

            </div>

        </div>
    )
}
