import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countCupcakesInToppings(cupcakes) {
  // Return the cupcakes with counts
  const counts = cupcakes
    .map((cupcake) => cupcake.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        //  if it is, increment by 1
        existingTopping.count += 1;
      } else {
        // otherwise create a new entry in our acc and set it to one
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // sort them based on their count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // Get a list of all the toppings
  // Get a list of all the Cupcakes with their toppings
  const { toppings, cupcakes } = useStaticQuery(graphql`
    query {
      toppings: allSanityToppings {
        nodes {
          name
          id
        }
      }
      cupcakes: allSanityCupcake {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // Count how many cupcakes are in each topping
  const toppingsWithCounts = countCupcakesInToppings(cupcakes.nodes);
  // Loop over the list of toppings and display the topping and the count of cupcakes in that topping
  // Link it up.. ...  . . .
  return (
    <ToppingsStyles>
      <Link to="/cupcakes">
        <span className="name">All</span>
        <span className="count">{cupcakes.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          to={`/topping/${topping.name}`}
          key={topping.id}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
