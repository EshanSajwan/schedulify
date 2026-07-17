import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import SearchInput from "../../components/common/SearchInput";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import RoomForm from "../../components/forms/RoomForm";

import {
    getAllRooms,
    createRoom,
    updateRoom,
    deleteRoom
} from "../../api/roomApi";

import { toast } from "react-toastify";

function Rooms() {

    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        roomNumber: "",
        roomType: "",
        roomCapacity: ""
    });

    const [editingRoom, setEditingRoom] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [roomToDelete, setRoomToDelete] = useState(null);

    const filteredRooms = rooms.filter((room) =>
        room.roomNumber.toString().includes(search) ||
        room.roomType.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [

        {
            key: "id",
            label: "ID",

            render: (room) => (
                <span className="font-semibold text-slate-500">
                    #{room.id}
                </span>
            )
        },

        {
            key: "roomNumber",
            label: "Room Number"
        },

        {
            key: "roomType",
            label: "Type",

            render: (room) => (

                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                        room.roomType === "LAB"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                    }`}
                >
                    {room.roomType}
                </span>

            )
        },

        {
            key: "roomCapacity",
            label: "Capacity"
        },

        {
            key: "actions",
            label: "Actions",

            render: (room) => (

                <TableActions
                    onEdit={() => handleEdit(room)}
                    onDelete={() => handleDelete(room)}
                />

            )
        }

    ];

    useEffect(() => {
        loadRooms();
    }, []);


    async function loadRooms() {

        try {

            const data = await getAllRooms();

            console.log(data);

            setRooms(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    const handleEdit = (room) => {

        setEditingRoom(room);

        setForm({
            roomNumber: room.roomNumber,
            roomType: room.roomType,
            roomCapacity: room.roomCapacity
        });

        setOpen(true);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingRoom) {

                await updateRoom(editingRoom.id, form);

                toast.success("Room updated successfully");

            } else {

                await createRoom(form);

                toast.success("Room added successfully");

            }

            await loadRooms();

            setForm({
                roomNumber: "",
                roomType: "",
                roomCapacity: ""
            });

            setEditingRoom(null);

            setOpen(false);

        } catch (err) {

            console.error(err);

            toast.error("Failed to save room");

        }

    };

    const handleDelete = (room) => {

        setRoomToDelete(room);

        setDeleteOpen(true);

    };

    const confirmDelete = async () => {


        try {

            await deleteRoom(roomToDelete.roomNumber);

            await loadRooms();

            toast.success("Room deleted successfully");

            setDeleteOpen(false);
            setRoomToDelete(null);

        } catch (err) {

            console.error(err);
        }

    };

    return (

    <div className="space-y-6">

        <PageHeader
            title="Rooms"
            subtitle={`${rooms.length} rooms available`}
            action={
                <Button
                    onClick={() => {

                        setEditingRoom(null);

                        setForm({
                            roomNumber: 0,
                            roomType: "",
                            roomCapacity: 0
                        });

                        setOpen(true);

                    }}
                >
                    + Add Room
                </Button>
            }
        />

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">

            <div className="mb-6 flex items-center justify-between">

                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search room..."
                />

            </div>

            <DataTable
                columns={columns}
                data={filteredRooms}
                loading={loading}
            />

        </div>

        <Modal
            open={open}
            title={editingRoom ? "Edit Room" : "Add Room"}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
            submitText={editingRoom ? "Update" : "Save"}
        >
            <RoomForm
                form={form}
                setForm={setForm}
            />
        </Modal>

        <ConfirmModal
            open={deleteOpen}
            title="Delete Room"
            message={
                roomToDelete
                    ? `Are you sure you want to delete Room ${roomToDelete.roomNumber}?`
                    : ""
            }
            onCancel={() => {
                setDeleteOpen(false);
                setRoomToDelete(null);
            }}
            onConfirm={confirmDelete}
            confirmText="Delete"
        />

    </div>

    );

}

export default Rooms;