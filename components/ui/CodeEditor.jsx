import React from 'react'
import { Editor } from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <div>
        <Editor
        height="calc(100vh - 5rem)"
        theme='vs-dark'
        defaultLanguage="javascript"
        defaultValue="console.log('Hello, world!')"
        />
    </div>
  )
}
