"use client";

import CameraIcon from "@/_components/CameraIcon";
import VoucherSet from "@/_components/VoucherSet";
import { useWallets } from "@/_context/WalletContext";
import { formatNumberWithLeadingZeros, formatRupiah } from "@/_utils/formatter";
import { Flex, Heading, Button, Code, Divider, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
import { Suspense } from "react";

export default function WalletPage() {
  return <Suspense fallback={<div>Loading...</div>}><Wallet /></Suspense>
}

function Wallet() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { wallets, setWallets } = useWallets();

  const walletId = searchParams.get("id");
  const minWidth = "400px";

  const wallet = wallets.find((wallet) => wallet.id === walletId);
  const returnHome = () => router.push("/");
  const updateActiveShop = () => {
    setWallets(
      wallets.map((w) => {
        if (w.id === walletId) {
          return {
            ...w,
            isActive: !w.isActive,
          };
        }
        return w;
      })
    );
  };

  if (!wallet) {
    returnHome();
    return null;
  }
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
              flexDirection={"row"}
              alignItems={"center"}
              gap={4}>
              {wallet.img && (
                <Flex
                  w={"100px"}
                  h={"100px"}
                  borderRadius={8}
                  borderColor={"white"}
                  borderWidth={1}
                  overflow={"hidden"}>
                  <img
                    src={wallet.img}
                    alt={wallet.name}
                    style={{
                      filter: wallet.isActive ? "None" : "grayscale(100%)",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Flex>
              )}
              <Flex
                flexDirection={"column"}
                gap={2}>
                <Heading
                  size={"lg"}
                  color="white">
                  {wallet?.name}
                </Heading>
                <Button
                  colorScheme={wallet?.isActive ? "red" : "green"}
                  onClick={updateActiveShop}>
                  {wallet?.isActive ? "Stop" : "Start"}
                </Button>
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
                wallet.notes.reduce((acc, note) => {
                  return acc + (!note.isUsed ? 0 : note.value);
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
            <Flex
              flexDirection="row"
              w={"100%"}
              alignItems={"center"}
              gap={4}>
              <Flex
                flexDirection={"row"}
                gap={4}
                justifyContent={"space-around"}
                w="100%">
                <Flex
                  flexDirection={"column"}
                  alignItems={"center"}
                  gap={2}>
                  <Heading size={"lg"}>Collected</Heading>
                  <Heading
                    size={"md"}
                    fontWeight={"normal"}>
                    {wallet.notes.reduce((acc, note) => {
                      return acc + (note.isUsed ? 1 : 0);
                    }, 0)}
                  </Heading>
                </Flex>

                <Flex
                  flexDirection={"column"}
                  alignItems={"center"}
                  gap={2}>
                  <Heading size={"lg"}>Uncollected</Heading>
                  <Heading
                    size={"md"}
                    fontWeight={"normal"}>
                    {wallet.notes.reduce((acc, note) => {
                      return acc + (note.isUsed ? 0 : 1);
                    }, 0)}
                  </Heading>
                </Flex>
              </Flex>
            </Flex>
            <Divider w={"100%"} />
            <Flex
              flexDirection="row"
              w={"100%"}
              justifyContent={"space-around"}
          
              gap={4}>
              <Flex flexDirection={"column"}>
                {wallet.notes
                  .filter((note) => note.isUsed) // Filter out notes where isUsed is false
                  .map((note, index) => {
                    return (
                      <Flex
                        key={"F" + index}
                        w={"100%"}
                        flexDirection={"column"}>
                        <Flex
                          alignItems={"center"}
                          gap={2}>
                          <Text>{index + 1}.</Text>
                          <Heading> {note.orderId.substring(0, 5)}</Heading>
                        </Flex>
                        <Divider w={"100%"} />
                      </Flex>
                    );
                  })}
              </Flex>
              <Flex flexDirection={"column"}>
                {wallet.notes
                  .filter((note) => !note.isUsed) // Filter out notes where isUsed is false
                  .map((note, index) => {
                    return (
                      <Flex
                        key={"F" + index}
                        w={"100%"}
                        flexDirection={"column"}>
                        <Flex
                          alignItems={"center"}
                          gap={2}>
                          <Text>{index + 1}.</Text>
                          <Heading> {note.orderId.substring(0, 5)}</Heading>
                        </Flex>
                        <Divider w={"100%"} />
                      </Flex>
                    );
                  })}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <CameraIcon />
    </Flex>
  );
}
