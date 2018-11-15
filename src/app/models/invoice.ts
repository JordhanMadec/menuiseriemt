export class Invoice {
  id: string;
  title: string;
  date: string;
  fileName: string;

  constructor(invoice: any) {
    this.title = invoice.title;
    this.date = invoice.date;
    this.fileName = invoice.fileName;
  }
}
