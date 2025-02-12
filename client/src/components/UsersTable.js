import React, { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../api/api";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField,
    Typography, Box, Menu, MenuItem, Avatar, Stack, TableSortLabel
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [sortOrder, setSortOrder] = useState("asc");
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuUserId, setMenuUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers();
                const sortedData = [...data].sort((a, b) => a.id - b.id);
                setUsers(sortedData);
            } catch (error) {
                console.error("Ошибка при загрузке пользователей:", error);
            }
        };
        fetchData();
    }, []);

    const handleSort = () => {
        const sortedUsers = [...users].sort((a, b) =>
            sortOrder === "asc" ? a.id - b.id : b.id - a.id
        );
        setUsers(sortedUsers);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleEdit = (user) => {
        setEditingId(user.id);
        setEditData({ ...user });
    };

    const handleChange = (e, field) => {
        setEditData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSave = async () => {
        try {
            await updateUser(editingId, editData);
            setUsers(users.map((user) => (user.id === editingId ? editData : user)));
            setEditingId(null);
        } catch (error) {
            console.error("Ошибка при обновлении пользователя:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении пользователя:", error);
        }
    };

    const handleCopy = (user) => {
        const userData = `${user.id}\t${user.name}\t${user.email}\t${user.role}`;
        navigator.clipboard.writeText(userData)
            .then(() => console.log(`Copied: ${userData}`))
            .catch((error) => console.error("Ошибка при копировании:", error));
    };

    const handleMenuOpen = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setMenuUserId(userId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuUserId(null);
    };

    return (
        <Paper elevation={3} sx={{ borderRadius: 3, padding: 2, boxShadow: 3 }}>
            {/* Заголовок таблицы */}
            <Box sx={{ paddingBottom: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>Users List</Typography>
                    <Typography variant="body2" color="textSecondary">
                        Manage registered users and their roles.
                    </Typography>
                </Box>
                <IconButton onClick={(event) => handleMenuOpen(event, "table")}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && menuUserId === "table"}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>Action</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Another Action</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Something Else</MenuItem>
                </Menu>
            </Box>

            <TableContainer>
                <Table sx={{ minWidth: 650, width: "100%", border: "none !important" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    color: "rgba(0,0,0,0.6)",
                                    fontSize: "0.85rem",
                                    cursor: "pointer",
                                }}
                                onClick={handleSort}
                            >
                                <TableSortLabel active direction={sortOrder}>
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            {["NAME", "EMAIL", "ROLE"].map((title) => (
                                <TableCell
                                    key={title}
                                    sx={{
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        color: "rgba(0,0,0,0.6)",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    {title}
                                </TableCell>
                            ))}
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    color: "rgba(0,0,0,0.6)",
                                    fontSize: "0.85rem",
                                    textAlign: "right",
                                }}
                            >
                                ACTIONS
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    height: 60,
                                    borderBottom: "0.5px solid rgba(a,a,a,0.01)",
                                    "&:last-child td, &:last-child th": { borderBottom: "none" },
                                }}
                            >
                                <TableCell>{user.id}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <Avatar sx={{ bgcolor: "#1c75e8", width: 30, height: 30 }}>
                                            {user.name.charAt(0).toUpperCase()}
                                        </Avatar>
                                        {editingId === user.id ? (
                                            <TextField
                                                variant="standard"
                                                value={editData.name}
                                                onChange={(e) => handleChange(e, "name")}
                                                fullWidth
                                                sx={{ input: { textAlign: "left", fontSize: "inherit", textDecoration: "underline" } }}
                                            />
                                        ) : (
                                            `ㅤ${user.name}`
                                        )}
                                    </Stack>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleCopy(user)} size="small">
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                    {editingId === user.id ? (
                                        <IconButton onClick={handleSave} size="small">
                                            <EditIcon fontSize="small" color="primary" />
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => handleEdit(user)} size="small">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                    <IconButton onClick={() => handleDelete(user.id)} size="small">
                                        <DeleteIcon fontSize="small" color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default UsersTable;
