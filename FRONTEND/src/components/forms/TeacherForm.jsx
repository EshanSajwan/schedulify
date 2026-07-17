import TextField from "../common/TextField";

function TeacherForm({ form, setForm }) {

    function handleChange(e) {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    }

    return (

        <div className="space-y-5">

            <TextField
                label="Teacher Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter teacher name"
            />

            <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="teacher@example.com"
            />

            <TextField
                label="Department"
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="CSE"
            />

        </div>

    );

}

export default TeacherForm;