import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import SearchInput from "../../components/common/SearchInput";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import Modal from "../../components/common/Modal";
import TeachingAssignmentForm from "../../components/forms/TeachingAssignmentForm";

import {
    getAllTeachingAssignments,
    createTeachingAssignment,
    updateTeachingAssignment,
    deleteTeachingAssignment
} from "../../api/teachingAssignmentApi";

import { getAllTeachers } from "../../api/teacherApi";
import { getAllSubjects } from "../../api/subjectApi";
import { getAllClassGroups } from "../../api/classGroupApi";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/common/ConfirmModal";

function TeachingAssignments() {

    const [assignments, setAssignments] = useState([]);

    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classGroups, setClassGroups] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        teacherId: "",
        subjectId: "",
        classGroupId: "",
        frequency: 1
    });

    const [editingAssignment, setEditingAssignment] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [assignmentToDelete, setAssignmentToDelete] = useState(null);

    const filteredAssignments = assignments.filter(
        (assignment) =>
            assignment.teacher.name.toLowerCase().includes(search.toLowerCase()) ||
            assignment.subject.name.toLowerCase().includes(search.toLowerCase()) ||
            assignment.classGroup.name.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [

        {
            key: "subject",
            label: "Subject",

            render: (assignment) => assignment.subject.name
        },

        {
            key: "teacher",
            label: "Teacher",

            render: (assignment) => assignment.teacher.name
        },

        {
            key: "classGroup",
            label: "Class Group",

            render: (assignment) => (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {assignment.classGroup.name}
                </span>
            )
        },

        {
            key: "weeklyFrequency",
            label: "Frequency",

            render: (assignment) => (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                    {assignment.weeklyFrequency}
                </span>
            )
        },

        {
            key: "actions",
            label: "Actions",

            render: (assignment) => (
                <TableActions
                    onEdit={() => handleEdit(assignment)}
                    onDelete={() => handleDelete(assignment)}
                />
            )
        }

    ];

    useEffect(() => {
        loadAssignments();
    }, []);


    async function loadAssignments() {

        try {

            const [
                assignmentData,
                teacherData,
                subjectData,
                classGroupData
            ] = await Promise.all([
                getAllTeachingAssignments(),
                getAllTeachers(),
                getAllSubjects(),
                getAllClassGroups()
            ]);

                console.log("Assignments:", assignmentData);
                console.log("Teachers:", teacherData);
                console.log("Subjects:", subjectData);
                console.log("Class Groups:", classGroupData);

            setAssignments(assignmentData);
            setTeachers(teacherData);
            setSubjects(subjectData);
            setClassGroups(classGroupData);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    const handleEdit = (assignment) => {

        setEditingAssignment(assignment);

        setForm({

            teacherId: assignment.teacher.id,

            subjectId: assignment.subject.id,

            classGroupId: assignment.classGroup.id,

            frequency: assignment.weeklyFrequency

        });

        setOpen(true);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingAssignment) {

                await updateTeachingAssignment(editingAssignment.id, form)

                toast.success("TeachingAssignment updated successfully");

            } else {

                await createTeachingAssignment(form)

                toast.success("TeachingAssignment added successfully");

            }

            await loadAssignments();

            setForm({
                teacherId: "",
                subjectId: "",
                classGroupId: "",
                frequency: 1
            });

            setEditingAssignment(null);

            setOpen(false);

        } catch (err) {

            console.error(err);

            toast.error("Failed to save teachingAssignment");

        }

    };

    const handleDelete = (teachingAssignment) => {

        setAssignmentToDelete(teachingAssignment);

        setDeleteOpen(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteTeachingAssignment(assignmentToDelete.id);

            toast.success("teachingAssignment deleted successfully");

            await loadAssignments();

            setDeleteOpen(false);

            setAssignmentToDelete(null);

        } catch (err) {

            console.error(err);

            toast.error("Failed to delete teachingAssignment");

        }

    };

    return (

    <div className="space-y-6">

        <PageHeader
            title="Teaching Assignments"

            subtitle={`${assignments.length} assignments available`}
            action={
                <Button
                    onClick={() => {

                        setEditingAssignment(null);

                        setForm({
                            teacherId: "",
                            subjectId: "",
                            classGroupId: "",
                            frequency: 1
                        });

                        setOpen(true);

                    }}
                >
                    + Add Assignment
                </Button>
            }
        />

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">

            <div className="mb-6 flex items-center justify-between">

                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search assignment..."
                />

            </div>

            <DataTable
                columns={columns}
                data={filteredAssignments}
                loading={loading}
            />

        </div>

        <Modal
            open={open}
            title={editingAssignment ? "Edit Assignment" : "Add Assignment"}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
            submitText={editingAssignment ? "Update" : "Save"}
        >
            <TeachingAssignmentForm
                form={form}
                setForm={setForm}
                teachers={teachers}
                subjects={subjects}
                classGroups={classGroups}
            />
        </Modal>

        <ConfirmModal
            open={deleteOpen}
            title="Delete Assignment"
            message={
                assignmentToDelete
                    ? `Delete ${assignmentToDelete.subject.name} assignment?`
                    : ""
            }
            onCancel={() => {
                setDeleteOpen(false);
                setAssignmentToDelete(null);
            }}
            onConfirm={confirmDelete}
            confirmText="Delete"
        />

    </div>

    );



}

export default TeachingAssignments;