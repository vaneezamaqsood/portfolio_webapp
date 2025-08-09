import type { WorkItem } from "@/components/Sections";

export const CATEGORIES = {
  FIGMA: "Figma Prototyping",
  WEB: "Web Development",
  SOCIAL: "Social Media Content",
  THINKING: "Design Thinking & Prototyping",
  EVENTS: "Event Curation",
} as const;

export const workItems: WorkItem[] = [
  {
    title: "SDG Hackathon – Carbon Footprint Calculator",
    subtitle: "Prototype and interactive flows",
    category: CATEGORIES.FIGMA,
    href: "https://www.figma.com/proto/3AHkGc44J54CBMF6BbkezQ/Carbon-Footprint-Calculator-App-UI-UX-Design--Community-?node-id=5-1195&starting-point-node-id=13%3A3974",
    external: true,
    figmaUrls: [
      "https://www.figma.com/proto/3AHkGc44J54CBMF6BbkezQ/Carbon-Footprint-Calculator-App-UI-UX-Design--Community-?node-id=5-1195&starting-point-node-id=13%3A3974",
      "https://www.figma.com/design/3AHkGc44J54CBMF6BbkezQ/Carbon-Footprint-Calculator-App-UI-UX-Design--Community-?node-id=0-1",
    ],
  },
  {
    title: "SDG Hackathon – Figma file",
    category: CATEGORIES.FIGMA,
    href: "https://www.figma.com/design/3AHkGc44J54CBMF6BbkezQ/Carbon-Footprint-Calculator-App-UI-UX-Design--Community-?node-id=0-1",
    external: true,
    figmaUrls: [
      "https://www.figma.com/design/3AHkGc44J54CBMF6BbkezQ/Carbon-Footprint-Calculator-App-UI-UX-Design--Community-?node-id=0-1",
    ],
  },
  {
    title: "ITP Website Challenge",
    category: CATEGORIES.FIGMA,
    href: "https://www.figma.com/design/0ogU5ZmDDIEwWcnTXAhoL0/Build-it-Challenge---Aaltoes?node-id=182-62",
    external: true,
    figmaUrls: [
      "https://www.figma.com/design/0ogU5ZmDDIEwWcnTXAhoL0/Build-it-Challenge---Aaltoes?node-id=182-62",
    ],
  },
  {
    title: "ITP Redesign – Visual exploration",
    category: CATEGORIES.FIGMA,
    href: "https://www.figma.com/design/FBe4HSXENEMddB2P5kOTnD/ITP-redesign--V",
    external: true,
    figmaUrls: [
      "https://www.figma.com/design/FBe4HSXENEMddB2P5kOTnD/ITP-redesign--V",
    ],
  },
  {
    title: "Design of WWW Services – App demo",
    subtitle: "Meal Planner app login",
    category: CATEGORIES.WEB,
    href: "https://meal-planner.fly.dev/login",
    external: true,
  },
  {
    title: "Design of WWW Services – Figma",
    category: CATEGORIES.FIGMA,
    href: "https://www.figma.com/design/hrHCw7t5zQc3biZdVmyTC6/Meal-planner-prototype?node-id=0-1",
    external: true,
    figmaUrls: [
      "https://www.figma.com/design/hrHCw7t5zQc3biZdVmyTC6/Meal-planner-prototype?node-id=0-1",
    ],
  },
  {
    title: "Boundd.fr",
    subtitle: "WordPress frontend",
    category: CATEGORIES.WEB,
    href: "https://boundd.fr",
    external: true,
  },
  {
    title: "Writeomatic.app",
    category: CATEGORIES.WEB,
    href: "https://Writeomatic.app",
    external: true,
  },
  {
    title: "Aaltoes Posts",
    category: CATEGORIES.SOCIAL,
  },
  {
    title: "Sheenjeem.com – Star maps landing",
    category: CATEGORIES.WEB,
    href: "http://Sheenjeem.com",
    external: true,
  },
  {
    title: "Sheenjeem.com – WooCommerce store",
    category: CATEGORIES.WEB,
    href: "http://Sheenjeem.com",
    external: true,
  },
  {
    title: "Shamojee.pk – Shopify furniture",
    category: CATEGORIES.WEB,
    href: "http://Shamojee.pk",
    external: true,
  },
  {
    title: "Miro boards – Aaltoes",
    category: CATEGORIES.THINKING,
  },
  {
    title: "ITP Acre & Aalto ITS – User characteristics",
    subtitle: "Research and report",
    category: CATEGORIES.THINKING,
  },
  {
    title: "Video content",
    category: CATEGORIES.SOCIAL,
  },
  {
    title: "TTG Consults",
    category: CATEGORIES.WEB,
    href: "https://ttgconsults.com",
    external: true,
  },
];

export function itemsByCategory(category: string): WorkItem[] {
  return workItems.filter((w) => w.category === category);
}


