"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createRoadmap, getUserRoadmaps } from "@/lib/actions/roadmap";
import { FaYoutube } from "react-icons/fa";
import { FiExternalLink, FiChevronRight } from "react-icons/fi";

export default function RoadmapsPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRoadmaps, setIsLoadingRoadmaps] = useState(true);
  const [open, setOpen] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    prompt: "",
  });

  useEffect(() => {
    if (user) {
      fetchUserRoadmaps();
    }
  }, [user]);

  const fetchUserRoadmaps = async () => {
    setIsLoadingRoadmaps(true);
    try {
      const userRoadmaps = await getUserRoadmaps(user.id);
      setRoadmaps(userRoadmaps);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
    } finally {
      setIsLoadingRoadmaps(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createRoadmap(formData.title, formData.prompt, user.id);
      setOpen(false);
      setFormData({ title: "", prompt: "" });
      fetchUserRoadmaps();
    } catch (error) {
      console.error("Error creating roadmap:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Learning Roadmaps</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">Create New Roadmap</Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Create a New Learning Roadmap</DialogTitle>
                  <DialogDescription>
                    Enter a title and describe what you want to learn. Our AI will create a
                    personalized learning path for you.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 my-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Roadmap Title
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="e.g., My Python Learning Journey"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      What do you want to learn?
                    </label>
                    <Textarea
                      value={formData.prompt}
                      onChange={(e) =>
                        setFormData({ ...formData, prompt: e.target.value })
                      }
                      placeholder="e.g., I want to learn Python from scratch and become proficient in web development using Django"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Roadmap"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
          </div>

          {isLoadingRoadmaps ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#101826]"></div>
                <p className="text-gray-600">Loading your roadmaps...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmaps.map((roadmap) => (
                  <div
                    key={roadmap._id}
                    onClick={() => router.push(`/roadmaps/${roadmap._id}`)}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
                  >
                    <div className="bg-gradient-to-r from-[#101826] to-[#1c2c47] px-6 py-4">
                      <h2 className="text-xl font-bold text-white">{roadmap.title}</h2>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-2">{roadmap.prompt}</p>
                      
                      <div className="space-y-3">
                        {roadmap.content.steps.slice(0, 3).map((step) => (
                          <div key={step.step} className="flex items-start space-x-2">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                              {step.step}
                            </span>
                            <p className="text-sm text-gray-600 line-clamp-1">{step.topic}</p>
                          </div>
                        ))}
                        {roadmap.content.steps.length > 3 && (
                          <p className="text-sm text-gray-500 pl-8">
                            +{roadmap.content.steps.length - 3} more steps
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <div className="inline-flex items-center text-blue-600 text-sm font-medium">
                          View Roadmap
                          <FiChevronRight className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {roadmaps.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Roadmaps Yet</h3>
                  <p className="text-gray-600">
                    Click the "Create New Roadmap" button above to get started!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
