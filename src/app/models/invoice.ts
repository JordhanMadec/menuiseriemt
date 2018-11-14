export class Invoice {
  title: String;
  date: String;
  url: string;

  constructor(invoice: any) {
    this.title = invoice.title;
    this.date = invoice.date;
    this.url = invoice.url;
  }
}
