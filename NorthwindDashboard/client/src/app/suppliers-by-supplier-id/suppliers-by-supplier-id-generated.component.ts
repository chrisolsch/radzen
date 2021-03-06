/*
  This file is automatically generated. Any changes will be overwritten.
  Modify suppliers-by-supplier-id.component.ts instead.
*/
import { LOCALE_ID, ChangeDetectorRef, ViewChild, AfterViewInit, Injector, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { DialogService, DIALOG_PARAMETERS, DialogRef } from '@radzen/angular/dist/dialog';
import { NotificationService } from '@radzen/angular/dist/notification';
import { ContentComponent } from '@radzen/angular/dist/content';
import { LinkComponent } from '@radzen/angular/dist/link';
import { HeadingComponent } from '@radzen/angular/dist/heading';
import { GridComponent } from '@radzen/angular/dist/grid';

import { ConfigService } from '../config.service';
import { AddSupplierComponent } from '../add-supplier/add-supplier.component';
import { EditSupplierComponent } from '../edit-supplier/edit-supplier.component';

import { NorthwindService } from '../northwind.service';
import { SecurityService } from '../security.service';

export class SuppliersBySupplierIdGenerated implements AfterViewInit, OnInit, OnDestroy {
  // Components
  @ViewChild('content1') content1: ContentComponent;
  @ViewChild('link0') link0: LinkComponent;
  @ViewChild('pageTitle') pageTitle: HeadingComponent;
  @ViewChild('grid0') grid0: GridComponent;

  router: Router;

  cd: ChangeDetectorRef;

  route: ActivatedRoute;

  notificationService: NotificationService;

  configService: ConfigService;

  dialogService: DialogService;

  dialogRef: DialogRef;

  httpClient: HttpClient;

  locale: string;

  _location: Location;

  _subscription: Subscription;

  northwind: NorthwindService;

  security: SecurityService;
  getSuppliersResult: any;
  getSuppliersCount: any;
  supplier: any;
  parameters: any;

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    this.notificationService = this.injector.get(NotificationService);

    this.configService = this.injector.get(ConfigService);

    this.dialogService = this.injector.get(DialogService);

    this.dialogRef = this.injector.get(DialogRef, null);

    this.locale = this.injector.get(LOCALE_ID);

    this.router = this.injector.get(Router);

    this.cd = this.injector.get(ChangeDetectorRef);

    this._location = this.injector.get(Location);

    this.route = this.injector.get(ActivatedRoute);

    this.httpClient = this.injector.get(HttpClient);

    this.northwind = this.injector.get(NorthwindService);
    this.security = this.injector.get(SecurityService);
  }

  ngAfterViewInit() {
    this._subscription = this.route.params.subscribe(parameters => {
      if (this.dialogRef) {
        this.parameters = this.injector.get(DIALOG_PARAMETERS);
      } else {
        this.parameters = parameters;
      }
      this.load();
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }


  load() {
    this.northwind.getSuppliers(`SupplierID eq ${this.parameters.SupplierID}`, this.grid0.allowPaging ? this.grid0.pageSize : null, this.grid0.allowPaging ? 0 : null, null, this.grid0.allowPaging, null, null, null)
    .subscribe((result: any) => {
      this.getSuppliersResult = result.value;

      this.getSuppliersCount = this.grid0.allowPaging ? result['@odata.count'] : result.value.length;

      this.supplier = result.value[0];
    }, (result: any) => {

    });
  }

  grid0Add(event: any) {
    this.dialogService.open(AddSupplierComponent, { parameters: {}, title: 'Add Supplier' });
  }

  grid0Delete(event: any) {
    this.northwind.deleteSupplier(event.SupplierID)
    .subscribe((result: any) => {
      this.notificationService.notify({ severity: "success", summary: `Success`, detail: `Supplier deleted!` });
    }, (result: any) => {
      this.notificationService.notify({ severity: "error", summary: `Error`, detail: `Unable to delete Supplier` });
    });
  }

  grid0LoadData(event: any) {
    this.northwind.getSuppliers(`${event.filter ? event.filter + ' and ' : ''}SupplierID eq ${this.parameters.SupplierID}`, event.top, event.skip, `${event.orderby}`, event.top != null && event.skip != null, ``, null, null)
    .subscribe((result: any) => {
      this.getSuppliersResult = result.value;

      this.getSuppliersCount = event.top != null && event.skip != null ? result['@odata.count'] : result.value.length;
    }, (result: any) => {

    });
  }

  grid0RowSelect(event: any) {
    this.dialogService.open(EditSupplierComponent, { parameters: {SupplierID: event.SupplierID}, title: 'Edit Supplier' });
  }
}
