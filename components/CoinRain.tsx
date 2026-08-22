// Fall / Halloween falling emoji. Weighted toward pumpkins.
const FALL_EMOJI = ["🎃", "🎃", "🎃", "🍂", "🍁", "👻", "🦇", "🍬"];

type Sprite = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  spin: number;
  emoji: string;
};

function buildColumn(seed: number, count: number): Sprite[] {
  const sprites: Sprite[] = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < count; i++) {
    sprites.push({
      left: rand() * 100,
      size: 18 + Math.floor(rand() * 16),
      duration: 6 + rand() * 6,
      delay: rand() * 8,
      spin: (rand() - 0.5) * 40,
      emoji: FALL_EMOJI[Math.floor(rand() * FALL_EMOJI.length)],
    });
  }
  return sprites;
}

const leftSprites = buildColumn(1337, 12);
const rightSprites = buildColumn(7331, 12);

function Column({ sprites, side }: { sprites: Sprite[]; side: "left" | "right" }) {
  return (
    <div className="coin-rain" style={{ [side]: 0 } as React.CSSProperties}>
      {sprites.map((c, i) => (
        <span
          key={i}
          className="coin-rain__coin"
          style={{
            left: `${c.left}%`,
            fontSize: `${c.size}px`,
            animationDuration: `${c.duration}s`,
            animationDelay: `${-c.delay}s`,
            ["--spin" as string]: `${c.spin}deg`,
          }}
          aria-hidden="true"
        >
          {c.emoji}
        </span>
      ))}
    </div>
  );
}

export function CoinRain() {
  return (
    <>
      <Column sprites={leftSprites} side="left" />
      <Column sprites={rightSprites} side="right" />
    </>
  );
}
