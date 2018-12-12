import { ProjectStatus } from '../models/project';

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

}
