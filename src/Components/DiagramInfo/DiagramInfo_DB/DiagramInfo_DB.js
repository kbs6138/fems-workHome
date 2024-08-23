import { useQuery } from 'react-query';

// 전압 데이터 가져오기
export const fetchDiagramInfoData = async () => {
    const response = await fetch('http://118.43.32.5:8980/api/diagraminfo?scp_id=2200138303_303');
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};

export const useDiagramInfoData = (interval = 10000) => { // interval 매개변수 추가
    const { data, isLoading, error } = useQuery('diagraminfoData', fetchDiagramInfoData, {
        refetchInterval: interval, // 매개변수로 받은 값 사용
        initialData: [], // 초기값을 빈 배열로 설정
    });
    return { data, isLoading, error };
};

/*****************************************************************************/
export const fetchDiagramCurrentData = async () => {
    const response = await fetch('http://118.43.32.5:8980/api/diagram_current?scp_id=2200138303_303'); // URL 수정
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};

export const useDiagramCurrentData = (interval = 10000) => { // interval 매개변수 추가
    const { data, isLoading, error } = useQuery('diagramcurrentData', fetchDiagramCurrentData, {
        refetchInterval: interval, // 매개변수로 받은 값 사용
        initialData: [], // 초기값을 빈 배열로 설정
    });
    return { data, isLoading, error };
};

/*****************************************************************************/

export const fetchMinMaxData = async () => {
    const response = await fetch('http://118.43.32.5:8980/api/minmax?scp_id=2200138303_303'); // URL 수정
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};

export const useMinMaxData = (interval = 10000) => { // interval 매개변수 추가
    const { data, isLoading, error } = useQuery('minmaxData', fetchMinMaxData, {
        refetchInterval: interval, // 매개변수로 받은 값 사용
        initialData: [], // 초기값을 빈 배열로 설정
    });
    return { data, isLoading, error };
};

/***************************************************************************
// 전압 데이터 가져오기
export const fetchDiagramDetailData = async () => {
    const response = await fetch('http://118.43.32.5:8980/api/device-m');
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};

export const useDiagramDetailData = (interval = 10000) => { // interval 매개변수 추가
    const { data, isLoading, error } = useQuery('diagramdetailData', fetchDiagramDetailData, {
        refetchInterval: interval, // 매개변수로 받은 값 사용
        initialData: [], // 초기값을 빈 배열로 설정
    });
    return { data, isLoading, error };
};**/