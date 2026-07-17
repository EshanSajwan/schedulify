function StatCard({ title, value, icon: Icon }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-slate-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {value}
                    </h2>

                </div>

                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">

                    <Icon className="text-blue-600"/>

                </div>

            </div>

        </div>
    );
}

export default StatCard;