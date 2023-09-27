import { u as useNuxtApp, a as useRouter, d as defineComponent, c as computed, h as hasProtocol, r as ref, o as onMounted, b as onBeforeUnmount, e as h, f as resolveComponent, p as parseURL, g as parseQuery, w as withTrailingSlash, i as withoutTrailingSlash, n as navigateTo, _ as _export_sfc, j as openBlock, k as createElementBlock, l as createBaseVNode, t as toDisplayString, m as createVNode, q as withCtx, s as createTextVNode, v as pushScopeId, x as popScopeId } from "./entry.e4388931.js";
import { u as useHead } from "./vue.f36acd1f.e54c09cc.js";
const requestIdleCallback = globalThis.requestIdleCallback || ((cb) => {
  const start = Date.now();
  const idleDeadline = {
    didTimeout: false,
    timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
  };
  return setTimeout(() => {
    cb(idleDeadline);
  }, 1);
});
const cancelIdleCallback = globalThis.cancelIdleCallback || ((id) => {
  clearTimeout(id);
});
const onNuxtReady = (callback) => {
  const nuxtApp = useNuxtApp();
  if (nuxtApp.isHydrating) {
    nuxtApp.hooks.hookOnce("app:suspense:resolve", () => {
      requestIdleCallback(callback);
    });
  } else {
    requestIdleCallback(callback);
  }
};
async function preloadRouteComponents(to, router = useRouter()) {
  const { path, matched } = router.resolve(to);
  if (!matched.length) {
    return;
  }
  if (!router._routePreloaded) {
    router._routePreloaded = /* @__PURE__ */ new Set();
  }
  if (router._routePreloaded.has(path)) {
    return;
  }
  const promises = router._preloadPromises = router._preloadPromises || [];
  if (promises.length > 4) {
    return Promise.all(promises).then(() => preloadRouteComponents(to, router));
  }
  router._routePreloaded.add(path);
  const components = matched.map((component) => {
    var _a;
    return (_a = component.components) == null ? void 0 : _a.default;
  }).filter((component) => typeof component === "function");
  for (const component of components) {
    const promise = Promise.resolve(component()).catch(() => {
    }).finally(() => promises.splice(promises.indexOf(promise)));
    promises.push(promise);
  }
  await Promise.all(promises);
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  const resolveTrailingSlashBehavior = (to, resolve) => {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    const normalizeTrailingSlash = options.trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
    if (typeof to === "string") {
      return normalizeTrailingSlash(to, true);
    }
    const path = "path" in to ? to.path : resolve(to).path;
    return {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: normalizeTrailingSlash(path, true)
    };
  };
  return /* @__PURE__ */ defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, { acceptRelative: true });
      });
      const prefetched = ref(false);
      const el = ref(null);
      const elRef = (ref2) => {
        var _a;
        el.value = props.custom ? (_a = ref2 == null ? void 0 : ref2.$el) == null ? void 0 : _a.nextElementSibling : ref2 == null ? void 0 : ref2.$el;
      };
      {
        const shouldPrefetch = props.prefetch !== false && props.noPrefetch !== true && props.target !== "_blank" && !isSlowConnection();
        if (shouldPrefetch) {
          const nuxtApp = useNuxtApp();
          let idleId;
          let unobserve = null;
          onMounted(() => {
            const observer = useObserver();
            onNuxtReady(() => {
              idleId = requestIdleCallback(() => {
                var _a;
                if ((_a = el == null ? void 0 : el.value) == null ? void 0 : _a.tagName) {
                  unobserve = observer.observe(el.value, async () => {
                    unobserve == null ? void 0 : unobserve();
                    unobserve = null;
                    const path = typeof to.value === "string" ? to.value : router.resolve(to.value).fullPath;
                    await Promise.all([
                      nuxtApp.hooks.callHook("link:prefetch", path).catch(() => {
                      }),
                      !isExternal.value && preloadRouteComponents(to.value, router).catch(() => {
                      })
                    ]);
                    prefetched.value = true;
                  });
                }
              });
            });
          });
          onBeforeUnmount(() => {
            if (idleId) {
              cancelIdleCallback(idleId);
            }
            unobserve == null ? void 0 : unobserve();
            unobserve = null;
          });
        }
      }
      return () => {
        var _a, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                // stub properties for compat with vue-router
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_0 = /* @__PURE__ */ defineNuxtLink({ componentName: "NuxtLink" });
function useObserver() {
  const nuxtApp = useNuxtApp();
  if (nuxtApp._observer) {
    return nuxtApp._observer;
  }
  let observer = null;
  const callbacks = /* @__PURE__ */ new Map();
  const observe = (element, callback) => {
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const callback2 = callbacks.get(entry.target);
          const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
          if (isVisible && callback2) {
            callback2();
          }
        }
      });
    }
    callbacks.set(element, callback);
    observer.observe(element);
    return () => {
      callbacks.delete(element);
      observer.unobserve(element);
      if (callbacks.size === 0) {
        observer.disconnect();
        observer = null;
      }
    };
  };
  const _observer = nuxtApp._observer = {
    observe
  };
  return _observer;
}
function isSlowConnection() {
  const cn = navigator.connection;
  if (cn && (cn.saveData || /2g/.test(cn.effectiveType))) {
    return true;
  }
  return false;
}
const error404_vue_vue_type_style_index_0_scoped_f5c0a1bb_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-f5c0a1bb"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "fixed left-0 right-0 spotlight z-10" }, null, -1));
const _hoisted_3 = { class: "max-w-520px text-center z-20" };
const _hoisted_4 = ["textContent"];
const _hoisted_5 = ["textContent"];
const _hoisted_6 = { class: "w-full flex items-center justify-center" };
const _sfc_main = {
  __name: "error-404",
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    statusCode: {
      type: Number,
      default: 404
    },
    statusMessage: {
      type: String,
      default: "Not Found"
    },
    description: {
      type: String,
      default: "Sorry, the page you are looking for could not be found."
    },
    backHome: {
      type: String,
      default: "Go back home"
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e0e0e0}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}h1,p{margin:0}h1{font-size:inherit;font-weight:inherit}`
        }
      ]
    });
    return (_ctx, _cache) => {
      const _component_NuxtLink = __nuxt_component_0;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _hoisted_2,
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("h1", {
            class: "text-8xl sm:text-10xl font-medium mb-8",
            textContent: toDisplayString(__props.statusCode)
          }, null, 8, _hoisted_4),
          createBaseVNode("p", {
            class: "text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight",
            textContent: toDisplayString(__props.description)
          }, null, 8, _hoisted_5),
          createBaseVNode("div", _hoisted_6, [
            createVNode(_component_NuxtLink, {
              to: "/",
              class: "gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(__props.backHome), 1)
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
};
const error404 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f5c0a1bb"]]);
export {
  error404 as default
};
