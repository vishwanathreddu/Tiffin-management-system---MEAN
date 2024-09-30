import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { MarkTiffinComponent } from './Components/mark-tiffin/mark-tiffin.component';
import { TiffinConfirmationDialogComponent } from './Components/tiffin-confirmation-dialog/tiffin-confirmation-dialog.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtInterceptorService } from './services/jwt/jwt-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';  // For grid responsiveness

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth-service/auth.service';
import { TiffinHistoryComponent } from './Components/tiffin-history/tiffin-history.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { QrScannerComponent } from './Components/payment/qr-scanner/qr-scanner.component';
import { PaymentStatusFormComponent } from './Components/payment/payment-status-form/payment-status-form.component';
import { AdminDashboardComponent } from './Components/admin/admin-dashboard/admin-dashboard.component';
import { AdminTiffinPaymentComponent } from './Components/admin/admin-tiffin-payment/admin-tiffin-payment.component';
import { UserListComponent } from './Components/admin/user-list/user-list.component';
import { AdminMonthendTiffinComponent } from './Components/admin/admin-monthend-tiffin/admin-monthend-tiffin.component';
import { MarkTiffinAdminComponent } from './Components/admin/mark-tiffin-admin/mark-tiffin-admin.component';
import { AdminMarkTiffinTomorrowComponent } from './Components/admin/admin-mark-tiffin-tomorrow/admin-mark-tiffin-tomorrow.component';
import { AdminUserPaymentsComponent } from './Components/admin/admin-user-payments/admin-user-payments.component';
import { PaymentPageComponent } from './Components/payment-page/payment-page.component';
// import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { AdminTiffinReminderDialogComponent } from './Components/admin/admin-tiffin-reminder-dialog/admin-tiffin-reminder-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    MarkTiffinComponent,
    TiffinConfirmationDialogComponent,
    TiffinHistoryComponent,
    PaymentComponent,
    QrScannerComponent,
    PaymentStatusFormComponent,
    AdminDashboardComponent,
    AdminTiffinPaymentComponent,
    UserListComponent,
    AdminMonthendTiffinComponent,
    MarkTiffinAdminComponent,
    AdminMarkTiffinTomorrowComponent,
    AdminUserPaymentsComponent,
    PaymentPageComponent,
    SidebarComponent,
    AdminTiffinReminderDialogComponent,
    // AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatIconModule,
    MatGridListModule,
    MdbCheckboxModule
  ],
  providers: [
    provideAnimationsAsync(),
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
