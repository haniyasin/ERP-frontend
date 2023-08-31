import Header from "./common/Header";
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Box } from "@mui/material";

function App() {
  return (
    <Box style={{ marginTop: 100 }}>
      <Header />
      <AppRoutes />
    </Box>
  );
}

export default App;
