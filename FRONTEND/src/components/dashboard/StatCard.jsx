const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600"
};

function StatCard({
    title,
    value,
    color = "blue",
    onClick
}) {

    return (

        <div
            onClick={onClick}
            className="
                cursor-pointer
                rounded-2xl
                bg-white
                p-6
                shadow-sm
                border
                border-slate-200
                transition
                hover:shadow-lg
                hover:-translate-y-1
            "
        >

            <p className="text-slate-500 text-sm font-medium">

                {title}

            </p>

            <h2 className={`mt-3 text-4xl font-bold ${colors[color]}`}>

                {value}

            </h2>

        </div>

    );

}

export default StatCard;