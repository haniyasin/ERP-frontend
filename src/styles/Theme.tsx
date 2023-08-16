import { colors, createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
      primary: {
        main: colors.teal[400],
      },
      secondary: {
        main: colors.orange[500],
      },
      error: {
        main: colors.red[500],
      }
    } 
});
