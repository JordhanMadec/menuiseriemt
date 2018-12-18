export class Project {
  id: string;
  title: string
  ownerId: string;
  startDate: Date;
  endDate: Date;
  lastUpdate: Date;
  status: ProjectStatus;
  city: string;
  zipcode: string;
  address: string;
  notes: string;

  constructor(project: any) {
    this.id = project.id;
    this.title = project.title;
    this.ownerId = project.ownerId;
    this.startDate = project.startDate && new Date(project.startDate) || new Date();
    this.endDate = project.endDate && new Date(project.endDate) || null;
    this.lastUpdate = project.lastUpdate && new Date(project.lastUpdate) || this.startDate;
    this.status = project.status;
    this.city = project.city;
    this.zipcode = project.zipcode;
    this.address = project.address;
    this.notes = project.notes;
  }

  equals(project: Project | any): boolean {
    return this.title === project.title &&
      this.ownerId === project.ownerId &&
      this.startDate === project.startDate &&
      this.endDate === project.endDate &&
      this.lastUpdate === project.lastUpdate &&
      this.city === project.city &&
      this.zipcode === project.zipcode &&
      this.address === project.address &&
      this.status === project.status &&
      this.notes === project.notes;
  }
}

export enum ProjectStatus {
  NOT_STARTED = 'NOT_STARTED',
  ORDERED = 'ORDERED',
  ONGOING = 'ONGOING',
  PENDING = 'PENDING',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  COMPLETED = 'COMPLETED',
}
