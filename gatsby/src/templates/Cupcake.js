import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const CupcakeGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 200px 1fr;
`

export default function SingleCupcakePage({ data: { cupcake } }) {
  return (
    <>
      <SEO title={cupcake.name} image={cupcake.image?.asset?.fluid?.src} />
      <CupcakeGrid>
        <Img fluid={cupcake.image.asset.fluid} />
        <div>
          <h2 className="mark">{cupcake.name}</h2>
          <ul>
            {cupcake.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
          <h3>Head to the oder ahead section to grab yours!</h3>
        </div>
      </CupcakeGrid>
    </>
  );
}

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    cupcake: sanityCupcake(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
      }
    }
  }
`;
