import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { MarkTiffinComponent } from './Components/mark-tiffin/mark-tiffin.component';
import { PaymentComponent } from './Components/payment/payment.component';
// import { QrScannerComponent } from './Components/payment/qr-scanner/qr-scanner.component';
import { TiffinHistoryComponent } from './Components/tiffin-history/tiffin-history.component';
import { PaymentStatusFormComponent } from './Components/payment/payment-status-form/payment-status-form.component';
import { AdminDashboardComponent } from './Components/admin/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './Components/admin/user-list/user-list.component';
import { AdminTiffinPaymentComponent } from './Components/admin/admin-tiffin-payment/admin-tiffin-payment.component';
import { AdminMonthendTiffinComponent } from './Components/admin/admin-monthend-tiffin/admin-monthend-tiffin.component';
import { MarkTiffinAdminComponent } from './Components/admin/mark-tiffin-admin/mark-tiffin-admin.component';
import { AdminMarkTiffinTomorrowComponent } from './Components/admin/admin-mark-tiffin-tomorrow/admin-mark-tiffin-tomorrow.component';
import { AdminUserPaymentsComponent } from './Components/admin/admin-user-payments/admin-user-payments.component';
import { PaymentPageComponent } from './Components/payment-page/payment-page.component';
import { QrScannerComponent } from './Components/qr-scanner/qr-scanner.component';

// import { AdminMonthendTiffinComponent } from './modules/admin/admin-monthend-tiffin/admin-monthend-tiffin.component';
// import { MarkTiffinAdminComponent } from './modules/admin/mark-tiffin-admin/mark-tiffin-admin.component';
// import { UserListComponent } from './modules/admin/user-list/user-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'mark-tiffin', component: MarkTiffinComponent, canActivate: [AuthGuard] },
  { path: 'tiffin-history', component: TiffinHistoryComponent },
  { path: 'qr-scanner', component: QrScannerComponent },
  { path: 'payment-form', component: PaymentPageComponent },
  // { path: 'payment', component: PaymentComponent },
  // { path: 'payment/qr-scanner', component: QrScannerComponent },
  // { path: 'payment/payment-status-form', component: PaymentStatusFormComponent },
  // { path: 'payment', component: PaymentPageComponent },  // Add payment rout
  
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'mark-tiffin-tomorrow', component: AdminMarkTiffinTomorrowComponent },
      { path: 'admin-monthend-tiffin', component: AdminMonthendTiffinComponent },
      // { path: 'tiffin-payment-status', component: AdminTiffinPaymentComponent },
      { path: 'admin-user-payments', component: AdminUserPaymentsComponent },
      { path: 'mark-tiffin-admin', component: MarkTiffinAdminComponent },
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
    ],
    // canActivate: [AuthGuard]
    canActivate: [AuthGuard]
  },
  // Lazy load admin module
  // { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
  // { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  // { path: 'admin/user-list', component: UserListComponent, canActivate: [AuthGuard] },
  // { path: 'admin/mark-tiffin', component: MarkTiffinAdminComponent, canActivate: [AuthGuard] },
  // { path: 'admin/admin-monthend-tiffin', component: AdminMonthendTiffinComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' } // Redirect to login for any unknown paths


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './Components/dashboard/dashboard.component';
// import { LoginComponent } from './Components/login/login.component';
// import { SignupComponent } from './Components/signup/signup.component';
// import { AuthGuard } from './guards/auth.guard';
// import { AdminGuard } from './guards/admin.guard'; // Import AdminGuard
// import { MarkTiffinComponent } from './Components/mark-tiffin/mark-tiffin.component';
// import { PaymentComponent } from './Components/payment/payment.component';
// import { TiffinHistoryComponent } from './Components/tiffin-history/tiffin-history.component';
// import { PaymentStatusFormComponent } from './Components/payment/payment-status-form/payment-status-form.component';
// import { AdminDashboardComponent } from './Components/admin/admin-dashboard/admin-dashboard.component';
// import { UserListComponent } from './Components/admin/user-list/user-list.component';
// import { AdminUserPaymentsComponent } from './Components/admin/admin-user-payments/admin-user-payments.component';
// import { AdminMonthendTiffinComponent } from './Components/admin/admin-monthend-tiffin/admin-monthend-tiffin.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent },
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     canActivate: [AuthGuard] // Protect the route
//   },
//   {
//     path: 'mark-tiffin',
//     component: MarkTiffinComponent,
//     canActivate: [AuthGuard] // Protect the route
//   },
//   {
//     path: 'payment',
//     component: PaymentComponent,
//     canActivate: [AuthGuard] // Protect the route
//   },
//   {
//     path: 'tiffin-history',
//     component: TiffinHistoryComponent,
//     canActivate: [AuthGuard] // Protect the route
//   },
//   {
//     path: 'payment-status-form',
//     component: PaymentStatusFormComponent,
//     canActivate: [AuthGuard] // Protect the route
//   },
//   {
//     path: 'admin/dashboard',
//     component: AdminDashboardComponent,
//     canActivate: [AdminGuard] // Protect the admin route
//   },
//   {
//     path: 'admin/user-list',
//     component: UserListComponent,
//     canActivate: [AdminGuard] // Protect the admin route
//   },
//   {
//     path: 'admin/admin-monthend-tiffin',
//     component: AdminMonthendTiffinComponent,
//     canActivate: [AdminGuard] // Protect the admin route
//   },
//   {
//     path: 'admin/admin-monthend-tiffin',
//     component: AdminMonthendTiffinComponent,
//     canActivate: [AdminGuard] // Protect the admin route
//   },
//   {
//     path: 'admin/user-payments',
//     component: AdminUserPaymentsComponent,
//     canActivate: [AdminGuard] // Protect the admin route
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
