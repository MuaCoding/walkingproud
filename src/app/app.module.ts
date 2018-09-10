import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { UtilityProvider } from '../providers/utility/utility';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { MultiPickerProvider } from '../providers/multi-picker/multi-picker';
import { SearchHistoryProvider } from '../providers/search-history/search-history';
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { MockInterceptorProvider } from '../providers/mock-interceptor/mock-interceptor';
import { CacheApiProvider } from '../providers/cache-api/cache-api';
import { WxjssdkProvider } from '../providers/wxjssdk/wxjssdk';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      locationStrategy: 'hash',
      backButtonText: '',
      tabsHideOnSubPages: true,
    }),
    IonicStorageModule.forRoot({
      name: "WalkingProud",
      storeName: "mobile",
    }),
    HttpClientModule,
  ],
  bootstrap: [
    IonicApp,
  ],
  entryComponents: [
    MyApp,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UtilityProvider,
    AuthenticationProvider,
    { provide: HTTP_INTERCEPTORS, useClass: MockInterceptorProvider, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    MultiPickerProvider,
    SearchHistoryProvider,
    CacheApiProvider,
    WxjssdkProvider,
  ]
})
export class AppModule { }
