import { useQuery } from 'react-query';

// 전압 데이터 가져오기
export const fetchMainDiagramData = async (scpId) => {
    const response = await fetch(`http://118.43.32.5:8980/api/main-diagram?scp_id=${scpId}`);
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};

export const useMainDiagramData = (scpId, interval = 10000) => { // scpId를 인자로 추가
    const { data, isLoading, error } = useQuery(
        ['maindiagramData', scpId], // 쿼리 키에 scpId 추가
        () => fetchMainDiagramData(scpId), // fetchMainDiagramData 호출 시 scpId 전달
        {
            refetchInterval: interval, // 매개변수로 받은 값 사용
            initialData: [], // 초기값을 빈 배열로 설정
        }
    );
    return { data, isLoading, error };
};
