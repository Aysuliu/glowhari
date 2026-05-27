import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    handleReload = () => {
        this.setState({ hasError: false, error: undefined });
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "60vh",
                        textAlign: "center",
                        px: 3,
                        gap: 2,
                    }}
                >
                    <Typography variant="h4" component="h1">
                        Something went wrong
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        An unexpected error occurred. Please try again.
                    </Typography>
                    <Button variant="contained" onClick={this.handleReload}>
                        Back to home
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
