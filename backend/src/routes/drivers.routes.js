import Driver from '../models/Driver.js';
import { createCrudRouter } from '../utils/crudRouter.js';

export default createCrudRouter(Driver, {
  idPrefix: 'D',
  searchFields: ['id', 'name', 'license', 'phone', 'assignedVehicle'],
  filterFields: ['status'],
  defaultSort: { name: 1 }
});
