export interface GameComponentProps {
  data: {
    [key: string]: string;
  };
}

export type entryTypes = "country" | "capital" | undefined;

export type btnBgTypes = "red" | "blue" | "";
