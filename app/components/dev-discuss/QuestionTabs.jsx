// app/components/dev-discuss/QuestionTabs.jsx

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function QuestionTabs({ selectedTab, onTabChange, tabs }) {
  return (
    <Tabs value={selectedTab} onValueChange={onTabChange} className="mb-6">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
