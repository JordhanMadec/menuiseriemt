export class Invoice {
  id: string;
  title: string;
  date: string;
  url: string;

  constructor(invoice: any) {
    this.title = invoice.title;
    this.date = invoice.date;
    this.url = invoice.url;
  }
}
