"use client";
import { useState } from "react";

export default function Labyrinth() {
  const [selectedNode, setSelectedNode] = useState({ start: "", end: "" });
  const [walls, setWalls] = useState(new Set<string>());
  const [selectedType, setSelectedType] = useState("start");
  const [algorithm, setAlgorithm] = useState("bfs");
  const [launched, setLaunched] = useState(false);

  const gridRows = 20;
  const gridCols = 40;

  const handleNodeClick = (row: number, col: number) => {
    document.querySelectorAll(".bg-blue-400, .bg-yellow-500, .animate-pulse")
      .forEach(node => {
        node.classList.remove("bg-blue-400", "bg-yellow-500", "animate-pulse");
      });

    const nodeKey = `${row}-${col}`;
    const nodeElement = document.getElementById(nodeKey);

    if (!nodeElement) return;
    nodeElement.classList.remove("bg-yellow-500");

    if (selectedType === "start") {
      if (selectedNode.start) {
        document.getElementById(selectedNode.start)?.classList.remove("bg-green-500");
      }
      setSelectedNode({ ...selectedNode, start: nodeKey });
      nodeElement.classList.add("bg-green-500");
      console.log(nodeElement.classList);
    } else if (selectedType === "end") {
      if (selectedNode.end) {
        document.getElementById(selectedNode.end)?.classList.remove("bg-red-500");
      }
      setSelectedNode({ ...selectedNode, end: nodeKey });
      nodeElement.classList.add("bg-red-500");
    } else if (selectedType === "wall") {
      if (selectedNode.start === nodeKey || selectedNode.end === nodeKey) {
        alert("The START and END nodes can't be WALLs!");
        return;
      }
      if (walls.has(nodeKey)) {
        walls.delete(nodeKey);
        nodeElement.classList.remove("bg-black");
      } else {
        walls.add(nodeKey);
        nodeElement.classList.add("bg-black");
      }
      setWalls(new Set(walls));
    }
  };


  const createGridData = () => {
    const grid = Array.from({ length: gridRows }, () => Array(gridCols).fill(0));

    if (selectedNode.start) {
      const [startRow, startCol] = selectedNode.start.split("-").map(Number);
      grid[startRow][startCol] = 1;
    }

    if (selectedNode.end) {
      const [endRow, endCol] = selectedNode.end.split("-").map(Number);
      grid[endRow][endCol] = 2;
    }

    walls.forEach((w) => {
      const [row, col] = w.split("-").map(Number);
      grid[row][col] = -1;
    });

    return grid;
  };


  const launchAlgorithm = async () => {
    if (!selectedNode.start || !selectedNode.end) {
      alert("Please select both a start and an end node!");
      return;
    }

    setLaunched(true);

    document.querySelectorAll(".bg-blue-400, .bg-yellow-500, .animate-pulse")
      .forEach(node => {
        node.classList.remove("bg-blue-400", "bg-yellow-500", "animate-pulse");
      });

    const requestData = {
      algorithm,
      grid: createGridData(),
    };

    try {
      console.log("Sending request:", JSON.stringify(requestData));

      const response = await fetch("https://labyrinthe-d0ln.onrender.com/cors", {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Solution Path:", result.path);

      // Highlight the path in the grid
      // Animate path appearance
      result.explored.forEach((node: string, index: number) => {
        setTimeout(() => {
          const node_key: string = node[0] + "-" + node[1];
          const nodeElement = document.getElementById(node_key);
          if (nodeElement && node_key !== selectedNode.start && node_key !== selectedNode.end) {
            nodeElement.classList.add("bg-blue-400", "transition-all", "duration-300", "ease-in-out");
          }
        }, index * 10);

      });

      result.path.forEach((node: string) => {
        setTimeout(() => {
          setLaunched(false);
          const node_key: string = node[0] + "-" + node[1];
          const nodeElement = document.getElementById(node_key);
          if (nodeElement && node_key !== selectedNode.start && node_key !== selectedNode.end) {
            nodeElement.classList.remove("bg-blue-400");
            nodeElement.classList.add("bg-yellow-500", "animate-pulse");
          }
        }, result.explored.length * 10);
      });

    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while solving the labyrinth.");
    }
  };


  const clearGrid = () => {
    setSelectedNode({ start: "", end: "" });
    setWalls(new Set());

    document.querySelectorAll(".bg-green-500, .bg-red-500, .bg-black, .bg-blue-400, .bg-yellow-500, .animate-pulse")
      .forEach(node => {
        node.classList.remove("bg-green-500", "bg-red-500", "bg-black", "bg-blue-400", "bg-yellow-500", "animate-pulse");
      });
  };

  const goToInfosPage = () => {
    window.location.href = "/infos";
  };

  return (
    <div className="container">
      <div className="flex">
        <header className="header">
          <h1>Labyrinth</h1>
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-white"></span><b>Empty Node</b>
            <span className="inline-block w-2 h-2 bg-red-600 ml-2"></span><b>End Node</b>
            <span className="inline-block w-2 h-2 bg-green-600 ml-2"></span><b>Start Node</b>
            <span className="inline-block w-2 h-2 bg-zinc-950 ml-2"></span><b>Wall Node</b>
            <span className="inline-block w-2 h-2 bg-blue-600 ml-2"></span><b>Visited Node</b>
            <span className="inline-block w-2 h-2 bg-yellow-400 ml-2"></span><b>Path Node</b>
            <select id="algorithm"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="bfs">BFS</option>
              <option value="dijkstra">Dijkstra</option>
            </select>
            <select id="nodeType" onChange={(e) => setSelectedType(e.target.value)}>
              <option value="start">Start Node</option>
              <option value="end">End Node</option>
              <option value="wall">Wall Node</option>
            </select>
            <button
              className={`p-2 text-white rounded-lg`}
              onClick={launchAlgorithm}
            >
              {launched ? "Processing.." : "Launch"}
            </button>

          </div>
        </header>
        <button
          className={`p-2 m-2 text-white font-extrabold rounded-lg bg-cyan-950 hover:bg-red-400`}
          onClick={clearGrid}
        >
          Clear
        </button>
        <button
          className={`p-2 m-2 text-white font-extrabold rounded-lg bg-cyan-950 hover:bg-blue-600`}
          onClick={goToInfosPage}
        >
          Infos
        </button>
      </div>
      <div className="mt-1 w-full max-w-6xl p-4 bg-white shadow-md rounded-lg">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          }}
        >
          {Array.from({ length: gridRows }).map((_, row) =>
            Array.from({ length: gridCols }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                id={`${row}-${col}`}
                className="h-6 w-6 border border-gray-300 cursor-pointer"
                onClick={() => handleNodeClick(row, col)}
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
