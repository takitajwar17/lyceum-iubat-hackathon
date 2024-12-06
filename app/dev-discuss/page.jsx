"use client";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function DevDiscuss() {
  const { user } = useUser();
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const [questions] = useState([
    {
      id: 1,
      title: "How to implement authentication in Next.js 13?",
      description: "I'm building a web application using Next.js 13 and need to implement user authentication. What are the best practices and recommended approaches?",
      author: "John Doe",
      
      votes: 15,
      answers: 3,
      views: 120,
      tags: ["next.js", "authentication", "react"],
      createdAt: "2024-02-15",
    },
    {
      id: 2,
      title: "Understanding TypeScript Generics",
      description: "Can someone explain TypeScript generics with practical examples? I'm having trouble understanding when and how to use them effectively.",
      author: "Jane Smith",
      
      votes: 8,
      answers: 2,
      views: 85,
      tags: ["typescript", "javascript", "programming"],
      createdAt: "2024-02-14",
    },
    {
      id: 3,
      title: "Best practices for React state management in 2024",
      description: "With so many state management solutions available (Redux, Zustand, Jotai, etc.), what's the current best practice for React applications?",
      author: "Alex Johnson",
      
      votes: 12,
      answers: 4,
      views: 150,
      tags: ["react", "state-management", "javascript"],
      createdAt: "2024-02-13",
    }
  ]);

  const filters = [
    { name: "Latest", value: "latest" },
    { name: "Most Voted", value: "votes" },
    { name: "Most Answered", value: "answers" },
    { name: "Most Viewed", value: "views" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Developer Discussions</h1>
            <p className="mt-2 text-sm text-gray-600">
              Join the community discussion, ask questions, and share your knowledge
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <Link
                href="/dev-discuss/ask"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Ask Question
              </Link>
            )}
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    selectedFilter === filter.value
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <Link href={`/dev-discuss/question/${question.id}`}>
                <div className="flex items-start space-x-4">
                 
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {question.title}
                    </h2>
                    <p className="mt-2 text-gray-600 line-clamp-2">
                      {question.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                          {question.votes} votes
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                          </svg>
                          {question.answers} answers
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          {question.views} views
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}