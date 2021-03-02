export default {
  // Computer Name
  name: 'toppings',
  // visible title
  title: 'Toppings',
  type: 'document',
  icon: () => '🍬',
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'What is the name of the topping?',
    },
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare: ({ name }) => ({
      title: `${name}`,
    }),
  },
};
