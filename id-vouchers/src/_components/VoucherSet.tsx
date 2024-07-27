import { formatRupiah } from "@/_utils/formatter";
import { Wallet } from "@/app/page";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";

type VoucherSetProps = {
  wallet: Wallet;
  setWallets: (wallets: Wallet[]) => void;
};

export default function VoucherSet({ wallet, setWallets }: VoucherSetProps) {
  const router = useRouter();
  return (
    <Flex
      borderRadius={12}
      minH={"100px"}
      w={"100%"}
      p={"20px"}
      bgColor={"white"}
      boxShadow={"lg"}
      alignItems={"center"}
      onClick={() => router.push("/wallet?id=" + wallet.id)}>
      <Flex
        flexDirection="row"
        w={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}>
        <Heading
          size={"md"}
          fontWeight={"normal"}>
          {wallet.name}
        </Heading>
        <Flex
          alignItems={"center"}
          gap={2}>
          <Heading size={"lg"}>
            {formatRupiah(
              wallet.notes.reduce((acc, note) => {
                return acc + (note.isUsed ? 0 : note.value);
              }, 0)
            )}
          </Heading>
          <MdOutlineKeyboardArrowRight />
        </Flex>
      </Flex>
    </Flex>
  );
}