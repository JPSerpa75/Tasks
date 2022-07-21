import { Component } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { TasksService } from '../service/tasks.service';
import { PopoverComponent } from '../popover/popover.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  type : string ="pending";
  public  tasks : Observable<any[]>;

  constructor(public alertController: AlertController, 
              public taskService: TasksService,
              public toastController: ToastController,
              public popoverController: PopoverController
              ) {}
  
  ngOnInit(){
    //this.taskService.getFromStorage();
    this.tasks = this.taskService.getFromFirestore();
  }

  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
      header: 'Adicionar Tarefa!',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa'
        },
        // input date with min & max
        {
          name: 'date',
          type: 'date',
          min: '2020-01-01',
          max: '2025-31-12'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Salvar',
          handler: (alertData) => {
            if(alertData.task!= ""){
              this.taskService.addTask(alertData.task, alertData.date);
            }else{
              this.presentToast();
              this.presentAlertPromptAdd();
            }
          }
        }
      ]
    });

    await alert.present();
  }


  async presentAlertPromptDelete(id: number) {
    const alert = await this.alertController.create({
      header: 'Excluir Tarefa!',
      message: 'Deseja realmente excluir a tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Excluir',
          handler: () => this.taskService.deleteOnFirestore(id)
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPromptUpdate(id, task) {
    const alert = await this.alertController.create({
      header: 'Atualizar Tarefa!',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa',
          value: task.value
        },
        // input date with min & max
        {
          name: 'date',
          type: 'date',
          min: '2020-01-01',
          max: '2025-31-12',
          value: task.date ? (task.date.toDate().getFullYear() + "-" + 
          ((task.date.toDate().getMonth()+1) < 10 ? "0" + (task.date.toDate().getMonth()+1) : (task.date.toDate().getMonth()+1)) + "-" +
          ((task.date.toDate().getDate()) < 10 ? "0" + (task.date.toDate().getDate()) : (task.date.toDate().getDate()))) : ""
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Salvar',
          handler: (alertData) => {
            if(alertData.task!= ""){
              this.taskService.updateTask(id, alertData.task, alertData.date, task.done)
            }else{
              this.presentToast();
              this.presentAlertPromptUpdate(id, task)
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Preencha a tarefa!",
      duration: 2000
    });
    toast.present();
  }
  
  async doneToast(index:number, task) {
    const toast = await this.toastController.create({
      color: 'dark',
      mode: "ios",
      message: 'Tarefa "'+ task.value +'" Concluída!',
      duration: 2250
    });
    toast.present();
  }

  async notDoneToast(index:number, task) {
    const toast = await this.toastController.create({
      color: 'dark',
      mode: "ios",
      message: 'Tarefa "'+ task.value +'" Pendente!',
      duration: 2250
    });
    toast.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });

    return await popover.present();
  }

}

