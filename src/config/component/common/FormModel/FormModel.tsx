import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  useColorMode,
  Flex,
  Text,
} from "@chakra-ui/react";

function FormModel({ open, close, isCentered, loading, title, children }: any) {
  const { colorMode } = useColorMode();

  const headerBgColor = colorMode === "dark" ? "blue.900" : "blue.500";
  const headerTextColor = colorMode === "dark" ? "white" : "white";

  const OverlayOne = () => (
    <ModalOverlay>
      {loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      )}
    </ModalOverlay>
  );

  return (
    <>
      <Modal isCentered={isCentered} size={"2xl"} isOpen={open} onClose={close}>
        {open && <OverlayOne />}
        <ModalContent>
          {title && (
            <Flex
              justify="space-between"
              align="center"
              p={4}
              bg={headerBgColor}
              color={headerTextColor}
            >
              <Text fontSize="xl">{title}</Text>
              <ModalCloseButton
                color={headerTextColor}
                bg="red.500"
                _hover={{ color: "#00000" }}
                size="lg"
                mt={1}
              />
            </Flex>
          )}

          <ModalBody p={-5}>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FormModel;