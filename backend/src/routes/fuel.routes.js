import FuelLog from '../models/FuelLog.js';
import { createCrudRouter } from '../utils/crudRouter.js';

export default createCrudRouter(FuelLog, {
  idPrefix: 'FL',
  searchFields: ['id', 'vehicle', 'station'],
  filterFields: ['vehicle'],
  defaultSort: { date: -1 }
});
