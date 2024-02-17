import { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import ProgressBar from "@ramonak/react-progress-bar";
import "../../css/MemoryChallange.css";
import { IoSunnyOutline } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";
import { BsArrowsFullscreen } from "react-icons/bs";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

import { MdNavigateNext } from "react-icons/md";
import Levenshtein from "levenshtein";

import { challangeCodes } from "./data/common_data";
import { onAuthStateChanged } from "firebase/auth";
import { FbAdd, readData, updateData } from "../../firebase/FireStore";
import { ToastContainer, toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

export const MemoryGame = () => {
  const [code, setCode] = useState("");

  const [isDarkMode, setisDarkMode] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [similarity, setSimilarity] = useState(0);
  const [timer, setTimer] = useState(10);
  const [showImage, setShowImage] = useState(false);

  // const [questionIndex, setQuestionIndex] = useState(3);
  // const questionIndex = useParams()

  const p = useParams();
  // const [peeks, setPeeks] = useState(0);
  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: 24,
  };

  const changeMode = () => {
    setisDarkMode(!isDarkMode);
  };

  const calculateSimilarity = async () => {
    const cleanedStudentCode = code.replace(/\s/g, "");

    const cleanedExpectedCode = (
      challangeCodes[questionIndex].expectedCode + ""
    ).replace(/\s/g, "");

    // Calculate Levenshtein distance
    const distance = new Levenshtein(cleanedStudentCode, cleanedExpectedCode);

    // Calculate similarity as a percentage
    const maxLength = Math.max(
      cleanedStudentCode.length,
      cleanedExpectedCode.length
    );
    const similarityValue = 100 * (1 - distance / maxLength);

    setSimilarity(similarityValue.toFixed(2));

    if (similarityValue > 95) {
      let history = localStorage.getItem("history") || "";

      let currentScore = localStorage.getItem("score")
        ? localStorage.getItem("score")
        : 0;

      // readData("MemoryGame", uid).then((res) => {
      //   // if (res.status !== "400" && res?.message?.progress) {
      //   //   currentProgress = res?.message?.progress;
      //   // }
      //   // if (res.status !== "400" && res?.message?.progress) {
      //   //   currentScore = res?.message?.score;
      //   // }
      //   console.log(res);
      // });

      let newScore = 0;
      const peeks = parseInt(localStorage.getItem("peeks"));
      if (peeks === 0) {
        newScore = 50;
      } else if (peeks === 1) {
        newScore = 25;
      } else if (peeks === 2) {
        newScore = 15;
      } else if (peeks === 3) {
        newScore = 10;
      } else if (peeks === 4) {
        newScore = 5;
      } else if (peeks === 5) {
        newScore = 3;
      } else if (peeks === 6) {
        newScore = 2;
      } else {
        newScore = 1;
      }

      if (!history.split(",").includes(questionIndex + "")) {
        localStorage.setItem("score", parseInt(currentScore) + newScore);
        toast.success(
          `Congratulations! You have won ${newScore} points! (${peeks} peeks)`
        );
        history = history + questionIndex + ",";
        console.log(history.split(",").includes(questionIndex + ""));
        localStorage.setItem("history", history);
      } else {
        toast.warn(`Point Already earned from this question!`);
      }
    }
  };

  const questionIndex = p.questionIndex;
  const handleEditorChange = (newCode) => {
    setCode(newCode);
  };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const showImageHandler = () => {
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

  useEffect(() => {
    localStorage.setItem("peeks", 0);
    showImageHandler();
  }, []);

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

  const handleNextQuestion = () => {
    // setQuestionIndex((prevQuestionIndex) => {
    //   const newIndex = prevQuestionIndex;
    //   return newIndex;
    // });

    setCode("");
    setSimilarity(0.0);
    showImageHandler();
  };

  // const [user, setUser] = useState();
  // const [uid, setUid] = useState();

  // onAuthStateChanged(authentication, (u) => {
  //   if (u) {
  //     setUid(u.uid);
  //     setUser(u);
  //   } else {
  //   }
  // });

  return (
    <div
      className={isFullScreen ? "page-container-full-screen" : "page-container"}
    >
      {" "}
      <ToastContainer></ToastContainer>
      <div className="div-progress-bar">
        <ProgressBar
          completed={!isNaN(similarity) ? similarity : 0}
          maxCompleted={100}
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
        <h2>
          {challangeCodes[questionIndex].id}. Memory Game {similarity}
        </h2>
        <div className="btn-container">
          <button
            className={`btn-run btn-check btn-check-${
              isDarkMode ? "dark" : "light"
            }-mode`}
            onClick={calculateSimilarity}
          >
            <span>Check</span>
            <CiCircleCheck />
          </button>
          {similarity < 100 && !showImage && (
            <button
              className={`btn-run btn-look btn-look-${
                isDarkMode ? "dark" : "light"
              }-mode`}
              onClick={() => {
                const i = parseInt(localStorage.getItem("peeks")) + 1;
                localStorage.setItem("peeks", i);
                showImageHandler();
              }}
            >
              <span>{`look (${5 - localStorage.getItem("peeks")})`}</span>
              <FaEye />
            </button>
          )}

          {similarity > 95 && !showImage && (
            <Link
              to={`/challanges/memory-game/${parseInt(questionIndex) + 1}`}
              className={`btn-run btn-look btn-look-${
                isDarkMode ? "dark" : "light"
              }-mode`}
              onClick={handleNextQuestion}
            >
              <span>Next</span>
              <MdNavigateNext />
            </Link>
          )}
        </div>
        <div className="secondary-btn-container">
          <div className="secondary-btn-container">
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
            height={isFullScreen ? "91vh" : "76vh"}
            language="python"
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            value={code}
            options={options}
            onChange={handleEditorChange}
          />
        </div>
        <div
          height={isFullScreen ? "91vh" : "80vh"}
          className={`output-container output-container-${
            isDarkMode ? "dark" : "light"
          } ${isFullScreen ? "output-container-full-screen" : ""}`}
        >
          <img
            className={`image image-${showImage ? "visible" : "hidden"}`}
            src={challangeCodes[questionIndex].image}
            alt="code screenshot"
          />
          {/* <div>
            <p>question index: {questionIndex}</p>
            <p>expected code: {challangeCodes[questionIndex].expectedCode}</p>
            <p> code: {code}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};
