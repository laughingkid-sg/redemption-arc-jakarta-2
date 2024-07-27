"use client";

import { useWallets } from "@/_context/WalletContext";
import {
  Flex,
  Heading,
  Code,
  useToast,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Wallet } from "../page";


export default function WalletPage() {
  const router = useRouter();
  const toast = useToast();
  const [currentOrder, setCurrentOrder] = useState<Wallet | undefined>(); 
  const { wallets, setWallets } = useWallets();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const minWidth = "400px";
  const returnHome = () => router.push("/");
  const updateCollectStatus = (walletId: string, orderId: string) => {
    let updated = false;
    let invalid = false;
    setWallets(
      wallets.map((w) => {
        if (w.id === walletId) {
          return {
            ...w,
            notes: w.notes.map((n) => {
              if (n.orderId === orderId && n.isUsed) {
                 toast({
                   title: "Voucher already used.",
                   description: "Please only present a valid voucher.",
                   status: "warning",
                   duration: 3000,
                   isClosable: false,
                 });
                invalid = true;
              }
              if (n.orderId === orderId && !n.isUsed) {
                updated = true;
                setCurrentOrder(w);
              }
              return n.orderId === orderId && !n.isUsed ? { ...n, isUsed: true } : n;
            }),
          };
        }
        return w;
      })
    );
    if (updated) {
      toast({
        title: "Order Found.",
        description: "Please give voucher order to customer.",
        status: "success",
        duration: 3000,
        isClosable: false,
      });
      onOpen();
    } else if (!invalid) {
      toast({
        title: "Order Not Found.",
        description: "Please check your QR voucher code.",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
    }
  };

  return (
    <>
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
                <Heading
                  size={"lg"}
                  color="white">
                  Scan Voucher
                </Heading>
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
              <Code fontSize={"md"}>Ask customer to present the order voucher</Code>
              <Heading fontSize={"xl"}></Heading>
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
              <Scanner
                onScan={(result) => {
                  const data = JSON.parse(result[0].rawValue);
                  console.log(data);
                  updateCollectStatus(data["walletId"], data["orderId"]);
                }}
              />
              {/* <Button onClick={onOpen}>Open Modal</Button> */}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ currentOrder?.name }</ModalHeader>
          <ModalCloseButton />
          <ModalBody><Image src={currentOrder?.img}></Image></ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
