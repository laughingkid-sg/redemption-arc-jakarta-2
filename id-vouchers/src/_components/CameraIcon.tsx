import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaCamera } from "react-icons/fa";

export default function CameraIcon() {
    const router = useRouter();
     const goToCamera = () => router.push("/scan");
  return (
    
      <Flex
        bgColor={"orange.300"}
        p={4}
        borderRadius={30}
        border={4}
        position={"absolute"}
        borderColor={"black"}
        bottom={8} // Adjust as needed
        right={4} // Adjust as needed
        onClick={goToCamera}>
        <FaCamera size={"34px"} />
      </Flex>

  );
}