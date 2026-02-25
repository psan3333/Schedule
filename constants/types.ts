export type TimePeriod = "week" | "month" | "3 months" | "year";
export type Todo = {
    id: string;
    timestamp: string; // formatted date with timezone included
    title: string;
    description: string;
    metricOfExecution?: string;
}