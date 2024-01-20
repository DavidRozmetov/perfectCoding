import { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import "../css/CodeEditor.css";
import { FaPlay } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
export const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [isDarkMode, setisDarkMode] = useState(true);

  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: 24,
  };

  const changeMode = () => {
    setisDarkMode(!isDarkMode);
  };
  const handleEditorChange = (newCode, e) => {
    setCode(newCode);
  };

  const handleRunCode = () => {
    // You can implement code execution logic here
    // For simplicity, let's just log the code and set some output
    console.log("Running code:", code);
    setOutput("Output will be displayed here.");
  };

  return (
    <div>
      <div
        className={`editor-head editor-head-${isDarkMode ? "dark" : "light"}`}
      >
        <h2>Code Editor</h2>
        <div className="btn-container">
          <button
            onClick={handleRunCode}
            disabled={running}
            className="btn-run"
          >
            <span>Run</span>
            <FaPlay />
          </button>
        </div>
        <div className="btn-container">
          <div className="btn-container">
            <button
              className={`btn-mode ${
                isDarkMode ? "btn-mode-dark" : "btn-mode-light"
              }`}
              onClick={changeMode}
            >
              <IoSunnyOutline />
            </button>
          </div>
        </div>
      </div>

      <div className="code-editor-container">
        <MonacoEditor
          width="100%"
          height="75vh"
          language="python"
          theme={isDarkMode ? "vs-dark" : "vs-light"}
          value={code}
          options={options}
          onChange={handleEditorChange}
        />
        <div
          className={`output-container output-container-${
            isDarkMode ? "dark" : "light"
          }`}
        >
          <h4>Output:</h4>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};
