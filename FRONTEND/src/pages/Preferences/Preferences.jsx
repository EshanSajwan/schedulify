import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import SearchInput from "../../components/common/SearchInput";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import FacultyPreferenceForm from "../../components/forms/FacultyPreferenceForm";

import {
    getAllFacultyPreferences,
    createFacultyPreference,
    updateFacultyPreference,
    deleteFacultyPreference
} from "../../api/facultyPreferenceApi";

import { getAllTeachers } from "../../api/teacherApi";

import { toast } from "react-toastify";

function Preferences() {

    const [preferences, setPreferences] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        teacherId: "",
        maxLecturesPerDay: 4,
        avoidConsecutiveLectures: false,
        prefersLunchBreak: false
    });

    const [editingPreference, setEditingPreference] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [preferenceToDelete, setPreferenceToDelete] = useState(null);

    const filteredPreferences = preferences.filter((preference) =>
        preference.teacher.name.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            key: "teacher",
            label: "Teacher",
            render: (p) => p.teacher.name
        },
        {
            key: "maxLecturesPerDay",
            label: "Max / Day"
        },
        {
            key: "avoidConsecutiveLectures",
            label: "Avoid Consecutive",

            render: (p) => (
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                    p.avoidConsecutiveLectures
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}>
                    {p.avoidConsecutiveLectures ? "Yes" : "No"}
                </span>
            )
        },
        {
            key: "prefersLunchBreak",
            label: "Lunch Break",

            render: (p) => (
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                    p.prefersLunchBreak
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}>
                    {p.prefersLunchBreak ? "Yes" : "No"}
                </span>
            )
        },
        {
            key: "actions",
            label: "Actions",
            render: (p) => (
                <TableActions
                    onEdit={() => handleEdit(p)}
                    onDelete={() => handleDelete(p)}
                />
            )
        }
    ];
    useEffect(() => {
        loadPreferences();
    }, []);

    async function loadPreferences() {

        try {

            const [preferenceData, teacherData] = await Promise.all([
                getAllFacultyPreferences(),
                getAllTeachers()
            ]);

            setPreferences(preferenceData);
            setTeachers(teacherData);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    const handleEdit = (preference) => {

        setEditingPreference(preference);

        setForm({

            teacherId: preference.teacher.id,
            maxLecturesPerDay: preference.maxLecturesPerDay,
            avoidConsecutiveLectures: preference.avoidConsecutiveLectures,
            prefersLunchBreak: preference.prefersLunchBreak

        });

        setOpen(true);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingPreference) {

                await updateFacultyPreference(editingPreference.id, form);

                toast.success("Preference updated successfully");

            } else {

                await createFacultyPreference(form);

                toast.success("Preference added successfully");

            }

            await loadPreferences();

            setForm({
                teacherId: "",
                maxLecturesPerDay: 4,
                avoidConsecutiveLectures: false,
                prefersLunchBreak: false
            });

            setEditingPreference(null);

            setOpen(false);

        } catch (err) {

            console.error(err);

            toast.error("Failed to save preference");

        }

    };

    const handleDelete = (preference) => {

        setPreferenceToDelete(preference);

        setDeleteOpen(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteFacultyPreference(preferenceToDelete.id);

            toast.success("Preference deleted successfully");

            await loadPreferences();

            setDeleteOpen(false);

            setPreferenceToDelete(null);

        } catch (err) {

            console.error(err);

            toast.error("Failed to delete preference");

        }

    };

    return (

        <div className="space-y-6">

            <PageHeader
                title="Faculty Preferences"
                subtitle={`${preferences.length} preferences available`}
                action={
                    <Button
                        onClick={() => {

                            setEditingPreference(null);

                            setForm({
                                teacherId: "",
                                maxLecturesPerDay: 4,
                                avoidConsecutiveLectures: false,
                                prefersLunchBreak: false
                            });

                            setOpen(true);

                        }}
                    >
                        + Add Preference
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
                    data={filteredPreferences}
                    loading={loading}
                />

            </div>

            <Modal
                open={open}
                title={editingPreference ? "Edit Preference" : "Add Preference"}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
                submitText={editingPreference ? "Update" : "Save"}
            >
                <FacultyPreferenceForm
                    form={form}
                    setForm={setForm}
                    teachers={teachers}
                />
            </Modal>

            <ConfirmModal
                open={deleteOpen}
                title="Delete Preference"
                message={
                    preferenceToDelete
                        ? `Are you sure you want to delete ${preferenceToDelete.teacher.name}'s preference?`
                        : ""
                }
                onCancel={() => {
                    setDeleteOpen(false);
                    setPreferenceToDelete(null);
                }}
                onConfirm={confirmDelete}
                confirmText="Delete"
            />

        </div>

    );

}

export default Preferences;