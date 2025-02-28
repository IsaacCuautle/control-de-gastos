import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import DatePicker from 'react-date-picker';


import { categories } from "../data/categories";
import type { DraftExpense, Value } from "../types";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {

  const [ expense, setExpense ] = useState<DraftExpense>( {
    amount : 0,
    expenseName : '',
    category : '',
    date : new Date()
  } )

  const [ error, setError ] = useState('')
  const [ previousAmount, setPreviousAmount ] = useState(0)
  const { dispatch, state, remainingBudget } = useBudget()

  // Recupera un gasto por ID
  useEffect( () => {

    if( state.editingId ) {
      
      const editingExpense = state.expenses.filter( 
        currenntExpense => currenntExpense.id === state.editingId 
      )[0]

      setExpense(editingExpense)
      setPreviousAmount(editingExpense.amount)
    
    }

  }, [state.editingId] )

  // Sube los cambios del formulario
  const handleSubmit = ( e : FormEvent<HTMLFormElement> ) => {

      e.preventDefault()

      // Validacion del formulario
      if ( Object.values(expense).includes('') ) {
        
        setError('Todos los campos son obligatorios');
        return
      
      } 

      // Valida que no se pase del limite
      if ( ( expense.amount - previousAmount ) > remainingBudget ) {

        setError('Ese gasto se sale del presupuesto');
        return

      }

      // Agregar o actualizar un gasto
      if (state.editingId) {

        dispatch( { 
            type : 'update-expense', 
            payload : { 
              expense : { id : state.editingId, ...expense } 
            } 
          } )

      } else {
      
        dispatch( { type : 'add-expense', payload : { expense } } )
      
      }
      
      // Reiniciar el state
      setExpense ({

        amount : 0,
        expenseName: '',
        category: '',
        date: new Date()
      
      })

      setPreviousAmount(0)
  }


  // Cambia el nombre y el valor de gastos
  const handleChange = ( e: ChangeEvent<HTMLInputElement> |ChangeEvent<HTMLSelectElement> ) => {

    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name)
    
    setExpense({

      ...expense,
      [name] : isAmountField ? Number(value) : value
    
    })
    
  
  }
  
  // Cambia la fecha
  const handleChangeDate = ( value : Value ) => {
    
    setExpense({
      
      ...expense,
      date: value
    
    })

  }
  
  return (
    <form className="space-y-5" onSubmit={ handleSubmit }>
      <legend 
        className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        { state.editingId ? 'Editar Gasto' : 'Nuevo Gasto' }
      </legend>

      { error && <ErrorMessage>{error}</ErrorMessage> }

      <div className="flex flex-col gap-2">
        <label 
          htmlFor="expenseName"
          className="text-xl"
        >
          Nombre Gasto:
        </label>
        <input 
          value={ expense.expenseName }
          type="text"
          id="expenseName"
          placeholder="Añade el Nombre del Gasto"
          className="bg-slate-200 p-2"
          name="expenseName"
          onChange={ handleChange }
        />
      </div>

      <div className="flex flex-col gap-2">
        <label 
          htmlFor="amount"
          className="text-xl"
        >
          Cantidad:
        </label>
        <input 
          onChange={ handleChange }
          value={ expense.amount }
          type="text"
          id="amount"
          placeholder="Añade la Cantidad del Gasto"
          className="bg-slate-200 p-2"
          name="amount"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label 
          htmlFor="category"
          className="text-xl"
        >
          Categoria:
        </label>
        <select 
          value={ expense.category }
          id="category"
          className="bg-slate-200 p-2"
          name="category"
          onChange={ handleChange } 
        >
          <option value="">-- Seleccione --</option>
          {
            categories.map( category => (
            
              <option
                key={ category.id }
                value={ category.id }
              >
                { category.name }
              </option>

            ))
          }
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label 
          className="text-xl"
        >
          Fecha del Gasto:
        </label>
       <DatePicker
          className="bg-slate-100 p-2 border-0"
          value= { expense.date }
          onChange= { handleChangeDate }
       />
      </div>

      <input 
        type="submit"
        className="
          bg-blue-600 
          cursor-pointer 
          w-full p-2 
          text-white 
          uppercase 
          font-bold 
          rounded-lg 
          text-center"
        value={ state.editingId ? 'Guardar Cambios' : 'Registrar Gasto' }
      />

    </form>
  )
}
