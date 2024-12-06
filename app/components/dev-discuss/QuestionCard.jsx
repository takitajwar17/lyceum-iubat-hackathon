// app/components/dev-discuss/QuestionCard.jsx

"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs"; // Adjust based on your auth provider
import { ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function QuestionCard({ question }) {
  const { userId } = useAuth();
  const [votes, setVotes] = useState(question.votes);
  const [userVote, setUserVote] = useState(0); // 1 for upvoted, -1 for downvoted, 0 for none

  // app/components/dev-discuss/QuestionCard.jsx

  useEffect(() => {
    // Check if the user has already voted
    const existingVote = question.voters?.find(
      (voter) => voter.userId === userId
    );
    if (existingVote) {
      setUserVote(existingVote.vote);
    }
  }, [question.voters, userId]);

  const handleUpvote = async () => {
    if (!userId) {
      toast.error("You must be logged in to vote");
      return;
    }
    try {
      const response = await fetch(`/api/questions/${question._id}/upvote`, {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        setVotes((prevVotes) => prevVotes + 1);
        setUserVote(1);
      } else {
        toast.error(data.error || "Failed to upvote");
      }
    } catch (error) {
      console.error("Error upvoting:", error);
      toast.error("Error upvoting. Please try again.");
    }
  };

  const handleDownvote = async () => {
    if (!userId) {
      toast.error("You must be logged in to vote");
      return;
    }
    try {
      const response = await fetch(`/api/questions/${question._id}/downvote`, {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        setVotes((prevVotes) => prevVotes - 1);
        setUserVote(-1);
      } else {
        toast.error(data.error || "Failed to downvote");
      }
    } catch (error) {
      console.error("Error downvoting:", error);
      toast.error("Error downvoting. Please try again.");
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-card hover:border-primary/50 transition-colors">
      <div className="flex gap-6">
        {/* Stats */}
        <div className="flex flex-col items-center gap-2 min-w-[100px]">
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">{votes}</span>
            <span className="text-sm text-muted-foreground">votes</span>
          </div>
          <div className="flex flex-col items-center text-green-600">
            <span className="text-lg font-semibold">{question.answers}</span>
            <span className="text-sm">answers</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
            <Link href={`/dev-discuss/${question._id}`}>{question.title}</Link>
          </h2>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {question.description}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>asked {new Date(question.createdAt).toLocaleString()}</span>
              <span>by</span>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                {question.author}
              </a>
            </div>
          </div>
        </div>

        {/* Voting */}
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleUpvote}
            disabled={userVote === 1}
          >
            <ArrowUp
              className={`h-6 w-6 ${userVote === 1 ? "text-blue-600" : ""}`}
            />
          </Button>
          <span className="font-semibold">{votes}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownvote}
            disabled={userVote === -1}
          >
            <ArrowDown
              className={`h-6 w-6 ${userVote === -1 ? "text-red-600" : ""}`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
