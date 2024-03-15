import TournamentForm, { SubmitHandler } from "./TournamentForm";
import PageHeading from "./ui/PageHeading";

function App() {
  const handleStart: SubmitHandler = (values) => {
    // TODO: start tournament
    console.log({ values });
  };

  return (
    <div className="space-y-8 bg-white p-8">
      <PageHeading>Poker Home Game</PageHeading>
      <TournamentForm onSubmit={handleStart} />
    </div>
  );
}

export default App;
