import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { InvoiceModel } from '../../models/invoice.model';
import { DictionaryModel } from '../../models/dictionary.model';
import notify from 'devextreme/ui/notify';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  public invoice: InvoiceModel | null = null;

  public paymentWays: DictionaryModel[] | null = null;

  public processingStatuses: DictionaryModel[] | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['id'];

    forkJoin([
      this.dataService.getDictionary('PaymentWay'),
      this.dataService.getDictionary('ProcessingStatus')
    ]).subscribe(r => {
      this.paymentWays = r[0];
      this.processingStatuses = r[1];
    });

    if (id) {
      this.dataService
        .getInvoice(id)
        .subscribe(i => {
          this.invoice = i;
        });
    } else {
      const now = new Date();
      this.invoice = {
        amount: 0.0,
        creationDate: now,
        changeDate: now,
        paymentWayId: 1,
        processingStatusId: 1
      } as InvoiceModel;
    }
  }

  async processButtonClickHandler() {
    if (this.invoice) {
      this.dataService.postInvoice(this.invoice)
        .subscribe(invoice => {
          debugger
          if(invoice) {
            this.invoice = invoice;
            notify('Invoice was created successfully!', 'info', 1000);
          } else {
            notify('Invoice was not created!', 'error', 1000);
          }
        });
    }
  }

  closeButtonClickHandler() {

  }
}
