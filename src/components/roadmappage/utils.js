import { MONTH_LABELS } from "./constants";

/**
 * 월 번호를 월 레이블로 변환
 * @param {number} monthNumber - 월 번호 (1-12)
 * @returns {string} 월 레이블
 */
export const getMonthLabel = (monthNumber) => MONTH_LABELS[monthNumber - 1] || "";

/**
 * 기간을 포맷팅 (시작월 - 종료월)
 * 시작월과 종료월이 같으면 하나의 월만 반환
 * @param {number} startMonth - 시작월
 * @param {number} endMonth - 종료월
 * @returns {string} 포맷팅된 기간 문자열
 */
export const formatPeriod = (startMonth, endMonth) => {
  if (startMonth === endMonth) {
    return getMonthLabel(startMonth);
  }
  return `${getMonthLabel(startMonth)} - ${getMonthLabel(endMonth)}`;
};

/**
 * 랜덤 파스텔 색상 생성
 * HSL 색상 공간을 사용하여 파스텔 톤의 색상을 생성
 * @returns {string} HSL 색상 문자열
 */
export const generatePastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`;
};

/**
 * 문자열을 슬러그로 변환
 * URL이나 ID에 사용할 수 있는 형태로 변환 (소문자, 하이픈 구분)
 * @param {string} value - 변환할 문자열
 * @returns {string} 슬러그 문자열
 */
export const createSlug = (value) => {
  const base = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
  return base || "custom-type";
};

