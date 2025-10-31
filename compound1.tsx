import { HealthRiskCard } from '../HealthRiskCard';

export default function HealthRiskCardExample() {
  return (
    <div className="space-y-4">
      <HealthRiskCard
        title="PCOD Risk"
        severity="moderate"
        description="Your symptoms and cycle irregularity suggest a moderate risk for PCOD. We recommend consulting a healthcare provider for proper diagnosis."
        recommendations={[
          "Schedule an appointment with a gynecologist",
          "Track your symptoms consistently",
          "Maintain a balanced diet low in refined carbs"
        ]}
      />
      <HealthRiskCard
        title="Anemia Risk"
        severity="high"
        description="Heavy flow and fatigue patterns indicate possible anemia. Please consult a doctor for blood tests."
        recommendations={[
          "Consult a doctor immediately",
          "Increase iron-rich foods in your diet",
          "Consider iron supplements (after medical advice)"
        ]}
      />

    </div>
  );
}
//part5
import { HealthGuidanceCard } from '../HealthGuidanceCard';

export default function HealthGuidanceCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <HealthGuidanceCard
        category="diet"
        title="Nutrition Plan"
        recommendations={[
          "Increase iron-rich foods like spinach and lentils",
          "Add vitamin B12 sources to your diet",
          "Stay hydrated with 8 glasses of water daily",
          "Reduce caffeine during menstruation"
        ]}
      />
      <HealthGuidanceCard
        category="exercise"
        title="Exercise Routine"
        recommendations={[
          "30 minutes of light yoga during periods",
          "Gentle walking to reduce cramps",
          "Avoid high-intensity workouts on heavy days",
          "Stretching exercises for back pain relief"
        ]}
      />
      <HealthGuidanceCard
        category="stress"
        title="Stress Management"
        recommendations={[
          "Practice meditation for 10 minutes daily",
          "Maintain a regular sleep schedule",
          "Try deep breathing exercises",
          "Journal your thoughts and feelings"
        ]}
      />
    </div>
  );
}
//part6
import { DashboardStats } from '../DashboardStats';

export default function DashboardStatsExample() {
  return <DashboardStats />;
}
//part7
import { MedicalHistoryForm } from '../MedicalHistoryForm';

export default function MedicalHistoryFormExample() {
  return <MedicalHistoryForm />;
}
//part8
