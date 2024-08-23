import { useQuery } from 'react-query';

// 전압 데이터 가져오기
export const fetchDiagramInfoData = async (scp_vid) => {
    const response = await fetch(`http://118.43.32.5:8980/api/diagraminfo?scp_id=${scp_vid}`);
    const data = await response.json();
    return data;
};
export const useDiagramInfoData = (interval = 10000, scp_vid = '') => {
    const { data, isLoading, error } = useQuery(['diagraminfoData', scp_vid], () => fetchDiagramInfoData(scp_vid), {
        refetchInterval: interval,
        initialData: [],
    });
    return { data, isLoading, error };
};


/*****************************************************************************/
export const fetchDiagramCurrentData = async (scp_vid) => {
    const response = await fetch(`http://118.43.32.5:8980/api/diagram_current?scp_id=${scp_vid}`);
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};
export const useDiagramCurrentData = (interval = 10000, scp_vid = '') => {
    const { data, isLoading, error } = useQuery(['diagramcurrentData', scp_vid], () => fetchDiagramCurrentData(scp_vid), {
        refetchInterval: interval, // 매개변수로 받은 값 사용
        initialData: [], // 초기값을 빈 배열로 설정
    });
    return { data, isLoading, error };
};

/*****************************************************************************/

export const fetchMinMaxData = async (scp_vid) => {
    const response = await fetch(`http://118.43.32.5:8980/api/minmax?scp_id=${scp_vid}`);
    const data = await response.json();
    return data;
};

export const useMinMaxData = (interval = 10000, scp_vid = '') => {
    const { data, isLoading, error } = useQuery(
        ['minmaxData', scp_vid], 
        () => fetchMinMaxData(scp_vid), 
        {
            refetchInterval: interval,
            initialData: [],
        }
    );
    return { data, isLoading, error };
};


