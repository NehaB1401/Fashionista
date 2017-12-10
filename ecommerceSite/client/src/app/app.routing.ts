import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { BasketComponent } from './basket/index';
import { CheckoutaddressComponent } from './checkoutaddress/index';
import { DeliveryComponent } from './delivery/index';
import { PaymentComponent } from './payment/index';
import { ContactComponent } from './contact/index';
import { FaqComponent } from './faq/index';
import { AuthGuard } from './_guards/index';
import { MentshirtsComponent } from './mentshirts/index';
import { WomentshirtsComponent } from './womentshirts/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'checkoutaddress', component: CheckoutaddressComponent },
    { path: 'delivery', component: DeliveryComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'mentshirts', component: MentshirtsComponent},
    { path: 'womentshirts', component: WomentshirtsComponent },
    
    // Neha~ Start of changes 
    { path: 'home', component: HomeComponent},
    // Neha~ End of changes

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);