// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Address, Payment, Package } = initSchema(schema);

export {
  Address,
  Payment,
  Package
};