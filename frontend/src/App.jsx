import React from "react";
import Header from "./components/header/Header";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100vw"}}>
      <Header />
      <main style={{ padding: "20px" }}>
        <h2>Welcome to Wholesaler Portal</h2>
      </main>
    </div>
  );
}

export default App;

