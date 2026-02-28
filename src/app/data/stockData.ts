// 실제 주식 종목 및 가격 데이터 (Mock)
// 실제 API 연동 시 이 부분을 실제 API 호출로 교체

export interface StockInfo {
  code: string;
  name: string;
  sector: string;
  currentPrice: number;
  changeRate: number; // 등락률 (%)
  changeAmount: number; // 등락 금액
}

// 섹터별 주식 종목 데이터
export const SECTOR_STOCKS: Record<string, StockInfo[]> = {
  '2차전지': [
    {
      code: '373220',
      name: 'LG에너지솔루션',
      sector: '2차전지',
      currentPrice: 385000,
      changeRate: 2.45,
      changeAmount: 9200,
    },
    {
      code: '006400',
      name: '삼성SDI',
      sector: '2차전지',
      currentPrice: 428000,
      changeRate: 1.78,
      changeAmount: 7500,
    },
    {
      code: '247540',
      name: '에코프로비엠',
      sector: '2차전지',
      currentPrice: 156700,
      changeRate: -1.32,
      changeAmount: -2100,
    },
  ],
  '반도체': [
    {
      code: '005930',
      name: '삼성전자',
      sector: '반도체',
      currentPrice: 72800,
      changeRate: 1.25,
      changeAmount: 900,
    },
    {
      code: '000660',
      name: 'SK하이닉스',
      sector: '반도체',
      currentPrice: 186500,
      changeRate: 2.89,
      changeAmount: 5250,
    },
    {
      code: '042700',
      name: '한미반도체',
      sector: '반도체',
      currentPrice: 89200,
      changeRate: 3.45,
      changeAmount: 2980,
    },
  ],
  'AI 솔루션': [
    {
      code: '035420',
      name: 'NAVER',
      sector: 'AI 솔루션',
      currentPrice: 245000,
      changeRate: 1.87,
      changeAmount: 4500,
    },
    {
      code: '035720',
      name: '카카오',
      sector: 'AI 솔루션',
      currentPrice: 48900,
      changeRate: -0.61,
      changeAmount: -300,
    },
    {
      code: '068270',
      name: '셀트리온',
      sector: 'AI 솔루션',
      currentPrice: 178500,
      changeRate: 0.85,
      changeAmount: 1500,
    },
  ],
  '게임': [
    {
      code: '036570',
      name: '엔씨소프트',
      sector: '게임',
      currentPrice: 289000,
      changeRate: 2.13,
      changeAmount: 6030,
    },
    {
      code: '251270',
      name: '넷마블',
      sector: '게임',
      currentPrice: 67400,
      changeRate: -1.45,
      changeAmount: -990,
    },
    {
      code: '112040',
      name: '위메이드',
      sector: '게임',
      currentPrice: 54200,
      changeRate: 4.23,
      changeAmount: 2200,
    },
  ],
  '금융주': [
    {
      code: '055550',
      name: '신한지주',
      sector: '금융주',
      currentPrice: 48700,
      changeRate: 0.62,
      changeAmount: 300,
    },
    {
      code: '086790',
      name: '하나금융지주',
      sector: '금융주',
      currentPrice: 58900,
      changeRate: 1.20,
      changeAmount: 700,
    },
    {
      code: '105560',
      name: 'KB금융',
      sector: '금융주',
      currentPrice: 71500,
      changeRate: 0.98,
      changeAmount: 695,
    },
  ],
  '보험주': [
    {
      code: '032830',
      name: '삼성생명',
      sector: '보험주',
      currentPrice: 89200,
      changeRate: 1.48,
      changeAmount: 1300,
    },
    {
      code: '088350',
      name: '한화생명',
      sector: '보험주',
      currentPrice: 3250,
      changeRate: -0.31,
      changeAmount: -10,
    },
  ],
  '방산주': [
    {
      code: '012450',
      name: '한화에어로스페이스',
      sector: '방산주',
      currentPrice: 264000,
      changeRate: 3.14,
      changeAmount: 8040,
    },
    {
      code: '079550',
      name: 'LIG넥스원',
      sector: '방산주',
      currentPrice: 187500,
      changeRate: 2.46,
      changeAmount: 4500,
    },
  ],
  '철강': [
    {
      code: '005490',
      name: 'POSCO홀딩스',
      sector: '철강',
      currentPrice: 425000,
      changeRate: 0.71,
      changeAmount: 3000,
    },
  ],
  '바이오': [
    {
      code: '068270',
      name: '셀트리온',
      sector: '바이오',
      currentPrice: 178500,
      changeRate: 0.85,
      changeAmount: 1500,
    },
    {
      code: '207940',
      name: '삼성바이오로직스',
      sector: '바이오',
      currentPrice: 892000,
      changeRate: 1.37,
      changeAmount: 12070,
    },
    {
      code: '326030',
      name: 'SK바이오팜',
      sector: '바이오',
      currentPrice: 89400,
      changeRate: -1.10,
      changeAmount: -995,
    },
  ],
  '헬스케어': [
    {
      code: '302440',
      name: 'SK바이오사이언스',
      sector: '헬스케어',
      currentPrice: 67800,
      changeRate: 1.95,
      changeAmount: 1300,
    },
  ],
  '해운주': [
    {
      code: '028670',
      name: 'HMM',
      sector: '해운주',
      currentPrice: 18750,
      changeRate: 2.74,
      changeAmount: 500,
    },
  ],
  '물산업': [
    {
      code: '096760',
      name: '웰크론한텍',
      sector: '물산업',
      currentPrice: 4565,
      changeRate: 0.33,
      changeAmount: 15,
    },
  ],
  '그린에너지': [
    {
      code: '239340',
      name: '한국신재생에너지',
      sector: '그린에너지',
      currentPrice: 4820,
      changeRate: 1.89,
      changeAmount: 89,
    },
  ],
  '친환경': [
    {
      code: '267980',
      name: '매일유업',
      sector: '친환경',
      currentPrice: 55600,
      changeRate: -0.18,
      changeAmount: -100,
    },
  ],
  'ESG': [
    {
      code: '051910',
      name: 'LG화학',
      sector: 'ESG',
      currentPrice: 385000,
      changeRate: 1.58,
      changeAmount: 6000,
    },
  ],
  '농업기술': [
    {
      code: '064260',
      name: '다날',
      sector: '농업기술',
      currentPrice: 1985,
      changeRate: 2.32,
      changeAmount: 45,
    },
  ],
  'IT 인프라': [
    {
      code: '017670',
      name: 'SK텔레콤',
      sector: 'IT 인프라',
      currentPrice: 59400,
      changeRate: 0.85,
      changeAmount: 500,
    },
    {
      code: '030200',
      name: 'KT',
      sector: 'IT 인프라',
      currentPrice: 42500,
      changeRate: 1.19,
      changeAmount: 500,
    },
  ],
  '부동산': [
    {
      code: '001527',
      name: 'GS건설우',
      sector: '부동산',
      currentPrice: 13200,
      changeRate: 0.00,
      changeAmount: 0,
    },
  ],
  '건설주': [
    {
      code: '000720',
      name: '현대건설',
      sector: '건설주',
      currentPrice: 36100,
      changeRate: 1.40,
      changeAmount: 500,
    },
    {
      code: '028260',
      name: '삼성물산',
      sector: '건설주',
      currentPrice: 158500,
      changeRate: 0.95,
      changeAmount: 1500,
    },
  ],
  '유통': [
    {
      code: '139480',
      name: '이마트',
      sector: '유통',
      currentPrice: 92800,
      changeRate: -0.43,
      changeAmount: -400,
    },
  ],
};

// 섹터명을 받아서 해당 섹터의 추천 종목 반환
export function getStocksBySector(sector: string): StockInfo[] {
  return SECTOR_STOCKS[sector] || [];
}

// 여러 섹터를 받아서 각 섹터에서 1개씩 추천 종목 반환
export function getRecommendedStocks(sectors: string[], maxPerSector: number = 2): StockInfo[] {
  const stocks: StockInfo[] = [];
  
  sectors.forEach(sector => {
    const sectorStocks = getStocksBySector(sector);
    // 각 섹터에서 maxPerSector개씩 가져오기
    stocks.push(...sectorStocks.slice(0, maxPerSector));
  });
  
  return stocks;
}

// 가격을 한국 원화 형식으로 포맷
export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR');
}

// 등락률 포맷
export function formatChangeRate(rate: number): string {
  const sign = rate > 0 ? '+' : '';
  return `${sign}${rate.toFixed(2)}%`;
}
