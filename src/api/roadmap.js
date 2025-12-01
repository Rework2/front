// import api from './axiosConfig';
import { getCurrentUserId } from '../components/roadmappage/utils';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to get from storage or default (simulating DB)
const getActivitiesFromStorage = (userId) => {
    try {
        const key = userId ? `roadmap_activities_db_${userId}` : "roadmap_activities_db";
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveActivitiesToStorage = (userId, activities) => {
    const key = userId ? `roadmap_activities_db_${userId}` : "roadmap_activities_db";
    localStorage.setItem(key, JSON.stringify(activities));
};

export const roadmapApi = {
    getRoadmap: async () => {
        await delay(500);
        const userId = getCurrentUserId();
        return getActivitiesFromStorage(userId);
    },

    initializeRoadmap: async (activities) => {
        await delay(500);
        const userId = getCurrentUserId();
        saveActivitiesToStorage(userId, activities);
        return activities;
    },

    createActivity: async (activity) => {
        await delay(400);
        const userId = getCurrentUserId();
        const current = getActivitiesFromStorage(userId);
        const newActivity = { ...activity, id: `activity-${Date.now()}` };
        const updated = [...current, newActivity];
        saveActivitiesToStorage(userId, updated);
        return newActivity;
    },

    updateActivity: async (id, updates) => {
        await delay(300);
        const userId = getCurrentUserId();
        const current = getActivitiesFromStorage(userId);
        const updated = current.map(a => a.id === id ? { ...a, ...updates } : a);
        saveActivitiesToStorage(userId, updated);
        return updated.find(a => a.id === id);
    },

    deleteActivity: async (id) => {
        await delay(300);
        const userId = getCurrentUserId();
        const current = getActivitiesFromStorage(userId);
        const updated = current.filter(a => a.id !== id);
        saveActivitiesToStorage(userId, updated);
        return { success: true };
    }
};
