'use client'

type Tab = 'reels' | 'profile'

type Props = {
  active: Tab
  onChange: (tab: Tab) => void
}

export default function BottomNavigation({ active, onChange }: Props) {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px',
      background: '#111',
      color: '#fff'
    }}>
      <button
        onClick={() => onChange('reels')}
        style={{ color: active === 'reels' ? 'yellow' : 'white' }}
      >
        Reels
      </button>

      <button
        onClick={() => onChange('profile')}
        style={{ color: active === 'profile' ? 'yellow' : 'white' }}
      >
        Profile
      </button>
    </nav>
  )
}

