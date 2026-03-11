const { assert } = require("chai");
const { initializeApp } = require("firebase/app");
const { getFunctions, httpsCallable, connectFunctionsEmulator } = require("firebase/functions");
const firebaseConfig = {
    apiKey: "<your API Key>",
    authDomain: "<Your APP>",
    projectId: "ct216appamazing",
    storageBucket: "ct216appamazing.firebasestorage.app",
    messagingSenderId: "321257471324",
    appId: "1:321257471324:web:d25893f3b592b962ca1599"
};
// Initialize Firebase App and Functions
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);
const postComment = httpsCallable(functions, "postcomment");
const getComments = httpsCallable(functions, "getComments");

describe("postcomment onCall function", function () {
    this.timeout(100000);
    it("should successfully add a comment", async () => {
        const response = await postComment({
            handle: "testUser",
            comment: "Firebase SDK test comment"
        });
        assert.isTrue(response.data.success);
        assert.exists(response.data.documentId);
    });
});

describe('getcomments onCall function (Firebase SDK Test)', function () {
    it('should successfully return all comments in the collection', async () => {

        const response = await getComments({})
        assert.isArray(response.data.comments, "Expected 'comments' to be an array");
        assert.property(response.data.comments[0], "comment");
    });
});
