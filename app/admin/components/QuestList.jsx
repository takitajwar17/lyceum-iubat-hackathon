"use client";

import { useState, useEffect } from "react";
import QuestForm from "./QuestForm";
import Cookies from "js-cookie";

export default function QuestList({ onStatsUpdate }) {
  const [quests, setQuests] = useState([]);
  const [isAddingQuest, setIsAddingQuest] = useState(false);
  const [editingQuest, setEditingQuest] = useState(null);

  const getAuthHeader = () => {
    const adminAuth = Cookies.get("adminAuth");
    return {
      Authorization: `Basic ${adminAuth}`,
    };
  };

  const updateStats = (questsData) => {
    if (!onStatsUpdate) return;

    const now = new Date();
    const stats = {
      totalQuests: questsData.length,
      activeQuests: questsData.filter(quest => 
        quest.isActive && 
        new Date(quest.startTime) <= now && 
        new Date(quest.endTime) >= now
      ).length,
      upcomingQuests: questsData.filter(quest => 
        quest.isActive && 
        new Date(quest.startTime) > now
      ).length,
    };
    onStatsUpdate(stats);
  };

  const fetchQuests = async () => {
    try {
      const response = await fetch("/api/admin/quests", {
        headers: getAuthHeader(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch quests");
      }
      const data = await response.json();
      setQuests(data);
      updateStats(data);
    } catch (error) {
      console.error("Error fetching quests:", error);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this quest?")) return;

    try {
      const response = await fetch(`/api/admin/quests/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete quest");
      }
      
      fetchQuests();
    } catch (error) {
      console.error("Error deleting quest:", error);
    }
  };

  const handleSave = async (questData) => {
    try {
      const url = editingQuest
        ? `/api/admin/quests/${editingQuest._id}`
        : "/api/admin/quests";
      const method = editingQuest ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(questData),
      });

      if (!response.ok) {
        throw new Error("Failed to save quest");
      }

      setIsAddingQuest(false);
      setEditingQuest(null);
      fetchQuests();
    } catch (error) {
      console.error("Error saving quest:", error);
    }
  };

  const getQuestStatus = (quest) => {
    const now = new Date();
    const startTime = new Date(quest.startTime);
    const endTime = new Date(quest.endTime);

    if (!quest.isActive) return { status: "Inactive", color: "gray" };
    if (now < startTime) return { status: "Upcoming", color: "purple" };
    if (now > endTime) return { status: "Ended", color: "red" };
    return { status: "Active", color: "green" };
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Quest List</h2>
        <button
          onClick={() => setIsAddingQuest(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Quest
        </button>
      </div>

      {(isAddingQuest || editingQuest) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto max-w-3xl">
            <div className="bg-white rounded-lg shadow-xl">
              <div className="p-6">
                <QuestForm
                  quest={editingQuest}
                  onSave={handleSave}
                  onCancel={() => {
                    setIsAddingQuest(false);
                    setEditingQuest(null);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-4">
        {quests.map((quest) => {
          const status = getQuestStatus(quest);
          return (
            <div
              key={quest._id}
              className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {quest.name}
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      Level: {quest.level.charAt(0).toUpperCase() + quest.level.slice(1)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${status.color}-100 text-${status.color}-800`}>
                      {status.status}
                    </span>
                    <button
                      onClick={() => setEditingQuest(quest)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(quest._id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Time Limit:</span>{" "}
                    {quest.timeLimit} minutes
                  </div>
                  <div>
                    <span className="font-medium">Questions:</span>{" "}
                    {quest.questions.length}
                  </div>
                  <div>
                    <span className="font-medium">Points:</span>{" "}
                    {quest.questions.reduce((sum, q) => sum + q.points, 0)}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <div>Start: {new Date(quest.startTime).toLocaleString()}</div>
                  <div>End: {new Date(quest.endTime).toLocaleString()}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
