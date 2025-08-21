import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

/**
 * @description 일반 비밀번호를 해시하여 암호화합니다.
 * @param password - 암호화할 비밀번호.
 * @returns 해시된 비밀번호 문자열.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * @description 일반 비밀번호와 해시된 비밀번호를 비교합니다.
 * @param password - 사용자가 입력한 일반 비밀번호.
 * @param hashedPassword - 데이터베이스에 저장된 해시된 비밀번호.
 * @returns 일치하면 true, 그렇지 않으면 false.
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * @description 비밀번호가 특정 규칙을 만족하는지 검증합니다.
 * (8자 이상, 소문자, 대문자, 숫자 각각 1개 이상 포함)
 * @param password - 검증할 비밀번호.
 * @returns 검증 결과와 오류 메시지 배열을 포함하는 객체.
 */
export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return { isValid: errors.length === 0, errors };
}
