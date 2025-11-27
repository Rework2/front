// data/mockActivities.js
// 활동 관리 페이지 Mock 데이터
// TODO: 실제 API로 교체 예정


export const kanbanColumns = [
  {
    id: 'planned',
    title: '예정',
    count: 2,
    color: '#D97706',
    bgColor: '#FEF3C7'
  },
  {
    id: 'in-progress',
    title: '진행 중',
    count: 2,
    color: '#2563EB',
    bgColor: '#DBEAFE'
  },
  {
    id: 'completed',
    title: '완료',
    count: 2,
    color: '#059669',
    bgColor: '#D1FAE5'
  }
];

export const activities = {
  planned: [
    {
      id: 'p1',
      title: '2025 코리아데이터 활용 공모전',
      tag: '공모전',
      tagColor: { bg: '#F3E8FF', text: '#9333EA' },
      categories: ['데이터분석', '공모전'],
      date: '2025-06-20',
      files: 0,
      status: 'planned'
    },
    {
      id: 'p2',
      title: 'AWS Certified Solutions Architect',
      tag: '자격증',
      tagColor: { bg: '#DBEAFE', text: '#2563EB' },
      categories: ['클라우드', '자격증'],
      date: '2025-06-15',
      files: 0,
      status: 'planned'
    }
  ],
  inProgress: [
    {
      id: 'ip1',
      title: '팀 프로젝트: AI 챗봇 서비스',
      tag: '프로젝트',
      tagColor: { bg: '#DBEAFE', text: '#2563EB' },
      progress: 60,
      categories: ['AI', '프로젝트'],
      date: '2025-04-25',
      files: 5,
      status: 'in-progress'
    },
    {
      id: 'ip2',
      title: '오픈소스 기여 프로젝트',
      tag: '프로젝트',
      tagColor: { bg: '#DBEAFE', text: '#2563EB' },
      progress: 45,
      categories: ['백엔드', 'GitHub'],
      date: '2025-05-10',
      files: 3,
      status: 'in-progress'
    }
  ],
  completed: [
    {
      id: 'c1',
      title: 'Google Cloud Professional',
      tag: '자격증',
      tagColor: { bg: '#DBEAFE', text: '#2563EB' },
      categories: ['클라우드', '자격증'],
      date: '2025-03-15',
      completionTime: '4주 동안 완료',
      status: 'completed'
    },
    {
      id: 'c2',
      title: '2024 메가톤 대회',
      tag: '성과',
      tagColor: { bg: '#FEE2E2', text: '#DC2626' },
      categories: ['해커톤', '팀프로젝트'],
      date: '2025-02-20',
      submissions: '8개 제출 완료',
      status: 'completed'
    }
  ]
};

// Legacy structure for backward compatibility
export const tasks = {
  'todo': activities.planned.map(activity => ({
    id: activity.id,
    title: activity.title,
    description: activity.categories.join(', '),
    dueDate: activity.date,
    assignee: '홍길동',
    tags: activity.categories
  })),
  'in-progress': activities.inProgress.map(activity => ({
    id: activity.id,
    title: activity.title,
    description: activity.categories.join(', '),
    dueDate: activity.date,
    assignee: '홍길동',
    tags: activity.categories,
    progress: activity.progress
  })),
  'done': activities.completed.map(activity => ({
    id: activity.id,
    title: activity.title,
    description: activity.categories.join(', '),
    dueDate: activity.date,
    assignee: '홍길동',
    tags: activity.categories
  }))
};

