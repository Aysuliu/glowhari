import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#5a3e36",
            light: "#7a5a4e",
            dark: "#3d2a24",
            contrastText: "#fff",
        },
        secondary: {
            main: "#d4a088",
            light: "#e8c4a8",
            dark: "#c08870",
            contrastText: "#fff",
        },
        background: {
            default: "#faf6f3",
            paper: "#fff",
        },
        text: {
            primary: "#5a3e36",
            secondary: "#7a5a4e",
        },
        divider: "#f0e6df",
    },
    typography: {
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        h1: { fontFamily: "'Georgia', serif", fontWeight: 700, letterSpacing: "2px", color: "#5a3e36" },
        h2: { fontFamily: "'Georgia', serif", fontWeight: 600, letterSpacing: "1px", color: "#5a3e36" },
        h3: { fontFamily: "'Georgia', serif", fontWeight: 600, color: "#5a3e36" },
        h4: { fontFamily: "'Georgia', serif", fontWeight: 600, letterSpacing: "2px", color: "#5a3e36" },
        h5: { fontFamily: "'Georgia', serif", fontWeight: 600, color: "#5a3e36" },
        h6: { fontFamily: "'Georgia', serif", fontWeight: 600, color: "#5a3e36" },
        subtitle1: { color: "#7a5a4e" },
        subtitle2: { color: "#a08070", fontSize: "13px" },
        body2: { color: "#7a5a4e" },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 8,
                    padding: "10px 24px",
                },
                containedPrimary: {
                    "&:hover": { backgroundColor: "#3d2a24" },
                },
                containedSecondary: {
                    "&:hover": { backgroundColor: "#c08870" },
                },
                outlinedSecondary: {
                    borderColor: "#d4a088",
                    color: "#d4a088",
                    "&:hover": { backgroundColor: "rgba(212, 160, 136, 0.08)", borderColor: "#c08870" },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    fontWeight: 500,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0 2px 12px rgba(90, 62, 54, 0.08)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(90, 62, 54, 0.15)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 8,
                        "& fieldset": { borderColor: "#e8c4a8" },
                        "&:hover fieldset": { borderColor: "#d4a088" },
                        "&.Mui-focused fieldset": { borderColor: "#d4a088" },
                    },
                },
            },
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                    "& .MuiPaginationItem-root": {
                        color: "#5a3e36",
                        "&.Mui-selected": {
                            backgroundColor: "#d4a088",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#c08870" },
                        },
                    },
                },
            },
        },
    },
});

export default theme;
