import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersList from "./components/UsersList";
import OrdersList from "./components/OrdersList";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/users" element={<UsersList />} />
                <Route path="/orders" element={<OrdersList />} />
            </Routes>
        </Router>
    );
}

export default App;
