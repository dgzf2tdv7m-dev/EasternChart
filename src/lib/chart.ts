export type ChartInput = {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  gender: string;
};

export type Pillar = {
  stem: string;
  branch: string;
  element: string;
};

export type ChartResult = {
  pillars: Pillar[];
  elements: Record<string, number>;
  dayMaster: string;
  strongestElement: string;
  quietestElement: string;
};

const stems = [
  ["jia", "wood"],
  ["yi", "wood"],
  ["bing", "fire"],
  ["ding", "fire"],
  ["wu", "earth"],
  ["ji", "earth"],
  ["geng", "metal"],
  ["xin", "metal"],
  ["ren", "water"],
  ["gui", "water"],
] as const;

const branches = [
  ["zi", "water"],
  ["chou", "earth"],
  ["yin", "wood"],
  ["mao", "wood"],
  ["chen", "earth"],
  ["si", "fire"],
  ["wu", "fire"],
  ["wei", "earth"],
  ["shen", "metal"],
  ["you", "metal"],
  ["xu", "earth"],
  ["hai", "water"],
] as const;

const elements = ["wood", "fire", "earth", "metal", "water"];

function positiveMod(value: number, size: number) {
  return ((value % size) + size) % size;
}

function dayIndex(date: Date) {
  const utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor(utc / 86400000);
}

function makePillar(seed: number): Pillar {
  const stem = stems[positiveMod(seed, stems.length)];
  const branch = branches[positiveMod(seed, branches.length)];
  return {
    stem: stem[0],
    branch: branch[0],
    element: stem[1],
  };
}

export function calculateChart(input: ChartInput): ChartResult {
  const date = new Date(`${input.birthDate}T${input.birthTime || "12:00"}:00`);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = dayIndex(date);
  const hour = date.getHours();
  const placeWeight = Array.from(input.birthPlace).reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const pillars = [
    makePillar(year - 1984),
    makePillar((year - 1984) * 12 + month + placeWeight),
    makePillar(day + placeWeight),
    makePillar(day * 12 + Math.floor(hour / 2)),
  ];

  const elementCounts = Object.fromEntries(elements.map((element) => [element, 0])) as Record<string, number>;

  for (const pillar of pillars) {
    elementCounts[pillar.element] += 1;
    const branchElement = branches.find(([branch]) => branch === pillar.branch)?.[1] ?? "earth";
    elementCounts[branchElement] += 0.5;
  }

  const total = Object.values(elementCounts).reduce((sum, value) => sum + value, 0);
  const ratios = Object.fromEntries(
    Object.entries(elementCounts).map(([element, value]) => [element, Math.round((value / total) * 100)]),
  ) as Record<string, number>;

  const dayMaster = pillars[2].stem;
  const strongestElement = Object.entries(ratios).sort((a, b) => b[1] - a[1])[0][0];
  const quietestElement = Object.entries(ratios).sort((a, b) => a[1] - b[1])[0][0];

  return {
    pillars,
    elements: ratios,
    dayMaster,
    strongestElement,
    quietestElement,
  };
}
