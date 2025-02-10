import { ChangeEvent, useMemo, useState, FormEvent } from "react"


import { useBudget } from "../hooks/useBudget";


export default function BudgetForm() {

    const [budget, setBudget] =  useState(0)
    let { dispatch } = useBudget()

    
    // Valida el presupouesto
    const isValid = useMemo( () => {

        return isNaN(budget) || budget <= 0;

    }, [budget] )

    
    // Guarda en el state
    const handleSubmmit = ( e : FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        dispatch( { type: 'add-budget', payload: { budget } } )
        
    }

    
    // Incrementa el contador
    const handleChange = ( e : ChangeEvent<HTMLInputElement> ) => {
        
        setBudget(e.target.valueAsNumber);

    }
  
    return (

        <form className="space-y-5" onSubmit={ handleSubmmit}>

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
