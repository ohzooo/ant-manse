import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Share2, ChevronDown, ChevronUp, Star,
  TrendingUp, TrendingDown, ShoppingBag, Bell,
  ArrowUpRight, ArrowDownRight, Sparkles,
} from 'lucide-react';
import {
  PERSONAS, FORTUNE_KEY, getElementFromBirthDate,
  ELEMENT_LABELS, ELEMENT_COLORS,
  type FortuneData, type ElementKey,
} from '../data/personas';
import {
  STEM_PERSONAS, getStemFromBirthYear,
} from '../data/heavenlyStems';
import {
  getRecommendedStocks, formatPrice, formatChangeRate, type StockInfo,
} from '../data/stockData';
import { InvestmentPersonaCard } from '../components/InvestmentPersonaCard';

const STYLE_MODIFIERS: Record<string, string> = {
  aggressive: '🔥 초공격형',
  balanced: '⚖️ 균형형',
  conservative: '🛡️ 안정형',
};

function OhaengBar({ element, value, color }: { element: ElementKey; value: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 300);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
        <span style={{ color: color, fontSize: '0.8rem', fontWeight: 700, fontFamily: 'serif' }}>
          {ELEMENT_LABELS[element]}
        </span>
        <span style={{ color: color, fontSize: '0.78rem', fontWeight: 700 }}>
          {value}%
        </span>
      </div>
      <div style={{
        background: 'rgba(255,255,255,0.07)', borderRadius: '99px', height: '7px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', borderRadius: '99px',
          background: `linear-gradient(90deg, ${color}80, ${color})`,
          width: `${width}%`,
          transition: 'width 1s ease-out',
          boxShadow: `0 0 8px ${color}60`,
        }} />
      </div>
    </div>
  );
}

