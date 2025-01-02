import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMatchDialogComponent } from './new-match-dialog.component';

describe('NewMatchDialogComponent', () => {
  let component: NewMatchDialogComponent;
  let fixture: ComponentFixture<NewMatchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewMatchDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
