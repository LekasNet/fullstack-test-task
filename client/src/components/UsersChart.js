import React, { useEffect, useState } from "react";
import { getUsers } from "../api/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Typography, Box, Card, CardContent } from "@mui/material";
import dayjs from "dayjs";

function UsersChart({ height }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await getUsers();

                // Группируем пользователей по ролям
                const roleCounts = users.reduce((acc, user) => {
                    acc[user.role] = (acc[user.role] || 0) + 1;
                    return acc;
                }, {});

                // Преобразуем данные для графика
                const formattedData = Object.keys(roleCounts).map((role) => ({
                    role,
                    count: roleCounts[role],
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Чарт */}
            <Card elevation={3} sx={{
                width: "90%",
                borderRadius: 3,
                backgroundColor: "#9c27b0",
                position: "relative",
                zIndex: 2,
                padding: 2,
                height: height,
            }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />
                        <XAxis dataKey="role" stroke="white" tick={{ fill: "white" }} />
                        <YAxis stroke="white" tick={{ fill: "white" }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#333", color: "white" }}
                            itemStyle={{ color: "white" }}
                        />
                        <Bar
                            dataKey="count"
                            fill="white"
                            radius={[10, 10, 0, 0]}
                            barSize={20}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            <Card elevation={3} sx={{
                width: "100%",
                borderRadius: 3,
                marginTop: "-140px",
                padding: 2,
                zIndex: 1,
                height: height + 50,
                display: "flex",
                flexDirection: "column",
            }}>
                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    pb: 1
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Users by Role</Typography>
                    <Typography variant="body2" color="textSecondary">Updated just now</Typography>
                </Box>
            </Card>
        </Box>
    );
}

export default UsersChart;
