import React from "react";
import { useState } from "react";
import Home from "./pages/home/Home";
const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Home></Home>
    </div>
  );
};

export default App;
