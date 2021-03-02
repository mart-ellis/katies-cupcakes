import { Link } from 'gatsby';
import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

export default function ItemGrid({ items, isCupcake, isBaker }) {
  return (
    <ItemsGrid>
      {items.map((item) => {
        return (
          <ItemStyles key={item._id}>
            <Link to={isCupcake ? `/cupcake/${item.slug.current}` : `/baker/${item.slug.current}`}>
              <p>
                <span className="mark">{item.name}</span>
              </p>
            </Link>
            <img
              width="500"
              height="400"
              src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
              alt={item.name}
              style={{
                background: `url(${item.image.asset.metadata.lqip})`,
                backgroundSize: 'cover',
              }}
            />
          </ItemStyles>
        )
      }
      )}
    </ItemsGrid>
  );
}
