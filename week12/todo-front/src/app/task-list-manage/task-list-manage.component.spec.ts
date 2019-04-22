import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListManageComponent } from './task-list-manage.component';

describe('TaskListManageComponent', () => {
  let component: TaskListManageComponent;
  let fixture: ComponentFixture<TaskListManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
