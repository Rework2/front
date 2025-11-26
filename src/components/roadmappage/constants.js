// 월 레이블 배열 (1월부터 12월까지)
export const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// 활동 유형에 사용할 색상 팔레트 (파스텔 톤)
export const COLOR_PALETTE = [
  "#C6F5C3",
  "#CFE0FF",
  "#E4D6FF",
  "#FEEFAD",
  "#FFD6E8",
  "#C4F1F9",
  "#FFE0C7",
  "#D7F9E9",
  "#E6E6FF",
  "#F5D0FE",
];

// 기본 활동 유형 목록
export const DEFAULT_ACTIVITY_TYPES = [
  { id: "competition", label: "공모전/대회", color: "#C6F5C3" },
  { id: "certification", label: "자격증", color: "#CFE0FF" },
  { id: "project", label: "개인/팀 프로젝트", color: "#E4D6FF" },
  { id: "extracurricular", label: "대외활동", color: "#FEEFAD" },
  { id: "internship", label: "인턴십", color: "#FFD6E8" },
  { id: "study", label: "스터디/동아리", color: "#C4F1F9" },
];

// 기본 활동 목록 (예시 데이터)
export const DEFAULT_ACTIVITIES = [
  {
    id: "act-competition-1",
    typeId: "competition",
    title: "방구석의 오늘 뭐했냐",
    tags: ["IT", "프로젝트", "React"],
    isImportant: true,
    startYear: 2024,
    startMonth: 8,
    endYear: 2025,
    endMonth: 1,
  },
  {
    id: "act-project-1",
    typeId: "project",
    title: "포트폴리오 웹 개발",
    tags: ["프로젝트", "React"],
    isImportant: false,
    startYear: 2024,
    startMonth: 8,
    endYear: 2025,
    endMonth: 2,
  },
  {
    id: "act-project-2",
    typeId: "project",
    title: "React 대시보드 프로젝트",
    tags: ["대시보드", "UI"],
    isImportant: true,
    startYear: 2024,
    startMonth: 9,
    endYear: 2025,
    endMonth: 3,
  },
  {
    id: "act-extracurricular-1",
    typeId: "extracurricular",
    title: "해커톤 참가",
    tags: ["대외활동", "팀워크"],
    isImportant: true,
    startYear: 2024,
    startMonth: 8,
    endYear: 2025,
    endMonth: 1,
  },
  {
    id: "act-extracurricular-2",
    typeId: "extracurricular",
    title: "오픈소스 컨트리뷰션",
    tags: ["오픈소스", "커뮤니티"],
    isImportant: false,
    startYear: 2024,
    startMonth: 9,
    endYear: 2025,
    endMonth: 4,
  },
  {
    id: "act-certification-1",
    typeId: "certification",
    title: "정보처리기사",
    tags: ["자격증"],
    isImportant: false,
    startYear: 2024,
    startMonth: 10,
    endYear: 2025,
    endMonth: 2,
  },
];

