// import api from './axiosConfig';
import { DEFAULT_ACTIVITIES } from '../components/roadmappage/constants';

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

const getCurrentUserId = () => {
    try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            return user.id;
        }
    } catch (e) {
        console.error("Failed to get user ID:", e);
    }
    return null;
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
