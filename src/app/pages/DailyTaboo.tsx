import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, BellOff, ChevronRight, ShieldAlert, AlertTriangle, TrendingDown, Compass, Palette, Clock } from 'lucide-react';
import { FORTUNE_KEY, getElementFromBirthDate, PERSONAS, ELEMENT_COLORS, type ElementKey } from '../data/personas';

const TODAY = '2026년 2월 28일 (토)';

const TABOOS = [
  {
    id: 1,
    icon: Compass,
    color: '#FF4D4D',
    title: '서(西)쪽 방향 종목 금기',
    description: '오늘 오행상 金(금)의 기운이 과도합니다. 서쪽 방향 본사 소재 기업 투자를 자제하세요.',
    severity: '🔴 위험',
    time: '전일 유효',
  },
  {
    id: 2,
    icon: Palette,
    color: '#39FF14',
    title: '초록 로고 종목 주의',
    description: '木(목) 기운이 火(화)와 충돌하는 날. 초록색 계열 로고 기업은 오전 매매를 피하세요.',
    severity: '🟡 주의',
    time: '오전 9시~12시',
  },
  {
    id: 3,
    icon: TrendingDown,
    color: '#FF8C00',
    title: '레버리지 ETF 절대 금기',
    description: '오늘 시장 기운이 불안정합니다. 레버리지·인버스 상품은 오늘 하루 완전 금기입니다.',
    severity: '🔴 위험',
    time: '종일',
  },
  {
    id: 4,
    icon: Clock,
    color: '#00D4FF',
    title: '오후 2시 매매 조심',
    description: '水(수) 시각이 시작되는 오후 2시는 감정적 매매가 발생하기 쉬운 시간입니다. 이 시간대 호가창을 닫아두세요.',
    severity: '🟡 주의',
    time: '오후 14:00~15:00',
  },
  {
    id: 5,
    icon: AlertTriangle,
    color: '#BF5FFF',
    title: '테마주 충동 매수 경고',
    description: '오늘 뉴스 테마주에 홀리기 쉬운 날의 기운. 갑자기 떠오른 종목은 24시간 관찰 후 매수하세요.',
    severity: '🟡 주의',
    time: '전일',
  },
];

const LUCKY_TIPS = [
  { emoji: '🟡', text: '오늘의 행운 색상: 황금색 · 황토색', color: '#FFD700' },
  { emoji: '🔢', text: '행운의 매수가 단위: 끝자리 5 또는 9', color: '#FFD700' },
  { emoji: '⏰', text: '최고의 매매 시간: 오전 10:30~11:30', color: '#00D4FF' },
  { emoji: '☀️', text: '오늘 KOSPI 기운: 상승 에너지 60%', color: '#39FF14' },
];

type TabooId = number;

