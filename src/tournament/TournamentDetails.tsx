import { useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import Cell from "./Cell";
import Time from "./Time";
import { Tournament } from "./Tournament";

type Props = {
  tournament: Tournament;
};

function TournamentDetails({ tournament }: Props) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const remainingTime = tournament.nextLevel
    ? tournament.levelDuration * tournament.currentLevel.level - elapsedTime
    : Infinity;
  const flash = useMemo(
    () => remainingTime < 21 && remainingTime % 2 == 0,
    [remainingTime],
  );
  const pop = useRef(new Audio("/jingle.mp3"));

  useEffect(() => {
    // TODO: implement au interval that can be paused
    const interval = setInterval(() => {
      if (!paused) {
        setElapsedTime((current) => current + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    if (remainingTime === 0) {
      tournament.levelUp();
      pop.current.play();
    }
  }, [remainingTime, tournament]);

  return (
    <div className="space-y-6" aria-live="polite">
      <div className="grid grid-cols-5 grid-rows-4 gap-4 text-center">
        <Cell title="Players">
          {tournament.remainingPlayers}/{tournament.entries}
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
        <Cell
          className={twMerge(
            "col-span-3 row-span-2",
            flash && "ring-4 ring-red-500",
          )}
          title="Remaining time"
        >
          <div
            className={twMerge(
              "flex grow items-center justify-center text-4xl font-bold",
              flash && "text-red-500",
            )}
          >
            {paused
              ? "Paused"
              : tournament.nextLevel !== undefined && (
                  <Time seconds={remainingTime} />
                )}
          </div>
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

      <div className="space-x-4">
        {paused ? (
          <Button onClick={() => setPaused(false)}>Resume</Button>
        ) : (
          <Button onClick={() => setPaused(true)}>Pause</Button>
        )}
        <Button
          disabled={tournament.remainingPlayers === 1}
          onClick={() => tournament.bustPlayer()}
        >
          Bust
        </Button>
        <Button
          disabled={!tournament.rebuyAllowed}
          onClick={() => tournament.rebuy()}
        >
          Rebuy
        </Button>
      </div>
    </div>
  );
}

export default TournamentDetails;
