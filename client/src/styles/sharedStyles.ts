import styled from 'styled-components';
import COLORS from '../utilities/colors';
import { Typography } from '@mui/material';

// strings for more flexibility
export const FlexColumn = `
display: flex;
flex-direction: column;
`;

export const FlexRow = `
display: flex;
flex-direction: row;
`;

// shared styled components
export const StyledPageContainer = styled.div`
  ${FlexColumn};
  width: 100%;
  min-height: 100vh;
  max-height: -webkit-fill-available;
  background: ${COLORS.darkBlue};
  align-items: center;
`;

export const MainContentContainer = styled.main`
  ${FlexColumn};
  border: 1px solid ${COLORS.gold};
  width: 375px;
  min-height: 100vh;
  max-height: -webkit-fill-available;
  padding-left: 0.25rem;
`;

export const ContentContainerColumn = styled.div`
  ${FlexColumn};
  width: 100%;
  padding: 1.5rem;
`;

export const ContentContainerRow = styled.div`
  ${FlexRow};
  width: 100%;
  padding: 1.5rem 0.5rem;
`;

export const CenteredTypography = styled(Typography)`
  text-align: center;
`;
