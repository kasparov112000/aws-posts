
export class Employee {
  id = 1;
  lastname = '';
  firstname = '';
  someOtherData = '';
  profilePicture = '';
}

export const JANE_DOE = {
  id: 1,
  lastname: 'Doe',
  firstname: 'Jane',
  someOtherData: 'other data',
  profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/48px-User_icon_2.svg.png'
};

export const JOHN_DOE = {
  id: 2,
  lastname: 'Doe',
  firstname: 'John',
  someOtherData: 'other data',
  profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/48px-User_icon_2.svg.png'
};

export const jose = {
  id: 3,
  lastname: 'renato',
  firstname: 'nunez',
  someOtherData: 'other data',
  profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/48px-User_icon_2.svg.png'
};


export const EmployeeList: Employee[] = [
  JANE_DOE,
  JOHN_DOE,
  jose

];