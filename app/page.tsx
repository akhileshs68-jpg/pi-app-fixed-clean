'use client'

import { useState } from 'react'

import BottomNavigation from '../components/bottom-navigation'

import ReelsPage from '../components/reels/reels-page'
import Profile from '../components/Profile'   // ← CAPITAL P confirmed

export default function Home() {
  const [tab, setTab] = useState<'reels' | 'profile'>('reels')

  return (
    <>
      {tab === 'reels' && <ReelsPage />}
      {tab === 'profile' && (
        <Profile
          user={{ username: 'pi_user' }}
          postCount={2}
          onLogout={() => {}}
        />
      )}

      <BottomNavigation active={tab} onChange={setTab} />
    </>
  )
}
