import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import SearchInput from "../../components/common/SearchInput";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import Modal from "../../components/common/Modal";
import SubjectForm from "../../components/forms/SubjectForm";
import {
    getAllSubjects,
    createSubject,
    updateSubject,
    deleteSubject
} from "../../api/subjectApi";
import { getAllTeachers } from "../../api/teacherApi";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/common/ConfirmModal";


function Subjects() {

    const [subjects, setSubjects] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [teachers, setTeachers] = useState([]);

    const [form, setForm] = useState({
        name: "",
        code: "",
        weeklyFrequency: 1,
        isLab: false,
        teacher: {
            id: ""
        }
    });

    const [editingSubject, setEditingSubject] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [subjectToDelete, setSubjectToDelete] = useState(null);

    const filteredSubjects = subjects.filter((subject) =>
        subject.name.toLowerCase().includes(search.toLowerCase()) ||
        subject.code.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [

        {
            key: "id",
            label: "ID",

            render: (subject) => (
                <span className="font-semibold text-slate-500">
                    #{subject.id}
                </span>
            )
        },

        {
            key: "name",
            label: "Subject"
        },

        {
            key: "code",
            label: "Code"
        },

        {
            key: "weeklyFrequency",
            label: "Weekly"
        },


        {
            key: "isLab",
            label: "Lab",

            render: (subject) => (

                subject.isLab ? (

                    <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-700">

                        Lab

                    </span>

                ) : (

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">

                        Theory

                    </span>

                )

            )
        },

    {
        key: "teacher",
        label: "Teacher",

        render: (subject) => (

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">

                {subject.teacher?.name || "Unassigned"}

            </span>

        )
    },

        {
            key: "actions",
            label: "Actions",

            render: (subject) => (

                <TableActions
                    onEdit={() => handleEdit(subject)}
                    onDelete={() => handleDelete(subject)}
                />

            )

        }

    ];

    useEffect(() => {
        loadSubjects();
    }, []);


    async function loadSubjects() {

        try {

            const [subjectsData, teachersData] = await Promise.all([
                getAllSubjects(),
                getAllTeachers()
            ]);

            setSubjects(subjectsData);
            setTeachers(teachersData);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    const handleEdit = (subject) => {

        setEditingSubject(subject);

        setForm({
            name: subject.name,
            code: subject.code,
            weeklyFrequency: subject.weeklyFrequency,
            isLab: subject.isLab,
            teacher: {
                id: subject.teacher?.id || ""
            }
        });

        setOpen(true);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingSubject) {

                await updateSubject(editingSubject.id, form);

                toast.success("Subject updated successfully");

            } else {

                await createSubject(form);

                toast.success("Subject added successfully");

            }

            await loadSubjects();

            setForm({
                name: "",
                code: "",
                weeklyFrequency: 1,
                isLab: false,
                teacher: {
                    id: ""
                }
            });

            setEditingSubject(null);

            setOpen(false);

        } catch (err) {

            console.error(err);

            toast.error("Failed to save subject");

        }

    };

    const handleDelete = (subject) => {

        setSubjectToDelete(subject);

        setDeleteOpen(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteSubject(subjectToDelete.id);

            toast.success("Subject deleted successfully");

            await loadSubjects();

            setDeleteOpen(false);

            setSubjectToDelete(null);

        } catch (err) {

            console.error(err);

            toast.error("Failed to delete subject");

        }

    };

    return (

    <div className="space-y-6">

        <PageHeader
            title="Subjects"
            subtitle={`${subjects.length} subjects available`}
            action={
                <Button
                    onClick={() => {

                        setEditingSubject(null);

                        setForm({
                            name: "",
                            code: "",
                            weeklyFrequency: 1,
                            isLab: false,
                            teacher: {
                                id: ""
                            }
                        });

                        setOpen(true);

                    }}
                >
                    + Add Subjects
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
                data={filteredSubjects}
                loading={loading}
            />

        </div>

        <Modal
            open={open}
            title={editingSubject ? "Edit Subject" : "Add Subject"}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
            submitText={editingSubject ? "Update" : "Save"}
        >
            <SubjectForm
                form={form}
                setForm={setForm}
                teachers={teachers}
            />
        </Modal>

        <ConfirmModal
            open={deleteOpen}
            title="Delete Subject"
            message={
                subjectToDelete
                    ? `Are you sure you want to delete "${subjectToDelete.name}"?`
                    : ""
            }
            onCancel={() => {
                setDeleteOpen(false);
                setSubjectToDelete(null);
            }}
            onConfirm={confirmDelete}
            confirmText="Delete"
        />

    </div>

    );



}

export default Subjects;