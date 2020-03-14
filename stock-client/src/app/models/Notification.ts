import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from '@angular/animations';

export interface ToastDetails {
  message?: string;
  details?: string;
}


export const toastAnimation: AnimationTriggerMetadata = trigger('toast',
  [
    state('show', style({
      bottom: '40px'
    })),
    state('hide', style({
      bottom: '-100%'
    })),
    transition('hide => show', animate('1s ease')),
    transition('show => hide', animate('1s ease'))
  ]
);
