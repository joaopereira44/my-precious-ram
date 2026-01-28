export interface Meme {
  id: string;
  title: string;
  description: string;
  emoji: string;
  tags: string[];
}

export const memeData: Meme[] = [
  {
    id: "1",
    title: "When you finally afford 64GB",
    description: "Sold my car, my house, and my dignity. Worth it.",
    emoji: "🏠➡️💾",
    tags: ["sacrifice", "worthit", "broke"],
  },
  {
    id: "2",
    title: "AI Companies at RAM Factory",
    description: "We'll take your entire stock. And the factory. And your employees.",
    emoji: "🤖🏭",
    tags: ["ai", "monopoly", "stonks"],
  },
  {
    id: "3",
    title: "My PC vs Chrome",
    description: "8GB RAM? That's cute. I need 32GB just to exist.",
    emoji: "🦊💀",
    tags: ["chrome", "tabs", "pain"],
  },
  {
    id: "4",
    title: "DDR6 Announcement",
    description: "Great news! It's 3x faster AND 10x more expensive!",
    emoji: "🎉💸",
    tags: ["ddr6", "upgrade", "rip"],
  },
  {
    id: "5",
    title: "Gamer in 2025",
    description: "Mom, can I have money for games? No? RAM? ALSO NO??",
    emoji: "🎮😭",
    tags: ["gaming", "sad", "budget"],
  },
  {
    id: "6",
    title: "Server Rooms be Like",
    description: "We have more RAM than the GDP of small countries.",
    emoji: "🖥️💰",
    tags: ["datacenter", "enterprise", "flex"],
  },
];
