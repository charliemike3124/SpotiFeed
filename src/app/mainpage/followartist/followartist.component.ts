import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core'; 
import { Observable } from 'rxjs';  
import { SpotifyapiService } from '../../services/spotifyapi/spotifyapi.service'   

@Component({
  selector: 'app-followartist',
  templateUrl: './followartist.component.html',
  styleUrls: ['./followartist.component.scss']
})
export class FollowartistComponent implements OnInit {

  @Input() followObs: Observable<any>;
  private followSub: any;
  @Output() refreshEvent = new EventEmitter();

  public relatedArtists:any = [];
  public checked: any = [];

  constructor(private spotifyService: SpotifyapiService) { }

  ngOnInit() {  
    this.followSub = this.followObs.subscribe(
      ({ relatedArtists, followedArtists }) => this.subscriptionManager(relatedArtists,followedArtists)
    );
  }
   


  private subscriptionManager(relatedArtists,followedArtists){
    let artistsIds: any = [];
    for(let element of followedArtists){
      artistsIds.push(element.value)
    }

    //Push only artists that arent followed yet
    let i = 0;
    for(let element of relatedArtists){  
      if(!artistsIds.includes(element.id)){
        this.relatedArtists.push(element);
        this.checked.push(false);
        if(this.relatedArtists.length==10) break;
      }
      i++;
    } 

    //sort artists by popularity
    this.relatedArtists.sort(function(pop1,pop2){
      return pop2.popularity-pop1.popularity;
    })
 
 

  }


  public handleFollowButton(artistId,check){
    let ids: any[] = [];
    ids.push(artistId);
    if(check)
      this.spotifyService.followArtist(ids);
    else
      this.spotifyService.unfollowArtist(ids);
    

  }

  public refreshSuggestedArtists(){
    this.refreshEvent.emit(true);    
  }

  public getImageUrl(images){    
    return images[images.length - 1].url
  }
}
