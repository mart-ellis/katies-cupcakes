import formatMoney from './formatMoney';
import calculateCupcakePrice from './calculateCupcakePrice';

export default function attachNamesAndPrices(order, cupcakes) {
  return order.map((item) => {
    const cupcake = cupcakes.find((cupcake) => cupcake.id === item.id);
    return {
      ...item,
      name: cupcake.name,
      thumbnail: cupcake.image.asset.fluid.src,
      price: formatMoney(calculateCupcakePrice(cupcake.price, item.size)),
    };
  });
}
