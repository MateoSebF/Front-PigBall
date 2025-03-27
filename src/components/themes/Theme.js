import { createTheme } from "@mui/material/styles"
// Create a custom theme with blue and yellow colors
export const Theme = createTheme({
  palette: {
    primary: {
      main: "#1b5e20", 
      light: "#66bb6a",
      dark: "#1b5e20",
      more: "#81c784",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffc107", // yellow
      light: "#fff350",
      dark: "#c79100",
      more:"#fcf66c",
      contrastText: "#000000",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0a280a", 
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      },
    },
  },
})