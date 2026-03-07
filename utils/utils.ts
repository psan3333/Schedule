import { TimePeriod } from "@/constants/types";
import { TZDate } from "@date-fns/tz";
import { subDays, subMonths } from "date-fns";

export const getPeriodLookup = (currDate: TZDate, period: TimePeriod) => {
    switch (period) {
        case "day":
            return currDate;
        case "week":
            return subDays(currDate, 6);
        case "month":
            return subDays(currDate, 29);
        case "year":
            return subMonths(currDate, 11);
        default:
            // default - week
            return subDays(currDate, 6);
    }
}