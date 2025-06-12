import { useState } from "react";
import ClassicTodo from "./components/ClassicTodo";
import TanstackTodo from "./components/TanstackTodo";

function App() {
  const [activeTab, setActiveTab] = useState<"classic" | "tanstack">("classic");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Todo App Comparison</h1>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setActiveTab("classic")}>Classic</button>
        <button onClick={() => setActiveTab("tanstack")}>TanStack</button>
      </div>

      {activeTab === "classic" ? <ClassicTodo /> : <TanstackTodo />}
    </div>
  );
}

export default App;
