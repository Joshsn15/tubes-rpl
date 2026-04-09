import { createTheme } from "@mui/material/styles";

export const earthTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#1C1410",   // arang coklat — page bg
            paper: "#231A14",   // sedikit lebih terang — cards, nav, table
        },
        primary: { main: "#C17F4A", contrastText: "#1C1410" }, // burnt sienna — CTA, accent
        secondary: { main: "#8A7060", contrastText: "#1C1410" }, // warm taupe
        error: { main: "#8B4A3A" },                           // brick merah tua
        warning: { main: "#A8A86A", contrastText: "#1C1410" }, // sage olive
        info: { main: "#6A9A9A", contrastText: "#1C1410" }, // warm slate 
        success: { main: "#C17F4A" },
        text: {
            primary: "#E8D5BB",  // krim — teks utama
            secondary: "#8A7060",  // taupe — teks sekunder
            disabled: "#4A3828",  // sangat redup
        },
        divider: "#3A2D24",
    },
    typography: {
        fontFamily: "'DM Mono', 'Fira Code', monospace",
    },
    shape: { borderRadius: 10 },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    background: "#231A14",
                    border: "1px solid #3A2D24",
                    boxShadow: "none",
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: "#2A1E17",
                    padding: "10px 16px",
                    color: "#E8D5BB",
                },
                head: {
                    color: "#fff",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    background: "#231A14",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "#C17F4A",
                    color: "#1C1410",
                    fontWeight: 700,
                    "&:hover": { backgroundColor: "#A86A35" },
                },
                outlined: {
                    
                outlinedPrimary: {
                    borderColor: "#3A2D24",
                    color: "#8A7060",
                    "&:hover": { borderColor: "#4A3828", background: "#2A1E17" },
                },
                }
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    height: 20,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& fieldset": { borderColor: "#3A2D24" },
                    "&:hover fieldset": { borderColor: "#4A3828" },
                    "&.Mui-focused fieldset": { borderColor: "#C17F4A" },
                },
                input: { color: "#E8D5BB", fontSize: 12 },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: { backgroundColor: "#C17F4A", height: 1.5 },
                root: { borderBottom: "1px solid #3A2D24" },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: "#E8D5BB",
                    fontSize: 11,
                    textTransform: "none",
                    letterSpacing: ".04em",
                    "&.Mui-selected": { color: "#E8D5BB" },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    background: "#231A14",
                    border: "1px solid #3A2D24",
                    backgroundImage: "none",
                },
            },
        },
        MuiDivider: {
            styleOverrides: { root: { borderColor: "#3A2D24" } },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    "&::placeholder": { color: "#4A3828" },
                },
            },
        },
    },
});