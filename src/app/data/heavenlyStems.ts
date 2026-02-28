// 10천간(天干) 기반 투자 페르소나 데이터

export type StemKey =
  | 'gap-mok'    // 甲木 - 갑목
  | 'eul-mok'    // 乙木 - 을목
  | 'byeong-hwa' // 丙火 - 병화
  | 'jeong-hwa'  // 丁火 - 정화
  | 'mu-to'      // 戊土 - 무토
  | 'gi-to'      // 己土 - 기토
  | 'gyeong-geum'// 庚金 - 경금
  | 'sin-geum'   // 辛金 - 신금
  | 'im-su'      // 壬水 - 임수
  | 'gye-su';    // 癸水 - 계수

export interface RadarStats {
  patience: number;   // 인내심
  speed: number;      // 속도
  infoPower: number;  // 정보력
  mental: number;     // 멘탈
  desire: number;     // 욕망
}

export interface StemPersona {
  id: StemKey;
  hanja: string;            // 甲木, 乙木 ...
  hanjaType: string;        // 陽木, 陰木 ...
  koreanName: string;       // 갑목, 을목 ...
  chineseChar: string;      // 甲, 乙 (single)
  elementChar: string;      // 木, 火, 土, 金, 水
  englishTitle: string;     // Gap-Mok: The Stubborn Blue Chip Giant
  koreanTitle: string;      // 고집불통 우량주 거목형
  elementColor: string;     // glow color
  secondaryColor: string;   // secondary accent
  bgGradient: string;
  characterEmoji: string;   // main emoji for character
  accessoryEmoji: string;   // key prop emoji
  quote: string;
  description: string;
  radarStats: RadarStats;
  luckyStocks: string[];
  tabooStocks: string[];
  luckyColor: string;
  luckyNumber: number;
  advice: string;
}

