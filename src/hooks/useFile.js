import { useState, useEffect } from "react";


const FILES_STORAGE_KEY = "files";

// 현재 로그인한 사용자의 ID를 가져옴
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

// 사용자별 스토리지 키를 생성
const getStorageKey = (baseKey) => {
    const userId = getCurrentUserId();
    return userId ? `${baseKey}_${userId}` : baseKey;
};

// 로컬 스토리지에서 데이터를 불러옴
const loadFromStorage = (key, defaultValue = null) => {
    try {
        const storageKey = getStorageKey(key);
        const saved = localStorage.getItem(storageKey);
        if (saved === "undefined") return defaultValue;
        return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
        console.error(`Failed to load ${key}:`, e);
        return defaultValue;
    }
};

// 파일 관리 메인 훅
export const useFile = ({ activityMap, onFileCountChange }) => {
    const [files, setFiles] = useState(() => {
        const savedFiles = loadFromStorage(FILES_STORAGE_KEY, []);

        const cleanFiles = savedFiles.filter(f => String(f.id).startsWith("new-"));

        // 파일 데이터 복원
        return cleanFiles.map(file => {
            if (file.dataKey && !file.url && !file.data) {
                const fileData = localStorage.getItem(`file_data_${file.dataKey}`);
                if (fileData) {
                    return { ...file, url: fileData };
                }
            }
            return file;
        });
    });

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const storageKey = getStorageKey(FILES_STORAGE_KEY);
        localStorage.setItem(storageKey, JSON.stringify(files));
    }, [files]);

    // 파일 추가
    const addFile = (newFileObj, activityId) => {
        setFiles((prev) => [...prev, newFileObj]);
        if (onFileCountChange) onFileCountChange(activityId, 1);
    };

    // 파일 삭제
    const deleteFile = (fileId) => {
        const targetFile = files.find(f => f.id === fileId);
        if (!targetFile) return;

        setFiles((prev) => prev.filter((f) => f.id !== fileId));
        if (targetFile.relatedActivity && onFileCountChange) {
            onFileCountChange(targetFile.relatedActivity, -1);
        }
    };

    // 파일 뷰어 열기
    const openViewer = (file) => {
        const activity = activityMap[file.relatedActivity] || null;
        setSelectedFile({ ...file, activity });
        setIsViewerOpen(true);
    };

    const closeViewer = () => setIsViewerOpen(false);

    // 검색어, 탭, 날짜 등에 따른 파일 필터링 로직
    const filteredFiles = (() => {
        let result = files;

        if (searchQuery) {
            result = result.filter(f =>
                f.name.normalize('NFC').toLowerCase().includes(searchQuery.normalize('NFC').toLowerCase())
            );
        }

        if (activeTabIndex === 0) {
            const typePriority = {
                pdf: 1,
                text: 2,
                image: 3,
                word: 4,
                excel: 5,
                powerpoint: 6,
                document: 7
            };

            return [...result].sort((a, b) => {
                const priorityA = typePriority[a.fileType] || 99;
                const priorityB = typePriority[b.fileType] || 99;
                if (priorityA !== priorityB) return priorityA - priorityB;
                return a.name.localeCompare(b.name);
            });
        }
        if (activeTabIndex === 1) return result.filter((f) => f.relatedActivity);
        if (activeTabIndex === 2) {
            const diff = (d) => (Date.now() - new Date(d)) / (1000 * 60 * 60 * 24);
            return result.filter((f) => diff(f.uploadDate) <= 7);
        }
        return result;
    })();

    // 태그별로 파일 그룹화 로직
    const filesByTag = files.reduce((acc, f) => {
        const act = activityMap[f.relatedActivity];
        if (!act) return acc;
        const tag = act.tag || "기타";
        if (!acc[tag]) acc[tag] = [];
        acc[tag].push(f);
        return acc;
    }, {});

    return {
        files,
        activeTabIndex,
        setActiveTabIndex,
        filteredFiles,
        filesByTag,
        addFile,
        deleteFile,
        openViewer,
        closeViewer,
        selectedFile,
        isViewerOpen,
        searchQuery,
        setSearchQuery
    };
};
