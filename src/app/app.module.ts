import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouteReuseStrategy } from '@angular/router';

const firebaseConfig = {
  apiKey: "AIzaSyCL_FHJ6DOxHGldJ2QB9NNQaXvUvhFP3LY",
  authDomain: "contabilidadicsm-8b978.firebaseapp.com",
  projectId: "contabilidadicsm-8b978",
  storageBucket: "contabilidadicsm-8b978.firebasestorage.app",
  messagingSenderId: "282654165069",
  appId: "1:282654165069:web:1702ccc52f46b00b813404",
  measurementId: "G-LCMJ6NM458"
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
