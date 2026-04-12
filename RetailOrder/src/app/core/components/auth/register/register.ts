import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router ,RouterLink} from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
   private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private router = inject(Router);

    loading = signal(false);
  roles = ['Admin', 'User'];

    
  form:FormGroup= this.fb.group({
    username: ['',[Validators.required]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    role: ['',Validators.required]
  });

  submit():void{
    if(this.form.invalid){
      this.form.markAllAsTouched(); 
      return;
    }
   
    this.loading.set(true);
    this.auth.register(this.form.value).subscribe({
      next: ()=> {
        this.loading.set(false);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}


