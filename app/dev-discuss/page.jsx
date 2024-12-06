// app/dev-discuss/page.jsx

"use client";

import QuestionsLoading from "@/app/components/dev-discuss/Loading";
import QuestionFilters from "@/app/components/dev-discuss/QuestionFilters";
import QuestionHeader from "@/app/components/dev-discuss/QuestionHeader";
import QuestionList from "@/app/components/dev-discuss/QuestionList";
import QuestionTabs from "@/app/components/dev-discuss/QuestionTabs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [questions, setQuestions] = useState({
    owned: [],
    others: [],
  });
  const [loading, setLoading] = useState(true);

  const tabs = ["all", "my questions", "popular"];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions/all-questions");
        if (response.ok) {
          const data = await response.json();
          setQuestions({
            owned: data.owned,
            others: data.others,
          });
        } else {
          console.error("Failed to fetch questions");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <QuestionsLoading />;
  }

  let displayedQuestions = [];
  if (selectedTab === "all") {
    displayedQuestions = [...questions.owned, ...questions.others];
  } else if (selectedTab === "my questions") {
    displayedQuestions = questions.owned;
  } else if (selectedTab === "popular") {
    displayedQuestions = [...questions.owned, ...questions.others]
      .map((question) => ({
        ...question,
        score: question.votes + question.answers * 2, // Calculate weighted score
      }))
      .sort((a, b) => b.score - a.score); // Sort by score in descending order
  }

  return (
    <main className="min-h-screen bg-background">
      <QuestionHeader />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <QuestionFilters questionCount={displayedQuestions.length} />
        <QuestionTabs
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          tabs={tabs}
        />
        <QuestionList questions={displayedQuestions} />
      </div>
    </main>
  );
}
