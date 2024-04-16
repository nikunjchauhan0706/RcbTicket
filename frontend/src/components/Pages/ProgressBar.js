import { styled } from "styled-components";

const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Step = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  position: relative;
  pointer-events: ${(props) =>
    props.isActive || props.isComplete ? "all" : "none"};
  cursor: ${(props) =>
    props.isActive || props.isComplete ? "pointer" : "default"};

  &:not(:last-child):before,
  &:not(:last-child):after {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 0.25rem;
    content: "";
    transform: translateY(-50%);
    will-change: width;
    z-index: 0;
  }

  &:before {
    width: 100%;
    background-color: #e6e7e8;
  }

  &:after {
    width: 0;
    background-color: #8056b0;
  }

  ${(props) =>
    props.isComplete &&
    `
    &:after {
      width: 100% !important;
      opacity: 1;
      transition: width 0.6s ease-in-out, opacity 0.6s ease-in-out;
    }
  `}
`;

const Steps = styled.ul`
  display: flex;
  width: 80%;
  margin: 0;
  margin-bottom: 40px;
  padding: 0 0 2rem 0;
  list-style: none;
`;
const StepIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 35px;
  height: 35px;
  background-color: #fff;
  border: 0.25rem solid #e6e7e8;
  border-radius: 50%;
  color: transparent;
  font-size: 2rem;
  z-index: 1;
  &:before {
    display: block;
    color: #fff;
    font-size: 20px;
    content: "✓";
  }
  ${(props) =>
    !props.isComplete &&
    `
    &:before {
      font-size: 18px;
      color: #888; /* Grayed-out icon for incomplete steps */
    }
  `}
  ${(props) =>
    props.step &&
    !props.isComplete &&
    `
    &:before {
      font-size: 18px;
      color: #888; /* Grayed-out icon for incomplete steps */
      content: "${props.step}"; /* If incomplete, display step number */
    }
  `}
  ${(props) =>
    props.isActive &&
    props.isComplete &&
    `
    color: #fff;
    transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out,
      color 0.3s ease-in-out;
  `}
  ${(props) =>
    props.isComplete &&
    `
    animation: 0.5s ease-in-out;
    background-color: #8056b0;
    border-color: #8056b0;
    color: #fff;
  `}
  ${(props) =>
    props.isActive &&
    !props.isComplete &&
    `
    border-color: #8056b0;
    transition-delay: 0.5s;
  `}
`;

const StepLabel = styled.span`
  position: absolute;
  bottom: -2rem;
  left: 50%;
  margin-top: 1rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  transform: translateX(-50%);

  ${(props) =>
    props.isActive &&
    !props.isComplete &&
    `
      text-decoration: solid;
    `}

  ${(props) =>
    props.isActive &&
    `
      transition: color 0.3s ease-in-out;
      transition-delay: 0.5s;
    `}
`;

const ProgressBar = ({ currentPage }) => {
  const steps = ["Start", "Setup", "Finish"];

  return (
    <StepsContainer>
      <Steps>
        {steps.map((label, index) => {
          const isActive = index === currentPage;
          const isComplete = index < currentPage;
          return (
            <Step
              key={index}
              isActive={index === currentPage}
              isComplete={index < currentPage}
            >
              <StepIcon
                isActive={isActive}
                isComplete={isComplete}
                step={index + 1}
              />
              <StepLabel isActive={isActive} isComplete={isComplete}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Steps>
    </StepsContainer>
  );
};

export default ProgressBar;
