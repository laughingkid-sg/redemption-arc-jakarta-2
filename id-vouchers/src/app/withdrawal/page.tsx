"use client";

import CameraIcon from "@/_components/CameraIcon";
import WithdrawalHistoryTable from "@/_components/TransactionHistoryTable";
import VoucherSet from "@/_components/VoucherSet";
import { useWallets } from "@/_context/WalletContext";
import { formatNumberWithLeadingZeros, formatRupiah } from "@/_utils/formatter";
import { Flex, Heading, Button, Code, Divider, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
import QRCode from "react-qr-code";

export default function WithdrawalPage() {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);

  const { wallets, setWallets } = useWallets();

  const minWidth = "400px";
  const userName = "Sedaap Food Store";
  const accNumber = "3196368384";

  const returnHome = () => router.push("/");

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
          <Flex
            flexDirection={"column"}
            w={"100%"}
            gap={4}>
            <Flex
              border={1}
              w={"100%"}
              gap={2}
              onClick={returnHome}>
              <Flex
                w={"20px"}
                alignItems={"center"}
                color={"white"}>
                <IoIosArrowBack />
              </Flex>
              <Heading
                color={"white"}
                fontSize={"md"}>
                Back
              </Heading>
            </Flex>
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
                <Button
                  w={"50%"}
                  onClick={() => setShowQR(!showQR)}>
                  {showQR ? "Hide QR" : "Show QR"}
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
                  To redeem your cash, select withdrawal and present the QR code to our withdrawal
                  partners.
                </Flex>
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
            <Code fontSize={"md"}>Balance</Code>
            <Heading fontSize={"xl"}>
              {formatRupiah(
                wallets.reduce((acc, item) => {
                  return acc + item.notes.reduce((noteAcc, note) => noteAcc + note.value, 0);
                }, 0)
              )}
            </Heading>
          </Flex>
          <Flex
            borderRadius={12}
            minH={"100px"}
            w={"100%"}
            p={"20px"}
            bgColor={"white"}
            boxShadow={"lg"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={4}>
            {showQR && (
              <>
                <Heading size={"lg"}>Balance Collection QR</Heading>
                <QRCode value="cc5f3b7adc2b087d71bbe3713fc014663db3736506de400b59fdf4deafb5037a" />
                <Divider w={"100%"} />
              </>
            )}
            <Flex
              flexDirection={"column"}
              w={"100%"}
              alignItems={showQR ? "center" : "flex-start"}>
              <Heading size={"lg"}>Transaction History</Heading>
              <WithdrawalHistoryTable />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <CameraIcon />
    </Flex>
  );
}
