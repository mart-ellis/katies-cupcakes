import calculateCupcakePrice from './calculateCupcakePrice';

export default function calculateOrderTotal(order, cupcakes) {
  return order.reduce((runningTotal, singleOrder) => {
    const cupcake = cupcakes.find(
      (singleCupcake) => singleCupcake.id === singleOrder.id
    );
    return runningTotal + calculateCupcakePrice(cupcake.price, singleOrder.size);
  }, 0);
}
