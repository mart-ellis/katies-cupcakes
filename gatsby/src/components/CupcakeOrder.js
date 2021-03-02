import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculateCupcakePrice from '../utils/calculateCupcakePrice';
import formatMoney from '../utils/formatMoney';

export default function CupcakeOrder({ order, cupcakes, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const cupcake = cupcakes.find((cupcake) => cupcake.id === singleOrder.id);
        return (
          <MenuItemStyles key={`${singleOrder.id}-${index}`}>
            <Img fluid={cupcake.image.asset.fluid} />
            <h2>{cupcake.name}</h2>
            <p>
              {formatMoney(calculateCupcakePrice(cupcake.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${cupcake.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
