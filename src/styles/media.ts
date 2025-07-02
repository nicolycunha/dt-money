export const breakpoints = {
  sm: '510px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
}

export const media = {
  sm: (styles: string) => `@media (max-width: ${breakpoints.sm}) { ${styles} }`,
  md: (styles: string) => `@media (max-width: ${breakpoints.md}) { ${styles} }`,
  lg: (styles: string) => `@media (max-width: ${breakpoints.lg}) { ${styles} }`
}
