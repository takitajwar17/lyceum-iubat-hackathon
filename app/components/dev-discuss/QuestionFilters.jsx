import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

export default function QuestionFilters({ questionCount }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <p className="text-lg">{questionCount.toLocaleString()} questions</p>
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              className="pl-9 w-[300px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 