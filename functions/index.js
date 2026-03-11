/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onCall, onRequest} = require("firebase-functions/https");
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

/*exports.postcomment = onRequest(async (request, response) => {
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
});*/

exports.postcomment = onCall(async (request) => {
  try {
    const { handle, comment } = request.data; logger.info("Received a comment post request", { handle, comment });
    if (!handle || !comment) {
      throw new Error('Missing handle or comment in request data.');
    }// Save the data in Firestore
    let res;
    if (!request.auth) {
      res = await db.collection('comments').add({ handle, comment, uid: 'anonymous' });
    }
    else {
      res = await db.collection('comments').add({ handle, comment, uid: request.auth.uid });
    }
    // Return a success response
    return { success: true, message: 'Document added successfully.', documentId: res.id };
  } catch (error) {
    logger.error('Error adding comment:', error);
    // Return an error response
    return { success: false, message: 'Failed to add comment.', error: error.message };
  }
});

exports.deleteComment = onCall(async (request) => {
  try {
    const { id } = request.data;
    logger.info("Received a delete comment request", { id });
    if (!id) {
      throw new Error('Missing document id request data.');
    }
    // Delete the document in Firestore
    const res = await db.collection('comments').doc(id).delete();
    // Return a success response
    return {
      success: true,
      message: 'Document deleted successfully.'
    };
  } catch (error) {
    logger.error('Error deleting comment:', error);
    // Return an error response
    return {
      success: false,
      message: 'Failed to delete comment.',
      error: error.message,
    };
  }
});

exports.getComments = onCall(async (request) => {

  try {
    // Query Firestore for the comments collection
    const snapshot = await db.collection('comments').get();
    // Check if the collection has any documents
    if (snapshot.empty) {
      return { success: false, message: 'No comments found.' };
    }// Create an array to store the comments
    const comments = [];// Use forEach to populate the comments array
    snapshot.docs.forEach(doc => {
      comments.push({
        id: doc.id,
        likes: 1000,
        ...doc.data(),
      });
    });// Return the retrieved comments
    return { success: true, comments };
  } catch (error) {
    console.error('Error retrieving comments:', error);
    // Return an error response
    return { success: false, message: 'Failed to retrieve comments.', error: error.message };
  }


});

exports.updateComment = onCall(async (request) => {
  try {
    const { id, comment } = request.data;
    logger.info("Received a comment update request", { comment });
    if (!comment) {
      throw new Error('Missing comment in request data.');
    }
    // Save the data in Firestore
    const res = await db.collection('comments').doc(id).update({ comment });
    // Return a success response
    return {
      success: true,
      message: 'Document updated successfully.',
    };
  } catch (error) {
    logger.error('Error updating comment:', error);
    // Return an error response
    return {
      success: false,
      message: 'Failed to update comment.',
      error: error.message,
    };
  }
});

exports.secureFunction = onCall(async (request) => {
  // context.auth contains information about the user, if they are logged in etc.    
  console.log("auth", request.auth);

  if (request.auth === undefined) {
    //request is made from user that is logged in
    return "User is not logged in"
  } else {
    return "User is logged in"
  }
});

