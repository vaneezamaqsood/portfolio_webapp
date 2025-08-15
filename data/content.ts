export type MediaItem = {
  title: string;
  description?: string;
  thumbnail?: string; // path in /public
  platform: "youtube" | "vimeo" | "file";
  idOrUrl: string; // video id or file/url
  tags?: string[];
  date?: string; // ISO
};

export const mediaItems: MediaItem[] = [
  // Example entries — replace with your content
  {
    title: "Portfolio Reel",
    description: "A quick cut of recent design/dev work.",
    platform: "youtube",
    idOrUrl: "dQw4w9WgXcQ",
    tags: ["reel", "portfolio"],
  },
  {
    title: "Prototype Walkthrough",
    description: "Interaction and micro-animations demo.",
    platform: "vimeo",
    idOrUrl: "76979871",
  },
  {
    title: "Motion Study",
    description: "Locally hosted MP4 in public/",
    platform: "file",
    idOrUrl: "/sample-video.mp4",
  },
];


