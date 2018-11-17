export class Invoice {
  id: string;
  title: string;
  date: string;
  fileName: string;
  ownerId: string;
  projectId: string;

  constructor(invoice: any) {
    this.id = invoice.id;
    this.title = invoice.title;
    this.date = invoice.date;
    this.fileName = invoice.fileName;
    this.ownerId = invoice.ownerId;
    this.projectId = invoice.projectId;
  }
}
