type Props = {
  seconds: number;
};

function Time({ seconds }: Props) {
  const secs = seconds % 60;
  const mins = Math.floor(seconds / 60) % 60;
  const hours = Math.floor(Math.floor(seconds / 60) / 60);

  return (
    <time>
      {format(hours)}:{format(mins)}:{format(secs)}
    </time>
  );
}

function format(n: number): string {
  return n.toFixed(0).padStart(2, "0");
}

export default Time;
