import { ChangeEvent, useMemo, useState } from "react"


export default function BudgetForm() {

    const [budget, setBudget] =  useState(0);

    // Valida el presupouesto
    const isValid = useMemo( () => {

        return isNaN(budget) || budget <= 0;

    }, [budget] )

    // Incrementa el contador
    const handleChange = ( e : ChangeEvent<HTMLInputElement> ) => {
        
        setBudget(e.target.valueAsNumber);

    }
  
    return (

        <form action="
            space-y-5 
        "
        >

            <div className = "flex flex-col space-y-5">
                <label 
                    htmlFor="budget" 
                    className="text-4xl text-blue-600 font-bold text-center"
                >
                    Definir Presupuesto
                </label>
                <input 
                    id = "budget"
                    type = "number"
                    className = "w-full bg-white border border-gray-200 p-2"
                    placeholder = "Define tu Presupuesto"
                    name = "budget"
                    value = {budget}
                    onChange = { handleChange }
                />
            </div>

            <input 
                type = "submit" 
                value = "Definir Presupuesto"
                className="bg-blue-600 
                    hover:bg-blue-700 
                    cursor-pointer 
                    w-full p-2 
                    text-white 
                    font-uppercase 
                    disabled:opacity-40 
                    disabled:cursor-not-allowed"
                disabled = { isValid }
            />
        
        </form>
  
    )
}
