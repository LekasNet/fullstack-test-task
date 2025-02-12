import React, { useEffect, useState } from "react";
import { getOrders } from "../api/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Typography, Box, Card } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function OrdersChart({ height }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await getOrders(1, 100);
                const statusCounts = orders.data.reduce((acc, order) => {
                    acc[order.status] = (acc[order.status] || 0) + 1;
                    return acc;
                }, {});

                const formattedData = Object.keys(statusCounts).map((status, index) => ({
                    name: status.charAt(0).toUpperCase() + status.slice(1),
                    value: statusCounts[status],
                    color: COLORS[index % COLORS.length]
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Card elevation={3} sx={{
                width: "90%",
                borderRadius: 3,
                backgroundColor: "#4CAF50",
                position: "relative",
                zIndex: 2,
                padding: 2,
                height: height,
            }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} fill="#8884d8" dataKey="value">
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "#333", color: "white" }} itemStyle={{ color: "white" }} />
                    </PieChart>
                </ResponsiveContainer>
            </Card>

            <Card elevation={3} sx={{
                width: "100%",
                borderRadius: 3,
                marginTop: `-${height}px`,
                padding: 2,
                zIndex: 1,
                height: height + 100,
                display: "flex",
                flexDirection: "column",
            }}>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingX: 2,
                    pb: 1
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>Orders by Status</Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 300, fontSize: "0.875rem" }}>
                        Distribution of orders based on their status.
                    </Typography>
                    <Box sx={{
                        width: "80%",
                        height: "0.7px",
                        background: "linear-gradient(to right, rgba(255, 255, 255, 1), #ddd, rgba(255, 255, 255, 1))",
                        marginY: 1,
                        marginX: "auto"
                    }} />
                    <Typography variant="body2" color="textSecondary">Updated just now</Typography>
                </Box>
            </Card>
        </Box>
    );
}

export default OrdersChart;
