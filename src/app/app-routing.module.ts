import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Admin
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ApprovalComponent } from './admin/approval/approval.component';
import { UsersmanagerComponent } from './admin/usersmanager/usersmanager.component';
import { PackageserviceComponent } from './admin/packageservice/packageservice.component';
import { ReconcileComponent } from './admin/reconcile/reconcile.component';
import { BusinessSituationComponent } from './admin/business-situation/business-situation.component'
import { ReconcileDetailComponent } from './admin/reconcile-detail/reconcile-detail.component';
import { SigninaComponent } from './admin/signina/signina.component';
//Page 404
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

//HomePage
import { HomeComponent } from './home/home.component';
import { ChooseRoleComponent } from './home/choose-role/choose-role.component';

//Customer
import { CustomerComponent } from './customer/customer.component';
import { SignincComponent } from './customer/signinc/signinc.component';
import { SignupcComponent } from './customer/signupc/signupc.component';
import { ForgotPassCComponent } from './customer/forgot-pass-c/forgot-pass-c.component'
import { ChangePassFgComponent } from './customer/change-pass-fg/change-pass-fg.component';
import { DashboardcComponent } from './customer/dashboardc/dashboardc.component';
import { TrackOrderComponent } from './customer/dashboardc/track-order/track-order.component';
import { ChooseServiceComponent } from './customer/dashboardc/choose-service/choose-service.component';
import { DeliveryManagementComponent } from './customer/dashboardc/delivery-management/delivery-management.component';
import { StatisticCComponent } from './customer/dashboardc/statistic-c/statistic-c.component';
import { UserdetailComponent } from './customer/dashboardc/userdetail/userdetail.component';
import { UserBlockComponent } from './customer/user-block/user-block.component';

//Business
import { BusinessComponent } from './business/business.component';
import { SigninbComponent } from './business/signinb/signinb.component';
import { SignupbComponent } from './business/signupb/signupb.component';
import { ForgotPassBComponent } from './business/forgot-pass-b/forgot-pass-b.component';
import { DashboardbComponent } from './business/dashboardb/dashboardb.component';
import { CouponManagementComponent } from './business/dashboardb/coupon-management/coupon-management.component';
import { OrderProcessBusinessComponent } from './business/dashboardb/order-process-business/order-process-business.component';
import { PriceDeclarationBusinessComponent } from './business/dashboardb/price-declaration-business/price-declaration-business.component';
import { ReconcileBusinessComponent } from './business/dashboardb/reconcile-business/reconcile-business.component';
import { RegisterPackageServiceComponent } from './business/dashboardb/register-package-service/register-package-service.component';
import { SituationComponent } from './business/dashboardb/situation/situation.component';
import { BusinessDetailComponent } from './business/dashboardb/business-detail/business-detail.component';
import { ApprovalBusinessComponent } from './business/dashboardb/approval-business/approval-business.component';
import { ChangePassFgBComponent } from './business/change-pass-fg-b/change-pass-fg-b.component';

//Verify Email
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentDeniedComponent } from './payment-denied/payment-denied.component';

import { AuthGuard } from './auth.guard';
import { AuthBusinessGuard } from './auth-business.guard';
import { AuthAdminGuard } from './auth-admin.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'choose-role', component: ChooseRoleComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-denied', component: PaymentDeniedComponent },
  { path: 'customer', component: CustomerComponent, children: [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SignincComponent },
    { path: 'signup', component: SignupcComponent },
    { path: 'forgot-pass', component: ForgotPassCComponent },
    { path: 'change-pass-fg', component: ChangePassFgComponent },
    { path: 'user-block', component: UserBlockComponent },
  ]},
  { path: 'customer/userdetail', component: UserdetailComponent, canActivate: [AuthGuard] },
  { path: 'customer/dashboard', component: DashboardcComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'track-order', pathMatch: 'full' },
    { path: 'track-order', component: TrackOrderComponent },
    { path: 'choose-service', component: ChooseServiceComponent },
    { path: 'delivery-management', component: DeliveryManagementComponent },
    { path: 'statistic', component: StatisticCComponent },
  ]},
  { path: 'business', component: BusinessComponent, children: [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SigninbComponent },
    { path: 'signup', component: SignupbComponent },
    { path: 'forgot-pass', component: ForgotPassBComponent },
    { path: 'change-pass-fg', component: ChangePassFgBComponent },
  ]},
  { path: 'business/business-detail', component: BusinessDetailComponent, canActivate: [AuthBusinessGuard] },
  { path: 'business/dashboard', component: DashboardbComponent, canActivate: [AuthBusinessGuard], children: [
    { path: '', redirectTo: 'register-package-service', pathMatch: 'full' },
    { path: 'register-package-service', component: RegisterPackageServiceComponent },
    { path: 'price-declaration-business', component: PriceDeclarationBusinessComponent },
    { path: 'order-process-business', component: OrderProcessBusinessComponent },
    { path: 'situation', component: SituationComponent },
    { path: 'reconcile-business', component: ReconcileBusinessComponent },
    { path: 'coupon-management', component: CouponManagementComponent },
    { path: 'approval', component: ApprovalBusinessComponent },
  ]},
  { path: 'admin/signin', component: SigninaComponent },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthAdminGuard], children: [
    { path: '', redirectTo: 'approval', pathMatch: 'full' },
    { path: 'approval', component: ApprovalComponent },
    { path: 'usermanager', component: UsersmanagerComponent },
    { path: 'packageservice', component: PackageserviceComponent },
    { path: 'reconcile', component: ReconcileComponent },
    { path: 'reconcile/:id', component: ReconcileDetailComponent },
    { path: 'business-situation', component: BusinessSituationComponent },
  ]},
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
