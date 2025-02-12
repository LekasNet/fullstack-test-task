import React, { useState, useEffect } from "react";
import { Box, InputBase, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";

function TopBar() {
    const [scrolled, setScrolled] = useState(false);
    const [searchActive, setSearchActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Box
            sx={{
                position: "sticky",
                top: 10,
                left: 260,
                marginBottom: "20px",
                right: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderRadius: "12px",
                transition: "0.3s",
                minHeight: "72px", // Увеличена высота
                background: scrolled ? "rgba(255, 255, 255, 0.7)" : "none",
                backdropFilter: "blur(10px)",
                boxShadow: scrolled ? "0px 8px 24px rgba(0, 0, 0, 0.1)" : "none",
                zIndex: 1000,
            }}
        >

            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <HomeIcon sx={{ color: "rgba(0, 0, 0, 0.6)" }} />
                    <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>/ Dashboard</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>Dashboard</Typography>
            </Box>


            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}> {/* Уменьшенный gap */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        transition: "0.3s",
                        ...(searchActive
                            ? {
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(6px)",
                            }
                            : {}),
                    }}
                    onFocus={() => setSearchActive(true)}
                    onBlur={() => setSearchActive(false)}
                >
                    <SearchIcon sx={{ color: "rgba(0, 0, 0, 0.6)" }} />
                    <InputBase placeholder="Search here" sx={{ marginLeft: 1, fontSize: "14px" }} />
                </Box>
                <IconButton size="small">
                    <AccountCircleIcon sx={{ color: "rgba(0, 0, 0, 0.6)" }} />
                </IconButton>
                <IconButton size="small">
                    <SettingsIcon sx={{ color: "rgba(0, 0, 0, 0.6)" }} />
                </IconButton>
                <IconButton size="small">
                    <NotificationsIcon sx={{ color: "rgba(0, 0, 0, 0.6)" }} />
                </IconButton>
            </Box>
        </Box>
    );
}

export default TopBar;
