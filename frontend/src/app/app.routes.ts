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
import { CreateComponent as UserCreateComponent } from './admin/users/create/create.component';
import { ListComponent as RoleListeComponent } from './admin/roles/list/list.component';
import { CreateComponent as RoleCreateComponent } from './admin/roles/create/create.component';
import { ListComponent as TypeListComponent } from './inventory/types/list/list.component';
import { CreateComponent as TypeCreateComponent } from './inventory/types/create/create.component';


export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth/login', component: LoginComponent},
  { path: "inventory", canActivateChild: [authGuard], children: [
    { path: 'items/list', component: ItemListComponent},
    { path: 'items/create', component: ItemCreateComponent},
    { path: 'items/update', component: ItemUpdateComponent},
    { path: 'locations/list', component: LocationListComponent},
    { path: 'locations/create', component: CreateLocationComponent},
    { path: 'scanner/scan', component: ScannerComponent},
    { path: 'bulk/list', component: TypeListComponent},
    { path: 'bulk/create', component: TypeCreateComponent}
  ]},
  { path: 'admin', canActivateChild: [authGuard], children: [
    { path: 'users', component: UserListComponent},
    { path: 'users/create', component: UserCreateComponent},
    { path: 'roles', component: RoleListeComponent},
    { path: 'roles/create', component: RoleCreateComponent}
  ]},
  { path: '**', redirectTo: ''}

];
