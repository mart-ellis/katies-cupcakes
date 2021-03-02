import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const CupcakeGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const CupcakeStyles = styled.div`
  display: grid;
  /* Take your row sizing not from the cupcakeStyles div, but from the  CupcakeGridStyles grid */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function SingleCupcake({ cupcake }) {
  return (
    <CupcakeStyles>
      <Link to={`/cupcake/${cupcake.slug.current}`}>
        <h2>
          <span className="mark">{cupcake.name}</span>
        </h2>
      </Link>
      <p>{cupcake.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={cupcake.image.asset.fluid} alt={cupcake.name} />
    </CupcakeStyles>
  );
}

export default function CupcakeList({ cupcakes }) {
  return (
    <CupcakeGridStyles>
      {cupcakes.map((cupcake) => (
        <SingleCupcake key={cupcake.id} cupcake={cupcake} />
      ))}
    </CupcakeGridStyles>
  );
}
