/**
 * @description 주어진 날짜에 특정 일수를 더합니다.
 * @param date - 원본 날짜.
 * @param days - 더할 일수.
 * @returns 일수가 더해진 새로운 날짜 객체.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * @description 주어진 날짜에 특정 시간를 더합니다.
 * @param date - 원본 날짜.
 * @param hours - 더할 시간.
 * @returns 시간이 더해진 새로운 날짜 객체.
 */
export function addHours(date: Date, hours: number): Date {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}

/**
 * @description 주어진 날짜가 현재 시간 기준으로 만료되었는지 확인합니다.
 * @param date - 확인할 날짜.
 * @returns 만료되었으면 true, 그렇지 않으면 false.
 */
export function isExpired(date: Date): boolean {
  return date < new Date();
}

/**
 * @description 날짜를 한국 시간 형식(YYYY. MM. DD. HH:mm)의 문자열로 변환합니다.
 * @param date - 변환할 날짜.
 * @returns 한국 시간 형식의 문자열.
 */
export function formatToKorean(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * @description 날짜를 ISO 8601 형식의 문자열로 변환합니다.
 * @param date - 변환할 날짜.
 * @returns ISO 형식의 문자열.
 */
export function formatToISO(date: Date): string {
  return date.toISOString();
}

/**
 * @description 주어진 날짜의 시작 시간(00:00:00)을 반환합니다.
 * @param date - 기준 날짜.
 * @returns 해당 날짜의 시작 시간을 나타내는 새로운 날짜 객체.
 */
export function getStartOfDay(date: Date): Date {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
}

/**
 * @description 주어진 날짜의 마지막 시간(23:59:59)을 반환합니다.
 * @param date - 기준 날짜.
 * @returns 해당 날짜의 마지막 시간을 나타내는 새로운 날짜 객체.
 */
export function getEndOfDay(date: Date): Date {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
}

/**
 * @description 주어진 날짜가 속한 달의 시작일(1일 00:00:00)을 반환합니다.
 * @param date - 기준 날짜.
 * @returns 해당 월의 시작일을 나타내는 새로운 날짜 객체.
 */
export function getStartOfMonth(date: Date): Date {
  const start = new Date(date);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return start;
}

/**
 * @description 주어진 날짜가 속한 달의 마지막일(23:59:59)을 반환합니다.
 * @param date - 기준 날짜.
 * @returns 해당 월의 마지막일을 나타내는 새로운 날짜 객체.
 */
export function getEndOfMonth(date: Date): Date {
  const end = new Date(date);
  end.setMonth(end.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return end;
}

/**
 * @description 두 날짜 사이의 일수 차이를 계산합니다.
 * @param start - 시작 날짜.
 * @param end - 종료 날짜.
 * @returns 두 날짜 사이의 일수.
 */
export function daysBetween(start: Date, end: Date): number {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * @description 두 날짜 사이의 시간 차이를 계산합니다.
 * @param start - 시작 날짜.
 * @param end - 종료 날짜.
 * @returns 두 날짜 사이의 시간.
 */
export function hourseBetween(start: Date, end: Date): number {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60));
}

/**
 * @description 주어진 날짜가 오늘인지 확인합니다.
 * @param date - 확인할 날짜.
 * @returns 오늘이면 true, 그렇지 않으면 false.
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

/**
 * @description 두 날짜가 같은 날인지 확인합니다.
 * @param date1 - 첫 번째 날짜.
 * @param date2 - 두 번째 날짜.
 * @returns 같은 날이면 true, 그렇지 않으면 false.
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.toDateString() === date2.toDateString();
}

/**
 * @description 주어진 날짜가 현재로부터 얼마나 지났는지 상대적인 시간 문자열로 반환합니다.
 * @param date - 기준 날짜.
 * @returns "N일 전", "N시간 전", "N분 전", "방금 전" 형식의 문자열.
 */
export function fromNow(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 0) return `${diffDays}일 전`;
  if (diffHours > 0) return `${diffHours}시간 전`;
  if (diffMinutes > 0) return `${diffMinutes}분 전`;
  return '방금 전';
}
