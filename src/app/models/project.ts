export class Project {
  id: string;
  title: string
  ownerId: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  city: string;
  zipcode: string;
  address: string;
  notes: string;

  constructor(project: any) {
    this.id = project.id;
    this.title = project.title;
    this.ownerId = project.ownerId;
    this.startDate = project.startDate;
    this.endDate = project.endDate;
    this.status = project.status;
    this.city = project.city;
    this.zipcode = project.zipcode;
    this.address = project.address;
    this.notes = project.notes;
  }

  getStatus(): string {
    switch (this.status) {
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

  equals(project: Project): boolean {
    return this.title === project.title &&
      this.ownerId === project.ownerId &&
      this.startDate === project.startDate &&
      this.endDate === project.endDate &&
      this.city === project.city &&
      this.zipcode === project.zipcode &&
      this.address === project.address &&
      this.status === project.status &&
      this.notes === project.notes;
  }
}

export enum ProjectStatus {
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING',
  PENDING = 'PENDING',
  ORDERED = 'ORDERED',
  NOT_STARTED = 'NOT_STARTED',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
}
