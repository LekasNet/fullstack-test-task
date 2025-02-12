import React, { useEffect, useState } from "react";
import { getOrders } from "../api/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Typography, Box, Card } from "@mui/material";
import dayjs from "dayjs";

function OrdersLast7DaysChart({ height }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await getOrders(1, 100);

                const last7Days = [];
                for (let i = 6; i >= 0; i--) {
                    last7Days.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
                }

                const dailyOrders = orders.data.reduce((acc, order) => {
                    const orderDate = dayjs(order.created_at).format("YYYY-MM-DD");
                    if (last7Days.includes(orderDate)) {
                        acc[orderDate] = (acc[orderDate] || 0) + 1;
                    }
                    return acc;
                }, {});

                const formattedData = last7Days.map((date) => ({
                    day: dayjs(date).format("dd")[0],
                    orders: dailyOrders[date] || 0,
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
                backgroundColor: "#2196f3",
                position: "relative",
                zIndex: 2,
                padding: 2,
                height: height,
            }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ left: -40, right: 10, top: 5 }}>
                        <CartesianGrid stroke="rgba(255,255,255,0.3)" strokeDasharray="0" />
                        <XAxis
                            dataKey="day"
                            stroke="transparent"
                            tick={{ fill: "white", fontSize: "0.875rem", opacity: 0.8 }}
                        />
                        <YAxis stroke="transparent" tick={{ fill: "white", fontSize: "0.875rem" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#333", color: "white" }} itemStyle={{ color: "white" }} />
                        <Bar dataKey="orders" fill="white" radius={[10, 10, 10, 10]} barSize={12} />
                    </BarChart>
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
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>Daily orders</Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 300, fontSize: "0.875rem" }}>
                        Statistics of orders placed in the last week.
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

export default OrdersLast7DaysChart;
