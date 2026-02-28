import React from "react";
import { Stepper, Step, StepLabel, StepContent, Box, Typography } from "@mui/material";
import { CheckCircle, AccessTime, Cancel, Star, Bolt, Person } from "@mui/icons-material";

const statusIcons = {
    pending: <AccessTime fontSize="small" />,
    "in-progress": <Bolt fontSize="small" />,
    resolved: <CheckCircle fontSize="small" />,
    closed: <Cancel fontSize="small" />,
    rejected: <Cancel fontSize="small" />,
    assigned: <Person fontSize="small" />,
    boosted: <Star fontSize="small" />,
};

const statusColors = {
    pending: "#f59e0b", // Amber
    "in-progress": "#3b82f6", // Blue
    resolved: "#10b981", // Emerald
    closed: "#6b7280", // Gray
    rejected: "#ef4444", // Red
    assigned: "#a855f7", // Purple
    boosted: "#fa0bd2", // Your Brand Pink
};

const Timeline = ({ timeline = [] }) => {
    const sortedTimeline = Array.isArray(timeline)
        ? [...timeline].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Latest first
        : [];

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper orientation="vertical" activeStep={0} connector={null}>
                {sortedTimeline.map((item, index) => (
                    <Step key={index} active={true} expanded={true}>
                        <StepLabel
                            StepIconComponent={() => (
                                <Box sx={{
                                    bgcolor: statusColors[item.status] || "gray",
                                    color: "white",
                                    borderRadius: "12px",
                                    p: 0.8,
                                    display: "flex",
                                    boxShadow: `0 0 15px ${statusColors[item.status]}44`
                                }}>
                                    {statusIcons[item.status] || <AccessTime fontSize="small" />}
                                </Box>
                            )}
                        >
                            <Box sx={{ ml: 1 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 900,
                                        textTransform: "uppercase",
                                        color: statusColors[item.status],
                                        letterSpacing: "0.1em"
                                    }}
                                >
                                    {item.status}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ color: "text.secondary", fontWeight: 600 }}
                                >
                                    {new Date(item.createdAt).toLocaleString()}
                                </Typography>
                            </Box>
                        </StepLabel>

                        <StepContent sx={{
                            borderLeft: `2px dashed ${statusColors[item.status]}44`,
                            ml: "19px",
                            pb: 4
                        }}>
                            <Box sx={{
                                p: 3,
                                bgcolor: "rgba(128, 128, 128, 0.05)",
                                borderRadius: "1.5rem",
                                border: "1px solid rgba(128, 128, 128, 0.1)"
                            }}>
                                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                                    {item.message}
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.6, display: "block" }}>
                                    Updated by: <strong>{item.updatedBy?.role}</strong> ({item.updatedBy?.email})
                                </Typography>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default Timeline;