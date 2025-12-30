const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// HTTP Callable Function to set user roles
// Only accessible by users with 'admin' claim (or initial setup)
exports.setRole = functions.https.onCall(async (data, context) => {
    // Check if request is made by an admin
    // For initial bootstrapping, valid if context.auth is defined but checks can be looser
    // BUT for security, we should enforce admin check. 
    // TODO: How to bootstrap the first admin? 
    // We can allow if the caller's email matches a hardcoded "SUPER_ADMIN_EMAIL" logic or manual console usage.

    if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "The function must be called while authenticated."
        );
    }

    // const requesterEmail = context.auth.token.email;
    // const requesterId = context.auth.uid;
    // const isAdmin = context.auth.token.admin === true;

    // Initial Bootstrap Logic (remove after first use or protect via env var)
    // if (!isAdmin && requesterEmail !== "YOUR_ADMIN_EMAIL") { ... }

    const { uid, role } = data;

    if (!uid || !role) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "The function must be called with arguments 'uid' and 'role'."
        );
    }

    try {
        const claims = {};
        claims[role] = true;
        // Also include 'role' string for easier frontend checking if needed
        claims.role = role;

        await admin.auth().setCustomUserClaims(uid, claims);

        // Also update the user document in Firestore for easy querying
        await admin.firestore().collection("users").doc(uid).set({
            role: role,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        return { message: `Success! User ${uid} has been made a ${role}.` };
    } catch (error) {
        throw new functions.https.HttpsError("internal", error.message);
    }
});

// Trigger: On User Create -> Create Profile Skeleton
exports.onUserCreate = functions.firestore
    .document("users/{userId}")
    .onCreate(async (snap, context) => {
        const userData = snap.data();
        console.log(`New user created: ${userData.email}`);
        // Create academic record skeleton?
        return null;
    });

// Trigger: On Payment Update -> Notify User
exports.onPaymentUpdate = functions.firestore
    .document("payments/{paymentId}")
    .onUpdate(async (change, context) => {
        const newData = change.after.data();
        const previousData = change.before.data();

        // Check if status changed to 'success' (PAID)
        if (newData.status === 'success' && previousData.status !== 'success') {
            const userId = newData.userId;
            // TODO: Integrate email service (SendGrid/Nodemailer) or Firebase Extension
            console.log(`Payment confirmed for user ${userId}. Sending email...`);

            // Example: Update user status to 'active' if it was their first payment
        }
        return null;
    });
