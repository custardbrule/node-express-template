export class DateHelper {
  static FromTicks(ticks: number) {
    return new Date(ticks);
  }

  static ToTicks(date: Date) {
    return date.getTime();
  }
}
