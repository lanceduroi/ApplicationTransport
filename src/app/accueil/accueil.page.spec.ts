import { ComponentFixture, TestBed } from '@angular/core/testing';
import { accueilPage } from './accueil.page';

describe('accueilPage', () => {
  let component: accueilPage;
  let fixture: ComponentFixture<accueilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(accueilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