export function ResultPage() {
  const navigate = useNavigate();
  const [fortune, setFortune] = useState<FortuneData | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [recommendedStocks, setRecommendedStocks] = useState<StockInfo[]>([]);
  const [activeTab, setActiveTab] = useState<'card' | 'detail'>('card');

  useEffect(() => {
    const raw = localStorage.getItem(FORTUNE_KEY);
    if (!raw) {
      navigate('/');
      return;
    }
    try {
      const fortuneData = JSON.parse(raw);
      setFortune(fortuneData);
      const element = getElementFromBirthDate(fortuneData.birthDate);
      const persona = PERSONAS[element];
      const stocks = getRecommendedStocks(persona.luckyStocks, 2);
      setRecommendedStocks(stocks);
    } catch {
      navigate('/');
    }
  }, [navigate]);

  if (!fortune) return null;

  const element = getElementFromBirthDate(fortune.birthDate);
  const persona = PERSONAS[element];

  // 10천간 캐릭터
  const stemKey = getStemFromBirthYear(fortune.birthDate);
  const stemPersona = STEM_PERSONAS[stemKey];

  const birthYear = parseInt(fortune.birthDate.split('-')[0]);
  const birthMonth = parseInt(fortune.birthDate.split('-')[1]);
  const luckyScore = ((birthYear % 100) + birthMonth * 3 + (fortune.investStyle === 'aggressive' ? 15 : fortune.investStyle === 'conservative' ? 5 : 10)) % 40 + 60;

  const handleShareOld = async () => {
    const text = `🔮 나는 \"${persona.name}\" 타입 투자자!\n${persona.tagline}\n\n행운 섹터: ${persona.luckyStocks.join(', ')}\n\n개미만세력 AI로 나의 주식 운명 보기 👇`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `개미만세력 - ${persona.name}`, text });
      } catch { /* ignore */ }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ background: '#040D1E', minHeight: '100vh', padding: '0 0 24px' }}>
      <style>{`
        @keyframes instagram-glow {
          0%, 100% { box-shadow: 0 4px 20px rgba(225,48,108,0.4); }
          50% { box-shadow: 0 4px 35px rgba(225,48,108,0.7), 0 0 50px rgba(131,58,180,0.3); }
        }
        @keyframes tab-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        padding: '16px 20px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(180deg, rgba(4,13,30,0.98) 0%, transparent 100%)',
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${stemPersona.elementColor}15`,
      }}>
        <div>
          <p style={{ color: 'rgba(200,220,255,0.45)', fontSize: '0.68rem', marginBottom: '1px' }}>
            2026.02.28
          </p>
          <p style={{ color: '#FFD700', fontSize: '0.9rem', fontWeight: 900 }}>
            {fortune.name}님의 주식 운명
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            padding: '4px 10px', borderRadius: '99px',
            background: 'rgba(255,215,0,0.1)',
            border: '1px solid rgba(255,215,0,0.3)',
          }}>
            <span style={{ color: '#FFD700', fontSize: '0.7rem', fontWeight: 700 }}>
              {STYLE_MODIFIERS[fortune.investStyle]}
            </span>
          </div>
          {/* Stem badge */}
          <div style={{
            padding: '4px 10px', borderRadius: '99px',
            background: `${stemPersona.elementColor}15`,
            border: `1px solid ${stemPersona.elementColor}35`,
          }}>
            <span style={{
              color: stemPersona.elementColor,
              fontSize: '0.8rem', fontWeight: 900, fontFamily: 'serif',
            }}>
              {stemPersona.chineseChar}
            </span>
          </div>
        </div>
      </div>

      {/* ── TAB SWITCHER ── */}
      <div style={{
        padding: '12px 16px 0',
        display: 'flex', gap: '8px',
      }}>
        {[
          { key: 'card' as const, label: '🃏 페르소나 카드', emoji: '' },
          { key: 'detail' as const, label: '📊 상세 분석', emoji: '' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              flex: 1, padding: '10px 8px',
              borderRadius: '12px', border: 'none',
              background: activeTab === key
                ? `${stemPersona.elementColor}18`
                : 'rgba(255,255,255,0.04)',
              borderWidth: '1px', borderStyle: 'solid',
              borderColor: activeTab === key
                ? `${stemPersona.elementColor}50`
                : 'rgba(255,255,255,0.08)',
              color: activeTab === key
                ? stemPersona.elementColor
                : 'rgba(200,220,255,0.4)',
              fontSize: '0.78rem', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.3s',
              boxShadow: activeTab === key
                ? `0 0 15px ${stemPersona.elementColor}20`
                : 'none',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: '12px 16px 0' }}>

        {/* ══════ TAB: PERSONA CARD ══════ */}
        {activeTab === 'card' && (
          <motion.div
            key="card-tab"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <InvestmentPersonaCard
              persona={stemPersona}
              userName={fortune.name}
              investStyle={fortune.investStyle}
              luckyScore={luckyScore}
            />

            {/* Quick navigate to detail */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => setActiveTab('detail')}
              style={{
                width: '100%', marginTop: '12px', padding: '14px',
                borderRadius: '12px',
                border: `1px solid ${stemPersona.elementColor}20`,
                background: `${stemPersona.elementColor}06`,
                color: stemPersona.elementColor,
                fontWeight: 700, fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              <Sparkles size={16} />
              오행 밸런스 & 추천 종목 보기 →
            </motion.button>
          </motion.div>
        )}

        {/* ══════ TAB: DETAIL ANALYSIS ══════ */}
        {activeTab === 'detail' && (
          <motion.div
            key="detail-tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >

            {/* Old Persona summary card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                borderRadius: '20px',
                background: persona.bgGradient,
                border: `1.5px solid ${persona.elementColor}35`,
                padding: '20px',
                marginBottom: '14px',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Diagonal stripe pattern */}
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.04,
                backgroundImage: `repeating-linear-gradient(45deg, ${persona.elementColor} 0px, ${persona.elementColor} 1px, transparent 1px, transparent 18px)`,
                pointerEvents: 'none',
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  fontSize: '52px', lineHeight: 1,
                  filter: `drop-shadow(0 0 12px ${persona.elementColor})`,
                }}>
                  {persona.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: `${persona.elementColor}80`, fontSize: '0.68rem', fontWeight: 700, marginBottom: '2px' }}>
                    오행(五行) 분석 타입
                  </p>
                  <h3 style={{
                    fontSize: '1.4rem', fontWeight: 900,
                    color: persona.elementColor, marginBottom: '3px',
                  }}>
                    {persona.element} · {persona.name}
                  </h3>
                  <p style={{ color: 'rgba(200,220,255,0.65)', fontSize: '0.75rem', lineHeight: 1.5 }}>
                    {persona.tagline}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── RECOMMENDED STOCKS ── */}
            {recommendedStocks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{ marginBottom: '14px' }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: '10px', padding: '0 2px',
                }}>
                  <h3 style={{ color: persona.elementColor, fontSize: '0.88rem', fontWeight: 900 }}>
                    📈 오늘의 추천 종목
                  </h3>
                  <span style={{ color: 'rgba(200,220,255,0.35)', fontSize: '0.62rem' }}>
                    시세 반영
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {recommendedStocks.map((stock) => (
                    <motion.div
                      key={stock.code}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.01 }}
                      style={{
                        borderRadius: '14px',
                        background: 'rgba(11,24,41,0.7)',
                        border: `1px solid ${stock.changeRate >= 0 ? 'rgba(255,77,77,0.2)' : 'rgba(0,212,255,0.2)'}`,
                        padding: '13px 15px',
                        cursor: 'pointer',
                        position: 'relative', overflow: 'hidden',
                      }}
                    >
                      <div style={{
                        position: 'absolute', top: 0, right: 0,
                        width: '80px', height: '80px',
                        background: `radial-gradient(circle, ${stock.changeRate >= 0 ? '#FF4D4D' : '#00D4FF'}12, transparent)`,
                        pointerEvents: 'none',
                      }} />
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
                            <span style={{ color: '#E8F4FD', fontSize: '0.9rem', fontWeight: 900 }}>
                              {stock.name}
                            </span>
                            <span style={{
                              padding: '1px 6px', borderRadius: '4px',
                              background: `${persona.elementColor}18`,
                              color: persona.elementColor,
                              fontSize: '0.58rem', fontWeight: 700,
                            }}>
                              {stock.sector}
                            </span>
                          </div>
                          <p style={{ color: 'rgba(200,220,255,0.35)', fontSize: '0.65rem' }}>
                            {stock.code}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ color: '#E8F4FD', fontSize: '1rem', fontWeight: 900, marginBottom: '2px' }}>
                            ₩{formatPrice(stock.currentPrice)}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
                            {stock.changeRate >= 0
                              ? <ArrowUpRight size={11} style={{ color: '#FF4D4D' }} />
                              : <ArrowDownRight size={11} style={{ color: '#00D4FF' }} />
                            }
                            <span style={{
                              color: stock.changeRate >= 0 ? '#FF4D4D' : '#00D4FF',
                              fontSize: '0.78rem', fontWeight: 700,
                            }}>
                              {formatChangeRate(stock.changeRate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div style={{
                  marginTop: '8px', padding: '9px 12px', borderRadius: '10px',
                  background: 'rgba(255,215,0,0.04)',
                  border: '1px solid rgba(255,215,0,0.12)',
                }}>
                  <p style={{ color: 'rgba(200,220,255,0.5)', fontSize: '0.68rem', lineHeight: 1.6 }}>
                    💡 AI 사주 분석 기반 추천이며, 투자의 최종 책임은 본인에게 있습니다.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── OHAENG BALANCE ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                borderRadius: '16px',
                background: 'rgba(11,24,41,0.8)',
                border: '1px solid rgba(0,212,255,0.12)',
                padding: '18px', marginBottom: '12px',
              }}
            >
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '14px',
              }}>
                <h3 style={{ color: '#E8F4FD', fontWeight: 700, fontSize: '0.88rem' }}>
                  ☯ 오행(五行) 밸런스
                </h3>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  style={{
                    background: 'none', border: 'none',
                    color: 'rgba(200,220,255,0.45)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem',
                  }}
                >
                  상세 {showDetails ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
              </div>

              {(Object.entries(persona.ohaeng) as [ElementKey, number][]).map(([el, val]) => (
                <OhaengBar key={el} element={el} value={val} color={ELEMENT_COLORS[el]} />
              ))}

              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <p style={{ color: 'rgba(200,220,255,0.65)', fontSize: '0.76rem', lineHeight: 1.7 }}>
                    💡{' '}
                    <span style={{ color: ELEMENT_COLORS[persona.weakElement], fontWeight: 700 }}>
                      {ELEMENT_LABELS[persona.weakElement]}
                    </span>
                    {' '}기운이 부족합니다. 해당 오행을 보강하는 색상과 방향을 활용하면 투자 운이 상승합니다.
                  </p>
                  <div style={{ marginTop: '10px', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
                    <p style={{ color: ELEMENT_COLORS[persona.weakElement], fontSize: '0.73rem', fontWeight: 700, marginBottom: '4px' }}>
                      {ELEMENT_LABELS[persona.weakElement]} 보강 방법
                    </p>
                    <ul style={{ color: 'rgba(200,220,255,0.55)', fontSize: '0.7rem', lineHeight: 1.8, paddingLeft: '12px' }}>
                      <li>행운 색상: {persona.luckyColor} 계열 아이템 활용</li>
                      <li>행운 숫자: {persona.luckyNumber}을 포함한 매수가 설정</li>
                      <li>오전 {8 + (persona.luckyNumber % 4)}시 이후 거래 권장</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* ── TABOO STOCKS ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{
                borderRadius: '16px',
                background: 'rgba(255,77,77,0.04)',
                border: '1px solid rgba(255,77,77,0.18)',
                padding: '15px 17px', marginBottom: '12px',
              }}
            >
              <p style={{ color: '#FF4D4D', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>
                ⚠️ 금기 종목 (오늘 절대 매수 금지!)
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {persona.tabooStocks.map((stock) => (
                  <span key={stock} style={{
                    padding: '3px 10px', borderRadius: '99px',
                    background: 'rgba(255,77,77,0.08)',
                    border: '1px solid rgba(255,77,77,0.25)',
                    color: '#FF4D4D', fontSize: '0.72rem', fontWeight: 700,
                  }}>
                    <TrendingDown size={9} style={{ display: 'inline', marginRight: '3px' }} />
                    {stock}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ── ADVICE ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(255,215,0,0.07), rgba(255,140,0,0.04))',
                border: '1px solid rgba(255,215,0,0.18)',
                padding: '15px 17px', marginBottom: '12px',
              }}
            >
              <p style={{ color: '#FFD700', fontSize: '0.8rem', fontWeight: 700, marginBottom: '5px' }}>
                🔮 2026년 투자 운세 예언
              </p>
              <p style={{ color: 'rgba(200,220,255,0.65)', fontSize: '0.78rem', lineHeight: 1.65 }}>
                {persona.advice}
              </p>
            </motion.div>

            {/* ── LUCKY ITEM BANNER ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{
                borderRadius: '16px',
                background: 'rgba(11,24,41,0.8)',
                border: '1px solid rgba(0,212,255,0.13)',
                overflow: 'hidden',
                marginBottom: '12px',
              }}
            >
              <div style={{
                padding: '11px 15px',
                background: 'linear-gradient(90deg, rgba(0,212,255,0.08), transparent)',
                borderBottom: '1px solid rgba(0,212,255,0.08)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ color: '#00D4FF', fontSize: '0.78rem', fontWeight: 700 }}>
                  ⚡ 기운 균형 아이템 추천
                </span>
                <span style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.4)',
                  padding: '2px 7px', borderRadius: '4px', fontSize: '0.62rem',
                }}>
                  쿠팡 파트너스
                </span>
              </div>
              <div style={{ padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '10px', flexShrink: 0,
                    background: `${stemPersona.elementColor}15`,
                    border: `1px solid ${stemPersona.elementColor}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '28px',
                  }}>
                    {persona.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'inline-block', background: `${stemPersona.elementColor}15`,
                      border: `1px solid ${stemPersona.elementColor}30`,
                      padding: '1px 7px', borderRadius: '4px', fontSize: '0.62rem',
                      color: stemPersona.elementColor, fontWeight: 700, marginBottom: '3px',
                    }}>
                      {persona.luckyColor} 기운 보강
                    </div>
                    <p style={{ color: '#E8F4FD', fontSize: '0.8rem', fontWeight: 700, marginBottom: '3px' }}>
                      {persona.luckyColor} 계열 데스크 아이템으로 투자 집중력 UP!
                    </p>
                    <p style={{ color: 'rgba(200,220,255,0.5)', fontSize: '0.7rem' }}>
                      직감 강화 · 멘탈 보강 · 행운 수치 증가
                    </p>
                  </div>
                </div>
                <button style={{
                  width: '100%', padding: '12px',
                  background: 'linear-gradient(135deg, #FF6B35, #FF4500)',
                  border: 'none', borderRadius: '10px',
                  color: '#fff', fontWeight: 900, fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                }}>
                  <ShoppingBag size={15} />
                  지금 구매하기 — ₩15,900~
                </button>
              </div>
            </motion.div>

            {/* ── SHARE BUTTON ── */}
            <motion.button
              onClick={handleShareOld}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%', padding: '15px',
                borderRadius: '14px', border: 'none',
                background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)',
                color: '#fff', fontWeight: 900, fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                animation: 'instagram-glow 2.5s ease-in-out infinite',
                marginBottom: '12px',
              }}
            >
              {copied ? '✅ 복사 완료!' : <><Share2 size={18} /> 상세 운세 공유하기</>}
            </motion.button>

            {/* ── TABOO PAGE SHORTCUT ── */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              onClick={() => navigate('/taboo')}
              style={{
                width: '100%', padding: '13px',
                borderRadius: '12px', border: '1px solid rgba(255,215,0,0.18)',
                background: 'rgba(255,215,0,0.04)',
                color: '#FFD700', fontWeight: 700, fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              <Bell size={15} />
              오늘의 주식 금기 확인하기 →
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Lucky score floating indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        style={{
          position: 'fixed', bottom: '88px', right: '16px',
          width: '52px', height: '52px', borderRadius: '50%',
          background: `radial-gradient(circle, ${stemPersona.elementColor}30, ${stemPersona.elementColor}10)`,
          border: `1.5px solid ${stemPersona.elementColor}50`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 40,
          boxShadow: `0 0 20px ${stemPersona.elementColor}25`,
        }}
        onClick={() => setActiveTab('card')}
      >
        <Star size={12} style={{ color: stemPersona.elementColor }} />
        <span style={{ color: stemPersona.elementColor, fontSize: '0.65rem', fontWeight: 900 }}>
          {luckyScore}
        </span>
      </motion.div>
    </div>
  );
}
