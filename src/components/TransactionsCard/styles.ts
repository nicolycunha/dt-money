import styled from 'styled-components'

export const MobileCard = styled.div`
  background-color: ${({ theme }) => theme['gray-700']};
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span.label {
    font-size: 0.75rem;
    padding-right: 1rem;
    color: ${({ theme }) => theme['gray-400']};
    text-transform: uppercase;
  }

  span.value {
    font-size: 1rem;
    color: ${({ theme }) => theme['gray-100']};
  }
`
