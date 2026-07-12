import Alert from '../models/Alert.js';
import { createCrudRouter } from '../utils/crudRouter.js';

export default createCrudRouter(Alert, {
  idPrefix: 'A',
  searchFields: ['message', 'vehicle'],
  filterFields: ['type', 'read'],
  defaultSort: { createdAt: -1 }
});
