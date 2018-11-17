export class Document {
  id: string;
  title: string;
  date: string;
  fileName: string;
  ownerId: string;
  projectId: string;
  done: boolean;
  type: DocumentType;

  constructor(document: any) {
    this.id = document.id;
    this.title = document.title;
    this.date = document.date;
    this.fileName = document.fileName;
    this.ownerId = document.ownerId;
    this.projectId = document.projectId;
    this.done = document.done
  }
}

export enum DocumentType {
  INVOICE = 'INVOICE',
  QUOTE = 'QUOTE',
}
