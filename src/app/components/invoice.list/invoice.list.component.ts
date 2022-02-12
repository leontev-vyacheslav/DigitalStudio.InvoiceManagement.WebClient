import { Component, OnInit, ViewChild } from '@angular/core'
import { InvoiceModel } from '../../models/invoice.model';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { confirm } from "devextreme/ui/dialog"
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-invoice',
  templateUrl: 'invoice.list.component.html',
  styleUrls: ['../../app.component.scss', 'invoice.list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  @ViewChild('invoiceListGrid', { static: false }) dataGrid: DxDataGridComponent | undefined;

  public dataSource: InvoiceModel[] | null = null;

  private focusedRowData: InvoiceModel | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {
    dataService.getInvoiceList().subscribe(next => {
      this.dataSource = next;
    })
  }

  ngOnInit(): void {

  }

  public async onNewButtonClick(): Promise<void> {
    await this.router.navigate(['/invoice'], {});
  }

  public async onDeleteButtonClick(): Promise<void> {
    if(this.dataGrid && this.focusedRowData) {
      if(await confirm('Do you want to remove the selected invoice?', 'Confirm'))
      this.dataService.deleteInvoice(`${this.focusedRowData.id}`).subscribe(next => {
        if(next) {
          notify(`Invoice ${next.id} was successfully removed`);
          this.dataService.getInvoiceList().subscribe(next => {
            this.dataSource = next;
          })
        }
      });
    }
  }

  public onFocusedRowChanged (event: any): void {
    if(event.row.rowType === 'data') {
      this.focusedRowData = event.row.data as InvoiceModel;
    }
  }

  public async onRowDblClickHandler(event: any): Promise<void> {
    const invoice = event.data as InvoiceModel;
    if (invoice) {
      await this.router.navigate(['/invoice'], { queryParams: { id: invoice.id } });
    }
  }
}
