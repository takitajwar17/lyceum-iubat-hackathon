"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
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
import { createRoadmap } from "@/lib/actions/roadmap";

export default function RoadmapsPage() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    prompt: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createRoadmap(
        formData.title,
        formData.prompt,
        user.id
      );
      console.log("Roadmap Response:", response);
      setOpen(false);
      // You can add a toast notification here
    } catch (error) {
      console.error("Error creating roadmap:", error);
      // You can add an error toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Roadmaps</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create New Roadmap</Button>
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

      {/* Roadmap list will be added here in the next iteration */}
      <div className="grid gap-4">
        {/* Placeholder for roadmap cards */}
      </div>
    </div>
  );
}
