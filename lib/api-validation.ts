const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export class ValidationError extends Error {}

export function requiredString(
  value: unknown,
  field: string,
  options: { min?: number; max?: number } = {},
) {
  if (typeof value !== 'string') throw new ValidationError(`${field} é obrigatório.`)
  const normalized = value.trim()
  const min = options.min ?? 1
  const max = options.max ?? 5000
  if (normalized.length < min || normalized.length > max) {
    throw new ValidationError(`${field} deve ter entre ${min} e ${max} caracteres.`)
  }
  return normalized
}

export function optionalString(value: unknown, field: string, max = 5000) {
  if (value === undefined || value === null || value === '') return null
  return requiredString(value, field, { max })
}

export function email(value: unknown) {
  const normalized = requiredString(value, 'E-mail', { max: 254 }).toLowerCase()
  if (!EMAIL_PATTERN.test(normalized)) throw new ValidationError('E-mail inválido.')
  return normalized
}

export function plainObject(value: unknown, field: string) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new ValidationError(`${field} é inválido.`)
  }
  return value as Record<string, unknown>
}

export function assertConsent(value: unknown) {
  if (value !== true && value !== 'autorizado') {
    throw new ValidationError('É necessário autorizar o armazenamento e o contato.')
  }
}

export function protocol(prefix: 'CAM' | 'DEM') {
  return `${prefix}-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
}
