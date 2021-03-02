import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

async function turnCupcakesIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const cupcakeTemplate = path.resolve('./src/templates/Cupcake.js');
  // 2. Query all cupcakes
  const { data } = await graphql(`
    query {
      cupcakes: allSanityCupcake {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each cupcake and create a page for that cupcake
  data.cupcakes.nodes.forEach((cupcake) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `cupcake/${cupcake.slug.current}`,
      component: cupcakeTemplate,
      context: {
        slug: cupcake.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get the template
  const toppingTemplate = path.resolve('./src/pages/cupcakes.js');
  // 2. query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityToppings {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. createPage for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO Regex for Topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Pass topping data to cupcake.js
}

async function turnBakersIntoPages({ graphql, actions }) {
  // 1. Query all bakers
  const { data } = await graphql(`
    query {
      bakers: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // TODO: 2. Turn each baker into their own page (TODO)
  data.bakers.nodes.forEach((baker) => {
    actions.createPage({
      component: resolve('./src/templates/Baker.js'),
      path: `/baker/${baker.slug.current}`,
      context: {
        name: baker.person,
        slug: baker.slug.current,
      },
    });
  });

  // 3. Figure out how many pages there are based on how many bakers there are, and how many per page!
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.bakers.totalCount / pageSize);
  console.log(`Page size: ${pageSize}`);
  console.log(`Page count: ${pageCount}`);
  console.log(
    `There are ${data.bakers.totalCount} total people. And we have ${pageCount} pages with ${pageSize} per page`
  );
  // 4. Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/bakers/${i + 1}`,
      component: path.resolve('./src/pages/bakers.js'),
      // This data is pass to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnCupcakesIntoPages(params),
    turnToppingsIntoPages(params),
    turnBakersIntoPages(params),
  ]);
  // 1. Cupcakes
  // 2. Toppings
  // 3. Bakers
}
