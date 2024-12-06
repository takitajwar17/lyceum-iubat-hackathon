// app/dev-discuss/ask-question/page.jsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/nextjs"; // Adjust based on your authentication method
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { createQuestion } from "../../../lib/actions/question"; // Adjust the import path as necessary

export default function AskQuestionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [aiResponseRequested, setAiResponseRequested] = useState(false); // New state for AI response checkbox
  const router = useRouter();
  const { userId } = useAuth(); // Get the authenticated user's ID

  const handleTagInputKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    } else if (e.key === "Backspace" && !tagInput) {
      e.preventDefault();
      setTags(tags.slice(0, -1));
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || tags.length === 0) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const question = await createQuestion(
        title,
        description,
        tags,
        userId,
        aiResponseRequested
      ); // Pass aiResponseRequested
      console.log("Question created:", question);
      toast.success("Question posted successfully!");
      router.push("/dev-discuss"); // Redirect to the discussion page
    } catch (error) {
      console.error("Error creating question:", error);
      toast.error("Error posting question. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Ask a Question</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              placeholder="e.g., How to center a div using Tailwind CSS?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              placeholder="Include all the information someone would need to answer your question"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
            />
          </div>

          {/* Tags Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex flex-wrap items-center gap-2 border border-input rounded-md p-2 focus-within:border-ring">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    ×
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                className="flex-grow border-none focus:ring-0 p-0 m-0"
                placeholder="Add a tag"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Press <strong>space</strong> or <strong>enter</strong> to add a
              tag.
            </p>
          </div>

          {/* AI Response Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={aiResponseRequested}
              onChange={(e) => setAiResponseRequested(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              Request an AI-generated answer
            </label>
          </div>
          <p className="text-sm text-gray-500">
            <strong>Note:</strong> Community members can still answer your
            question; If you check the box, this will serve as an{" "}
            <strong>initial point of reference</strong>.
          </p>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit">Post Your Question</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
