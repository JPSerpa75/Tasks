import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor( public authService: AuthService,
               private router: Router,
               private popoverController: PopoverController) { }

  ngOnInit() {}

  logout(){
    this.authService.logout().subscribe(
      ()=>{
        this.router.navigate(['login'])
        this.popoverController.dismiss()
      },
      err=> console.log(err)
    ) 
  }

  openProfile(){
    this.router.navigate(['profile'])
    this.popoverController.dismiss()
  }

}
