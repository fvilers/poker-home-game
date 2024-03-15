import { useEffect, useState } from "react";
import Cell from "./Cell";
import Time from "./Time";
import { Tournament } from "./Tournament";

type Props = {
  tournament: Tournament;
};

function TournamentDetails({ tournament }: Props) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((current) => current + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (elapsedTime === tournament.levelDuration) {
      tournament.levelUp();
    }
  }, [elapsedTime, tournament]);

  return (
    <div className="grid grid-cols-5 grid-rows-4 gap-4 text-center">
      <Cell title="Players">
        {tournament.remainingPlayers}/{tournament.totalPlayers}
      </Cell>
      <Cell title="Level">{tournament.currentLevel.level}</Cell>
      <Cell title="Blind">
        {tournament.currentLevel.sb}/{tournament.currentLevel.bb}
      </Cell>
      <Cell title="Ante">{tournament.currentLevel.ante}</Cell>
      <Cell title="Elapsed time">
        <Time seconds={elapsedTime} />
      </Cell>

      <Cell title="Average stack">{tournament.averageStack}</Cell>
      <Cell className="col-span-3 row-span-2" title="Remaining time">
        {tournament.nextLevel !== undefined && (
          <div className="flex grow items-center justify-center text-4xl">
            <Time
              seconds={
                tournament.levelDuration * tournament.currentLevel.level -
                elapsedTime
              }
            />
          </div>
        )}
      </Cell>
      <Cell className="row-span-3" title="Payouts">
        <ol className="list-inside list-decimal">
          {tournament.payouts.map((payout) => (
            <li key={payout}>{payout} &euro;</li>
          ))}
        </ol>
      </Cell>

      <Cell title="Total chips">{tournament.totalChips}</Cell>

      <Cell title="Total pot">{tournament.totalPot} &euro;</Cell>
      <Cell title="Next level">{tournament.nextLevel?.level}</Cell>
      <Cell title="Next blind">
        {tournament.nextLevel &&
          `${tournament.nextLevel.sb}/${tournament.nextLevel.bb}`}
      </Cell>
      <Cell title="Next ante">{tournament.nextLevel?.ante}</Cell>
    </div>
  );
}

export default TournamentDetails;
