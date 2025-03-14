import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";


export default function FilterCategories() {

    const {dispatch} = useBudget();

    const handleChange = ( e : ChangeEvent<HTMLSelectElement> ) => {

        dispatch( { type: 'filter', payload : { id : e.target.value } } )

    }

    return (

        <div className="bg-white shadow-lg rounded-lg p-10">
            <form action="">

            <div className="flex flex-col md:flex-row md:items-center gab-5">    
                <label htmlFor="category">Filtrar gastos: </label>
                <select 
                    id="category" 
                    className="bg-slate-100 p-3 flex-1 rounded-lg"
                    onChange={ handleChange }
                >
                    <option value="">-- Todas las Categorias--</option>
                    {categories.map( category => (
                        <option 
                            value={category.id}
                            key={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            </form>
        </div>

    )
}
