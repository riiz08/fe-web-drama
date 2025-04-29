// types.d.ts atau global.d.ts

interface ScreenOrientation {
  lock(orientation: "portrait" | "landscape"): Promise<void>;
  unlock(): void;
}

declare global {
  interface Screen {
    orientation: ScreenOrientation;
  }
}
