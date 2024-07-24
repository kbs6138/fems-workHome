import { useQuery } from 'react-query';

// 전압 데이터 가져오기
export const fetchVoltData = async () => {
    const response = await fetch('http://agen072.iptime.org:8980/api/v_data?scp_id=2300136001');
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};

export const useVoltData = () => {
    const { data, isLoading, error } = useQuery('voltData', fetchVoltData, {
        refetchInterval: 5000,
        initialData: [], // 초기값을 빈 배열로 설정
    });
    return { data, isLoading, error };
};

// 전류 데이터 가져오기
export const fetchAmData = async () => {
    const response = await fetch('http://agen072.iptime.org:8980/api/v_data?scp_id=2300136001'); // URL 수정
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};

export const useAmData = () => {
    const { data, isLoading, error } = useQuery('amData', fetchAmData, {
        refetchInterval: 5000,
        initialData: [], // 초기값을 빈 배열로 설정
    });
    return { data, isLoading, error };
};

// 전력 데이터 가져오기
export const fetchWData = async () => {
    const response = await fetch('http://agen072.iptime.org:8980/api/v_data?scp_id=2300136001'); // URL 수정
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};

export const useWData = () => {
    const { data, isLoading, error } = useQuery('wData', fetchWData, {
        refetchInterval: 5000,
        initialData: [], // 초기값을 빈 배열로 설정
    });
    return { data, isLoading, error };
};

// 역률 데이터 가져오기
export const fetchPfData = async () => {
    const response = await fetch('http://agen072.iptime.org:8980/api/v_data?scp_id=2300136001'); // URL 수정
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};

export const usePFData = () => {
    const { data, isLoading, error } = useQuery('pfData', fetchPfData, {
        refetchInterval: 5000,
        initialData: [], // 초기값을 빈 배열로 설정
    });
    return { data, isLoading, error };
};

// 내부 온도 데이터 가져오기
export const fetchInData = async () => {
    const response = await fetch('http://agen072.iptime.org:8980/api/v_data?scp_id=2300136001'); // URL 수정
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};

export const useInData = () => {
    const { data, isLoading, error } = useQuery('inData', fetchInData, {
        refetchInterval: 5000,
        initialData: [], // 초기값을 빈 배열로 설정
    });
    return { data, isLoading, error };
};

// 외부 온도 데이터 가져오기
export const fetchOutData = async () => {
    const response = await fetch('http://agen072.iptime.org:8980/api/v_data?scp_id=2300136001'); // URL 수정
    const data = await response.json();
    return data; // 데이터 구조를 그대로 반환
};

export const useOutData = () => {
    const { data, isLoading, error } = useQuery('outData', fetchOutData, {
        refetchInterval: 5000,
        initialData: [], // 초기값을 빈 배열로 설정
    });
    return { data, isLoading, error };
};
