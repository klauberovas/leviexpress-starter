import { useState } from 'react';
import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail';
import { SelectedSeat } from '../../components/SelectedSeat';

export const HomePage = () => {
  const [journey, setJourney] = useState(null);

  const handleJourneyChange = (journey) => {
    setJourney(journey);
  };
  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey === null ? null : (
        <>
          <JourneyDetail journey={journey.stops} />
          <SelectedSeat number={journey.autoSeat} />
        </>
      )}
    </main>
  );
};
