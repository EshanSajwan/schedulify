function ConfirmModal({
    open,
    title,
    message,
    onCancel,
    onConfirm,
    confirmText = "Delete"
}) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">

                <div className="border-b px-6 py-4">

                    <h2 className="text-xl font-bold text-red-600">
                        {title}
                    </h2>

                </div>

                <div className="px-6 py-5">

                    <p className="text-slate-700">
                        {message}
                    </p>

                </div>

                <div className="flex justify-end gap-3 border-t px-6 py-4">

                    <button
                        onClick={onCancel}
                        className="rounded-lg border px-5 py-2 hover:bg-slate-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                    >
                        {confirmText}
                    </button>

                </div>

            </div>

        </div>
    );

}

export default ConfirmModal;