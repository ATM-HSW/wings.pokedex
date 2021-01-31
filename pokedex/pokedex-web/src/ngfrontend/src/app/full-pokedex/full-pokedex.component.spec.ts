import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPokedexComponent } from './full-pokedex.component';

describe('FullPokedexComponent', () => {
  let component: FullPokedexComponent;
  let fixture: ComponentFixture<FullPokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullPokedexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
