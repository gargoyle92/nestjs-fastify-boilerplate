/**
 * @description 문자열이 유효한 이메일 형식인지 확인합니다.
 * @param email - 확인할 문자열.
 * @returns 이메일 형식이면 true, 그렇지 않으면 false.
 */
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * @description 문자열이 유효한 대한민국 휴대폰 번호 형식인지 확인합니다.
 * @param phone - 확인할 문자열.
 * @returns 휴대폰 번호 형식이면 true, 그렇지 않으면 false.
 */
export function isPhoneNumber(phone: string): boolean {
  const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * @description 문자열이 유효한 MAC 주소 형식인지 확인합니다.
 * @param mac - 확인할 문자열.
 * @returns MAC 주소 형식이면 true, 그렇지 않으면 false.
 */
export function isMacAddress(mac: string): boolean {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
}

/**
 * @description 문자열이 유효한 IP 주소(IPv4) 형식인지 확인합니다.
 * @param ip - 확인할 문자열.
 * @returns IP 주소 형식이면 true, 그렇지 않으면 false.
 */
export function isIPAddress(ip: string): boolean {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
}

/**
 * @description 문자열이 유효한 UUID 형식인지 확인합니다.
 * @param uuid - 확인할 문자열.
 * @returns UUID 형식이면 true, 그렇지 않으면 false.
 */
export function isUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * @description 문자열이 유효한 CID 형식인지 확인합니다.
 * @param cid - 확인할 문자열.
 * @returns CID 형식이면 true, 그렇지 않으면 false.
 */
export function isCID(cid: string): boolean {
  const cidRegex = /^[0-9a-f]{32}$/i;
  return cidRegex.test(cid);
}

/**
 * @description 문자열에서 잠재적인 XSS 공격 문자를 제거하여 소독합니다.
 * @param input - 소독할 원본 문자열.
 * @returns 소독된 문자열.
 */
export function sanitizeString(input: string): string {
  return input.replace(/[<>\"'%;()&+]/g, '');
}
