import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function QuestionDetailLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <header className="mb-6 border-b pb-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="flex gap-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-6 w-16 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          </div>
        </header>

        <div className="flex gap-6 items-start mb-8">
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="icon" disabled>
              <ArrowUp className="h-6 w-6" />
            </Button>
            <div className="h-6 w-6 bg-gray-200 rounded my-2"></div>
            <Button variant="ghost" size="icon" disabled>
              <ArrowDown className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1">
            <div className="h-20 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Replies</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Reply</h2>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <Button disabled>Post Reply</Button>
        </div>
      </div>
    </main>
  );
}
