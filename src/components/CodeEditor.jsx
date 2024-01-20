import { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import "../css/CodeEditor.css";
import { FaPlay } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import axios from "axios";
import { BsArrowsFullscreen } from "react-icons/bs";
import { AiOutlineFullscreenExit } from "react-icons/ai";

export const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [isDarkMode, setisDarkMode] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

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

  const handleRunCode = async () => {
    // You can implement code execution logic here
    // For simplicity, let's just log the code and set some output
    console.log("code: ", code);
    try {
      const response = await axios.post(
        "http://localhost:5001/run-python-code",
        { code }
      );

      if (response?.data?.error) {
        setOutput(response?.data?.error);
      } else {
        setOutput(response.data.output);
        console.log(response);
      }
    } catch (error) {
      setOutput("Error running Python code:", error);
    }
  };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleEditorWillPaste = (e) => {
    // Prevent pasting
    e.preventDefault();
    return false;
  };

  return (
    <div
      className={isFullScreen ? "page-container-full-screen" : "page-container"}
    >
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

            <button
              className={`btn-mode btn-full-screen ${
                isDarkMode ? "btn-mode-dark" : "btn-mode-light"
              }`}
              onClick={handleFullScreen}
            >
              {isFullScreen && <AiOutlineFullscreenExit />}
              {!isFullScreen && <BsArrowsFullscreen />}
            </button>
          </div>
        </div>
      </div>

      <div className="code-editor-container">
        <MonacoEditor
          width="100%"
          height={isFullScreen ? "91vh" : "75vh"}
          language="python"
          theme={isDarkMode ? "vs-dark" : "vs-light"}
          value={code}
          options={options}
          onChange={handleEditorChange}
        />
        <div
          className={`output-container output-container-${
            isDarkMode ? "dark" : "light"
          } ${isFullScreen ? "output-container-full-screen" : ""}`}
        >
          <h4>Output:</h4>
          <pre className="output-text">{output}</pre>
        </div>
      </div>
    </div>
  );
};
