import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail';
import { SelectedSeat } from '../../components/SelectedSeat';

export const HomePage = () => {
  const [journey, setJourney] = useState(null);
  const navigate = useNavigate();

  const handleJourneyChange = (journey) => {
    setJourney(journey);
  };

  const handleBuy = async () => {
    const response = await fetch(
      'https://apps.kodim.cz/daweb/leviexpress/api/reservation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          seat: journey.autoSeat,
          journeyId: journey.journeyId,
        }),
      },
    );
    const data = await response.json();
    const reservationId = data.results.reservationId;
    navigate(`/reservation/${reservationId}`);
  };

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey === null ? null : (
        <>
          <JourneyDetail journey={journey.stops} />
          <SelectedSeat number={journey.autoSeat} />
          <div className="controls container">
            <button onClick={handleBuy} className="btn btn--big" type="button">
              Rezervovat
            </button>
          </div>
        </>
      )}
    </main>
  );
};
