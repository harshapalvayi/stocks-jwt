import { Injectable } from '@angular/core';
import {Chart} from '@models/chart';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public buildPriceVsBuyChart(data): Chart {
    const labels = [];
    const price = [];
    const buy = [];
    const datasets = [];
    if (data) {
      data.sort((a, b) => a.price - b.price);
      data.forEach(s => {
        labels.push(s.ticker);
        price.push(s.price);
      });
      datasets.push({
        label: 'Stock Price',
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        data: price
      });

      data.sort((a, b) => a.buy - b.buy);
      data.forEach(s => {
        buy.push(s.buy);
      });
      datasets.push({
        label: 'Stock Buy',
        backgroundColor: '#FF7F50',
        borderColor: '#FF7F50',
        data: buy
      });
    }
    if (datasets && datasets.length > 0 && buy.length > 0 ) {
      return {labels, datasets};
    } else {
      return null;
    }
  }

  public buildCostVsEquityChart(data): Chart {
    const labels = [];
    const cost = [];
    const equity = [];
    const datasets = [];
    if (data) {
      data.sort((a, b) => a.cost - b.cost);
      data.forEach(s => {
        labels.push(s.ticker);
        cost.push(s.cost);
      });
      datasets.push({
        label: 'Stock Cost',
        backgroundColor: '#FF7F50',
        borderColor: '#FF7F50',
        data: cost
      });
      data.sort((a, b) => a.equity - b.equity);
      data.forEach(s => {
        equity.push(s.equity);
      });
      datasets.push({
        label: 'Stock Equity',
        backgroundColor: '#DAA520',
        borderColor: '#DAA520',
        data: equity
      });
    }
    if (datasets && datasets.length > 0 && equity.length > 0) {
      return {labels, datasets};
    } else {
      return null;
    }
  }

  public buildDividendChart(data): Chart {
    const labels = [];
    const dividend = [];
    const datasets = [];
    if (data) {
      data.sort((a, b) => a.dividend - b.dividend);
      data.forEach(s => {
        labels.push(s.ticker);
        if (s.dividend != null) {
          dividend.push(s.dividend);
        } else {
          dividend.push(0);
        }
      });
      datasets.push({
        label: 'Stock Dividend',
        backgroundColor: '#32CD32',
        borderColor: '#32CD32',
        data: dividend
      });
    }
    if (datasets && datasets.length > 0 && dividend.length > 0 ) {
      return {labels, datasets};
    } else {
      return null;
    }
  }

  public buildStockHistory(history, stock): Chart {
    const labels = [];
    const open = [];
    const datasets = [];
    let symbol: string;
    if (history && history.length > 0) {
      history.forEach(s => {
        symbol = s.symbol;
        labels.push(moment(s.date).format('MM-DD-YYYY'));
        open.push(s.open);
      });
      const colorCode = this.extractColorCode(history, stock);
      datasets.push({
        label: symbol,
        backgroundColor: colorCode,
        borderColor: colorCode,
        fill: false,
        data: open
      });
    }
    if (datasets && datasets.length > 0 && open.length > 0) {
      return {labels, datasets};
    } else {
      return null;
    }
  }

  private extractColorCode(history, stock) {
    const lastOpen = history.slice(-1).pop().open;
    const colorCode = lastOpen && lastOpen > stock.buy ? '#21CE99' : '#FF0000';
    return colorCode;
  }

  public buildEquityPortfolio(data): Chart {
    const labels = [];
    const equity = [];
    const datasets = [];
    if (data && data.length > 0) {
      data.forEach(s => {
        labels.push(s.ticker);
        equity.push(s.equity);
      });
      datasets.push({
        label: 'Stock Equity',
        backgroundColor: '#36A2EB',
        borderColor: '#FFFFFF',
        data: equity
      });
    }
    if (datasets && datasets.length > 0 && equity.length > 0) {
      return {labels, datasets};
    } else {
      return null;
    }
  }
}
