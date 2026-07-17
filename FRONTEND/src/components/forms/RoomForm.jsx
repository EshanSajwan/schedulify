import TextField from "../common/TextField";

function RoomForm({ form, setForm }) {

    return (

        <div className="space-y-4">

            <TextField
                label="Room Number"
                type="number"
                value={form.roomNumber}
                onChange={(e)=>
                    setForm({
                        ...form,
                        roomNumber: Number(e.target.value)
                    })
                }
            />

            <div>

                <label className="mb-2 block font-medium">

                    Room Type

                </label>

                <select
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    value={form.roomType}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            roomType: e.target.value
                        })
                    }
                >

                    <option value="">
                        Select Room Type
                    </option>

                    <option value="CLASSROOM">
                        Classroom
                    </option>

                    <option value="LAB">
                        Laboratory
                    </option>

                </select>

            </div>

            <TextField
                label="Capacity"
                type="number"
                value={form.roomCapacity}
                onChange={(e)=>
                    setForm({
                        ...form,
                        roomCapacity: Number(e.target.value)
                    })
                }
            />

        </div>

    );

}

export default RoomForm;