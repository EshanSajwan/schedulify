function Button({ children, onClick, type = "button" }) {

    return (

        <button
            type={type}
            onClick={onClick}
            className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
            {children}
        </button>

    );

}

export default Button;