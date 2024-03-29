import { Component } from '@angular/core';
import {Note} from '../modelo/Note';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  public notes: Note[]=[];

  constructor( public alertCtrl: AlertController){
    this.notes.push(new Note("Nota primera"));
  }

  //añadir nota
  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'texto',  //el name debe ser 'texto' para que coincida con el nombre del campo del objeto Note
          type: 'text',
          placeholder: 'texto'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data:Note) => {  //data es un objeto que contiene los datos introducidos por el usuario
            console.log(data.texto);
            this.notes.push(data);   //añade objeto de la clase Nota al array
          }
        }
      ]
    });
    await alert.present();
  }


  //editar nota
  async editNote(note:Note) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Note',
      inputs: [
        {
          value:note.texto,
          name: 'texto',
          type: 'text',
          placeholder: 'Escriba el texto'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: (data:Note) => {
            let index = this.notes.indexOf(note);  //saca el índice del objeto dentro del array
            if(index > -1){
              this.notes[index] = data;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  //borrar nota
  async deleteNote(note:Note) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: '<strong>¿Confirmar el borrado?</strong>',  //se puede combinar con etiquetas html
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',   //se le puede especificar una clase css de librería o personal
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            let index = this.notes.indexOf(note);
            if(index > -1){
                this.notes.splice(index, 1);  //elimina 1 elemento del array a partir de index
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
