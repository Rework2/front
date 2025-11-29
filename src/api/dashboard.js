// import api from './axiosConfig';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardApi = {
    getDashboardData: async () => {
        await delay(600);

        // Mock data based on what DashboardPage needs
        return {
            progress: 75,
            stats: {
                completed: 4,
                inProgress: 2,
                upcoming: 3,
            },
            chartData: [
                { month: "7월", progress: 20 },
                { month: "8월", progress: 35 },
                { month: "9월", progress: 50 },
                { month: "10월", progress: 65 },
                { month: "11월", progress: 75 },
            ],
            user: {
                major: "컴퓨터공학",
                targetJob: "프론트엔드 개발자",
            },
            aiInsight: "현재 준비 수준은 75%입니다. 입력 정보를 바탕으로 로드맵과 활동 구성이 최적화됩니다.",
        };
    }
};
