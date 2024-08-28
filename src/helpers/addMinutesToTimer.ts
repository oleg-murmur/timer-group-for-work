import dayjs from "dayjs";

export function addMinutesToCurrentTime(startTime: dayjs.Dayjs, minutes: number) {
    // Прибавляем указанное количество минут
    const newTime = startTime.add(minutes, 'minute');
    // Возвращаем время в формате строки
    return newTime.format('YYYY-MM-DD HH:mm:ss');
  }