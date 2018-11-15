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
    this.city = project.zipcode;
    this.address = project.address;
    this.notes = project.notes;
  }
}

export enum ProjectStatus {
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING',
  PENDING = 'PENDING',
  NOT_STARTED = 'NOT_STARTED',
}
