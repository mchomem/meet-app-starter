// Exemplo de módulo compartilhado

import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

// Compartilhando os controles de formulário
import { InputComponent } from './input/input.component'
import { RadioComponent } from './radio/radio.component'
import { RatingComponent } from './rating/rating.component'

// Compartilhando os serviços da app
import { ShoppingCartService } from '../restaurant-details/shopping-cart/shopping-cart.service'
import { RestaurantsService } from '../restaurants/restaurants.service'
import { OrderService } from '../order/order.service'
import { SnackbarComponent } from './messages/snackbar/snackbar.component'
import { NotificationService } from '../shared/messages/notification.service'
import { LoginService } from '../security/login/login.service'
import { LoggedInGuard } from 'app/security/loggedin.guard'
import { LeaveOrderGuard } from 'app/order/leave-order.guard'
import { AuthInterceptor } from 'app/security/auth.interceptor'

@NgModule({
    declarations: [
        InputComponent
        , RadioComponent
        , RatingComponent
        , SnackbarComponent
    ]
    , imports: [
        CommonModule
        , FormsModule
        , ReactiveFormsModule
    ]
    , exports: [
        InputComponent
        , RadioComponent
        , RatingComponent
        , CommonModule
        , FormsModule
        , ReactiveFormsModule
        , SnackbarComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule

            // Disponibiliza os serviços nos provider para toda a app
            , providers: [
                ShoppingCartService
                , RestaurantsService
                , OrderService
                , NotificationService
                , LoginService
                , LoggedInGuard
                , LeaveOrderGuard
                , {
                    provide: HTTP_INTERCEPTORS
                    , useClass: AuthInterceptor
                    , multi: true
                 }
            ]
        }
    }
}