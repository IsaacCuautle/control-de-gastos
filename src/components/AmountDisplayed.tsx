import { formatCurrency } from "../helpers"

type AmountDisplayedProps = 
{
    label : string
    amount : number
}

export default function AmountDisplayed({ label, amount } : AmountDisplayedProps) {
  
    return (

        <p className="text-2xl text-blue-600 font-bold">
            {label} : {' '}
            <span className="font-black text-black">{ formatCurrency(amount) }</span>
        </p>
    
    )

}
