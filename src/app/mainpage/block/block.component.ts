import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit { 
   
  @Input() albumObs: Observable<any>;
  @Output() loadingEvent = new EventEmitter();
  private albumSub: any;

  public albums: any []; 
  public dateFilter: any;
  public artistFilter: any;

  public loadingCounter: number = 0;

  constructor() { }

  ngOnInit() {  
    this.albumSub = this.albumObs.subscribe(
      ({ albums,dateFilter,artistFilter }) => this.subscriptionManager(albums,dateFilter,artistFilter)
    );
  }

  private subscriptionManager(albums: any[],dateFilter:string,artistFilter: string){
    this.albums = albums;
    this.dateFilter = dateFilter;
    this.artistFilter = artistFilter; 
  }

  public calcDaysAgo(releaseDate: string) : string{
    let rDate: any = new Date(releaseDate);
    let today: any = new Date();
    let differenceTime = today.getTime() - rDate.getTime();
    let differenceDays = differenceTime / (1000 * 3600 * 24);  

    let daysAgo = Math.round(differenceDays);

    if(daysAgo == 0)
      return 'Today.'
    else if(daysAgo == 1)
      return 'Yesterday.'
    else
      return (daysAgo.toString() + ' days ago.');
  }

  public filterDate(releaseDate):boolean{   


    let date: any = new Date(releaseDate); 
    let dateRange = new Date().setMonth(new Date().getMonth()-this.dateFilter);  
    if((date-dateRange   ) > 0) 
      return true;
    else 
      return false;

  }

  public filterArtists(artists):boolean{
     
    if(this.artistFilter.length == 0) return true;  
    
    for(let a of artists){
      if(this.artistFilter.includes(a.id)){
        return true;
      }
    } 
  }
 
 

}
