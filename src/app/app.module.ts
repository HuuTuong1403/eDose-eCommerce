import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxPaginationModule } from 'ngx-pagination';

//Library UI ng-zorro-antd
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
//Material UI
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

//Chart JS
import { ChartsModule } from 'ng2-charts';

//Component
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ApprovalComponent } from './admin/approval/approval.component';
import { UsersmanagerComponent } from './admin/usersmanager/usersmanager.component';
import { PackageserviceComponent } from './admin/packageservice/packageservice.component';
import { ReconcileComponent } from './admin/reconcile/reconcile.component';
import { BusinessSituationComponent } from './admin/business-situation/business-situation.component';
import { NotifyDialogComponent } from './admin/notify-dialog/notify-dialog.component';
import { ReconcileDetailComponent } from './admin/reconcile-detail/reconcile-detail.component';

import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { ChooseRoleComponent } from './home/choose-role/choose-role.component';
import { CustomerComponent } from './customer/customer.component';
import { SignupcComponent } from './customer/signupc/signupc.component';
import { SignincComponent } from './customer/signinc/signinc.component';
import { ForgotPassCComponent } from './customer/forgot-pass-c/forgot-pass-c.component';

import { BusinessComponent } from './business/business.component';
import { SigninbComponent } from './business/signinb/signinb.component';
import { SignupbComponent } from './business/signupb/signupb.component';
import { ForgotPassBComponent } from './business/forgot-pass-b/forgot-pass-b.component';
import { ChangePassFgComponent } from './customer/change-pass-fg/change-pass-fg.component';
import { DashboardcComponent } from './customer/dashboardc/dashboardc.component';
import { TrackOrderComponent } from './customer/dashboardc/track-order/track-order.component';
import { ChooseServiceComponent } from './customer/dashboardc/choose-service/choose-service.component';
import { DeliveryManagementComponent } from './customer/dashboardc/delivery-management/delivery-management.component';

import { AuthGuard } from './auth.guard';
import { StatisticCComponent } from './customer/dashboardc/statistic-c/statistic-c.component';
import { UserdetailComponent } from './customer/dashboardc/userdetail/userdetail.component';
import { DashboardbComponent } from './business/dashboardb/dashboardb.component';
import { RegisterPackageServiceComponent } from './business/dashboardb/register-package-service/register-package-service.component';
import { CouponManagementComponent } from './business/dashboardb/coupon-management/coupon-management.component';
import { SituationComponent } from './business/dashboardb/situation/situation.component';
import { ReconcileBusinessComponent } from './business/dashboardb/reconcile-business/reconcile-business.component';
import { OrderProcessBusinessComponent } from './business/dashboardb/order-process-business/order-process-business.component';
import { PriceDeclarationBusinessComponent } from './business/dashboardb/price-declaration-business/price-declaration-business.component';
import { DialogBusinessComponent } from './business/dashboardb/dialog-business/dialog-business.component';
import { BusinessDetailComponent } from './business/dashboardb/business-detail/business-detail.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ApprovalBusinessComponent } from './business/dashboardb/approval-business/approval-business.component';
import { PaymentDeniedComponent } from './payment-denied/payment-denied.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { SigninaComponent } from './admin/signina/signina.component';
import { FooterComponent } from './home/footer/footer.component';
import { UserBlockComponent } from './customer/user-block/user-block.component';
import { ChangePassFgBComponent } from './business/change-pass-fg-b/change-pass-fg-b.component';
registerLocaleData(en);

import { DatePipe } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ApprovalComponent,
    UsersmanagerComponent,
    PackageserviceComponent,
    ReconcileComponent,
    BusinessSituationComponent,
    NotifyDialogComponent,
    ReconcileDetailComponent,
    HomeComponent,
    PagenotfoundComponent,
    ChooseRoleComponent,
    CustomerComponent,
    SignupcComponent,
    SignincComponent,
    ForgotPassCComponent,
    BusinessComponent,
    SigninbComponent,
    SignupbComponent,

    ForgotPassBComponent,
    ChangePassFgComponent,
    DashboardcComponent,
    TrackOrderComponent,
    ChooseServiceComponent,
    DeliveryManagementComponent,
    StatisticCComponent,
    UserdetailComponent,
    DashboardbComponent,
    RegisterPackageServiceComponent,
    CouponManagementComponent,
    SituationComponent,
    ReconcileBusinessComponent,
    OrderProcessBusinessComponent,
    PriceDeclarationBusinessComponent,
    DialogBusinessComponent,
    BusinessDetailComponent,
    VerifyEmailComponent,
    ApprovalBusinessComponent,
    PaymentDeniedComponent,
    PaymentSuccessComponent,
    SigninaComponent,
    FooterComponent,
    UserBlockComponent,
    ChangePassFgBComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    RxReactiveFormsModule,
    NgImageFullscreenViewModule,
    ClickOutsideModule,

    //Zorro
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzSpaceModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzBadgeModule,
    NzModalModule,
    NzPopoverModule,
    NzNotificationModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzResultModule,
    NzSkeletonModule,
    NzSpinModule,
    NzTabsModule,
    NzSelectModule,
    NzRadioModule,

    //Material
    MatDialogModule,
    MatGridListModule,

    //ChartJS
    ChartsModule,
    NgxPaginationModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, FormBuilder, AuthGuard, CookieService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
