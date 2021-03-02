import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

function CurrentlyBaking({ bakers }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Bakers On</span>
      </h2>
      <p>Standing by, ready to bake your day!</p>
      {!bakers && <LoadingGrid count={4} />}
      {bakers && !bakers?.length && (
        <p>No one is working right now!</p>
      )}
      {bakers?.length && <ItemGrid items={bakers} />}
    </div>
  );
}
function Popular({ popular }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Popular right now!</span>
      </h2>
      <p>Come on in and grab yours!</p>
      {!popular && <LoadingGrid count={4} />}{' '}
      {popular && !popular?.length && <p>Nothin' in the Case</p>}
      {popular?.length && <ItemGrid items={popular} isCupcake={true} />}
    </div>
  );
}

export default function HomePage() {
  const { bakers, popular } = useLatestData();

  return (
    <div className="center">
      <h1>The Best Cupcakes in Manchester!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlyBaking bakers={bakers} />
        <Popular popular={popular} />
      </HomePageGrid>
    </div>
  );
}
