import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStampComponent } from './upload-stamp.component';

describe('UploadStampComponent', () => {
  let component: UploadStampComponent;
  let fixture: ComponentFixture<UploadStampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadStampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
