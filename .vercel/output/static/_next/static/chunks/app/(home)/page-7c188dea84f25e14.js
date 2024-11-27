(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [608],
  {
    873: function (t, e, r) {
      Promise.resolve().then(r.bind(r, 78482));
    },
    98489: function (t, e, r) {
      'use strict';
      r.d(e, {
        Z: function () {
          return b;
        },
      });
      var a = r(74610),
        n = r(1119),
        s = r(2265),
        i = r(61994),
        o = r(50738),
        c = r(20801),
        l = r(53004),
        d = r(20956),
        p = r(92193),
        h = r(1570),
        u = r(57437);
      let x = ['className', 'component', 'disableGutters', 'fixed', 'maxWidth', 'classes'],
        m = (0, h.Z)(),
        g = (0, p.Z)('div', {
          name: 'MuiContainer',
          slot: 'Root',
          overridesResolver: (t, e) => {
            let { ownerState: r } = t;
            return [
              e.root,
              e['maxWidth'.concat((0, l.Z)(String(r.maxWidth)))],
              r.fixed && e.fixed,
              r.disableGutters && e.disableGutters,
            ];
          },
        }),
        f = (t) => (0, d.Z)({ props: t, name: 'MuiContainer', defaultTheme: m }),
        k = (t, e) => {
          let { classes: r, fixed: a, disableGutters: n, maxWidth: s } = t,
            i = {
              root: [
                'root',
                s && 'maxWidth'.concat((0, l.Z)(String(s))),
                a && 'fixed',
                n && 'disableGutters',
              ],
            };
          return (0, c.Z)(i, (t) => (0, o.ZP)(e, t), r);
        };
      var y = r(85657),
        v = r(16210),
        j = r(37053),
        b = (function () {
          let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            {
              createStyledComponent: e = g,
              useThemeProps: r = f,
              componentName: o = 'MuiContainer',
            } = t,
            c = e(
              (t) => {
                let { theme: e, ownerState: r } = t;
                return (0, n.Z)(
                  {
                    width: '100%',
                    marginLeft: 'auto',
                    boxSizing: 'border-box',
                    marginRight: 'auto',
                    display: 'block',
                  },
                  !r.disableGutters && {
                    paddingLeft: e.spacing(2),
                    paddingRight: e.spacing(2),
                    [e.breakpoints.up('sm')]: {
                      paddingLeft: e.spacing(3),
                      paddingRight: e.spacing(3),
                    },
                  }
                );
              },
              (t) => {
                let { theme: e, ownerState: r } = t;
                return (
                  r.fixed &&
                  Object.keys(e.breakpoints.values).reduce((t, r) => {
                    let a = e.breakpoints.values[r];
                    return (
                      0 !== a &&
                        (t[e.breakpoints.up(r)] = {
                          maxWidth: ''.concat(a).concat(e.breakpoints.unit),
                        }),
                      t
                    );
                  }, {})
                );
              },
              (t) => {
                let { theme: e, ownerState: r } = t;
                return (0, n.Z)(
                  {},
                  'xs' === r.maxWidth && {
                    [e.breakpoints.up('xs')]: { maxWidth: Math.max(e.breakpoints.values.xs, 444) },
                  },
                  r.maxWidth &&
                    'xs' !== r.maxWidth && {
                      [e.breakpoints.up(r.maxWidth)]: {
                        maxWidth: ''
                          .concat(e.breakpoints.values[r.maxWidth])
                          .concat(e.breakpoints.unit),
                      },
                    }
                );
              }
            );
          return s.forwardRef(function (t, e) {
            let s = r(t),
              {
                className: l,
                component: d = 'div',
                disableGutters: p = !1,
                fixed: h = !1,
                maxWidth: m = 'lg',
              } = s,
              g = (0, a.Z)(s, x),
              f = (0, n.Z)({}, s, { component: d, disableGutters: p, fixed: h, maxWidth: m }),
              y = k(f, o);
            return (0, u.jsx)(
              c,
              (0, n.Z)({ as: d, ownerState: f, className: (0, i.Z)(y.root, l), ref: e }, g)
            );
          });
        })({
          createStyledComponent: (0, v.ZP)('div', {
            name: 'MuiContainer',
            slot: 'Root',
            overridesResolver: (t, e) => {
              let { ownerState: r } = t;
              return [
                e.root,
                e['maxWidth'.concat((0, y.Z)(String(r.maxWidth)))],
                r.fixed && e.fixed,
                r.disableGutters && e.disableGutters,
              ];
            },
          }),
          useThemeProps: (t) => (0, j.i)({ props: t, name: 'MuiContainer' }),
        });
    },
    57784: function (t, e, r) {
      'use strict';
      r.d(e, {
        Ir: function () {
          return l;
        },
        GW: function () {
          return a;
        },
      });
      let a = { root: 'mnl__icon__root', flag: 'mnl__icon__flag' };
      var n = r(57437),
        s = r(2265),
        i = r(59646),
        o = r(63832),
        c = r(53610);
      let l = (0, s.forwardRef)((t, e) => {
        let { className: r, width: s = 20, sx: l, ...d } = t,
          p = { width: s, height: s, flexShrink: 0, display: 'inline-flex' },
          h = (0, n.jsx)(o.Z, {
            component: 'span',
            className: a.root.concat(r ? ' '.concat(r) : ''),
            sx: { ...p, ...l },
          });
        return (0, n.jsx)(c.Z, {
          fallback: h,
          children: (0, n.jsx)(o.Z, {
            ssr: !0,
            ref: e,
            component: i.JO,
            className: a.root.concat(r ? ' '.concat(r) : ''),
            sx: { ...p, ...l },
            ...d,
          }),
        });
      });
      (0, i.Qb)('local');
    },
    47631: function (t, e, r) {
      'use strict';
      r.d(e, {
        h: function () {
          return o;
        },
        i: function () {
          return a;
        },
      });
      let a = { root: 'mnl__svg__color__root' };
      var n = r(57437),
        s = r(2265),
        i = r(63832);
      let o = (0, s.forwardRef)((t, e) => {
        let { src: r, width: s = 24, height: o, className: c, sx: l, ...d } = t;
        return (0, n.jsx)(i.Z, {
          ref: e,
          component: 'span',
          className: a.root.concat(c ? ' '.concat(c) : ''),
          sx: {
            width: s,
            flexShrink: 0,
            height: null != o ? o : s,
            display: 'inline-flex',
            bgcolor: 'currentColor',
            mask: 'url('.concat(r, ') no-repeat center / contain'),
            WebkitMask: 'url('.concat(r, ') no-repeat center / contain'),
            ...l,
          },
          ...d,
        });
      });
    },
    78482: function (t, e, r) {
      'use strict';
      r.r(e),
        r.d(e, {
          HomeView: function () {
            return X;
          },
        });
      var a = r(57437),
        n = r(47546),
        s = r(51351),
        i = r(2265),
        o = r(88843);
      let c = (t) => t && 'object' == typeof t && t.mix,
        l = (t) => (c(t) ? t.mix : void 0);
      var d = r(81906),
        p = r(11534),
        h = r(45414);
      function u(t, e) {
        let r = (0, d.c)(e()),
          a = () => r.set(e());
        return (
          a(),
          (0, p.L)(() => {
            let e = () => h.Wi.preRender(a, !1, !0),
              r = t.map((t) => t.on('change', e));
            return () => {
              r.forEach((t) => t()), (0, h.Pn)(a);
            };
          }),
          r
        );
      }
      var x = r(53576),
        m = r(3078);
      function g(t, e, r, a) {
        if ('function' == typeof t)
          return (function (t) {
            (m.S1.current = []), t();
            let e = u(m.S1.current, t);
            return (m.S1.current = void 0), e;
          })(t);
        let n =
          'function' == typeof e
            ? e
            : (function (...t) {
                let e = !Array.isArray(t[0]),
                  r = e ? 0 : -1,
                  a = t[0 + r],
                  n = t[1 + r],
                  s = t[2 + r],
                  i = t[3 + r],
                  c = (0, o.s)(n, s, { mixer: l(s[0]), ...i });
                return e ? c(a) : c;
              })(e, r, a);
        return Array.isArray(t) ? f(t, n) : f([t], ([t]) => n(t));
      }
      function f(t, e) {
        let r = (0, x.h)(() => []);
        return u(t, () => {
          r.length = 0;
          let a = t.length;
          for (let e = 0; e < a; e++) r[e] = t[e].get();
          return e(r);
        });
      }
      var k = r(20799),
        y = r(85318),
        v = r(7066),
        j = r(72934),
        b = r(63832),
        w = r(63582),
        Z = r(76631),
        C = r(98489),
        _ = r(31691),
        W = r(46387),
        F = r(1269),
        S = r(22010),
        M = r(43073),
        D = r(57784),
        R = r(47631),
        O = r(72337);
      function I(t) {
        let { strokeCount: e } = t,
          r = {
            hidden: { x2: 0, strokeOpacity: 0 },
            visible: (t) => {
              let e = 1 + 0.5 * t;
              return {
                x2: '100%',
                strokeOpacity: 1,
                transition: {
                  strokeOpacity: { delay: e, duration: 0.01 },
                  x2: { delay: e, bounce: 0, duration: 1.5, type: 'spring' },
                },
              };
            },
          },
          n = {
            hidden: { y2: 0, strokeOpacity: 0 },
            visible: (t) => {
              let e = 1 + 0.5 * t;
              return {
                y2: '100%',
                strokeOpacity: 1,
                transition: {
                  strokeOpacity: { delay: e, duration: 0.01 },
                  y2: { delay: e, bounce: 0, duration: 1.5, type: 'spring' },
                },
              };
            },
          },
          s = (t) =>
            e / 2 > t
              ? 'translateY(calc((('.concat(
                  t,
                  ' * var(--stroke-spacing)) + var(--stroke-spacing) / 2) * -1))'
                )
              : 'translateY(calc((('.concat(
                  e - (t + 1),
                  ' * var(--stroke-spacing)) + var(--stroke-spacing) / 2)))'
                ),
          i = (0, a.jsx)(a.Fragment, {
            children: [...Array(e)].map((t, e) =>
              (0, a.jsx)(
                k.m.line,
                {
                  x1: '0',
                  x2: '100%',
                  y1: '50%',
                  y2: '50%',
                  variants: r,
                  style: {
                    transform: s(e),
                    stroke: 'var(--hero-line-stroke-color)',
                    strokeDasharray: 'var(--stroke-dasharray)',
                    strokeWidth: 'var(--hero-line-stroke-width)',
                  },
                },
                e
              )
            ),
          }),
          o = (t) =>
            e / 2 > t
              ? 'translateX(calc((('.concat(
                  t,
                  ' * var(--stroke-spacing)) + var(--stroke-spacing) / 2) * -1))'
                )
              : 'translateX(calc((('.concat(
                  e - (t + 1),
                  ' * var(--stroke-spacing)) + var(--stroke-spacing) / 2)))'
                ),
          c = (0, a.jsx)(a.Fragment, {
            children: [...Array(e)].map((t, e) =>
              (0, a.jsx)(
                k.m.line,
                {
                  x1: '50%',
                  x2: '50%',
                  y1: '0%',
                  y2: '100%',
                  variants: n,
                  style: {
                    transform: o(e),
                    stroke: 'var(--hero-line-stroke-color)',
                    strokeDasharray: 'var(--stroke-dasharray)',
                    strokeWidth: 'var(--hero-line-stroke-width)',
                  },
                },
                e
              )
            ),
          });
        return (0, a.jsxs)(a.Fragment, { children: [i, c] });
      }
      function N() {
        let t = {
          hidden: { opacity: 0 },
          visible: (t) => ({
            opacity: 1,
            transition: { opacity: { delay: 1 + 0.5 * t, duration: 0.01 } },
          }),
        };
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(k.m.path, {
              variants: t,
              d: 'M1 41C1 63.0914 18.9086 81 41 81C63.0914 81 81 63.0914 81 41C81 18.9086 63.0914 1 41 1',
              style: {
                strokeDasharray: 'var(--stroke-dasharray)',
                stroke: 'var(--hero-circle-stroke-color)',
                strokeWidth: 'var(--hero-circle-stroke-width)',
                transform: 'translate(calc(50% - 480px), calc(50% - 80px))',
              },
            }),
            (0, a.jsx)(k.m.path, {
              variants: t,
              d: 'M1 41C1 63.0914 18.9086 81 41 81C63.0914 81 81 63.0914 81 41C81 18.9086 63.0914 1 41 1',
              style: {
                strokeDasharray: 'var(--stroke-dasharray)',
                stroke: 'var(--hero-circle-stroke-color)',
                strokeWidth: 'var(--hero-circle-stroke-width)',
                transform: 'translate(calc(50% + 400px), calc(50% + 80px))',
              },
            }),
            (0, a.jsx)(k.m.circle, {
              cx: '50%',
              cy: '50%',
              fill: 'var(--hero-circle-stroke-color)',
              style: { transform: 'translate(calc(0% - 200px), calc(0% + 200px))' },
              initial: { r: 0 },
              animate: { r: 5 },
            }),
          ],
        });
      }
      function z() {
        let t = {
          hidden: { opacity: 0, pathLength: 0 },
          visible: (t) => {
            let e = 1 + 0.5 * t;
            return {
              opacity: 1,
              pathLength: 1,
              transition: {
                opacity: { delay: e, duration: 0.01 },
                pathLength: { delay: e, bounce: 0, duration: 1.5, type: 'spring' },
              },
            };
          },
        };
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(k.m.path, {
              variants: t,
              d: 'M8 0V16M16 8.08889H0',
              stroke: 'var(--hero-plus-stroke-color)',
              style: { transform: 'translate(calc(50% - 448px), calc(50% - 128px))' },
            }),
            (0, a.jsx)(k.m.path, {
              variants: t,
              d: 'M8 0V16M16 8.08889H0',
              stroke: 'var(--hero-plus-stroke-color)',
              style: { transform: 'translate(calc(50% + 432px), calc(50% + 192px))' },
            }),
          ],
        });
      }
      function A(t) {
        let { sx: e, ...r } = t;
        return (0, a.jsx)(b.Z, {
          component: k.m.div,
          variants: (0, O.EU)().in,
          sx: { left: 0, width: 1, bottom: 0, height: 200, position: 'absolute', ...e },
          ...r,
          children: (0, a.jsx)(b.Z, {
            component: 'svg',
            width: '100%',
            height: '100%',
            sx: {
              '& text': {
                fill: 'none',
                fontSize: 200,
                fontWeight: 800,
                strokeDasharray: 4,
                textTransform: 'uppercase',
                stroke: 'var(--hero-text-stroke-color)',
                strokeWidth: 'var(--hero-text-stroke-width)',
                fontFamily: (t) => t.typography.fontSecondaryFamily,
              },
            },
            children: (0, a.jsx)(k.m.text, {
              x: '0',
              y: '12px',
              dominantBaseline: 'hanging',
              animate: { x: ['0%', '-50%'] },
              transition: { duration: 64, ease: 'linear', repeat: 1 / 0 },
              children: 'unicamp academy',
            }),
          }),
        });
      }
      function G(t) {
        let { color: e = 'primary', animate: r, transition: n, sx: s, ...i } = t;
        return (0, a.jsx)(b.Z, {
          component: k.m.div,
          variants: {
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { duration: 0.64, ease: [0.43, 0.13, 0.23, 0.96] } },
          },
          sx: { width: 12, height: 12, top: '50%', left: '50%', position: 'absolute', ...s },
          ...i,
          children: (0, a.jsx)(b.Z, {
            component: k.m.div,
            animate: r,
            transition:
              null != n ? n : { duration: 6, ease: 'linear', repeat: 1 / 0, repeatType: 'reverse' },
            sx: {
              width: 1,
              height: 1,
              borderRadius: '50%',
              boxShadow: (t) => '0px -2px 4px 0px '.concat(t.vars.palette[e].main, ' inset'),
              background: (t) =>
                'linear-gradient(135deg, '
                  .concat(t.vars.palette[e].lighter, ', ')
                  .concat(t.vars.palette[e].light, ')'),
              [M.s4.dark]: {
                boxShadow: (t) => '0px -2px 4px 0px '.concat(t.vars.palette[e].dark, ' inset'),
              },
              ...s,
            },
          }),
        });
      }
      function H() {
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(G, {
              color: 'warning',
              animate: { x: 24 },
              sx: {
                width: 14,
                height: 14,
                transform: 'translate(calc(50% - 457px), calc(50% - 259px))',
              },
            }),
            (0, a.jsx)(G, {
              color: 'warning',
              animate: { y: 24 },
              sx: { transform: 'translate(calc(50% - 356px), calc(50% + 37px))' },
            }),
            (0, a.jsx)(G, {
              color: 'secondary',
              animate: { x: 24 },
              sx: { transform: 'translate(calc(50% + 332px), calc(50% + 135px))' },
            }),
            (0, a.jsx)(G, {
              color: 'warning',
              animate: { x: 24 },
              sx: { transform: 'translate(calc(50% + 430px), calc(50% - 160px))' },
            }),
            (0, a.jsx)(G, {
              color: 'primary',
              animate: { y: 24 },
              sx: { transform: 'translate(calc(50% + 136px), calc(50% + 332px))' },
            }),
          ],
        });
      }
      function P(t) {
        let { sx: e, ...r } = t,
          n = (0, _.Z)(),
          s = (0, F.F)('up', 'md');
        return (0, a.jsxs)(b.Z, {
          component: O.NM,
          sx: {
            '--stroke-dasharray': 3,
            '--stroke-spacing': '80px',
            '--hero-line-stroke-width': 1,
            '--hero-line-stroke-color': (0, M.jr)(n.vars.palette.grey['500Channel'], 0.32),
            [M.s4.dark]: {
              '--hero-line-stroke-color': (0, M.jr)(n.vars.palette.grey['600Channel'], 0.16),
            },
            '--hero-text-stroke-width': 1,
            '--hero-text-stroke-color': (0, M.jr)(n.vars.palette.grey['500Channel'], 0.24),
            [M.s4.dark]: {
              '--hero-text-stroke-color': (0, M.jr)(n.vars.palette.grey['600Channel'], 0.12),
            },
            '--hero-circle-stroke-width': 1,
            '--hero-circle-stroke-color': (0, M.jr)(n.vars.palette.grey['500Channel'], 0.48),
            [M.s4.dark]: {
              '--hero-circle-stroke-color': (0, M.jr)(n.vars.palette.grey['600Channel'], 0.24),
            },
            '--hero-plus-stroke-color': n.vars.palette.text.disabled,
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            position: 'absolute',
            ...e,
          },
          ...r,
          children: [
            (0, a.jsx)(H, {}),
            s && (0, a.jsx)(A, {}),
            (0, a.jsxs)(b.Z, {
              component: k.m.svg,
              xmlns: 'http://www.w3.org/2000/svg',
              width: '1440',
              height: '1080',
              fill: 'none',
              viewBox: '0 0 1440 1080',
              initial: 'hidden',
              animate: 'visible',
              sx: { width: 1, height: 1 },
              children: [
                (0, a.jsxs)('defs', {
                  children: [
                    (0, a.jsxs)('radialGradient', {
                      id: 'mask_gradient_id',
                      cx: '0',
                      cy: '0',
                      r: '1',
                      gradientTransform: 'matrix(720 0 0 420 720 560)',
                      gradientUnits: 'userSpaceOnUse',
                      children: [
                        (0, a.jsx)('stop', { offset: '0%', stopColor: '#FFFFFF', stopOpacity: 1 }),
                        (0, a.jsx)('stop', {
                          offset: '100%',
                          stopColor: '#FFFFFF',
                          stopOpacity: 0.08,
                        }),
                      ],
                    }),
                    (0, a.jsx)('mask', {
                      id: 'mask_id',
                      children: (0, a.jsx)('ellipse', {
                        cx: '50%',
                        cy: '50%',
                        rx: '50%',
                        ry: '36%',
                        fill: 'url(#mask_gradient_id)',
                      }),
                    }),
                  ],
                }),
                (0, a.jsxs)('g', {
                  mask: 'url(#mask_id)',
                  children: [
                    (0, a.jsx)(N, {}),
                    (0, a.jsx)(z, {}),
                    (0, a.jsx)(I, { strokeCount: 12 }),
                  ],
                }),
              ],
            }),
            (0, a.jsx)(b.Z, {
              component: k.m.div,
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              sx: {
                top: 0,
                left: 0,
                width: 1,
                height: 1,
                zIndex: -1,
                position: 'absolute',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: 'linear-gradient(180deg, '
                  .concat(n.vars.palette.background.default, ' 12%, ')
                  .concat((0, M.jr)(n.vars.palette.background.defaultChannel, 0.92), ' 50%, ')
                  .concat(n.vars.palette.background.default, " 88%), url('")
                  .concat(S.k.assetsDir, "/assets/background/background-3.webp')"),
                [M.s4.dark]: {
                  backgroundImage: "url('"
                    .concat(
                      S.k.assetsDir,
                      "/assets/images/home/hero-blur.webp'), linear-gradient(180deg, "
                    )
                    .concat(n.vars.palette.background.default, ' 12%, ')
                    .concat((0, M.jr)(n.vars.palette.background.defaultChannel, 0.96), ' 50%, ')
                    .concat(n.vars.palette.background.default, " 88%), url('")
                    .concat(S.k.assetsDir, "/assets/background/background-3.webp')"),
                },
              },
            }),
          ],
        });
      }
      function T(t) {
        return 1 === String(t).length ? '0'.concat(t) : ''.concat(t);
      }
      var Y = r(46214);
      function E(t) {
        let { sx: e, ...r } = t,
          n = (0, _.Z)(),
          s = (function () {
            let t = (0, i.useRef)(null),
              { scrollY: e } = (0, v.v)(),
              [r, a] = (0, i.useState)(0);
            return (
              (0, j.W)(e, 'change', (e) => {
                let r = 0;
                t.current && (r = t.current.offsetHeight);
                let n = Math.floor((e / r) * 100);
                n >= 100 ? a(100) : a(Math.floor(n));
              }),
              { elementRef: t, percent: r, scrollY: e }
            );
          })(),
          o = (function (t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '- -',
              [r, a] = (0, i.useState)({ days: e, hours: e, minutes: e, seconds: e }),
              n = (0, i.useCallback)(() => {
                let {
                  days: e,
                  hours: r,
                  minutes: n,
                  seconds: s,
                } = (function (t, e) {
                  let r = t.getTime() - e.getTime();
                  return {
                    days: Math.floor(r / 864e5),
                    hours: Math.floor((r % 864e5) / 36e5),
                    minutes: Math.floor((r % 36e5) / 6e4),
                    seconds: Math.floor((r % 6e4) / 1e3),
                  };
                })(t, new Date());
                a({ days: T(e), hours: T(r), minutes: T(n), seconds: T(s) });
              }, [t]);
            return (
              (0, i.useEffect)(() => {
                n();
                let t = setInterval(n, 1e3);
                return () => clearInterval(t);
              }, []),
              r
            );
          })(new Date('2024-11-04 08:00')),
          c = (0, F.F)('up', 'md'),
          l = c ? s.percent : 0,
          d = U(s.scrollY, -7 * l),
          p = U(s.scrollY, -6 * l),
          h = U(s.scrollY, -5 * l),
          u = U(s.scrollY, -4 * l),
          x = g(s.scrollY, [0, 1], [1, c ? Number((1 - s.percent / 100).toFixed(1)) : 1]),
          m = (0, a.jsx)(L, {
            children: (0, a.jsxs)(b.Z, {
              component: 'h1',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              sx: {
                ...n.typography.h2,
                my: 0,
                mx: 'auto',
                maxWidth: 680,
                fontFamily: n.typography.fontSecondaryFamily,
                [n.breakpoints.up('lg')]: { fontSize: 72, lineHeight: '90px' },
              },
              children: [
                (0, a.jsx)(b.Z, {
                  component: 'span',
                  sx: { width: 1, opacity: 0.24 },
                  children: 'Užtikrintas kelias',
                }),
                'į IT rinką su',
                ' ',
                (0, a.jsx)(b.Z, {
                  component: k.m.span,
                  animate: { backgroundPosition: '200% center' },
                  transition: {
                    duration: 20,
                    ease: 'linear',
                    repeat: 1 / 0,
                    repeatType: 'reverse',
                  },
                  sx: {
                    ...(0, M.XK)(
                      '300deg, '
                        .concat(n.vars.palette.primary.main, ' 0%, ')
                        .concat(n.vars.palette.warning.main, ' 25%, ')
                        .concat(n.vars.palette.primary.main, ' 50%, ')
                        .concat(n.vars.palette.warning.main, ' 75%, ')
                        .concat(n.vars.palette.primary.main, ' 100%')
                    ),
                    backgroundSize: '400%',
                    ml: { xs: 0.75, md: 1, xl: 1.5 },
                  },
                  children: 'unicamp',
                }),
              ],
            }),
          }),
          f = (0, a.jsx)(L, {
            children: (0, a.jsx)(W.Z, {
              variant: 'body2',
              sx: {
                mx: 'auto',
                [n.breakpoints.up('sm')]: { whiteSpace: 'pre' },
                [n.breakpoints.up('lg')]: { fontSize: 20, lineHeight: '36px' },
              },
              children:
                'Jokių pažadų apie greitus rezultatus. \nRealūs projektai, komandinė patirtis, 1:1 konsultacijos ir top specialistai.',
            }),
          }),
          y = (0, a.jsx)(L, {
            children: (0, a.jsxs)(b.Z, {
              children: [
                (0, a.jsx)(W.Z, {
                  variant: 'body1',
                  sx: { color: 'text.secondary', typography: 'body1' },
                  children: 'Naujos akademijos startas už',
                }),
                (0, a.jsxs)(w.Z, {
                  direction: 'row',
                  justifyContent: 'center',
                  divider: (0, a.jsx)(b.Z, { sx: { mx: { xs: 1, sm: 2.5 } }, children: ':' }),
                  sx: { typography: 'h2' },
                  children: [
                    (0, a.jsx)(V, { label: 'dienos', value: o.days }),
                    (0, a.jsx)(V, { label: 'valandos', value: o.hours }),
                    (0, a.jsx)(V, { label: 'minutės', value: o.minutes }),
                    (0, a.jsx)(V, { label: 'sekundės', value: o.seconds }),
                  ],
                }),
              ],
            }),
          }),
          I = (0, a.jsx)(b.Z, {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 1.5, sm: 2 },
            children: (0, a.jsx)(L, {
              children: (0, a.jsx)(Z.Z, {
                color: 'inherit',
                size: 'large',
                variant: 'contained',
                href: 'mailto:info@unicamp.lt?subject=Registracija į kursus&body=Sveiki,%0D%0A%0D%0Anoriu%20gauti%20nemokamą%20konsultaciją',
                startIcon: (0, a.jsx)(D.Ir, { icon: 'fluent:mail-24-filled' }),
                onClick: () => Y.ZP.capture('hero_cta_clicked'),
                children: 'Gaukite nemokamą IT karjeros konsultaciją',
              }),
            }),
          });
        return (
          w.Z,
          W.Z,
          w.Z,
          ['js', 'ts', 'nextjs', 'vite', 'figma'].map((t) =>
            (0, a.jsx)(
              L,
              {
                children:
                  'nextjs' === t
                    ? (0, a.jsx)(R.h, {
                        src: ''
                          .concat(S.k.assetsDir, '/assets/icons/platforms/ic-')
                          .concat(t, '.svg'),
                        sx: { width: 24, height: 24 },
                      })
                    : (0, a.jsx)(b.Z, {
                        component: 'img',
                        alt: t,
                        src: ''
                          .concat(S.k.assetsDir, '/assets/icons/platforms/ic-')
                          .concat(t, '.svg'),
                        sx: { width: 24, height: 24 },
                      }),
              },
              t
            )
          ),
          (0, a.jsx)(b.Z, {
            ref: s.elementRef,
            component: 'section',
            sx: {
              overflow: 'hidden',
              position: 'relative',
              [n.breakpoints.up('md')]: {
                minHeight: 760,
                height: '100vh',
                maxHeight: 1440,
                display: 'block',
                willChange: 'opacity',
                mt: 'calc(var(--layout-header-desktop-height) * -1)',
              },
              ...e,
            },
            ...r,
            children: (0, a.jsxs)(b.Z, {
              component: k.m.div,
              style: { opacity: x },
              sx: {
                width: 1,
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                transition: n.transitions.create(['opacity']),
                [n.breakpoints.up('md')]: { height: 1, position: 'fixed', maxHeight: 'inherit' },
              },
              children: [
                (0, a.jsxs)(C.Z, {
                  component: O.NM,
                  sx: {
                    py: 3,
                    gap: 5,
                    zIndex: 9,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    [n.breakpoints.up('md')]: {
                      flex: '1 1 auto',
                      justifyContent: 'center',
                      py: 'var(--layout-header-desktop-height)',
                    },
                  },
                  children: [
                    (0, a.jsxs)(w.Z, {
                      spacing: 3,
                      sx: { textAlign: 'center' },
                      children: [
                        (0, a.jsx)(k.m.div, { style: { y: d }, children: m }),
                        (0, a.jsx)(k.m.div, { style: { y: p }, children: f }),
                        (0, a.jsx)(k.m.div, { style: { y: h }, children: y }),
                      ],
                    }),
                    (0, a.jsx)(k.m.div, { style: { y: u }, children: I }),
                  ],
                }),
                (0, a.jsx)(P, {}),
              ],
            }),
          })
        );
      }
      function L(t) {
        let { children: e, component: r = k.m.div } = t;
        return (0, a.jsx)(b.Z, {
          component: r,
          variants: (0, O.EU)({ distance: 24 }).inUp,
          children: e,
        });
      }
      function U(t, e) {
        return (0, y.q)(g(t, [0, 1], [0, e]), {
          mass: 0.1,
          damping: 20,
          stiffness: 300,
          restDelta: 0.001,
        });
      }
      function V(t) {
        let { label: e, value: r } = t;
        return (0, a.jsxs)('div', {
          children: [
            (0, a.jsxs)('div', { children: [' ', r, ' '] }),
            (0, a.jsx)(b.Z, { sx: { color: 'text.secondary', typography: 'body1' }, children: e }),
          ],
        });
      }
      function X() {
        let t = (0, s.Q)();
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(s.A, {
              variant: 'linear',
              progress: t.scrollYProgress,
              sx: { position: 'fixed' },
            }),
            (0, a.jsx)(n.z, {}),
            (0, a.jsx)(E, {}),
          ],
        });
      }
    },
  },
  function (t) {
    t.O(0, [878, 838, 245, 453, 106, 61, 65, 704, 73, 337, 971, 30, 744], function () {
      return t((t.s = 873));
    }),
      (_N_E = t.O());
  },
]);
