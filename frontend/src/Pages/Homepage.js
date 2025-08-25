import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();
  const [tabIndex, setTabIndex] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();

  // Background colors for light/dark mode
  const containerBg = useColorModeValue("white", "gray.800");
  const headerBg = useColorModeValue("blue", "teal.500");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      {/* Header */}
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        bg={headerBg}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="white">
          Textify-World
        </Text>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </Box>

      {/* Content Box */}
      <Box bg={containerBg} w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs
          isFitted
          variant="soft-rounded"
          index={tabIndex}
          onChange={(i) => setTabIndex(i)}
        >
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign-Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login switchToSignup={() => setTabIndex(1)} />
            </TabPanel>
            <TabPanel>
              <Signup switchToLogin={() => setTabIndex(0)} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
