import { Injectable } from '@angular/core';
import { Excercise } from './excercise.model';
import { Observable, Subject } from 'rxjs';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import {
  CollectionReference,
  DocumentData,
  collection,
  deleteDoc,
  doc,
} from '@firebase/firestore';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private availableExercises: Excercise[] = [];

  private availableExerciseCollection: CollectionReference<DocumentData>;
  private finishedExerciseCollection: CollectionReference<DocumentData>;

  public exerciseChanged = new Subject<Excercise>();
  public finishedExerciseChanged = new Subject<Excercise[]>();
  public runningExercise: Excercise;
  private exercises: Excercise[];
  public fetchedUserId: string;

  constructor(private db: Firestore, public authService: AuthServiceService) {
    this.availableExerciseCollection = collection(
      this.db,
      'availableExercises'
    );
    this.finishedExerciseCollection = collection(this.db, 'fineshedExercise');

    this.authService.userId.subscribe((data) => {
      this.fetchedUserId = data;
    });
  }

  public fetchAvailableExercise() {
    return collectionData(this.availableExerciseCollection, {
      idField: 'id',
    }) as Observable<Excercise[]>;
  }

  private AdddatatoDatabase(exercise: Excercise) {
    return addDoc(this.finishedExerciseCollection, exercise);
  }

  public fetchexerciseforuser() {
    const q: any = query(
      this.finishedExerciseCollection,
      where('userid', '==', localStorage.getItem('userId'))
    );
    return collectionData(q, { idField: 'documentId' }) as Observable<
      Excercise[]
    >;
  }

  public fetchFinishedExercise() {
    return collectionData(this.finishedExerciseCollection, {}) as Observable<
      Excercise[]
    >;
  }

  public deleteExercise(id: string) {
    const delstring: DocumentReference = doc(
      this.finishedExerciseCollection,
      id.toString()
    );
    deleteDoc(delstring)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }

  startExcercise(selectedId: string, data: Excercise[]) {
    this.availableExercises = data;
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.authService.userId.subscribe((data) => {
      this.fetchedUserId = data;
    });
    this.AdddatatoDatabase({
      ...this.runningExercise,
      date: new Date().toDateString(),
      state: 'completed',
      userid: localStorage.getItem('userId'),
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelledExercise(progress: number) {
    this.authService.userId.subscribe((data) => {
      this.fetchedUserId = data;
    });
    this.AdddatatoDatabase({
      ...this.runningExercise,
      date: new Date().toDateString(),
      state: 'cancelled',
      duration: this.runningExercise.duration * (progress / 100),
      calories: (
        (this.runningExercise.calories / 100) *
        (this.runningExercise.duration * (progress / 100))
      ).toFixed(1),
      userid: localStorage.getItem('userId'),
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedandCancelledExercise(): any {
    this.fetchexerciseforuser().subscribe((data) => {
      this.finishedExerciseChanged.next(data);
    }),
      (error) => {
        alert('Session Expired, Login Again With Valid Credentials');
      };
  }
}
