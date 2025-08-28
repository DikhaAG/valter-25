export const formatIDRCurrency = (amount: number): string => {
  // Gunakan Intl.NumberFormat untuk pemformatan yang akurat dan sesuai lokal
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Atur ke 0 untuk menghilangkan angka di belakang koma (Rp 1.000,00 -> Rp 1.000)
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
};
