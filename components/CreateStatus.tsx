import { useState } from 'react'

'use client'

type Props = {
    onPost: (item: { text: string; fileUrl: string; fileType: string }) => void
}

export default function CreateStatus({ onPost }: Props) {
    const [text, setText] = useState('')
    const [file, setFile] = useState<File | null>(null)

    const submit = () => {
        if (!file) {
            alert('Image ya video select karo')
            return
        }
        const url = URL.createObjectURL(file)
        onPost({ text, fileUrl: url, fileType: file.type })
        setText('')
        setFile(null)
    }

    return (
        <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
            <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <input
                style={{ display: 'block', width: '100%', marginTop: 8 }}
                placeholder="Status text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button style={{ marginTop: 8 }} onClick={submit}>
                Share
            </button>
        </div>
    )
}