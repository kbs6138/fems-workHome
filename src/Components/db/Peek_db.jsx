import { useQuery } from 'react-query';

export const fetchPeekData = async () => {
    const response = await fetch('http://agen072.iptime.org:8980/api/peek?scp_id=2300130203');
    const data = await response.json();
    ///console.log('apiData:', data);
    return data; // 데이터 구조를 그대로 반환
};

export const usePeekData = () => {
    const { data } = useQuery('PeekData', fetchPeekData, {
        refetchInterval: 1000,
        initialData: { wat: 0 }, // 초기값을 단순한 객체로 변경

    });
    return { data };
};
