import { createTheme } from "@mui/material/styles";

const PRIMARY = "#6B4A3A";      // coklat tombol
const ACCENT = "#E6D3A3";       // kuning soft (button highlight)
const BG_PAGE = "#F5F1E8";      // background utama
const BG_CARD = "#FFFFFF";      // card putih
const BORDER = "#E0D6C8";

const TEXT_PRIMARY = "#2E2A26";
const TEXT_SECONDARY = "#7A6F66";

export const earthTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: BG_PAGE,
      paper: BG_CARD,
    },
    primary: {
      main: PRIMARY,
      contrastText: "#FFF",
    },
    secondary: {
      main: ACCENT,
      contrastText: "#2E2A26",
    },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
    divider: BORDER,
  },

  typography: {
    fontFamily: "'DM Mono', monospace",
    h4: {
      fontWeight: 600,
      color: TEXT_PRIMARY,
    },
    body1: {
      fontSize: 14,
      color: TEXT_PRIMARY,
    },
    body2: {
      fontSize: 12,
      color: TEXT_SECONDARY,
    },
  },

  shape: { borderRadius: 12 },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: BG_CARD,
          border: `1px solid ${BORDER}`,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        contained: {
          background: PRIMARY,
          color: "#000",
          "&:hover": {
            background: "#5A3D2F",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: "#FAF7F2",
          "& fieldset": {
            borderColor: BORDER,
          },
          "&.Mui-focused fieldset": {
            borderColor: PRIMARY,
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: 11,
          borderRadius: 8,
        },
      },
    },
    
  },

});