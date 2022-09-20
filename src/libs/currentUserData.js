var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase_config";
let unsubscribeFromUserData;
let myUid;
let myData;
let myFriendsUids = [];
onAuthStateChanged(auth, (user) => {
    if (user) {
        myUid = user.uid;
        const ref = doc(db, "users", user.uid);
        unsubscribeFromUserData = onSnapshot(ref, handleSnapshot);
    }
    else if (unsubscribeFromUserData) {
        unsubscribeFromUserData();
    }
});
function handleSnapshot(snapshot) {
    return __awaiter(this, void 0, void 0, function* () {
        const newData = snapshot.data();
        const friendUIDs = newData.friends;
        //check if this uid has already been looked up
        if (myFriendsUids.length === 0) {
            myFriendsUids = friendUIDs;
        }
        else {
            friendUIDs.forEach((uid) => {
                if (!myFriendsUids.includes(uid)) {
                    myFriendsUids.push(uid);
                }
            });
        }
        //get all friend details
        const friendDetails = {};
        yield Promise.all(myFriendsUids.map((uid) => new Promise((resolve, reject) => {
            const docRef = doc(db, "users", uid);
            getDoc(docRef)
                .then((res) => res.get("email"))
                .then((email) => {
                friendDetails[uid] = email;
                resolve();
            })
                .catch((error) => {
                console.error("Error fetching friend details");
                console.error(error);
                reject();
            });
        })));
        // change myData.friends from an array of uids to an object containing uid:email pairs
        myData = Object.assign(Object.assign({}, newData), { friends: friendDetails });
    });
}
export { myData, myUid };
