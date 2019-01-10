import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  selector: 'sidenav-disable-close-example',
  templateUrl: 'sidenav-disable-close-example.html',
  styleUrls: ['sidenav-disable-close-example.css'],
})
export class SidenavDisableCloseExample {
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';
  
  close(reason: string) {
    this.reason = reason;
    this.sidenav.open();
  }

 shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */