// /src/api/api.js

import axios from "axios";

const API_URL = "http://localhost:5001/api";

// -----------------------------------
// --          Auth API             --
// -----------------------------------

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        const { token } = response.data;

        localStorage.setItem("token", token);

        setupAxiosInterceptors();

        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const setupAxiosInterceptors = () => {
    const token = getToken();
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

setupAxiosInterceptors();

// -----------------------------------
// --           Users API           --
// -----------------------------------

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

// ------------------------------------
// --           Orders API           --
// ------------------------------------

export const getOrders = async (page = 1, limit = 5) => {
    try {
        const response = await axios.get(`${API_URL}/orders/paginated?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/orders`, orderData);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

export const updateOrder = async (id, orderData) => {
    try {
        const response = await axios.put(`${API_URL}/orders/${id}`, orderData);
        return response.data;
    } catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
};

export const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/orders/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
};
