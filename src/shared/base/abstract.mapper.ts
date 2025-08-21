/**
 * @class AbstractMapper
 * @description 엔티티와 DTO 간의 변환을 처리하는 추상 클래스.
 * @template TEntity - 데이터베이스 엔티티 타입.
 * @template TDto - 데이터 전송 객체(DTO) 타입.
 * @template TOptions - 매핑 옵션 타입.
 */
export abstract class AbstractMapper<TEntity, TDto, TOptions = any> {
  /**
   * @abstract
   * @description 엔티티를 DTO로 변환합니다. 하위 클래스에서 반드시 구현해야 합니다.
   * @param entity - 변환할 엔티티.
   * @param options - 매핑 옵션.
   * @returns 변환된 DTO.
   */
  abstract toDto(entity: TEntity, options?: TOptions): TDto;

  /**
   * @description null일 수 있는 엔티티를 DTO로 변환합니다. 엔티티가 null이면 null을 반환합니다.
   * @param entity - 변환할 엔티티 또는 null.
   * @param options - 매핑 옵션.
   * @returns 변환된 DTO 또는 null.
   */
  toDtoNullable(entity: TEntity | null, options?: TOptions): TDto | null {
    return entity ? this.toDto(entity, options) : null;
  }

  /**
   * @description 엔티티 배열을 DTO 배열로 변환합니다.
   * @param entities - 변환할 엔티티 배열.
   * @param options - 매핑 옵션.
   * @returns 변환된 DTO 배열.
   */
  toDtoArray(entities: TEntity[], options?: TOptions): TDto[] {
    return entities.map((entity) => this.toDto(entity, options));
  }

  /**
   * @protected
   * @description 엔티티 배열에서 null 또는 undefined인 항목을 필터링합니다.
   * @param entities - 필터링할 엔티티 배열.
   * @returns 유효한 엔티티만 포함된 배열.
   */
  protected filterValidEntities(entities: (TEntity | null | undefined)[]): TEntity[] {
    return entities.filter((entity): entity is TEntity => entity !== null && entity !== undefined);
  }

  /**
   * @protected
   * @description null 또는 undefined를 포함할 수 있는 엔티티 배열을 필터링한 후 DTO 배열로 변환합니다.
   * @param entities - 변환할 엔티티 배열 (null, undefined 포함 가능).
   * @param options - 매핑 옵션.
   * @returns 변환된 DTO 배열.
   */
  protected toDtoArrayFiltered(entities: (TEntity | null | undefined)[], options?: TOptions): TDto[] {
    const validEntities = this.filterValidEntities(entities);
    return this.toDtoArray(validEntities, options);
  }

  /**
   * @protected
   * @description 주어진 조건이 참일 경우에만 값을 반환하는 헬퍼 메서드.
   * @param condition - boolean 조건.
   * @param value - 조건이 참일 때 반환할 값.
   * @returns 조건이 참이면 값, 거짓이면 undefined.
   */
  protected mapIf<T>(condition: boolean, value: T): T | undefined {
    return condition ? value : undefined;
  }

  /**
   * @protected
   * @description 옵션에 따라 관계(relation)를 포함해야 하는지 여부를 확인하는 헬퍼 메서드.
   * @param options - 매핑 옵션.
   * @returns 관계를 포함해야 하면 true, 아니면 false.
   */
  protected shouldIncludeRelations(options?: TOptions): boolean {
    return (options as any)?.includeRelations === true;
  }

  /**
   * @protected
   * @description 옵션에 따라 삭제된 항목을 포함해야 하는지 여부를 확인하는 헬퍼 메서드.
   * @param options - 매핑 옵션.
   * @returns 삭제된 항목을 포함해야 하면 true, 아니면 false.
   */
  protected shouldIncludeDeleted(options?: TOptions): boolean {
    return (options as any)?.includeDeleted === true;
  }
}
