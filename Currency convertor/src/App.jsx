import {useEffect, useRef, useState} from 'react'
import InputBox from './components/InputBox'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("INR")
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [options, setOptions] = useState([])
  const valRef = useRef(0); //To store the value of the converted amount, when we store using useRef it will not re-render the component and also it will store the value even after the component is unmounted

  useEffect(() => {
    fetch(`https://api.frankfurter.app/currencies`)
    .then((response) => response.json())
    .then((data)=> {
        const fetchedOptions = Object.entries(data)
        setOptions(fetchedOptions)
    })
  },[options])

  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`) //will give you 1 currency = dadada every other currency
    .then((response) => response.json())
    .then((data) => valRef.current = data.rates[to])
    .then(() => console.log(convertedAmount))
    .catch((error) => console.log(error))
},[amount, from, to, convertedAmount]);

  const swap = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
    const temp2 = amount
    setAmount(convertedAmount)
    setConvertedAmount(temp2)
  }

  const display = () => {
    setConvertedAmount(valRef.current);
  }


  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat" style={{
            backgroundImage: "url(https://cdn.corporatefinanceinstitute.com/assets/foreign-exchange.jpeg)"
        }}>
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form onSubmit={(e) => {e.preventDefault(); display()}}>
                    <div className="w-full mb-1">
                        <InputBox label="From" amount={amount} onAmountChange={setAmount} onCurrencyChange={setFrom} currencyOptions={options} selectCurrency={from}/>
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}>
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox label="To" amount={convertedAmount} onAmountChange={setConvertedAmount} onCurrencyChange={setTo} currencyOptions={options} selectCurrency={to} amountDisabled/>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default App;
