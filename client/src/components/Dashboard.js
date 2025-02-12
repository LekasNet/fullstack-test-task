import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import useWindowSize from "../hooks/useWindowSize";
import OrdersChart from "../components/OrdersChart";
import OrdersLast7DaysChart from "../components/OrdersLast7DaysChart";
import UsersRegistrationChart from "../components/UsersRegistrationChart";
import Sidebar from "../components/Sidebar";
import UsersTable from "./UsersTable";
import TopBar from "./TopBar";
import OrdersList from "./OrdersList";

function Dashboard() {
    const { width } = useWindowSize();
    const [selectedTab, setSelectedTab] = useState("dashboard");

    const sidebarWidth = 40;
    let containerWidth = Math.min( Math.max((width - sidebarWidth) * 0.9, 800), 1200);
    let chartHeight = containerWidth / 7;

    return (
        <Box sx={{ display: "flex" }}>

            <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />


            <Box sx={{ padding: 3, width: `calc(100% - ${sidebarWidth}px)`, marginLeft: `${sidebarWidth + 20}px`, marginRight: `${sidebarWidth}px` }}>
                <TopBar />
                <Grid container spacing={10} justifyContent="center" marginBottom={0}>
                    <Grid item xs={12}>
                        <Grid container spacing={7} justifyContent="center">
                            <Grid item xs={12} md={4}>
                                <UsersRegistrationChart height={chartHeight} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <OrdersLast7DaysChart height={chartHeight} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <OrdersChart height={chartHeight} />
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid
                        item
                        xs={12}
                        sx={{
                            paddingTop: "40px !important",
                            position: "relative",
                            left: `-15px`,
                        }}
                    >
                        <Box sx={{ width: "calc(100% + 30px)" }}>
                            <UsersTable />
                        </Box>
                    </Grid>


                    <Grid
                        item
                        xs={12}
                        sx={{
                            paddingTop: "40px !important",
                            position: "relative",
                            left: `-15px`,
                        }}
                    >
                        <Box sx={{ width: "calc(100% + 30px)" }}>
                            <OrdersList />
                        </Box>
                    </Grid>


                </Grid>
            </Box>
        </Box>
    );
}

export default Dashboard;
