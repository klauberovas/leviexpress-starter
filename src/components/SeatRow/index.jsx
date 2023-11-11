import { Seat } from '../Seat';

export const SeatRow = ({ row }) => {
  return (
    <div className="seat-row">
      {row.map((row) => (
        <Seat
          key={row.number}
          number={row.number}
          isOccupied={row.isOccupied}
        />
      ))}
    </div>
  );
};
