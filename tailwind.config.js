/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        candy: {
          red: '#FF6B8A',
          orange: '#FF9F43',
          yellow: '#FECA57',
          green: '#5CD85A',
          sky: '#48DBFB',
          blue: '#4E89FF',
          purple: '#A66CFF',
          pink: '#FF7EB3',
          mint: '#00D2D3',
          coral: '#FF6B6B'
        },
        pastel: {
          yellow: '#FFF8E1',
          pink: '#FFF0F5',
          blue: '#F0F8FF',
          green: '#F0FFF4',
          purple: '#F5F0FF',
          orange: '#FFF5EB'
        },
        surface: {
          card: 'rgba(255,255,255,0.85)',
          overlay: 'rgba(255,255,255,0.95)',
          glass: 'rgba(255,255,255,0.6)'
        }
      },
      fontFamily: {
        kids: ['"Jua"', 'sans-serif']
      },
      fontSize: {
        'kids-xs': ['1.125rem', { lineHeight: '1.5' }],
        'kids-sm': ['1.375rem', { lineHeight: '1.5' }],
        'kids-base': ['1.75rem', { lineHeight: '1.4' }],
        'kids-lg': ['2.25rem', { lineHeight: '1.3' }],
        'kids-xl': ['3rem', { lineHeight: '1.2' }],
        'kids-2xl': ['3.75rem', { lineHeight: '1.1' }]
      },
      borderRadius: {
        'kids': '1.5rem',
        'kids-lg': '2rem',
        'kids-xl': '2.5rem'
      },
      boxShadow: {
        'kids': '0 8px 0 0 rgba(0,0,0,0.1)',
        'kids-lg': '0 12px 0 0 rgba(0,0,0,0.12)',
        'kids-glow': '0 0 30px rgba(255,255,255,0.5)',
        'kids-card': '0 10px 0 -2px rgba(0,0,0,0.08), 0 20px 40px -8px rgba(0,0,0,0.12)',
        'kids-card-hover': '0 14px 0 -2px rgba(0,0,0,0.1), 0 28px 50px -8px rgba(0,0,0,0.15)',
        'kids-inset': 'inset 0 -4px 0 0 rgba(0,0,0,0.08)',
        'kids-button': '0 6px 0 0 rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.1)'
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-mid': 'float 4s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'drift-right': 'driftRight 25s linear infinite',
        'drift-left': 'driftLeft 20s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'wiggle': 'wiggle 0.4s ease-in-out',
        'jelly': 'jelly 0.5s ease-in-out',
        'pop-in': 'popIn 0.5s cubic-bezier(0.68,-0.55,0.265,1.55)',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        driftRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' }
        },
        driftLeft: {
          '0%': { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        twinkle: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '25%': { transform: 'rotate(3deg)' },
          '50%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' }
        },
        jelly: {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1, 0.9)' },
          '50%': { transform: 'scale(0.95, 1.05)' },
          '75%': { transform: 'scale(1.02, 0.98)' },
          '100%': { transform: 'scale(1)' }
        },
        popIn: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,255,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255,255,255,0.6)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      backgroundImage: {
        'rainbow': 'linear-gradient(135deg, #FF6B8A, #FF9F43, #FECA57, #5CD85A, #48DBFB, #A66CFF, #FF7EB3)',
        'sky-gradient': 'linear-gradient(180deg, #E8F4FD 0%, #D4ECFD 30%, #F7E8FF 70%, #FFE8F5 100%)',
        'card-shine': 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 55%, transparent 60%)'
      }
    }
  },
  plugins: []
}
