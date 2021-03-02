import React from 'react';
import { graphql } from 'gatsby';
import CupcakeList from '../components/CupcakeList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';

export default function CupcakesPage({ data, pageContext }) {
  const cupcakes = data.cupcakes.nodes;
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Cupcakes With ${pageContext.topping}`
            : `All Cupcakes`
        }
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <CupcakeList cupcakes={cupcakes} />
    </>
  );
}

export const query = graphql`
  query CupcakeQuery($toppingRegex: String) {
    cupcakes: allSanityCupcake(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 600, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400, maxHeight: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
