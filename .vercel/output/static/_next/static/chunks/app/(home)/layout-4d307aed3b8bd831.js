(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [57],
  {
    12050: function (e, t, a) {
      Promise.resolve().then(a.bind(a, 5424)), Promise.resolve().then(a.bind(a, 50331));
    },
    57784: function (e, t, a) {
      'use strict';
      a.d(t, {
        Ir: function () {
          return c;
        },
        GW: function () {
          return i;
        },
      });
      let i = { root: 'mnl__icon__root', flag: 'mnl__icon__flag' };
      var r = a(57437),
        o = a(2265),
        n = a(59646),
        l = a(63832),
        s = a(53610);
      let c = (0, o.forwardRef)((e, t) => {
        let { className: a, width: o = 20, sx: c, ...d } = e,
          m = { width: o, height: o, flexShrink: 0, display: 'inline-flex' },
          u = (0, r.jsx)(l.Z, {
            component: 'span',
            className: i.root.concat(a ? ' '.concat(a) : ''),
            sx: { ...m, ...c },
          });
        return (0, r.jsx)(s.Z, {
          fallback: u,
          children: (0, r.jsx)(l.Z, {
            ssr: !0,
            ref: t,
            component: n.JO,
            className: i.root.concat(a ? ' '.concat(a) : ''),
            sx: { ...m, ...c },
            ...d,
          }),
        });
      });
      (0, n.Qb)('local');
    },
    60578: function (e, t, a) {
      'use strict';
      a.d(t, {
        T: function () {
          return c;
        },
      });
      var i = a(57437),
        r = a(2265),
        o = a(63832),
        n = a(31691),
        l = a(90495),
        s = a(22010);
      let c = (0, r.forwardRef)((e, t) => {
        let {
          width: a,
          href: r = '/',
          height: c,
          isSingle: d = !0,
          disableLink: m = !1,
          className: u,
          sx: p,
          ...v
        } = e;
        (0, n.Z)();
        let h = (0, i.jsx)(o.Z, {
            alt: 'Single logo',
            component: 'img',
            src: ''.concat(s.k.assetsDir, '/logo/logo-single.svg'),
            width: '100%',
            height: '100%',
          }),
          g = (0, i.jsx)(o.Z, {
            alt: 'Full logo',
            component: 'img',
            src: ''.concat(s.k.assetsDir, '/logo/logo-full.svg'),
            width: '100%',
            height: '100%',
          }),
          f = {
            width: null != a ? a : 40,
            height: null != c ? c : 40,
            ...(!d && { width: null != a ? a : 102, height: null != c ? c : 36 }),
          };
        return (0, i.jsx)(o.Z, {
          ref: t,
          component: l.r,
          href: r,
          className: 'mnl__logo__root'.concat(u ? ' '.concat(u) : ''),
          'aria-label': 'Logo',
          sx: {
            ...f,
            flexShrink: 0,
            display: 'inline-flex',
            verticalAlign: 'middle',
            ...(m && { pointerEvents: 'none' }),
            ...p,
          },
          ...v,
          children: d ? h : g,
        });
      });
    },
    70752: function (e, t, a) {
      'use strict';
      a.d(t, {
        L: function () {
          return l;
        },
      });
      var i = a(57437),
        r = a(2265),
        o = a(19867),
        n = a(63832);
      let l = (0, r.forwardRef)((e, t) => {
        let { slotProps: a, children: r, fillContent: l, sx: s, ...c } = e;
        return (0, i.jsx)(n.Z, {
          component: o.Z,
          scrollableNodeProps: { ref: t },
          clickOnTrack: !1,
          className: 'mnl__scrollbar__root',
          sx: {
            minWidth: 0,
            minHeight: 0,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            '& .simplebar-wrapper': null == a ? void 0 : a.wrapper,
            '& .simplebar-content-wrapper': null == a ? void 0 : a.contentWrapper,
            '& .simplebar-content': {
              ...(l && {
                minHeight: 1,
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
              }),
              ...(null == a ? void 0 : a.content),
            },
            ...s,
          },
          ...c,
          children: r,
        });
      });
    },
    47631: function (e, t, a) {
      'use strict';
      a.d(t, {
        h: function () {
          return l;
        },
        i: function () {
          return i;
        },
      });
      let i = { root: 'mnl__svg__color__root' };
      var r = a(57437),
        o = a(2265),
        n = a(63832);
      let l = (0, o.forwardRef)((e, t) => {
        let { src: a, width: o = 24, height: l, className: s, sx: c, ...d } = e;
        return (0, r.jsx)(n.Z, {
          ref: t,
          component: 'span',
          className: i.root.concat(s ? ' '.concat(s) : ''),
          sx: {
            width: o,
            flexShrink: 0,
            height: null != l ? l : o,
            display: 'inline-flex',
            bgcolor: 'currentColor',
            mask: 'url('.concat(a, ') no-repeat center / contain'),
            WebkitMask: 'url('.concat(a, ') no-repeat center / contain'),
            ...c,
          },
          ...d,
        });
      });
    },
    33228: function (e, t, a) {
      'use strict';
      a.d(t, {
        K: function () {
          return i;
        },
      });
      let i = {
        root: 'layout__root',
        main: 'layout__main',
        header: 'layout__header',
        content: 'layout__main__content',
        hasSidebar: 'layout__has__sidebar',
      };
    },
    89815: function (e, t, a) {
      'use strict';
      a.d(t, {
        S: function () {
          return g;
        },
      });
      var i = a(57437),
        r = a(63832),
        o = a(71495),
        n = a(71004),
        l = a(98489),
        s = a(16210),
        c = a(31691),
        d = a(7066),
        m = a(72934),
        u = a(2265),
        p = a(43073),
        v = a(33228);
      let h = (0, s.ZP)('span')((e) => {
        let { theme: t } = e;
        return {
          left: 0,
          right: 0,
          bottom: 0,
          m: 'auto',
          height: 24,
          zIndex: -1,
          opacity: 0.48,
          borderRadius: '50%',
          position: 'absolute',
          width: 'calc(100% - 48px)',
          boxShadow: t.customShadows.z8,
        };
      });
      function g(e) {
        var t, a;
        let {
            sx: s,
            slots: g,
            slotProps: f,
            disableOffset: b,
            disableElevation: x,
            layoutQuery: y = 'md',
            ...w
          } = e,
          k = (0, c.Z)(),
          { offsetTop: C } = (function () {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              t = (0, u.useRef)(null),
              { scrollY: a } = (0, d.v)(),
              [i, r] = (0, u.useState)(!1),
              o = (0, u.useCallback)(
                (a) => {
                  (null == t ? void 0 : t.current)
                    ? r(Math.round(t.current.getBoundingClientRect().top) < e)
                    : r(Math.round(a) > e);
                },
                [t, e]
              );
            return (
              (0, m.W)(
                a,
                'change',
                (0, u.useMemo)(() => o, [o])
              ),
              (0, u.useMemo)(() => ({ elementRef: t, offsetTop: i }), [i])
            );
          })(),
          j = {
            default: {
              minHeight: 'auto',
              height: 'var(--layout-header-mobile-height)',
              transition: k.transitions.create(['height', 'background-color'], {
                easing: k.transitions.easing.easeInOut,
                duration: k.transitions.duration.shorter,
              }),
              [k.breakpoints.up('sm')]: { minHeight: 'auto' },
              [k.breakpoints.up(y)]: { height: 'var(--layout-header-desktop-height)' },
            },
            offset: {
              ...(0, p.Ls)({ color: (0, p.jr)(k.vars.palette.background.defaultChannel, 0.8) }),
            },
          };
        return (0, i.jsxs)(o.Z, {
          position: 'sticky',
          className: v.K.header,
          sx: { zIndex: 'var(--layout-header-zIndex)', ...s },
          ...w,
          children: [
            null == g ? void 0 : g.topArea,
            (0, i.jsx)(n.Z, {
              disableGutters: !0,
              ...(null == f ? void 0 : f.toolbar),
              sx: {
                ...j.default,
                ...(!b && C && j.offset),
                ...(null == f ? void 0 : null === (t = f.toolbar) || void 0 === t ? void 0 : t.sx),
              },
              children: (0, i.jsxs)(l.Z, {
                ...(null == f ? void 0 : f.container),
                sx: {
                  height: 1,
                  display: 'flex',
                  alignItems: 'center',
                  ...(null == f
                    ? void 0
                    : null === (a = f.container) || void 0 === a
                      ? void 0
                      : a.sx),
                },
                children: [
                  null == g ? void 0 : g.leftArea,
                  (0, i.jsx)(r.Z, {
                    sx: { display: 'flex', flex: '1 1 auto', justifyContent: 'center' },
                    children: null == g ? void 0 : g.centerArea,
                  }),
                  null == g ? void 0 : g.rightArea,
                ],
              }),
            }),
            null == g ? void 0 : g.bottomArea,
            !x && C && (0, i.jsx)(h, {}),
          ],
        });
      }
    },
    48160: function (e, t, a) {
      'use strict';
      a.d(t, {
        P: function () {
          return l;
        },
      });
      var i = a(57437),
        r = a(63832),
        o = a(19026),
        n = a(33228);
      function l(e) {
        let {
            sx: t,
            cssVars: a,
            children: l,
            footerSection: s,
            headerSection: c,
            sidebarSection: d,
          } = e,
          m = (0, i.jsx)(o.Z, {
            styles: {
              body: {
                '--layout-nav-zIndex': 1101,
                '--layout-nav-mobile-width': '320px',
                '--layout-header-blur': '8px',
                '--layout-header-zIndex': 1100,
                '--layout-header-mobile-height': '64px',
                '--layout-header-desktop-height': '72px',
                ...a,
              },
            },
          });
        return (0, i.jsxs)(i.Fragment, {
          children: [
            m,
            (0, i.jsx)(r.Z, {
              id: 'root__layout',
              className: n.K.root,
              sx: t,
              children: d
                ? (0, i.jsxs)(i.Fragment, {
                    children: [
                      d,
                      (0, i.jsxs)(r.Z, {
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        className: n.K.hasSidebar,
                        children: [c, l, s],
                      }),
                    ],
                  })
                : (0, i.jsxs)(i.Fragment, { children: [c, l, s] }),
            }),
          ],
        });
      }
    },
    50331: function (e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, {
          MainLayout: function () {
            return eN;
          },
        });
      var i = a(57437),
        r = a(171),
        o = a(31691),
        n = a(3823),
        l = a(2265),
        s = a(60578),
        c = a(63832),
        d = a(33228);
      function m(e) {
        let { children: t, sx: a, ...r } = e;
        return (0, i.jsx)(c.Z, {
          component: 'main',
          className: d.K.main,
          sx: { display: 'flex', flex: '1 1 auto', flexDirection: 'column', ...a },
          ...r,
          children: t,
        });
      }
      var u = a(63582),
        p = a(47897),
        v = a(43073),
        h = a(16210),
        g = a(19472),
        f = a(90495),
        b = a(57784);
      let x = {
        item: {
          root: 'mnl__nav__item',
          icon: 'mnl__nav__item__icon',
          info: 'mnl__nav__item__info',
          texts: 'mnl__nav__item__texts',
          title: 'mnl__nav__item__title',
          arrow: 'mnl__nav__item__arrow',
          caption: 'mnl__nav__item__caption',
        },
        li: 'mnl__nav__li',
        ul: 'mnl__nav__ul',
      };
      var y = a(47631);
      let w = {
        icon: {
          flexShrink: 0,
          display: 'inline-flex',
          ['& svg, & img, & .'.concat(b.GW.root, ', & .').concat(y.i.root)]: {
            width: '100%',
            height: '100%',
          },
        },
        arrow: { width: 16, height: 16, flexShrink: 0, marginLeft: '6px', display: 'inline-flex' },
        info: {
          fontSize: 12,
          flexShrink: 0,
          fontWeight: 600,
          marginLeft: '6px',
          lineHeight: 1.5,
          display: 'inline-flex',
        },
        noWrap: {
          width: '100%',
          maxWidth: '100%',
          display: 'block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
        disabled: { opacity: 0.48, pointerEvents: 'none' },
      };
      function k(e) {
        let { sx: t, children: a, disabled: r, ...o } = e;
        return (0, i.jsx)(c.Z, {
          component: 'li',
          className: x.li,
          sx: {
            display: 'flex',
            flexDirection: 'column',
            ...(r && { cursor: 'not-allowed' }),
            ...t,
          },
          ...o,
          children: a,
        });
      }
      function C(e) {
        let { children: t, sx: a, ...r } = e;
        return (0, i.jsx)(c.Z, {
          component: 'ul',
          className: x.ul,
          sx: { display: 'flex', flexDirection: 'column', ...a },
          ...r,
          children: t,
        });
      }
      (0, h.ZP)(g.Z, {
        shouldForwardProp: (e) =>
          'active' !== e && 'open' !== e && 'disabled' !== e && 'depth' !== e,
      })((e) => {
        let { active: t, open: a, disabled: i, depth: r, theme: o } = e,
          n = 1 === r,
          l = {
            item: {
              width: '100%',
              borderRadius: 'var(--nav-item-radius)',
              color: 'var(--nav-item-color)',
              '&:hover': { backgroundColor: 'var(--nav-item-hover-bg)' },
            },
            title: {},
            caption: { width: 16, height: 16, color: 'var(--nav-item-caption-color)' },
            icon: { ...w.icon, width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' },
            arrow: { ...w.arrow },
            info: { ...w.info },
          };
        return {
          ...(n && {
            ...l.item,
            textAlign: 'center',
            flexDirection: 'column',
            minHeight: 'var(--nav-item-root-height)',
            padding: 'var(--nav-item-root-padding)',
            ['& .'.concat(x.item.icon)]: { ...l.icon, margin: 'var(--nav-icon-root-margin)' },
            ['& .'.concat(x.item.title)]: {
              ...l.title,
              ...w.noWrap,
              lineHeight: '16px',
              fontSize: o.typography.pxToRem(10),
              fontWeight: t ? o.typography.fontWeightBold : o.typography.fontWeightSemiBold,
            },
            ['& .'.concat(x.item.caption)]: {
              ...l.caption,
              top: 11,
              left: 6,
              position: 'absolute',
            },
            ['& .'.concat(x.item.arrow)]: { ...l.arrow, top: 11, right: 6, position: 'absolute' },
            ['& .'.concat(x.item.info)]: { ...l.info },
            ...(t && {
              color: 'var(--nav-item-root-active-color)',
              backgroundColor: 'var(--nav-item-root-active-bg)',
              '&:hover': { backgroundColor: 'var(--nav-item-root-active-hover-bg)' },
              [v.s4.dark]: { color: 'var(--nav-item-root-active-color-on-dark)' },
            }),
            ...(a && {
              color: 'var(--nav-item-root-open-color)',
              backgroundColor: 'var(--nav-item-root-open-bg)',
            }),
          }),
          ...(!n && {
            ...l.item,
            color: o.vars.palette.text.secondary,
            minHeight: 'var(--nav-item-sub-height)',
            padding: 'var(--nav-item-sub-padding)',
            ['& .'.concat(x.item.icon)]: { ...l.icon, margin: 'var(--nav-icon-sub-margin)' },
            ['& .'.concat(x.item.title)]: {
              ...l.title,
              ...o.typography.body2,
              fontWeight: t ? o.typography.fontWeightSemiBold : o.typography.fontWeightMedium,
              flex: '1 1 auto',
            },
            ['& .'.concat(x.item.caption)]: { ...l.caption },
            ['& .'.concat(x.item.arrow)]: { ...l.arrow, marginRight: o.spacing(-0.5) },
            ['& .'.concat(x.item.info)]: { ...l.info },
            ...(t && {
              color: 'var(--nav-item-sub-active-color)',
              backgroundColor: 'var(--nav-item-sub-active-bg)',
            }),
            ...(a && {
              color: 'var(--nav-item-sub-open-color)',
              backgroundColor: 'var(--nav-item-sub-open-bg)',
            }),
          }),
          ...(i && w.disabled),
        };
      }),
        (0, h.ZP)(g.Z, {
          shouldForwardProp: (e) =>
            'active' !== e && 'open' !== e && 'disabled' !== e && 'depth' !== e,
        })((e) => {
          let { active: t, open: a, disabled: i, depth: r, theme: o } = e,
            n = 1 === r,
            l = {
              item: {
                width: '100%',
                paddingTop: 'var(--nav-item-pt)',
                paddingLeft: 'var(--nav-item-pl)',
                paddingRight: 'var(--nav-item-pr)',
                paddingBottom: 'var(--nav-item-pb)',
                borderRadius: 'var(--nav-item-radius)',
                color: 'var(--nav-item-color)',
                '&:hover': { backgroundColor: 'var(--nav-item-hover-bg)' },
              },
              texts: { minWidth: 0, flex: '1 1 auto' },
              title: {
                ...w.noWrap,
                ...o.typography.body2,
                fontWeight: t ? o.typography.fontWeightSemiBold : o.typography.fontWeightMedium,
              },
              caption: {
                ...w.noWrap,
                ...o.typography.caption,
                color: 'var(--nav-item-caption-color)',
              },
              icon: {
                ...w.icon,
                width: 'var(--nav-icon-size)',
                height: 'var(--nav-icon-size)',
                margin: 'var(--nav-icon-margin)',
              },
              arrow: { ...w.arrow },
              info: { ...w.info },
            };
          return {
            ...(n && {
              ...l.item,
              minHeight: 'var(--nav-item-root-height)',
              ['& .'.concat(x.item.icon)]: { ...l.icon },
              ['& .'.concat(x.item.texts)]: { ...l.texts },
              ['& .'.concat(x.item.title)]: { ...l.title },
              ['& .'.concat(x.item.caption)]: { ...l.caption },
              ['& .'.concat(x.item.arrow)]: { ...l.arrow },
              ['& .'.concat(x.item.info)]: { ...l.info },
              ...(t && {
                color: 'var(--nav-item-root-active-color)',
                backgroundColor: 'var(--nav-item-root-active-bg)',
                '&:hover': { backgroundColor: 'var(--nav-item-root-active-hover-bg)' },
                [v.s4.dark]: { color: 'var(--nav-item-root-active-color-on-dark)' },
              }),
              ...(a && {
                color: 'var(--nav-item-root-open-color)',
                backgroundColor: 'var(--nav-item-root-open-bg)',
              }),
            }),
            ...(!n && {
              ...l.item,
              minHeight: 'var(--nav-item-sub-height)',
              ['& .'.concat(x.item.icon)]: { ...l.icon },
              ['& .'.concat(x.item.texts)]: { ...l.texts },
              ['& .'.concat(x.item.title)]: { ...l.title },
              ['& .'.concat(x.item.caption)]: { ...l.caption },
              ['& .'.concat(x.item.arrow)]: { ...l.arrow },
              ['& .'.concat(x.item.info)]: { ...l.info },
              '&::before': {
                left: 0,
                content: '""',
                position: 'absolute',
                width: 'var(--nav-bullet-size)',
                height: 'var(--nav-bullet-size)',
                transform:
                  'translate(calc(var(--nav-bullet-size) * -1), calc(var(--nav-bullet-size) * -0.4))',
                backgroundColor: 'var(--nav-bullet-light-color)',
                mask: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\") no-repeat 50% 50%/100% auto",
                WebkitMask:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\") no-repeat 50% 50%/100% auto",
                [v.s4.dark]: { backgroundColor: 'var(--nav-bullet-dark-color)' },
              },
              ...(t && {
                color: 'var(--nav-item-sub-active-color)',
                backgroundColor: 'var(--nav-item-sub-active-bg)',
              }),
              ...(a && {
                color: 'var(--nav-item-sub-open-color)',
                backgroundColor: 'var(--nav-item-sub-open-bg)',
              }),
            }),
            ...(i && w.disabled),
          };
        }),
        (0, h.ZP)(g.Z, {
          shouldForwardProp: (e) =>
            'active' !== e && 'open' !== e && 'disabled' !== e && 'depth' !== e,
        })((e) => {
          let { active: t, open: a, disabled: i, depth: r, theme: o } = e,
            n = 1 === r,
            l = {
              item: {
                flexShrink: 0,
                color: 'var(--nav-item-color)',
                borderRadius: 'var(--nav-item-radius)',
                '&:hover': { backgroundColor: 'var(--nav-item-hover-bg)' },
              },
              title: {
                ...o.typography.body2,
                fontWeight: t ? o.typography.fontWeightSemiBold : o.typography.fontWeightMedium,
              },
              caption: { width: 16, height: 16, color: 'var(--nav-item-caption-color)' },
              icon: { ...w.icon, width: 'var(--nav-icon-size)', height: 'var(--nav-icon-size)' },
              arrow: { ...w.arrow },
              info: { ...w.info },
            };
          return {
            ...(n && {
              ...l.item,
              padding: 'var(--nav-item-root-padding)',
              minHeight: 'var(--nav-item-root-height)',
              ['& .'.concat(x.item.icon)]: { ...l.icon, margin: 'var(--nav-icon-root-margin)' },
              ['& .'.concat(x.item.title)]: { ...l.title, whiteSpace: 'nowrap' },
              ['& .'.concat(x.item.caption)]: { ...l.caption, marginLeft: o.spacing(0.75) },
              ['& .'.concat(x.item.arrow)]: { ...l.arrow },
              ['& .'.concat(x.item.info)]: { ...l.info },
              ...(t && {
                color: 'var(--nav-item-root-active-color)',
                backgroundColor: 'var(--nav-item-root-active-bg)',
                '&:hover': { backgroundColor: 'var(--nav-item-root-active-hover-bg)' },
                [v.s4.dark]: { color: 'var(--nav-item-root-active-color-on-dark)' },
              }),
              ...(a && {
                color: 'var(--nav-item-root-open-color)',
                backgroundColor: 'var(--nav-item-root-open-bg)',
              }),
            }),
            ...(!n && {
              ...l.item,
              padding: 'var(--nav-item-sub-padding)',
              minHeight: 'var(--nav-item-sub-height)',
              color: o.vars.palette.text.secondary,
              ['& .'.concat(x.item.icon)]: { ...l.icon, margin: 'var(--nav-icon-sub-margin)' },
              ['& .'.concat(x.item.title)]: { ...l.title, flexGrow: 1 },
              ['& .'.concat(x.item.caption)]: { ...l.caption },
              ['& .'.concat(x.item.arrow)]: { ...l.arrow, marginRight: o.spacing(-0.5) },
              ['& .'.concat(x.item.info)]: { ...l.info },
              ...(t && {
                color: 'var(--nav-item-sub-active-color)',
                backgroundColor: 'var(--nav-item-sub-active-bg)',
              }),
              ...(a && {
                color: 'var(--nav-item-sub-open-color)',
                backgroundColor: 'var(--nav-item-sub-open-bg)',
              }),
            }),
            ...(i && w.disabled),
          };
        }),
        a(70752);
      var j = a(90486),
        F = a(1866),
        _ = a(2323),
        N = a(98688),
        A = a(20799),
        D = a(97312),
        Z = a(16956),
        S = a(22010);
      let L = (0, l.forwardRef)((e, t) => {
          let {
              title: a,
              path: r,
              open: o,
              active: n,
              hasChild: s,
              externalLink: c,
              subItem: d,
              ...m
            } = e,
            u = (function (e) {
              let {
                  path: t,
                  icon: a,
                  info: i,
                  depth: r,
                  render: o,
                  hasChild: n,
                  externalLink: s,
                  enabledRootRedirect: c,
                } = e,
                d = 1 === r,
                m = Number(r) > 2,
                u = s
                  ? { href: t, target: '_blank', rel: 'noopener' }
                  : { component: f.r, href: t },
                p = null;
              p =
                a && (null == o ? void 0 : o.navIcon) && 'string' == typeof a
                  ? null == o
                    ? void 0
                    : o.navIcon[a]
                  : a;
              let v = null;
              if (i && (null == o ? void 0 : o.navInfo) && Array.isArray(i)) {
                let [e, t] = i,
                  a = o.navInfo(t)[e];
                v = a ? (0, l.cloneElement)(a) : null;
              } else v = i;
              return {
                subItem: !d,
                rootItem: d,
                subDeepItem: m,
                baseProps: n && !c ? { component: 'div' } : u,
                renderIcon: p,
                renderInfo: v,
              };
            })({ path: r, hasChild: s, externalLink: c });
          return (0, i.jsxs)(U, {
            disableRipple: !0,
            ref: t,
            'aria-label': a,
            open: o,
            active: n,
            subItem: d,
            ...u.baseProps,
            ...m,
            children: [
              a,
              s &&
                (0, i.jsx)(b.Ir, {
                  width: 16,
                  icon: 'eva:arrow-ios-downward-fill',
                  sx: { ml: 0.75 },
                }),
            ],
          });
        }),
        U = (0, h.ZP)(g.Z, {
          shouldForwardProp: (e) => 'active' !== e && 'open' !== e && 'subItem' !== e,
        })((e) => {
          let { active: t, open: a, subItem: i, theme: r } = e,
            o = {
              item: {
                ...r.typography.body2,
                fontWeight: r.typography.fontWeightMedium,
                transition: r.transitions.create(['all'], {
                  duration: r.transitions.duration.shorter,
                }),
              },
              dot: {
                width: 6,
                height: 6,
                left: -12,
                opacity: 0.64,
                content: '""',
                borderRadius: '50%',
                position: 'absolute',
                backgroundColor: r.vars.palette.text.disabled,
                ...(t && { opacity: 1, backgroundColor: r.vars.palette.primary.main }),
              },
            };
          return {
            ...(!i && {
              ...o.item,
              height: '100%',
              '&:hover': { opacity: 0.64, '&::before': o.dot },
              ...(t && {
                color: r.vars.palette.primary.main,
                fontWeight: r.typography.fontWeightSemiBold,
                '&::before': o.dot,
              }),
              ...(a && { opacity: 0.64, '&::before': o.dot }),
            }),
            ...(i && {
              ...o.item,
              justifyContent: 'flex-start',
              color: r.vars.palette.text.secondary,
              fontSize: r.typography.pxToRem(13),
              '&:hover': { color: r.vars.palette.text.primary, '&::before': o.dot },
              ...(t && {
                color: r.vars.palette.text.primary,
                fontWeight: r.typography.fontWeightSemiBold,
                '&::before': o.dot,
              }),
            }),
          };
        });
      function T(e) {
        let { path: t, sx: a, ...r } = e;
        return (0, i.jsx)(D.Z, {
          component: f.r,
          href: t,
          sx: { width: 1, height: 1 },
          ...r,
          children: (0, i.jsx)(Z.Z, {
            sx: {
              height: 1,
              minHeight: 360,
              borderRadius: 1.5,
              color: 'text.disabled',
              bgcolor: 'background.neutral',
              px: { md: 3, lg: 10 },
              ...a,
            },
            children: (0, i.jsx)(A.m.div, {
              whileTap: 'tap',
              whileHover: 'hover',
              variants: { hover: { scale: 1.02 }, tap: { scale: 0.98 } },
              children: (0, i.jsx)(c.Z, {
                component: 'img',
                alt: 'illustration-dashboard',
                src: ''.concat(S.k.assetsDir, '/assets/illustrations/illustration-dashboard.webp'),
                sx: { width: 640, objectFit: 'cover', aspectRatio: '4/3' },
              }),
            }),
          }),
        });
      }
      function q(e) {
        let { data: t } = e,
          a = (0, o.Z)(),
          r = (0, l.useRef)(null),
          s = (0, n.jD)(),
          [d, m] = (0, l.useState)(!1),
          u = (0, p.X)(t.path, !!t.children),
          [h, g] = (0, l.useState)({ top: 0, height: 0 });
        (0, l.useEffect)(() => {
          d && b();
        }, [s]);
        let f = (0, l.useCallback)(() => {
            t.children && m(!0);
          }, [t.children]),
          b = (0, l.useCallback)(() => {
            m(!1);
          }, []),
          x = (0, i.jsx)(L, {
            ref: r,
            title: t.title,
            path: t.path,
            active: u,
            hasChild: !!t.children,
            open: t.children && !!d,
            externalLink: (0, N.Bm)(t.path),
            onMouseEnter: f,
            onMouseLeave: b,
          }),
          y = (0, l.useCallback)(() => {
            let e = r.current;
            if (e) {
              let t = e.getBoundingClientRect();
              g({ top: t.top, height: t.height });
            }
          }, []);
        return ((0, l.useEffect)(
          () => (
            y(),
            window.addEventListener('scroll', y),
            () => {
              window.removeEventListener('scroll', y);
            }
          ),
          [y]
        ),
        t.children)
          ? (0, i.jsxs)(k, {
              sx: { height: 1 },
              children: [
                x,
                d &&
                  (0, i.jsx)(F.Z, {
                    children: (0, i.jsx)(j.Z, {
                      in: !0,
                      children: (0, i.jsx)(c.Z, {
                        onMouseEnter: f,
                        onMouseLeave: b,
                        sx: {
                          pt: 0.5,
                          left: 0,
                          right: 0,
                          mx: 'auto',
                          position: 'fixed',
                          zIndex: a.zIndex.modal,
                          maxWidth: a.breakpoints.values.lg,
                          top: Math.round(h.top + h.height),
                        },
                        children: (0, i.jsx)(c.Z, {
                          component: 'nav',
                          sx: {
                            ...(0, v.uS)({ theme: a, dropdown: !0 }),
                            borderRadius: 2,
                            p: a.spacing(5, 1, 1, 4),
                          },
                          children: (0, i.jsx)(C, {
                            sx: { gap: 3, width: 1, flexWrap: 'wrap', flexDirection: 'row' },
                            children: t.children.map((e) =>
                              (0, i.jsx)(I, { subheader: e.subheader, data: e.items }, e.subheader)
                            ),
                          }),
                        }),
                      }),
                    }),
                  }),
              ],
            })
          : (0, i.jsx)(k, { sx: { height: 1 }, children: x });
      }
      function I(e) {
        let { data: t, subheader: a, sx: r, ...o } = e,
          l = (0, n.jD)(),
          s = 'Dashboard' === a;
        return (0, i.jsx)(u.Z, {
          component: k,
          alignItems: 'flex-start',
          sx: { flex: '1 1 auto', ...(s && { maxWidth: { md: 1 / 3, lg: 540 } }), ...r },
          ...o,
          children: (0, i.jsxs)(C, {
            children: [
              (0, i.jsx)(_.Z, {
                disableSticky: !0,
                disableGutters: !0,
                sx: { fontSize: 11, color: 'text.primary', typography: 'overline' },
                children: a,
              }),
              t.map((e) =>
                s
                  ? (0, i.jsx)(
                      k,
                      { sx: { mt: 1.5 }, children: (0, i.jsx)(T, { path: e.path }) },
                      e.title
                    )
                  : (0, i.jsx)(
                      k,
                      {
                        sx: { mt: 1.5 },
                        children: (0, i.jsx)(L, {
                          subItem: !0,
                          title: e.title,
                          path: e.path,
                          active: e.path === (0, N.vZ)(l),
                        }),
                      },
                      e.title
                    )
              ),
            ],
          }),
        });
      }
      function H(e) {
        let { data: t, sx: a } = e;
        return (0, i.jsx)(u.Z, {
          component: 'nav',
          sx: { height: 1, ...a },
          children: (0, i.jsx)(C, {
            sx: { gap: 5, height: 1, flexDirection: 'row', alignItems: 'center' },
            children: t.map((e) => (0, i.jsx)(q, { data: e }, e.title)),
          }),
        });
      }
      var E = a(8350),
        P = a(98489),
        M = a(14712),
        W = a(95576),
        B = a(46387),
        R = a(12796),
        V = a(71096),
        z = a.n(V),
        O = a(13257),
        Q = a.n(O),
        G = a(45721),
        K = a.n(G);
      function J(e) {
        let {
          years: t = 0,
          months: a = 0,
          days: i = 0,
          hours: r = 0,
          minutes: o = 0,
          seconds: n = 0,
          milliseconds: l = 0,
        } = e;
        return z()()
          .subtract(
            z().duration({
              years: t,
              months: a,
              days: i,
              hours: r,
              minutes: o,
              seconds: n,
              milliseconds: l,
            })
          )
          .format();
      }
      z().extend(Q()), z().extend(K());
      var $ = a(10070);
      let X = {
          id: (e) => $.ZV[e],
          time: (e) => J({ days: e, hours: e }),
          boolean: (e) => $.si[e],
          role: (e) => $.YX[e],
          courseNames: (e) => $.sv[e],
          taskNames: (e) => $.he[e],
          postTitle: (e) => $.zu[e],
          jobTitle: (e) => $.dr[e],
          tourName: (e) => $.PG[e],
          productName: (e) => $.GO[e],
          sentence: (e) => $.Op[e],
          description: (e) => $.ji[e],
          email: (e) => $.wC[e],
          phoneNumber: (e) => $.DI[e],
          fullAddress: (e) => $.D7[e],
          fullName: (e) => $.f9[e],
          companyNames: (e) => $.Vh[e],
          countryNames: (e) => $.JC[e],
          number: {
            percent: (e) => $.$8[e],
            rating: (e) => $.CS[e],
            age: (e) => $.Jy[e],
            price: (e) => $.Ig[e],
            nativeS: (e) => $._v[e],
            nativeM: (e) => $.ih[e],
            nativeL: (e) => $.$b[e],
          },
          image: {
            cover: (e) =>
              ''.concat(S.k.assetsDir, '/assets/images/mock/cover/cover-').concat(e + 1, '.webp'),
            avatar: (e) =>
              ''.concat(S.k.assetsDir, '/assets/images/mock/avatar/avatar-').concat(e + 1, '.webp'),
            travel: (e) =>
              ''.concat(S.k.assetsDir, '/assets/images/mock/travel/travel-').concat(e + 1, '.webp'),
            course: (e) =>
              ''.concat(S.k.assetsDir, '/assets/images/mock/course/course-').concat(e + 1, '.webp'),
            company: (e) =>
              ''
                .concat(S.k.assetsDir, '/assets/images/mock/company/company-')
                .concat(e + 1, '.webp'),
            product: (e) =>
              ''
                .concat(S.k.assetsDir, '/assets/images/mock/m-product/product-')
                .concat(e + 1, '.webp'),
            portrait: (e) =>
              ''
                .concat(S.k.assetsDir, '/assets/images/mock/portrait/portrait-')
                .concat(e + 1, '.webp'),
          },
        },
        Y = [
          'UI',
          'UX',
          'Html',
          'JavaScript',
          'TypeScript',
          'Communication',
          'Problem Solving',
          'Leadership',
          'Time Management',
          'Adaptability',
          'Collaboration',
          'Creativity',
          'Critical Thinking',
          'Technical Skills',
          'Customer Service',
          'Project Management',
          'Problem Diagnosis',
        ],
        ee = ['Monday to Friday', 'Weekend availability', 'Day shift'],
        et = [
          { label: 'No experience', value: 'No experience' },
          { label: '1 year exp', value: '1 year exp' },
          { label: '2 year exp', value: '2 year exp' },
          { label: '> 3 year exp', value: '> 3 year exp' },
        ],
        ea = [
          { label: 'Free parking', value: 'Free parking' },
          { label: 'Bonus commission', value: 'Bonus commission' },
          { label: 'Travel', value: 'Travel' },
          { label: 'Device support', value: 'Device support' },
          { label: 'Health care', value: 'Health care' },
          { label: 'Training', value: 'Training' },
          { label: 'Health insurance', value: 'Health insurance' },
          { label: 'Retirement plans', value: 'Retirement plans' },
          { label: 'Paid time off', value: 'Paid time off' },
          { label: 'Flexible work schedule', value: 'Flexible work schedule' },
        ],
        ei = [...Array(12)].map((e, t) => ({
          id: X.id(t),
          role: X.role(t),
          name: X.fullName(t),
          avatarUrl: X.image.avatar(t),
        }));
      [...Array(12)].map((e, t) => {
        let a = t % 3 ? 'published' : 'draft',
          i = {
            type: (t % 5 && 'Custom') || 'Hourly',
            price: X.number.price(t),
            negotiable: X.boolean(t),
          },
          r = ea.slice(0, 3).map((e) => e.label),
          o = et.map((e) => e.label)[t] || et[1].label,
          n = (t % 2 && ['Part-time']) ||
            (t % 3 && ['On demand']) ||
            (t % 4 && ['Negotiable']) || ['Full-time'],
          l = {
            name: X.companyNames(t),
            logo: X.image.company(t),
            phoneNumber: X.phoneNumber(t),
            fullAddress: X.fullAddress(t),
          };
        return {
          id: X.id(t),
          salary: i,
          publish: a,
          company: l,
          benefits: r,
          experience: o,
          employmentTypes: n,
          content:
            "\n<h6>Job description</h6>\n\n<p>Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.</p>\n\n<h6>Key responsibilities</h6>\n\n<ul>\n  <li>Working with agency for design drawing detail, quotation and local production.</li>\n  <li>Produce window displays, signs, interior displays, floor plans and special promotions displays.</li>\n  <li>Change displays to promote new product launches and reflect festive or seasonal themes.</li>\n  <li>Planning and executing the open/renovation/ closing store procedure.</li>\n  <li>Follow‐up store maintenance procedure and keep updating SKU In &amp; Out.</li>\n  <li>Monitor costs and work within budget.</li>\n  <li>Liaise with suppliers and source elements.</li>\n</ul>\n\n<h6>Why You'll love working here</h6>\n\n<ul>\n  <li>Working with agency for design drawing detail, quotation and local production.</li>\n  <li>Produce window displays, signs, interior displays, floor plans and special promotions displays.</li>\n  <li>Change displays to promote new product launches and reflect festive or seasonal themes.</li>\n  <li>Planning and executing the open/renovation/ closing store procedure.</li>\n  <li>Follow‐up store maintenance procedure and keep updating SKU In &amp; Out.</li>\n  <li>Monitor costs and work within budget.</li>\n  <li>Liaise with suppliers and source elements.</li>\n</ul>\n",
          candidates: ei,
          role: X.role(t),
          title: X.jobTitle(t),
          createdAt: X.time(t),
          expiredDate: X.time(t),
          skills: Y.slice(0, 3),
          totalViews: X.number.nativeL(t),
          locations: [X.countryNames(1), X.countryNames(2)],
          workingSchedule: ee.slice(0, 2),
        };
      }),
        X.id(1),
        X.role(1),
        X.email(1),
        X.companyNames(2),
        X.companyNames(1),
        X.countryNames(2),
        X.image.cover(3),
        X.number.nativeL(1),
        X.number.nativeL(2),
        [...Array(18)].map((e, t) => ({
          id: X.id(t),
          name: X.fullName(t),
          country: X.countryNames(t),
          avatarUrl: X.image.avatar(t),
        })),
        [...Array(18)].map((e, t) => ({
          id: X.id(t),
          role: X.role(t),
          name: X.fullName(t),
          avatarUrl: X.image.avatar(t),
        })),
        [...Array(12)].map((e, t) => ({
          id: X.id(t),
          postedAt: X.time(t),
          title: X.postTitle(t),
          imageUrl: X.image.cover(t),
        })),
        [void 0, void 0, void 0].map((e, t) => ({
          id: X.id(t),
          createdAt: X.time(t),
          media: X.image.travel(t + 1),
          message: X.sentence(t),
          personLikes: [...Array(20)].map((e, t) => ({
            name: X.fullName(t),
            avatarUrl: X.image.avatar(t + 2),
          })),
          comments: (2 === t && []) || [
            {
              id: X.id(7),
              author: { id: X.id(8), avatarUrl: X.image.avatar(t + 5), name: X.fullName(t + 5) },
              createdAt: X.time(2),
              message: 'Praesent venenatis metus at',
            },
            {
              id: X.id(9),
              author: { id: X.id(10), avatarUrl: X.image.avatar(t + 6), name: X.fullName(t + 6) },
              createdAt: X.time(3),
              message:
                'Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.',
            },
          ],
        })),
        [...Array(21)].map((e, t) => ({
          id: X.id(t),
          role: X.role(t),
          name: X.fullName(t),
          coverUrl: X.image.cover(t),
          avatarUrl: X.image.avatar(t),
          totalFollowers: X.number.nativeL(t),
          totalPosts: X.number.nativeL(t + 2),
          totalFollowing: X.number.nativeL(t + 1),
        })),
        [void 0, void 0, void 0].map((e, t) => ({
          id: X.id(t),
          cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][t],
          cardType: ['mastercard', 'visa', 'visa'][t],
          primary: 1 === t,
        })),
        [void 0, void 0, void 0, void 0].map((e, t) => ({
          id: X.id(t),
          primary: 0 === t,
          name: X.fullName(t),
          phoneNumber: X.phoneNumber(t),
          fullAddress: X.fullAddress(t),
          addressType: (0 === t && 'Home') || 'Office',
        })),
        [...Array(10)].map((e, t) => ({
          id: X.id(t),
          invoiceNumber: 'INV-199'.concat(t),
          createdAt: X.time(t),
          price: X.number.price(t),
        })),
        [...Array(20)].map((e, t) => ({
          id: X.id(t),
          zipCode: '85807',
          state: 'Virginia',
          city: 'Rancho Cordova',
          role: X.role(t),
          email: X.email(t),
          address: '908 Jack Locks',
          name: X.fullName(t),
          isVerified: X.boolean(t),
          company: X.companyNames(t),
          country: X.countryNames(t),
          avatarUrl: X.image.avatar(t),
          phoneNumber: X.phoneNumber(t),
          status: (t % 2 && 'pending') || (t % 3 && 'banned') || (t % 4 && 'rejected') || 'active',
        }));
      let er = [...Array(12)].map((e, t) => ({
          id: X.id(t),
          guests: t + 10,
          name: X.fullName(t),
          avatarUrl: X.image.avatar(t),
        })),
        eo = [...Array(12)].map((e, t) => ({
          id: X.id(t),
          name: X.fullName(t),
          avatarUrl: X.image.avatar(t),
          phoneNumber: X.phoneNumber(t),
        })),
        en = [...Array(16)].map((e, t) => X.image.travel(t));
      [...Array(12)].map((e, t) => {
        let a = { startDate: X.time(t + 1), endDate: X.time(t) },
          i = t % 3 ? 'published' : 'draft',
          r = (t % 2 && ['Audio guide', 'Food and drinks']) ||
            (t % 3 && ['Lunch', 'Private tour']) ||
            (t % 4 && ['Special activities', 'Entrance fees']) || [
              'Gratuities',
              'Pick-up and drop off',
              'Professional guide',
              'Transport by air-conditioned',
            ],
          o =
            (0 === t && eo.slice(0, 1)) ||
            (1 === t && eo.slice(1, 3)) ||
            (2 === t && eo.slice(2, 5)) ||
            (3 === t && eo.slice(4, 6)) ||
            eo.slice(6, 9);
        return {
          images: en.slice(t, t + 5),
          publish: i,
          services: r,
          available: a,
          tourGuides: o,
          bookers: er,
          content:
            '\n<h6>Description</h6>\n\n<p>Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.</p>\n\n<h6>Highlights</h6>\n\n<ul>\n  <li>A fermentum in morbi pretium aliquam adipiscing donec tempus.</li>\n  <li>Vulputate placerat amet pulvinar lorem nisl.</li>\n  <li>Consequat feugiat habitant gravida quisque elit bibendum id adipiscing sed.</li>\n  <li>Etiam duis lobortis in fames ultrices commodo nibh.</li>\n</ul>\n\n<h6>Program</h6>\n\n<p>\n  <strong>Day 1</strong>\n</p>\n\n<p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>\n\n<p>\n  <strong>Day 2</strong>\n</p>\n\n<p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>\n\n<p>\n  <strong>Day 3</strong>\n</p>\n\n<p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>\n',
          id: X.id(t),
          tags: $.Qw.slice(0, 5),
          name: X.tourName(t),
          createdAt: X.time(t),
          durations: '4 days 3 nights',
          price: X.number.price(t),
          destination: X.countryNames(t),
          priceSale: X.number.price(t),
          totalViews: X.number.nativeL(t),
          ratingNumber: X.number.rating(t),
        };
      });
      let el = [
          X.image.cover(1),
          'https://www.cloud.com/s/c218bo6kjuqyv66/design_suriname_2015.mp3',
          'https://www.cloud.com/s/c218bo6kjuqyv66/expertise_2015_conakry_sao-tome-and-principe_gender.mp4',
          'https://www.cloud.com/s/c218bo6kjuqyv66/money-popup-crack.pdf',
          X.image.cover(3),
          X.image.cover(5),
          'https://www.cloud.com/s/c218bo6kjuqyv66/large_news.txt',
          'https://www.cloud.com/s/c218bo6kjuqyv66/nauru-6015-small-fighter-left-gender.psd',
          'https://www.cloud.com/s/c218bo6kjuqyv66/tv-xs.doc',
          'https://www.cloud.com/s/c218bo6kjuqyv66/gustavia-entertainment-productivity.docx',
          'https://www.cloud.com/s/c218bo6kjuqyv66/vintage_bahrain_saipan.xls',
          'https://www.cloud.com/s/c218bo6kjuqyv66/indonesia-quito-nancy-grace-left-glad.xlsx',
          'https://www.cloud.com/s/c218bo6kjuqyv66/legislation-grain.zip',
          'https://www.cloud.com/s/c218bo6kjuqyv66/large_energy_dry_philippines.rar',
          'https://www.cloud.com/s/c218bo6kjuqyv66/footer-243-ecuador.iso',
          'https://www.cloud.com/s/c218bo6kjuqyv66/kyrgyzstan-04795009-picabo-street-guide-style.ai',
          'https://www.cloud.com/s/c218bo6kjuqyv66/india-data-large-gk-chesterton-mother.esp',
          'https://www.cloud.com/s/c218bo6kjuqyv66/footer-barbados-celine-dion.ppt',
          'https://www.cloud.com/s/c218bo6kjuqyv66/socio_respectively_366996.pptx',
          'https://www.cloud.com/s/c218bo6kjuqyv66/socio_ahead_531437_sweden_popup.wav',
          'https://www.cloud.com/s/c218bo6kjuqyv66/trinidad_samuel-morse_bring.m4v',
          X.image.cover(11),
          X.image.cover(17),
          'https://www.cloud.com/s/c218bo6kjuqyv66/xl_david-blaine_component_tanzania_books.pdf',
        ],
        es = [...Array(20)].map((e, t) => ({
          id: X.id(t),
          name: X.fullName(t),
          email: X.email(t),
          avatarUrl: X.image.avatar(t),
          permission: t % 2 ? 'view' : 'edit',
        })),
        ec = (e) =>
          (0 === e && es.slice(0, 5)) ||
          (1 === e && es.slice(5, 9)) ||
          (2 === e && es.slice(9, 11)) ||
          (3 === e && es.slice(11, 12)) ||
          [];
      [
        ...['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'].map((e, t) => ({
          id: ''.concat(X.id(t), '_folder'),
          name: e,
          type: 'folder',
          url: el[t],
          shared: ec(t),
          tags: $.Qw.slice(0, 5),
          size: 24e9 / ((t + 1) * 10),
          totalFiles: (t + 1) * 100,
          createdAt: X.time(t),
          modifiedAt: X.time(t),
          isFavorited: X.boolean(t + 1),
        })),
        ...$.bi.map((e, t) => ({
          id: ''.concat(X.id(t), '_file'),
          name: e,
          url: el[t],
          shared: ec(t),
          tags: $.Qw.slice(0, 5),
          size: 24e9 / ((t + 1) * 500),
          createdAt: X.time(t),
          modifiedAt: X.time(t),
          type: ''.concat(e.split('.').pop()),
          isFavorited: X.boolean(t + 1),
        })),
      ];
      let ed = [void 0, void 0, void 0].map((e, t) => ({
        id: X.id(t),
        sku: '16H9UR'.concat(t),
        quantity: t + 1,
        name: X.productName(t),
        coverUrl: X.image.product(t),
        price: X.number.price(t),
      }));
      [...Array(20)].map((e, t) => {
        let a = (t % 2 && ed.slice(0, 1)) || (t % 3 && ed.slice(1, 3)) || ed,
          i = a.reduce((e, t) => e + t.quantity, 0),
          r = a.reduce((e, t) => e + t.price * t.quantity, 0),
          o = {
            id: X.id(t),
            name: X.fullName(t),
            email: X.email(t),
            avatarUrl: X.image.avatar(t),
            ipAddress: '192.158.1.38',
          },
          n = {
            orderTime: X.time(1),
            paymentTime: X.time(2),
            deliveryTime: X.time(3),
            completionTime: X.time(4),
            timeline: [
              { title: 'Delivery successful', time: X.time(1) },
              { title: 'Transporting to [2]', time: X.time(2) },
              { title: 'Transporting to [1]', time: X.time(3) },
              { title: 'The shipping unit has picked up the goods', time: X.time(4) },
              { title: 'Order has been created', time: X.time(5) },
            ],
          };
        return {
          id: X.id(t),
          orderNumber: '#601'.concat(t),
          createdAt: X.time(t),
          taxes: 10,
          items: a,
          history: n,
          subtotal: r,
          shipping: 10,
          discount: 10,
          customer: o,
          delivery: { shipBy: 'DHL', speedy: 'Standard', trackingNumber: 'SPX037739199373' },
          totalAmount: r - 10 - 10 + 10,
          totalQuantity: i,
          shippingAddress: {
            fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
            phoneNumber: '365-374-4961',
          },
          payment: { cardType: 'mastercard', cardNumber: '**** **** **** 5678' },
          status:
            (t % 2 && 'completed') || (t % 3 && 'pending') || (t % 4 && 'cancelled') || 'refunded',
        };
      }),
        [...Array(6)].map((e, t) => ({
          id: X.id(t),
          name: X.fullName(t),
          role: X.role(t),
          avatarUrl: X.image.portrait(t),
        })),
        [...Array(8)].map((e, t) => ({
          id: X.id(t),
          value: 'panel'.concat(t + 1),
          heading: 'Questions '.concat(t + 1),
          detail: X.description(t),
        }));
      let em = [...Array(24)].map((e, t) => ({
        id: X.id(t),
        primary: 0 === t,
        name: X.fullName(t),
        email: X.email(t + 1),
        fullAddress: X.fullAddress(t),
        phoneNumber: X.phoneNumber(t),
        company: X.companyNames(t + 1),
        addressType: 0 === t ? 'Home' : 'Office',
      }));
      [...Array(20)].map((e, t) => {
        let a = (t % 2 && 'online') || (t % 3 && 'offline') || (t % 4 && 'alway') || 'busy';
        return {
          id: X.id(t),
          status: a,
          role: X.role(t),
          email: X.email(t),
          name: X.fullName(t),
          phoneNumber: X.phoneNumber(t),
          lastActivity: X.time(t),
          avatarUrl: X.image.avatar(t),
          address: X.fullAddress(t),
        };
      }),
        [...Array(9)].map((e, t) => ({
          id: X.id(t),
          avatarUrl: [
            X.image.avatar(1),
            X.image.avatar(2),
            X.image.avatar(3),
            X.image.avatar(4),
            X.image.avatar(5),
            null,
            null,
            null,
            null,
            null,
          ][t],
          type: [
            'friend',
            'project',
            'file',
            'tags',
            'payment',
            'order',
            'chat',
            'mail',
            'delivery',
          ][t],
          category: [
            'Communication',
            'Project UI',
            'File manager',
            'File manager',
            'File manager',
            'Order',
            'Order',
            'Communication',
            'Communication',
          ][t],
          isUnRead: X.boolean(t),
          createdAt: X.time(t),
          title:
            (0 === t && '<p><strong>Deja Brady</strong> sent you a friend request</p>') ||
            (1 === t &&
              "<p><strong>Jayvon Hull</strong> mentioned you in <strong><a href='#'>Minimal UI</a></strong></p>") ||
            (2 === t &&
              "<p><strong>Lainey Davidson</strong> added file to <strong><a href='#'>File manager</a></strong></p>") ||
            (3 === t &&
              "<p><strong>Angelique Morse</strong> added new tags to <strong><a href='#'>File manager<a/></strong></p>") ||
            (4 === t &&
              '<p><strong>Giana Brandt</strong> request a payment of <strong>$200</strong></p>') ||
            (5 === t && '<p>Your order is placed waiting for shipping</p>') ||
            (6 === t && '<p>Delivery processing your order is being shipped</p>') ||
            (7 === t && '<p>You have new message 5 unread messages</p>') ||
            (8 === t && '<p>You have new mail') ||
            '',
        })),
        X.fullAddress(1),
        X.phoneNumber(1),
        X.fullAddress(2),
        X.phoneNumber(2);
      let eu = [
        { value: 'facebook', label: 'Facebook', path: 'https://www.facebook.com/caitlyn.kerluke' },
        {
          value: 'instagram',
          label: 'Instagram',
          path: 'https://www.instagram.com/caitlyn.kerluke',
        },
        { value: 'linkedin', label: 'Linkedin', path: 'https://www.linkedin.com/caitlyn.kerluke' },
        { value: 'twitter', label: 'Twitter', path: 'https://www.twitter.com/caitlyn.kerluke' },
      ];
      X.fullName(1),
        X.time(1),
        X.number.rating(1),
        X.image.avatar(1),
        X.fullName(2),
        X.time(2),
        X.number.rating(2),
        X.image.avatar(2),
        X.fullName(3),
        X.time(3),
        X.number.rating(3),
        X.image.avatar(3),
        X.fullName(4),
        X.time(4),
        X.number.rating(4),
        X.image.avatar(4),
        X.fullName(5),
        X.time(5),
        X.number.rating(5),
        X.image.avatar(5),
        X.fullName(6),
        X.time(6),
        X.number.rating(6),
        X.image.avatar(6);
      let ep = [...Array(8)].map((e, t) => ({
          id: X.id(t),
          name: X.role(t),
          price: X.number.price(t),
        })),
        ev = [void 0, void 0, void 0].map((e, t) => {
          let a = ep[t].price * X.number.nativeS(t);
          return {
            id: X.id(t),
            total: a,
            title: X.productName(t),
            description: X.sentence(t),
            price: ep[t].price,
            service: ep[t].name,
            quantity: X.number.nativeS(t),
          };
        });
      [...Array(20)].map((e, t) => {
        let a = X.number.price(t + 1),
          i = X.number.price(t + 2),
          r = X.number.price(t + 3),
          o = ev.reduce((e, t) => e + t.price * t.quantity, 0),
          n = (t % 2 && 'paid') || (t % 3 && 'pending') || (t % 4 && 'overdue') || 'draft';
        return {
          id: X.id(t),
          taxes: a,
          status: n,
          discount: i,
          shipping: r,
          subtotal: o,
          totalAmount: o - r - i + a,
          items: ev,
          invoiceNumber: 'INV-199'.concat(t),
          invoiceFrom: em[t],
          invoiceTo: em[t + 1],
          sent: X.number.nativeS(t),
          createDate: J({ days: t }),
          dueDate: (function (e) {
            let {
              years: t = 0,
              months: a = 0,
              days: i = 0,
              hours: r = 0,
              minutes: o = 0,
              seconds: n = 0,
              milliseconds: l = 0,
            } = e;
            return z()()
              .add(
                z().duration({
                  years: t,
                  months: a,
                  days: i,
                  hours: r,
                  minutes: o,
                  seconds: n,
                  milliseconds: l,
                })
              )
              .format();
          })({ days: t + 15, hours: t }),
        };
      }),
        [
          'Microsoft office 365',
          'Opera',
          'Adobe acrobat reader DC',
          'Joplin',
          'Topaz photo AI',
        ].map((e, t) => ({
          id: X.id(t),
          name: e,
          downloaded: X.number.nativeL(t),
          ratingNumber: X.number.rating(t),
          size: 1024 * X.number.nativeL(t),
          totalReviews: X.number.nativeL(t),
          shortcut: ''.concat(S.k.assetsDir, '/assets/icons/apps/ic-app-').concat(t + 1, '.webp'),
          price: [2, 4].includes(t) ? X.number.price(t) : 0,
        })),
        ['Germany', 'England', 'France', 'Korean', 'USA'].map((e, t) => ({
          id: X.id(t),
          countryName: e,
          android: X.number.nativeL(t),
          windows: X.number.nativeL(t + 1),
          apple: X.number.nativeL(t + 2),
          countryCode: ['de', 'gb', 'fr', 'kr', 'us'][t],
        })),
        [void 0, void 0, void 0].map((e, t) => ({
          id: X.id(t),
          name: X.fullName(t),
          avatarUrl: X.image.avatar(t),
          totalFavorites: X.number.nativeL(t),
        })),
        [void 0, void 0, void 0, void 0, void 0].map((e, t) => {
          let a = ['Android', 'Mac', 'Windows', 'Android', 'Mac'][t],
            i = ['paid', 'out of date', 'progress', 'paid', 'paid'][t];
          return {
            id: X.id(t),
            invoiceNumber: 'INV-199'.concat(t),
            price: X.number.price(t),
            category: a,
            status: i,
          };
        }),
        [void 0, void 0, void 0].map((e, t) => ({
          id: X.id(t + 3),
          title: X.postTitle(t + 3),
          description: X.sentence(t + 3),
          coverUrl: X.image.cover(t + 3),
        })),
        [void 0, void 0, void 0, void 0, void 0].map((e, t) => ({
          id: X.id(t),
          name: X.taskNames(t),
        })),
        [void 0, void 0, void 0, void 0, void 0].map((e, t) => ({
          id: X.id(t),
          postedAt: X.time(t),
          title: X.postTitle(t),
          coverUrl: X.image.cover(t),
          description: X.sentence(t),
        })),
        [void 0, void 0, void 0, void 0, void 0].map((e, t) => {
          let a = [
            '1983, orders, $4220',
            '12 Invoices have been paid',
            'Order #37745 from September',
            'New order placed #XF-2356',
            'New order placed #XF-2346',
          ][t];
          return { id: X.id(t), title: a, type: 'order'.concat(t + 1), time: X.time(t) };
        }),
        X.number.nativeL(1),
        X.number.nativeL(2),
        X.number.nativeL(3),
        X.number.nativeL(4),
        ['Total profit', 'Total income', 'Total expenses'].map((e, t) => ({
          label: e,
          totalAmount: 100 * X.number.price(t),
          value: X.number.percent(t),
        })),
        [void 0, void 0, void 0, void 0, void 0].map((e, t) => {
          let a = ['CAP', 'Branded shoes', 'Headphone', 'Cell phone', 'Earings'][t];
          return {
            id: X.id(t),
            category: a,
            rank: 'Top '.concat(t + 1),
            email: X.email(t),
            name: X.fullName(t),
            totalAmount: X.number.price(t),
            avatarUrl: X.image.avatar(t + 8),
            countryCode: ['de', 'gb', 'fr', 'kr', 'us'][t],
          };
        }),
        [void 0, void 0, void 0, void 0, void 0].map((e, t) => {
          let a = (0 === t && ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627']) ||
            (1 === t && ['#92140C', '#FFCF99']) ||
            (2 === t && ['#0CECDD', '#FFF338', '#FF67E7', '#C400FF', '#52006A', '#046582']) ||
            (3 === t && ['#845EC2', '#E4007C', '#2A1A5E']) || ['#090088'];
          return {
            id: X.id(t),
            colors: a,
            name: X.productName(t),
            price: X.number.price(t),
            coverUrl: X.image.product(t),
            priceSale: [1, 3].includes(t) ? X.number.price(t) : 0,
          };
        }),
        [void 0, void 0, void 0, void 0].map((e, t) => ({
          id: X.id(t),
          name: X.productName(t),
          coverUrl: X.image.product(t),
        })),
        [...Array(12)].map((e, t) => ({
          id: X.id(t),
          name: X.fullName(t),
          email: X.email(t),
          avatarUrl: X.image.avatar(t),
        })),
        X.id(2),
        X.fullName(2),
        X.id(3),
        X.fullName(3),
        X.id(4),
        X.fullName(4),
        X.id(2),
        X.fullName(2),
        X.image.avatar(2),
        X.time(2),
        X.number.price(2),
        X.id(3),
        X.fullName(3),
        X.image.avatar(3),
        X.time(3),
        X.number.price(3),
        X.id(4),
        X.fullName(4),
        X.image.avatar(4),
        X.time(4),
        X.number.price(4),
        X.id(5),
        X.time(5),
        X.number.price(5),
        X.id(6),
        X.time(6),
        X.number.price(6),
        [void 0, void 0, void 0, void 0, void 0].map((e, t) => {
          let a = ['Paid', 'Paid', 'Pending', 'Cancelled', 'Paid'][t],
            i = {
              avatarUrl: X.image.avatar(t),
              name: X.fullName(t),
              phoneNumber: X.phoneNumber(t),
            },
            r = [void 0, void 0, void 0, void 0, void 0].map((e, t) => ({
              name: X.tourName(t + 1),
              coverUrl: X.image.travel(t + 1),
            }))[t];
          return {
            id: X.id(t),
            destination: r,
            status: a,
            customer: i,
            checkIn: X.time(t),
            checkOut: X.time(t),
          };
        }),
        [void 0, void 0, void 0].map((e, t) => ({
          status: ['Pending', 'Canceled', 'Sold'][t],
          quantity: X.number.nativeL(t),
          value: X.number.percent(t + 5),
        })),
        [void 0, void 0, void 0, void 0, void 0].map((e, t) => ({
          id: X.id(t),
          name: X.fullName(t),
          postedAt: X.time(t),
          rating: X.number.rating(t),
          avatarUrl: X.image.avatar(t),
          description: X.description(t),
          tags: ['Great sevice', 'Recommended', 'Best price'],
        })),
        [...Array(8)].map((e, t) => ({
          guests: '3-5',
          id: X.id(t),
          bookedAt: X.time(t),
          duration: '3 days 2 nights',
          isHot: X.boolean(t),
          name: X.fullName(t),
          price: X.number.price(t),
          avatarUrl: X.image.avatar(t),
          coverUrl: X.image.travel(t),
        })),
        [void 0, void 0, void 0, void 0].map((e, t) => ({
          id: X.id(t),
          title: X.courseNames(t),
          coverUrl: X.image.course(t),
          totalLesson: 12,
          currentLesson: t + 7,
        })),
        [...Array(6)].map((e, t) => ({
          id: X.id(t),
          title: X.courseNames(t),
          coverUrl: X.image.course(t + 6),
          totalDuration: 220,
          totalStudents: X.number.nativeM(t),
          price: X.number.price(t),
        })),
        [void 0, void 0, void 0, void 0].map((e, t) => ({
          id: X.id(t),
          title: X.courseNames(t),
          totalLesson: 12,
          reminderAt: z()(new Date())
            .startOf('day')
            .format(void 0),
          currentLesson: t + 7,
        }));
      var eh = a(75781);
      eh.T$.main,
        eh.BD.main,
        eh.um.main,
        eh.um.darker,
        eh.Vp.main,
        eh.Kp.main,
        eh.vU.main,
        eh.vU.darker;
      var eg = a(30938);
      let ef = (e, t) => {
          let a = null == e ? void 0 : e.color;
          return {
            width: t,
            height: t,
            flexShrink: 0,
            ...e,
            ...(a && {
              color: a,
              '& path': { fill: 'currentColor' },
              '& defs stop': { stopColor: 'currentColor' },
            }),
          };
        },
        eb = (0, l.forwardRef)((e, t) => {
          let { width: a = 20, sx: r, ...o } = e;
          return (0, i.jsx)(eg.Z, {
            ref: t,
            sx: { ...ef(r, a) },
            ...o,
            children: (0, i.jsx)('path', {
              fill: '#0A66C2',
              d: 'M5.14678 2.52608C5.85835 2.65326 6.45746 3.09997 6.77593 3.74217C6.88945 3.97025 6.95882 4.20149 6.99245 4.46426C7.01558 4.64609 7.00822 4.94775 6.97669 5.12433C6.82323 5.99567 6.18418 6.68832 5.33071 6.9122C5.1699 6.95424 5.03326 6.97316 4.84722 6.98157C3.96327 7.01731 3.14449 6.52856 2.75034 5.72869C2.44342 5.10646 2.44342 4.37597 2.74928 3.75268C3.08983 3.06003 3.73729 2.60281 4.51613 2.50822C4.64962 2.4914 5.00909 2.50191 5.14678 2.52608ZM17.2025 8.64541C17.768 8.70007 18.324 8.84932 18.7844 9.0711C19.1407 9.24242 19.5464 9.50414 19.9154 9.80264C20.3274 10.1358 20.6175 10.5436 20.9549 11.2626C21.2281 11.8449 21.3784 12.341 21.4562 12.9128C21.473 13.0347 21.4741 13.3626 21.4772 17.2715L21.4804 21.5H19.5622H17.644V17.9442C17.644 15.5436 17.6408 14.3538 17.6335 14.2791C17.5452 13.3899 17.1374 12.753 16.4437 12.4188C16.2797 12.3399 16.1704 12.3 15.998 12.2558C15.3159 12.0803 14.5097 12.1791 13.9095 12.5102C13.3514 12.8182 12.931 13.4499 12.7733 14.2161C12.7113 14.5188 12.7145 14.3096 12.7145 18.0598V21.5H10.8015H8.88858V15.1778V8.85563H10.6912H12.4938V9.76585V10.675L12.5715 10.571C12.7344 10.3513 13.0351 10.037 13.2579 9.85204C14.1187 9.13626 15.2244 8.69271 16.2944 8.6349C16.4952 8.62439 17.0491 8.6307 17.2025 8.64541ZM6.72338 15.1778V21.5H4.76313H2.80289V15.1778V8.85563H4.76313H6.72338V15.1778Z',
            }),
          });
        }),
        ex = (0, l.forwardRef)((e, t) => {
          let { width: a = 20, sx: r, ...o } = e;
          return (0, i.jsx)(eg.Z, {
            ref: t,
            sx: { ...ef(r, a) },
            ...o,
            children: (0, i.jsx)('path', {
              fill: '#1877F2',
              d: 'M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z',
            }),
          });
        }),
        ey = (0, l.forwardRef)((e, t) => {
          let { width: a = 20, sx: r, ...o } = e;
          return (0, i.jsx)(eg.Z, {
            ref: t,
            sx: { ...ef(r, a) },
            ...o,
            children: (0, i.jsx)('path', {
              fill: 'currentColor',
              d: 'M17.7242 3H20.779L14.1069 10.624L21.956 21H15.8117L10.9959 14.7087L5.49201 21H2.43288L9.56798 12.8438L2.04346 3H8.34346L12.692 8.75048L17.7242 3ZM16.6511 19.174H18.343L7.42182 4.73077H5.60451L16.6511 19.174Z',
            }),
          });
        }),
        ew = (0, l.forwardRef)((e, t) => {
          let { width: a = 20, sx: r, ...o } = e,
            n = (0, l.useId)();
          return (0, i.jsxs)(eg.Z, {
            ref: t,
            sx: { ...ef(r, a) },
            ...o,
            children: [
              (0, i.jsx)('path', {
                d: 'M22.437 7.67096C22.3859 6.55328 22.2084 5.78997 21.9488 5.12223C21.6852 4.42158 21.2719 3.78688 20.7377 3.26241C20.2132 2.72817 19.5785 2.31476 18.8779 2.05101C18.2099 1.79158 17.4468 1.61423 16.3292 1.56345C15.2094 1.51218 14.8516 1.5 12.0001 1.5C9.14852 1.5 8.79073 1.51218 7.67096 1.56316C6.55328 1.61423 5.79018 1.79175 5.12223 2.05129C4.42156 2.31493 3.78685 2.72826 3.26237 3.26245C2.72813 3.78686 2.31472 4.4215 2.05097 5.12211C1.79154 5.79005 1.61419 6.55332 1.56341 7.67084C1.51218 8.79073 1.5 9.14835 1.5 11.9999C1.5 14.8516 1.51218 15.2094 1.56345 16.3291C1.61439 17.4467 1.79191 18.2099 2.05146 18.8779C2.31509 19.5785 2.7284 20.2132 3.26257 20.7376C3.78701 21.2718 4.4217 21.6851 5.12236 21.9487C5.79018 22.2084 6.55344 22.3857 7.67112 22.4368C8.79106 22.4879 9.14864 22.5 12.0002 22.5C14.8518 22.5 15.2096 22.4879 16.3293 22.4368C17.447 22.3857 18.2101 22.2084 18.8781 21.9487C19.5756 21.6789 20.209 21.2665 20.7378 20.7377C21.2666 20.2089 21.6791 19.5754 21.9488 18.8779C22.2085 18.2099 22.3859 17.4467 22.437 16.3292C22.4879 15.2092 22.5001 14.8516 22.5001 12.0001C22.5001 9.14835 22.4879 8.79073 22.437 7.67096ZM20.5469 16.2432C20.5003 17.2669 20.3292 17.8229 20.1855 18.1928C20.0108 18.6457 19.7432 19.057 19.4 19.4002C19.0568 19.7434 18.6455 20.011 18.1927 20.1856C17.8227 20.3294 17.2668 20.5005 16.243 20.5471C15.1361 20.5977 14.8039 20.6083 12.0001 20.6083C9.19614 20.6083 8.86415 20.5977 7.75701 20.5471C6.73342 20.5005 6.17749 20.3294 5.80736 20.1856C5.35132 20.0173 4.93879 19.7488 4.6001 19.4001C4.25133 19.0614 3.98291 18.6489 3.81457 18.1928C3.67085 17.8229 3.49973 17.2669 3.45309 16.2432C3.40264 15.1361 3.3919 14.8039 3.3919 12.0003C3.3919 9.19642 3.40264 8.86448 3.45309 7.75717C3.49985 6.73342 3.67085 6.17745 3.81457 5.80753C3.98296 5.35144 4.25138 4.93887 4.6001 4.6001C4.93879 4.25132 5.35139 3.98295 5.80753 3.81473C6.17749 3.67085 6.73342 3.49989 7.75722 3.45309C8.86432 3.40264 9.19646 3.3919 12.0001 3.3919C14.8038 3.3919 15.1357 3.40264 16.243 3.45326C17.2668 3.49989 17.8226 3.67101 18.1927 3.81473C18.6487 3.98311 19.0612 4.25147 19.3999 4.6001C19.7487 4.93879 20.0171 5.35139 20.1854 5.80753C20.3292 6.17749 20.5004 6.73342 20.5469 7.75722C20.5974 8.86432 20.6081 9.19646 20.6081 12.0001C20.6081 14.8039 20.5976 15.1358 20.5469 16.2432Z',
                fill: 'url(#'.concat(n, '-1)'),
              }),
              (0, i.jsx)('path', {
                d: 'M11.9999 6.60812C9.02211 6.60812 6.60808 9.02223 6.60808 12.0001C6.60808 14.9779 9.02211 17.3919 11.9999 17.3919C14.9779 17.3919 17.3919 14.9779 17.3919 12.0001C17.3919 9.02223 14.9779 6.60812 11.9999 6.60812ZM11.9999 15.5C10.067 15.4999 8.49993 13.9329 8.5001 11.9999C8.5001 10.067 10.067 8.49993 12.0001 8.49993C13.9331 8.5001 15.5 10.067 15.5 11.9999C15.5 13.9329 13.9329 15.5 11.9999 15.5Z',
                fill: 'url(#'.concat(n, '-2)'),
              }),
              (0, i.jsx)('path', {
                d: 'M18.8649 6.39516C18.8649 7.091 18.3008 7.65509 17.605 7.65509C16.909 7.65509 16.3449 7.09095 16.3449 6.39516C16.3449 5.69912 16.909 5.13503 17.605 5.13503C18.3008 5.13503 18.8649 5.69916 18.8649 6.39516Z',
                fill: 'url(#'.concat(n, '-3)'),
              }),
              (0, i.jsxs)('defs', {
                children: [
                  (0, i.jsxs)('linearGradient', {
                    id: ''.concat(n, '-1'),
                    x1: '3.26229',
                    y1: '20.7377',
                    x2: '20.7378',
                    y2: '3.26212',
                    gradientUnits: 'userSpaceOnUse',
                    children: [
                      (0, i.jsx)('stop', { stopColor: '#FFD600' }),
                      (0, i.jsx)('stop', { offset: '0.5', stopColor: '#FF0100' }),
                      (0, i.jsx)('stop', { offset: '1', stopColor: '#D800B9' }),
                    ],
                  }),
                  (0, i.jsxs)('linearGradient', {
                    id: ''.concat(n, '-2'),
                    x1: '4.57544',
                    y1: '19.4246',
                    x2: '19.4247',
                    y2: '4.57532',
                    gradientUnits: 'userSpaceOnUse',
                    children: [
                      (0, i.jsx)('stop', { stopColor: '#FF6400' }),
                      (0, i.jsx)('stop', { offset: '0.5', stopColor: '#FF0100' }),
                      (0, i.jsx)('stop', { offset: '1', stopColor: '#FD0056' }),
                    ],
                  }),
                  (0, i.jsxs)('linearGradient', {
                    id: ''.concat(n, '-3'),
                    x1: '16.7139',
                    y1: '7.28603',
                    x2: '18.4957',
                    y2: '5.50413',
                    gradientUnits: 'userSpaceOnUse',
                    children: [
                      (0, i.jsx)('stop', { stopColor: '#F30072' }),
                      (0, i.jsx)('stop', { offset: '1', stopColor: '#E50097' }),
                    ],
                  }),
                ],
              }),
            ],
          });
        }),
        ek = [
          {
            headline: 'Minimal',
            children: [
              { name: 'About us', href: R.H.about },
              { name: 'Contact us', href: R.H.contact },
              { name: 'FAQs', href: R.H.faqs },
            ],
          },
          {
            headline: 'Legal',
            children: [
              { name: 'Terms and condition', href: '#' },
              { name: 'Privacy policy', href: '#' },
            ],
          },
          { headline: 'Contact', children: [{ name: 'info@unicamp.lt', href: '#' }] },
        ];
      function eC(e) {
        let { layoutQuery: t, sx: a } = e,
          r = (0, o.Z)();
        return (0, i.jsxs)(c.Z, {
          component: 'footer',
          sx: { position: 'relative', bgcolor: 'background.default', ...a },
          children: [
            (0, i.jsx)(E.Z, {}),
            (0, i.jsxs)(P.Z, {
              sx: {
                pb: 5,
                pt: 10,
                textAlign: 'center',
                [r.breakpoints.up(t)]: { textAlign: 'unset' },
              },
              children: [
                (0, i.jsx)(s.T, {}),
                (0, i.jsxs)(M.Z, {
                  container: !0,
                  sx: {
                    mt: 3,
                    justifyContent: 'center',
                    [r.breakpoints.up(t)]: { justifyContent: 'space-between' },
                  },
                  children: [
                    (0, i.jsxs)(M.Z, {
                      xs: 12,
                      [t]: 3,
                      children: [
                        (0, i.jsx)(B.Z, {
                          variant: 'body2',
                          sx: { mx: 'auto', maxWidth: 280, [r.breakpoints.up(t)]: { mx: 'unset' } },
                          children:
                            'The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI \xa9, ready to be customized to your style.',
                        }),
                        (0, i.jsx)(u.Z, {
                          direction: 'row',
                          sx: {
                            mt: 3,
                            mb: 5,
                            justifyContent: 'center',
                            [r.breakpoints.up(t)]: { mb: 0, justifyContent: 'flex-start' },
                          },
                          children: eu.map((e) =>
                            (0, i.jsxs)(
                              W.Z,
                              {
                                color: 'inherit',
                                children: [
                                  'twitter' === e.value && (0, i.jsx)(ey, {}),
                                  'facebook' === e.value && (0, i.jsx)(ex, {}),
                                  'instagram' === e.value && (0, i.jsx)(ew, {}),
                                  'linkedin' === e.value && (0, i.jsx)(eb, {}),
                                ],
                              },
                              e.label
                            )
                          ),
                        }),
                      ],
                    }),
                    (0, i.jsx)(M.Z, {
                      xs: 12,
                      [t]: 6,
                      children: (0, i.jsx)(u.Z, {
                        spacing: 5,
                        sx: {
                          flexDirection: 'column',
                          [r.breakpoints.up(t)]: { flexDirection: 'row' },
                        },
                        children: ek.map((e) =>
                          (0, i.jsxs)(
                            u.Z,
                            {
                              spacing: 2,
                              sx: {
                                width: 1,
                                alignItems: 'center',
                                [r.breakpoints.up(t)]: { alignItems: 'flex-start' },
                              },
                              children: [
                                (0, i.jsx)(B.Z, {
                                  component: 'div',
                                  variant: 'overline',
                                  children: e.headline,
                                }),
                                e.children.map((e) =>
                                  (0, i.jsx)(
                                    D.Z,
                                    {
                                      component: f.r,
                                      href: e.href,
                                      color: 'inherit',
                                      variant: 'body2',
                                      children: e.name,
                                    },
                                    e.name
                                  )
                                ),
                              ],
                            },
                            e.headline
                          )
                        ),
                      }),
                    }),
                  ],
                }),
                (0, i.jsx)(B.Z, {
                  variant: 'body2',
                  sx: { mt: 10 },
                  children: '\xa9 All rights reserved.',
                }),
              ],
            }),
          ],
        });
      }
      function ej(e) {
        let { sx: t } = e;
        return (0, i.jsx)(c.Z, {
          component: 'footer',
          sx: {
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
            ...t,
          },
          children: (0, i.jsxs)(P.Z, {
            children: [
              (0, i.jsx)(s.T, {}),
              (0, i.jsx)(c.Z, {
                sx: { mt: 1, typography: 'caption' },
                children: '\xa9 Visos teisės saugomos.',
              }),
            ],
          }),
        });
      }
      var eF = a(48160),
        e_ = a(89815);
      function eN(e) {
        var t;
        let { sx: a, data: c, children: d, header: u } = e,
          p = (0, o.Z)(),
          v = (0, n.jD)();
        !(function () {
          let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            [t, a] = (0, l.useState)(e),
            i = (0, l.useCallback)(() => {
              a(!0);
            }, []),
            r = (0, l.useCallback)(() => {
              a(!1);
            }, []),
            o = (0, l.useCallback)(() => {
              a((e) => !e);
            }, []);
          (0, l.useMemo)(
            () => ({ value: t, onTrue: i, onFalse: r, onToggle: o, setValue: a }),
            [t, i, r, o, a]
          );
        })();
        let h = null !== (t = null == c ? void 0 : c.nav) && void 0 !== t ? t : [];
        return (0, i.jsx)(eF.P, {
          headerSection: (0, i.jsx)(e_.S, {
            layoutQuery: 'md',
            sx: null == u ? void 0 : u.sx,
            slots: {
              topArea: (0, i.jsx)(r.Z, {
                severity: 'info',
                sx: { display: 'none', borderRadius: 0 },
                children: 'This is an info Alert.',
              }),
              leftArea: (0, i.jsx)(s.T, { isSingle: !1, width: 160 }),
              rightArea: (0, i.jsx)(H, {
                data: h,
                sx: { display: 'none', [p.breakpoints.up('md')]: { mr: 2.5, display: 'flex' } },
              }),
            },
          }),
          footerSection: '/' === v ? (0, i.jsx)(ej, {}) : (0, i.jsx)(eC, { layoutQuery: 'md' }),
          sx: a,
          children: (0, i.jsx)(m, { children: d }),
        });
      }
    },
    90495: function (e, t, a) {
      'use strict';
      a.d(t, {
        r: function () {
          return i.default;
        },
      });
      var i = a(27648);
    },
    3823: function (e, t, a) {
      'use strict';
      a.d(t, {
        jD: function () {
          return r.j;
        },
        tv: function () {
          return i.useRouter;
        },
        lr: function () {
          return i.useSearchParams;
        },
      }),
        a(47897);
      var i = a(99376),
        r = a(58516);
    },
    47897: function (e, t, a) {
      'use strict';
      a.d(t, {
        X: function () {
          return o;
        },
      });
      var i = a(58516),
        r = a(98688);
      function o(e) {
        let t = !(arguments.length > 1) || void 0 === arguments[1] || arguments[1],
          a = (0, r.vZ)((0, i.j)()),
          o = (0, r.Gm)(e);
        if (e.startsWith('#') || (0, r.Bm)(e)) return !1;
        if (t || o) {
          let t = a.includes(e),
            i = (0, r.mn)(e);
          return t || (o && i === a);
        }
        return a === e;
      }
    },
    58516: function (e, t, a) {
      'use strict';
      a.d(t, {
        j: function () {
          return i.usePathname;
        },
      });
      var i = a(99376);
    },
    98688: function (e, t, a) {
      'use strict';
      a.d(t, {
        Bm: function () {
          return n;
        },
        Gm: function () {
          return i;
        },
        mn: function () {
          return o;
        },
        vZ: function () {
          return r;
        },
      });
      let i = (e) => {
        let t = e.split('?')[1];
        return !!t && new URLSearchParams(t).toString().length > 0;
      };
      function r(e) {
        return '/' !== e && e.endsWith('/') ? e.slice(0, -1) : e;
      }
      function o(e) {
        try {
          let t = new URL(e, window.location.origin);
          return r(t.pathname);
        } catch (t) {
          return e;
        }
      }
      function n(e) {
        return e.startsWith('http');
      }
    },
    75781: function (e, t, a) {
      'use strict';
      a.d(t, {
        BA: function () {
          return o;
        },
        BD: function () {
          return l;
        },
        BN: function () {
          return b;
        },
        Kp: function () {
          return d;
        },
        T$: function () {
          return n;
        },
        Vp: function () {
          return c;
        },
        um: function () {
          return s;
        },
        vU: function () {
          return m;
        },
        y0: function () {
          return u;
        },
      });
      var i = a(87718),
        r = a(43073);
      let o = (0, r.QI)(i.BA),
        n = (0, r.QI)(i.T$),
        l = (0, r.QI)(i.BD),
        s = (0, r.QI)(i.um),
        c = (0, r.QI)(i.Vp),
        d = (0, r.QI)(i.Kp),
        m = (0, r.QI)(i.vU),
        u = (0, r.QI)(i.y0),
        p = {
          light: (0, r.QI)({ primary: o[800], secondary: o[600], disabled: o[500] }),
          dark: (0, r.QI)({ primary: '#FFFFFF', secondary: o[500], disabled: o[600] }),
        },
        v = {
          light: (0, r.QI)({ paper: '#FFFFFF', default: '#FFFFFF', neutral: o[200] }),
          dark: (0, r.QI)({ paper: o[800], default: o[900], neutral: '#28323D' }),
        },
        h = {
          hover: (0, r.jr)(o['500Channel'], 0.08),
          selected: (0, r.jr)(o['500Channel'], 0.16),
          focus: (0, r.jr)(o['500Channel'], 0.24),
          disabled: (0, r.jr)(o['500Channel'], 0.8),
          disabledBackground: (0, r.jr)(o['500Channel'], 0.24),
          hoverOpacity: 0.08,
          disabledOpacity: 0.48,
        },
        g = { light: { ...h, active: o[600] }, dark: { ...h, active: o[500] } },
        f = {
          primary: n,
          secondary: l,
          info: s,
          success: c,
          warning: d,
          error: m,
          grey: o,
          common: u,
          divider: (0, r.jr)(o['500Channel'], 0.2),
          action: g,
        },
        b = {
          light: { palette: { ...f, text: p.light, background: v.light, action: g.light } },
          dark: { palette: { ...f, text: p.dark, background: v.dark, action: g.dark } },
        };
    },
    87718: function (e) {
      'use strict';
      e.exports = JSON.parse(
        '{"T$":{"lighter":"#D0E7FF","light":"#84C5F4","main":"#339AF0","dark":"#228BE6","darker":"#1C7ED6","contrastText":"#FFFFFF"},"BD":{"lighter":"#D4F8E5","light":"#7ED6A0","main":"#28A745","dark":"#1F7A33","darker":"#145624","contrastText":"#FFFFFF"},"um":{"lighter":"#CAFDF5","light":"#61F3F3","main":"#00B8D9","dark":"#006C9C","darker":"#003768","contrastText":"#FFFFFF"},"Vp":{"lighter":"#D3FCD2","light":"#77ED8B","main":"#22C55E","dark":"#118D57","darker":"#065E49","contrastText":"#ffffff"},"Kp":{"lighter":"#FFF5CC","light":"#FFD666","main":"#FFAB00","dark":"#B76E00","darker":"#7A4100","contrastText":"#1C252E"},"vU":{"lighter":"#FFE9D5","light":"#FFAC82","main":"#FF5630","dark":"#B71D18","darker":"#7A0916","contrastText":"#FFFFFF"},"BA":{"50":"#FCFDFD","100":"#F9FAFB","200":"#F4F6F8","300":"#DFE3E8","400":"#C4CDD5","500":"#919EAB","600":"#637381","700":"#454F5B","800":"#1C252E","900":"#141A21"},"y0":{"black":"#000000","white":"#FFFFFF"}}'
      );
    },
  },
  function (e) {
    e.O(0, [838, 245, 453, 61, 65, 542, 153, 237, 746, 73, 971, 30, 744], function () {
      return e((e.s = 12050));
    }),
      (_N_E = e.O());
  },
]);
