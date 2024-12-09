"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getUserRoadmaps } from "@/lib/actions/roadmap";
import { FaYoutube, FaTrophy, FaRoad, FaBook, FaClock, FaCalendarAlt } from "react-icons/fa";
import { IoTrendingUp } from "react-icons/io5";

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    activeQuests: 0,
    completedQuests: 0,
    roadmapProgress: 0,
    learningStreak: 0,
  });
  const [roadmaps, setRoadmaps] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const userRoadmaps = await getUserRoadmaps(user.id);
      setRoadmaps(userRoadmaps);

      const questsResponse = await fetch('/api/quests/user');
      const questsData = await questsResponse.json();

      setStats({
        activeQuests: questsData?.active?.length || 0,
        completedQuests: questsData?.completed?.length || 0,
        roadmapProgress: calculateRoadmapProgress(userRoadmaps),
        learningStreak: calculateStreak(questsData?.history),
      });

      // Format roadmap activities
      const roadmapActivities = userRoadmaps?.slice(0, 3).map(roadmap => ({
        title: roadmap.title,
        type: 'Roadmap',
        date: roadmap.createdAt || roadmap.updatedAt || null
      })) || [];

      // Combine and sort activities
      const allActivities = [
        ...(questsData?.recent || []),
        ...roadmapActivities
      ].sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
      });

      setRecentActivity(allActivities);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateRoadmapProgress = (roadmaps) => {
    if (!roadmaps?.length) return 0;
    const completed = roadmaps.filter(r => r.status === 'completed').length;
    return Math.round((completed / roadmaps.length) * 100);
  };

  const calculateStreak = (history) => {
    return history?.length || 0;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back, <span className="text-primary">{user?.firstName}</span>!
          </h1>
          <p className="text-gray-600">Here's an overview of your learning journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Quests</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.activeQuests}</h3>
                <p className="text-xs text-gray-400 mt-1">Ongoing challenges</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <FaTrophy className="text-2xl text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed Quests</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.completedQuests}</h3>
                <p className="text-xs text-gray-400 mt-1">Successfully finished</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-full">
                <FaBook className="text-2xl text-green-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 border-l-4 border-cyan-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Roadmap Progress</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.roadmapProgress}%</h3>
                <p className="text-xs text-gray-400 mt-1">Overall completion</p>
              </div>
              <div style={{ width: 60, height: 60 }}>
                <CircularProgressbar
                  value={stats.roadmapProgress}
                  text={`${stats.roadmapProgress}%`}
                  styles={{
                    path: { stroke: '#0891b2', transition: 'stroke-dashoffset 0.5s ease' },
                    text: { fill: '#0891b2', fontSize: '24px', fontWeight: 'bold' },
                    trail: { stroke: '#e2e8f0' },
                  }}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Learning Streak</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.learningStreak} days</h3>
                <p className="text-xs text-gray-400 mt-1">Keep it up!</p>
              </div>
              <div className="bg-purple-500/10 p-3 rounded-full">
                <IoTrendingUp className="text-2xl text-purple-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <FaClock className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer border border-gray-100"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <div className="flex items-center mt-1">
                      <FaCalendarAlt className="text-gray-400 text-xs mr-1" />
                      <p className="text-sm text-gray-500">
                        {activity.type} • {activity.date ? new Date(activity.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'Not started'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Roadmaps */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Active Roadmaps</h2>
              <FaRoad className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {roadmaps.slice(0, 5).map((roadmap, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer border border-gray-100"
                  onClick={() => router.push(`/roadmaps/${roadmap._id}`)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{roadmap.title}</h4>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {roadmap.progress || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${roadmap.progress || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
