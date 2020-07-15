import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Portfolio, PortfolioHistory} from '@models/stock';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private baseUrl = 'api/portfolio';
  constructor(private http: HttpClient) { }

  getPortfolio(id: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.baseUrl}/${id}`);
  }

  getPortfolioHistory(id: number): Observable<PortfolioHistory> {
    return this.http.get<PortfolioHistory>(`${this.baseUrl}/history/${id}`);
  }

  deletePortfolio(id: number): Observable<Portfolio> {
    return this.http.delete<Portfolio>(`${this.baseUrl}/${id}`);
  }

  public buildDataForChart(actualValue, maxValue,  colors, titleColor, notation) {
    const datasets = [];
    const dataValues = [];
    const portfolioArray = [actualValue, Math.abs(maxValue)];

    portfolioArray.forEach(set =>  dataValues.push(set));

    if (dataValues && colors) {
      datasets.push({
        backgroundColor: colors, hoverBackgroundColor: colors,
        data: dataValues,
        notation
      });
    }
    return { titleColor, datasets };
  }

  public buildPortFolioChart(data) {
    console.log('data', data);
    const labels = [];
    const datasets = [];
    const dataValues = [];
    data.forEach(trade => {
      const label = this.formatDate(trade.tradeDate);
      labels.push(label);
    });

    data.forEach(value => {
      dataValues.push(value.portfolio);
    });

    datasets.push({
      label: 'portfolio',
      borderColor: '#0D8908',
      fill: false,
      data: dataValues
    });
    return { labels, datasets };
  }

  formatDate(fdate) {
    if (fdate) {
      const date = new Date(fdate);
      const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
      const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
      const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
      return `${day}-${month}-${year}`;
    }
  }
}
