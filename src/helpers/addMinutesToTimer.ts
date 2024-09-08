import dayjs from "dayjs";

export function addMinutesToCurrentTime(startTime: dayjs.Dayjs, minutes: number) {
    const newTime = startTime.add(minutes, 'minute');
    return newTime.format('YYYY-MM-DD HH:mm:ss');
  }