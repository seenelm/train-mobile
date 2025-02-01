export const daysOfWeek: string[] = ["S", "M", "T", "W", "T", "F", "S"];

export const getMonthName = (date: Date): string => {
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[date.getMonth()];
};

export const getCurrentWeek = (date: Date): Date[] => {
  const weekStart = date.getDate() - date.getDay();
  return Array.from(
    { length: 7 },
    (_, i) => new Date(date.getFullYear(), date.getMonth(), weekStart + i)
  );
};

export const getAllWeeksInYear = (year: number): Date[][] => {
  const dateInFirstWeek = new Date(year, 0, 1);
  while (dateInFirstWeek.getDay() !== 0) {
    dateInFirstWeek.setDate(dateInFirstWeek.getDate() - 1);
  }

  const weeksInYear: Date[][] = [];
  while (dateInFirstWeek.getFullYear() <= year) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(dateInFirstWeek));
      dateInFirstWeek.setDate(dateInFirstWeek.getDate() + 1);
    }
    weeksInYear.push(week);
  }

  return weeksInYear;
};
