/* If you add priorities to this enum, those will be added automatically */
export enum Priority {
    high = "high",
    medium = "medium",
    low = "low",
};

export type TaskState = 'completed' | 'pending';

export interface Task {
    id: string;
    text: string;
    priority: Priority;
    state: TaskState;
    timeSpent: number;
    timestamp: number;
}