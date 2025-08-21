/**
 * @description 파일명에서 확장자를 추출합니다.
 * @param filename - 파일명.
 * @returns 소문자로 변환된 파일 확장자. 확장자가 없으면 빈 문자열을 반환합니다.
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * @description 파일명에서 확장자를 제외한 순수 파일 이름을 추출합니다.
 * @param filename - 파일명.
 * @returns 확장자가 제거된 파일 이름.
 */
export function getFileNameWithoutExtension(filename: string): string {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}

/**
 * @description 파일이 이미지 형식인지 확인합니다.
 * @param filename - 확인할 파일명.
 * @returns 이미지 파일이면 true, 그렇지 않으면 false.
 */
export function isImageFile(filename: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
  return imageExtensions.includes(getFileExtension(filename));
}

/**
 * @description 파일이 비디오 형식인지 확인합니다.
 * @param filename - 확인할 파일명.
 * @returns 비디오 파일이면 true, 그렇지 않으면 false.
 */
export function isVideoFile(filename: string): boolean {
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'];
  return videoExtensions.includes(getFileExtension(filename));
}

/**
 * @description 파일이 문서 형식인지 확인합니다.
 * @param filename - 확인할 파일명.
 * @returns 문서 파일이면 true, 그렇지 않으면 false.
 */
export function isDocumentFile(filename: string): boolean {
  const docExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];
  return docExtensions.includes(getFileExtension(filename));
}

/**
 * @description 파일 크기(바이트)를 사람이 읽기 쉬운 형식(KB, MB, GB 등)으로 변환합니다.
 * @param bytes - 변환할 파일 크기 (바이트 단위).
 * @returns 변환된 파일 크기 문자열.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * @description 원본 파일명을 기반으로 고유한 파일명을 생성합니다. (원본이름_타임스탬프_랜덤문자.확장자)
 * @param originalName - 원본 파일명.
 * @returns 생성된 고유한 파일명.
 */
export function generateUniqueFilename(originalName: string): string {
  const extension = getFileExtension(originalName);
  const nameWithoutExt = getFileNameWithoutExtension(originalName);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);

  return `${nameWithoutExt}_${timestamp}_${random}.${extension}`;
}

/**
 * @description 고유한 파일명을 간단한 형식으로 생성합니다. (타임스탬프_랜덤문자.확장자)
 * @param originalName - 원본 파일명.
 * @returns 생성된 고유한 파일명.
 */
export function generateSimpleUniqueFilename(originalName: string): string {
  const extension = getFileExtension(originalName);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);

  return `${timestamp}_${random}.${extension}`;
}

/**
 * @description 파일의 확장자가 허용된 타입 목록에 포함되는지 확인합니다.
 * @param filename - 확인할 파일명.
 * @param allowedTypes - 허용되는 확장자 배열 (예: ['jpg', 'png']).
 * @returns 허용된 파일 타입이면 true, 그렇지 않으면 false.
 */
export function isAllowedFileType(filename: string, allowedTypes: string[]): boolean {
  const extension = getFileExtension(filename);
  return allowedTypes.map((type) => type.toLowerCase()).includes(extension);
}

/**
 * @description 파일 크기가 최대 허용 크기를 초과하는지 검증합니다.
 * @param fileSize - 검증할 파일 크기 (바이트 단위).
 * @param maxSizeInMB - 최대 허용 크기 (MB 단위).
 * @returns 파일 크기가 유효하면 true, 그렇지 않으면 false.
 */
export function validateFileSize(fileSize: number, maxSizeInMB: number): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return fileSize <= maxSizeInBytes;
}

/**
 * @description 파일명 확장자를 기반으로 MIME 타입을 반환합니다.
 * @param filename - 파일명.
 * @returns 해당하는 MIME 타입. 매칭되는 타입이 없으면 'application/octet-stream'을 반환합니다.
 */
export function getMimeType(filename: string): string {
  const extension = getFileExtension(filename);
  const mimeTypes: Record<string, string> = {
    // Images
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',

    // Documents
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

    // Videos
    mp4: 'video/mp4',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',

    // Others
    txt: 'text/plain',
    json: 'application/json',
    zip: 'application/zip',
  };

  return mimeTypes[extension] || 'application/octet-stream';
}
