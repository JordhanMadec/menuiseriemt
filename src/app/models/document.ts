export class Document {
  id: string;
  title: string;
  lastUpdate: Date | string;
  fileName: string;
  ownerId: string;
  projectId: string;
  done: boolean;
  type: DocumentType;

  constructor(document: any) {
    this.id = document.id;
    this.title = document.title;
    this.lastUpdate = document.lastUpdate && new Date(document.lastUpdate) || null;
    this.fileName = document.fileName;
    this.ownerId = document.ownerId;
    this.projectId = document.projectId;
    this.done = document.done
  }

  equals(document: Document | any): boolean {
    return this.title === document.title &&
      this.fileName === document.fileName &&
      this.ownerId === document.ownerId &&
      this.projectId === document.projectId &&
      this.done === document.done &&
      this.type === document.type;
  }
}

export enum DocumentType {
  INVOICE = 'INVOICE',
  QUOTE = 'QUOTE',
}
