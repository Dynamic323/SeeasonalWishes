/* eslint-disable react/prop-types */
export default function FormInput({ label, type = 'text', name = 'null',value= '' , OnChange = ()=>{}, isTextArea=false }) {
    return (
        <>
            <div className="relative mb-4">
                <label htmlFor={name} className="leading-7 text-base text-primary my-2">{label}</label>
                {isTextArea ? <textarea className="textarea w-full input border focus:border-none focus:outline-primary border-primary" name={name} id={name} onInput={OnChange}>{value}</textarea>  :  <input type={type} value={value} onInput={OnChange} id={name} name={name} className="w-full input border focus:border-none focus:outline-primary border-primary" />}
            </div>
        </>
    );
}