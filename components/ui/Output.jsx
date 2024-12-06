import { useState } from "react";
import { executeCode } from "@/app/api/Piston/api";

const Output = ({ output, isError }) => {
  return (
    <div className="p-4 bg-white shadow-md">
      <span className="mb-2 text-black text-lg font-semibold">Output</span>
      <div
        className={`h-75vh p-2 border rounded-md ${
          isError ? "border-red-500" : "border-gray-300"
        } bg-gray-100`}
      >
        {output
          ? output.map((line, i) => (
              <p key={i} className="text-black">
                {line}
              </p>
            ))
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
