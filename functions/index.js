/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
initializeApp();

const db = getFirestore();


// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

 exports.helloWorld = onRequest((request, response) => {
   logger.info("Hello logs!", {structuredData: true});
   response.send({"likes" : "3122828"});
 });

exports.postcomment = onRequest(async (request, response) => {
  logger.info("Posting comments made from client requests", { structuredData: true });

  // Save the data in our Firestore DB
  const res = await db.collection('comments').add(request.body);
  // If successful a document id will be returned 
  if (res.id) {
    console.log('Document added with ID:', res.id);
    response.send('Operation successful: Document added.');
  } else {
    console.error('Failed to add the document.');
    response.send('Operation failed: Document not added.');
  }
});

exports.getAllComments = onRequest(async (request, response) => {

  logger.info("Retrieving all comments made in the DB", { structuredData: true });
  // Save the data in our Firestore DB
  const snapshot = await db.collection('comments').get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    response.send('No documents found in the collection');
  }
  let myComments = [];
  snapshot.forEach(doc => {
    myComments.push(doc.data())
  });
  response.json(myComments);
});
