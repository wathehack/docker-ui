import { Component, OnInit } from '@angular/core';
import { Container } from './container';
import { ContainerService } from './container.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: [
    './containers.component.css',
    '../app.component.css'
  ]
})
export class ContainersComponent implements OnInit {
  runningContainers: Container[];
  stoppedContainers: Container[];

  hasRunning: boolean;
  hasStopped: boolean;

  showModal: boolean;
  container: Container;

  constructor(private containerService: ContainerService) { }

  ngOnInit() {
    this.loadContainers();
    this.showModal = false;
  }

  getRunningContainers() {
    this.containerService.getRunningContainers()
      .subscribe(data => {
        this.runningContainers = data;
        this.hasRunning = (this.runningContainers.length !== 0);
      });
  }

  getStoppedContainers() {
    this.containerService.getStoppedContainers()
      .subscribe(data => {
        this.stoppedContainers = data;
        this.hasStopped = (this.stoppedContainers.length !== 0);
      });
  }

  loadContainers() {
    this.getRunningContainers();
    this.getStoppedContainers();
  }

  stopContainer(id: string) {
    this.containerService.stopContainer(id)
      .subscribe(data => {
        this.loadContainers();
      });
  }

  restartContainer(id: string) {
    this.containerService.restartContainer(id)
      .subscribe(data => {
        this.loadContainers();
      });
  }

  removeContainer(id: string) {
    this.containerService.removeContainer(id)
      .subscribe(data => {
        this.loadContainers();
      });
  }

  getContainer(container: Container) {
    this.container = container;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

}
