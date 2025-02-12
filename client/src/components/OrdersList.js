import React, { useState, useRef, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { InfiniteRowModelModule } from "ag-grid-community";
import { Box, Paper, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getOrders } from "../api/api";
import { provideGlobalGridOptions } from "ag-grid-community";

provideGlobalGridOptions({ theme: "legacy" });

function OrdersList() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOrderId, setMenuOrderId] = useState(null);
    const gridRef = useRef(null);
    const PAGE_SIZE = 20;

    const handleMenuOpen = (event, orderId) => {
        setAnchorEl(event.currentTarget);
        setMenuOrderId(orderId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuOrderId(null);
    };

    const onGridReady = useCallback((params) => {
        gridRef.current = params.api;

        const dataSource = {
            rowCount: null,
            getRows: async (params) => {
                const { startRow, endRow } = params;
                const page = Math.floor(startRow / PAGE_SIZE) + 1;

                try {
                    const response = await getOrders(page, PAGE_SIZE);
                    const { data, total } = response;

                    console.log("startRow:", startRow, "endRow:", endRow, "data.length:", data.length, "total:", total);

                    // Определяем `lastRow`
                    let lastRow = null;
                    if (startRow + data.length >= total) {
                        lastRow = total;
                    }

                    params.successCallback(data, lastRow);
                } catch (error) {
                    console.error("Ошибка при загрузке заказов:", error);
                    params.failCallback();
                }
            }
        };

        params.api.setGridOption("datasource", dataSource);
        params.api.sizeColumnsToFit();
    }, []);

    return (
        <Paper elevation={3} sx={{ borderRadius: 3, padding: 2, boxShadow: 3, height: 500 }}>
            {/* Заголовок таблицы */}
            <Box sx={{ paddingBottom: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>Orders List</Typography>
                    <Typography variant="body2" color="textSecondary">
                        Manage and track customer orders.
                    </Typography>
                </Box>
                <IconButton onClick={(event) => handleMenuOpen(event, "table")}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && menuOrderId === "table"}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>Action</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Another Action</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Something Else</MenuItem>
                </Menu>
            </Box>

            {/* Таблица заказов */}
            <Box sx={{ height: "100%", width: "100%" }} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    columnDefs={[
                        { headerName: "ID", field: "id", sortable: true, filter: true, width: 80 },
                        { headerName: "Amount", field: "amount", sortable: true, filter: true, width: 100 },
                        { headerName: "Created At", field: "created_at", sortable: true, filter: true, width: 150 },
                        { headerName: "Delivery Date", field: "delivery_date", sortable: true, filter: true, width: 150 },
                        { headerName: "Status", field: "status", sortable: true, filter: true, width: 100 },
                        { headerName: "User", field: "user_name", sortable: true, filter: true, width: 120 },
                        { headerName: "User Email", field: "user_email", sortable: true, filter: true, width: 200 },
                        { headerName: "Delivery Company", field: "delivery_company_name", sortable: true, filter: true, width: 200 },
                    ]}
                    defaultColDef={{
                        flex: 1,
                        minWidth: 100,
                        resizable: true,
                        sortable: true,
                    }}
                    rowModelType="infinite"
                    cacheBlockSize={PAGE_SIZE}
                    paginationPageSize={PAGE_SIZE}
                    pagination={true}
                    modules={[InfiniteRowModelModule]}
                    onGridReady={onGridReady}
                />
            </Box>
        </Paper>
    );
}

export default OrdersList;
