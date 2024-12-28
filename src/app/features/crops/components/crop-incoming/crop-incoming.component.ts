import { AfterViewInit, Component, computed, effect, input, InputSignal, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Crop } from '../../../../core/models/crops.interface';
import { Subscription } from 'rxjs';

interface CropForm {
  amount: FormControl<number>;
  purchase: FormControl<number>;
  selling: FormControl<number>;
  days: FormControl<number>;
}

@Component({
  selector: 'star-crop-incoming',
  imports: [ReactiveFormsModule],
  templateUrl: './crop-incoming.component.html',
  styleUrl: './crop-incoming.component.css'
})
export class CropIncomingComponent implements OnInit, OnDestroy, AfterViewInit {
  public crop: InputSignal<Crop> = input.required<Crop>();

  private subscriptions: Subscription = new Subscription();
  private _amount: WritableSignal<number> = signal(0);
  private _selling: number = 0;
  private _purchase: number = 0;
  private _days: WritableSignal<number> = signal(0);

  protected readonly purchase: Signal<number> =
    computed((): number => this._amount() * this._purchase);
  protected readonly selling: Signal<number> =
    computed((): number => this._amount() * this._selling);

  protected isGrowing: Signal<boolean> =
    computed((): boolean => (this._days() + this.crop().time) <= 28);
  protected daysToGrow: Signal<number> = computed((): number => (this._days() + this.crop().time));
  protected days: Signal<number> = computed((): number => this._days());
  protected formGroup: FormGroup;

  private _incomeEffect = effect((): void => {
    this._getControl('purchase')?.setValue(this.purchase());
    this._getControl('selling')?.setValue(this.selling());
  })
  private _getControl = (control: string) => this.formGroup.get(control);

  protected onInputChange = (controlName: keyof CropForm): void => {
    const control = this._getControl(controlName);
    if (control && control.value < 0)
      control.setValue(0);
  }

  constructor() {
    this.formGroup = new FormGroup<CropForm>({
      amount: new FormControl<number>(0, { validators: [Validators.min(0)], nonNullable: true, }),
      purchase: new FormControl<number>(0, { validators: [Validators.min(0)], nonNullable: true }),
      selling: new FormControl<number>(0, { validators: [Validators.min(0)], nonNullable: true }),
      days: new FormControl<number>(0, { validators: [Validators.min(0)], nonNullable: true }),
    })
  }
  ngAfterViewInit(): void {
    const inputs: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName('input');

    for (let i = 0; i++;) {
      inputs[i].addEventListener('focus', (event) => {
        inputs[i].blur();
      })
    }
  }

  ngOnInit(): void {
    this._selling = this.crop().price;
    this._purchase = this.crop().purchaseValue as number;
    this.subscriptions.add(
      this.formGroup.valueChanges.subscribe((formControl: CropForm): void => {
        if (!formControl) return;
        const { amount, days } = formControl;
        this._amount.set(Number(amount) ?? 0);
        this._days.set(Number(days) ?? 0);
      })
    );


  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this._incomeEffect.destroy();
  }
}
