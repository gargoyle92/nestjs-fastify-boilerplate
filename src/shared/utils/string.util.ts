/**
 * @description 지정된 길이의 무작위 문자열을 생성합니다. (알파벳 대소문자, 숫자 조합)
 * @param length - 생성할 문자열의 길이.
 * @returns 생성된 무작위 문자열.
 */
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * @description 문자열을 URL 슬러그(slug) 형식으로 변환합니다.
 * (소문자 변환, 특수문자 제거, 공백/하이픈을 단일 하이픈으로 변경)
 * @param text - 변환할 문자열.
 * @returns 슬러그 형식의 문자열.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * @description 문자열을 지정된 최대 길이로 자르고, 필요시 접미사를 추가합니다.
 * @param text - 자를 원본 문자열.
 * @param maxLength - 최대 길이.
 * @param suffix - 잘렸을 때 추가할 접미사 (기본값: '...').
 * @returns 잘린 문자열.
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * @description 이메일 주소의 사용자 아이디 부분을 마스킹 처리합니다. (앞 두 글자 제외)
 * @param email - 마스킹할 이메일 주소.
 * @returns 마스킹 처리된 이메일 주소.
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (username.length <= 2) return email;

  const masked = username.substring(0, 2) + '*'.repeat(username.length - 2);
  return `${masked}@${domain}`;
}

/**
 * @description 문자열에서 모든 숫자들을 추출하여 숫자 배열로 반환합니다.
 * @param text - 숫자를 추출할 문자열.
 * @returns 추출된 숫자들의 배열.
 */
export function extractNumbers(text: string): number[] {
  const matches = text.match(/\d+/g);
  return matches ? matches.map(Number) : [];
}

/**
 * @description IP와 UserAgent를 기반으로 클라이언트 ID를 생성합니다.
 * @param ipAddress - 클라이언트 IP 주소.
 * @param userAgent - 브라우저/앱 User-Agent 정보.
 * @returns 생성된 기기 ID (같은 기기에서는 동일한 ID 생성).
 */
export function generateClientId(ipAddress?: string, userAgent?: string): string {
  const ip = ipAddress || 'unknown';
  const ua = userAgent || 'unknown';

  // timestamp 제거 - 안정적인 기기 식별자 생성
  const combined = `${ip}-${ua}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 32-bit integer로 변환
  }

  // 더 안정적인 해시 기반 ID 생성
  return 'client_' + Math.abs(hash).toString(36).padStart(8, '0');
}

/**
 * @description 6자리 난수 코드를 생성합니다. (알파벳 대문자 + 숫자 조합)
 * 혼동하기 쉬운 문자들(0, O, I, 1, L)은 제외됩니다.
 * @returns 6자리 알파벳+숫자 코드 (예: "A3B7K9")
 */
export function generateSixDigitCode(): string {
  // 혼동하기 쉬운 문자 제외: 0(영), O(오), I(아이), 1(일), L(엘)
  const chars = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  let result = '';

  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * @description 고유한 세션 ID를 생성합니다 (매번 다른 값).
 * @returns 생성된 세션 ID.
 */
export function generateSessionId(): string {
  const timestamp = Date.now().toString();
  const random = generateRandomString(12);
  return `session_${timestamp}_${random}`;
}
