import { Pencil, Trash2 } from "lucide-react";

function TableActions({ onEdit, onDelete }) {

    return (

        <div className="flex gap-3">

            <button
                onClick={onEdit}
                className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
            >
                <Pencil size={18}/>
            </button>

            <button
                onClick={onDelete}
                className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
            >
                <Trash2 size={18}/>
            </button>

        </div>

    );

}

export default TableActions;