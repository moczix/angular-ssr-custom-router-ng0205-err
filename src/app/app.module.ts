import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CUSTOM_ROUTER_PROVIDER } from './custom-router/custom-router-factory';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (router: Router) => () => {
        router.initialNavigation();
      },
      deps: [Router],
      multi: true,
    },
    CUSTOM_ROUTER_PROVIDER,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
