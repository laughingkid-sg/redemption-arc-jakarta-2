import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

// Define the type for withdrawal history
interface Withdrawal {
  transactionId: string;
  date: string;
  amount: number;
}

// Sample data
const withdrawalHistory: Withdrawal[] = [
  { transactionId: "TX123", date: "2024-07-01", amount: 100 },
  { transactionId: "TX124", date: "2024-07-05", amount: 200 },
  { transactionId: "TX125", date: "2024-07-10", amount: 150 },
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
                <Td isNumeric>${withdrawal.amount.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WithdrawalHistoryTable;
