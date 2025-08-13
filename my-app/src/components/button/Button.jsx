import styled from 'styled-components';
const ButtonContainer = styled.div`
  display: flex;
  width: 18%;
  height: 20%;
  align-items: center;
  justify-content: center;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border: none;
  border-radius: 10px;
  padding: 6px 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const ButtonText = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: ${({ $color }) => $color}; /* 텍스트 색상 */
  letter-spacing: 0.5px;
`;
const Button = (props) => {
  const {
    text,
    backgroundColor = '#007BFF',
    color = '#FFFFFF',
    onClick,
  } = props;
  const handleTouchClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <ButtonContainer
      $backgroundColor={backgroundColor}
      onClick={handleTouchClick}
    >
      <ButtonText $color={color}>{text}</ButtonText>
    </ButtonContainer>
  );
};
export default Button;
