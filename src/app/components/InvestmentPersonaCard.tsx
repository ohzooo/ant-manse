import { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Instagram,
  Share2,
  Check,
  TrendingUp,
  TrendingDown,
  Zap,
} from "lucide-react";
import {
  type StemPersona,
  type RadarStats,
} from "../data/heavenlyStems";
import { AntCharacter } from "./AntCharacter";

interface InvestmentPersonaCardProps {
  persona: StemPersona;
  userName: string;
  investStyle: string;
  luckyScore: number;
}

function buildRadarData(stats: RadarStats) {
  return [
    { stat: "인내심", value: stats.patience },
    { stat: "속도", value: stats.speed },
    { stat: "정보력", value: stats.infoPower },
    { stat: "멘탈", value: stats.mental },
    { stat: "욕망", value: stats.desire },
  ];
}

// Korean traditional geometric pattern as SVG
function KoreanPattern({
  color,
  opacity = 0.06,
}: {
  color: string;
  opacity?: number;
}) {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="korean-pattern"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          {/* Dancheong-inspired geometric motif */}
          <rect
            x="0"
            y="0"
            width="40"
            height="40"
            fill="none"
          />
          <polygon
            points="20,2 38,11 38,29 20,38 2,29 2,11"
            fill="none"
            stroke={color}
            strokeWidth="0.6"
          />
          <polygon
            points="20,8 32,14 32,26 20,32 8,26 8,14"
            fill="none"
            stroke={color}
            strokeWidth="0.4"
          />
          <circle
            cx="20"
            cy="20"
            r="4"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
          <line
            x1="2"
            y1="11"
            x2="8"
            y2="14"
            stroke={color}
            strokeWidth="0.3"
          />
          <line
            x1="38"
            y1="11"
            x2="32"
            y2="14"
            stroke={color}
            strokeWidth="0.3"
          />
          <line
            x1="2"
            y1="29"
            x2="8"
            y2="26"
            stroke={color}
            strokeWidth="0.3"
          />
          <line
            x1="38"
            y1="29"
            x2="32"
            y2="26"
            stroke={color}
            strokeWidth="0.3"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#korean-pattern)`}
        opacity={opacity}
      />
    </svg>
  );
}

