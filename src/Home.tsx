import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Upload, AlarmClock, BadgeInfo, Plus } from "lucide-react";
import { FocusTimer } from "@/components/custom/focusTimer";
import { CourseHealthStatus } from "@/components/custom/courseHealthStatus";
import { AddCourseModal } from "@/components/custom/addCourseModal";




export default function Dashboard() {
  /* ───────── MOCK DATA ───────── */
  const weekStats = {
    assignmentsDue: 7,
    examsThisWeek: 3,
    studyHours: 24,
    progress: 85,
  };

  const deadlines = [
    {
      title: "Economics Midterm",
      priority: "high",
      course: "ECON 101",
      desc: "Chapters 1-6, Focus on supply & demand curves",
      date: "7/5/2025",
      type: "exam",
    },
    {
      title: "React Project Submission",
      priority: "medium",
      course: "CS 201",
      desc: "Build a full-stack web application",
      date: "7/7/2025",
      type: "assignment",
    },
    {
      title: "Psychology Essay",
      priority: "low",
      course: "PSYC 101",
      desc: "2 000 words on cognitive behavioral therapy",
      date: "7/9/2025",
      type: "essay",
    },
  ];

  const courseHealth = [
    {
      name: "Computer Science",
      code: "CS 201",
      status: "Healthy",
      color: "green",
      pct: 85,
      tasks: 2,
    },
    {
      name: "Economics",
      code: "ECON 101",
      status: "At Risk",
      color: "red",
      pct: 35,
      tasks: 5,
    },
    {
      name: "Psychology",
      code: "PSYC 101",
      status: "Moderate",
      color: "amber",
      pct: 60,
      tasks: 3,
    },
  ];

  /* ───────── JSX ───────── */
  return (
    <div className="mx-auto max-w-7xl p-8 space-y-10">
      {/* ───────── 1 • THIS WEEK AT A GLANCE ───────── */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
        <CardContent className="p-6 grid grid-cols-4 text-center">
          <StatBlock value={weekStats.assignmentsDue} label="Assignments Due" />
          <StatBlock value={weekStats.examsThisWeek} label="Exams This Week" />
          <StatBlock value={`${weekStats.studyHours}h`} label="Study Time Logged" />
          <StatBlock value={`${weekStats.progress}%`} label="Weekly Progress" />
        </CardContent>
  
        <Alert className="rounded-none bg-white/90 text-blue-700 text-sm">
          <BadgeInfo className="h-4 w-4" />
          <AlertTitle className="font-semibold">Priority Alert:</AlertTitle>
          <AlertDescription>
            Economics midterm in 2 days – Review chapters 4-6
          </AlertDescription>
        </Alert>
      </Card>
  
      {/* ───────── 2 • GRID  (left = 2fr, right = 1fr) ───────── */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        {/* LEFT COLUMN ────────────────────────────────── */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <SectionHeading title="Upcoming Deadlines">
            </SectionHeading>
  
            <CardContent className="p-0">
              {deadlines.map((d, i) => (
                <div
                  key={d.title}
                  className={`flex justify-between p-4 ${
                    i !== deadlines.length - 1 && "border-b border-muted"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-medium flex items-center gap-2">
                      {d.title}
                      <PriorityPill level={d.priority as any} />
                      <CoursePill>{d.course}</CoursePill>
                    </div>
                    <p className="text-muted-foreground text-sm">{d.desc}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <AlarmClock className="h-3 w-3" />
                      {d.date} · {d.type}
                    </p>
                  </div>
  
                  <Button variant="link" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
  
          {/* Upload / Add Course */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus /> Add New Course
              </CardTitle>
            </CardHeader>
  
            <CardContent className="py-12 text-center space-y-4">
              <Plus className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="font-medium">Add a new course to your dashboard</p>
              <p className="text-sm text-muted-foreground">
                Upload your syllabus and course materials to get started
              </p>
              <AddCourseModal />
            </CardContent>
          </Card>
        </div>
  
        {/* RIGHT COLUMN ───────────────────────────────── */}
        <div className="space-y-6">
          {/* Focus Timer */}
          <FocusTimer />
          {/* Course Health */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle> Course Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {courseHealth.map((c) => (
                <div key={c.code} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold leading-none">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.code}</p>
                    </div>
                    <CourseHealthStatus status={c.status as "Healthy" | "At Risk" | "Moderate"} />
                  </div>
  
                  <p className="text-[11px] text-muted-foreground">
                    Workload Management
                  </p>
                  <Progress
                    value={c.pct}
                    className={`h-1 bg-muted [&>*]:!bg-${c.color}-500`}
                  />
                  <p className="text-[11px] text-muted-foreground">
                    {c.tasks} tasks due in next 2 weeks
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
  
}

/* ───────── small helper components ───────── */

function StatBlock({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="space-y-1">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

function PriorityPill({ level }: { level: "high" | "medium" | "low" }) {
  const color =
    level === "high" ? "bg-red-100 text-red-700" :
    level === "medium" ? "bg-amber-100 text-amber-700" :
    "bg-green-100 text-green-700";
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${color}`}>
      {level}
    </span>
  );
}

function CoursePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
      {children}
    </span>
  );
}

function SectionHeading({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-xl font-semibold pl-4">{title}</h2>
      {children}
    </div>
  );
}