export const STEM_PERSONAS: Record<StemKey, StemPersona> = {
  'gap-mok': {
    id: 'gap-mok',
    hanja: '甲木',
    hanjaType: '陽木',
    koreanName: '갑목',
    chineseChar: '甲',
    elementChar: '木',
    englishTitle: 'Gap-Mok: The Stubborn Blue Chip Giant',
    koreanTitle: '고집불통 우량주 거목형',
    elementColor: '#00FFB2',
    secondaryColor: '#39FF14',
    bgGradient: 'linear-gradient(160deg, #010f06 0%, #021a0a 40%, #011508 70%, #020c05 100%)',
    characterEmoji: '🎓',
    accessoryEmoji: '💻',
    quote: '"삼성이 100만 원 가는 거 나만 알아. 10년 후에 이 계좌 열어볼 거야."',
    description: '시장의 거목처럼 흔들리지 않는 우량주 신봉자. 시총 1위 종목만 사며 절대 마음을 바꾸지 않는다. 멘탈은 최강이나, 이게 때론 강제 장기투자로 이어진다.',
    radarStats: { patience: 92, speed: 18, infoPower: 52, mental: 88, desire: 50 },
    luckyStocks: ['대형 우량주', '삼성전자', 'SK하이닉스', '현대차'],
    tabooStocks: ['테마주', '스팩주', '선물옵션'],
    luckyColor: '청록색',
    luckyNumber: 4,
    advice: '2026년 대형주 랠리가 당신을 부른다. 인내의 열매는 달콤하다.',
  },
  'eul-mok': {
    id: 'eul-mok',
    hanja: '乙木',
    hanjaType: '陰木',
    koreanName: '을목',
    chineseChar: '乙',
    elementChar: '木',
    englishTitle: 'Eul-Mok: The Flapping-Ear Theme Weed',
    koreanTitle: '팔랑귀 테마주 잡초형',
    elementColor: '#A8FF3E',
    secondaryColor: '#7FFF00',
    bgGradient: 'linear-gradient(160deg, #030e00 0%, #061a02 40%, #041202 70%, #020c01 100%)',
    characterEmoji: '👂',
    accessoryEmoji: '📢',
    quote: '"어제는 로봇주, 오늘은 바이오주! 귀가 열려있다는 건 기회가 열려있다는 것! 가즈아!"',
    description: '뉴스에 민감하게 반응하는 테마주 전문 잡초. 어디서나 자라나지만, 루머 한 방에 뿌리째 뽑힌다. 수수료만으로 손실 내는 의문의 재능 보유.',
    radarStats: { patience: 22, speed: 92, infoPower: 88, mental: 38, desire: 72 },
    luckyStocks: ['테마주', '바이오', 'AI 로봇', '2차전지'],
    tabooStocks: ['배당주', '인덱스 ETF'],
    luckyColor: '연두색',
    luckyNumber: 5,
    advice: '테마의 흐름을 타되, 손절 라인만큼은 철석같이 지키는 해.',
  },
  'byeong-hwa': {
    id: 'byeong-hwa',
    hanja: '丙火',
    hanjaType: '陽火',
    koreanName: '병화',
    chineseChar: '丙',
    elementChar: '火',
    englishTitle: 'Byeong-Hwa: The Fire Moth Chase Trader',
    koreanTitle: '불나방 따상 추격형',
    elementColor: '#FF3300',
    secondaryColor: '#FF6B00',
    bgGradient: 'linear-gradient(160deg, #140200 0%, #2d0500 40%, #1f0300 70%, #0f0100 100%)',
    characterEmoji: '😎',
    accessoryEmoji: '🔥',
    quote: '"지금 안 사면 죽어! 이 종목 놓치면 인생 끝이야! 올인!"',
    description: '불꽃 속으로 직진하는 충동의 화신. 급등주를 직감으로 추격하지만, 매번 꼭짓점에 물리는 신기한 능력 보유. 손절은 존재하지 않는 단어다.',
    radarStats: { patience: 14, speed: 96, infoPower: 50, mental: 38, desire: 94 },
    luckyStocks: ['급등 테마', '따상 신규주', '게임주', 'AI 솔루션'],
    tabooStocks: ['배당주', '금융주', '유틸리티'],
    luckyColor: '빨간색',
    luckyNumber: 7,
    advice: '불의 기운이 최고조인 해. 단, 역불과의 전쟁에서 반드시 살아남아라.',
  },
  'jeong-hwa': {
    id: 'jeong-hwa',
    hanja: '丁火',
    hanjaType: '陰火',
    koreanName: '정화',
    chineseChar: '丁',
    elementChar: '火',
    englishTitle: 'Jeong-Hwa: The Single Stock Pure Lover',
    koreanTitle: '단일 종목 순애보형 (촛불형)',
    elementColor: '#CC44FF',
    secondaryColor: '#FF44AA',
    bgGradient: 'linear-gradient(160deg, #0d0014 0%, #1a0022 40%, #140018 70%, #080010 100%)',
    characterEmoji: '🕯️',
    accessoryEmoji: '💜',
    quote: '"오직 너만 알아. 네 진정한 가치는 나만 알아. 꽃 피울 때까지 기다릴게..."',
    description: '오직 하나의 종목만 연구하고 기다리는 순수한 영혼. 깊은 분석력으로 종목을 꿰뚫지만, 기다리는 동안 영혼이 서서히 불타오른다.',
    radarStats: { patience: 82, speed: 24, infoPower: 32, mental: 86, desire: 58 },
    luckyStocks: ['가치주', '숨은 우량주', '코스닥 성장주'],
    tabooStocks: ['인덱스', '급등테마', '레버리지'],
    luckyColor: '보라색',
    luckyNumber: 7,
    advice: '당신이 믿는 그 종목, 2026년에 드디어 피어난다. 촛불을 끄지 마라.',
  },
  'mu-to': {
    id: 'mu-to',
    hanja: '戊土',
    hanjaType: '陽土',
    koreanName: '무토',
    chineseChar: '戊',
    elementChar: '土',
    englishTitle: 'Mu-To: The Unmovable Mountain (Digital Monk)',
    koreanTitle: '요지부동 태산형 (디지털 스님)',
    elementColor: '#FFD700',
    secondaryColor: '#FFA500',
    bgGradient: 'linear-gradient(160deg, #100a00 0%, #221500 40%, #1a1000 70%, #0d0800 100%)',
    characterEmoji: '🧘',
    accessoryEmoji: '⛰️',
    quote: '"시장이 요동쳐도 나의 포트폴리오는 태산이다. 10년 후에 보자."',
    description: '거대한 산처럼 움직이지 않는 디지털 수도승. 국가 대표 기업과 ETF에만 투자하며, 어떤 폭락에도 명상을 멈추지 않는다. 기회비용 계산은 포기한 지 오래.',
    radarStats: { patience: 96, speed: 18, infoPower: 58, mental: 92, desire: 24 },
    luckyStocks: ['KOSPI 200 ETF', '삼성전자', 'KB금융', 'POSCO홀딩스'],
    tabooStocks: ['레버리지 ETF', '선물옵션', '테마주'],
    luckyColor: '황금색',
    luckyNumber: 5,
    advice: '태산은 흔들리지 않는다. 장기 복리의 마법을 당신이 가장 잘 이해한다.',
  },
  'gi-to': {
    id: 'gi-to',
    hanja: '己土',
    hanjaType: '陰土',
    koreanName: '기토',
    chineseChar: '己',
    elementChar: '土',
    englishTitle: 'Gi-To: The Microscope Dividend Gardener',
    koreanTitle: '현미경 배당형 (정원사형)',
    elementColor: '#E07040',
    secondaryColor: '#C85E30',
    bgGradient: 'linear-gradient(160deg, #110500 0%, #220b00 40%, #1a0800 70%, #0d0400 100%)',
    characterEmoji: '🔍',
    accessoryEmoji: '🌸',
    quote: '"따상은 거짓말해도 배당금은 배신 안 해. DY 8% 종목 발견! (1% 빠지면 패닉)"',
    description: '배당수익률 소수점 세 자리까지 계산하는 꼼꼼한 정원사. 현실적이고 분석적이나, 1%만 하락해도 패닉셀 발동. 큰 기회는 과분석으로 놓친다.',
    radarStats: { patience: 78, speed: 32, infoPower: 88, mental: 62, desire: 28 },
    luckyStocks: ['배당주', '리츠', '금융주', '통신주'],
    tabooStocks: ['무배당 성장주', '코인 관련주', '신규주'],
    luckyColor: '황토색',
    luckyNumber: 9,
    advice: '배당 정원의 꽃이 만개하는 해. 단, 분석만 하다 봄을 놓치지 마라.',
  },
  'gyeong-geum': {
    id: 'gyeong-geum',
    hanja: '庚金',
    hanjaType: '陽金',
    koreanName: '경금',
    chineseChar: '庚',
    elementChar: '金',
    englishTitle: 'Gyeong-Geum: The Sword-Wielding Day Trader',
    koreanTitle: '작두 타는 단타 머신 (칼치기형)',
    elementColor: '#C8D8F0',
    secondaryColor: '#A0B8E0',
    bgGradient: 'linear-gradient(160deg, #080c14 0%, #10182a 40%, #0c1420 70%, #060a12 100%)',
    characterEmoji: '⚔️',
    accessoryEmoji: '📊',
    quote: '"감정은 사치다. 나는 차트의 신호에만 반응한다. 칼집에서 칼을."',
    description: '냉철한 기계처럼 기술적 분석으로만 단타를 치는 칼치기 달인. 소음에 흔들리지 않으나, 단 한 번의 실수가 전체를 무너뜨린다.',
    radarStats: { patience: 22, speed: 96, infoPower: 72, mental: 92, desire: 58 },
    luckyStocks: ['시총 상위 단타', '선물 연계 종목', '변동성 높은 주'],
    tabooStocks: ['장기 보유주', '배당주', '우선주'],
    luckyColor: '은색',
    luckyNumber: 9,
    advice: '칼날 위에서의 춤. 2026년 변동성 장에서 당신의 기술이 빛난다.',
  },
  'sin-geum': {
    id: 'sin-geum',
    hanja: '辛金',
    hanjaType: '陰金',
    koreanName: '신금',
    chineseChar: '辛',
    elementChar: '金',
    englishTitle: 'Sin-Geum: The Sensitive Diamond Holder',
    koreanTitle: '예민한 다이아몬드형 (보석형)',
    elementColor: '#E8F0FF',
    secondaryColor: '#B8CCFF',
    bgGradient: 'linear-gradient(160deg, #060812 0%, #0c1024 40%, #090c1c 70%, #040610 100%)',
    characterEmoji: '🧤',
    accessoryEmoji: '💎',
    quote: '"나는 오직 완벽하고 빛나는 프리미엄 주식만 소유한다. (어? 빠지는 거야?)"',
    description: '섬세한 완벽주의자. 글로벌 명품주·기술주만 담는 고귀한 취향. 하지만 조금만 흔들려도 불안해서 일찍 팔아버리는 연약한 심장 소유자.',
    radarStats: { patience: 42, speed: 52, infoPower: 86, mental: 24, desire: 82 },
    luckyStocks: ['글로벌 기술주', '명품 소비재', '반도체 장비'],
    tabooStocks: ['저PBR 가치주', '테마 소형주', '부실주'],
    luckyColor: '흰색·은색',
    luckyNumber: 1,
    advice: '당신이 고른 다이아몬드는 진짜다. 불안에 굴복하지 않는 해를 만들어라.',
  },
  'im-su': {
    id: 'im-su',
    hanja: '壬水',
    hanjaType: '陽水',
    koreanName: '임수',
    chineseChar: '壬',
    elementChar: '水',
    englishTitle: 'Im-Su: The Global Wave Surfer',
    koreanTitle: '글로벌 파도형 (해외개미)',
    elementColor: '#0080FF',
    secondaryColor: '#00B4FF',
    bgGradient: 'linear-gradient(160deg, #000814 0%, #001428 40%, #000e1e 70%, #00060e 100%)',
    characterEmoji: '🏄',
    accessoryEmoji: '🌏',
    quote: '"한국은 그냥 국내 시장이잖아요. 진짜 돈은 미국에 있어요! 나스닥 GOGO!"',
    description: '거시경제를 읽는 파도 위의 서퍼. 나스닥과 해외 ETF를 사랑하며 글로벌 트렌드를 가장 먼저 캐치. 시차와 환율 리스크로 늘 피곤하다.',
    radarStats: { patience: 36, speed: 72, infoPower: 92, mental: 32, desire: 86 },
    luckyStocks: ['나스닥 ETF', '미국 빅테크', 'S&P500 ETF', '해외 채권'],
    tabooStocks: ['국내 소형주', '코스닥 테마', '부동산 관련주'],
    luckyColor: '파란색',
    luckyNumber: 3,
    advice: '세계 파도가 당신을 부른다. 환헤지 전략과 함께라면 무적이다.',
  },
  'gye-su': {
    id: 'gye-su',
    hanja: '癸水',
    hanjaType: '陰水',
    koreanName: '계수',
    chineseChar: '癸',
    elementChar: '水',
    englishTitle: 'Gye-Su: The Rumor Whisperer (Zhirasi 개미)',
    koreanTitle: '카더라 정보통형 (지라시 개미)',
    elementColor: '#88CCFF',
    secondaryColor: '#55AAEE',
    bgGradient: 'linear-gradient(160deg, #00080f 0%, #001018 40%, #000c14 70%, #000608 100%)',
    characterEmoji: '🕵️',
    accessoryEmoji: '📱',
    quote: '"이거 CEO 기사관 조카한테 직접 들었어. 내일 상한가 간대... (미확인)"',
    description: '5개의 스마트폰을 들고 텔레그램 정보방을 순례하는 신비한 정보원. 데이터는 넘치지만 검증은 생략. 작전세력의 단골 호구이기도 하다.',
    radarStats: { patience: 28, speed: 78, infoPower: 96, mental: 20, desire: 88 },
    luckyStocks: ['정보 선취매', '인수합병 관련주', '루머 테마'],
    tabooStocks: ['공시 의존 종목', '장기 가치주'],
    luckyColor: '하늘색',
    luckyNumber: 2,
    advice: '정보력은 세계 최강. 2026년엔 검증된 정보만 사용하면 대박이 온다.',
  },
};

// 생년의 끝자리로 천간 캐릭터 결정
export function getStemFromBirthYear(birthDate: string): StemKey {
  const year = parseInt(birthDate.split('-')[0], 10);
  const last = year % 10;
  const map: Record<number, StemKey> = {
    4: 'gap-mok',
    5: 'eul-mok',
    6: 'byeong-hwa',
    7: 'jeong-hwa',
    8: 'mu-to',
    9: 'gi-to',
    0: 'gyeong-geum',
    1: 'sin-geum',
    2: 'im-su',
    3: 'gye-su',
  };
  return map[last] ?? 'gap-mok';
}

export const RADAR_LABELS: Record<keyof RadarStats, string> = {
  patience: '인내심',
  speed: '속도',
  infoPower: '정보력',
  mental: '멘탈',
  desire: '욕망',
};