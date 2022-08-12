import styled from 'styled-components';
import { FlexRow, ContentContainerRow } from '../../styles/sharedStyles';
import COLORS from '../../utilities/colors';

export const Tag = styled(ContentContainerRow)<{ isGuessed: boolean }>`
  width: fit-content;
  flex-wrap: nowrap;
  padding: 1.5rem 0.5rem;
  border-radius: 0.5rem;
  max-height: 2.375rem;
  justify-content: center;
  align-items: center;
  color: ${COLORS.black};
  background: ${({ isGuessed }) => (isGuessed ? COLORS.green : COLORS.red)};
`;

export const TagsContainer = styled.div`
  ${FlexRow};
  width: 100%;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const StyledLi = styled.li`
  margin-bottom: 1rem;
`;
