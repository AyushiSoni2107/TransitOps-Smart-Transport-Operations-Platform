import MaintenanceRecord from '../models/MaintenanceRecord.js';
import { createCrudRouter } from '../utils/crudRouter.js';

export default createCrudRouter(MaintenanceRecord, {
  idPrefix: 'M',
  searchFields: ['id', 'vehicle', 'service', 'mechanic'],
  filterFields: ['priority', 'status', 'vehicle'],
  defaultSort: { date: 1 }
});
