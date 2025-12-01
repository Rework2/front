export const getDashboardData = () => {
    try {
        // 1. Get User ID
        let userId = null;
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                userId = JSON.parse(userStr).id;
            }
        } catch (e) {
            console.error("Failed to parse user data:", e);
        }

        // 2. Get Activities
        const activityKey = userId ? `activities_${userId}` : 'activities';
        const savedActivitiesStr = localStorage.getItem(activityKey);

        let activities = { planned: [], inProgress: [], completed: [] };
        if (savedActivitiesStr) {
            try {
                activities = JSON.parse(savedActivitiesStr);
            } catch (e) {
                console.error("Failed to parse activities:", e);
            }
        }

        // 3. Calculate Stats
        const completedCount = activities.completed.length;
        const inProgressCount = activities.inProgress.length;
        const upcomingCount = activities.planned.length;
        const totalCount = completedCount + inProgressCount + upcomingCount;

        // 4. Calculate Progress Rate
        const progress = totalCount > 0
            ? Math.round((completedCount / totalCount) * 100)
            : 0;

        // 5. Get Recent Activities (Combine all, sort by date/id, take top 5)
        const allActivities = [
            ...activities.planned.map(a => ({ ...a, status: 'planned', statusLabel: '예정' })),
            ...activities.inProgress.map(a => ({ ...a, status: 'inProgress', statusLabel: '진행 중' })),
            ...activities.completed.map(a => ({ ...a, status: 'completed', statusLabel: '완료' }))
        ];

        // Sort by ID (assuming ID contains timestamp or is roughly chronological) or Date if available
        // The ID format is often `new-${timestamp}` or `onboarding-...-${timestamp}-...`
        // We'll try to parse timestamp from ID if possible, or use date field
        allActivities.sort((a, b) => {
            // Try to use date field first
            if (a.date && b.date) {
                return new Date(b.date) - new Date(a.date);
            }
            return 0;
        });

        const recentActivities = allActivities.slice(0, 5);

        // 6. Get User Info for Display
        let user = { major: "전공 미설정", targetJob: "희망 직무 미설정" };
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const userData = JSON.parse(userStr);
                user = {
                    major: userData.major || "전공 미설정",
                    targetJob: userData.targetJob || "희망 직무 미설정"
                };
            }
        } catch (e) { /* ignore */ }

        // 7. Mock Chart Data (Since we don't have historical data tracking yet)
        // We can generate some based on current state or keep it static/mocked for now
        // consistent with previous mock but maybe slightly dynamic?
        // For now, let's keep the chart data static or simple as per original requirement
        // to just connect "Insights" and "Activity" data.
        const chartData = [
            { month: "7월", progress: 20 },
            { month: "8월", progress: 35 },
            { month: "9월", progress: 50 },
            { month: "10월", progress: 65 },
            { month: "11월", progress: progress }, // Use current progress for latest
        ];

        return {
            progress,
            stats: {
                completed: completedCount,
                inProgress: inProgressCount,
                upcoming: upcomingCount
            },
            recentActivities,
            chartData,
            user,
            aiInsight: `현재 진행률은 ${progress}%입니다. 목표 달성을 위해 꾸준히 활동을 이어가세요!`
        };

    } catch (error) {
        console.error("Error generating dashboard data:", error);
        return null;
    }
};
