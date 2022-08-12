import styled from 'styled-components';
import { FlexColumn, FlexRow } from '../../styles/sharedStyles';
import { TextField, Typography } from '@mui/material';
import COLORS from '../../utilities/colors';

export const TextFieldStyled = styled(TextField)`
  background: ${COLORS.white};
  margin-block: 2rem;
  width: 80%;
`;

export const FormContentContainer = styled.div`
  ${FlexColumn};
  align-items: center;
  width: 85%;
  margin: 50px auto;
  height: 275px;
  justify-content: space-around;
  background: ${COLORS.white};
  padding-block: 1rem;
  border: 3px solid ${COLORS.gold};
  border-radius: 1rem;
`;

export const StyledFormHeader = styled(Typography)`
  ${FlexRow};
  justify-content: center;
`;
