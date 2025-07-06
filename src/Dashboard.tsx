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
import { CalendarDays, AlarmClock, BadgeInfo, Plus, AlertTriangle } from "lucide-react";
import { FocusTimer } from "@/components/custom/focusTimer";
import { CourseHealthStatus } from "@/components/custom/courseHealthStatus";
import { AddCourseModal } from "@/components/custom/addCourseModal";
import { useCourses } from "@/hooks/useCourses";
import { useDeliverables } from "@/hooks/useDeliverables";
import { useWeekStats } from "@/hooks/useWeekStats";
import clsx from "clsx";

export default function Dashboard() {

  const courses = useCourses();
  const courseMap = Object.fromEntries(courses.map(c => [c.courseId, c.courseCode]));
  const deliverables = useDeliverables();
  const weekStats = useWeekStats(deliverables);

  // Calculating upcoming assignmetns
  const now = new Date();
  const threeWeeksFromNow = new Date();
  threeWeeksFromNow.setDate(now.getDate() + 21);
  const deadlines = deliverables.filter((d) => {
      const due = new Date(d.dueDate);
      return due >= now && due <= threeWeeksFromNow;
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  // Calculation END

  // Assignment priority calcs

  function getPriorityScore(weight: number, difficulty: number) {
    return weight * 0.6 + difficulty * 8; // tweak the weights as needed
  }
  
  const computePriority = (weight: number, difficulty: number) => {
    const score = getPriorityScore(weight, difficulty);
    if (score > 70) return "high";
    if (score > 40) return "medium";
    return "low";
  };

  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(now.getDate() + 21);

  const deliberablesNextWeek = deliverables.filter(d => {
    const due = new Date(d.dueDate);
    return due >= now && due <= oneWeekFromNow;
  });

  const highestPriority = deliberablesNextWeek
  .map(d => ({ ...d, score: getPriorityScore(d.weight, d.difficulty) }))
  .sort((a, b) => b.score - a.score)[0];

  

  const courseHealth = courses.map((c) => {
    
    const upcoming = deliverables.filter(
      (d) => d.courseId === c.courseId && new Date(d.dueDate) > new Date()
    );

    const pct = Math.max(0, 100 - upcoming.length * 10);
    const status = pct >= 70 ? "Healthy" : pct < 40 ? "At Risk" : "Moderate";
    const color  = status === "Healthy" ? "green" : status === "At Risk" ? "red" : "amber";
    return {
      name: c.courseName,
      code: c.courseCode,
      status,
      color,
      pct,
      tasks: upcoming.length,
    };
  });



  

  /*
  MOCK DATA ------------------

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
  /*

  /* ───────── JSX ───────── */
  return (
    <div className="mx-auto max-w-7xl p-8 space-y-10">
      {/* ───────── THIS WEEK AT A GLANCE ───────── */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
      <CardHeader className="flex items-center gap-2 pb-2">
        <CalendarDays className="h-5 w-5 text-white/90" />
        <CardTitle className="text-white text-xl font-semibold">
          This Week at a Glance
        </CardTitle>
      </CardHeader>
        <CardContent className="p-6 grid grid-cols-4 text-center">
          <StatBlock value={weekStats.assignmentsDue} label="Assignments Due" />
          <StatBlock value={weekStats.examsThisWeek} label="Exams This Week" />
          <StatBlock value={`${weekStats.studyHours}h`} label="Study Time Logged" />
          <StatBlock value={`${weekStats.progress}%`} label="Weekly Progress" />
        </CardContent>
  
        {highestPriority && (
          <div className="rounded-md bg-white/20 text-white px-4 py-2 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-white" />
            <span className="font-semibold">Priority Alert:</span>
            <span className="truncate">
              {highestPriority.title} ({courseMap[highestPriority.courseId]}) due in{" "}
              {Math.ceil(
                (new Date(highestPriority.dueDate).getTime() - now.getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              days!
            </span>
          </div>
        )}


      </Card>
  
      {/* ───────── GRID  (left = 2fr, right = 1fr) ───────── */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        {/* LEFT COLUMN ────────────────────────────────── */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <SectionHeading title="Upcoming Deadlines">
            </SectionHeading>
  
            <CardContent className="p-0">
              {deadlines.map((d, i) => (
                <div className="px-4">
                  <div
                    key={d.title}
                    className={clsx(
                      "flex justify-between items-start p-4 rounded-md bg-muted/60 transition-colors duration-200",
                      "hover:bg-muted/90",             
                      "px-6",                          
                      i !== deadlines.length - 1 && "mb-3"
                    )}
                  >
                  <div className="space-y-1">
                    <div className="font-medium flex items-center gap-2">
                      {d.title}
                      <PriorityPill level={computePriority(d.weight, d.difficulty)} />
                      <CoursePill>{courseMap[d.courseId] ?? "Unknown Course"}</CoursePill>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <AlarmClock className="h-3 w-3" />
                      {new Date(d.dueDate).toLocaleDateString()} · {d.type}

                    </p>
                  </div>
                    <Button variant="link" size="sm">
                      View Details
                    </Button>
                  </div>
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

/* ───────── helper components ───────── */

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
    <span className={`text-[13px] px-3 py-0.5 rounded-full capitalize ${color}`}>
      {level}
    </span>
  );
}

function CoursePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[13px] px-3 py-0.5 rounded-full bg-muted text-muted-foreground">
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

