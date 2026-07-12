import Vehicle from '../models/Vehicle.js';
import { createCrudRouter } from '../utils/crudRouter.js';

export default createCrudRouter(Vehicle, {
  idPrefix: 'V',
  searchFields: ['id', 'plate', 'model', 'type', 'driver'],
  filterFields: ['status', 'type'],
  defaultSort: { id: 1 }
});
