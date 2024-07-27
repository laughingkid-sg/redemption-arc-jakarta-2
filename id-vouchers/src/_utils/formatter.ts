function formatRupiah(amount: number): string {
  // Convert the amount to a string and use the replace function to insert commas
  let formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // Add the IDR symbol
  return `${formattedAmount} Rp`;
}

export { formatRupiah };