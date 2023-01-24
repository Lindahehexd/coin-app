import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const DarkModeButton = () => {
  
  const { colorMode, toggleColorMode } = useColorMode();

  return <IconButton icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />} isRound="true" size="lg" onClick={toggleColorMode} />;
};

export default DarkModeButton;
