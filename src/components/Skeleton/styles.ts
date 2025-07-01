import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
`

export const SkeletonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem 6rem;
`

export const SkeletonBase = styled.div<{
  width?: string
  height?: string
  radius?: string
}>`
  display: inline-block;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '16px'};
  border-radius: ${({ radius }) => radius || '4px'};
  background-color: #616161;
  animation: ${pulse} 1.5s ease-in-out infinite;
  user-select: none;
  pointer-events: none;
`
