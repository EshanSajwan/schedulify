function FacultyPreferenceForm({
    form,
    setForm,
    teachers
}) {

    return (

        <div className="space-y-5">

            <div>

                <label className="mb-1 block font-medium">
                    Teacher
                </label>

                <select
                    value={form.teacherId}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            teacherId: Number(e.target.value)
                        })
                    }
                    className="w-full rounded-lg border p-3"
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

            <div>

                <label className="mb-1 block font-medium">
                    Max Lectures Per Day
                </label>

                <input
                    type="number"
                    value={form.maxLecturesPerDay}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            maxLecturesPerDay: Number(e.target.value)
                        })
                    }
                    className="w-full rounded-lg border p-3"
                />

            </div>

            <div className="flex items-center gap-3">

                <input
                    type="checkbox"
                    checked={form.avoidConsecutiveLectures}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            avoidConsecutiveLectures: e.target.checked
                        })
                    }
                />

                <label>
                    Avoid Consecutive Lectures
                </label>

            </div>

            <div className="flex items-center gap-3">

                <input
                    type="checkbox"
                    checked={form.prefersLunchBreak}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            prefersLunchBreak: e.target.checked
                        })
                    }
                />

                <label>
                    Prefers Lunch Break
                </label>

            </div>

        </div>

    );

}

export default FacultyPreferenceForm;