import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const menuItems = [
    { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { text: "Orders", path: "/orders", icon: <TableChartIcon /> },
    { text: "Users", path: "/users", icon: <TableChartIcon /> },
];

function Sidebar({ selectedTab, setSelectedTab }) {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 220,
                    background: "linear-gradient(to bottom, #404048, #1b1b1c)",
                    color: "white",
                    borderRadius: "12px",
                    margin: "15px",
                    height: "calc(100vh - 60px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "16px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)", // Легкая тень
                },
            }}
        >
            <Box>
                {/* Название сайта */}
                <Typography
                    variant="h6"
                    align="center"
                    sx={{
                        fontWeight: "bold",
                        padding: "10px 0",
                        width: "100%",
                        marginX: "auto"
                    }}
                >
                    Simple Dashboards
                </Typography>


                <Box sx={{
                    width: "120%",
                    height: "0.7px",
                    background: "linear-gradient(to right, rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.0))",
                    marginY: 1,
                    marginLeft: "-20px"
                }} />


                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            selected={selectedTab === item.text.toLowerCase()}
                            onClick={() => setSelectedTab(item.text.toLowerCase())}
                            sx={{
                                borderRadius: "5px",
                                transition: "0.3s",
                                height: "45px", // Чуть увеличил высоту активного пункта меню
                                boxShadow: selectedTab === item.text.toLowerCase() ? "0px 4px 8px rgba(28, 117, 232, 0.3)" : "none",
                                ...(selectedTab === item.text.toLowerCase()
                                    ? {
                                        background: "linear-gradient(to top right, #1c75e8, #48a2f1)",
                                        color: "white",
                                    }
                                    : {
                                        "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.1)",
                                        },
                                    }),
                            }}
                        >
                            <ListItemIcon sx={{ color: "white", minWidth: "36px"  }}>{item.icon}</ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                slotProps={{ primary: {fontSize: "0.875rem", fontWeight: 300} }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>


            <Box sx={{ paddingBottom: "15px", display: "flex", justifyContent: "center", marginX: "10px" }}>
                <Button
                    fullWidth
                    variant="contained"
                    disableElevation
                    sx={{
                        background: "linear-gradient(to top right, #e63946, #ff6b6b)",
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        borderRadius: "5px",
                        padding: "10px 0", // Чуть уменьшил высоту кнопки
                        boxShadow: "0px 4px 8px rgba(230, 57, 70, 0.3)",
                        "&:hover": {
                            background: "linear-gradient(to top right, #ff5555, #ff0000)",
                        },
                    }}
                    startIcon={<ExitToAppIcon />}
                >
                    Logout
                </Button>
            </Box>
        </Drawer>
    );
}

export default Sidebar;
