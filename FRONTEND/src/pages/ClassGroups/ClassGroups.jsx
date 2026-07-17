import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import SearchInput from "../../components/common/SearchInput";
import DataTable from "../../components/tables/DataTable";
import TableActions from "../../components/tables/TableActions";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import ClassGroupForm from "../../components/forms/ClassGroupForm";

import {
    getAllClassGroups,
    createClassGroup,
    updateClassGroup,
    deleteClassGroup
} from "../../api/classGroupApi";

import { toast } from "react-toastify";

function ClassGroups() {

    const [classGroups, setClassGroups] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        strength: 0
    });

    const [editingClassGroup, setEditingClassGroup] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [classGroupToDelete, setClassGroupToDelete] = useState(null);

    const filteredClassGroups = classGroups.filter((group) =>
        group.name.toLowerCase().includes(search.toLowerCase()) ||
        group.strength.toString().includes(search)
    );

    const columns = [

        {
            key: "id",
            label: "ID",

            render: (group) => (
                <span className="font-semibold text-slate-500">
                    #{group.id}
                </span>
            )
        },

        {
            key: "name",
            label: "Class Group"
        },

        {
            key: "strength",
            label: "Strength"
        },

        {
            key: "actions",
            label: "Actions",

            render: (group) => (

                <TableActions
                    onEdit={() => handleEdit(group)}
                    onDelete={() => handleDelete(group)}
                />

            )

        }

    ];

    useEffect(() => {
        loadClassGroups();
    }, []);

    async function loadClassGroups() {

        try {

            const data = await getAllClassGroups();

            setClassGroups(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    const handleEdit = (group) => {

        setEditingClassGroup(group);

        setForm({
            name: group.name,
            strength: group.strength
        });

        setOpen(true);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingClassGroup) {

                await updateClassGroup(editingClassGroup.id, form);

                toast.success("Class Group updated successfully");

            } else {

                await createClassGroup(form);

                toast.success("Class Group added successfully");

            }

            await loadClassGroups();

            setForm({
                name: "",
                strength: ""
            });

            setEditingClassGroup(null);

            setOpen(false);

        } catch (err) {

            console.error(err);

            toast.error("Failed to save Class Group");

        }

    };

    const handleDelete = (group) => {

        setClassGroupToDelete(group);

        setDeleteOpen(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteClassGroup(classGroupToDelete.id);

            toast.success("Class Group deleted successfully");

            await loadClassGroups();

            setDeleteOpen(false);

            setClassGroupToDelete(null);

        } catch (err) {

            console.error(err);

            toast.error("Failed to delete Class Group");

        }

    };

    return (

        <div className="space-y-6">

            <PageHeader
                title="Class Groups"
                subtitle={`${classGroups.length} class groups available`}
                action={
                    <Button
                        onClick={() => {

                            setEditingClassGroup(null);

                            setForm({
                                name: "",
                                strength: ""
                            });

                            setOpen(true);

                        }}
                    >
                        + Add Class Group
                    </Button>
                }
            />

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">

                <div className="mb-6 flex items-center justify-between">

                    <SearchInput
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search class group..."
                    />

                </div>

                <DataTable
                    columns={columns}
                    data={filteredClassGroups}
                    loading={loading}
                />

            </div>

            <Modal
                open={open}
                title={editingClassGroup ? "Edit Class Group" : "Add Class Group"}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
                submitText={editingClassGroup ? "Update" : "Save"}
            >
                <ClassGroupForm
                    form={form}
                    setForm={setForm}
                />
            </Modal>

            <ConfirmModal
                open={deleteOpen}
                title="Delete Class Group"
                message={
                    classGroupToDelete
                        ? `Are you sure you want to delete "${classGroupToDelete.name}"?`
                        : ""
                }
                onCancel={() => {
                    setDeleteOpen(false);
                    setClassGroupToDelete(null);
                }}
                onConfirm={confirmDelete}
                confirmText="Delete"
            />

        </div>

    );

}

export default ClassGroups;