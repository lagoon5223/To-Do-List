import styled from "styled-components";
import checkIcon from "../../assets/checkIcon.svg"

const SliceSwitch = ({ isOn, onToggle }) => {
  // const [isOn, setIsOn] = useState(defaultOn);

  // useEffect(() => {
  //   setIsOn(defaultOn);
  // }, [defaultOn]);

  // const toggle = () => {
  //   setIsOn(prev => {
  //     const newValue = !prev;
  //     if (newValue) isCompleted();
  //     else isFail();
  //     return newValue;
  //   });
  // };


  return (
    <SwitchContainer onClick={onToggle} $isOn={isOn}>
      <Circle $isOn={isOn}>{isOn && <Icon src={checkIcon} />}</Circle>
    </SwitchContainer>
  );
};

const SwitchContainer = styled.div`
  width: 60px;
  height: 30px;
  border-radius: 30px;
  background-color: ${(props) => (props.$isOn ? "#00FF00" : "#800000")};
  display: flex;
  align-items: center;
  padding: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const Circle = styled.div`
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s;
  transform: ${(props) => (props.$isOn ? "translateX(30px)" : "translateX(0)")};
`;

const Icon = styled.img`
  width: 16px;
  height: 22px;
  user-select: none;
  -webkit-user-drag: none;
`;

export default SliceSwitch;
