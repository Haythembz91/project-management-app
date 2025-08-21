import {priorities, status, ViewMode} from "@/libs/enums";
export const statusList = [status.COMPLETED, status.IN_PROGRESS, status.PLANNING, status.ON_HOLD, status.CANCELLED]

export const priorityList = [priorities.LOW, priorities.MEDIUM, priorities.HIGH]

export const viewModeList = [ViewMode.WEEK, ViewMode.MONTH, ViewMode.YEAR, ViewMode.DAY]