import { useQuery } from 'react-query';

export const fetchRightChart3Data = async () => {
    const response = await fetch('http://118.43.32.5:8980/api/rst?scp_id=2200130501_302');
    const data = await response.json();
    //console.log('apiData:', data);
    return data; // 데이터 구조를 그대로 반환
};

export const useRightChart3Data = () => {
    const { data, isLoading, error } = useQuery('rightChart3Data', fetchRightChart3Data, {
      refetchInterval: 10000,
      initialData: { wat: 0 }, // 초기값을 단순한 객체로 변경

    });
    return { data, isLoading, error };
};
