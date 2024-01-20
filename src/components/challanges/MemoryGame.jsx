import { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import ProgressBar from "@ramonak/react-progress-bar";
import "../../css/MemoryChallange.css";
import { IoSunnyOutline } from "react-icons/io5";
import axios from "axios";
import { BsArrowsFullscreen } from "react-icons/bs";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import codeScreenShot from "../../assets/img/Screenshot 2024-01-20 at 22.44.39.png";
import Levenshtein from "levenshtein";
export const MemoryGame = () => {
  const [code, setCode] = useState("");

  const [isDarkMode, setisDarkMode] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [similarity, setSimilarity] = useState(0);
  const [timer, setTimer] = useState(10);
  const [showImage, setShowImage] = useState(false);
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
    calculateSimilarity(newCode);
  };

  const expectedCode = `numbers = [1, 2, 3, 4, 5]
    for num in numbers:
      print(num ** 2)`;

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const showImageHandler = () => {
    let t = 10;
    setTimer(10);
    setShowImage(true);
    var countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          setShowImage(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const calculateSimilarity = (studentCode) => {
    // Remove white spaces from both codes
    const cleanedStudentCode = studentCode.replace(/\s/g, "");
    const cleanedExpectedCode = expectedCode.replace(/\s/g, "");

    // Calculate Levenshtein distance
    const distance = new Levenshtein(cleanedStudentCode, cleanedExpectedCode);

    // Calculate similarity as a percentage
    const maxLength = Math.max(
      cleanedStudentCode.length,
      cleanedExpectedCode.length
    );
    const similarityValue = 100 * (1 - distance / maxLength);
    console.log("student code: ", code);
    console.log("expected code: ", cleanedExpectedCode);
    console.log("similarityValue: ", similarityValue);
    setSimilarity(similarityValue.toFixed(2));
  };

  const getColorFromPercentage = (percentage) => {
    // Ensure the percentage is within the range [0, 100]
    const validPercentage = Math.min(100, Math.max(0, percentage));

    // Map the percentage to a hue value between 60 (yellow) and 120 (green)
    const hue = (validPercentage / 100) * 60 + 60;

    // Set constant saturation and lightness values
    const saturation = 100;
    const lightness = 50;

    // Convert HSL to RGB
    const rgbColor = hslToRgb(hue, saturation, lightness);

    // Convert RGB to hex
    const hexColor = rgbToHex(...rgbColor);

    return hexColor;
  };

  // Function to convert HSL to RGB
  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // Achromatic
    } else {
      const hueToRgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  // Function to convert RGB to hex
  const rgbToHex = (r, g, b) => {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  return (
    <div
      className={isFullScreen ? "page-container-full-screen" : "page-container"}
    >
      {" "}
      <div className="div-progress-bar">
        <ProgressBar
          completed={100}
          customLabel=""
          className="progress-bar"
          barContainerClassName="progress-bar-container"
          labelClassName="progress-bar-label"
          bgColor={getColorFromPercentage(similarity)}
          width={`${similarity}%`}
        />
      </div>
      <div
        className={`editor-head editor-head-${isDarkMode ? "dark" : "light"}`}
      >
        <h2>Memory Game {similarity}</h2>
        <div className="btn-container">
          <button
            disabled={showImage}
            className={`btn-run btn-look btn-look-${
              isDarkMode ? "dark" : "light"
            }-mode`}
            onClick={showImageHandler}
          >
            <span>look</span>
            <FaEye />
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
      <div className="code-editor-container code-memory-game-container">
        <div>
          <MonacoEditor
            width="100%"
            height={isFullScreen ? "91vh" : "74vh"}
            language="python"
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            value={code}
            options={options}
            onChange={handleEditorChange}
          />
        </div>
        <div
          className={`output-container output-container-${
            isDarkMode ? "dark" : "light"
          } ${isFullScreen ? "output-container-full-screen" : ""}`}
        >
          <img
            className={`image image-${showImage ? "visible" : "hidden"}`}
            src={codeScreenShot}
            alt="code screenshot"
          />
        </div>
      </div>
    </div>
  );
};
