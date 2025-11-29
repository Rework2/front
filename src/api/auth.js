// import api from './axiosConfig';

// Mock delay helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
    login: async (email, password) => {
        await delay(800); // Simulate network delay

        // Mock validation
        if (password === 'fail') {
            throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        const mockUser = {
            id: 1,
            email,
            name: '김철수',
            profileImage: null,
        };

        const mockToken = 'mock-jwt-token-12345';
        localStorage.setItem('accessToken', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));

        return {
            user: mockUser,
            token: mockToken,
        };
    },

    signup: async (userData) => {
        await delay(1000);

        // Mock success
        return {
            success: true,
            message: '회원가입이 완료되었습니다.',
        };
    },

    logout: async () => {
        await delay(200);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    },

    getUserProfile: async () => {
        await delay(500);
        const userStr = localStorage.getItem('user');
        if (!userStr) throw new Error('Not authenticated');
        return JSON.parse(userStr);
    }
};
