import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  projectForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectname: new FormControl(
        null,
        [Validators.required, this.forbiddenProjectNameTest.bind(this)],
        this.forbiddenProjectTest1.bind(this)
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl('critical'),
    });
  }

  form = {
    projectname: '',
    email: '',
    status: '',
  };

  onSubmit() {
    console.log(this.projectForm.value);
    this.submitted = true;
    this.form.projectname = this.projectForm.value.projectname;
    this.form.email = this.projectForm.value.email;
    this.form.status = this.projectForm.value.status;
    this.projectForm.reset();
  }

  forbiddenProjectNameTest(
    control: FormControl
  ): { [s: string]: boolean } | null {
    if (control.value === 'Test') {
      return { projectNameIsForbidden: true };
    }
    return null;
  }

  forbiddenProjectTest1(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test1') {
          resolve({ projectNameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promise;
  }
}
