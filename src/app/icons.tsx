const paths = {
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M8 10h8",
  list: "M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1",
  box: "M3 7l9-5 9 5v10l-9 5-9-5z M3 7l9 5 9-5M12 12v10",
  plane: "M22 2L9 15M22 2l-7 20-6-7-7-6z",
  shield: "M12 3l9 4v6c0 5-9 9-9 9s-9-4-9-9V7z M8 12l3 3 5-6",
  wallet: "M3 5h16v4H3z M3 9v11h18V9H3z M16 13h5v4h-5z",
  check: "M5 12l4 4L19 6",
  globe: "M2 12h20M12 2c5 5 5 15 0 20-5-5-5-15 0-20 M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20",
  user: "M16 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0 M4 21v-2a8 8 0 0 1 16 0v2",
  close: "M6 6l12 12M6 18L18 6",
  arrow: "M5 12h14M12 5l7 7-7 7",
  back: "M19 12H5M12 5l-7 7 7 7",
  menu: "M3 6h18M3 12h18M3 18h18",
  pause: "M8 4v16M16 4v16",
  play: "M7 3l14 9-14 9z",
};
export function Icon({ name }: { name: keyof typeof paths }) {
  return <svg className="lineIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>;
}
