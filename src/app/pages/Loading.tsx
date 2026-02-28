import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Gift } from 'lucide-react';
import { FORTUNE_KEY } from '../data/personas';

const LOADING_TEXTS = [
  '金(금)의 기운을 소환하는 중...',
  '고래의 움직임을 포착하는 중...',
  '2,500개 종목과 운세 매칭 중...',
  '사주팔자(四柱八字) 분석 완료!',
];

const SAJU_PILLARS = [
  { heaven: '甲', earth: '子', color: '#39FF14', label: '年柱', element: '木' },
  { heaven: '丙', earth: '午', color: '#FF4D4D', label: '月柱', element: '火' },
  { heaven: '壬', earth: '申', color: '#00D4FF', label: '日柱', element: '水' },
  { heaven: '庚', earth: '戌', color: '#FFD700', label: '時柱', element: '金' },
];

export function LoadingPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);
  const [adSkippable, setAdSkippable] = useState(false);
  const adShownRef = useRef(false);
  const progressDoneRef = useRef(false);

  // Check if fortune data exists
  useEffect(() => {
    const data = localStorage.getItem(FORTUNE_KEY);
    if (!data) {
      navigate('/');
    }
  }, [navigate]);

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          progressDoneRef.current = true;
          return 100;
        }
        return prev + 1;
      });
    }, 38);
    return () => clearInterval(interval);
  }, []);

  // Cycle text
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % LOADING_TEXTS.length);
    }, 950);
    return () => clearInterval(interval);
  }, []);

  // Show ad at 80%
  useEffect(() => {
    if (progress >= 80 && !adShownRef.current) {
      adShownRef.current = true;
      setShowAd(true);
    }
  }, [progress]);

  // Ad countdown
  useEffect(() => {
    if (!showAd) return;
    const interval = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setAdSkippable(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showAd]);

  const handleSkipAd = () => {
    setShowAd(false);
    setTimeout(() => {
      navigate('/result');
    }, 300);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#040D1E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-rev {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes neon-pulse {
          0%, 100% { opacity: 0.6; filter: brightness(0.8); }
          50% { opacity: 1; filter: brightness(1.4) drop-shadow(0 0 12px currentColor); }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes progress-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(255,215,0,0.6); }
          50% { box-shadow: 0 0 20px rgba(255,215,0,1), 0 0 40px rgba(255,140,0,0.4); }
        }
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* Scan line effect */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)',
        animation: 'scan-line 3s linear infinite', pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,215,0,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '380px', padding: '0 20px' }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <p style={{ color: 'rgba(200,220,255,0.6)', fontSize: '0.8rem', marginBottom: '6px' }}>
            🔮 운명 분석 시스템 가동 중
          </p>
          <h2 style={{ color: '#FFD700', fontSize: '1.4rem', fontWeight: 900 }}>
            개미만세력 AI
          </h2>
        </motion.div>

        {/* Saju Grid - Main Animation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{ position: 'relative', width: '260px', height: '260px' }}>

            {/* Outer ring */}
            <div style={{
              position: 'absolute', inset: '0',
              border: '1px solid rgba(255,215,0,0.15)',
              borderRadius: '50%',
              animation: 'spin-slow 12s linear infinite',
            }}>
              {['金', '木', '水', '火', '土', '金', '木', '水'].map((el, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: `rotate(${i * 45}deg) translateY(-125px)`,
                  fontSize: '11px',
                  color: ['#FFD700', '#39FF14', '#00D4FF', '#FF4D4D', '#FF8C00', '#FFD700', '#39FF14', '#00D4FF'][i],
                  fontFamily: 'serif',
                  transformOrigin: '0 0',
                  marginLeft: '-6px',
                  marginTop: '-8px',
                }}>
                  {el}
                </div>
              ))}
            </div>

            {/* Inner ring */}
            <div style={{
              position: 'absolute', inset: '30px',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: '50%',
              animation: 'spin-slow-rev 8s linear infinite',
            }} />

            {/* Saju 4 pillars */}
            <div style={{
              position: 'absolute', inset: '40px',
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '4px',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              {SAJU_PILLARS.map((pillar, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(4,13,30,0.9)',
                    border: `1px solid ${pillar.color}30`,
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                    animation: 'neon-pulse 2s ease-in-out infinite',
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  <span style={{
                    fontSize: '9px', color: 'rgba(200,220,255,0.5)',
                    fontWeight: 700, marginBottom: '2px',
                  }}>
                    {pillar.label}
                  </span>
                  <span style={{
                    fontSize: '22px', color: pillar.color,
                    fontFamily: 'serif', lineHeight: 1,
                    textShadow: `0 0 10px ${pillar.color}`,
                  }}>
                    {pillar.heaven}
                  </span>
                  <div style={{
                    width: '1px', height: '8px',
                    background: `${pillar.color}40`, margin: '3px 0',
                  }} />
                  <span style={{
                    fontSize: '18px', color: pillar.color,
                    fontFamily: 'serif', lineHeight: 1,
                    textShadow: `0 0 8px ${pillar.color}80`,
                    opacity: 0.7,
                  }}>
                    {pillar.earth}
                  </span>
                </div>
              ))}
            </div>

            {/* Center orb */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '16px', height: '16px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFD700, #FF8C00)',
              boxShadow: '0 0 20px #FFD700, 0 0 40px rgba(255,215,0,0.4)',
              animation: 'neon-pulse 1.5s ease-in-out infinite',
            }} />
          </div>
        </div>

        {/* Cycling text */}
        <div style={{
          height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '24px',
        }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              style={{ color: '#00D4FF', fontSize: '0.9rem', textAlign: 'center' }}
            >
              {LOADING_TEXTS[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '99px',
            height: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <motion.div
              style={{
                height: '100%',
                borderRadius: '99px',
                background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
                animation: 'progress-glow 1.5s ease-in-out infinite',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: '6px',
          }}>
            <span style={{ color: 'rgba(200,220,255,0.4)', fontSize: '0.7rem' }}>
              사주 분석 중
            </span>
            <span style={{ color: '#FFD700', fontSize: '0.75rem', fontWeight: 700 }}>
              {progress}%
            </span>
          </div>
        </div>

        {/* Element scanning indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
          {(['金', '火', '水', '木', '土'] as const).map((el, i) => {
            const colors = ['#FFD700', '#FF4D4D', '#00D4FF', '#39FF14', '#FF8C00'];
            const threshold = (i + 1) * 20;
            const active = progress >= threshold;
            return (
              <div key={el} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  border: `2px solid ${active ? colors[i] : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: active ? `${colors[i]}15` : 'transparent',
                  transition: 'all 0.5s',
                  boxShadow: active ? `0 0 12px ${colors[i]}60` : 'none',
                  fontSize: '14px', fontFamily: 'serif', color: active ? colors[i] : 'rgba(255,255,255,0.2)',
                }}>
                  {el}
                </div>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: active ? colors[i] : 'transparent',
                  margin: '4px auto 0',
                  boxShadow: active ? `0 0 6px ${colors[i]}` : 'none',
                  transition: 'all 0.5s',
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERSTITIAL AD OVERLAY */}
      <AnimatePresence>
        {showAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(2,8,20,0.95)',
              backdropFilter: 'blur(10px)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Ad header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.6)',
                  padding: '2px 8px', borderRadius: '4px',
                  fontSize: '0.7rem', fontWeight: 700,
                }}>
                  AD
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
                  쿠팡 파트너스
                </span>
              </div>
              <button
                onClick={adSkippable ? handleSkipAd : undefined}
                style={{
                  background: adSkippable ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)',
                  border: adSkippable ? '1px solid rgba(255,215,0,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  color: adSkippable ? '#FFD700' : 'rgba(255,255,255,0.3)',
                  padding: '6px 14px', borderRadius: '8px',
                  cursor: adSkippable ? 'pointer' : 'not-allowed',
                  fontSize: '0.8rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'all 0.3s',
                }}
              >
                {adSkippable ? (
                  <><X size={14} /> 건너뛰기</>
                ) : (
                  <>{adCountdown}초 후 건너뛰기</>
                )}
              </button>
            </div>

            {/* Ad content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 20px' }}>
              {/* Ad banner image area */}
              <div style={{
                borderRadius: '16px', overflow: 'hidden', marginBottom: '20px',
                position: 'relative',
                background: 'linear-gradient(135deg, #0a1628, #162844)',
                border: '1px solid rgba(255,215,0,0.2)',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1604504219246-6a4b59012b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwbW91c2UlMjBwYWQlMjBkZXNrJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MjI3NDI3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Blue Mouse Pad"
                  style={{ width: '100%', height: '180px', objectFit: 'cover', opacity: 0.7 }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 30%, rgba(4,13,30,0.9) 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                  <div style={{
                    display: 'inline-block', background: '#00D4FF', color: '#040D1E',
                    padding: '2px 10px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 900,
                    marginBottom: '6px',
                  }}>
                    💧 水(수) 기운 보강 아이템
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 900 }}>
                    파란 마우스패드로 수(水) 에너지 충전!
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                    당신의 사주에 부족한 水 기운을 채워 투자 운을 높이세요
                  </p>
                </div>
              </div>

              {/* Product cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                {[
                  { name: '파란 대형 마우스패드', price: '₩15,900', emoji: '🖱️', discount: '30% OFF', color: '#00D4FF' },
                  { name: '황금 거북이 장식품', price: '₩25,000', emoji: '🐢', discount: '황금 기운', color: '#FFD700' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${item.color}25`,
                    borderRadius: '12px', padding: '14px',
                    display: 'flex', flexDirection: 'column', gap: '6px',
                  }}>
                    <div style={{ fontSize: '1.8rem', textAlign: 'center' }}>{item.emoji}</div>
                    <p style={{ color: '#E8F4FD', fontSize: '0.75rem', fontWeight: 700, textAlign: 'center' }}>
                      {item.name}
                    </p>
                    <div style={{
                      background: `${item.color}20`,
                      borderRadius: '4px', padding: '2px 6px', textAlign: 'center',
                    }}>
                      <span style={{ color: item.color, fontSize: '0.65rem', fontWeight: 700 }}>
                        {item.discount}
                      </span>
                    </div>
                    <p style={{ color: item.color, fontSize: '0.9rem', fontWeight: 900, textAlign: 'center' }}>
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button style={{
                width: '100%', padding: '16px',
                background: 'linear-gradient(135deg, #FF6B35, #FF4500)',
                border: 'none', borderRadius: '12px',
                color: '#fff', fontWeight: 900, fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 4px 20px rgba(255,107,53,0.4)',
              }}>
                <ShoppingCart size={18} />
                쿠팡에서 구매하기 →
              </button>
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '0.65rem', marginTop: '8px' }}>
                * 이 링크는 쿠팡 파트너스 제휴 링크입니다
              </p>

              {/* Bonus info */}
              <div style={{
                marginTop: '16px', padding: '12px 16px',
                background: 'rgba(255,215,0,0.06)',
                border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <Gift size={16} style={{ color: '#FFD700', flexShrink: 0 }} />
                <p style={{ color: 'rgba(200,220,255,0.6)', fontSize: '0.72rem', lineHeight: 1.5 }}>
                  행운 아이템 구매 시 <span style={{ color: '#FFD700', fontWeight: 700 }}>+50 행운 포인트</span> 적립! 
                  오늘 운세 분석 결과와 함께 맞춤 추천 상품을 확인하세요.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
