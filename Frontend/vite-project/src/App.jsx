import React from "react";
import { useState } from "react";
import Home from "./pages/home/Home";
import { BrowserRouter } from "react-router-dom";
import Approutes from "./routes/Approutes";
const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Approutes />
    </div>
  );
};

export default App;
