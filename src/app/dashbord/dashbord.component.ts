import { Component, OnInit } from '@angular/core';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  [x: string]: any;
//  opened=false;
//   togglesidebar(){
//     this.opened=!this.opened;
//   }




inbox: boolean = true;
draft: boolean = false;
outbox: boolean = false;
achive: boolean = false;
trash: boolean = false;



title = 'appBootstrap';
  
closeResult: string | undefined;

constructor(private modalService: NgbModal) { }
open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

  ngOnInit(): void {
  }

}

