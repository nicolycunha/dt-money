import styled from 'styled-components'
import { media } from '../../styles/media'

export const TransactionTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${props => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  ${media.md(`
    font-size: 0.875rem;

    td {
        padding: 1rem;
        white-space: wrap;
    }
  `)}
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${props =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`
