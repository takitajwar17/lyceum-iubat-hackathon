"use client";

import { useState, useEffect } from "react";

function formatDateForInput(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - offset);
  return localDate.toISOString().slice(0, 16); // Format: "YYYY-MM-DDThh:mm"
}

function calculateEndTime(startTime, timeLimit) {
  if (!startTime) return "";
  
  // Create date object from input
  const date = new Date(startTime);
  
  // Add minutes
  const endDate = new Date(date.getTime() + parseInt(timeLimit) * 60000);
  
  // Format for datetime-local input
  const offset = endDate.getTimezoneOffset() * 60000;
  const localEndDate = new Date(endDate.getTime() - offset);
  return localEndDate.toISOString().slice(0, 16);
}

export default function QuestForm({ quest, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    quest
      ? {
          ...quest,
          startTime: formatDateForInput(quest.startTime),
          endTime: formatDateForInput(quest.endTime),
        }
      : {
          name: "",
          timeLimit: 60,
          level: "beginner",
          questions: [],
          startTime: "",
          endTime: "",
          isActive: false,
        }
  );

  const [newQuestion, setNewQuestion] = useState({
    type: "short",
    title: "",
    description: "",
    points: 0,
    testCases: [],
  });

  useEffect(() => {
    if (quest) {
      setFormData({
        ...quest,
        startTime: formatDateForInput(quest.startTime),
        endTime: formatDateForInput(quest.endTime),
      });
    }
  }, [quest]);

  useEffect(() => {
    if (formData.startTime && formData.timeLimit) {
      const calculatedEndTime = calculateEndTime(formData.startTime, formData.timeLimit);
      setFormData(prev => ({
        ...prev,
        endTime: calculatedEndTime
      }));
    }
  }, [formData.startTime, formData.timeLimit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    onSave(formData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value, type } = e.target;
    setNewQuestion((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const addQuestion = () => {
    if (!newQuestion.title || !newQuestion.description) return;
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, { ...newQuestion }],
    }));
    setNewQuestion({
      type: "short",
      title: "",
      description: "",
      points: 0,
      testCases: [],
    });
  };

  const removeQuestion = (index) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const addTestCase = () => {
    setNewQuestion(prev => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", expectedOutput: "" }],
    }));
  };

  const updateTestCase = (index, field, value) => {
    const updatedTestCases = [...newQuestion.testCases];
    updatedTestCases[index] = {
      ...updatedTestCases[index],
      [field]: value,
    };
    setNewQuestion(prev => ({
      ...prev,
      testCases: updatedTestCases,
    }));
  };

  const removeTestCase = (index) => {
    setNewQuestion(prev => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quest Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              name="timeLimit"
              value={formData.timeLimit}
              onChange={handleInputChange}
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Time (auto-calculated)
          </label>
          <input
            type="datetime-local"
            value={formData.endTime}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
            disabled
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Active Quest
          </label>
        </div>

        {/* Questions Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Questions</h3>
          
          {/* Existing Questions */}
          <div className="space-y-4 mb-4">
            {formData.questions.map((q, index) => (
              <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{q.title}</h4>
                  <p className="text-sm text-gray-600">{q.description}</p>
                  <div className="text-sm text-gray-500 mt-1">
                    Type: {q.type} | Points: {q.points}
                  </div>
                  {q.type === "coding" && q.testCases.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium">Test Cases:</p>
                      {q.testCases.map((test, i) => (
                        <div key={i} className="text-sm">
                          <span>Input: {test.input}</span>
                          <span className="ml-2">Expected: {test.expectedOutput}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* New Question Form */}
          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Question Type
                </label>
                <select
                  name="type"
                  value={newQuestion.type}
                  onChange={handleQuestionChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="short">Short Answer</option>
                  <option value="coding">Coding</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Points
                </label>
                <input
                  type="number"
                  name="points"
                  value={newQuestion.points}
                  onChange={handleQuestionChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Question Title
              </label>
              <input
                type="text"
                name="title"
                value={newQuestion.title}
                onChange={handleQuestionChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Question Description
              </label>
              <textarea
                name="description"
                value={newQuestion.description}
                onChange={handleQuestionChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>

            {newQuestion.type === "coding" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Test Cases
                </label>
                {newQuestion.testCases.map((testCase, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      placeholder="Input"
                      value={testCase.input}
                      onChange={(e) => updateTestCase(index, "input", e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Expected Output"
                      value={testCase.expectedOutput}
                      onChange={(e) => updateTestCase(index, "expectedOutput", e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTestCase}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  + Add Test Case
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={addQuestion}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Question
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Quest
        </button>
      </div>
    </form>
  );
}
