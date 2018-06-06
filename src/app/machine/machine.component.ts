import { Component, OnInit,AfterContentChecked ,DoCheck,HostListener,Inject} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router'
import { Dropdown } from './dropdown'
import {CookieService,CookieOptionsArgs} from 'angular2-cookie/core'
import '../../assets/scripts/collapse.js'
import { GlobalService } from '../global.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { Location } from '@angular/common';

declare var jquery:any;
declare var $ :any;
declare var check : any; 
declare function class10() : any;
declare function class12() : any;
declare function class3_9() : any;

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit{
  user : any;
  title = 'DASHBOARD';
  param=[];
  url:string;
  id:string;
  dropdownlist = Dropdown; 
  currDiv: string;
  cluster: string;
  jwtHelper = new JwtHelperService();
  session_variable  : any;
  privledges : boolean= true;
  message_failure: string;
  
  constructor(private router : Router,private cookieService : CookieService,private route : ActivatedRoute, private global :GlobalService,private service : FetchWaterDispenseDataService,private location: Location) {

   }

  ngOnInit(){   
    setTimeout(()=>{
      if(!this.user){
        window.location.href='/';
      }
    },5000);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  }

  logout(){
    this.cookieService.removeAll();
    window.location.href= '/';

  }
  toggle(){
      if(check){    
        $('#verticalCollapse').removeClass('col-sm-3');
        $('.verticalNav').animate({zIndex:0,opacity:"0"},600);
        $('#verticalCollapse').animate({maxWidth:"0%"},500);
        setTimeout(()=>{
          class12();
        },500)             
        check = false;
      } 
      else {
        class3_9(); 
        $('.verticalNav').animate({opacity:"1"},1000);
        $('#verticalCollapse').animate({maxWidth:"100%"},500);
        if(window.innerWidth<600){
          $('#h3').css({"fontSize":"3vw"});
          $('h6').css({"fontSize":"2.5vw"});
          $(".verticalNav a").css({"fontSize":"2.8vw"});
          $('.verticalNav').css({"zIndex":"100","background":"#33334d","width":"100%"});
        }
  
        check = true;
      }
     
  }
  settingToggle(){
    $('.Settings').slideToggle();    
  }
  hide(){
      if(window.innerWidth<600){
          $('#verticalCollapse').removeClass('col-sm-3');
          $('.verticalNav').animate({opacity:"0"},600);
          $('#verticalCollapse').animate({maxWidth:"0%"},500);
          setTimeout(()=>{
            class12();
          },500)             
          check = false;
      }
  }
  ngDoCheck(){
    this.cluster = this.cookieService.get('cluster');    
    if(window.innerWidth>1300){
      $('.components').addClass('col-sm-10');           
    }
    else if ( window.innerWidth<=1300){
      $('.components').addClass('col-sm-9').removeClass('col-sm-10');     
    }

    $('body ').css({'background':"whitesmoke"});   
  }
  ngAfterContentChecked(){
    this.user = this.global.user["0"]; 
    if( this.user[this.cluster]=="0" && this.privledges){
      this.location.back();
      var time = new Date();
      time.setSeconds(time.getSeconds() + 5);
      let opts: CookieOptionsArgs = {
        expires: time
      };
      this.cookieService.put("message_failure","Access Denied!",opts);
      this.privledges = false
    }
    this.message_failure=this.cookieService.get('message_failure');
    let param=this.router.url.split('/');
    this.url= param[param.length-1];
    this.id = param[param.length-2];
    this.currDiv = this.cookieService.get('prevDiv');
  }
}
