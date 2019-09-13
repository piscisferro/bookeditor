import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
  exportAs: 'child'
})
export class ConfirmModalComponent implements OnInit {

  closeResult: string;
  modalReference: any;

  @ViewChild('content') content: ElementRef;

  @Output() deleteIt = new EventEmitter();

  constructor(public modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
  }

  close() {
    this.modalReference.close();
  }

  handleDelete() {
    this.deleteIt.emit(true);
  }

}
