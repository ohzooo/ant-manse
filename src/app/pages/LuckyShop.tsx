import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Star, Sparkles, Tag, ChevronRight, Heart, CheckCircle } from 'lucide-react';
import { FORTUNE_KEY, getElementFromBirthDate, PERSONAS, ELEMENT_COLORS, type ElementKey } from '../data/personas';

const PRODUCTS = [
  {
    id: 1,
    element: '수' as ElementKey,
    name: '프리미엄 블루 마우스패드',
    subtitle: 'Water Element XL 900×400mm',
    emoji: '🖱️',
    image: 'https://images.unsplash.com/photo-1604504219246-6a4b59012b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwbW91c2UlMjBwYWQlMjBkZXNrJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MjI3NDI3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 15900,
    originalPrice: 22800,
    rating: 4.8,
    reviews: 2341,
    luckyScore: 92,
    effect: '수(水) 기운 +30% 강화',
    tags: ['집중력 UP', '직감 강화', '수익률 상승'],
    badge: '베스트셀러',
    badgeColor: '#00D4FF',
  },
  {
    id: 2,
    element: '화' as ElementKey,
    name: '빨간 수정 캔들 세트',
    subtitle: 'Fire Crystal Candle — 3 Pack',
    emoji: '🕯️',
    image: 'https://images.unsplash.com/photo-1625594408432-6aed6ed6d75e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBjYW5kbGUlMjBjcnlzdGFsJTIwc3Bpcml0dWFsfGVufDF8fHx8MTc3MjI3NDI3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 18900,
    originalPrice: 25000,
    rating: 4.6,
    reviews: 987,
    luckyScore: 88,
    effect: '화(火) 기운 +25% 강화',
    tags: ['행동력 UP', '결단력 강화', '급등주 감지'],
    badge: '🔥 인기',
    badgeColor: '#FF4D4D',
  },
  {
    id: 3,
    element: '금' as ElementKey,
    name: '황금 거북이 장식품',
    subtitle: 'Gold Fortune Turtle — 재물운 UP',
    emoji: '🐢',
    image: 'https://images.unsplash.com/photo-1640160270992-af633050d923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY29pbiUyMHdlYWx0aCUyMGFidW5kYW5jZXxlbnwxfHx8fDE3NzIyNzQyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 25000,
    originalPrice: 35000,
    rating: 4.9,
    reviews: 5214,
    luckyScore: 96,
    effect: '금(金) 기운 +35% 강화',
    tags: ['재물운 UP', '가치투자 감각', '장기보유 인내'],
    badge: '🏆 1위',
    badgeColor: '#FFD700',
  },
  {
    id: 4,
    element: '목' as ElementKey,
    name: '미니 대나무 행운초',
    subtitle: 'Lucky Bamboo Plant — 성장 에너지',
    emoji: '🎍',
    image: 'https://images.unsplash.com/photo-1771574208653-bd245bd6eb1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGJhbWJvbyUyMHBsYW50JTIwZmVuZyUyMHNodWl8ZW58MXx8fHwxNzcyMjc0MjgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 12000,
    originalPrice: 16000,
    rating: 4.7,
    reviews: 1532,
    luckyScore: 84,
    effect: '목(木) 기운 +20% 강화',
    tags: ['성장주 안목', '인내심 강화', 'ESG 직감'],
    badge: '신상품',
    badgeColor: '#39FF14',
  },
];

const ELEMENT_NAMES: Record<ElementKey, string> = {
  화: '火(화)',
  금: '金(금)',
  수: '水(수)',
  목: '木(목)',
  토: '土(토)',
};

