import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import SearchInput from "../../components/common/SearchInput";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import Modal from "../../components/common/Modal";
import TeacherForm from "../../components/forms/TeacherForm";
import {
    getAllTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher
} from "../../api/teacherApi";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/common/ConfirmModal";

function Teachers() {

    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        department: ""
    });

    const [editingTeacher, setEditingTeacher] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [teacherToDelete, setTeacherToDelete] = useState(null);

    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(search.toLowerCase()) ||
        teacher.email.toLowerCase().includes(search.toLowerCase()) ||
        teacher.department.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [

        {
            key: "id",
            label: "ID",

            render: (teacher) => (
                <span className="font-semibold text-slate-500">
                    #{teacher.id}
                </span>
            )
        },

        {
            key: "name",
            label: "Teacher"
        },

        {
            key: "email",
            label: "Email"
        },

        {
            key: "department",
            label: "Department",

            render: (teacher) => (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {teacher.department}
                </span>
            )
        },

        {
            key: "actions",
            label: "Actions",

            render: (teacher) => (

                <TableActions

                    onEdit={() => handleEdit(teacher)}

                    onDelete={() => handleDelete(teacher)}

                />

            )

        }

    ];

    useEffect(() => {
        loadTeachers();
    }, []);


    async function loadTeachers() {

        try {

            const data = await getAllTeachers();

            setTeachers(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    const handleEdit = (teacher) => {

        setEditingTeacher(teacher);

        setForm({
            name: teacher.name,
            email: teacher.email,
            department: teacher.department
        });

        setOpen(true);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingTeacher) {

                await updateTeacher(editingTeacher.id, form);

                toast.success("Teacher updated successfully");

            } else {

                await createTeacher(form);

                toast.success("Teacher added successfully");

            }

            await loadTeachers();

            setForm({
                name: "",
                email: "",
                department: ""
            });

            setEditingTeacher(null);

            setOpen(false);

        } catch (err) {

            console.error(err);

            toast.error("Failed to save teacher");

        }

    };

    const handleDelete = (teacher) => {

        setTeacherToDelete(teacher);

        setDeleteOpen(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteTeacher(teacherToDelete.id);

            toast.success("Teacher deleted successfully");

            await loadTeachers();

            setDeleteOpen(false);

            setTeacherToDelete(null);

        } catch (err) {

            console.error(err);

            toast.error("Failed to delete teacher");

        }

    };

    return (

    <div className="space-y-6">

        <PageHeader
            title="Teachers"
            subtitle={`${teachers.length} teachers available`}
            action={
                <Button
                    onClick={() => {

                        setEditingTeacher(null);

                        setForm({
                            name: "",
                            email: "",
                            department: ""
                        });

                        setOpen(true);

                    }}
                >
                    + Add Teacher
                </Button>
            }
        />

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">

            <div className="mb-6 flex items-center justify-between">

                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search teacher..."
                />

            </div>

            <DataTable
                columns={columns}
                data={filteredTeachers}
                loading={loading}
            />

        </div>

        <Modal
            open={open}
            title={editingTeacher ? "Edit Teacher" : "Add Teacher"}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
            submitText={editingTeacher ? "Update" : "Save"}
        >
            <TeacherForm
                form={form}
                setForm={setForm}
            />
        </Modal>

        <ConfirmModal
            open={deleteOpen}
            title="Delete Teacher"
            message={
                teacherToDelete
                    ? `Are you sure you want to delete "${teacherToDelete.name}"?`
                    : ""
            }
            onCancel={() => {
                setDeleteOpen(false);
                setTeacherToDelete(null);
            }}
            onConfirm={confirmDelete}
            confirmText="Delete"
        />

    </div>

    );



}

export default Teachers;