import styled from 'styled-components';

import type COLOR from './color';

interface TextStyleProps {
  fontSize?: number
  fontWeight?: number | string
  wordBreak?: string
  textAlign?: 'center' | 'left' | 'right'
  color?: COLOR | string
  padding?: string
}

export const Text = styled.pre<TextStyleProps>`
  padding: ${({ padding }) => padding};
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize || 16}px;
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  word-break: ${({ wordBreak }) => wordBreak};
  text-align: ${({ textAlign }) => textAlign};
`;
