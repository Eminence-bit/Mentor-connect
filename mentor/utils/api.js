import { auth } from './firebaseConfig';
import { getFirestore, collection, getDocs, addDoc, query, where, updateDoc, doc } from 'firebase/firestore';

// Initialize Firestore
const db = getFirestore();

// Fetch mentors based on filters like field, experience, gender, etc.
export const getMentors = async (filters = {}) => {
  try {
    const mentorsRef = collection(db, '/users');
    let q = query(mentorsRef);

    // Apply dynamic filters
    if (filters.field) {
      q = query(mentorsRef, where('field', '==', filters.field));
    }
    if (filters.experience) {
      q = query(mentorsRef, where('experience', '>=', filters.experience));
    }

    const querySnapshot = await getDocs(q);
    const mentors = [];
    querySnapshot.forEach((doc) => {
      mentors.push({ id: doc.id, ...doc.data() });
    });

    return mentors;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    throw error;
  }
};

// Book a session with a mentor
export const bookSession = async (mentorId, userId, timeSlot) => {
  try {
    const sessionsRef = collection(db, 'sessions');
    const newSession = {
      mentorId,
      userId,
      timeSlot,
      status: 'pending', // Could be pending, confirmed, or completed
      createdAt: new Date(),
    };

    const sessionDoc = await addDoc(sessionsRef, newSession);
    return sessionDoc.id; // Return the session ID
  } catch (error) {
    console.error('Error booking session:', error);
    throw error;
  }
};

// Fetch recorded sessions based on topic or mentor
export const getRecordedSessions = async (filters = {}) => {
  try {
    const sessionsRef = collection(db, 'recordedSessions');
    let q = query(sessionsRef);

    // Apply filters dynamically
    if (filters.topic) {
      q = query(sessionsRef, where('topic', '==', filters.topic));
    }
    if (filters.mentorId) {
      q = query(sessionsRef, where('mentorId', '==', filters.mentorId));
    }

    const querySnapshot = await getDocs(q);
    const sessions = [];
    querySnapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() });
    });

    return sessions;
  } catch (error) {
    console.error('Error fetching recorded sessions:', error);
    throw error;
  }
};

// Sign out the current user
export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Update mentor availability
export const updateMentorAvailability = async (mentorId, availability) => {
  try {
    const mentorRef = doc(db, 'mentors', mentorId);
    await updateDoc(mentorRef, { availability });
    return true;
  } catch (error) {
    console.error('Error updating mentor availability:', error);
    throw error;
  }
};

// Fetch all upcoming sessions for a user (student or mentor)
export const getUserSessions = async (userId) => {
  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(sessionsRef, where('userId', '==', userId));

    const querySnapshot = await getDocs(q);
    const sessions = [];
    querySnapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() });
    });

    return sessions;
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    throw error;
  }
};
