import TextField from "../common/TextField";

function SubjectForm({ form, setForm, teachers = [] }) {

    return (

        <div className="space-y-4">

            <TextField
                label="Subject Name"
                value={form.name}
                onChange={(e) =>
                    setForm({
                        ...form,
                        name: e.target.value
                    })
                }
            />

            <TextField
                label="Subject Code"
                value={form.code}
                onChange={(e) =>
                    setForm({
                        ...form,
                        code: e.target.value
                    })
                }
            />

            <TextField
                label="Weekly Frequency"
                type="number"
                value={form.weeklyFrequency}
                onChange={(e) =>
                    setForm({
                        ...form,
                        weeklyFrequency: Number(e.target.value)
                    })
                }
            />

            <div>

                <label className="mb-2 block font-medium">
                    Teacher
                </label>

                <select
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    value={form.teacher.id}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            teacher: {
                                id: Number(e.target.value)
                            }
                        })
                    }
                >

                    <option value="">
                        Select Teacher
                    </option>

                    {teachers.map((teacher) => (

                        <option
                            key={teacher.id}
                            value={teacher.id}
                        >
                            {teacher.name}
                        </option>

                    ))}

                </select>

            </div>

            <label className="flex items-center gap-3">

                <input
                    type="checkbox"
                    checked={form.isLab}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            isLab: e.target.checked
                        })
                    }
                />

                Laboratory Subject

            </label>

        </div>

    );

}

export default SubjectForm;