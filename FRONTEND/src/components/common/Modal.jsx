function Modal({
    open,
    title,
    children,
    onClose,
    onSubmit,
    submitText = "Save"
}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-xl font-bold">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-slate-500 hover:text-red-500"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={onSubmit}
                    className="space-y-5 p-6"
                >

                    {children}

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-5 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                        >
                            {submitText}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default Modal;