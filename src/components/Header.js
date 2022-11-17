import {
  Avatar,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import { FiMenu } from "react-icons/fi";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);
  
  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState(state => !state), []);
  
  return [state, toggle]
}

const Header = () => {
  const [balance, setBalance] = useState(0)
  const [showBalance, setShowBalance] = useToggle()



  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_stock_outputs = localStorage.getItem("db_stock_outputs")
      ? JSON.parse(localStorage.getItem("db_stock_outputs"))
      : [];

    const totalBalance = 0
    db_stock_outputs.map((item) => {
      totalBalance += item.amountedPrice
    })

    setBalance(totalBalance)
  })

  const hiddenBalance = ''
  for (let i = 0; i < balance.toString().length; i++) {
    hiddenBalance += '*'
  }

  const { onOpen } = useSidebarContext();

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1120}
      h="20"
      mx="auto"
      px="2"
      py="2"
      align="center"
      boxShadow="0 1px 0 #ccc"
      color="gray.500"
      fontWeight="bold"
    >
      {isMobile && (
        <IconButton
          icon={<Icon as={FiMenu} />}
          onClick={onOpen}
          variant="unstyled"
          fontSize="20"
          mr="2"
        ></IconButton>
      )}
      <Text>Controle de estoque</Text>
      <Flex ml="auto">
        <HStack>
          <Text>Saldo: R${showBalance ? balance : hiddenBalance}</Text>
          <button onClick={setShowBalance}>{showBalance ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
