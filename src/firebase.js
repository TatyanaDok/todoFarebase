import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
 apiKey: 'AIzaSyCE_pGV2lefIwm0t_qJ1XTMiQxsat93Hpk',
 authDomain: 'todo-list-ed3c7.firebaseapp.com',
 projectId: 'todo-list-ed3c7',
 storageBucket: 'todo-list-ed3c7.appspot.com',
 messagingSenderId: '716681895908',
 appId: '1:716681895908:web:eae39c2f2a8cb62a83b1f1',
 measurementId: 'G-8MXZ1NW6SL',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
