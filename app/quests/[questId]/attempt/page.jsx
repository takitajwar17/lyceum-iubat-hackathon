"use client";

import { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

export default function QuestAttemptPage({ params }) {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [quest, setQuest] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        if (!isLoaded || !user) {
          return;
        }
        // Fetch quest details
        const response = await fetch(`/api/quests/${params.questId}`);
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Quest not found');
        }
        const questData = await response.json();
        setQuest(questData);

        // Check if user has already attempted this quest
        const existingAttemptResponse = await fetch(`/api/attempts/user/${params.questId}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (existingAttemptResponse.ok) {
          const existingAttempt = await existingAttemptResponse.json();
          if (existingAttempt) {
            setAttempt(existingAttempt);
            if (existingAttempt.status === 'completed') {
              router.push(`/quests/${params.questId}/results/${existingAttempt._id}`);
              return;
            }
          }
        }

        // Calculate time left based on quest end time
        const now = new Date();
        const endTime = new Date(questData.endTime);
        if (now >= endTime) {
          setError('This quest has ended');
          return;
        }
        setTimeLeft(Math.max(0, Math.floor((endTime - now) / 1000)));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuest();
  }, [params.questId, user, isLoaded]);

  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (isAutoSubmit = false) => {
    try {
      setError(null);
      
      // Create attempt first
      const attemptResponse = await fetch('/api/attempts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questId: params.questId,
        }),
      });

      if (!attemptResponse.ok) {
        const error = await attemptResponse.json();
        throw new Error(error.error || 'Failed to create attempt');
      }

      const newAttempt = await attemptResponse.json();

      // Then submit answers
      const submitResponse = await fetch(`/api/attempts/${newAttempt._id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: Object.entries(answers).map(([questionId, answer]) => ({
            questionId,
            answer
          })),
          isAutoSubmit
        }),
      });

      if (!submitResponse.ok) {
        const error = await submitResponse.json();
        throw new Error(error.error || 'Failed to submit answers');
      }

      // Redirect to results page
      router.push(`/quests/${params.questId}/results/${newAttempt._id}`);
    } catch (error) {
      console.error('Submit error:', error);
      setError(error.message);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading user...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Please sign in to attempt quests</div>
      </div>
    );
  }

  if (attempt?.status === 'completed') {
    router.push(`/quests/${params.questId}/results/${attempt._id}`);
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading quest...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!quest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Quest not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{quest.name}</h1>
            <p className="text-sm text-gray-500">Level: {quest.level}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono text-blue-600">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-500">Time Remaining</div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {quest.questions.map((question, index) => (
            <div key={question._id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start">
                <span className="flex-shrink-0 bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-sm font-medium mr-2">
                  Q{index + 1}
                </span>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {question.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{question.description}</p>
                  
                  {question.type === 'short' ? (
                    <input
                      type="text"
                      value={answers[question._id] || ''}
                      onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                      className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your answer..."
                    />
                  ) : (
                    <textarea
                      value={answers[question._id] || ''}
                      onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                      rows="4"
                      className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write your code here..."
                    />
                  )}

                  <div className="mt-2 text-sm text-gray-500">
                    Points: {question.points}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => handleSubmit(false)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Answers
          </button>
        </div>
      </div>
    </div>
  );
}
