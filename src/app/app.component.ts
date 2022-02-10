import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DigitalStudio.InvoiceManagement.WebClient';

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  async createInvoice() {
    await this.router.navigate(['/invoice', { }])
  }
}
