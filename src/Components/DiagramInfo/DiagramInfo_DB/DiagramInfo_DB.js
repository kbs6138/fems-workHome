import { useQuery } from 'react-query';

export const fetchVoltData = async () => {
    const response = await fetch('http://agen072.iptime.org:8980/api/v_data?scp_id=2300136001');
    const data = await response.json();
    //console.log('apiData:', data);
    return data; // 데이터 구조를 그대로 반환
};

export const useVoltData = () => {
    const { data, isLoading, error } = useQuery('voltData', fetchVoltData, {
        refetchInterval: 5000,
        initialData: { wat: 0 }, // 초기값을 단순한 객체로 변경

    });
    return { data, isLoading, error };
};

