import {
  animation,
  trigger,
  animateChild,
  group,
  transition,
  animate,
  style,
  query,
} from '@angular/animations';

export const transitionAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}',
  }),
  animate('{{ time }}'),
]);

// Routable animations
export const slideInAnimation = trigger('routeAnimations', [
  transition('FingerspellingPage <=> FingerspellingDetailPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('800ms ease-out', style({ left: '100%' }))], {
        optional: true,
      }),
      query(':enter', [animate('800ms ease-out', style({ left: '0%' }))], {
        optional: true,
      }),
    ]),
  ]),
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(':enter', [style({ left: '-100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [animate('800ms ease-out', style({ left: '100%', opacity: 0 }))],
        { optional: true }
      ),
      query(':enter', [animate('700ms ease-out', style({ left: '0%' }))], {
        optional: true,
      }),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),
]);

export const zoomFadeAnimation = trigger('routeAnimations', [
  // Zoom-out ao voltar para HomePage
  transition('* => GamesPage', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ opacity: 0, transform: 'scale(0.9)' })], {
      optional: true,
    }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '600ms ease-in',
            style({ opacity: 0, transform: 'scale(0.7)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '600ms ease-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),

  // Zoom-fade padrão para outras rotas
  transition('GamesPage <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ opacity: 0, transform: 'scale(0.8)' })], {
      optional: true,
    }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '800ms ease-out',
            style({ opacity: 0, transform: 'scale(1.2)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '800ms ease-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ],
        { optional: true }
      ),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),
]);

export const directionalSlideAnimation = trigger('routeAnimations', [
  // (⬅️ slide da esquerda) - HomePage
  /*   transition('* => HomePage', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ transform: 'translateX(-100%)', opacity: 0 })], {
      optional: true,
    }),

    group([
      query(
        ':leave',
        [
          animate(
            '500ms ease-out',
            style({ transform: 'translateX(100%)', opacity: 0 })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '500ms ease-out',
            style({ transform: 'translateX(0%)', opacity: 1 })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]), */

  transition('* => HomePage', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ opacity: 0, transform: 'scale(0.9)' })], {
      optional: true,
    }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '600ms ease-in',
            style({ opacity: 0, transform: 'scale(0.7)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '600ms ease-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
  // (➡️ slide da direita) - HomePage
  transition('HomePage => *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ transform: 'translateX(100%)', opacity: 0 })], {
      optional: true,
    }),

    group([
      query(
        ':leave',
        [
          animate(
            '500ms ease-out',
            style({ transform: 'translateX(-100%)', opacity: 0 })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '500ms ease-out',
            style({ transform: 'translateX(0%)', opacity: 1 })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),

  // Zoom-fade padrão para outras rotas
  transition('* => FingerspellingDetailPage', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ opacity: 0, transform: 'scale(0.9)' })], {
      optional: true,
    }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '600ms ease-in',
            style({ opacity: 0, transform: 'scale(0.7)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '600ms ease-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
  // Zoom-fade padrão para outras rotas
  transition('FingerspellingDetailPage <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ opacity: 0, transform: 'scale(0.8)' })], {
      optional: true,
    }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '800ms ease-out',
            style({ opacity: 0, transform: 'scale(1.2)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '800ms ease-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ],
        { optional: true }
      ),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),

  // Zoom-fade padrão para outras rotas
  transition('* => AlphabetDetailPage', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ opacity: 0, transform: 'scale(0.9)' })], {
      optional: true,
    }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '600ms ease-in',
            style({ opacity: 0, transform: 'scale(0.7)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '600ms ease-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
  // Zoom-fade padrão para outras rotas
  transition('AlphabetDetailPage <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ opacity: 0, transform: 'scale(0.8)' })], {
      optional: true,
    }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '800ms ease-out',
            style({ opacity: 0, transform: 'scale(1.2)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '800ms ease-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ],
        { optional: true }
      ),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),

  // Zoom-fade padrão para outras rotas
  transition('* => FingerspellingPage', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ opacity: 0, transform: 'scale(0.9)' })], {
      optional: true,
    }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '600ms ease-in',
            style({ opacity: 0, transform: 'scale(0.7)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '600ms ease-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
  // Zoom-fade padrão para outras rotas
  transition('FingerspellingPage <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ opacity: 0, transform: 'scale(0.8)' })], {
      optional: true,
    }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '800ms ease-out',
            style({ opacity: 0, transform: 'scale(1.2)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '800ms ease-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ],
        { optional: true }
      ),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),

  // Zoom-fade padrão para outras rotas
  transition('* => GamesPage', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ opacity: 0, transform: 'scale(0.9)' })], {
      optional: true,
    }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '600ms ease-in',
            style({ opacity: 0, transform: 'scale(0.7)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '600ms ease-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
  // Zoom-fade padrão para outras rotas
  transition('GamesPage <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ opacity: 0, transform: 'scale(0.8)' })], {
      optional: true,
    }),

    query(':leave', animateChild(), { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '800ms ease-out',
            style({ opacity: 0, transform: 'scale(1.2)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '800ms ease-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ],
        { optional: true }
      ),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),
]);

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
