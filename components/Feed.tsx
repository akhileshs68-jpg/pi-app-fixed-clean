import React from 'react'

type Item = { id?: string; text?: string; fileUrl?: string; fileType?: string }

export default function Feed({ items = [] }: { items?: Item[] }) {
    return (
        <div style={{ marginTop: 16 }}>
            {items.map((it, i) => {
                const key = it.id ?? `${i}-${it.fileUrl ?? ''}`
                const fileType = (it.fileType ?? '').toLowerCase()
                const hasUrl = Boolean(it.fileUrl)

                return (
                    <div key={key} style={{ marginBottom: 16 }}>
                        {it.text ? <p style={{ margin: '0 0 8px' }}>{it.text}</p> : null}

                        {!hasUrl ? null : fileType.startsWith('image') ? (
                            <img
                                src={it.fileUrl}
                                alt={it.text ?? 'image'}
                                loading="lazy"
                                style={{ width: '100%', borderRadius: 8, display: 'block' }}
                            />
                        ) : fileType.startsWith('video') ? (
                            <video src={it.fileUrl} controls style={{ width: '100%', borderRadius: 8 }} />
                        ) : (
                            <a href={it.fileUrl} target="_blank" rel="noopener noreferrer">
                                Open file
                            </a>
                        )}
                    </div>
                )
            })}
        </div>
    )
}