export function DailyTabooPage() {
  const [notifications, setNotifications] = useState<Set<TabooId>>(new Set());
  const [allNotif, setAllNotif] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const raw = localStorage.getItem(FORTUNE_KEY);
  let elementColor = '#FFD700';
  let elementName = '金';
  if (raw) {
    try {
      const d = JSON.parse(raw);
      const el: ElementKey = getElementFromBirthDate(d.birthDate);
      elementColor = ELEMENT_COLORS[el];
      elementName = PERSONAS[el].element;
    } catch { /* ignore */ }
  }

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const toggleNotif = (id: TabooId) => {
    setNotifications((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('알림이 해제되었습니다.');
      } else {
        next.add(id);
        showToast('⏰ 알림 설정 완료! 해당 시간에 알려드릴게요.');
      }
      return next;
    });
  };

  const toggleAllNotif = () => {
    if (allNotif) {
      setAllNotif(false);
      setNotifications(new Set());
      showToast('전체 알림이 해제되었습니다.');
    } else {
      setAllNotif(true);
      setNotifications(new Set(TABOOS.map((t) => t.id)));
      showToast('🔔 전체 금기 알림 ON! 소중한 자산을 지켜드릴게요.');
    }
  };

  return (
    <div style={{ background: '#040D1E', minHeight: '100vh', padding: '0 0 24px' }}>
      <style>{`
        @keyframes shield-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px #FF4D4D); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 14px #FF4D4D); }
        }
        @keyframes glow-border {
          0%, 100% { border-color: rgba(255,77,77,0.2); }
          50% { border-color: rgba(255,77,77,0.5); }
        }
      `}</style>

      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            style={{
              position: 'fixed', top: '20px', left: '50%',
              background: 'rgba(4,13,30,0.95)',
              border: '1px solid rgba(255,215,0,0.4)',
              backdropFilter: 'blur(12px)',
              padding: '10px 20px', borderRadius: '99px',
              color: '#FFD700', fontSize: '0.82rem', fontWeight: 700,
              zIndex: 200, whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{
        padding: '20px 20px 16px',
        background: 'linear-gradient(180deg, rgba(255,77,77,0.08) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(255,77,77,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ animation: 'shield-pulse 2.5s ease-in-out infinite' }}>
            <ShieldAlert size={24} style={{ color: '#FF4D4D' }} />
          </div>
          <h1 style={{ color: '#E8F4FD', fontWeight: 900, fontSize: '1.3rem' }}>
            오늘의 주식 금기
          </h1>
        </div>
        <p style={{ color: 'rgba(200,220,255,0.5)', fontSize: '0.78rem' }}>
          {TODAY} · {elementName}({elementColor === '#FFD700' ? '금' : elementColor === '#FF4D4D' ? '화' : elementColor === '#00D4FF' ? '수' : elementColor === '#39FF14' ? '목' : '토'}) 기운 활성
        </p>

        {/* All notification toggle */}
        <button
          onClick={toggleAllNotif}
          style={{
            marginTop: '12px',
            display: 'flex', alignItems: 'center', gap: '8px',
            background: allNotif ? 'rgba(255,215,0,0.1)' : 'rgba(255,255,255,0.04)',
            border: allNotif ? '1px solid rgba(255,215,0,0.4)' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px', padding: '10px 14px',
            cursor: 'pointer', width: '100%',
            transition: 'all 0.3s',
          }}
        >
          {allNotif
            ? <Bell size={16} style={{ color: '#FFD700' }} />
            : <BellOff size={16} style={{ color: 'rgba(200,220,255,0.4)' }} />
          }
          <span style={{
            color: allNotif ? '#FFD700' : 'rgba(200,220,255,0.5)',
            fontSize: '0.82rem', fontWeight: 700, flex: 1, textAlign: 'left',
          }}>
            전체 금기 알림 {allNotif ? 'ON 🔔' : 'OFF'}
          </span>
          <div style={{
            width: '36px', height: '20px', borderRadius: '99px',
            background: allNotif ? '#FFD700' : 'rgba(255,255,255,0.1)',
            position: 'relative', transition: 'all 0.3s',
          }}>
            <div style={{
              position: 'absolute', top: '3px',
              left: allNotif ? '19px' : '3px',
              width: '14px', height: '14px', borderRadius: '50%',
              background: allNotif ? '#040D1E' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s',
            }} />
          </div>
        </button>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Today's lucky tip strip */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            borderRadius: '14px',
            background: 'rgba(255,215,0,0.06)',
            border: '1px solid rgba(255,215,0,0.2)',
            padding: '14px 16px', marginBottom: '16px',
          }}
        >
          <p style={{ color: '#FFD700', fontSize: '0.78rem', fontWeight: 700, marginBottom: '10px' }}>
            ✨ 오늘의 행운 가이드
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {LUCKY_TIPS.map((tip, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>{tip.emoji}</span>
                <span style={{ color: 'rgba(200,220,255,0.75)', fontSize: '0.75rem' }}>{tip.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Taboo list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {TABOOS.map((taboo, idx) => {
            const Icon = taboo.icon;
            const isNotified = notifications.has(taboo.id);
            return (
              <motion.div
                key={taboo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                style={{
                  borderRadius: '14px',
                  background: 'rgba(11,24,41,0.8)',
                  border: `1px solid ${taboo.color}25`,
                  padding: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Left accent bar */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: '3px', background: taboo.color,
                  boxShadow: `0 0 10px ${taboo.color}60`,
                }} />

                <div style={{ paddingLeft: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1 }}>
                      <Icon size={18} style={{ color: taboo.color, flexShrink: 0, marginTop: '1px' }} />
                      <div>
                        <p style={{ color: '#E8F4FD', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                          {taboo.title}
                        </p>
                        <p style={{ color: 'rgba(200,220,255,0.6)', fontSize: '0.75rem', lineHeight: 1.6 }}>
                          {taboo.description}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                          <span style={{
                            fontSize: '0.65rem', fontWeight: 700,
                            color: taboo.color,
                            background: `${taboo.color}15`,
                            padding: '2px 8px', borderRadius: '4px',
                          }}>
                            {taboo.severity}
                          </span>
                          <span style={{
                            fontSize: '0.65rem',
                            color: 'rgba(200,220,255,0.4)',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '2px 8px', borderRadius: '4px',
                          }}>
                            ⏰ {taboo.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Notification bell */}
                    <button
                      onClick={() => toggleNotif(taboo.id)}
                      style={{
                        background: isNotified ? `${taboo.color}15` : 'rgba(255,255,255,0.04)',
                        border: isNotified ? `1px solid ${taboo.color}40` : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px', padding: '8px',
                        cursor: 'pointer', flexShrink: 0,
                        transition: 'all 0.3s',
                      }}
                    >
                      {isNotified
                        ? <Bell size={15} style={{ color: taboo.color }} />
                        : <BellOff size={15} style={{ color: 'rgba(200,220,255,0.3)' }} />
                      }
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Wisdom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '20px', padding: '16px 18px',
            borderRadius: '14px',
            background: 'rgba(0,212,255,0.04)',
            border: '1px solid rgba(0,212,255,0.15)',
          }}
        >
          <p style={{ color: '#00D4FF', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px' }}>
            📜 오늘의 투자 격언
          </p>
          <p style={{ color: 'rgba(200,220,255,0.7)', fontSize: '0.82rem', lineHeight: 1.7, fontStyle: 'italic' }}>
            "금기를 지키는 것이 수익을 만드는 것보다 더 중요하다. 오행이 어긋난 날의 손실은 배로 돌아온다."
          </p>
          <p style={{ color: 'rgba(200,220,255,0.35)', fontSize: '0.68rem', marginTop: '6px' }}>
            — 개미만세력 AI 도사
          </p>
        </motion.div>

        {/* Tomorrow preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '12px', padding: '14px 16px',
            borderRadius: '14px',
            background: 'rgba(11,24,41,0.5)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div>
            <p style={{ color: 'rgba(200,220,255,0.4)', fontSize: '0.68rem', marginBottom: '2px' }}>
              내일 (2026.03.01)
            </p>
            <p style={{ color: 'rgba(200,220,255,0.7)', fontSize: '0.8rem', fontWeight: 700 }}>
              내일의 금기 미리 보기
            </p>
          </div>
          <ChevronRight size={18} style={{ color: 'rgba(200,220,255,0.3)' }} />
        </motion.div>
      </div>
    </div>
  );
}
