'use client'

import { reels } from './reels-data'
import ReelCard from './ReelCard'  

export default function ReelsFeed() {
  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
      }}
    >
      {reels.map((reel) => (
        <div
          key={reel.id}
          style={{
            height: '100vh',
            scrollSnapAlign: 'start',
          }}
        >
          <ReelCard reel={reel} />
        </div>
      ))}
    </div>
  )
}