export function InvestmentPersonaCard({
  persona,
  userName,
  investStyle,
  luckyScore,
}: InvestmentPersonaCardProps) {
  const [copied, setCopied] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const radarData = buildRadarData(persona.radarStats);
  const color = persona.elementColor;

  const handleShare = async () => {
    setShareLoading(true);
    const text = `🔮 나의 주식 운명은 「${persona.koreanName} - ${persona.koreanTitle}」!\n\n${persona.quote}\n\n${persona.description}\n\n🍀 행운 섹터: ${persona.luckyStocks.slice(0, 3).join(", ")}\n\n개미만세력 AI 사주로 나의 투자 운명 보기 👇\nhttps://antmanse.app`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `개미만세력 - ${persona.englishTitle}`,
          text,
        });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
    setShareLoading(false);
  };

  const statMax = 100;

  return (
    <div style={{ width: "100%" }}>
      <style>{`
        @keyframes card-breathe {
          0%, 100% { box-shadow: 0 0 28px ${color}20, 0 20px 60px rgba(0,0,0,0.7); }
          50% { box-shadow: 0 0 50px ${color}35, 0 20px 60px rgba(0,0,0,0.7); }
        }
        @keyframes shimmer-title {
          0% { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes float-char {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes pulse-hanja {
          0%, 100% { opacity: 0.6; text-shadow: 0 0 10px ${color}60; }
          50% { opacity: 1; text-shadow: 0 0 25px ${color}, 0 0 40px ${color}80; }
        }
        @keyframes insta-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes spin-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ===== PERSONA CARD ===== */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
          bounce: 0.3,
        }}
        style={{
          borderRadius: "24px",
          background: persona.bgGradient,
          border: `1.5px solid ${color}30`,
          overflow: "hidden",
          position: "relative",
          animation: "card-breathe 4s ease-in-out infinite",
        }}
      >
        {/* Korean traditional pattern overlay */}
        <KoreanPattern color={color} opacity={0.05} />

        {/* Corner decorations */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${color}, ${persona.secondaryColor}, ${color}, transparent)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
          }}
        />

        {/* ── HEADER ── */}
        <div
          style={{
            padding: "18px 20px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* App branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <span style={{ fontSize: "16px" }}>🐜</span>
            <span
              style={{
                color: "#FFD700",
                fontSize: "0.75rem",
                fontWeight: 900,
                letterSpacing: "0.05em",
              }}
            >
              개미만세력
            </span>
          </div>

          {/* Element badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "99px",
              background: `${color}15`,
              border: `1px solid ${color}40`,
            }}
          >
            <span
              style={{
                color: color,
                fontSize: "1rem",
                fontFamily: "serif",
                fontWeight: 900,
                animation:
                  "pulse-hanja 2s ease-in-out infinite",
              }}
            >
              {persona.chineseChar}
            </span>
            <span
              style={{
                color: `${color}90`,
                fontSize: "0.65rem",
                fontWeight: 700,
              }}
            >
              {persona.hanjaType}
            </span>
          </div>
        </div>

        {/* ── CHARACTER ILLUSTRATION ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 0 0",
            position: "relative",
          }}
        >
          {/* Glow halo behind character */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          {/* Spinning ring */}
          <div
            style={{
              position: "absolute",
              top: "15px",
              width: "190px",
              height: "190px",
              borderRadius: "50%",
              border: `1px dashed ${color}25`,
              animation: "spin-ring 20s linear infinite",
              pointerEvents: "none",
            }}
          />

          {/* Character SVG */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ position: "relative", zIndex: 2 }}
          >
            <AntCharacter
              stemKey={persona.id}
              elementColor={color}
            />
          </motion.div>
        </div>

        {/* ── TITLE BLOCK ── */}
        <div
          style={{ padding: "4px 22px 0", textAlign: "center" }}
        >
          {/* Hanja display */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                color: `${color}60`,
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              {persona.hanja}
            </span>
            <span
              style={{
                color: `${color}40`,
                fontSize: "0.6rem",
              }}
            >
              ·
            </span>
            <span
              style={{
                color: `${color}60`,
                fontSize: "0.68rem",
                fontWeight: 700,
              }}
            >
              {persona.hanjaType}
            </span>
          </div>

          {/* Korean title */}
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 900,
              background: `linear-gradient(90deg, ${persona.secondaryColor}, white, ${color}, white, ${persona.secondaryColor})`,
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer-title 4s linear infinite",
              lineHeight: 1.1,
              marginBottom: "4px",
              fontFamily: "serif",
            }}
          >
            {persona.koreanName}
          </h2>

          {/* English subtitle */}
          <p
            style={{
              color: `${color}80`,
              fontSize: "0.72rem",
              fontWeight: 700,
              marginBottom: "4px",
              letterSpacing: "0.02em",
            }}
          >
            {persona.englishTitle.split(":")[0]}{" "}
            <span style={{ color: `${color}50` }}>·</span>{" "}
            {persona.koreanTitle}
          </p>

          {/* User name tag */}
          {userName && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "3px 10px",
                borderRadius: "99px",
                background: `${color}10`,
                border: `1px solid ${color}25`,
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  color: `${color}90`,
                  fontSize: "0.68rem",
                }}
              >
                👤
              </span>
              <span
                style={{
                  color: `${color}80`,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                }}
              >
                {userName}
              </span>
            </div>
          )}
        </div>

        {/* ── QUOTE ── */}
        <div
          style={{
            margin: "6px 18px 0",
            padding: "12px 16px",
            background: `${color}0a`,
            border: `1px solid ${color}22`,
            borderLeft: `3px solid ${color}`,
            borderRadius: "0 10px 10px 0",
          }}
        >
          <p
            style={{
              color: color,
              fontSize: "0.82rem",
              fontStyle: "italic",
              fontWeight: 700,
              lineHeight: 1.55,
            }}
          >
            {persona.quote}
          </p>
        </div>

        {/* ── DESCRIPTION ── */}
        <div style={{ padding: "10px 22px 0" }}>
          <p
            style={{
              color: "rgba(200,220,255,0.75)",
              fontSize: "0.8rem",
              lineHeight: 1.7,
            }}
          >
            {persona.description}
          </p>
        </div>

        {/* ── RADAR CHART ── */}
        <div style={{ padding: "14px 16px 0" }}>
          <div
            style={{
              borderRadius: "16px",
              background: "rgba(0,0,0,0.3)",
              border: `1px solid ${color}18`,
              padding: "14px 8px 8px",
            }}
          >
            {/* Chart header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                paddingLeft: "8px",
                marginBottom: "6px",
              }}
            >
              <Zap size={12} style={{ color }} />
              <span
                style={{
                  color: `${color}90`,
                  fontSize: "0.68rem",
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                }}
              >
                투자 스타일 레이더
              </span>
            </div>

            <div style={{ width: "100%", height: 210 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={radarData}
                  margin={{
                    top: 10,
                    right: 30,
                    bottom: 10,
                    left: 30,
                  }}
                >
                  <PolarGrid
                    stroke={`${color}20`}
                    strokeWidth={1}
                  />
                  <PolarAngleAxis
                    dataKey="stat"
                    tick={{
                      fill: `${color}cc`,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                    tickLine={false}
                  />
                  <PolarRadiusAxis
                    domain={[0, statMax]}
                    tick={false}
                    axisLine={false}
                    tickCount={5}
                  />
                  <Radar
                    name="stats"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    fill={color}
                    fillOpacity={0.18}
                    dot={(dotProps: {
                      cx?: number;
                      cy?: number;
                      index?: number;
                    }) => (
                      <circle
                        key={`dot-${dotProps.index}`}
                        cx={dotProps.cx ?? 0}
                        cy={dotProps.cy ?? 0}
                        r={4}
                        fill={color}
                        stroke="rgba(255,255,255,0.7)"
                        strokeWidth={1.5}
                      />
                    )}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Stat numbers row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 4px",
                marginTop: "2px",
              }}
            >
              {radarData.map((item) => (
                <div
                  key={item.stat}
                  style={{ textAlign: "center" }}
                >
                  <div
                    style={{
                      color:
                        item.value >= 80 ? color : `${color}60`,
                      fontSize: "0.75rem",
                      fontWeight: 900,
                    }}
                  >
                    {item.value}
                  </div>
                  <div
                    style={{
                      color: `${color}50`,
                      fontSize: "0.58rem",
                    }}
                  >
                    {item.stat}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── LUCKY / TABOO SECTORS ── */}
        <div style={{ padding: "14px 18px 0" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Lucky */}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: `${color}80`,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  marginBottom: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <TrendingUp size={10} /> 행운 섹터
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px",
                }}
              >
                {persona.luckyStocks.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: "3px 8px",
                      borderRadius: "99px",
                      background: `${color}12`,
                      border: `1px solid ${color}30`,
                      color: color,
                      fontSize: "0.65rem",
                      fontWeight: 700,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Taboo */}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: "rgba(255,77,77,0.7)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  marginBottom: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <TrendingDown size={10} /> 금기 섹터
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px",
                }}
              >
                {persona.tabooStocks.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: "3px 8px",
                      borderRadius: "99px",
                      background: "rgba(255,77,77,0.08)",
                      border: "1px solid rgba(255,77,77,0.25)",
                      color: "#FF4D4D",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── LUCKY SCORE BAR ── */}
        <div
          style={{
            margin: "14px 18px 0",
            padding: "12px 14px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${color}15`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                color: "rgba(200,220,255,0.5)",
                fontSize: "0.68rem",
              }}
            >
              ⭐ 2026 투자 행운 지수
            </span>
            <span
              style={{
                color: "#FFD700",
                fontWeight: 900,
                fontSize: "1rem",
              }}
            >
              {luckyScore}점
            </span>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: "99px",
              height: "6px",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${luckyScore}%` }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: "easeOut",
              }}
              style={{
                height: "100%",
                borderRadius: "99px",
                background: `linear-gradient(90deg, #FFD700, #FF8C00)`,
                boxShadow: "0 0 8px rgba(255,215,0,0.6)",
              }}
            />
          </div>
        </div>

        {/* ── ADVICE ── */}
        <div
          style={{
            margin: "12px 18px 0",
            padding: "12px 14px",
            borderRadius: "12px",
            background: `${color}08`,
            border: `1px solid ${color}18`,
          }}
        >
          <p
            style={{
              color: "#FFD700",
              fontSize: "0.7rem",
              fontWeight: 700,
              marginBottom: "4px",
            }}
          >
            🔮 2026년 운세 예언
          </p>
          <p
            style={{
              color: "rgba(200,220,255,0.7)",
              fontSize: "0.78rem",
              lineHeight: 1.65,
            }}
          >
            {persona.advice}
          </p>
        </div>

        {/* ── SHARE BUTTON (Instagram Story Style) ── */}
        <div style={{ padding: "16px 16px 20px" }}>
          <motion.button
            onClick={handleShare}
            whileTap={{ scale: 0.96 }}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "none",
              background: copied
                ? "linear-gradient(135deg, #22c55e, #16a34a)"
                : "linear-gradient(135deg, #833AB4 0%, #C13584 30%, #E1306C 60%, #F77737 85%, #FCAF45 100%)",
              backgroundSize: "200% 200%",
              animation: "insta-gradient 3s ease infinite",
              color: "#fff",
              fontWeight: 900,
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              boxShadow: copied
                ? "0 4px 20px rgba(34,197,94,0.4)"
                : "0 4px 25px rgba(225,48,108,0.45), 0 0 50px rgba(131,58,180,0.25)",
              transition: "box-shadow 0.3s",
            }}
          >
            {copied ? (
              <>
                <Check size={20} />
                클립보드에 복사 완료!
              </>
            ) : shareLoading ? (
              <>
                <Share2 size={20} />
                공유 중...
              </>
            ) : (
              <>
                <Instagram size={20} />
                내 운명 자랑하기 ✨
                <Share2 size={16} />
              </>
            )}
          </motion.button>

          {/* Screenshot hint */}
          <p
            style={{
              textAlign: "center",
              color: "rgba(200,220,255,0.25)",
              fontSize: "0.62rem",
              marginTop: "8px",
            }}
          >
            📸 스크린샷으로 인스타 스토리에 공유하세요
          </p>
        </div>
      </motion.div>
    </div>
  );
}