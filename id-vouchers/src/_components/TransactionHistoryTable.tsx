import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { formatRupiah } from "@/_utils/formatter";

// Define the type for withdrawal history
interface Withdrawal {
  transactionId: string;
  date: string;
  amount: number;
}

// Sample data
const withdrawalHistory: Withdrawal[] = [
  { transactionId: "TX123", date: "20 Jul 2024", amount: 200000 },
  { transactionId: "TX124", date: "26 Jul 2024", amount: 500000 },
  { transactionId: "TX125", date: "27 Jul 2025", amount: 150000 },
];

const WithdrawalHistoryTable: React.FC = () => {
  return (
    <Box

      maxWidth={"350px"}
      mt={10}
      >
      <TableContainer >
        <Table variant="simple" >
          <Thead>
            <Tr>
              <Th>Trans. ID</Th>
              <Th>Date</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {withdrawalHistory.map((withdrawal) => (
              <Tr key={withdrawal.transactionId}>
                <Td>{withdrawal.transactionId}</Td>
                <Td>{withdrawal.date}</Td>
                <Td isNumeric>{formatRupiah(withdrawal.amount)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WithdrawalHistoryTable;
