import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Pause, Play, RotateCcw, AlarmClock, Heart, AlertTriangle, Shield } from "lucide-react";

const FOCUS_MINUTES = 25;          // change to 50 for long sessions, etc.
const TOTAL_SECONDS = FOCUS_MINUTES * 60;

export function FocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number>();

  // start / pause toggle
  const toggle = () => setRunning((r) => !r);

  // reset button
  const reset = () => {
    setRunning(false);
    setSecondsLeft(TOTAL_SECONDS);
  };

  // tick every second while running
  useEffect(() => {
    if (!running) return;

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // cleanup on pause/unmount
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const percent = ((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * 100;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlarmClock className="h-5 w-5" /> Focus Timer
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <span className="font-bold text-4xl tracking-wider text-blue-700">
          {minutes}:{seconds}
        </span>

        <p className="text-xs text-muted-foreground">
          Focus Session · Sessions completed: 0
        </p>

        <div className="flex gap-2">
          <Button 
          size="icon" 
          onClick={toggle}
          className="rounded-md bg-blue-600 hover:bg-blue-700 text-white p-3 transition-colors duration-200 cursor-pointer"
          >
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button 
          size="icon" 
          variant="outline" 
          onClick={reset}
          className="cursor-pointer">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <Progress value={percent} className="w-full h-1 bg-muted" />
      </CardContent>
    </Card>
  );
}
