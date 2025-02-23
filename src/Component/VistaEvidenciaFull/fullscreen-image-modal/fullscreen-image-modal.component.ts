import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fullscreen-image-modal',
  templateUrl: './fullscreen-image-modal.component.html',
  styleUrls: ['./fullscreen-image-modal.component.scss'],
})
export class FullscreenImageModalComponent implements OnInit {
  @Input() image!: string;

  constructor(private modalController: ModalController) {}
  ngOnInit(): void {
    console.log('Base64 Image:');
  }
  dismiss() {
    this.modalController.dismiss();
  }
}