export const evidenceFiles = [
  {
    id: 'e1',
    name: '수료증_Google_Cloud.pdf',
    title: 'Google Cloud Professional 수료증',
    type: 'certificate',
    fileType: 'pdf',
    size: '2.4 MB',
    uploadDate: '2025-03-16',
    relatedActivity: 'c1',
    url: '#',
    iconColor: { bg: '#FEE2E2', color: '#DC2626' }
  },
  {
    id: 'e2',
    name: '프로젝트_보고서.pdf',
    title: 'AI 챗봇 프로젝트 보고서',
    type: 'document',
    fileType: 'pdf',
    size: '5.1 MB',
    uploadDate: '2025-04-30',
    relatedActivity: 'ip1',
    url: '#',
    iconColor: { bg: '#FEE2E2', color: '#DC2626' }
  },
  {
    id: 'e3',
    name: '메가톤_수상증.jpg',
    title: '2024 메가톤 대회 수상증',
    type: 'certificate',
    fileType: 'image',
    size: '1.2 MB',
    uploadDate: '2025-02-21',
    relatedActivity: 'c2',
    url: '#',
    iconColor: { bg: '#D1FAE5', color: '#059669' }
  },
  {
    id: 'e4',
    name: '자격증_사본.png',
    title: 'AWS 자격증 사본',
    type: 'certificate',
    fileType: 'image',
    size: '890 KB',
    uploadDate: '2025-03-17',
    relatedActivity: 'p2',
    url: '#',
    iconColor: { bg: '#D1FAE5', color: '#059669' }
  },
  {
    id: 'e5',
    name: 'AWS_학습증.docx',
    title: 'AWS 학습 증명서',
    type: 'document',
    fileType: 'document',
    size: '3.5 MB',
    uploadDate: '2025-06-20',
    relatedActivity: 'p2',
    url: '#',
    iconColor: { bg: '#DBEAFE', color: '#2563EB' }
  },
  {
    id: 'e6',
    name: '오픈소스_기여내역.pdf',
    title: '오픈소스 기여 내역',
    type: 'document',
    fileType: 'pdf',
    size: '1.8 MB',
    uploadDate: '2025-04-06',
    relatedActivity: 'ip2',
    url: '#',
    iconColor: { bg: '#FEE2E2', color: '#DC2626' }
  }
];

export const activityStats = {
  totalActivities: 6,
  completionRate: 33,
  totalFiles: 6,
  distribution: {
    completed: 2,
    inProgress: 2,
    planned: 2
  }
};

// TODO: API 연동 시 사용할 함수들
export const activityAPI = {
  // 활동 추가
  addTask: async (columnId, taskData) => {
    console.log('TODO: API - Add task', columnId, taskData);
    // return await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(taskData) });
  },
  
  // 활동 이동
  moveTask: async (taskId, fromColumn, toColumn) => {
    console.log('TODO: API - Move task', taskId, fromColumn, toColumn);
    // return await fetch(`/api/tasks/${taskId}/move`, { method: 'PUT', body: JSON.stringify({ toColumn }) });
  },
  
  // 활동 업데이트
  updateTask: async (taskId, updates) => {
    console.log('TODO: API - Update task', taskId, updates);
    // return await fetch(`/api/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify(updates) });
  },
  
  // 활동 삭제
  deleteTask: async (taskId) => {
    console.log('TODO: API - Delete task', taskId);
    // return await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
  },
  
  // 증빙 파일 업로드
  uploadEvidence: async (file, activityId) => {
    console.log('TODO: API - Upload evidence', file, activityId);
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('activityId', activityId);
    // return await fetch('/api/evidence', { method: 'POST', body: formData });
  },
  
  // 증빙 파일 삭제
  deleteEvidence: async (fileId) => {
    console.log('TODO: API - Delete evidence', fileId);
    // return await fetch(`/api/evidence/${fileId}`, { method: 'DELETE' });
  },
  
  // 증빙 파일 다운로드
  downloadEvidence: async (fileId) => {
    console.log('TODO: API - Download evidence', fileId);
    // return await fetch(`/api/evidence/${fileId}/download`);
  },
  
  // 전체 데이터 내보내기
  exportData: async (format = 'csv') => {
    console.log('TODO: API - Export data', format);
    // return await fetch(`/api/export?format=${format}`);
  }
};
