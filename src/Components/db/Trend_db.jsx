import { useQuery } from 'react-query';

export const fetchTrendVoltData = async (selectedData) => {
    //주소칸 작은 따옴표 ''에서 백틱 ``로 변경
    const response = await fetch(`http://agen072.iptime.org:8980/api/trend-volt?scp_id=${selectedData.scp_id}&yyyy=${selectedData.yyyy}&mm=${selectedData.mm}&dd=${selectedData.dd}`);
    const data = await response.json();
    console.log(`http://agen072.iptime.org:8980/api/trend?scp_id=${selectedData.scp_id}&yyyy=${selectedData.yyyy}&mm=${selectedData.mm}&dd=${selectedData.dd}`)
    return data; // 데이터 구조를 그대로 반환
};

export const useTrendVoltData = (selectedData) => {
    const { data } = useQuery(['trendData', selectedData], () => fetchTrendVoltData(selectedData), {
        refetchInterval: 10000,
        initialData: { wat: 0 }, // 초기값을 단순한 객체로 변경
    });
    
    return { data };
};

export const fetchTrendAmData = async (selectedData) => {
    //주소칸 작은 따옴표 ''에서 백틱 ``로 변경
    const response = await fetch(`http://agen072.iptime.org:8980/api/trend-am?scp_id=${selectedData.scp_id}&yyyy=${selectedData.yyyy}&mm=${selectedData.mm}&dd=${selectedData.dd}`);
    const data = await response.json();
    console.log(`http://agen072.iptime.org:8980/api/trend?scp_id=${selectedData.scp_id}&yyyy=${selectedData.yyyy}&mm=${selectedData.mm}&dd=${selectedData.dd}`)
    return data; // 데이터 구조를 그대로 반환
};

export const useTrendAmData = (selectedData) => {
    const { data } = useQuery(['trendData', selectedData], () => fetchTrendAmData(selectedData), {
        refetchInterval: 10000,
        initialData: { wat: 0 }, // 초기값을 단순한 객체로 변경
    });
    
    return { data };
};


//....................................................................시간별

export const fetchTrendDataDay = async (selectedData) => {
    //주소칸 작은 따옴표 ''에서 백틱 ``로 변경
    const response = await fetch(`http://agen072.iptime.org:8980/api/trend?scp_id=${selectedData.scp_id}&yyyy=${selectedData.yyyy}&mm=${selectedData.mm}&dd=${selectedData.dd}`);
    const data = await response.json();
    console.log(`http://agen072.iptime.org:8980/api/trend?scp_id=${selectedData.scp_id}&yyyy=${selectedData.yyyy}&mm=${selectedData.mm}&dd=${selectedData.dd}`)
    return data; // 데이터 구조를 그대로 반환
};

export const useTrendDataDay = (selectedData) => {
    const { data } = useQuery(['trendData', selectedData], () => fetchTrendDataDay(selectedData), {
        refetchInterval: 10000,
        initialData: { wat: 0 }, // 초기값을 단순한 객체로 변경
    });
    
    return { data };
};

//....................................................................일별

export const fetchTrendDataMonth = async (selectedData) => {
    //주소칸 작은 따옴표 ''에서 백틱 ``로 변경
    const response = await fetch(`http://agen072.iptime.org:8980/api/trend?scp_id=${selectedData.scp_id}&yyyy=${selectedData.yyyy}&mm=${selectedData.mm}&dd=${selectedData.dd}`);
    const data = await response.json();
    console.log(`http://agen072.iptime.org:8980/api/trend?scp_id=${selectedData.scp_id}&yyyy=${selectedData.yyyy}&mm=${selectedData.mm}&dd=${selectedData.dd}`)
    return data; // 데이터 구조를 그대로 반환
};

export const useTrendDataMonth = (selectedData) => {
    const { data } = useQuery(['trendData', selectedData], () => fetchTrendDataMonth(selectedData), {
        refetchInterval: 10000,
        initialData: { wat: 0 }, // 초기값을 단순한 객체로 변경
    });
    
    return { data };
};

//....................................................................월별