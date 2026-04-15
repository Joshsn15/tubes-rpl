import { createTheme } from "@mui/material/styles";

// ── Role tiap warna ────────────────────────────────────────────────────────
// Lucky Dice  #F4F1E2 → text primary (bukan background)
// The Bay     #FCE6B7 → primary CTA button, tab indicator, card top-border
// Something Blue #D8EBF9 → DRINK chip, info state
// Walking Vinnie #D7D4B1 → HEALTH chip, text secondary
// Mother Earth #513229 → derived untuk bg (digelapin jadi dark base)

const LD = "#F4F1E2"; // Lucky Dice   — teks utama
const BAY = "#FCE6B7"; // The Bay      — aksen / CTA
const SB = "#D8EBF9"; // Something Blue — info / drink
const WV = "#D7D4B1"; // Walking Vinnie — muted / health

// Dark backgrounds — derived dari Mother Earth ke bawah
const BG_PAGE    = "#2E2219"; // ← fix: was #FCE6B7 (???)
const BG_SURFACE = "#382A1E"; // ← sedikit lebih terang
const BG_RAISED  = "#3D2E20"; // ← fix
const BG_HOVER   = "#443224"; // ← fix

const BORDER     = "#4B3A2C"; // ← sedikit lebih visible
const BORDER_MID = "#5A4435";

// TEXT_DISABLED juga salah — #fff4ee terlalu terang, keliatan kayak primary
const TEXT_DISABLED = "#4A3428"; // ← fix: was #fff4ee

const TEXT_PRIMARY = LD;       // #F4F1E2 — max legibility
const TEXT_SECONDARY = "#D7C4A8"; // warm cream dimmed
const TEXT_MUTED = "#8A7060";
const TEXT_HINT = "#5A4438";

export const earthTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: BG_PAGE,
      paper: BG_SURFACE,
    },
    primary: {
      main: BAY,       // The Bay → semua CTA
      contrastText: "#2A1810",
      dark: "#F0D49A",
    },
    secondary: {
      main: WV,        // Walking Vinnie → secondary actions
      contrastText: "#2A1810",
    },
    info: {
      main: SB,        // Something Blue → info, DRINK
      contrastText: "#1A3040",
    },
    error: { main: "#B05040", contrastText: LD },
    warning: { main: BAY, contrastText: "#2A1810" },
    success: { main: WV, contrastText: "#2A1810" },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
      disabled: TEXT_DISABLED,
    },
    divider: BORDER,
    action: {
      hover: `${BAY}14`,
      selected: `${BAY}20`,
      disabled: TEXT_DISABLED,
    },
  },

  typography: {
    fontFamily: "'DM Mono', 'Fira Code', monospace",
    h1: { fontSize: "2rem", fontWeight: 600, color: TEXT_PRIMARY },
    h2: { fontSize: "1.6rem", fontWeight: 600, color: TEXT_PRIMARY },
    h3: { fontSize: "1.28rem", fontWeight: 600, color: TEXT_PRIMARY },
    h4: { fontSize: "1rem", fontWeight: 600, color: TEXT_PRIMARY },
    body1: { fontSize: "0.8125rem", color: TEXT_PRIMARY, lineHeight: 1.6 },
    body2: { fontSize: "0.75rem", color: TEXT_SECONDARY, lineHeight: 1.5 },
    caption: { fontSize: "0.6875rem", color: TEXT_HINT, letterSpacing: ".06em" },
    overline: { fontSize: "0.625rem", color: TEXT_HINT, letterSpacing: ".1em", textTransform: "uppercase" },
  },

  shape: { borderRadius: 10 },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: BG_PAGE },
        "::-webkit-scrollbar": { width: 5 },
        "::-webkit-scrollbar-track": { background: BG_PAGE },
        "::-webkit-scrollbar-thumb": { background: BORDER_MID, borderRadius: 3 },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: BG_SURFACE,
          border: `1px solid ${BORDER}`,
          borderTop: `2px solid ${BAY}`,
          boxShadow: "none",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "'DM Mono', monospace",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: ".04em",
          borderRadius: 8,
        },
        contained: {
          background: BAY,
          color: "#2A1810",
          "&:hover": { background: "#F0D49A" },
        },
        outlined: {
          borderColor: BORDER_MID,
          color: TEXT_MUTED,
          "&:hover": { borderColor: BAY, color: BAY, background: `${BAY}10` },
        },
        text: {
          color: TEXT_MUTED,
          "&:hover": { background: BG_HOVER, color: TEXT_SECONDARY },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          height: 22,
          borderRadius: 6,
          fontWeight: 600,
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: { root: { background: BG_SURFACE } },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: `${BORDER}`,
          padding: "10px 16px",
          fontSize: 12,
          color: TEXT_SECONDARY,
        },
        head: {
          color: TEXT_HINT,
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: ".1em",
          background: BG_RAISED,
          fontWeight: 500,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background .15s",
          "&:hover td": { background: BG_HOVER },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: { borderBottom: `1px solid ${BORDER}`, minHeight: 36 },
        indicator: { backgroundColor: BAY, height: 2 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 11,
          minHeight: 36,
          textTransform: "none",
          letterSpacing: ".04em",
          color: TEXT_HINT,
          fontFamily: "'DM Mono', monospace",
          padding: "0 14px",
          "&.Mui-selected": { color: LD, fontWeight: 600 },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: 12,
          background: BG_RAISED,
          "& fieldset": { borderColor: BORDER },
          "&:hover fieldset": { borderColor: BORDER_MID },
          "&.Mui-focused fieldset": { borderColor: BAY },
        },
        input: {
          color: TEXT_PRIMARY,
          "&::placeholder": { color: TEXT_DISABLED, opacity: 1 },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": { color: TEXT_DISABLED, opacity: 1 },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          background: BG_SURFACE,
          border: `1px solid ${BORDER}`,
          backgroundImage: "none",
          boxShadow: `0 24px 48px #00000050`,
        },
      },
    },

    MuiDivider: {
      styleOverrides: { root: { borderColor: BORDER } },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 12,
          color: TEXT_PRIMARY,
          "&:hover": { background: BG_HOVER },
          "&.Mui-selected": { background: `${BAY}20`, color: BAY },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: TEXT_HINT,
          "&:hover": { background: BG_HOVER, color: TEXT_SECONDARY },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: BG_RAISED,
          border: `1px solid ${BORDER}`,
          color: TEXT_SECONDARY,
          fontSize: 10,
          borderRadius: 6,
        },
      },
    },
  },
});