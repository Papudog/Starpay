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
export class CropIncomingComponent implements OnInit, OnDestroy {
  // Inputs
  public crop: InputSignal<Crop> = input.required<Crop>();

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  // Writable signals
  private _amount: WritableSignal<number> = signal(0);
  private _days: WritableSignal<number> = signal(0);

  // Properties
  protected formGroup: FormGroup;
  private _selling: number = 0;
  private _purchase: number = 0;

  // Computed signals
  protected readonly purchase: Signal<number> = computed((): number => this._ammountMultiplier(this._purchase));
  protected readonly selling: Signal<number> = computed((): number => this._ammountMultiplier(this._selling));
  protected readonly isGrowing: Signal<boolean> = computed((): boolean => (this._days() + this.crop().time) <= 28);
  protected readonly daysToGrow: Signal<number> = computed((): number => (this._days() + this.crop().time));
  protected readonly days: Signal<number> = computed((): number => this._days());

  constructor() {
    this.formGroup = this._initForm();

    effect((): void => {
      const purchaseControl = this._getControl('purchase');
      const sellingControl = this._getControl('selling');

      if (purchaseControl) purchaseControl.setValue(this.purchase());
      if (sellingControl) sellingControl.setValue(this.selling());
    });
  }

  // Methods
  private _initForm = (): FormGroup<CropForm> => {
    return new FormGroup<CropForm>({
      amount: new FormControl<number>(0, { validators: [Validators.min(0)], nonNullable: true, }),
      purchase: new FormControl<number>(0, { validators: [Validators.min(0)], nonNullable: true }),
      selling: new FormControl<number>(0, { validators: [Validators.min(0)], nonNullable: true }),
      days: new FormControl<number>(0, { validators: [Validators.min(0)], nonNullable: true }),
    })
  }

  private _ammountMultiplier = (value: number): number => {
    return this._amount() * value;
  }

  private _getControl = (control: string) => {
    return this.formGroup.get(control)
  }

  protected onInputChange = (controlName: keyof CropForm): void => {
    const control = this._getControl(controlName);
    if (control && control.value < 0) control.setValue(0);
  }

  ngOnInit(): void {
    this._selling = this.crop().price;
    this._purchase = this.crop().purchaseValue ?? 0;

    this.subscriptions.add(
      this.formGroup.valueChanges.subscribe(({ amount, days }: Partial<CropForm>) => {
        this._amount.set(Number(amount) ?? 0);
        this._days.set(Number(days) ?? 0);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
