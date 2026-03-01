export interface Company {
  id: string;
  name: string;
  numberOfShareholders: number;
  totalCapital: number;
}

export interface Shareholder {
  firstName: string;
  lastName: string;
  nationality: string;
}