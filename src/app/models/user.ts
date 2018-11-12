export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  zipcode: number;
  address: string;
  homePhone: string;
  mobilePhone: string;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.city = user.city;
    this.zipcode = user.zipcode;
    this.address = user.address;
    this.homePhone = user.homePhone;
    this.mobilePhone = user.mobilePhone;
  }
}
