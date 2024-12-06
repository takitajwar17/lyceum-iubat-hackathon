import { LANGUAGE_VERSIONS } from "@/app/constants";
import { useState } from "react";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue-400";

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-2 mb-2">
      <div className="relative inline-block text-left">
        <button
          className="bg-white border border-gray-300 text-gray-700 px-2 py-1 rounded-md shadow-sm hover:bg-gray-100 transition duration-150 flex items-center justify-between w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-sm">{language}</span>
          <svg className="w-3 h-3 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {languages.map(([lang, version]) => (
              <button
                key={lang}
                className={`${
                  lang === language ? "bg-blue-100 text-blue-600" : "text-gray-900"
                } block w-full text-left px-4 py-2 hover:bg-blue-50 transition duration-150`}
                onClick={() => onSelect(lang)}
              >
                {lang}
                &nbsp;
                <span className="text-gray-500 text-sm">({version})</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
