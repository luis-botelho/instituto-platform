import { ImageResponse } from 'next/og'

export const alt = 'Caminhos de Mambucaba — território, comunidade e experiências'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#f6f0e4', color: '#153f2b', padding: '72px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '900px' }}>
        <div style={{ display: 'flex', color: '#a65334', fontSize: 28, letterSpacing: 4, textTransform: 'uppercase' }}>Plataforma territorial</div>
        <div style={{ display: 'flex', fontSize: 82, fontWeight: 700, lineHeight: 1.05, marginTop: 24 }}>Caminhos de Mambucaba</div>
        <div style={{ display: 'flex', fontSize: 34, lineHeight: 1.35, marginTop: 30, color: '#315d76' }}>Um percurso nasce na serra, atravessa o território e encontra o mar.</div>
        <div style={{ display: 'flex', width: 260, height: 10, borderRadius: 10, background: '#b86540', marginTop: 48 }} />
      </div>
    </div>, size,
  )
}
