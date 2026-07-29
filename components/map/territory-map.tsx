'use client'

import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import { CATEGORIAS, STATUS_LABEL, type Ponto } from '@/lib/data'

// Ajusta os limites do mapa aos pontos visíveis.
function FitBounds({ pontos }: { pontos: Ponto[] }) {
  const map = useMap()
  useEffect(() => {
    if (pontos.length === 0) return
    if (pontos.length === 1) {
      map.setView([pontos[0].lat, pontos[0].lng], 13)
      return
    }
    const bounds = pontos.map((p) => [p.lat, p.lng]) as [number, number][]
    map.fitBounds(bounds, { padding: [40, 40] })
  }, [pontos, map])
  return null
}

export default function TerritoryMap({ pontos }: { pontos: Ponto[] }) {
  const center: [number, number] = [-23.02, -44.42]

  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: '#dfe7ea' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds pontos={pontos} />
      {pontos.map((p) => {
        const cor = CATEGORIAS[p.categoria].cor
        return (
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lng]}
            radius={9}
            pathOptions={{
              color: '#fff',
              weight: 2,
              fillColor: cor,
              fillOpacity: 1,
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <p
                  className="text-[0.65rem] font-semibold uppercase tracking-wide"
                  style={{ color: cor }}
                >
                  {CATEGORIAS[p.categoria].label}
                </p>
                <h3 className="mt-0.5 text-base font-semibold text-neutral-900">
                  {p.nome}
                </h3>
                <p className="text-xs text-neutral-500">{p.localidade}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-700">
                  {p.descricao}
                </p>
                {p.horario && (
                  <p className="mt-1.5 text-xs text-neutral-600">
                    <strong>Horário:</strong> {p.horario}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.whatsapp && (
                    <a
                      href={p.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-700 underline"
                    >
                      WhatsApp
                    </a>
                  )}
                  {p.instagram && (
                    <a
                      href={p.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-pink-700 underline"
                    >
                      Instagram
                    </a>
                  )}
                  {p.site && (
                    <a
                      href={p.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-sky-700 underline"
                    >
                      Site
                    </a>
                  )}
                </div>
                <p className="mt-2 text-[0.65rem] italic text-neutral-400">
                  {STATUS_LABEL[p.status]}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
