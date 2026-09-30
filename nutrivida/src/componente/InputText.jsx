function InputText({titulo, value, placeholder, onChange, error}){
    return(
        <div className="flex flex-col w-full gap-1 text-[#0f172a]">
            <label>{titulo}</label>
            <input type="text" placeholder={placeholder} value={value} onChange={onChange} className="px-4 py-2 border border-gray-300 rounded-lg"/>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    )
}

export default InputText