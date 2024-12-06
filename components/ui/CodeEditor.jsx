"use client";
import { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "@/app/constants";
import Output from "./Output";
import Review from "./Review";
import { executeCode } from '@/app/api/Piston/api';
import { FaPlay } from "react-icons/fa";
import { generateReview } from '@/lib/actions/codeReview'; 

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [activeTab, setActiveTab] = useState("Editor");
  const [output, setOutput] = useState([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(""); 
  
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    console.log(sourceCode);
    if (!sourceCode) return;
    try {
      setLoading(true); // Set loading to true when execution starts
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      console.log(result.output);
      result.stderr ? setIsError(true) : setIsError(false);
      setActiveTab("Output"); // Ensure we switch to Output tab after execution
    } catch (error) {
      console.log(error);
      alert("An error occurred: " + (error.message || "Unable to run code"));
    } finally {
      setLoading(false); // Set loading to false when execution ends
    }
  };

  const getCode = () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return "no code";
    return sourceCode;
  };

  const handleGetReview = async () => {
    const code = getCode();
    console.log("Fetched Code:", code);
    const reviewText = await generateReview(code);
    console.log("Review Text:", reviewText);
    setReview(reviewText);
    setActiveTab("Review");
  };

  useEffect(() => {
    const resizer = document.querySelector(".cursor-ew-resize");
    const leftPanel = resizer.previousElementSibling;
    const rightPanel = resizer.nextElementSibling;

    const handleMouseDown = (event) => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event) => {
      const newWidth = event.clientX - leftPanel.getBoundingClientRect().left;
      leftPanel.style.width = `${newWidth}px`;
      rightPanel.style.width = `calc(100% - ${newWidth}px - 0.25rem)`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    resizer.addEventListener("mousedown", handleMouseDown);

    return () => {
      resizer.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div className="flex flex-col bg-white h-auto">
      <div className="flex justify-between items-center py-2 px-6 bg-gray-100">
        <LanguageSelector language={language} onSelect={onSelect}/>
        <div className="flex">
          <button onClick={() => setActiveTab("Editor")} className={`px-4 py-2 ${activeTab === "Editor" ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-900"} rounded-l-sm`}>Editor</button>
          <button onClick={() => setActiveTab("Output")} className={`px-4 py-2 ${activeTab === "Output" ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-900"}`}>Output</button>
          <button onClick={() => setActiveTab("Review")} className={`px-4 py-2 ${activeTab === "Review" ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-900"} rounded-r-sm`}>Review</button>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={runCode} disabled={loading} className="flex items-center gap-2 bg-blue-500 p-1 rounded text-white text-sm">
            {loading ? "Running..." : <><FaPlay /><>Run Code</></>}
          </button>
          <button onClick={handleGetReview} className="flex items-center gap-2 bg-green-500 p-1 rounded text-white text-sm">
            Get Review
          </button>
        </div>
      </div>
      {activeTab === "Editor" ? (
        <Editor
          options={{
            minimap: {
              enabled: false,
            },
          }}
          height="calc(100vh - 10rem)"
          theme="vs-light"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
        />
      ) : activeTab === "Output" ? (
        <Output output={output} isError={isError} />
      ) : (
        <Review getCode={getCode} review={review} />
      )}
    </div>
  );
};

export default CodeEditor;
