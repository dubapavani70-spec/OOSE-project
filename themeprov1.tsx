//part7
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Apple, Dumbbell, Brain, LucideIcon } from "lucide-react";

interface HealthGuidanceCardProps {
  category: "diet" | "exercise" | "stress";
  title: string;
  recommendations: string[];
}

export function HealthGuidanceCard({ category, title, recommendations }: HealthGuidanceCardProps) {
  const getCategoryIcon = (): LucideIcon => {
    if (category === "diet") return Apple;
    if (category === "exercise") return Dumbbell;
    return Brain;
  };

  const getCategoryColor = () => {
    if (category === "diet") return "bg-chart-4/10 text-chart-4";
    if (category === "exercise") return "bg-chart-3/10 text-chart-3";
    return "bg-chart-1/10 text-chart-1";
  };

  const Icon = getCategoryIcon();

  return (
    <Card data-testid={`card-guidance-${category}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getCategoryColor()}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <Badge variant="secondary" className="mb-1 capitalize">
              {category}
            </Badge>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((rec, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
//part8
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Calendar, TrendingUp, Heart } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, subtitle, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold" data-testid={`text-stat-${title.toLowerCase().replace(/\s/g, '-')}`}>
              {value}
            </p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  // todo: remove mock functionality
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-testid="container-dashboard-stats">
      <StatCard
        title="Current Cycle"
        value="Day 14"
        subtitle="28 day average"
        icon={<Calendar className="h-6 w-6" />}
      />
      <StatCard
        title="Next Period"
        value="In 14 days"
        subtitle="Oct 23, 2025"
        icon={<Activity className="h-6 w-6" />}
      />
      <StatCard
        title="Cycle Regularity"
        value="92%"
        subtitle="Very consistent"
        icon={<TrendingUp className="h-6 w-6" />}
      />
      <StatCard
        title="Health Score"
        value="Good"
        subtitle="No risks detected"
        icon={<Heart className="h-6 w-6" />}
      />
    </div>
  );
}
part9
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Calendar,
  Activity,
  AlertTriangle,
  Heart,
  User,
  Sparkles,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Cycle Tracking",
    url: "/cycle",
    icon: Calendar,
  },
  {
    title: "Symptoms",
    url: "/symptoms",
    icon: Activity,
  },
  {
    title: "Health Risks",
    url: "/risks",
    icon: AlertTriangle,
  },
  {
    title: "Health Guidance",
    url: "/guidance",
    icon: Sparkles,
  },
  {
    title: "Medical History",
    url: "/medical-history",
    icon: Heart,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">CareCircle</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
//part10
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export function MedicalHistoryForm() {
  const [formData, setFormData] = useState({
    familyHistory: "",
    medications: "",
    allergies: "",
    conditions: "",
  });

  const handleSave = () => {
    console.log("Saving medical history:", formData);
  };

  return (
    <Card data-testid="card-medical-history">
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="familyHistory">Family Medical History</Label>
          <Textarea
            id="familyHistory"
            placeholder="Any family history of PCOD, thyroid issues, anemia, or other conditions..."
            value={formData.familyHistory}
            onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
            rows={3}
            data-testid="textarea-family-history"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="medications">Current Medications</Label>
          <Textarea
            id="medications"
            placeholder="List any medications you're currently taking..."
            value={formData.medications}
            onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
            rows={3}
            data-testid="textarea-medications"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="allergies">Allergies</Label>
          <Textarea
            id="allergies"
            placeholder="Any known allergies..."
            value={formData.allergies}
            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
            rows={2}
            data-testid="textarea-allergies"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="conditions">Existing Conditions</Label>
          <Textarea
            id="conditions"
            placeholder="Any diagnosed conditions or ongoing health concerns..."
            value={formData.conditions}
            onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
            rows={3}
            data-testid="textarea-conditions"
          />
        </div>

        <Button className="w-full" onClick={handleSave} data-testid="button-save-medical-history">
          <Save className="mr-2 h-4 w-4" />
          Save Medical History
        </Button>
      </CardContent>
    </Card>
  );
}
//part11