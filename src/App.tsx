import { useState } from "react";
import { Tournament } from "./tournament/Tournament";
import TournamentDetails from "./tournament/TournamentDetails";
import TournamentForm, { SubmitHandler } from "./tournament/TournamentForm";
import PageHeading from "./ui/PageHeading";

function App() {
  const [tournament, setTournament] = useState<Tournament>();
  const handleStart: SubmitHandler = ({
    players,
    buyIn,
    levelDuration,
    stack,
  }) => {
    setTournament(new Tournament(players, buyIn, levelDuration * 60, stack));
  };

  return (
    <div className="space-y-8 bg-white p-8">
      <PageHeading>Poker Home Game</PageHeading>
      {tournament ? (
        <TournamentDetails tournament={tournament} />
      ) : (
        <div className="max-w-xl">
          <TournamentForm onSubmit={handleStart} />
        </div>
      )}
    </div>
  );
}

export default App;
