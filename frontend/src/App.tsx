import { useState } from "react";
import ClassicTodo from "./components/ClassicTodo";
import TanstackTodo from "./components/TanstackTodo";

function App() {
  const [activeTab, setActiveTab] = useState<"classic" | "tanstack">("classic");

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Todo App Comparison
        </h1>
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "classic" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("classic")}
          >
            Classic
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "tanstack"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("tanstack")}
          >
            TanStack
          </button>
        </div>
        <div className="flex justify-center w-[600px]">
          {activeTab === "classic" ? <ClassicTodo /> : <TanstackTodo />}
        </div>
      </div>
    </div>
  );
}

export default App;
