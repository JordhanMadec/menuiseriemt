import { Document, DocumentType } from './document';

export class Invoice extends Document {

  constructor(invoice: any) {
    super(invoice)
    this.type = DocumentType.INVOICE;
  }
}