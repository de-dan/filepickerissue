import { Component, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import {FilePicker, PickedFile, PickFilesResult} from '@capawesome/capacitor-file-picker';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, JsonPipe],
})
export class HomePage {
  constructor() {}

  result = signal<Partial<PickFilesResult>>({});
  error = signal<any>(undefined);

  async pickFile() {
    console.log("pick file button clicked");
    this.error.set(undefined);
    try {
      const files = await FilePicker.pickFiles({
        readData: true,
      });

      console.log(files);
      this.result.set(files);
    } catch (e) {
      this.error.set(e);
      this.result.set({});
    }
  }

  prettyFile(file: PickedFile) {
    return {...file, data: file.data?.substring(0, 100)}
  }
}
