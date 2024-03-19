import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZzouvenirModule } from './zzouvenir/zzouvenir.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    ZzouvenirModule,
    AppRoutingModule
  ],
  providers: [ provideHttpClient(withFetch()) ],
  bootstrap: [AppComponent]
})
export class AppModule { }
