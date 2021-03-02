import { MdStore as icon } from 'react-icons/md';

export default {
  // Computer Name
  name: 'storeSettings',
  // visible title
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'Name of the store',
    },
    {
      name: 'bakers',
      title: 'Bakers currently baking',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'popular',
      title: 'Our most popular cupcakes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'cupcake' }] }],
    },
  ],
};
