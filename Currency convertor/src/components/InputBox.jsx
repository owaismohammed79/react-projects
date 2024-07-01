import PropTypes from 'prop-types';

InputBox.propTypes = {
    label: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    onAmountChange: PropTypes.func.isRequired,
    onCurrencyChange: PropTypes.func.isRequired,
    currencyOptions: PropTypes.array.isRequired,
    selectCurrency: PropTypes.string.isRequired,
    amountDisabled: PropTypes.bool,
    currencyDisabled: PropTypes.bool,
    className: PropTypes.string,
}; 

function InputBox({label, amount, onAmountChange, onCurrencyChange, currencyOptions = [], selectCurrency ="USD", amountDisabled = false, currencyDisabled = false, className = "",}) {
   

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label  className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisabled} //Aise compulsory nahi he ye par thik he rakh sakte he
                    value = {amount}
                    onChange = {onAmountChange && ((e) => onAmountChange(Number(e.target.value)))} //Pehle to jab jab jo number he wo change hoga to firse value calc karo, secondly wo calc fn ka reference pass kia he ki nahi?? isiliye wo && aur uske baad wala function, thirdly e.target.value me string aata he to number me convert karna padta he
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none" value={selectCurrency} onChange={(e) => onCurrencyChange(e.target.value)} disabled={currencyDisabled}> {/*Initial value kya select hogi bhai?? isilie value me pass kia he wo var ko aur us variable ko default value bhi di h,,,,,, onChange ki agar currency hi change kardi bhai tumne to firse API call karo
                ,,,, Is baar number me nahi convert kar rhe e.target.value ko kyu ki string me hi accept kar rhi he API */}
                    
                {currencyOptions.map((curr) => {
                    return(<option key = {curr} value={curr[0]}> 
                            {curr[0]}
                        </option>);
                })}{/*Keys deni important he faster render ke lie, unique value honi chahiye, ID is most preferred*/}
                
                </select>
            </div>
        </div>
    );
}



export default InputBox
