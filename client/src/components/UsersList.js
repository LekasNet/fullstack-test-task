import React, { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/api";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "user", birth_date: "" });
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers().then(r => {});
    }, []);

    const handleAddUser = async () => {
        try {
            await createUser(newUser);
            setUsers((prevUsers) => [...prevUsers, newUser]);
            setNewUser({ name: "", email: "", role: "user", birth_date: "" });  // reset form
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleEditUser = async (id) => {
        try {
            await updateUser(id, editingUser);
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === id ? editingUser : user))
            );
            setEditingUser(null);  // reset editing form
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div>
            <h2>Users</h2>
            <div>
                <TextField
                    label="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <TextField
                    label="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Birth Date"
                    type="date"
                    value={newUser.birth_date}
                    onChange={(e) => setNewUser({ ...newUser, birth_date: e.target.value })}
                />
                <Button onClick={handleAddUser}>Add User</Button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.email} - {user.role} - {user.birth_date}
                            <Button onClick={() => setEditingUser(user)}>Edit</Button>
                            <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                            {editingUser && editingUser.id === user.id && (
                                <div>
                                    <TextField
                                        label="Edit Name"
                                        value={editingUser.name}
                                        onChange={(e) =>
                                            setEditingUser({ ...editingUser, name: e.target.value })
                                        }
                                    />
                                    <TextField
                                        label="Edit Email"
                                        value={editingUser.email}
                                        onChange={(e) =>
                                            setEditingUser({ ...editingUser, email: e.target.value })
                                        }
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel>Edit Role</InputLabel>
                                        <Select
                                            value={editingUser.role}
                                            onChange={(e) =>
                                                setEditingUser({ ...editingUser, role: e.target.value })
                                            }
                                        >
                                            <MenuItem value="user">User</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Edit Birth Date"
                                        type="date"
                                        value={editingUser.birth_date}
                                        onChange={(e) =>
                                            setEditingUser({ ...editingUser, birth_date: e.target.value })
                                        }
                                    />
                                    <Button onClick={() => handleEditUser(user.id)}>Save</Button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UsersList;
