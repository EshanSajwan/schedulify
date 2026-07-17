function ClassGroupForm({ form, setForm }) {

    return (

        <div className="space-y-5">

            <div>

                <label className="mb-1 block font-medium">
                    Name
                </label>

                <input
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value
                        })
                    }
                    className="w-full rounded-lg border p-3"
                />

            </div>

{/*             <div> */}

{/*                 <label className="mb-1 block font-medium"> */}
{/*                     Semester */}
{/*                 </label> */}

{/*                 <input */}
{/*                     type="number" */}
{/*                     value={form.semester} */}
{/*                     onChange={(e) => */}
{/*                         setForm({ */}
{/*                             ...form, */}
{/*                             semester: Number(e.target.value) */}
{/*                         }) */}
{/*                     } */}
{/*                     className="w-full rounded-lg border p-3" */}
{/*                 /> */}

{/*             </div> */}

{/*             <div> */}

{/*                 <label className="mb-1 block font-medium"> */}
{/*                     Section */}
{/*                 </label> */}

{/*                 <input */}
{/*                     value={form.section} */}
{/*                     onChange={(e) => */}
{/*                         setForm({ */}
{/*                             ...form, */}
{/*                             section: e.target.value */}
{/*                         }) */}
{/*                     } */}
{/*                     className="w-full rounded-lg border p-3" */}
{/*                 /> */}

{/*             </div> */}

            <div>

                <label className="mb-1 block font-medium">
                    Strength
                </label>

                <input
                    type="number"
                    value={form.strength}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            strength: Number(e.target.value)
                        })
                    }
                    className="w-full rounded-lg border p-3"
                />

            </div>

        </div>

    );

}

export default ClassGroupForm;