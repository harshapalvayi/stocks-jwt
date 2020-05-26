import { Injectable } from '@angular/core';
import {Chart} from '@models/chart';
import * as moment from 'moment';
import {UtilService} from '@shared/services/util/util.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private static extractColorCode(history, stock) {
    const lastOpen = history.slice(-1).pop().open;
    return lastOpen && lastOpen > stock.buy ? '#21CE99' : '#FF0000';
  }

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
      const priceColor = UtilService.getRandomColor();
      datasets.push({
        label: 'Stock Price',
        backgroundColor: priceColor,
        borderColor: priceColor,
        data: price
      });

      data.sort((a, b) => a.buy - b.buy);
      data.forEach(s => {
        buy.push(s.buy);
      });
      const buyColor = UtilService.getRandomColor();
      datasets.push({
        label: 'Stock Buy',
        backgroundColor: buyColor,
        borderColor: buyColor,
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
      const costColor = UtilService.getRandomColor();
      datasets.push({
        label: 'Stock Cost',
        backgroundColor: costColor,
        borderColor: costColor,
        data: cost
      });
      data.sort((a, b) => a.equity - b.equity);
      data.forEach(s => {
        equity.push(s.equity);
      });
      const equityColor = UtilService.getRandomColor();
      datasets.push({
        label: 'Stock Equity',
        backgroundColor: equityColor,
        borderColor: equityColor,
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
      const dividendColor = UtilService.getRandomColor();
      datasets.push({
        label: 'Stock Dividend',
        backgroundColor: dividendColor,
        borderColor: dividendColor,
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
      const colorCode = ChartService.extractColorCode(history, stock);
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

  public buildEquityPortfolio(data): Chart {
    const labels = [];
    const equity = [];
    const datasets = [];
    const portfolioColor = [];
    if (data && data.length > 0) {
      data.forEach(s => {
        const color = UtilService.getRandomColor();
        labels.push(s.ticker);
        equity.push(s.equity);
        portfolioColor.push(color);
      });
      datasets.push({
        label: 'Stock Equity',
        backgroundColor: portfolioColor,
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

  public generateChartProperties(chart, chartData, widthDin, heightDin) {
    const context = chart.chart.ctx;
    const xCenter = (chart.chart.width / widthDin);
    const yCenter = chart.chart.height / heightDin;
    const progressLabel = `${chartData.datasets[0].data[0]}${chartData.datasets[0].notation}`;
    context.textAlign = 'center';
    context.fontStyle = 'bold';
    context.font = '20px Helvetica';
    context.fillStyle = chartData.titleColor;
    context.fillText(progressLabel, xCenter, yCenter);
    return context;
  }
}
