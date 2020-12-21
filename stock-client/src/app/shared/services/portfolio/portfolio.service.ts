import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {StockPortfolio} from '@models/stock';
import {HttpClient} from '@angular/common/http';
import {OptionPortfolio} from '@models/optionsChainData';
import { PortfolioData, PortfolioHistory} from '@models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private baseUrl = 'api/portfolio';
  constructor(private http: HttpClient) { }

  getTotalPortfolio(id: number): Observable<PortfolioData> {
    return this.http.get<PortfolioData>(`${this.baseUrl}/${id}`);
  }

  getStockPortfolio(id: number): Observable<StockPortfolio> {
    return this.http.get<StockPortfolio>(`${this.baseUrl}/stocks/${id}`);
  }

  getOptionPortfolio(id: number): Observable<OptionPortfolio> {
    return this.http.get<OptionPortfolio>(`${this.baseUrl}/options/${id}`);
  }

  getWeeklyData(id: number): Observable<PortfolioData[]> {
    return this.http.get<PortfolioData[]>(`${this.baseUrl}/weekly/${id}`);
  }

  getMonthlyData(id: number): Observable<PortfolioData[]> {
    return this.http.get<PortfolioData[]>(`${this.baseUrl}/monthly/${id}`);
  }

  getYearlyData(id: number): Observable<PortfolioData[]> {
    return this.http.get<PortfolioData[]>(`${this.baseUrl}/yearly/${id}`);
  }

  getAllData(id: number): Observable<PortfolioData[]> {
    return this.http.get<PortfolioData[]>(`${this.baseUrl}/all/${id}`);
  }

  getPortfolioHistory(id: number): Observable<PortfolioHistory[]> {
    return this.http.get<PortfolioHistory[]>(`${this.baseUrl}/history/${id}`);
  }

  deletePortfolio(id: number): Observable<PortfolioData> {
    return this.http.delete<PortfolioData>(`${this.baseUrl}/${id}`);
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

  public buildPortFolioChart(data, format) {
    const labels = [];
    const datasets = [];
    const labelDates = [];
    const dataValues = [];

    if (data.length > 0) {
      data.forEach(trade => {
        const label = trade.tradeDate;
        labelDates.push(label);
        labelDates.sort();
      });
    }

    labelDates.forEach(label => {
      const date = this.formatDate(label, format);
      labels.push(date);
    });

    if (data.length > 0) {
      data.forEach(value => {
        dataValues.push(value.portfolio);
      });
    }

    datasets.push({
      label: 'portfolio',
      borderColor: '#0D8908',
      fill: false,
      data: dataValues
    });
    return { labels, datasets };
  }

  formatDate(fdate, format) {
    let result;
    if (fdate) {
      const date = new Date(fdate);
      const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
      const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
      const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
      if (format === 0) {
        result = `${day}-${month}-${year}`;
      } else {
        result = `${day}-${month}`;
      }
      return result;
    }
  }

}
