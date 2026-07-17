function PageHeader({ title, subtitle, action }) {
    return (
        <div className="flex items-center justify-between mb-8">

            <div>

                <h1 className="text-3xl font-bold">

                    {title}

                </h1>

                <p className="text-slate-500 mt-1">

                    {subtitle}

                </p>

            </div>

            {action}

        </div>
    );
}

export default PageHeader;