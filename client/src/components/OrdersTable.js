import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getOrders, deleteOrder } from "../api/api";
import { Button } from "@mui/material";
import { ClientSideRowModelModule } from "ag-grid-community";

function OrdersTable() {
    const [rowData, setRowData] = useState([]);

    const columnDefs = [
        { headerName: "ID", field: "id" },
        { headerName: "Amount", field: "amount" },
        { headerName: "Status", field: "status" },
        { headerName: "Delivery Date", field: "delivery_date" },
        {
            headerName: "Actions",
            field: "id",
            cellRenderer: (params) => (
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(params.value)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    useEffect(() => {
        getOrders(1, 10).then((data) => setRowData(data.data)).catch(console.error);
    }, []);

    const handleDelete = async (id) => {
        await deleteOrder(id);
        setRowData(rowData.filter((order) => order.id !== id));
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                pagination={true}
                paginationPageSize={5}
                modules={[ClientSideRowModelModule]}
            />
        </div>
    );
}

export default OrdersTable;
