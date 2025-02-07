import React, { useState, useEffect } from "react";
import { getOrders, createOrder, updateOrder, deleteOrder } from "../api/api";
import { Button, TextField } from "@mui/material";

function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newOrder, setNewOrder] = useState({ amount: "", status: "pending", delivery_date: "" });
    const [editingOrder, setEditingOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleAddOrder = async () => {
        try {
            await createOrder(newOrder);
            setOrders((prevOrders) => [...prevOrders, newOrder]);
            setNewOrder({ amount: "", status: "pending", delivery_date: "" });  // reset form
        } catch (error) {
            console.error("Error adding order:", error);
        }
    };

    const handleEditOrder = async (id) => {
        try {
            await updateOrder(id, editingOrder);
            setOrders((prevOrders) =>
                prevOrders.map((order) => (order.id === id ? editingOrder : order))
            );
            setEditingOrder(null);  // reset editing form
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            await deleteOrder(id);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    return (
        <div>
            <h2>Orders</h2>
            <div>
                <TextField
                    label="Amount"
                    value={newOrder.amount}
                    onChange={(e) => setNewOrder({ ...newOrder, amount: e.target.value })}
                />
                <TextField
                    label="Status"
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                />
                <TextField
                    label="Delivery Date"
                    type="date"
                    value={newOrder.delivery_date}
                    onChange={(e) => setNewOrder({ ...newOrder, delivery_date: e.target.value })}
                />
                <Button onClick={handleAddOrder}>Add Order</Button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            Amount: {order.amount} - Status: {order.status} - Delivery Date: {order.delivery_date}
                            <Button onClick={() => setEditingOrder(order)}>Edit</Button>
                            <Button onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
                            {editingOrder && editingOrder.id === order.id && (
                                <div>
                                    <TextField
                                        label="Edit Amount"
                                        value={editingOrder.amount}
                                        onChange={(e) =>
                                            setEditingOrder({
                                                ...editingOrder,
                                                amount: e.target.value,
                                            })
                                        }
                                    />
                                    <TextField
                                        label="Edit Status"
                                        value={editingOrder.status}
                                        onChange={(e) =>
                                            setEditingOrder({
                                                ...editingOrder,
                                                status: e.target.value,
                                            })
                                        }
                                    />
                                    <TextField
                                        label="Edit Delivery Date"
                                        type="date"
                                        value={editingOrder.delivery_date}
                                        onChange={(e) =>
                                            setEditingOrder({
                                                ...editingOrder,
                                                delivery_date: e.target.value,
                                            })
                                        }
                                    />
                                    <Button onClick={() => handleEditOrder(order.id)}>Save</Button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default OrdersList;
