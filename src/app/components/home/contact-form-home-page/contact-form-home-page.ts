import { AfterViewInit, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form-home-page',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form-home-page.html',
  styleUrl: './contact-form-home-page.css',
})
export class ContactFormHomePage implements AfterViewInit {
  private fb = inject(FormBuilder);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);

  protected readonly submitting = signal(false);
  protected readonly sent = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[0-9+\s()-]{7,20}$/)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected invalid(name: 'name' | 'email' | 'phone' | 'message'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    try {
      const response = await fetch('https://formspree.io/f/maeoyjol', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.form.getRawValue())
      });

      if (response.ok) {
        this.sent.set(true);
        this.form.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          this.errorMessage.set(data.errors.map((error: any) => error.message).join(', '));
        } else {
          this.errorMessage.set('Oops! There was a problem submitting your form.');
        }
      }
    } catch (error) {
      this.errorMessage.set('Network error. Please check your connection and try again.');
    } finally {
      this.submitting.set(false);
    }
  }

  protected sendAnother(): void {
    this.sent.set(false);
    this.errorMessage.set(null);
  }

  /** Scroll-reveal: every `.anim` element animates in when it enters the viewport. */
  ngAfterViewInit() {
    const els = this.host.nativeElement.querySelectorAll<HTMLElement>('.anim');
    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((e) => e.classList.add('anim-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    els.forEach((e) => io.observe(e));
    this.destroyRef.onDestroy(() => io.disconnect());
  }
}