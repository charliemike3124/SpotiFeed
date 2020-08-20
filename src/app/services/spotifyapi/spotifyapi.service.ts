import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';    

@Injectable({
  providedIn: 'root'
})
export class SpotifyapiService {
  
  public spotify: any; 
  public token: string;

  constructor() {
    this.spotify = new Spotify();  
   }


   public getAlbum(artistID: string){
     this.spotify.getArtistAlbums(artistID, function (err, data) {
      if (err) console.error(err);
      else console.log('Artist albums', data);
      })
   } 

  public getTopArtists(): any{
    return new Promise((resolve, reject)=>{
      let prom = this.spotify.getMyTopArtists().then((response)=>{
        return response.items;
      })
      prom.then((response)=>{
        return prom;
      })
      if(prom != null){
        resolve(prom)
      }
      else{
        reject('failed');
      }
    })

  }

   public getFollowedArtists(){ 
    return new Promise((resolve, reject)=>{
      let prom = this.spotify.getFollowedArtists({limit: 50}).then((response)=>{ 
        return response.artists.items;
      })
      prom.then((response)=>{
        return prom;
      })

      if(prom != null){
        resolve(prom)
      }
      else{
        reject('failed');
      }
    }) 
   }

   public getArtistAlbums(artistId: string){ 
    return new Promise((resolve, reject)=>{
      let prom = this.spotify.getArtistAlbums(artistId,{limit: 50}).then((response)=>{  
        return response.items;
      })
      prom.then((response)=>{
        return prom;
      })

      if(prom != null){
        resolve(prom)
      }
      else{
        reject('failed');
      }
    }) 
   }

   public getRelatedArtists(artistId: string){
    return new Promise((resolve,reject)=>{
      let prom = this.spotify.getArtistRelatedArtists(artistId).then((response)=>{ 
        return response.artists;
      })
      prom.then((response)=>{
        return prom;
      })

      if(prom != null){
        resolve(prom)
      }
      else{
        reject('failed');
      }
    })
   }

   public followArtist(artistsId: string[]){
    
    return new Promise((resolve,reject)=>{
      let prom = this.spotify.followArtists(artistsId).then((response)=>{ 
        return response.artists;
      })
      prom.then((response)=>{
        return prom;
      })

      if(prom != null){
        resolve(prom)
      }
      else{
        reject('failed');
      }
    })
   }

   public unfollowArtist(artistsId: string[]){
    
    return new Promise((resolve,reject)=>{
      let prom = this.spotify.unfollowArtists(artistsId).then((response)=>{ 
        return response.artists;
      })
      prom.then((response)=>{
        return prom;
      })

      if(prom != null){
        resolve(prom)
      }
      else{
        reject('failed');
      }
    })
   }


   public setToken(token: string){
      this.spotify.setAccessToken(token);  
   }
 
}
