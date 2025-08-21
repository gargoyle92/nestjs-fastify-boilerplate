/**
 * 객체에서 특정 필드를 제외합니다.
 * @param obj - 원본 객체.
 * @param fields - 제외할 필드의 키 배열.
 * @returns 특정 필드가 제외된 새로운 객체.
 */
export function excludeFields<T, K extends keyof T>(obj: T, fields: K[]): Omit<T, K> {
  const result = { ...obj };
  fields.forEach((field) => delete result[field]);
  return result;
}

/**
 * 객체에서 특정 필드만 선택합니다.
 * @param obj - 원본 객체.
 * @param fields - 선택할 필드의 키 배열.
 * @returns 특정 필드만 포함된 새로운 객체.
 */
export function pickFields<T, K extends keyof T>(obj: T, fields: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  fields.forEach((field) => {
    if (obj[field] !== undefined) {
      result[field] = obj[field];
    }
  });
  return result;
}

/**
 * 엔티티가 null 또는 undefined가 아닌 유효한 값인지 확인합니다.
 * @param entity - 확인할 값.
 * @returns 유효한 엔티티이면 true, 아니면 false.
 */
export function isValidEntity<T>(entity: T | null | undefined): entity is T {
  return entity !== null && entity !== undefined;
}

/**
 * 배열에서 유효한(null 또는 undefined가 아닌) 엔티티들만 필터링합니다.
 * @param entities - 필터링할 엔티티 배열.
 * @returns 유효한 엔티티만 포함된 새로운 배열.
 */
export function filterValidEntities<T>(entities: (T | null | undefined)[]): T[] {
  return entities.filter(isValidEntity);
}

/**
 * 객체에서 falsy (null, undefined, '', false) 값들을 제거합니다.
 * @param obj - 정리할 객체.
 * @returns Falsy 값들이 제거된 새로운 객체.
 */
export function omitFalsyValues<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== null && value !== undefined && value !== '' && value !== false) {
      result[key as keyof T] = value;
    }
  });

  return result;
}

/**
 * 객체나 배열을 깊은 복사합니다.
 * @param obj - 복사할 객체 또는 배열.
 * @returns 깊은 복사된 새로운 객체 또는 배열.
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as unknown as T;

  const cloned = {} as T;
  Object.keys(obj).forEach((key) => {
    cloned[key as keyof T] = deepClone((obj as any)[key]);
  });

  return cloned;
}

/**
 * 두 객체를 병합합니다. source 객체의 속성이 target 객체의 속성을 덮어씁니다.
 * @param target - 기준이 될 객체.
 * @param source - 추가할 객체.
 * @returns 병합된 새로운 객체.
 */
export function mergeObjects<T, U>(target: T, source: U): T & U {
  return { ...target, ...source };
}
