"use client"
import { Button, Code, Flex, Image, Heading, Text } from "@chakra-ui/react";
import VoucherSet from "@/_components/VoucherSet";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useWallets } from "@/_context/WalletContext";


export type Wallet = {
  name: string;
  id: string;
  notes: Note[];
}
export type Note = {
  value: number;
  isUsed: boolean;
}

export default function Home() {

  const minWidth = "400px";
  const userName = "John Doe";
  const accNumber = "3196368384";
  const { wallets, setWallets } = useWallets();


  return (
    <Flex
      flexDirection="column"
      h="calc(100vh)"
      bgColor={"#222757"}>
      <Flex
        p={8}
        alignItems={"center"}
        flexDirection={"column"}>
        <Flex
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap={6}
          minW={minWidth}
          justifyContent={"start"}
          h={"100%"}>
          <Image
            maxW={"160px"}
            borderRadius={8}
            src="./logo.png"
          />
          <Flex
            flexDirection={"column"}
            w={"100%"}
            gap={4}>
            <Flex
              flexDirection={"column"}
              gap={1}>
              <Heading
                size={"lg"}
                color="white">
                {userName},
              </Heading>
              <Heading
                size={"sm"}
                color="white"
                fontWeight={"normal"}>
                Account Number: {accNumber}
              </Heading>
            </Flex>
            <Flex
              gap={4}
              w={"100%"}>
              <Button w={"50%"}>Top-up</Button>
              <Button w={"50%"}>Support</Button>
            </Flex>
            <Flex
              border={1}
              bgColor={"#BCBFE3"}
              w={"100%"}
              padding={4}
              gap={2}>
              <Flex
                w={"20px"}
                alignItems={"center"}>
                <IoIosInformationCircleOutline />
              </Flex>
              <Flex>
                To redeem your vouchers, select the vouchers and present the QR code to merchants.
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flex={1}
        bgColor={"gray.100"}
        borderTopRadius={26}
        p={8}
        alignItems={"center"}
        flexDirection={"column"}>
        <Flex
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap={4}
          minW={minWidth}>
          <Code fontSize={"md"}>TAP TO USE</Code>
          {
            wallets.map((wallet, index) => {
              return (
                <VoucherSet
                  key={"VS-index"}
                  wallet={wallet}
                  setWallets={setWallets}
                />
              );
            })
          }
        </Flex>
      </Flex>
    </Flex>
  );
}
