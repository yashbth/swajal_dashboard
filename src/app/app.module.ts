import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import {ChartModule} from 'angular2-chartjs'
import { AppComponent } from './app.component';
import { MachineComponent } from './machine/machine.component';
import { AppRoutingModule } from './/app-routing.module';
import { WaterDispenseComponent } from './water-dispense/water-dispense.component';
import { FetchWaterDispenseDataService } from './fetch-water-dispense-data.service';
import { ChartsComponent } from './charts/charts.component';
import { TransactionComponent } from './transaction/transaction.component';


@NgModule({
  declarations: [
    AppComponent,
    MachineComponent,
    WaterDispenseComponent,
    ChartsComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    FormsModule
  ],
  providers: [FetchWaterDispenseDataService],
  bootstrap: [AppComponent,MachineComponent]
})

export class AppModule { }
