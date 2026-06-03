type Coin = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  gold: boolean;
};

function buildColumn(seed: number, count: number): Coin[] {
  const coins: Coin[] = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < count; i++) {
    coins.push({
      left: rand() * 100,
      size: 18 + Math.floor(rand() * 18),
      duration: 6 + rand() * 6,
      delay: rand() * 8,
      gold: rand() < 0.4,
    });
  }
  return coins;
}

const leftCoins = buildColumn(1337, 12);
const rightCoins = buildColumn(7331, 12);

function Column({ coins, side }: { coins: Coin[]; side: "left" | "right" }) {
  return (
    <div className="coin-rain" style={{ [side]: 0 } as React.CSSProperties}>
      {coins.map((c, i) => (
        <span
          key={i}
          className={`coin-rain__coin${c.gold ? " coin-rain__coin--gold" : ""}`}
          style={{
            left: `${c.left}%`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            animationDuration: `${c.duration}s`,
            animationDelay: `${-c.delay}s`,
          }}
          aria-hidden="true"
        >
          SC
        </span>
      ))}
    </div>
  );
}

export function CoinRain() {
  return (
    <>
      <Column coins={leftCoins} side="left" />
      <Column coins={rightCoins} side="right" />
    </>
  );
}
