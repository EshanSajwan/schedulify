function TeacherAvailabilityForm({
    form,
    setForm,
    teachers,
    timeSlots
}) {
    return (
        <div className="space-y-4">

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
                    className="w-full rounded-lg border p-2"
                    required
                >
                    <option value="">Select Teacher</option>

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
                    Time Slot
                </label>

                <select
                    value={form.timeSlotId}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            timeSlotId: Number(e.target.value)
                        })
                    }
                    className="w-full rounded-lg border p-2"
                    required
                >
                    <option value="">Select Time Slot</option>

                    {timeSlots.map((slot) => (
                        <option
                            key={slot.id}
                            value={slot.id}
                        >
                            {slot.day} | {slot.startTime} - {slot.endTime}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-1 block font-medium">
                    Availability
                </label>

                <select
                    value={String(form.available)}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            available: e.target.value === "true"
                        })
                    }
                    className="w-full rounded-lg border p-2"
                >
                    <option value="true">Available</option>
                    <option value="false">Unavailable</option>
                </select>
            </div>

        </div>
    );
}

export default TeacherAvailabilityForm;