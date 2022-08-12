import styled from 'styled-components';
import COLORS from '../../utilities/colors';
import { FlexRow } from '../../styles/sharedStyles';

export const StyledNav = styled.header`
  ${FlexRow};
  background: ${COLORS.darkBlue};
  background: linear-gradient(0deg, rgba(49,57,87,1) 0%, rgba(5,18,63,1) 35%, rgba(5,18,63,1) 55%, rgba(10,22,66,1) 75%, rgba(51,59,88,1) 100%);
  height: 75px;
  align-items: center;
  justify-content: center;
  padding-inline: 20px;
  border-bottom: 1px solid ${COLORS.grey};
  }
`;
