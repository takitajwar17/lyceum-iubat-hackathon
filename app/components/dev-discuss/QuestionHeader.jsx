import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function QuestionHeader() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Questions</h1>
        <Link href="/dev-discuss/ask-question">
          <Button>Ask Question</Button>
        </Link>
      </div>
    </header>
  );
}
