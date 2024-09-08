import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet ,Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected this line
})
export class AppComponent implements OnInit {
  @ViewChild('myModel') model: ElementRef | undefined;
  songobj: SongModel = new SongModel();

  songs: SongModel[] = []; // Changed to SongModel[]
  songname: string = '';
  oldarray: SongModel[] = []; // Changed to SongModel[]
  db: SongModel[] = []; // Changed to SongModel[]
  isModalOpen = true;
  songid:string='';

  ngOnInit(): void {
    this.getrecords();
  }

  OpenModel() {
    const model = document.getElementById('myModel');
    if (model) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    if (this.model) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  Savesong() {
    const storedSongs = localStorage.getItem('songlist');
    let songsArray: SongModel[] = [];
    if (storedSongs) {
      songsArray = JSON.parse(storedSongs);
    }

    // Determine the next ID
    const newId = songsArray.length > 0 ? (Math.max(...songsArray.map(song => parseInt(song.id, 10))) + 1).toString() : '1';
    this.songobj.id = newId;

    // Add new song to the array
    songsArray.push(this.songobj);

    // Save updated array to local storage
    localStorage.setItem('songlist', JSON.stringify(songsArray));

    // Refresh the records and close the modal
    this.getrecords();
    this.closeModel();

    window.location.reload();
  }

  getrecords() {
    const stringrecords = localStorage.getItem('songlist');
    if (stringrecords != null) {
      this.db = JSON.parse(stringrecords);
    }
  }

  openDeleteModal(){
    const deletemodel = document.getElementById('deletemodel')
    if(deletemodel){
      deletemodel.style.display ='block';
    }

  }

  closeDeleteModal(){
    const deletemodel = document.getElementById('deletemodel')
    if(deletemodel){
      deletemodel.style.display ='none';
    }

  }

  DeleteSong(){
    debugger;

    if(!this.songid){
      return
    }
    const index =this.db.findIndex(song=>song.id == this.songid)
    if (index != null){
      this.db.splice(index,1)
      const songlistdb = JSON.stringify(this.db)
      localStorage.setItem('songlist',songlistdb)
      alert("Record is Deleted")
    }

    window.location.reload();
  }
  

}

export class SongModel {
  id: string;
  songname: string;
  artist: string;
  playlist: string;

  constructor() {
    this.id = '';
    this.songname = '';
    this.artist = '';
    this.playlist = '';
  }
}
