import { Button } from "@/components/ui/button";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { TomeIcon } from "@/components/custom/tomeIcon";
import { useCourses } from "@/hooks/useCourses";

type CourseTab = { code: string; icon?: JSX.Element };

export function Header() {
    const courses = useCourses();

    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
            {/* ───────── LEFT: logo + text ───────── */}
            <Link to="/" className="flex items-center gap-3">
            <TomeIcon />
            <div className="-space-y-1">
                <h1 className="font-semibold text-xl text-gradient">
                Tome
                </h1>
            </div>
            </Link>

            {/* ───────── RIGHT: nav buttons ───────── */}
            <nav className="flex items-center gap-6">
            {/* Dashboard button */}
            <Link to="/">
                <Button className="gap-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition cursor-pointer">
                <Calendar className="h-4 w-4" /> Dashboard
                </Button>
            </Link>

            {/* Course tabs */}
            {courses.map((c) => (
                <Link
                key={c.courseCode}
                to={`/courses/${encodeURIComponent(c.courseCode)}`}
                className="inline-flex items-center gap-1 text-sm hover:text-blue-700 transition cursor-pointer"
                >
                <GraduationCap className="h-4 w-4" />
                {c.courseCode}
                </Link>
            ))}
            </nav>
        </div>
        </header>
    );
}
