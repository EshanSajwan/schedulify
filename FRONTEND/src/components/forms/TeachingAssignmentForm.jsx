function TeachingAssignmentForm({
    form,
    setForm,
    teachers,
    subjects,
    classGroups
}) {

    return (

        <div className="space-y-5">

            <div>

                <label className="mb-1 block font-medium">
                    Teacher
                </label>

                <select
                    value={form.teacherId}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            teacherId:Number(e.target.value)
                        })
                    }
                    className="w-full rounded-lg border p-3"
                >

                    <option value="">
                        Select Teacher
                    </option>

                    {teachers.map(teacher=>(

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
                    Subject
                </label>

                <select
                    value={form.subjectId}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            subjectId:Number(e.target.value)
                        })
                    }
                    className="w-full rounded-lg border p-3"
                >

                    <option value="">
                        Select Subject
                    </option>

                    {subjects.map(subject=>(

                        <option
                            key={subject.id}
                            value={subject.id}
                        >
                            {subject.name}
                        </option>

                    ))}

                </select>

            </div>

            <div>

                <label className="mb-1 block font-medium">
                    Class Group
                </label>

                <select
                    value={form.classGroupId}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            classGroupId:Number(e.target.value)
                        })
                    }
                    className="w-full rounded-lg border p-3"
                >

                    <option value="">
                        Select Class
                    </option>

                    {classGroups.map(group=>(

                        <option
                            key={group.id}
                            value={group.id}
                        >
                            {group.name}
                        </option>

                    ))}

                </select>

            </div>

            <div>

                <label className="mb-1 block font-medium">
                    Weekly Frequency
                </label>

                <input
                    type="number"
                    min="1"
                    value={form.frequency}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            frequency:Number(e.target.value)
                        })
                    }
                    className="w-full rounded-lg border p-3"
                />

            </div>

        </div>

    );

}

export default TeachingAssignmentForm;