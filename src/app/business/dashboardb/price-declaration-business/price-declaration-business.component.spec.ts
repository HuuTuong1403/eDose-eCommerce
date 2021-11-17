import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDeclarationBusinessComponent } from './price-declaration-business.component';

describe('PriceDeclarationBusinessComponent', () => {
  let component: PriceDeclarationBusinessComponent;
  let fixture: ComponentFixture<PriceDeclarationBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceDeclarationBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDeclarationBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
