"use client"
import { Button, Code, Flex, Image, Heading, Text } from "@chakra-ui/react";
import VoucherSet from "@/_components/VoucherSet";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useWallets } from "@/_context/WalletContext";
import { formatRupiah } from "@/_utils/formatter";
import CameraIcon from "@/_components/CameraIcon";


export type Wallet = {
  name: string;
  id: string;
  notes: Note[];
  img?: string;
  isActive: boolean
}
export type Note = {
  value: number;
  isUsed: boolean;
  note?: string;
  orderId: string;
}

export default function Home() {

  const minWidth = "400px";
  const userName = "Sedaap Food Store";
  const accNumber = "3196368384";
  const { wallets, setWallets } = useWallets();

  const isAllClose = wallets.reduce((acc, item) => {
      return acc && item.isActive == false;
  }, true);

  const openAllStore = () => {
    setWallets(
      wallets.map((w) => {
        return {
          ...w,
          isActive: true
        }
      })
    )
  }
  const closeAllStore = () => {
    setWallets(
      wallets.map((w) => {
        return {
          ...w,
          isActive: false,
        };
      })
    );
  };

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
                {userName}
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
              <Button w={"50%"}>Withdrawal</Button>
              <Button
                w={"50%"}
                colorScheme={isAllClose ? "green" : "red"}
                onClick={isAllClose ? openAllStore : closeAllStore}>
                {isAllClose ? "Open Store" : "Close Store"}
              </Button>
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
                To redeem your cash, select the withdrawal and present the QR code to our withdrawal
                partners.
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
          <Flex
            alignItems={"center"}
            gap={2}>
            <Code fontSize={"md"}>Total Sales</Code>
            <Heading fontSize={"xl"}>
              {formatRupiah(
                wallets.reduce((acc, item) => {
                  return acc + item.notes.reduce((noteAcc, note) => noteAcc + note.value, 0);
                }, 0)
              )}
            </Heading>
          </Flex>
          {wallets.map((wallet, index) => {
            return (
              <VoucherSet
                key={"VS-" + index}
                wallet={wallet}
                setWallets={setWallets}
              />
            );
          })}
        </Flex>
        <CameraIcon />
      </Flex>
    </Flex>
  );
}
