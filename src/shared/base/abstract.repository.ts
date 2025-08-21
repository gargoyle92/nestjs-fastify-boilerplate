/**
 * @class AbstractRepository
 * @description Prisma 모델에 대한 일반적인 데이터 접근 작업을 처리하는 추상 클래스.
 * @template T - 엔티티 타입
 * @template CreateInput - 생성 시 입력 타입
 * @template UniqueInput - 고유 식별자 입력 타입
 * @template WhereInput - 조회 조건 타입
 * @template OrderByInput - 정렬 조건 타입
 * @template UpdateInput - 수정 시 입력 타입
 * @template IncludeInput - 관계 포함 타입 (새로 추가)
 * @template SelectInput - 필드 선택 타입 (새로 추가)
 */
export abstract class AbstractRepository<
  T,
  CreateInput,
  UniqueInput,
  WhereInput,
  OrderByInput,
  UpdateInput,
  IncludeInput,
  SelectInput,
> {
  /**
   * @protected
   * @abstract
   * @description 하위 클래스에서 구현될 Prisma 모델 대리자.
   */
  protected abstract model: any;

  /**
   * @description 새로운 엔티티를 생성합니다.
   * @param data - 생성할 데이터.
   * @returns 생성된 엔티티.
   */
  async create(data: CreateInput): Promise<T> {
    return this.model.create({ data });
  }

  /**
   * @description 고유 식별자로 단일 엔티티를 조회합니다.
   * @param where - 조회할 고유 식별자.
   * @returns 조회된 엔티티 또는 null.
   */
  async findOne(where: UniqueInput): Promise<T | null> {
    return this.model.findUnique({ where });
  }

  /**
   * @description ID로 단일 엔티티를 조회합니다.
   * @param id - 조회할 엔티티의 ID.
   * @returns 조회된 엔티티 또는 null.
   */
  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  /**
   * @description 여러 엔티티를 조회합니다.
   * @param params - 페이징, 필터링, 정렬을 위한 매개변수.
   * @returns 조회된 엔티티 배열.
   */
  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: UniqueInput;
    where?: WhereInput;
    orderBy?: OrderByInput;
  }): Promise<T[]> {
    return this.model.findMany(params);
  }

  /**
   * @description 고유 식별자로 엔티티를 수정합니다.
   * @param params - 수정할 고유 식별자와 데이터.
   * @returns 수정된 엔티티.
   */
  async update(params: { where: UniqueInput; data: UpdateInput }): Promise<T> {
    return this.model.update(params);
  }

  /**
   * @description 고유 식별자로 엔티티를 삭제합니다.
   * @param where - 삭제할 고유 식별자.
   * @returns 삭제된 엔티티.
   */
  async remove(where: UniqueInput): Promise<T> {
    return this.model.delete({ where });
  }

  /**
   * @description 고유 식별자로 엔티티를 삭제합니다.
   * @param where - 삭제할 고유 식별자.
   * @returns 삭제된 엔티티.
   */
  async delete(where: UniqueInput): Promise<T> {
    return this.model.delete({ where });
  }

  /**
   * @description 조건에 맞는 엔티티의 개수를 셉니다.
   * @param where - 개수를 셀 조건.
   * @returns 엔티티 개수.
   */
  async count(where?: WhereInput): Promise<number> {
    return this.model.count({ where });
  }

  /**
   * @description 엔티티가 존재하면 수정하고, 없으면 생성합니다.
   * @param params - 조회, 수정, 생성에 필요한 데이터.
   * @returns 생성되거나 수정된 엔티티.
   */
  async upsert(params: { where: UniqueInput; update: UpdateInput; create: CreateInput }): Promise<T> {
    return this.model.upsert(params);
  }

  /**
   * @description 조건에 맞는 첫 번째 엔티티를 조회합니다.
   * @param params - 페이징, 필터링, 정렬을 위한 매개변수.
   * @returns 조회된 엔티티 또는 null.
   */
  async findFirst(params?: {
    skip?: number;
    cursor?: UniqueInput;
    where?: WhereInput;
    orderBy?: OrderByInput;
  }): Promise<T | null> {
    return this.model.findFirst(params);
  }

  /**
   * @description 여러 엔티티를 한 번에 생성합니다.
   * @param data - 생성할 데이터 배열.
   * @returns 생성된 엔티티의 개수.
   */
  async createMany(data: CreateInput[]): Promise<{ count: number }> {
    return this.model.createMany({ data });
  }

  /**
   * @description 조건에 맞는 여러 엔티티를 한 번에 수정합니다.
   * @param params - 수정할 조건과 데이터.
   * @returns 수정된 엔티티의 개수.
   */
  async updateMany(params: { where?: WhereInput; data: UpdateInput }): Promise<{ count: number }> {
    return this.model.updateMany(params);
  }

  /**
   * @description 조건에 맞는 여러 엔티티를 한 번에 삭제합니다.
   * @param where - 삭제할 조건.
   * @returns 삭제된 엔티티의 개수.
   */
  async deleteMany(where?: WhereInput): Promise<{ count: number }> {
    return this.model.deleteMany({ where });
  }

  /**
   * @description 조건에 맞는 엔티티가 존재하는지 확인합니다.
   * @param where - 확인할 조건.
   * @returns 존재하면 true, 아니면 false.
   */
  async exists(where: WhereInput): Promise<boolean> {
    const count = await this.model.count({ where });
    return count > 0;
  }

  /**
   * @description 고유 식별자로 단일 엔티티를 조회하고, 지정된 관계를 포함합니다.
   * @template TResult - 결과 객체의 타입.
   * @param where - 조회할 고유 식별자.
   * @param include - 포함할 관계.
   * @returns 조회된 엔티티와 포함된 관계 또는 null.
   */
  async findOneWithInclude<TResult = any>(where: UniqueInput, include: IncludeInput): Promise<TResult | null> {
    return this.model.findUnique({ where, include });
  }

  /**
   * @description 여러 엔티티를 조회하고, 지정된 관계를 포함합니다.
   * @template TResult - 결과 객체의 타입.
   * @param params - 페이징, 필터링, 정렬 및 포함할 관계를 위한 매개변수.
   * @returns 조회된 엔티티 배열과 포함된 관계.
   */
  async findManyWithInclude<TResult = any>(params: {
    skip?: number;
    take?: number;
    cursor?: UniqueInput;
    where?: WhereInput;
    orderBy?: OrderByInput;
    include?: IncludeInput;
  }): Promise<TResult[]> {
    return this.model.findMany(params);
  }

  /**
   * @description 고유 식별자로 단일 엔티티를 조회하고, 지정된 필드만 선택합니다.
   * @template TResult - 결과 객체의 타입.
   * @param where - 조회할 고유 식별자.
   * @param select - 선택할 필드.
   * @returns 선택된 필드를 포함하는 조회된 엔티티 또는 null.
   */
  async findOneWithSelect<TResult = any>(where: UniqueInput, select: SelectInput): Promise<TResult | null> {
    return this.model.findUnique({ where, select });
  }

  /**
   * @description 페이지네이션을 지원하는 조회 (관계 포함 및 필드 선택 가능)
   */
  async findWithPagination<TResult = any>(params: {
    page: number;
    limit: number;
    where?: WhereInput;
    orderBy?: OrderByInput;
    include?: IncludeInput;
    select?: SelectInput;
  }): Promise<{ data: TResult[]; totalCount: number }> {
    const { page, limit, where, orderBy, include, select } = params;
    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      this.model.findMany({
        skip,
        take: limit,
        where,
        orderBy,
        ...(include && { include }),
        ...(select && { select }),
      }),
      this.model.count({ where }),
    ]);

    return { data, totalCount };
  }

  /**
   * @description 페이지네이션을 지원하는 조회 (관계 포함).
   * @deprecated `findWithPagination`으로 통합되었으므로 더 이상 사용하지 마세요.
   */
  async findWithPaginationAndInclude<TResult = any>(params: {
    page: number;
    limit: number;
    where?: WhereInput;
    orderBy?: OrderByInput;
    include: IncludeInput;
  }): Promise<{ data: TResult[]; totalCount: number }> {
    const { page, limit, where, orderBy, include } = params;
    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      this.model.findMany({
        skip,
        take: limit,
        where,
        orderBy,
        include,
      }),
      this.model.count({ where }),
    ]);

    return { data, totalCount };
  }
}
