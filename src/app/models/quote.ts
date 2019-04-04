import { DocumentType, Document } from './document';

export class Quote extends Document {
  constructor(quote: any) {
    super(quote);
    this.type = DocumentType.QUOTE;
  }

  getStatus() {
    return this.done ? 'Accepté' : 'En attente';
  }
}
