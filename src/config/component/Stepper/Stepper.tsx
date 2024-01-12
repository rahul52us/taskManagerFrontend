import React from "react";
import {
  Box,
  Flex,
  Step,
  StepDescription,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

interface Steps {
  title: string;
  description: string;
  Icon: React.ReactNode;
}

interface CustomStepperProps {
  steps: Steps[];
  activeStepIndex: number;
  orientation?: "horizontal" | "vertical";
}

const CustomStepper: React.FC<CustomStepperProps> = ({
  steps,
  activeStepIndex,
  orientation,
}) => {
  const { activeStep } = useSteps({
    index: activeStepIndex,
    count: steps.length,
  });

  return (
    <Box border="1px solid lightgray" borderRadius={10} p={5}>
      <Stepper index={activeStep} orientation={orientation}>
        {steps.map((step, index) => (
          <Step key={index}>
            <Flex flexDirection="column" alignItems="center">
              <StepTitle>{step.title}</StepTitle>
              <StepIndicator>
                <StepStatus
                  complete={step.Icon}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
               <StepDescription> {step.description}</StepDescription>
              </Flex>
            {index < steps.length - 1 && <StepSeparator />}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

CustomStepper.defaultProps = {
  orientation: "horizontal",
};

export default CustomStepper;