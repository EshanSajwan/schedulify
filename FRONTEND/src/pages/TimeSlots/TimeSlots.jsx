import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import SearchInput from "../../components/common/SearchInput";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import TimeSlotForm from "../../components/forms/TimeSlotForm";

import {
    getAllTimeSlots,
    createTimeSlot,
    updateTimeSlot,
    deleteTimeSlot
} from "../../api/timeSlotApi";

import { toast } from "react-toastify";

function TimeSlots() {

    const [timeSlots, setTimeSlots] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        day: "",
        startTime: "",
        endTime: ""
    });

    const [editingTimeSlot, setEditingTimeSlot] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [timeSlotToDelete, setTimeSlotToDelete] = useState(null);

    const filteredTimeSlots = timeSlots.filter((slot) =>
        slot.day.toLowerCase().includes(search.toLowerCase()) ||
        slot.startTime.includes(search) ||
        slot.endTime.includes(search)
    );

    const columns = [

        {
            key: "id",
            label: "ID",

            render: (slot) => (
                <span className="font-semibold text-slate-500">
                    #{slot.id}
                </span>
            )
        },

        {
            key: "day",
            label: "Day"
        },

        {
            key: "startTime",
            label: "Start Time"
        },

        {
            key: "endTime",
            label: "End Time"
        },

        {
            key: "actions",
            label: "Actions",

            render: (slot) => (

                <TableActions
                    onEdit={() => handleEdit(slot)}
                    onDelete={() => handleDelete(slot)}
                />

            )
        }

    ];

    useEffect(() => {
        loadTimeSlots();
    }, []);


    async function loadTimeSlots() {

        try {

            const data = await getAllTimeSlots();

            setTimeSlots(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    const handleEdit = (slot) => {

        setEditingTimeSlot(slot);

        setForm({
            day: slot.day,
            startTime: slot.startTime,
            endTime: slot.endTime
        });

        setOpen(true);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingTimeSlot) {

                await updateTimeSlot(editingTimeSlot.id, form);

                toast.success("Time Slot updated successfully");

            } else {

                await createTimeSlot(form);

                toast.success("Time Slot added successfully");

            }

            await loadTimeSlots();

            setForm({
                day: "",
                startTime: "",
                endTime: ""
            });

            setEditingTimeSlot(null);

            setOpen(false);

        } catch (err) {

            console.error(err);

            toast.error("Failed to save room");

        }

    };

    const handleDelete = (slot) => {

        setTimeSlotToDelete(slot);

        setDeleteOpen(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteTimeSlot(timeSlotToDelete.id);

            await loadTimeSlots();

            toast.success("Time Slot deleted successfully");

            setDeleteOpen(false);

            setTimeSlotToDelete(null);

        } catch (err) {

            console.error(err);

        }

    };

    return (

    <div className="space-y-6">

        <PageHeader
            title="Time Slots"
            subtitle={`${timeSlots.length} time slots available`}
            action={
                <Button
                    onClick={() => {

                        setEditingTimeSlot(null);

                        setForm({
                            day: "",
                            startTime: "",
                            endTime: ""
                        });

                        setOpen(true);

                    }}
                >
                    + Add Time Slot
                </Button>
            }
        />

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">

            <div className="mb-6 flex items-center justify-between">

                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search time slot..."
                />

            </div>

            <DataTable
                columns={columns}
                data={filteredTimeSlots}
                loading={loading}
            />

        </div>

        <Modal
            open={open}
            title={editingTimeSlot ? "Edit Time Slot" : "Add Time Slot"}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
            submitText={editingTimeSlot ? "Update" : "Save"}
        >
            <TimeSlotForm
                form={form}
                setForm={setForm}
            />
        </Modal>

        <ConfirmModal
            open={deleteOpen}
            title="Delete Time Slot"
            message={
                timeSlotToDelete
                    ? `Delete ${timeSlotToDelete.day} (${timeSlotToDelete.startTime} - ${timeSlotToDelete.endTime})?`
                    : ""
            }
            onCancel={() => {
                setDeleteOpen(false);
                setTimeSlotToDelete(null);
            }}
            onConfirm={confirmDelete}
            confirmText="Delete"
        />

    </div>

    );

}

export default TimeSlots;