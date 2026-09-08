import Image from 'next/image'
import { cn } from '@/lib/utils'
import { withBasePath } from '@/lib/paths'

/**
 * Marca territorial do Caminhos de Mambucaba.
 * Carrega o símbolo oficial aprovado (matriz v2) de public/brand/caminhos.
 */
export function BrandMark({
  className,
  alt = 'Caminhos de Mambucaba',
}: {
  className?: string
  alt?: string
}) {
  return (
    <Image
      src={withBasePath('/brand/caminhos/simbolo.svg')}
      alt={alt}
      width={128}
      height={128}
      priority
      className={cn('h-10 w-10', className)}
    />
  )
}