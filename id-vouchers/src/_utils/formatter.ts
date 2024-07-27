function formatRupiah(amount: number): string {
  // Convert the amount to a string and use the replace function to insert commas
  let formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // Add the IDR symbol
  return `${formattedAmount} Rp`;
}

function formatNumberWithLeadingZeros(num: number, length: number): string {
  return num.toString().padStart(length, "0");
}


export { formatRupiah, formatNumberWithLeadingZeros };