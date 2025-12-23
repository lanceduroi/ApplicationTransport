import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatecomptePage } from './createcompte.page';

describe('CreatecomptePage', () => {
  let component: CreatecomptePage;
  let fixture: ComponentFixture<CreatecomptePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecomptePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
