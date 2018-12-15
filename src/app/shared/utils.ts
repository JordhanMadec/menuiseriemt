import { ProjectStatus } from '../models/project';
import * as moment from 'moment';

export abstract class Utils {

  public static getProjectStatus(status: string): string {
    switch (status) {
      case ProjectStatus.COMPLETED:
        return 'Terminé';
      case ProjectStatus.NOT_STARTED:
        return 'En préparation';
      case ProjectStatus.ONGOING:
        return 'En cours';
      case ProjectStatus.PENDING:
        return 'En attente';
      case ProjectStatus.WAITING_PAYMENT:
        return 'En attente de paiement';
      case ProjectStatus.ORDERED:
        return 'Commande en cours';
    }
  }

  public static dateToString(date: Date) {
    return moment(date).format('DD/MM/YYYY');
  }

  public static generateToken(): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let password = '';

    for (let i = 0; i < 12; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }

    return password;
  }

  public static getDateDDMMYYYY(date: string): Date {
    const dateParts = date.split('/');
    return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
  }
}
