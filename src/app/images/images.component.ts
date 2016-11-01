import { Component, OnInit } from '@angular/core';
import { Image } from './image';
import { ImageService } from './image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: [
    './images.component.css',
    '../app.component.css'
  ]
})
export class ImagesComponent implements OnInit {
  images: Image[];
  hasImage: boolean;

  showModal: boolean;
  image: Image;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.getAllImages();
    this.showModal = false;
  }

  getAllImages() {
    this.imageService.getAllImages()
      .subscribe(data => {
        this.images = data;
        this.hasImage = (this.images.length !== 0);
      });
  }

  removeImage(id: string) {
    this.imageService.removeImage(id)
      .subscribe(data => {
        this.getAllImages();
      });
  }

  createContainer(image: Image) {
    this.imageService.inspectImage(image.Id)
      .subscribe(data => {
        this.imageService.createContainer(data[Object.keys(data)[1]])
          .subscribe(data => {
            this.startContainer(data[Object.keys(data)[0]])
          });
      });
  }

  startContainer(id: string) {
    this.imageService.startContainer(id)
      .subscribe();
  }

  getImage(image: Image) {
    this.image = image;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

}
