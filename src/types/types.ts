export type Person = {
  id: number;
  birthDate: string;
  name: string;
  parents?: Person[] | undefined;
};
