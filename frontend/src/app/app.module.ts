import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AngularSplitModule } from 'angular-split';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppMaterialModule } from './material/app.material.module';
import { ApplicationsEffects } from './store/effects/applications.effect';
import { reducers, appReducers } from './store/reducers/app.reducers';
import { applicationsReducers } from './store/reducers/applications.reducers';
import { consoleReducers } from './store/reducers/console.reducers';
import { ConsoleComponent } from './console/console.component';
import { LoggerColorPipe } from './console/logger-color.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConsoleComponent,
    LoggerColorPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    SweetAlert2Module.forRoot({}),
    BrowserAnimationsModule,
    AngularSplitModule.forRoot(),
    StoreRouterConnectingModule.forRoot({
      // navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('app', appReducers),
    StoreModule.forFeature('applications', applicationsReducers),
    StoreModule.forFeature('console', consoleReducers),
    EffectsModule.forFeature([
      ApplicationsEffects,
    ])
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
