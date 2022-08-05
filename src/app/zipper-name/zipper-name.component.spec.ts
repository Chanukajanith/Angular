import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipperNameComponent } from './zipper-name.component';

describe('ZipperNameComponent', () => {
  let component: ZipperNameComponent;
  let fixture: ComponentFixture<ZipperNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipperNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZipperNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
