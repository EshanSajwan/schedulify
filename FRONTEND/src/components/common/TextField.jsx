function TextField({ label, ...props }) {

    return (

        <div>

            <label className="mb-2 block text-sm font-medium">
                {label}
            </label>

            <input
                {...props}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

        </div>

    );

}

export default TextField;