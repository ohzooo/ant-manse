import { Outlet, useLocation, useNavigate } from 'react-router';
import { Home, Star, ShieldAlert, ShoppingBag } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: '홈', icon: Home },
  { path: '/result', label: '내 운명', icon: Star },
  { path: '/taboo', label: '오늘 금기', icon: ShieldAlert },
  { path: '/shop', label: '행운 쇼핑', icon: ShoppingBag },
];

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: '#040D1E',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* Star field background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px),
            radial-gradient(circle, rgba(0,212,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 55px 55px',
          backgroundPosition: '0 0, 40px 40px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Page content */}
        <div style={{ flex: 1, paddingBottom: '72px', overflowY: 'auto' }}>
          <Outlet />
        </div>

        {/* Bottom Navigation */}
        <nav
          style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '430px',
            background: 'rgba(4,13,30,0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(0,212,255,0.2)',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '8px 0 12px',
            zIndex: 100,
          }}
        >
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 16px',
                  transition: 'all 0.2s',
                }}
              >
                <div
                  style={{
                    color: isActive ? '#FFD700' : 'rgba(255,255,255,0.4)',
                    filter: isActive ? 'drop-shadow(0 0 6px #FFD700)' : 'none',
                    transition: 'all 0.3s',
                  }}
                >
                  <Icon size={22} />
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    color: isActive ? '#FFD700' : 'rgba(255,255,255,0.4)',
                    fontWeight: isActive ? 700 : 400,
                    transition: 'all 0.3s',
                    textShadow: isActive ? '0 0 8px rgba(255,215,0,0.6)' : 'none',
                  }}
                >
                  {label}
                </span>
                {isActive && (
                  <div
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#FFD700',
                      boxShadow: '0 0 8px #FFD700',
                      marginTop: '2px',
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
