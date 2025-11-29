// import api from './axiosConfig';
import { DEFAULT_ACTIVITIES } from '../components/roadmappage/constants';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to get from storage or default (simulating DB)
const getActivitiesFromStorage = () => {
    try {
        const stored = localStorage.getItem("roadmap_activities_db");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveActivitiesToStorage = (activities) => {
    localStorage.setItem("roadmap_activities_db", JSON.stringify(activities));
};

export const roadmapApi = {
    getRoadmap: async () => {
        await delay(500);
        return getActivitiesFromStorage();
    },

    initializeRoadmap: async (activities) => {
        await delay(500);
        saveActivitiesToStorage(activities);
        return activities;
    },

    createActivity: async (activity) => {
        await delay(400);
        const current = getActivitiesFromStorage();
        const newActivity = { ...activity, id: `activity-${Date.now()}` };
        const updated = [...current, newActivity];
        saveActivitiesToStorage(updated);
        return newActivity;
    },

    updateActivity: async (id, updates) => {
        await delay(300);
        const current = getActivitiesFromStorage();
        const updated = current.map(a => a.id === id ? { ...a, ...updates } : a);
        saveActivitiesToStorage(updated);
        return updated.find(a => a.id === id);
    },

    deleteActivity: async (id) => {
        await delay(300);
        const current = getActivitiesFromStorage();
        const updated = current.filter(a => a.id !== id);
        saveActivitiesToStorage(updated);
        return { success: true };
    }
};
