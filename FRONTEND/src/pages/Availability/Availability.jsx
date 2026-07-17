import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import SearchInput from "../../components/common/SearchInput";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import Modal from "../../components/common/Modal";
import TeacherAvailabilityForm from "../../components/forms/TeacherAvailabilityForm";

import {
    getAllTeacherAvailability,
    createTeacherAvailability,
    updateTeacherAvailability,
    deleteTeacherAvailability
} from "../../api/teacherAvailabilityApi";

import { getAllTeachers } from "../../api/teacherApi";
import { getAllTimeSlots } from "../../api/timeSlotApi";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/common/ConfirmModal";

function Availability() {

    const [availabilities, setAvailabilities] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        teacherId: "",
        timeSlotId: "",
        available: true
    });

    const [editingAvailability, setEditingAvailability] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [availabilityToDelete, setAvailabilityToDelete] = useState(null);

    const filteredAvailabilities = availabilities.filter(
        availability =>
            availability.teacher.name.toLowerCase().includes(search.toLowerCase()) ||
            availability.timeSlot.day.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            key: "teacher",
            label: "Teacher",
            render: (a) => a.teacher.name
        },
        {
            key: "day",
            label: "Day",
            render: (a) => a.timeSlot.day
        },
        {
            key: "time",
            label: "Time",
            render: (a) =>
                `${a.timeSlot.startTime} - ${a.timeSlot.endTime}`
        },
        {
            key: "available",
            label: "Available",
            render: (a) => (
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                        a.available
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {a.available ? "Available" : "Unavailable"}
                </span>
            )
        },
        {
            key: "actions",
            label: "Actions",
            render: (a) => (
                <TableActions
                    onEdit={() => handleEdit(a)}
                    onDelete={() => handleDelete(a)}
                />
            )
        }
    ];

    useEffect(() => {
        loadAvailabilities();
    }, []);


    async function loadAvailabilities() {

        try {

            const [
                availabilityData,
                teacherData,
                timeSlotData
            ] = await Promise.all([
                getAllTeacherAvailability(),
                getAllTeachers(),
                getAllTimeSlots()
            ]);

            setAvailabilities(availabilityData);
            setTeachers(teacherData);
            setTimeSlots(timeSlotData);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    const handleEdit = (availability) => {

        setEditingAvailability(availability);

        setForm({
            teacherId: availability.teacher.id,
            timeSlotId: availability.timeSlot.id,
            available: availability.available
        });

        setOpen(true);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingAvailability) {

                await updateTeacherAvailability(
                    editingAvailability.id,
                    form
                );

                toast.success("Availability updated successfully");

            } else {

                await createTeacherAvailability(form);

                toast.success("Availability added successfully");

            }

            await loadAvailabilities();

            setForm({
                teacherId: "",
                timeSlotId: "",
                available: true
            });

            setEditingAvailability(null);

            setOpen(false);

        } catch (err) {

            console.error(err);

            toast.error("Failed to save availability");

        }

    };

    const handleDelete = (availability) => {

        setAvailabilityToDelete(availability);

        setDeleteOpen(true);

    };
    const confirmDelete = async () => {

        try {

            await deleteTeacherAvailability(
                availabilityToDelete.id
            );

            toast.success("Availability deleted successfully");

            await loadAvailabilities();

            setDeleteOpen(false);

            setAvailabilityToDelete(null);

        } catch (err) {

            console.error(err);

            toast.error("Failed to delete availability");

        }

    };

    return (

    <div className="space-y-6">

        <PageHeader
            title="Teacher Availability"
            subtitle={`${availabilities.length} availability records`}
            action={
                <Button
                    onClick={() => {

                        setEditingAvailability(null);

                        setForm({
                            teacherId: "",
                            timeSlotId: "",
                            available: true
                        });

                        setOpen(true);

                    }}
                >
                    + Add Availability
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
                data={filteredAvailabilities}
                loading={loading}
            />

        </div>

        <Modal
            open={open}
            title={
                editingAvailability
                    ? "Edit Availability"
                    : "Add Availability"
            }
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
            submitText={
                editingAvailability ? "Update" : "Save"
            }
        >
            <TeacherAvailabilityForm
                form={form}
                setForm={setForm}
                teachers={teachers}
                timeSlots={timeSlots}
            />
        </Modal>

        <ConfirmModal
            open={deleteOpen}
            title="Delete Availability"
            message={
                availabilityToDelete
                    ? `Delete availability for ${availabilityToDelete.teacher.name}?`
                    : ""
            }
            onCancel={() => {
                setDeleteOpen(false);
                setAvailabilityToDelete(null);
            }}
            onConfirm={confirmDelete}
            confirmText="Delete"
        />

    </div>

    );



}

export default Availability;