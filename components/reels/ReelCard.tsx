 'use client'

type Reel = {
  id: number | string
  video: string
  username?: string
  caption?: string
  likes?: number
}

export default function ReelCard({ reel }: { reel: Reel }) {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <video
        src={reel.video}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  )
}
