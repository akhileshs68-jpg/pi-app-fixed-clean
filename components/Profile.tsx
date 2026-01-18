'use client'

import React, { useState } from 'react'

type Props = {
  user: any
  postCount: number
  onLogout: () => void
}

export default function Profile({ user, postCount, onLogout }: Props) {
  const [bio, setBio] = useState('Hello 👋 I am using Social Hub Pi')
  const [photo, setPhoto] = useState<string | null>(null)

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhoto(url)
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      <h2>👤 Profile</h2>

      <div style={{ marginBottom: 16 }}>
        <img
          src={photo || 'https://via.placeholder.com/120'}
          alt="profile"
          style={{ width: 120, height: 120, borderRadius: '50%' }}
        />
        <div>
          <input type="file" accept="image/*" onChange={onPhotoChange} />
        </div>
      </div>

      <p>
        <b>Username:</b> {user?.username}
      </p>

      <p>
        <b>Total Posts:</b> {postCount}
      </p>

      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={3}
        style={{ width: '100%', marginTop: 12 }}
      />

      <button
        onClick={onLogout}
        style={{ marginTop: 16, padding: '10px 16px' }}
      >
        🚪 Logout
      </button>
    </div>
  )
}
