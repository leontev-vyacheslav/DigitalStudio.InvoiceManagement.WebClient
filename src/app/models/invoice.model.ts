import { EntityModel } from './entity.model';

export interface InvoiceModel extends EntityModel<string>
{
  creationDate: Date,
  changeDate: Date,
  processingStatusId: number,
  paymentWayId: number,
  amount: number
}
