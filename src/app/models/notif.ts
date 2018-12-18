export class Notif {
  date: Date | string;
  read: boolean;
  text: string;
  link: string;


  constructor(notification: any) {
    this.date = notification.date && new Date(notification.date) || new Date();
    this.read = notification.read;
    this.text = notification.text;
    this.link = notification.link;
  }

  equals(notification: any): boolean {
    return this.date === notification.date &&
    this.read === notification.read &&
    this.text === notification.text &&
    this.link === notification.link;
  }
}
