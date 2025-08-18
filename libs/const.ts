import {priorities, status} from "@/libs/enums";
export const statusList = [status.COMPLETED, status.IN_PROGRESS, status.PLANNING, status.ON_HOLD, status.CANCELLED]

export const priorityList = [priorities.LOW, priorities.MEDIUM, priorities.HIGH]

export const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_VERCEL_BASE_URL : process.env.NEXT_PUBLIC_BASE_URL