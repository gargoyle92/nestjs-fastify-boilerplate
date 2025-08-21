/**
 * @description User-Agent 헤더에서 추출한 클라이언트 정보
 * HTTP User-Agent와 네트워크 정보를 파싱하여 구조화된 데이터로 제공
 */
export interface UserAgentInfo {
  /** 클라이언트 이름 (예: "Chrome 124", "iPhone", "Android App") */
  clientName?: string;

  /** 클라이언트 타입 (web, mobile, tablet, desktop, bot) */
  clientType?: string;

  /** 클라이언트 IP 주소 (프록시 환경 고려) */
  ipAddress?: string;

  /** 원본 User-Agent 문자열 */
  userAgent?: string;

  /** 운영체제 정보 (예: "iOS 17.1", "Windows 11") */
  platform?: string;

  /** 브라우저 엔진 (예: "WebKit", "Blink", "Gecko") */
  engine?: string;
}
