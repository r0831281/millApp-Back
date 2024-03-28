import { CanActivateFn, CanActivateChildFn } from '@angular/router';

export const authGuard: CanActivateChildFn = (route, state) => {
  if (localStorage.getItem('token') === null){
    return false;
  }
  else
    return true;
};


export const roleGuard: CanActivateFn = (route, state) => {
  const accessLevel = localStorage.getItem('accessLevel');

  const acceslevels = {
    superAdmin: [0, 1, 2, 3],
    admin: [0, 1, 2],
    scanner: [0, 1],
    user: [0]
  };
  if (acceslevels.admin.includes(Number(accessLevel))) {
    return true;
  }
  else if (acceslevels.scanner.includes(Number(accessLevel))) {
    return true;
  }
  else if (acceslevels.user.includes(Number(accessLevel))) {
    return true;
  }
  else {
    return false;
  }
}
