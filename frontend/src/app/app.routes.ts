import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent as ItemListComponent } from './inventory/items/list/list.component';
import { ListComponent as LocationListComponent } from './inventory/locations/list/list.component';
import { CreateComponent as ItemCreateComponent } from './inventory/items/create/create.component';
import { UpdateComponent as ItemUpdateComponent } from './inventory/items/update/update.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { ListComponent as UserListComponent } from './admin/users/list/list.component';
import { CreateLocationComponent } from './inventory/locations/create-location/create-location.component';
import { ScannerComponent } from './inventory/scanner/scanner/scanner.component';


export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth/login', component: LoginComponent},
  { path: "inventory", canActivateChild: [authGuard], children: [
    { path: 'items/list', component: ItemListComponent},
    { path: 'items/create', component: ItemCreateComponent},
    { path: 'items/update', component: ItemUpdateComponent},
    { path: 'locations/list', component: LocationListComponent},
    { path: 'locations/create', component: CreateLocationComponent},
    { path: 'scanner/scan', component: ScannerComponent}
  ]},
  { path: 'admin', canActivateChild: [authGuard], children: [
    { path: 'users', component: UserListComponent}
  ]},
  { path: '**', redirectTo: ''}


];
