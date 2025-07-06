import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { useParams } from "react-router-dom";
  import { Upload, MessageCircle } from "lucide-react";
  
  /* ─── temporary stub data ─── */
  const courseData = {
    "ECON 101": { name: "Microeconomics" },
    "CS 201":   { name: "Data Structures" },
    "PSYC 101": { name: "Psychology" },
  };
  
  const savedLessons = [
    { title: "Supply and Demand Basics", date: "2025-07-01" },
    { title: "Market Equilibrium",       date: "2025-06-28" },
    { title: "Consumer Theory",          date: "2025-06-25" },
  ];
  
  const materials = [
    { file: "ECON_101_Chapter4_Notes.pdf", size: "2.4 MB" },
    { file: "ECON_101_Assignment_Instructions.docx", size: "156 KB" },
  ];
  
  export default function CoursePage() {
    const { courseId } = useParams();           
    const course = courseData[courseId ?? ""] ?? { name: "" };
  
    return (
      <div className="mx-auto max-w-7xl p-8 space-y-10">
        {/* Banner */}
        <div className="rounded-lg p-8 text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow">
          <h1 className="text-3xl font-bold">{courseId}</h1>
          <p className="opacity-90">{course.name}</p>
        </div>
  
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* LEFT ──────────────────────────── */}
          <div className="space-y-6">
            {/* AI Tutor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  AI Tutor for {courseId}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Chat bubble */}
                <div className="rounded-md bg-muted p-4 text-sm">
                  Hi! I’m ready to help you with {course.name}. What would you like
                  to learn about today?
                </div>
  
                {/* Input row */}
                <div className="flex gap-2">
                  <Input
                    placeholder={`Ask me anything about ${courseId}…`}
                    className="flex-1"
                  />
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    Ask
                  </Button>
                </div>
  
                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Generate Quiz
                  </Button>
                  <Button variant="outline" size="sm">
                    Explain Concept
                  </Button>
                  <Button 
                  className="ml-auto mr-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition"
                  size="sm"
                  >
                    Save as Lesson
                  </Button>
                </div>
              </CardContent>
            </Card>
  
            {/* Course Materials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Course Materials
                  <Button variant="outline" size="sm" className="gap-1">
                    <Upload className="h-4 w-4" /> Upload Notes
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {materials.map((m) => (
                  <div
                    key={m.file}
                    className="flex items-center justify-between border rounded px-4 py-2"
                  >
                    <p className="truncate">{m.file}</p>
                    <span className="text-xs text-muted-foreground">{m.size}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
  
          {/* RIGHT ─────────────────────────── */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Saved Lessons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {savedLessons.map((l) => (
                <div
                  key={l.title}
                  className="rounded border px-4 py-3 text-sm flex justify-between"
                >
                  <div>
                    <p className="font-medium">{l.title}</p>
                    <p className="text-xs text-muted-foreground">{l.date}</p>
                  </div>
                  <Button variant="link" size="sm">
                    Review
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  