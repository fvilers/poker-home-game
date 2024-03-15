import { FormEventHandler, useState } from "react";
import FormProps from "./forms/FormProps";
import InputGroup from "./forms/InputGroup";
import Button from "./ui/Button";

type Props = FormProps<{
  players: number;
  buyIn: number;
  levelDuration: number;
  stack: number;
}>;
export type SubmitHandler = Props["onSubmit"];

function TournamentForm({ disabled, onSubmit }: Props) {
  const [players, setPlayers] = useState(9);
  const [buyIn, setBuyIn] = useState(20);
  const [levelDuration, setLevelDuration] = useState(30);
  const [stack, setStack] = useState(25000);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit({ players, buyIn, levelDuration, stack });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <InputGroup
        disabled={disabled}
        id="players"
        label="Players"
        max={9}
        min={2}
        onChange={(e) => setPlayers(e.currentTarget.valueAsNumber)}
        required
        type="number"
        value={players}
      />

      <InputGroup
        disabled={disabled}
        id="buyIn"
        label="Buy-in"
        min={0}
        onChange={(e) => setBuyIn(e.currentTarget.valueAsNumber)}
        required
        type="number"
        value={buyIn}
      />

      <InputGroup
        disabled={disabled}
        id="levelDuration"
        label="Level duration (in minutes)"
        max={60}
        min={0}
        onChange={(e) => setLevelDuration(e.currentTarget.valueAsNumber)}
        required
        type="number"
        value={levelDuration}
      />

      <InputGroup
        disabled={disabled}
        id="stack"
        label="Stack"
        min={5000}
        onChange={(e) => setStack(e.currentTarget.valueAsNumber)}
        required
        type="number"
        value={stack}
      />

      <Button disabled={disabled} type="submit">
        Start
      </Button>
    </form>
  );
}

export default TournamentForm;
