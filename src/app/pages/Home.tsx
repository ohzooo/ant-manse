import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import { FORTUNE_KEY, type FortuneData } from '../data/personas';

const INVEST_STYLES = [
  { id: 'aggressive', label: '공격형', emoji: '🔥', desc: '단타·급등주 집중' },
  { id: 'balanced', label: '균형형', emoji: '⚖️', desc: '성장+가치 혼합' },
  { id: 'conservative', label: '안정형', emoji: '🛡️', desc: '배당·우량주 선호' },
] as const;

const SAJU_CHARS = ['甲', '乙', '丙', '丁', '壬', '癸', '庚', '辛'];

export function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [investStyle, setInvestStyle] = useState<'aggressive' | 'balanced' | 'conservative'>('balanced');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !birthDate) return;

    setIsSubmitting(true);
    const data: FortuneData = { name: name.trim(), birthDate, investStyle };
    localStorage.setItem(FORTUNE_KEY, JSON.stringify(data));

    setTimeout(() => {
      navigate('/loading');
    }, 400);
  };

  return (
    <div style={{ background: '#040D1E', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated background elements */}
      <style>{`
        @keyframes floatChar {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.3; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.6; }
        }
        @keyframes shimmer-gold {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Floating Chinese characters background */}
      {SAJU_CHARS.map((char, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${10 + (i * 11) % 80}%`,
            left: `${5 + (i * 13) % 90}%`,
            fontSize: '48px',
            color: ['#FFD700', '#FF4D4D', '#00D4FF', '#39FF14', '#FF8C00'][i % 5],
            animation: `floatChar ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            userSelect: 'none',
            pointerEvents: 'none',
            fontFamily: 'serif',
          }}
        >
          {char}
        </div>
      ))}

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '10%', right: '5%', width: '200px', height: '200px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,77,77,0.15) 0%, transparent 70%)',
        animation: 'pulse-ring 4s ease-in-out infinite', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '0%', width: '180px', height: '180px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
        animation: 'pulse-ring 5s ease-in-out infinite', animationDelay: '2s', pointerEvents: 'none',
      }} />

      <div style={{ padding: '48px 20px 24px', maxWidth: '390px', margin: '0 auto' }}>
        {/* Logo section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '36px' }}
        >
          {/* App icon */}
          <div style={{
            width: '80px', height: '80px', borderRadius: '20px', margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(255,215,0,0.5), 0 0 60px rgba(255,215,0,0.2)',
            fontSize: '40px', animation: 'pulse-ring 3s ease-in-out infinite',
          }}>
            🐜
          </div>

          {/* App name */}
          <h1 style={{
            fontSize: '2.4rem',
            fontWeight: 900,
            background: 'linear-gradient(90deg, #FFD700, #FF4D4D, #FFD700)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer-gold 3s linear infinite',
            letterSpacing: '-1px',
            marginBottom: '6px',
          }}>
            개미만세력
          </h1>

          <p style={{ color: 'rgba(200,220,255,0.7)', fontSize: '0.85rem' }}>
            AI 사주 기반 주식 운명 분석기
          </p>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            marginTop: '12px',
          }}>
            {['金', '火', '水', '木', '土'].map((el, i) => (
              <span
                key={el}
                style={{
                  fontSize: '0.75rem',
                  color: ['#FFD700', '#FF4D4D', '#00D4FF', '#39FF14', '#FF8C00'][i],
                  fontFamily: 'serif',
                  fontWeight: 700,
                  textShadow: `0 0 10px ${ ['#FFD700', '#FF4D4D', '#00D4FF', '#39FF14', '#FF8C00'][i]}`,
                }}
              >
                {el}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Name input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block', color: '#FFD700', fontSize: '0.8rem',
              fontWeight: 700, marginBottom: '8px', letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              ✦ 투자자 이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              maxLength={10}
              required
              style={{
                width: '100%', padding: '14px 16px', borderRadius: '12px',
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.25)',
                color: '#E8F4FD', outline: 'none', boxSizing: 'border-box',
                fontSize: '1rem', transition: 'all 0.3s',
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid rgba(0,212,255,0.7)';
                e.target.style.boxShadow = '0 0 15px rgba(0,212,255,0.2)';
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid rgba(0,212,255,0.25)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Birth date input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block', color: '#FFD700', fontSize: '0.8rem',
              fontWeight: 700, marginBottom: '8px', letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              ✦ 생년월일 (사주팔자 분석용)
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              style={{
                width: '100%', padding: '14px 16px', borderRadius: '12px',
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.25)',
                color: '#E8F4FD', outline: 'none', boxSizing: 'border-box',
                fontSize: '1rem', transition: 'all 0.3s',
                colorScheme: 'dark',
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid rgba(0,212,255,0.7)';
                e.target.style.boxShadow = '0 0 15px rgba(0,212,255,0.2)';
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid rgba(0,212,255,0.25)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Investment style */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block', color: '#FFD700', fontSize: '0.8rem',
              fontWeight: 700, marginBottom: '12px', letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              ✦ 투자 성향
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {INVEST_STYLES.map(({ id, label, emoji, desc }) => {
                const isSelected = investStyle === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setInvestStyle(id)}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: isSelected
                        ? '1.5px solid #FFD700'
                        : '1.5px solid rgba(255,255,255,0.1)',
                      background: isSelected
                        ? 'rgba(255,215,0,0.1)'
                        : 'rgba(255,255,255,0.03)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.3s',
                      boxShadow: isSelected ? '0 0 15px rgba(255,215,0,0.3)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
                    <span style={{ color: isSelected ? '#FFD700' : '#8BA9C8', fontSize: '0.82rem', fontWeight: 700 }}>
                      {label}
                    </span>
                    <span style={{ color: 'rgba(200,220,255,0.5)', fontSize: '0.65rem', textAlign: 'center' }}>
                      {desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !name.trim() || !birthDate}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              padding: '18px',
              borderRadius: '14px',
              border: 'none',
              background: isSubmitting || !name.trim() || !birthDate
                ? 'rgba(255,215,0,0.3)'
                : 'linear-gradient(135deg, #FFD700, #FF8C00)',
              color: '#040D1E',
              fontWeight: 900,
              fontSize: '1.05rem',
              cursor: isSubmitting || !name.trim() || !birthDate ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 25px rgba(255,215,0,0.4), 0 0 50px rgba(255,140,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s',
            }}
          >
            <Sparkles size={20} />
            <span>나의 주식 운명 보기</span>
            <ChevronRight size={20} />
          </motion.button>
        </motion.form>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '32px', padding: '16px', borderRadius: '12px',
            background: 'rgba(0,212,255,0.04)',
            border: '1px solid rgba(0,212,255,0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <TrendingUp size={16} style={{ color: '#00D4FF', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ color: '#00D4FF', fontSize: '0.75rem', fontWeight: 700, marginBottom: '3px' }}>
                🔮 오늘의 시장 기운
              </p>
              <p style={{ color: 'rgba(200,220,255,0.6)', fontSize: '0.72rem', lineHeight: 1.6 }}>
                2026년 2월 28일 · 火의 기운이 강한 날 · KOSPI 거래대금 상위 섹터: 반도체, 2차전지
              </p>
            </div>
          </div>
        </motion.div>

        <p style={{ textAlign: 'center', color: 'rgba(200,220,255,0.25)', fontSize: '0.65rem', marginTop: '20px' }}>
          ⚠️ 개미만세력은 오락 목적의 앱이며 투자 조언이 아닙니다.
        </p>
      </div>
    </div>
  );
}
