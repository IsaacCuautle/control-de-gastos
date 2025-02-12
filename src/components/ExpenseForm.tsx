import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { categories } from "../data/categories";
import type { DraftExpense } from "../types";

export default function ExpenseForm() {

  const [ expense, setExpense ] = useState<DraftExpense>( {
    amount : 0,
    expenseName : '',
    category : '',
    date : new Date()
  } )

  const [selected, setSelected] = useState<Date>();

  return (
    <form className="space-y-5">
      <legend 
        className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>

      <div className="flex flex-col gap-2">
        <label 
          htmlFor=""
          className="text-xl"
        >
          Nombre Gasto:
        </label>
        <input 
          value={expense.expenseName}
          type="text"
          id="expenseName"
          placeholder="Añade el Nombre del Gasto"
          className="bg-slate-200 p-2"
          name="expenseName"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label 
          htmlFor=""
          className="text-xl"
        >
          Cantidad:
        </label>
        <input 
          value={expense.amount}
          type="text"
          id="amount"
          placeholder="Añade la Cantidad del Gasto"
          className="bg-slate-200 p-2"
          name="amount"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label 
          htmlFor=""
          className="text-xl"
        >
          Categoria:
        </label>
        <select 
          value={expense.category}
          id="category"
          className="bg-slate-200 p-2"
          name="category"
        >
          <option value="">-- Seleccione --</option>
          {categories.map( category => (
            
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>

          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label 
          htmlFor=""
          className="text-xl"
        >
          Fecha del Gasto:
        </label>
       <DayPicker
          className="bg-slate-100 p-2 border-0"
          mode="single"
          selected= { expense.date }
          onSelect= { 
            
            (date) => {
            
              if (date) {
               
                // Actualiza expense.date con la nueva fecha seleccionada
                setExpense((prevExpense) => ({ ...prevExpense, date })); 
              
              }

            } 
          }
          footer= { selected ? `Selected: ${ expense.date.toLocaleDateString() }` : "Pick a day." }
       />
      </div>

      <input 
        type="submmit"
        className="
          bg-blue-600 
          cursor-pointer 
          w-full p-2 
          text-white 
          uppercase 
          font-bold 
          rounded-lg 
          text-center"
        value="Registrar Gasto"
      />

    </form>
  )
}