export function LuckyShopPage() {
  const [cartItems, setCartItems] = useState<Set<number>>(new Set());
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<ElementKey | 'all'>('all');

  const raw = localStorage.getItem(FORTUNE_KEY);
  let weakElement: ElementKey = '수';
  let userName = '투자자';
  if (raw) {
    try {
      const d = JSON.parse(raw);
      const el: ElementKey = getElementFromBirthDate(d.birthDate);
      weakElement = PERSONAS[el].weakElement;
      userName = d.name;
    } catch { /* ignore */ }
  }

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const toggleCart = (id: number, name: string) => {
    setCartItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('장바구니에서 제거되었습니다.');
      } else {
        next.add(id);
        showToast(`🛒 "${name}" 장바구니 추가!`);
      }
      return next;
    });
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        showToast('💛 찜 목록에 추가되었습니다!');
      }
      return next;
    });
  };

  const filters: Array<{ key: ElementKey | 'all'; label: string; color: string }> = [
    { key: 'all', label: '전체', color: '#FFD700' },
    { key: '수', label: '水', color: '#00D4FF' },
    { key: '화', label: '火', color: '#FF4D4D' },
    { key: '금', label: '金', color: '#FFD700' },
    { key: '목', label: '木', color: '#39FF14' },
  ];

  const filteredProducts = selectedFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.element === selectedFilter);

  const totalCartValue = PRODUCTS
    .filter((p) => cartItems.has(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <div style={{ background: '#040D1E', minHeight: '100vh', padding: '0 0 24px' }}>
      <style>{`
        @keyframes cart-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes badge-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
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
        background: 'linear-gradient(180deg, rgba(255,215,0,0.06) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(255,215,0,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={22} style={{ color: '#FFD700' }} />
            <h1 style={{ color: '#E8F4FD', fontWeight: 900, fontSize: '1.3rem' }}>
              행운 아이템 샵
            </h1>
          </div>

          {/* Cart indicator */}
          {cartItems.size > 0 && (
            <button style={{
              background: 'rgba(255,215,0,0.1)',
              border: '1px solid rgba(255,215,0,0.4)',
              borderRadius: '99px', padding: '6px 14px',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
              animation: 'cart-bounce 1s ease-in-out',
            }}>
              <ShoppingCart size={14} style={{ color: '#FFD700' }} />
              <span style={{ color: '#FFD700', fontSize: '0.78rem', fontWeight: 700 }}>
                {cartItems.size}개 · ₩{totalCartValue.toLocaleString()}
              </span>
            </button>
          )}
        </div>
        <p style={{ color: 'rgba(200,220,255,0.5)', fontSize: '0.78rem' }}>
          오행 에너지 균형으로 투자 운을 높이세요
        </p>

        {/* Deficiency banner */}
        <div style={{
          marginTop: '12px', padding: '12px 14px',
          borderRadius: '12px',
          background: `${ELEMENT_COLORS[weakElement]}10`,
          border: `1px solid ${ELEMENT_COLORS[weakElement]}30`,
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: `${ELEMENT_COLORS[weakElement]}20`,
            border: `1.5px solid ${ELEMENT_COLORS[weakElement]}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', fontFamily: 'serif',
            color: ELEMENT_COLORS[weakElement],
            textShadow: `0 0 8px ${ELEMENT_COLORS[weakElement]}`,
            flexShrink: 0,
          }}>
            {ELEMENT_NAMES[weakElement].charAt(0)}
          </div>
          <div>
            <p style={{ color: ELEMENT_COLORS[weakElement], fontSize: '0.78rem', fontWeight: 700, marginBottom: '2px' }}>
              {userName}님은 {ELEMENT_NAMES[weakElement]} 기운이 부족해요!
            </p>
            <p style={{ color: 'rgba(200,220,255,0.55)', fontSize: '0.7rem' }}>
              아래 추천 아이템으로 기운을 보강하세요
            </p>
          </div>
          <ChevronRight size={16} style={{ color: ELEMENT_COLORS[weakElement], flexShrink: 0 }} />
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
          {filters.map(({ key, label, color }) => {
            const isActive = selectedFilter === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedFilter(key)}
                style={{
                  padding: '6px 16px', borderRadius: '99px', flexShrink: 0,
                  border: isActive ? `1.5px solid ${color}` : '1.5px solid rgba(255,255,255,0.1)',
                  background: isActive ? `${color}15` : 'rgba(255,255,255,0.03)',
                  color: isActive ? color : 'rgba(200,220,255,0.4)',
                  fontWeight: isActive ? 700 : 400,
                  cursor: 'pointer', transition: 'all 0.3s',
                  fontSize: '0.8rem', fontFamily: key !== 'all' ? 'serif' : 'inherit',
                  boxShadow: isActive ? `0 0 12px ${color}30` : 'none',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Product grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredProducts.map((product, idx) => {
            const elementColor = ELEMENT_COLORS[product.element];
            const inCart = cartItems.has(product.id);
            const inWishlist = wishlist.has(product.id);
            const isRecommended = product.element === weakElement;
            const discountPct = Math.round((1 - product.price / product.originalPrice) * 100);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                style={{
                  borderRadius: '16px',
                  background: 'rgba(11,24,41,0.85)',
                  border: `1.5px solid ${isRecommended ? elementColor + '50' : 'rgba(255,255,255,0.07)'}`,
                  overflow: 'hidden',
                  boxShadow: isRecommended ? `0 0 20px ${elementColor}15` : 'none',
                }}
              >
                {/* Recommended banner */}
                {isRecommended && (
                  <div style={{
                    background: `linear-gradient(90deg, ${elementColor}20, transparent)`,
                    padding: '6px 14px',
                    borderBottom: `1px solid ${elementColor}20`,
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    <Sparkles size={12} style={{ color: elementColor }} />
                    <span style={{ color: elementColor, fontSize: '0.7rem', fontWeight: 700, animation: 'badge-pulse 2s infinite' }}>
                      ⭐ {userName}님께 강력 추천! {ELEMENT_NAMES[product.element]} 에너지 보강
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '14px', padding: '14px' }}>
                  {/* Product image */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '90px', height: '90px',
                        borderRadius: '12px', objectFit: 'cover',
                        border: `1px solid ${elementColor}25`,
                      }}
                    />
                    {/* Badge */}
                    <div style={{
                      position: 'absolute', top: '-6px', left: '-6px',
                      background: product.badgeColor === '#FFD700' ? 'linear-gradient(135deg, #FFD700, #FF8C00)' : product.badgeColor,
                      color: product.badgeColor === '#FFD700' ? '#040D1E' : '#fff',
                      padding: '2px 8px', borderRadius: '6px',
                      fontSize: '0.6rem', fontWeight: 900,
                    }}>
                      {product.badge}
                    </div>
                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      style={{
                        position: 'absolute', bottom: '-4px', right: '-4px',
                        background: 'rgba(4,13,30,0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50%', width: '26px', height: '26px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Heart
                        size={13}
                        style={{ color: inWishlist ? '#FF4D4D' : 'rgba(255,255,255,0.3)' }}
                        fill={inWishlist ? '#FF4D4D' : 'none'}
                      />
                    </button>
                  </div>

                  {/* Product info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Element tag */}
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700,
                      color: elementColor,
                      background: `${elementColor}15`,
                      padding: '2px 8px', borderRadius: '4px',
                      display: 'inline-block', marginBottom: '5px',
                      fontFamily: 'serif',
                    }}>
                      {ELEMENT_NAMES[product.element]} 기운 강화
                    </span>

                    <p style={{ color: '#E8F4FD', fontSize: '0.85rem', fontWeight: 700, marginBottom: '2px', lineHeight: 1.3 }}>
                      {product.name}
                    </p>
                    <p style={{ color: 'rgba(200,220,255,0.5)', fontSize: '0.68rem', marginBottom: '6px' }}>
                      {product.subtitle}
                    </p>

                    {/* Lucky score */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <Star size={11} style={{ color: '#FFD700', fill: '#FFD700' }} />
                      <span style={{ color: '#FFD700', fontSize: '0.7rem', fontWeight: 700 }}>
                        행운 지수 {product.luckyScore}
                      </span>
                      <span style={{ color: 'rgba(200,220,255,0.35)', fontSize: '0.68rem' }}>
                        ({product.reviews.toLocaleString()}개 후기)
                      </span>
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                      {product.tags.map((tag) => (
                        <span key={tag} style={{
                          fontSize: '0.62rem',
                          color: 'rgba(200,220,255,0.5)',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          padding: '2px 6px', borderRadius: '4px',
                        }}>
                          <Tag size={8} style={{ display: 'inline', marginRight: '3px' }} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Price row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ color: '#FF4D4D', fontSize: '0.68rem', fontWeight: 700, marginRight: '4px' }}>
                          -{discountPct}%
                        </span>
                        <span style={{ color: '#E8F4FD', fontSize: '0.95rem', fontWeight: 900 }}>
                          ₩{product.price.toLocaleString()}
                        </span>
                        <span style={{ color: 'rgba(200,220,255,0.3)', fontSize: '0.68rem', textDecoration: 'line-through', marginLeft: '4px' }}>
                          ₩{product.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Add to cart */}
                      <button
                        onClick={() => toggleCart(product.id, product.name)}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '8px',
                          background: inCart
                            ? 'rgba(0,212,255,0.15)'
                            : 'linear-gradient(135deg, #FF6B35, #FF4500)',
                          color: inCart ? '#00D4FF' : '#fff',
                          fontWeight: 700, fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '5px',
                          transition: 'all 0.3s',
                          border: inCart ? '1px solid rgba(0,212,255,0.4)' : '1px solid transparent',
                        }}
                      >
                        {inCart ? <CheckCircle size={13} /> : <ShoppingCart size={13} />}
                        {inCart ? '담김' : '담기'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Effect row */}
                <div style={{
                  padding: '10px 14px',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  background: `${elementColor}06`,
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <Sparkles size={12} style={{ color: elementColor, flexShrink: 0 }} />
                  <span style={{ color: elementColor, fontSize: '0.72rem', fontWeight: 700 }}>
                    {product.effect}
                  </span>
                  <span style={{ color: 'rgba(200,220,255,0.35)', fontSize: '0.68rem', marginLeft: 'auto' }}>
                    ⭐ {product.rating}/5.0
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Checkout CTA */}
        {cartItems.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '16px' }}
          >
            <button style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #FF6B35, #FF4500)',
              border: 'none', borderRadius: '14px',
              color: '#fff', fontWeight: 900, fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              boxShadow: '0 4px 20px rgba(255,107,53,0.4)',
            }}>
              <ShoppingCart size={18} />
              쿠팡에서 구매하기 ({cartItems.size}개 · ₩{totalCartValue.toLocaleString()})
            </button>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '0.65rem', marginTop: '6px' }}>
              * 쿠팡 파트너스 제휴 링크 | 구매 시 행운 포인트 적립
            </p>
          </motion.div>
        )}

        {/* Bottom promo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '16px', padding: '14px 16px',
            borderRadius: '14px',
            background: 'rgba(255,215,0,0.04)',
            border: '1px solid rgba(255,215,0,0.15)',
          }}
        >
          <p style={{ color: '#FFD700', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>
            🎁 오늘만 특별 혜택
          </p>
          <p style={{ color: 'rgba(200,220,255,0.6)', fontSize: '0.72rem', lineHeight: 1.6 }}>
            행운 아이템 2개 이상 구매 시 <span style={{ color: '#FFD700', fontWeight: 700 }}>무료 사주 상세 리포트</span> 증정!
            2026년 전체 투자 운세를 PDF로 받아보세요.
          </p>
        </motion.div>
      </div>
    </div>
  );
}