export const formatPrice = (price: number) => {
    if (price >= 1000) {
      return (
        (price / 1000)
          .toFixed(price % 1000 === 0 ? 0 : 1)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "K"
      );
    }
    return price.toLocaleString();
  };