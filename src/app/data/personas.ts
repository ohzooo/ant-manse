export type ElementKey = '화' | '금' | '수' | '목' | '토';

export interface Persona {
  id: ElementKey;
  name: string;
  englishName: string;
  element: string;
  elementColor: string;
  bgGradient: string;
  emoji: string;
  tagline: string;
  description: string;
  luckyStocks: string[];
  tabooStocks: string[];
  luckyColor: string;
  luckyNumber: number;
  ohaeng: Record<ElementKey, number>;
  advice: string;
  weakElement: ElementKey;
}

export const PERSONAS: Record<ElementKey, Persona> = {
  화: {
    id: '화',
    name: '불나방',
    englishName: 'Fire Moth',
    element: '火',
    elementColor: '#FF4D4D',
    bgGradient: 'linear-gradient(135deg, #1f0505 0%, #3d0808 50%, #1f0808 100%)',
    emoji: '🦋',
    tagline: '"손실이 두렵지 않다. 기회만 두렵다"',
    description:
      '뜨거운 수익을 향해 날아드는 불나방! 단기 급등주를 직감으로 캐치하는 천부적 재능을 보유했지만, 때로는 불꽃에 뛰어드는 무모함이 있습니다.',
    luckyStocks: ['2차전지', '반도체', 'AI 솔루션', '게임'],
    tabooStocks: ['금융주', '건설주', '농업주'],
    luckyColor: '빨간색',
    luckyNumber: 7,
    ohaeng: { 화: 90, 금: 25, 수: 40, 목: 65, 토: 35 },
    advice: '2026년 상반기, 화(火)의 기운이 최고조! 단기 급등 테마를 집중 공략하세요.',
    weakElement: '금',
  },
  금: {
    id: '금',
    name: '황금 은둔자',
    englishName: 'Gold Hermit',
    element: '金',
    elementColor: '#FFD700',
    bgGradient: 'linear-gradient(135deg, #1a1500 0%, #3d3000 50%, #1a1500 100%)',
    emoji: '🏆',
    tagline: '"느리지만 확실하게, 금은 녹슬지 않는다"',
    description:
      '황금의 기운을 품은 냉철한 분석가! 가치투자의 달인으로, 남들이 팔 때 사는 역발상 투자자입니다. 인내가 곧 수익입니다.',
    luckyStocks: ['금융주', '보험주', '방산주', '철강'],
    tabooStocks: ['테마주', '코인 관련주'],
    luckyColor: '황금색',
    luckyNumber: 9,
    ohaeng: { 화: 30, 금: 85, 수: 55, 목: 40, 토: 70 },
    advice: '금리 변동기에 금융주 집중 투자 전략이 당신의 운명입니다.',
    weakElement: '수',
  },
  수: {
    id: '수',
    name: '폭풍 기수',
    englishName: 'Storm Rider',
    element: '水',
    elementColor: '#00D4FF',
    bgGradient: 'linear-gradient(135deg, #00050a 0%, #001829 50%, #00050a 100%)',
    emoji: '🌊',
    tagline: '"파도를 피하지 않는다, 타는 것이다"',
    description:
      '물처럼 유연하게 시장을 읽는 전략가! 어떤 상황에서도 흐름을 찾아내는 뛰어난 적응력으로 변동성 구간에서 진가를 발휘합니다.',
    luckyStocks: ['바이오', '헬스케어', '해운주', '물산업'],
    tabooStocks: ['화력발전', '정유주'],
    luckyColor: '파란색',
    luckyNumber: 3,
    ohaeng: { 화: 40, 금: 55, 수: 90, 목: 70, 토: 25 },
    advice: '수(水) 기운이 강한 당신, 변동성 큰 구간에서 남다른 기회를 잡습니다.',
    weakElement: '토',
  },
  목: {
    id: '목',
    name: '청룡 투자자',
    englishName: 'Blue Dragon',
    element: '木',
    elementColor: '#39FF14',
    bgGradient: 'linear-gradient(135deg, #011a00 0%, #023d00 50%, #011a00 100%)',
    emoji: '🐉',
    tagline: '"씨앗이 나무가 되는 시간을 즐긴다"',
    description:
      '천년을 꿈꾸는 청룡의 기운! 성장주에 대한 안목이 탁월하며 인내심이 강한 장기 투자자. 한 번 잡은 기업은 끝까지 믿습니다.',
    luckyStocks: ['그린에너지', '친환경', 'ESG', '농업기술'],
    tabooStocks: ['담배주', '석탄주'],
    luckyColor: '초록색',
    luckyNumber: 4,
    ohaeng: { 화: 60, 금: 35, 수: 65, 목: 90, 토: 45 },
    advice: '친환경·그린 테마의 중장기 상승 사이클이 당신을 기다립니다.',
    weakElement: '화',
  },
  토: {
    id: '토',
    name: '디지털 도사',
    englishName: 'Digital Monk',
    element: '土',
    elementColor: '#FF8C00',
    bgGradient: 'linear-gradient(135deg, #1a0d00 0%, #3d2000 50%, #1a0d00 100%)',
    emoji: '⛰️',
    tagline: '"땅은 거짓말하지 않는다"',
    description:
      '대지처럼 안정적인 디지털 도사! 펀더멘털을 기반으로 한 철저한 분석가로, 시장의 소음에 흔들리지 않고 본질 가치를 꿰뚫습니다.',
    luckyStocks: ['IT 인프라', '부동산', '건설주', '유통'],
    tabooStocks: ['선물옵션', '레버리지 ETF'],
    luckyColor: '황토색',
    luckyNumber: 5,
    ohaeng: { 화: 50, 금: 60, 수: 40, 목: 55, 토: 85 },
    advice: '안정적인 배당주와 리츠(REITs)가 당신의 운명적 투자처입니다.',
    weakElement: '수',
  },
};

export function getElementFromBirthDate(birthDate: string): ElementKey {
  const year = parseInt(birthDate.split('-')[0], 10);
  const last = year % 10;
  if (last === 0 || last === 1) return '금';
  if (last === 2 || last === 3) return '수';
  if (last === 4 || last === 5) return '목';
  if (last === 6 || last === 7) return '화';
  return '토';
}

export const ELEMENT_LABELS: Record<ElementKey, string> = {
  화: '火 (화)',
  금: '金 (금)',
  수: '水 (수)',
  목: '木 (목)',
  토: '土 (토)',
};

export const ELEMENT_COLORS: Record<ElementKey, string> = {
  화: '#FF4D4D',
  금: '#FFD700',
  수: '#00D4FF',
  목: '#39FF14',
  토: '#FF8C00',
};

export interface FortuneData {
  name: string;
  birthDate: string;
  investStyle: 'aggressive' | 'balanced' | 'conservative';
}

export const FORTUNE_KEY = 'antmanse_fortune';
