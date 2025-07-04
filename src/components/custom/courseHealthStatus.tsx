import { Heart, AlertTriangle, Shield } from "lucide-react";

export function CourseHealthStatus({ status }: { status: "Healthy" | "At Risk" | "Moderate" }) {
  let icon, bgColor, textColor;

  switch (status) {
    case "Healthy":
      icon = <Heart className="h-4 w-4 text-green-800" />;
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    case "At Risk":
      icon = <AlertTriangle className="h-4 w-4 text-red-800" />;
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      break;
    case "Moderate":
      icon = <Shield className="h-4 w-4 text-yellow-800" />;
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>
      {icon}
      {status}
    </span>
  );
}
