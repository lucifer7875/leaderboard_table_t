import { z } from "zod";

export const activitySchema = z.object({
    name: z.object({
        label: z.string().optional(),
        value: z.string().optional(),
    }).refine((data) => data.label && data.value, {
        message: "Name is required",
    }),
    activity: z.object({
        label: z.string().optional(),
        value: z.string().optional(),
    }).refine((data) => data.label && data.value, {
        message: "Activity is required",
    }),
    period: z.object({
        label: z.string().optional(),
        value: z.string().optional(),
    }).refine((data) => data.label && data.value, {
        message: "Period is required",
    }),
});

export const filterSchema = z.object({
    search: z.string().optional(),
    period: z.object({
        label: z.string().optional(),
        value: z.string().optional(),
    }).optional()
    
});
