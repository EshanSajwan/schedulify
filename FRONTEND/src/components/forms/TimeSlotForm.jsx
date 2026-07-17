const DAYS = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY"
];

function TimeSlotForm({ form, setForm }) {

    return (

        <div className="space-y-5">

            <div>

                <label className="mb-1 block font-medium">
                    Day
                </label>

                <select
                    value={form.day}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            day: e.target.value
                        })
                    }
                    className="w-full rounded-lg border p-3"
                >

                    <option value="">Select Day</option>

                    {DAYS.map(day => (
                        <option
                            key={day}
                            value={day}
                        >
                            {day}
                        </option>
                    ))}

                </select>

            </div>

            <div>

                <label className="mb-1 block font-medium">
                    Start Time
                </label>

                <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            startTime: e.target.value
                        })
                    }
                    className="w-full rounded-lg border p-3"
                />

            </div>

            <div>

                <label className="mb-1 block font-medium">
                    End Time
                </label>

                <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            endTime: e.target.value
                        })
                    }
                    className="w-full rounded-lg border p-3"
                />

            </div>

        </div>

    );

}

export default TimeSlotForm;