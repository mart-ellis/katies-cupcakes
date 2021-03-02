import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculateCupcakePrice from '../utils/calculateCupcakePrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import useCupcake from '../utils/useCupcake';
import CupcakeOrder from '../components/CupcakeOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrderPage({ data }) {
  const cupcakes = data.cupcakes.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = useCupcake({
    cupcakes,
    values,
  });

  if (message) {
    return <p>{message}</p>;
  }
  return (
    <>
      <SEO title="Order a Cupcake!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
          <input
            type="mapleSyrup"
            name="mapleSyrup"
            id="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
            className="mapleSyrup"
          />
        </fieldset>
        <fieldset disabled={loading} className="menu">
          <legend>Menu</legend>
          {cupcakes.map((cupcake) => (
            <MenuItemStyles key={cupcake.id}>
              <Img
                width="50"
                height="50"
                fluid={cupcake.image.asset.fluid}
                alt={cupcake.name}
              />
              <div>
                <h2>{cupcake.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() =>
                      addToOrder({
                        id: cupcake.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculateCupcakePrice(cupcake.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset disabled={loading} className="order">
          <legend>Order</legend>
          <CupcakeOrder
            order={order}
            removeFromOrder={removeFromOrder}
            cupcakes={cupcakes}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, cupcakes))}
          </h3>
          <div aria-live="polite" aria-atomic="true">{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            <span aria-live="assertive" aria-atomic="true">
              {loading ? 'Placing Order...' : ''}
            </span>
            {loading ? '' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    cupcakes: allSanityCupcake {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100, maxHeight: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
