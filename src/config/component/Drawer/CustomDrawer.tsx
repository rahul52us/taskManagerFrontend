import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRef } from "react";

interface CustomDrawerProps {
  open: boolean;
  title?: string;
  close: any;
  children: any;
  size?: string;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  title,
  open,
  close,
  size,
  children,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();

  const headerBgColor = colorMode === "dark" ? "blue.900" : "blue.500";
  const headerTextColor = colorMode === "dark" ? "white" : "white";
  const handleCloseDrawer = () => {
    close();
  };

  return (
    <Drawer
      isOpen={open}
      placement="right"
      onClose={handleCloseDrawer}
      size={size ? size : "xl"}
      finalFocusRef={drawerRef}
    >
      <DrawerOverlay />
      <DrawerContent
        css={{
          transition: "transform 0.1s ease-out",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {title && (
          <Flex
            justify="space-between"
            alignItems="center"
            p={4}
            bg={headerBgColor}
            color={headerTextColor}
          >
            <Text fontSize="xl">{title}</Text>
            <DrawerCloseButton
              color={headerTextColor}
              bg="red.500"
              _hover={{color : '#00000'}}
              size="lg"
              mt={1}
            />
          </Flex>
        )}

        <Divider />
        <DrawerBody style={{ overflowY: "auto" }}>
          <div style={{ minHeight: "calc(100vh - 245px)" }}>{children}</div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
