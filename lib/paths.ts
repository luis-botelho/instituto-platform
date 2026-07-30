export function withBasePath(path: string) {
  if (/^(?:[a-z]+:)?\/\//i.test(path)) return path

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${normalizedPath}`
}
