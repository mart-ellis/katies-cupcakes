import { useState, useEffect } from 'react';

const gql = String.raw;

const deets = `
    name
    _id
    slug {
      current
    }
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

export default function useLatestData() {
  // hot slices
  const [popular, setPopular] = useState();
  // bakers
  const [bakers, setBakers] = useState();
  // Use a side effect to fetcht he data from the graphql endpoint
  useEffect(function () {
    // when the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              bakers {
                ${deets}
              }
              popular {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: checl for errors
        // set the data to state
        console.log(res);
        setPopular(res.data.StoreSettings.popular);
        setBakers(res.data.StoreSettings.bakers);
      })
      .catch((err) => {
        console.log('SHOOOOOT');
        console.log(err);
      });
  }, []);
  return {
    popular,
    bakers,
  };
}
