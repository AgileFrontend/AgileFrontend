import { TestBed } from '@angular/core/testing';
import { InstantMessagingService } from './instant-messaging.service';
import { Firestore } from '@angular/fire/firestore';
import { DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { AppComponent } from 'src/app/app.component';
import { FirebaseApp } from '@angular/fire/app';

interface FirestoreMock {
  collection: jasmine.Spy<jasmine.Func>;
}

describe('InstantMessagingService', () => {
  let service: InstantMessagingService;
  let firestoreMock: FirestoreMock;

  beforeEach(() => {
    firestoreMock = {
      collection: jasmine.createSpy('collection').and.returnValue({
        addDoc: jasmine.createSpy('addDoc'),
        getDoc: jasmine.createSpy('getDoc'),
        updateDoc: jasmine.createSpy('updateDoc'),
        deleteDoc: jasmine.createSpy('deleteDoc'),
      }) as any, // Casting as 'any' to handle the type mismatch
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: firestoreMock },
        InstantMessagingService,
        { provide: Router, useValue: {} }, // Mock the Router if needed
        { provide: Auth, useValue:{}},
        {provide: FirebaseApp, useValue:{}}
      ],
    });

    service = TestBed.inject(InstantMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#createMessage should return a ref to a doc', async () => {
    const message = {
      senderID: 'senderId',
      recieverIDs: ['receiverId'],
      sentDate: '2023-11-13',
      content: 'Test message',
    };

    const addDocSpy = firestoreMock.collection.and.returnValue({
      addDoc: jasmine.createSpy('addDoc').and.returnValue(Promise.resolve({} as DocumentReference)),
    });

    const result = await service.createMessage(message);

    expect(addDocSpy).toHaveBeenCalledWith(message);
    expect(result).toBeTruthy();
    // You can add more expectations based on your application logic
  });

  it('#readMessage should call getDoc method', async () => {
    const messageRef: DocumentReference = {} as DocumentReference;

    const getDocSpy = firestoreMock.collection.and.returnValue({
      getDoc: jasmine.createSpy('getDoc').and.returnValue(Promise.resolve({})),
    });

    await service.readMessage(messageRef);

    expect(getDocSpy).toHaveBeenCalledWith(messageRef);
    // You can add more expectations based on your application logic
  });
});