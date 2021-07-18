import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Left, Move, PlaceRobot, Right } from '../services/robot-actions/robot-actions.service';
import { getPosition } from '../storage';
import { RobotState } from '../storage/robot-storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('roboto', { static: false })
  public roboto!: ElementRef;
  @ViewChild('reportLog')
  reportLog!: ElementRef;
  @ViewChild('xAxis', { static: false })
  public xAxis!: ElementRef;
  @ViewChild('yAxis', { static: false })
  public yAxis!: ElementRef;
  @ViewChild('direction')
  direct!: ElementRef;
  // Declare the globals
  getPosition$ = this.store.select(getPosition);
  direction = '';
  yPos = 0;
  xPos = 0;

  constructor( public store: Store<RobotState>, private alertController: AlertController) {
  }

  ngAfterViewInit() {
  this.getPosition$.subscribe((data: RobotState) => {
   if (data.direction !== ''){
    this.roboto.nativeElement.style.display = 'block';
    this.roboto.nativeElement.style.left = data.xAxis + '%';
    this.roboto.nativeElement.style.top = data.yAxis + '%';
    this.roboto.nativeElement.className = data.direction;
    this.xPos = data.xAxis;
    this.yPos = data.yAxis;
    this.direction = data.direction;
    data.onEdge ? this.roboto.nativeElement.classList.add('edge') : this.roboto.nativeElement.classList.remove('edge');
    const xRealPos = (this.xPos / 2) / 10;
    const yRealPos = (((100 - this.yPos) / 2) / 10) - 1;
    this.reportLog.nativeElement.innerHTML = `POSITION  ${xRealPos}, ${yRealPos}, ${this.direction}`;
   }
  });
}
  // Set robot to x, y axis
  placeRobot() {
    this.store.dispatch(new PlaceRobot({
      xAxis: parseInt(this.xAxis.nativeElement.value, 10),
      yAxis: parseInt(this.yAxis.nativeElement.value, 10),
      direction: this.direct.nativeElement.value,
      onEdge: this.checkBoard(),
    }));
  }

  // Move robot in its current facing direction
  move() {
    this.store.dispatch(new Move({
      xAxis: this.xPos,
      yAxis: this.yPos,
      direction: this.direction,
      onEdge: this.checkBoard(),
    }));
  }

  // turn to the left
  turnLeft() {
    if (this.direction !== ''){
    this.store.dispatch(new Left({
      xAxis: this.xPos,
      yAxis: this.yPos,
      direction: this.direction,
      onEdge: this.checkBoard(),
    }));
  }
  }

  // turn to the right
  turnRight() {
    if (this.direction !== ''){
      this.store.dispatch(new Right({
        xAxis: this.xPos,
        yAxis: this.yPos,
        direction: this.direction,
        onEdge: this.checkBoard(),
      }));
    }
  }

  // check robot is inside table
  checkBoard() {
  
    if ((this.xPos === 80 && this.direction === 'East') || (this.yPos === 80 && this.direction === 'South') || (this.xPos === 0 && this.direction === 'West') || (this.yPos === 0 && this.direction === 'North')) {
      console.log('Change direction!');
      this.roboto.nativeElement.classList.add('edge');
      this.showAlert();
      return true;
    
    } else if ((this.xPos !== 80 && this.direction === 'East') || (this.yPos !== 80 && this.direction !== 'South') || (this.xPos !== 0 && this.direction !== 'West') || (this.yPos !== 0 && this.direction !== 'North')) {
      this.roboto.nativeElement.classList.remove('edge');
      return false;
    }
    return false;
  }

  async showAlert(){

      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Its an edge. Robot will fell down!',
        buttons: ['OK']
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
  
    }

}
