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
  // User-provided link
  {
    title: "Portfolio Clip — 01",
    description: "User-submitted YouTube video.",
    platform: "youtube",
    idOrUrl: "https://youtu.be/b9iLfVFklO0",
    tags: ["video"],
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


