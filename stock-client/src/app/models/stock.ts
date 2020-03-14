export interface Stock {
  id?: number;
  user_id?: number;
  symbol?: string;
  name?: string;
  price?: number;
  avg_price?: number;
  dividend?: number;
  equity?: number;
  cost?: number;
  shares?: number;
}

export class StockDetails {
  public ticker: string;
  public stock: string;
  public price: number;
  public dividend: number;
  public high: number;
  public low: number;
  public exDate?: Date;
  public payDate?: Date;
}
