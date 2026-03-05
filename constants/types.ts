
export type TimePeriod = "day" | "week" | "month" | "year";
export type Todo = {
    id: string;
    timestamp: string; // formatted date with timezone included
    title: string;
    description: string;
    metricOfExecution?: string;
}