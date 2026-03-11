import process from 'node:process';
import console from 'node:console';
import { URL } from 'node:url';
import dotenv from 'dotenv';
import { OramaCloud } from '@orama/core';
import { getAllDocuments } from './orama-documents.mjs';

dotenv.config({ path: new URL('../.env.local', import.meta.url) });

/**
 * The default batch size to use when syncing Orama Cloud
 */
const ORAMA_SYNC_BATCH_SIZE = 250;

// The following follows the instructions at https://docs.orama.com/cloud/data-sources/custom-integrations/webhooks
const documents = await getAllDocuments('en');
console.log(`Syncing ${documents.length} documents to Orama Cloud index`);

const orama = new OramaCloud({
  projectId: process.env.PUBLIC_ORAMA_PROJECT_ID || '',
  apiKey: process.env.PRIVATE_ORAMA_API_KEY || '',
});

const datasource = orama.dataSource(process.env.PUBLIC_ORAMA_DATASOURCE_ID || '');
// Create a temporary index to perform the insertions
const temporary = await datasource.createTemporaryIndex();

// Orama allows to send several documents at once, so we batch them in groups of 50.
// This is not strictly necessary, but it makes the process faster.
const runUpdate = async () => {
  const batchSize = ORAMA_SYNC_BATCH_SIZE;
  const batches = [];

  for (let i = 0; i < documents.length; i += batchSize) {
    batches.push(documents.slice(i, i + batchSize));
  }

  console.log(`Sending ${batches.length} batches of ${batchSize} documents`);

  for (const batch of batches) {
    await temporary.insertDocuments(batch);
  }

  // Once all documents are inserted into the temporary index, we swap it with the live one atomically.
  await temporary.swap();
};

// Now we proceed to call the APIs in order.
// The previous implementation used to empty the index before inserting new documents
// to remove documents that are no longer in the source.
// The new API from @orama/core might have a different approach for full sync.
// Based on the provided examples, we are now only running the update.
await runUpdate();

console.log('Orama Cloud sync completed successfully!');
