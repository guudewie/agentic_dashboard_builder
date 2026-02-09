import { AllInputTypesType } from "@/lib/registry/componentRegistry";

export type Block<T = AllInputTypesType> = {
  id: string;
  componentId: string;
  data: T;
  query: string;
  explanation: string;
  title: string;
  subtitle?: string;
  position?: {
    row: number;
    col: number;
    width: number;
    height: number;
  };
};
