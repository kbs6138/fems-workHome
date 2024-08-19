import { useQuery } from 'react-query';

export const fetchTrendData = async (selectedData, dataType) => {
    //주소칸 작은 따옴표 ''에서 백틱 ``로 변경
    const url = `http://agen072.iptime.org:8980/api/${dataType}?scp_id=${selectedData.scp_id}&yyyy=${selectedData.yyyy}&mm=${selectedData.mm}&dd=${selectedData.dd}`;
    //http://agen072.iptime.org:8980/api/trend-volt?scp_id=2300136001&yyyy=2024&mm=08&dd=14
    const response = await fetch(url);
    const data = await response.json();

    return data; // 데이터 구조를 그대로 반환
};

//react는 함수이름이 아닌 querykey를 기준으로 쿼리를 구분함. 서로 다른 쿼리가 같은 쿼리 키를 쓰면 두 데이터가 충돌날 수 있음.
export const useTrendData = (selectedData, queryKey, dataType) => {
    const { data } = useQuery([queryKey, selectedData], () => fetchTrendData(selectedData, dataType), {
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
        initialData: { wat: 0 }, // 초기값을 단순한 객체로 변경
    });
    
    return { data };
};

//....................................................................월별