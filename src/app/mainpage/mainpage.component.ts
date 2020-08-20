import { Component, OnInit, Input } from '@angular/core';  
import { SpotifyapiService } from '../services/spotifyapi/spotifyapi.service'   
import {SelectItem} from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  @Input('params') params: any;
  public albumSubject: Subject<any> = new Subject<any>();
  public followSubject: Subject<any> = new Subject<any>();

  public Artists: any;  

  public dateRangeOptions: SelectItem[] = [{label: '1 Month ago', value: 1}, {label: '6 Months ago', value: 6}, {label: '1 Year ago', value: 12}, {label: 'All time', value: 99999}];  
  public pickedDateRange: number = 1;  
  public followedArtistsOptions: SelectItem[] = [];
  public pickedFollowedArtist: any = []; 

  public FollowedAlbumList: any = []; 

  public loading: boolean = false;


  constructor(private spotifyService: SpotifyapiService) {
      this.Artists = [{name: '',genre:'', top: '', image: ''}];  

   }

  ngOnInit() { 

    if( this.params != null){
      if(this.params.access_token){
        this.spotifyService.setToken(this.params.access_token); 
        // this.initializeTopArtists();
        this.initializeFollowedAlbumList();
      }
    }
 
  }


  // INITIALIZATION FUNCTIONS //

  private initializeTopArtists(){

    this.spotifyService.getTopArtists().then(response =>{  
      this.fillArtists(response);
    });   
  }

  private initializeFollowedAlbumList(){
 
    this.FollowedAlbumList = [];
    
    let prom = this.spotifyService.getFollowedArtists().then(response =>{
      return response;
    })   
    prom.then(response=>{ 
      let promises = [];
      let followedArtists: any = response;      
      for(let i = 0;i < followedArtists.length;i++){ 
        
        this.followedArtistsOptions.push({label: followedArtists[i].name,value:followedArtists[i].id});

        let albumsProm = this.spotifyService.getArtistAlbums(response[i].id).then(response=>{  
          promises.push(albumsProm);
          let albums: any = response
          albums.forEach(element => {
            if(element.artists[0].name != 'Various Artists')
              this.FollowedAlbumList.push(element); 
          }); 
        })
      }
      Promise.all(promises).then(()=>{ 
        this.initializeRelatedArtists();
        //A este punto ya se tiene la lista de todos los albumes de los artistas seguidos => console.log(this.FollowedAlbumList) 
        setTimeout(() => { 
          this.FollowedAlbumList.sort(function(o1,o2){
            let o1_date: any = new Date(o1.release_date);
            let o2_date: any = new Date(o2.release_date);  
            return o2_date - o1_date;
          });
          
          this.applyFilters();
          
        }, 400); 
      })

    })  
  }

  private initializeRelatedArtists(){
    
    let rand = Math.floor(Math.random() * (this.followedArtistsOptions.length )); 

    let prom = this.spotifyService.getRelatedArtists(this.followedArtistsOptions[rand].value).then(response =>{  
      this.followSubject.next({relatedArtists: response, followedArtists: this.followedArtistsOptions});
    })   

  }



  private applyFilters(){

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 500);
    this.albumSubject.next({ albums: this.FollowedAlbumList, dateFilter: this.pickedDateRange, artistFilter: this.pickedFollowedArtist});

  }

  //HELPER FUNCTIONS //

  private fillArtists(TopArtists){  
 
    if(TopArtists != null){
      for(let i = 0; i<TopArtists.length;i++){ 

        let genres: string = ''; 
        TopArtists[i].genres.forEach((element, index) => {
          if(index === TopArtists[i].genres.length -1)
            genres += element;
          else
            genres += element + ',';
        }); 

        this.Artists.push({
          name: TopArtists[i].name,
          genre: genres,
          top: i + 1, 
          image: TopArtists[i].images[0].url})                        
      }   
      this.Artists.shift();
    }  
  }

 



 

  

}
