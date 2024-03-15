type Level = {
  sb: number;
  bb: number;
  ante?: number;
};

const levels: Level[] = [
  { sb: 25, bb: 50 },
  { sb: 50, bb: 100 },
  { sb: 100, bb: 200 },
  { sb: 250, bb: 500 },
  { sb: 500, bb: 1000 },
  { sb: 1000, bb: 2000 },
  { sb: 1000, bb: 2000, ante: 100 },
  { sb: 1500, bb: 3000, ante: 150 },
  { sb: 2500, bb: 5000, ante: 250 },
  { sb: 5000, bb: 10000, ante: 500 },
  { sb: 10000, bb: 20000, ante: 1000 },
  { sb: 20000, bb: 40000, ante: 2000 },
];
type NumberedLevel = Level & { level: number };

const payouts: number[] = [0.5, 0.3, 0.2];

export class Tournament {
  get remainingPlayers(): number {
    return this._remainingPlayers;
  }
  private _remainingPlayers: number;

  get currentLevel(): NumberedLevel {
    return { ...levels[this._currentLevel], level: this._currentLevel + 1 };
  }
  private _currentLevel = 0;

  get nextLevel(): NumberedLevel | undefined {
    const index = this._currentLevel + 1;
    const nextLevel = levels[index];

    if (nextLevel === undefined) {
      return undefined;
    }

    return { ...levels[index], level: index + 1 };
  }

  get averageStack(): number {
    return this.totalChips / this.remainingPlayers;
  }

  get totalChips(): number {
    return this.totalPlayers * this.stack;
  }

  get totalPot(): number {
    return this.totalPlayers * this.buyIn;
  }

  get payouts(): number[] {
    return payouts.map((payout) => this.totalPot * payout);
  }

  constructor(
    public readonly totalPlayers: number,
    public readonly buyIn: number,
    public readonly levelDuration: number,
    private readonly stack: number,
  ) {
    this._remainingPlayers = totalPlayers;
  }

  levelUp() {
    this._currentLevel = Math.min(this._currentLevel + 1, levels.length - 1);
  }
}
