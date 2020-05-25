export interface Chart {
  labels?: string[];
  statusColor?: string;
  titleColor?: string;
  datasets: Dataset[];
}

export interface Dataset {
  label?: string;
  backgroundColor: any;
  hoverBackgroundColor?: any;
  borderColor?: any;
  notation?: string;
  data: number[];
}
