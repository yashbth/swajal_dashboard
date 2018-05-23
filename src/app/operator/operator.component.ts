import { Component, OnInit, OnChanges, AfterContentChecked,DoCheck } from '@angular/core';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { operator } from '../water-dispense/test'
import { DatePipe } from '@angular/common';

declare var jquery : any;
declare var $ : any;

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
  id=[];
  data = operator;
  date : any=new Date(Date.now());
  place:string = "Gurgaon , Haryana";
  info :any; 
  operators = [];
  expected_attendance=[];
  checkOperators:boolean=true;
  presents=[];
  present: number;
  absent: number;
  chart:boolean=false;
  
  constructor(private service : FetchWaterDispenseDataService,private router:Router,private route: ActivatedRoute) { 
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        this.id[0] = route.snapshot.paramMap.get('id');
        this.getOperators('operator.php');
      }
    })
  }
  ngDoCheck(){
    if( this.checkOperators){     
      if(this.operators.length){
        for(let oper of this.operators){
          this.id[1]=oper.OperatorID.trim();
          this.id[2]='';
          this.getInfo('operatorPunch.php')              
        }
        this.checkOperators=false; 
      }
    }
    
 }
  ngOnInit() {
    this.date= this.date.getFullYear() + '-'+((this.date.getMonth()+1)/10>1 ? '':'0')+(this.date.getMonth()+1)+'-'+this.date.getDate();
  }
  getOperators(filename):void{
    this.operators=[];    
    this.service.getData(this.id,filename).subscribe(operators=>this.operators=operators)
  }
  getInfo(filename):void{
    this.info=[];   
    this.service.getData(this.id,filename).subscribe(info=>this.info=info)
  }
  generateChart(operator,index){
    this.chart = false;
    this.presents=[];
    let dateArray = this.date.split('-');
    let dateString = dateArray[2] + '/'+dateArray[1]+'/'+dateArray[0];
    this.id[2] = dateString;
    this.id[1]= operator;
    this.service.getData(this.id,'operatorPunch.php').subscribe(presents=>this.presents=presents);
    setTimeout(()=>{
      if(!this.presents.length){
        dateString = dateArray[2] + '-'+dateArray[1]+'-'+dateArray[0];
        this.id[2] = dateString;
        this.service.getData(this.id,'operatorPunch.php').subscribe(presents=>this.presents=presents);
      }
      setTimeout(()=>{
        this.present = this.presents.length;
        this.absent = this.expected_attendance[index]-this.present;
        this.chart = true;
      },100);
    },100);

  }
}