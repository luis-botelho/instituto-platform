import { permanentRedirect } from 'next/navigation'
import { OBSERVATORIO_SITE_URL } from '@/lib/site-config'

export default function ObservatorioPage() {
  permanentRedirect(OBSERVATORIO_SITE_URL)
}