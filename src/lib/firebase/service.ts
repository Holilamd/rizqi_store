import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from './init';
import firebase from 'firebase/compat/app';

// Inisialisasi Firestore
const firestore = getFirestore(app);

// Fungsi untuk mengambil semua data dari koleksi tertentu
export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}

// Fungsi untuk mengambil data berdasarkan ID dari koleksi tertentu
export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
}

// Fungsi untuk mendaftar pengguna baru
export async function signUp(userData: {
    email: string;
    password: string;
    fullname: string;
    phone: string;
    role?: string;
}, callback: Function) {
    try {
        // Query untuk mengecek apakah email sudah terdaftar
        const q = query(
            collection(firestore, 'users'),
            where('email', '==', userData.email)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        if (data.length > 0) {
            // Jika email sudah terdaftar
            callback(false);
        } else {
            // Jika email belum terdaftar, set default role jika tidak ada
            if (!userData.role) {
                userData.role = 'member';
            }

            // Tambah pengguna baru ke koleksi 'users'
            await addDoc(collection(firestore, 'users'), userData);
            callback(true);
        }
    } catch (error) {
        // Tangani error dan panggil callback dengan false
        callback(false);
        console.log(error);
    }
}
