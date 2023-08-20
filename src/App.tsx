import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Form from "./Form";
import Component1 from "./Component1";

const theme = createTheme();

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route  path="/" Component={Form}/>
          <Route path="/component1" Component={Component1}/>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
