export class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  zipcode: number;
  address: string;
  homePhone: string;
  mobilePhone: string;
  isAdmin: boolean;
  lastUpdate: Date;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email || '';
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.city = user.city || '';
    this.zipcode = user.zipcode || '';
    this.address = user.address || '';
    this.homePhone = user.homePhone || '';
    this.mobilePhone = user.mobilePhone || '';
    this.isAdmin = user.isAdmin || false;
    this.lastUpdate = user.lastUpdate && new Date(user.lastUpdate) || new Date();
  }

  equals(user: User): boolean {
    return this.email === user.email &&
      this.firstName === user.firstName &&
      this.lastName === user.lastName &&
      this.city === user.city &&
      this.zipcode === user.zipcode &&
      this.address === user.address &&
      this.homePhone === user.homePhone &&
      this.mobilePhone === user.mobilePhone &&
      this.isAdmin === user.isAdmin;
  }
}
