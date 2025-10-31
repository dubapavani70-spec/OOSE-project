import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { pgTable, text, varchar, integer, date, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
-0
+65
  password: text("password").notNull(),
});
export const cycleRecords = pgTable("cycle_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  cycleLength: integer("cycle_length"),
  flowIntensity: text("flow_intensity"),
  notes: text("notes"),
});
export const symptomLogs = pgTable("symptom_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  date: date("date").notNull(),
  painLevel: integer("pain_level"),
  cramps: boolean("cramps"),
  backPain: boolean("back_pain"),
  spotting: boolean("spotting"),
  flowIntensity: text("flow_intensity"),
  mood: text("mood"),
  notes: text("notes"),
});
export const medicalHistory = pgTable("medical_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  familyHistory: text("family_history"),
  medications: text("medications"),
  allergies: text("allergies"),
  conditions: text("conditions"),
});
export const healthRisks = pgTable("health_risks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  riskType: text("risk_type").notNull(),
  severity: text("severity").notNull(),
  detectedDate: date("detected_date").notNull(),
  recommendations: text("recommendations"),
});
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
export const insertCycleRecordSchema = createInsertSchema(cycleRecords).omit({
  id: true,
});
export const insertSymptomLogSchema = createInsertSchema(symptomLogs).omit({
  id: true,
});
export const insertMedicalHistorySchema = createInsertSchema(medicalHistory).omit({
  id: true,
});
export const insertHealthRiskSchema = createInsertSchema(healthRisks).omit({
  id: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type CycleRecord = typeof cycleRecords.$inferSelect;
export type InsertCycleRecord = z.infer<typeof insertCycleRecordSchema>;
export type SymptomLog = typeof symptomLogs.$inferSelect;
export type InsertSymptomLog = z.infer<typeof insertSymptomLogSchema>;
export type MedicalHistory = typeof medicalHistory.$inferSelect;
export type InsertMedicalHistory = z.infer<typeof insertMedicalHistorySchema>;
export type HealthRisk = typeof healthRisks.$inferSelect;
export type InsertHealthRisk = z.infer<typeof insertHealthRiskSchema>;
Set up initial user interface for women's health platform
i want to create a website about Women Health Care in which i'll give inputs as mensural cycle tracking and prediction,symptom logging,health risk detection for pcod tyrod,anemia, and tell them to condiser the doctor, health guidence diet exercide stress management and also can add personal and life style inputs flow intensity cycle length and irregularity,duration of bleeding , spotting between periods,pain level cramps and backpain family background and medical usage for medical histry inputs

1 hour ago
I'll help you create a comprehensive women's health care 