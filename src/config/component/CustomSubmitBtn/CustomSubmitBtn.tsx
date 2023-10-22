import { Box, Button } from "@chakra-ui/react";

interface CustomBtnI {
  loading: boolean;
  onClick?: any;
}

const CustomSubmitBtn = ({ loading, onClick }: CustomBtnI) => {
  return (
    <Box mt={3}>
      <Button>Cancel</Button>
      <Button
        type="submit"
        isLoading={loading}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CustomSubmitBtn;