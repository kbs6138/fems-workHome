import { useQuery } from 'react-query';

export const fetchDeviceData = async () => {
    const response = await fetch('http://118.43.32.5:8980/api/device-m');
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};

export const useDeviceData = (interval = 10000) => { // interval 매개변수 추가
    const { data, isLoading, error } = useQuery('deviceData', fetchDeviceData, {
        refetchInterval: interval, // 매개변수로 받은 값 사용
        initialData: [], // 초기값을 빈 배열로 설정
    });
    return { data, isLoading, error };
};