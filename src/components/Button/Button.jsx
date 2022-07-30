import { ButtonStyled } from './Button.styled';

export const Button = ({ onClick, children }) => {
  return (
    <ButtonStyled type="submit" onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};
