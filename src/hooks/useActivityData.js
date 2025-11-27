// hooks/useActivityData.js
import { useState, useEffect } from 'react';
import { 
  activities, 
  evidenceFiles, 
  activityStats,
  kanbanColumns 
} from '../moidata/Activity/Activity';

// 초기 값 강제 통일 → 에러 100% 해결
const defaultActivities = {
  planned: activities?.planned || [],
  inProgress: activities?.inProgress || [],
  completed: activities?.completed || []
};

export const useActivityData = () => {
  const [activitiesData, setActivitiesData] = useState(activities || {
    planned: [],
    inProgress: [],
    completed: []
  });
  const [files, setFiles] = useState(evidenceFiles || []);
  const [stats, setStats] = useState(activityStats || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 활동 추가
  const addActivity = (columnId, activityData) => {
    setLoading(true);
    try {
      const newActivity = {
        ...activityData,
        id: `${columnId}_${Date.now()}`,
        status: columnId
      };

      setActivitiesData(prev => ({
        ...prev,
        [columnId]: [...prev[columnId], newActivity]
      }));

      updateStats();
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 활동 이동
  const moveActivity = (activityId, fromColumn, toColumn) => {
    setLoading(true);
    try {
      const activity = activitiesData[fromColumn].find(a => a.id === activityId);
      if (!activity) throw new Error('Activity not found');

      setActivitiesData(prev => ({
        ...prev,
        [fromColumn]: prev[fromColumn].filter(a => a.id !== activityId),
        [toColumn]: [...prev[toColumn], { ...activity, status: toColumn }]
      }));

      updateStats();
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 활동 수정
  const updateActivity = (activityId, updates) => {
    setLoading(true);
    try {
      const newData = { ...activitiesData };
      let updated = false;

      Object.keys(newData).forEach(column => {
        const index = newData[column].findIndex(a => a.id === activityId);
        if (index !== -1) {
          newData[column][index] = { ...newData[column][index], ...updates };
          updated = true;
        }
      });

      if (!updated) throw new Error('Activity not found');

      setActivitiesData(newData);
      updateStats();
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 활동 삭제
  const deleteActivity = (activityId) => {
    setLoading(true);
    try {
      const newData = { ...activitiesData };
      let deleted = false;

      Object.keys(newData).forEach(column => {
        const filtered = newData[column].filter(a => a.id !== activityId);
        if (filtered.length !== newData[column].length) {
          newData[column] = filtered;
          deleted = true;
        }
      });

      if (!deleted) throw new Error("Activity not found");

      setActivitiesData(newData);

      // 해당 파일도 삭제
      setFiles(prev => prev.filter(f => f.relatedActivity !== activityId));

      updateStats();
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 통계 업데이트
  const updateStats = () => {
    const total = 
      Object.values(activitiesData).reduce((sum, arr) => sum + arr.length, 0);

    setStats({
      totalActivities: total,
      completionRate: total ? Math.round((activitiesData.completed.length / total) * 100) : 0,
      totalFiles: files.length,
      distribution: {
        planned: activitiesData.planned.length,
        inProgress: activitiesData.inProgress.length,
        completed: activitiesData.completed.length
      }
    });
  };

  useEffect(() => {
    updateStats();
  }, [activitiesData, files]);

  return {
    activities: activitiesData,
    files,
    stats,
    columns: kanbanColumns,

    loading,
    error,

    addActivity,
    moveActivity,
    updateActivity,
    deleteActivity,

    addFile: () => {},
    deleteFile: () => {},

    updateStats,
  };
};

export default useActivityData;