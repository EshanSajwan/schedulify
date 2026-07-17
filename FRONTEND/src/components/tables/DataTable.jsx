function DataTable({ columns, data, loading }) {

    if (loading) {
        return (
            <div className="rounded-xl bg-white p-12 text-center shadow">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }

    if (!loading && data.length === 0) {
        return (
            <div className="rounded-xl bg-white p-12 text-center shadow">
                <p className="text-slate-500 text-lg">
                    No records found.
                </p>
            </div>
        );
    }

    return (

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">

            <table className="w-full">

                <thead>

                    <tr className="bg-slate-100">

                        {columns.map(column => (

                            <th
                                key={column.key}
                                className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-slate-700"
                            >
                                {column.label}
                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {data.map((row, index) => (

                        <tr
                            key={row.id}
                            className={`transition hover:bg-blue-50 ${
                                index !== data.length - 1
                                    ? "border-b border-slate-200"
                                    : ""
                            }`}
                        >

                            {columns.map(column => (

                                <td
                                    key={column.key}
                                    className="px-6 py-5 text-slate-700"
                                >

                                    {column.render
                                        ? column.render(row)
                                        : row[column.key]}

                                </td>

                            ))}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default DataTable;