import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}



//part2
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      data-testid="button-theme-toggle"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

//part3
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/Women_wellness_hero_image_e11f224b.png";

export function HeroSection() {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/20" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-white mb-4" data-testid="text-hero-title">
          Your Health, Your Way
        </h1>
        <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
          Track your menstrual cycle, log symptoms, detect health risks, and receive personalized wellness guidance
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-white text-primary border border-white hover-elevate active-elevate-2"
            data-testid="button-get-started"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/10 text-white border-white/30 backdrop-blur-sm hover-elevate active-elevate-2"
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
          <div className="flex items-center gap-2 text-white">
            <Heart className="h-5 w-5" />
            <span className="text-sm">Cycle Tracking</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Shield className="h-5 w-5" />
            <span className="text-sm">Risk Detection</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm">AI Guidance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
 //part4
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CycleDay {
  date: number;
  flowIntensity?: "light" | "medium" | "heavy";
  isPredicted?: boolean;
}

export function CycleCalendar() {
  const [currentMonth] = useState(new Date());
  
  // todo: remove mock functionality
  const mockCycleDays: CycleDay[] = [
    { date: 5, flowIntensity: "heavy" },
    { date: 6, flowIntensity: "heavy" },
    { date: 7, flowIntensity: "medium" },
    { date: 8, flowIntensity: "light" },
    { date: 9, flowIntensity: "light" },
    { date: 28, flowIntensity: "light", isPredicted: true },
    { date: 29, flowIntensity: "medium", isPredicted: true },
  ];

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getFlowColor = (intensity?: string, isPredicted?: boolean) => {
    if (isPredicted) return "bg-primary/20 border-2 border-primary border-dashed";
    if (intensity === "heavy") return "bg-chart-2";
    if (intensity === "medium") return "bg-chart-3";
    if (intensity === "light") return "bg-chart-1/30";
    return "";
  };

  return (
    <Card data-testid="card-cycle-calendar">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle className="text-xl">Cycle Calendar</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" data-testid="button-prev-month">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium" data-testid="text-current-month">
            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <Button variant="ghost" size="icon" data-testid="button-next-month">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {emptyDays.map((i) => (
            <div key={`empty-${i}`} />
          ))}
          {days.map((day) => {
            const cycleDay = mockCycleDays.find((d) => d.date === day);
            return (
              <button
                key={day}
                className={`
                  aspect-square rounded-md flex items-center justify-center text-sm
                  hover-elevate active-elevate-2
                  ${cycleDay ? getFlowColor(cycleDay.flowIntensity, cycleDay.isPredicted) : ""}
                  ${day === new Date().getDate() ? "ring-2 ring-ring" : ""}
                `}
                data-testid={`button-calendar-day-${day}`}
              >
                {day}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-chart-2" />
            <span className="text-xs text-muted-foreground">Heavy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-chart-3" />
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-chart-1/30" />
            <span className="text-xs text-muted-foreground">Light</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-primary/20 border-2 border-primary border-dashed" />
            <span className="text-xs text-muted-foreground">Predicted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
//part5
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save } from "lucide-react";
import { format } from "date-fns";

export function SymptomLogger() {
  const [date, setDate] = useState<Date>(new Date());
  const [painLevel, setPainLevel] = useState([5]);
  const [symptoms, setSymptoms] = useState({
    cramps: false,
    backPain: false,
    spotting: false,
    headache: false,
    bloating: false,
    moodSwings: false,
  });
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    console.log("Saving symptoms:", { date, painLevel: painLevel[0], symptoms, notes });
  };

  return (
    <Card data-testid="card-symptom-logger">
      <CardHeader>
        <CardTitle className="text-xl">Log Symptoms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                data-testid="button-select-date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Pain Level</Label>
            <span className="text-sm font-medium" data-testid="text-pain-level">
              {painLevel[0]}/10
            </span>
          </div>
          <Slider
            value={painLevel}
            onValueChange={setPainLevel}
            max={10}
            step={1}
            data-testid="slider-pain-level"
          />
        </div>

        <div className="space-y-3">
          <Label>Symptoms</Label>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(symptoms).map(([key, checked]) => (
              <div key={key} className="flex items-center gap-2">
                <Checkbox
                  id={key}
                  checked={checked}
                  onCheckedChange={(c) =>
                    setSymptoms({ ...symptoms, [key]: c as boolean })
                  }
                  data-testid={`checkbox-${key}`}
                />
                <label
                  htmlFor={key}
                  className="text-sm capitalize cursor-pointer"
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any other symptoms or observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="resize-none"
            rows={3}
            data-testid="textarea-notes"
          />
        </div>

        <Button 
          className="w-full" 
          onClick={handleSave}
          data-testid="button-save-symptoms"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Symptoms
        </Button>
      </CardContent>
    </Card>
  );
}
//part6
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface HealthRiskCardProps {
  title: string;
  severity: "low" | "moderate" | "high";
  description: string;
  recommendations: string[];
}

export function HealthRiskCard({ title, severity, description, recommendations }: HealthRiskCardProps) {
  const getSeverityColor = () => {
    if (severity === "high") return "destructive";
    if (severity === "moderate") return "default";
    return "secondary";
  };

  const getSeverityIcon = () => {
    if (severity === "high") return <AlertTriangle className="h-4 w-4" />;
    if (severity === "moderate") return <Info className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  return (
    <Card data-testid={`card-health-risk-${title.toLowerCase().replace(/\s/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Badge variant={getSeverityColor()} className="gap-1" data-testid="badge-severity">
          {getSeverityIcon()}
          {severity}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground" data-testid="text-description">
          {description}
        </p>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Recommendations:</h4>
          <ul className="space-y-1">
            {recommendations.map((rec, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {severity === "high" && (
          <Button variant="destructive" className="w-full" data-testid="button-consult-doctor">
            Consult a Doctor
          </Button>
        )}
      </CardContent>
    </Card>
  );
}



