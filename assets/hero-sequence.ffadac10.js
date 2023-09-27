import { V as inject, s as createTextVNode, N as Fragment, W as Comment, X as isVNode, d as defineComponent, r as ref, K as readonly, B as watch, c as computed, o as onMounted, b as onBeforeUnmount, Y as provide, E as getCurrentInstance, F as withDirectives, J as toRef, e as h, Z as Teleport, $ as nextTick, I as renderSlot, D as onActivated, C as onDeactivated, a0 as mergeProps, a1 as onBeforeMount, z as watchEffect, T as Transition, a2 as TransitionGroup, G as vShow, a3 as cloneVNode, a4 as Text, a5 as shallowRef, P as unref, j as openBlock, k as createElementBlock, l as createBaseVNode, m as createVNode, a6 as isRef, a7 as withKeys, S as createBlock, Q as createCommentVNode, q as withCtx, U as toRaw, t as toDisplayString, O as renderList, v as pushScopeId, x as popScopeId, _ as _export_sfc } from "./entry.e4388931.js";
const ssrContextKey = Symbol("@css-render/vue3-ssr");
function createStyleString(id, style2) {
  return `<style cssr-id="${id}">
${style2}
</style>`;
}
function ssrAdapter(id, style2) {
  const ssrContext = inject(ssrContextKey, null);
  if (ssrContext === null) {
    console.error("[css-render/vue3-ssr]: no ssr context found.");
    return;
  }
  const { styles: styles2, ids } = ssrContext;
  if (ids.has(id))
    return;
  if (styles2 !== null) {
    ids.add(id);
    styles2.push(createStyleString(id, style2));
  }
}
const isBrowser$2 = typeof document !== "undefined";
function useSsrAdapter() {
  if (isBrowser$2)
    return void 0;
  const context = inject(ssrContextKey, null);
  if (context === null)
    return void 0;
  return {
    adapter: ssrAdapter,
    context
  };
}
let onceCbs = [];
const paramsMap = /* @__PURE__ */ new WeakMap();
function flushOnceCallbacks() {
  onceCbs.forEach((cb) => cb(...paramsMap.get(cb)));
  onceCbs = [];
}
function beforeNextFrameOnce(cb, ...params) {
  paramsMap.set(cb, params);
  if (onceCbs.includes(cb))
    return;
  onceCbs.push(cb) === 1 && requestAnimationFrame(flushOnceCallbacks);
}
function happensIn(e, dataSetPropName) {
  let { target } = e;
  while (target) {
    if (target.dataset) {
      if (target.dataset[dataSetPropName] !== void 0)
        return true;
    }
    target = target.parentElement;
  }
  return false;
}
function getPreciseEventTarget(event) {
  return event.composedPath()[0] || null;
}
function depx(value) {
  if (typeof value === "string") {
    if (value.endsWith("px")) {
      return Number(value.slice(0, value.length - 2));
    }
    return Number(value);
  }
  return value;
}
function pxfy(value) {
  if (value === void 0 || value === null)
    return void 0;
  if (typeof value === "number")
    return `${value}px`;
  if (value.endsWith("px"))
    return value;
  return `${value}px`;
}
function getMargin(value, position) {
  const parts = value.trim().split(/\s+/g);
  const margin = {
    top: parts[0]
  };
  switch (parts.length) {
    case 1:
      margin.right = parts[0];
      margin.bottom = parts[0];
      margin.left = parts[0];
      break;
    case 2:
      margin.right = parts[1];
      margin.left = parts[1];
      margin.bottom = parts[0];
      break;
    case 3:
      margin.right = parts[1];
      margin.bottom = parts[2];
      margin.left = parts[1];
      break;
    case 4:
      margin.right = parts[1];
      margin.bottom = parts[2];
      margin.left = parts[3];
      break;
    default:
      throw new Error("[seemly/getMargin]:" + value + " is not a valid value.");
  }
  if (position === void 0)
    return margin;
  return margin[position];
}
function getGap(value, orient) {
  const [rowGap, colGap] = value.split(" ");
  if (!orient)
    return {
      row: rowGap,
      col: colGap || rowGap
    };
  return orient === "row" ? rowGap : colGap;
}
const colors = {
  black: "#000",
  silver: "#C0C0C0",
  gray: "#808080",
  white: "#FFF",
  maroon: "#800000",
  red: "#F00",
  purple: "#800080",
  fuchsia: "#F0F",
  green: "#008000",
  lime: "#0F0",
  olive: "#808000",
  yellow: "#FF0",
  navy: "#000080",
  blue: "#00F",
  teal: "#008080",
  aqua: "#0FF",
  transparent: "#0000"
};
const prefix$1 = "^\\s*";
const suffix = "\\s*$";
const float = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*";
const hex = "([0-9A-Fa-f])";
const dhex = "([0-9A-Fa-f]{2})";
const rgbRegex = new RegExp(`${prefix$1}rgb\\s*\\(${float},${float},${float}\\)${suffix}`);
const rgbaRegex = new RegExp(`${prefix$1}rgba\\s*\\(${float},${float},${float},${float}\\)${suffix}`);
const sHexRegex = new RegExp(`${prefix$1}#${hex}${hex}${hex}${suffix}`);
const hexRegex = new RegExp(`${prefix$1}#${dhex}${dhex}${dhex}${suffix}`);
const sHexaRegex = new RegExp(`${prefix$1}#${hex}${hex}${hex}${hex}${suffix}`);
const hexaRegex = new RegExp(`${prefix$1}#${dhex}${dhex}${dhex}${dhex}${suffix}`);
function parseHex(value) {
  return parseInt(value, 16);
}
function rgba(color) {
  try {
    let i;
    if (i = hexRegex.exec(color)) {
      return [parseHex(i[1]), parseHex(i[2]), parseHex(i[3]), 1];
    } else if (i = rgbRegex.exec(color)) {
      return [roundChannel(i[1]), roundChannel(i[5]), roundChannel(i[9]), 1];
    } else if (i = rgbaRegex.exec(color)) {
      return [
        roundChannel(i[1]),
        roundChannel(i[5]),
        roundChannel(i[9]),
        roundAlpha(i[13])
      ];
    } else if (i = sHexRegex.exec(color)) {
      return [
        parseHex(i[1] + i[1]),
        parseHex(i[2] + i[2]),
        parseHex(i[3] + i[3]),
        1
      ];
    } else if (i = hexaRegex.exec(color)) {
      return [
        parseHex(i[1]),
        parseHex(i[2]),
        parseHex(i[3]),
        roundAlpha(parseHex(i[4]) / 255)
      ];
    } else if (i = sHexaRegex.exec(color)) {
      return [
        parseHex(i[1] + i[1]),
        parseHex(i[2] + i[2]),
        parseHex(i[3] + i[3]),
        roundAlpha(parseHex(i[4] + i[4]) / 255)
      ];
    } else if (color in colors) {
      return rgba(colors[color]);
    }
    throw new Error(`[seemly/rgba]: Invalid color value ${color}.`);
  } catch (e) {
    throw e;
  }
}
function normalizeAlpha(alphaValue) {
  return alphaValue > 1 ? 1 : alphaValue < 0 ? 0 : alphaValue;
}
function stringifyRgba(r, g, b, a) {
  return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${normalizeAlpha(a)})`;
}
function compositeChannel(v1, a1, v2, a2, a) {
  return roundChannel((v1 * a1 * (1 - a2) + v2 * a2) / a);
}
function composite(background, overlay2) {
  if (!Array.isArray(background))
    background = rgba(background);
  if (!Array.isArray(overlay2))
    overlay2 = rgba(overlay2);
  const a1 = background[3];
  const a2 = overlay2[3];
  const alpha = roundAlpha(a1 + a2 - a1 * a2);
  return stringifyRgba(compositeChannel(background[0], a1, overlay2[0], a2, alpha), compositeChannel(background[1], a1, overlay2[1], a2, alpha), compositeChannel(background[2], a1, overlay2[2], a2, alpha), alpha);
}
function changeColor(base2, options) {
  const [r, g, b, a = 1] = Array.isArray(base2) ? base2 : rgba(base2);
  if (options.alpha) {
    return stringifyRgba(r, g, b, options.alpha);
  }
  return stringifyRgba(r, g, b, a);
}
function scaleColor(base2, options) {
  const [r, g, b, a = 1] = Array.isArray(base2) ? base2 : rgba(base2);
  const { lightness = 1, alpha = 1 } = options;
  return toRgbaString([r * lightness, g * lightness, b * lightness, a * alpha]);
}
function roundAlpha(value) {
  const v = Math.round(Number(value) * 100) / 100;
  if (v > 1)
    return 1;
  if (v < 0)
    return 0;
  return v;
}
function roundChannel(value) {
  const v = Math.round(Number(value));
  if (v > 255)
    return 255;
  if (v < 0)
    return 0;
  return v;
}
function toRgbaString(base2) {
  const [r, g, b] = base2;
  if (3 in base2) {
    return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${roundAlpha(base2[3])})`;
  }
  return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, 1)`;
}
function createId(length = 8) {
  return Math.random().toString(16).slice(2, 2 + length);
}
function getSlot$1(instance, slotName = "default", fallback = []) {
  const slots = instance.$slots;
  const slot = slots[slotName];
  if (slot === void 0)
    return fallback;
  return slot();
}
function keep(object, keys2 = [], rest) {
  const keepedObject = {};
  keys2.forEach((key) => {
    keepedObject[key] = object[key];
  });
  return Object.assign(keepedObject, rest);
}
function omit(object, keys2 = [], rest) {
  const omitedObject = {};
  const originalKeys = Object.getOwnPropertyNames(object);
  originalKeys.forEach((originalKey) => {
    if (!keys2.includes(originalKey)) {
      omitedObject[originalKey] = object[originalKey];
    }
  });
  return Object.assign(omitedObject, rest);
}
function flatten$2(vNodes, filterCommentNode = true, result = []) {
  vNodes.forEach((vNode) => {
    if (vNode === null)
      return;
    if (typeof vNode !== "object") {
      if (typeof vNode === "string" || typeof vNode === "number") {
        result.push(createTextVNode(String(vNode)));
      }
      return;
    }
    if (Array.isArray(vNode)) {
      flatten$2(vNode, filterCommentNode, result);
      return;
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null)
        return;
      if (Array.isArray(vNode.children)) {
        flatten$2(vNode.children, filterCommentNode, result);
      }
    } else if (vNode.type !== Comment) {
      result.push(vNode);
    }
  });
  return result;
}
function call(funcs, ...args) {
  if (Array.isArray(funcs)) {
    funcs.forEach((func) => call(func, ...args));
  } else
    return funcs(...args);
}
function keysOf(obj) {
  return Object.keys(obj);
}
const render$1 = (r, ...args) => {
  if (typeof r === "function") {
    return r(...args);
  } else if (typeof r === "string") {
    return createTextVNode(r);
  } else if (typeof r === "number") {
    return createTextVNode(String(r));
  } else {
    return null;
  }
};
function warn$2(location, message) {
  console.error(`[naive/${location}]: ${message}`);
}
function throwError(location, message) {
  throw new Error(`[naive/${location}]: ${message}`);
}
function smallerSize(size2) {
  switch (size2) {
    case "tiny":
      return "mini";
    case "small":
      return "tiny";
    case "medium":
      return "small";
    case "large":
      return "medium";
    case "huge":
      return "large";
  }
  throw Error(`${size2} has no smaller size.`);
}
function getTitleAttribute(value) {
  switch (typeof value) {
    case "string":
      return value || void 0;
    case "number":
      return String(value);
    default:
      return void 0;
  }
}
function getFirstSlotVNode(slots, slotName = "default", props = void 0) {
  const slot = slots[slotName];
  if (!slot) {
    warn$2("getFirstSlotVNode", `slot[${slotName}] is empty`);
    return null;
  }
  const slotContent = flatten$2(slot(props));
  if (slotContent.length === 1) {
    return slotContent[0];
  } else {
    warn$2("getFirstSlotVNode", `slot[${slotName}] should have exactly one child`);
    return null;
  }
}
function createRefSetter(ref2) {
  return (inst) => {
    if (inst) {
      ref2.value = inst.$el;
    } else {
      ref2.value = null;
    }
  };
}
function createInjectionKey(key) {
  return key;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child)) {
      return true;
    }
    if (child.type === Comment) {
      return false;
    }
    if (child.type === Fragment && !ensureValidVNode(child.children)) {
      return false;
    }
    return true;
  }) ? vnodes : null;
}
function resolveSlot(slot, fallback) {
  return slot && ensureValidVNode(slot()) || fallback();
}
function resolveSlotWithProps(slot, props, fallback) {
  return slot && ensureValidVNode(slot(props)) || fallback(props);
}
function resolveWrappedSlot(slot, wrapper) {
  const children = slot && ensureValidVNode(slot());
  return wrapper(children || null);
}
function isSlotEmpty(slot) {
  return !(slot && ensureValidVNode(slot()));
}
function mergeEventHandlers(handlers) {
  const filteredHandlers = handlers.filter((handler) => handler !== void 0);
  if (filteredHandlers.length === 0)
    return void 0;
  if (filteredHandlers.length === 1)
    return filteredHandlers[0];
  return (e) => {
    handlers.forEach((handler) => {
      if (handler) {
        handler(e);
      }
    });
  };
}
const Wrapper = /* @__PURE__ */ defineComponent({
  render() {
    var _a, _b;
    return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
  }
});
const pureNumberRegex = /^(\d|\.)+$/;
const numberRegex = /(\d|\.)+/;
function formatLength(length, { c: c2 = 1, offset = 0, attachPx = true } = {}) {
  if (typeof length === "number") {
    const result = (length + offset) * c2;
    if (result === 0)
      return "0";
    return `${result}px`;
  } else if (typeof length === "string") {
    if (pureNumberRegex.test(length)) {
      const result = (Number(length) + offset) * c2;
      if (attachPx) {
        if (result === 0)
          return "0";
        return `${result}px`;
      } else {
        return `${result}`;
      }
    } else {
      const result = numberRegex.exec(length);
      if (!result)
        return length;
      return length.replace(numberRegex, String((Number(result[0]) + offset) * c2));
    }
  }
  return length;
}
function color2Class(color) {
  return color.replace(/#|\(|\)|,|\s/g, "_");
}
function ampCount(selector) {
  let cnt = 0;
  for (let i = 0; i < selector.length; ++i) {
    if (selector[i] === "&")
      ++cnt;
  }
  return cnt;
}
const separatorRegex = /\s*,(?![^(]*\))\s*/g;
const extraSpaceRegex = /\s+/g;
function resolveSelectorWithAmp(amp, selector) {
  const nextAmp = [];
  selector.split(separatorRegex).forEach((partialSelector) => {
    let round = ampCount(partialSelector);
    if (!round) {
      amp.forEach((partialAmp) => {
        nextAmp.push(
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          (partialAmp && partialAmp + " ") + partialSelector
        );
      });
      return;
    } else if (round === 1) {
      amp.forEach((partialAmp) => {
        nextAmp.push(partialSelector.replace("&", partialAmp));
      });
      return;
    }
    let partialNextAmp = [
      partialSelector
    ];
    while (round--) {
      const nextPartialNextAmp = [];
      partialNextAmp.forEach((selectorItr) => {
        amp.forEach((partialAmp) => {
          nextPartialNextAmp.push(selectorItr.replace("&", partialAmp));
        });
      });
      partialNextAmp = nextPartialNextAmp;
    }
    partialNextAmp.forEach((part) => nextAmp.push(part));
  });
  return nextAmp;
}
function resolveSelector(amp, selector) {
  const nextAmp = [];
  selector.split(separatorRegex).forEach((partialSelector) => {
    amp.forEach((partialAmp) => {
      nextAmp.push((partialAmp && partialAmp + " ") + partialSelector);
    });
  });
  return nextAmp;
}
function parseSelectorPath(selectorPaths) {
  let amp = [""];
  selectorPaths.forEach((selector) => {
    selector = selector && selector.trim();
    if (
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      !selector
    ) {
      return;
    }
    if (selector.includes("&")) {
      amp = resolveSelectorWithAmp(amp, selector);
    } else {
      amp = resolveSelector(amp, selector);
    }
  });
  return amp.join(", ").replace(extraSpaceRegex, " ");
}
function removeElement(el) {
  if (!el)
    return;
  const parentElement = el.parentElement;
  if (parentElement)
    parentElement.removeChild(el);
}
function queryElement(id) {
  return document.querySelector(`style[cssr-id="${id}"]`);
}
function createElement(id) {
  const el = document.createElement("style");
  el.setAttribute("cssr-id", id);
  return el;
}
function isMediaOrSupports(selector) {
  if (!selector)
    return false;
  return /^\s*@(s|m)/.test(selector);
}
const kebabRegex = /[A-Z]/g;
function kebabCase(pattern) {
  return pattern.replace(kebabRegex, (match2) => "-" + match2.toLowerCase());
}
function unwrapProperty(prop, indent = "  ") {
  if (typeof prop === "object" && prop !== null) {
    return " {\n" + Object.entries(prop).map((v) => {
      return indent + `  ${kebabCase(v[0])}: ${v[1]};`;
    }).join("\n") + "\n" + indent + "}";
  }
  return `: ${prop};`;
}
function unwrapProperties(props, instance, params) {
  if (typeof props === "function") {
    return props({
      context: instance.context,
      props: params
    });
  }
  return props;
}
function createStyle(selector, props, instance, params) {
  if (!props)
    return "";
  const unwrappedProps = unwrapProperties(props, instance, params);
  if (!unwrappedProps)
    return "";
  if (typeof unwrappedProps === "string") {
    return `${selector} {
${unwrappedProps}
}`;
  }
  const propertyNames = Object.keys(unwrappedProps);
  if (propertyNames.length === 0) {
    if (instance.config.keepEmptyBlock)
      return selector + " {\n}";
    return "";
  }
  const statements = selector ? [
    selector + " {"
  ] : [];
  propertyNames.forEach((propertyName) => {
    const property2 = unwrappedProps[propertyName];
    if (propertyName === "raw") {
      statements.push("\n" + property2 + "\n");
      return;
    }
    propertyName = kebabCase(propertyName);
    if (property2 !== null && property2 !== void 0) {
      statements.push(`  ${propertyName}${unwrapProperty(property2)}`);
    }
  });
  if (selector) {
    statements.push("}");
  }
  return statements.join("\n");
}
function loopCNodeListWithCallback(children, options, callback) {
  if (!children)
    return;
  children.forEach((child) => {
    if (Array.isArray(child)) {
      loopCNodeListWithCallback(child, options, callback);
    } else if (typeof child === "function") {
      const grandChildren = child(options);
      if (Array.isArray(grandChildren)) {
        loopCNodeListWithCallback(grandChildren, options, callback);
      } else if (grandChildren) {
        callback(grandChildren);
      }
    } else if (child) {
      callback(child);
    }
  });
}
function traverseCNode(node, selectorPaths, styles2, instance, params, styleSheet) {
  const $ = node.$;
  let blockSelector = "";
  if (!$ || typeof $ === "string") {
    if (isMediaOrSupports($)) {
      blockSelector = $;
    } else {
      selectorPaths.push($);
    }
  } else if (typeof $ === "function") {
    const selector2 = $({
      context: instance.context,
      props: params
    });
    if (isMediaOrSupports(selector2)) {
      blockSelector = selector2;
    } else {
      selectorPaths.push(selector2);
    }
  } else {
    if ($.before)
      $.before(instance.context);
    if (!$.$ || typeof $.$ === "string") {
      if (isMediaOrSupports($.$)) {
        blockSelector = $.$;
      } else {
        selectorPaths.push($.$);
      }
    } else if ($.$) {
      const selector2 = $.$({
        context: instance.context,
        props: params
      });
      if (isMediaOrSupports(selector2)) {
        blockSelector = selector2;
      } else {
        selectorPaths.push(selector2);
      }
    }
  }
  const selector = parseSelectorPath(selectorPaths);
  const style2 = createStyle(selector, node.props, instance, params);
  if (blockSelector) {
    styles2.push(`${blockSelector} {`);
    if (styleSheet && style2) {
      styleSheet.insertRule(`${blockSelector} {
${style2}
}
`);
    }
  } else {
    if (styleSheet && style2) {
      styleSheet.insertRule(style2);
    }
    if (!styleSheet && style2.length)
      styles2.push(style2);
  }
  if (node.children) {
    loopCNodeListWithCallback(node.children, {
      context: instance.context,
      props: params
    }, (childNode) => {
      if (typeof childNode === "string") {
        const style3 = createStyle(selector, { raw: childNode }, instance, params);
        if (styleSheet) {
          styleSheet.insertRule(style3);
        } else {
          styles2.push(style3);
        }
      } else {
        traverseCNode(childNode, selectorPaths, styles2, instance, params, styleSheet);
      }
    });
  }
  selectorPaths.pop();
  if (blockSelector) {
    styles2.push("}");
  }
  if ($ && $.after)
    $.after(instance.context);
}
function render(node, instance, props, insertRule = false) {
  const styles2 = [];
  traverseCNode(node, [], styles2, instance, props, insertRule ? node.instance.__styleSheet : void 0);
  if (insertRule)
    return "";
  return styles2.join("\n\n");
}
function murmur2(str) {
  var h2 = 0;
  var k, i = 0, len2 = str.length;
  for (; len2 >= 4; ++i, len2 -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h2 = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  switch (len2) {
    case 3:
      h2 ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h2 ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h2 ^= str.charCodeAt(i) & 255;
      h2 = /* Math.imul(h, m): */
      (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  h2 ^= h2 >>> 13;
  h2 = /* Math.imul(h, m): */
  (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
}
if (typeof window !== "undefined") {
  window.__cssrContext = {};
}
function unmount(intance, node, id) {
  const { els } = node;
  if (id === void 0) {
    els.forEach(removeElement);
    node.els = [];
  } else {
    const target = queryElement(id);
    if (target && els.includes(target)) {
      removeElement(target);
      node.els = els.filter((el) => el !== target);
    }
  }
}
function addElementToList(els, target) {
  els.push(target);
}
function mount(instance, node, id, props, head, silent, force, anchorMetaName, ssrAdapter2) {
  if (silent && !ssrAdapter2) {
    if (id === void 0) {
      console.error("[css-render/mount]: `id` is required in `silent` mode.");
      return;
    }
    const cssrContext = window.__cssrContext;
    if (!cssrContext[id]) {
      cssrContext[id] = true;
      render(node, instance, props, silent);
    }
    return;
  }
  let style2;
  if (id === void 0) {
    style2 = node.render(props);
    id = murmur2(style2);
  }
  if (ssrAdapter2) {
    ssrAdapter2.adapter(id, style2 !== null && style2 !== void 0 ? style2 : node.render(props));
    return;
  }
  const queriedTarget = queryElement(id);
  if (queriedTarget !== null && !force) {
    return queriedTarget;
  }
  const target = queriedTarget !== null && queriedTarget !== void 0 ? queriedTarget : createElement(id);
  if (style2 === void 0)
    style2 = node.render(props);
  target.textContent = style2;
  if (queriedTarget !== null)
    return queriedTarget;
  if (anchorMetaName) {
    const anchorMetaEl = document.head.querySelector(`meta[name="${anchorMetaName}"]`);
    if (anchorMetaEl) {
      document.head.insertBefore(target, anchorMetaEl);
      addElementToList(node.els, target);
      return target;
    }
  }
  if (head) {
    document.head.insertBefore(target, document.head.querySelector("style, link"));
  } else {
    document.head.appendChild(target);
  }
  addElementToList(node.els, target);
  return target;
}
function wrappedRender(props) {
  return render(this, this.instance, props);
}
function wrappedMount(options = {}) {
  const { id, ssr, props, head = false, silent = false, force = false, anchorMetaName } = options;
  const targetElement = mount(this.instance, this, id, props, head, silent, force, anchorMetaName, ssr);
  return targetElement;
}
function wrappedUnmount(options = {}) {
  const { id } = options;
  unmount(this.instance, this, id);
}
const createCNode = function(instance, $, props, children) {
  return {
    instance,
    $,
    props,
    children,
    els: [],
    render: wrappedRender,
    mount: wrappedMount,
    unmount: wrappedUnmount
  };
};
const c$2 = function(instance, $, props, children) {
  if (Array.isArray($)) {
    return createCNode(instance, { $: null }, null, $);
  } else if (Array.isArray(props)) {
    return createCNode(instance, $, null, props);
  } else if (Array.isArray(children)) {
    return createCNode(instance, $, props, children);
  } else {
    return createCNode(instance, $, props, null);
  }
};
function CssRender(config = {}) {
  let styleSheet = null;
  const cssr2 = {
    c: (...args) => c$2(cssr2, ...args),
    use: (plugin2, ...args) => plugin2.install(cssr2, ...args),
    find: queryElement,
    context: {},
    config,
    get __styleSheet() {
      if (!styleSheet) {
        const style2 = document.createElement("style");
        document.head.appendChild(style2);
        styleSheet = document.styleSheets[document.styleSheets.length - 1];
        return styleSheet;
      }
      return styleSheet;
    }
  };
  return cssr2;
}
function exists(id, ssr) {
  if (id === void 0)
    return false;
  if (ssr) {
    const { context: { ids } } = ssr;
    return ids.has(id);
  }
  return queryElement(id) !== null;
}
function plugin$1(options) {
  let _bPrefix = ".";
  let _ePrefix = "__";
  let _mPrefix = "--";
  let c2;
  if (options) {
    let t = options.blockPrefix;
    if (t) {
      _bPrefix = t;
    }
    t = options.elementPrefix;
    if (t) {
      _ePrefix = t;
    }
    t = options.modifierPrefix;
    if (t) {
      _mPrefix = t;
    }
  }
  const _plugin = {
    install(instance) {
      c2 = instance.c;
      const ctx2 = instance.context;
      ctx2.bem = {};
      ctx2.bem.b = null;
      ctx2.bem.els = null;
    }
  };
  function b(arg) {
    let memorizedB;
    let memorizedE;
    return {
      before(ctx2) {
        memorizedB = ctx2.bem.b;
        memorizedE = ctx2.bem.els;
        ctx2.bem.els = null;
      },
      after(ctx2) {
        ctx2.bem.b = memorizedB;
        ctx2.bem.els = memorizedE;
      },
      $({ context, props }) {
        arg = typeof arg === "string" ? arg : arg({ context, props });
        context.bem.b = arg;
        return `${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}`;
      }
    };
  }
  function e(arg) {
    let memorizedE;
    return {
      before(ctx2) {
        memorizedE = ctx2.bem.els;
      },
      after(ctx2) {
        ctx2.bem.els = memorizedE;
      },
      $({ context, props }) {
        arg = typeof arg === "string" ? arg : arg({ context, props });
        context.bem.els = arg.split(",").map((v) => v.trim());
        return context.bem.els.map((el) => `${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${_ePrefix}${el}`).join(", ");
      }
    };
  }
  function m(arg) {
    return {
      $({ context, props }) {
        arg = typeof arg === "string" ? arg : arg({ context, props });
        const modifiers = arg.split(",").map((v) => v.trim());
        function elementToSelector(el) {
          return modifiers.map((modifier) => `&${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${el !== void 0 ? `${_ePrefix}${el}` : ""}${_mPrefix}${modifier}`).join(", ");
        }
        const els = context.bem.els;
        if (els !== null) {
          return elementToSelector(els[0]);
        } else {
          return elementToSelector();
        }
      }
    };
  }
  function notM(arg) {
    return {
      $({ context, props }) {
        arg = typeof arg === "string" ? arg : arg({ context, props });
        const els = context.bem.els;
        return `&:not(${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${els !== null && els.length > 0 ? `${_ePrefix}${els[0]}` : ""}${_mPrefix}${arg})`;
      }
    };
  }
  const cB2 = (...args) => c2(b(args[0]), args[1], args[2]);
  const cE2 = (...args) => c2(e(args[0]), args[1], args[2]);
  const cM2 = (...args) => c2(m(args[0]), args[1], args[2]);
  const cNotM2 = (...args) => c2(notM(args[0]), args[1], args[2]);
  Object.assign(_plugin, {
    cB: cB2,
    cE: cE2,
    cM: cM2,
    cNotM: cNotM2
  });
  return _plugin;
}
function createKey(prefix2, suffix2) {
  return prefix2 + (suffix2 === "default" ? "" : suffix2.replace(/^[a-z]/, (startChar) => startChar.toUpperCase()));
}
createKey("abc", "def");
const namespace = "n";
const prefix = `.${namespace}-`;
const elementPrefix = "__";
const modifierPrefix = "--";
const cssr = CssRender();
const plugin = plugin$1({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix
});
cssr.use(plugin);
const { c: c$1, find } = cssr;
const { cB, cE, cM, cNotM } = plugin;
function insideModal(style2) {
  return c$1(({ props: { bPrefix } }) => `${bPrefix || prefix}modal, ${bPrefix || prefix}drawer`, [style2]);
}
function insidePopover(style2) {
  return c$1(({ props: { bPrefix } }) => `${bPrefix || prefix}popover`, [style2]);
}
function asModal(style2) {
  return c$1(({ props: { bPrefix } }) => `&${bPrefix || prefix}modal`, style2);
}
const cCB = (...args) => {
  return c$1(">", [cB(...args)]);
};
let _isJsdom;
function isJsdom() {
  if (_isJsdom === void 0) {
    _isJsdom = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
  }
  return _isJsdom;
}
const isBrowser$1 = typeof document !== "undefined" && typeof window !== "undefined";
const eventSet = /* @__PURE__ */ new WeakSet();
function markEventEffectPerformed(event) {
  eventSet.add(event);
}
function useFalseUntilTruthy(originalRef) {
  const currentRef = ref(!!originalRef.value);
  if (currentRef.value)
    return readonly(currentRef);
  const stop = watch(originalRef, (value) => {
    if (value) {
      currentRef.value = true;
      stop();
    }
  });
  return readonly(currentRef);
}
function useMemo(getterOrOptions) {
  const computedValueRef = computed(getterOrOptions);
  const valueRef = ref(computedValueRef.value);
  watch(computedValueRef, (value) => {
    valueRef.value = value;
  });
  if (typeof getterOrOptions === "function") {
    return valueRef;
  } else {
    return {
      __v_isRef: true,
      get value() {
        return valueRef.value;
      },
      set value(v) {
        getterOrOptions.set(v);
      }
    };
  }
}
const isBrowser = typeof window !== "undefined";
let fontsReady;
let isFontReady;
const init = () => {
  var _a, _b;
  fontsReady = isBrowser ? (_b = (_a = document) === null || _a === void 0 ? void 0 : _a.fonts) === null || _b === void 0 ? void 0 : _b.ready : void 0;
  isFontReady = false;
  if (fontsReady !== void 0) {
    void fontsReady.then(() => {
      isFontReady = true;
    });
  } else {
    isFontReady = true;
  }
};
init();
function onFontsReady(cb) {
  if (isFontReady)
    return;
  let deactivated = false;
  onMounted(() => {
    if (!isFontReady) {
      fontsReady === null || fontsReady === void 0 ? void 0 : fontsReady.then(() => {
        if (deactivated)
          return;
        cb();
      });
    }
  });
  onBeforeUnmount(() => {
    deactivated = true;
  });
}
function getEventTarget(e) {
  const path = e.composedPath();
  return path[0];
}
const traps = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap()
};
function createTrapHandler(name, el, originalHandler) {
  if (name === "mousemoveoutside") {
    const moveHandler = (e) => {
      if (el.contains(getEventTarget(e)))
        return;
      originalHandler(e);
    };
    return {
      mousemove: moveHandler,
      touchstart: moveHandler
    };
  } else if (name === "clickoutside") {
    let mouseDownOutside = false;
    const downHandler = (e) => {
      mouseDownOutside = !el.contains(getEventTarget(e));
    };
    const upHanlder = (e) => {
      if (!mouseDownOutside)
        return;
      if (el.contains(getEventTarget(e)))
        return;
      originalHandler(e);
    };
    return {
      mousedown: downHandler,
      mouseup: upHanlder,
      touchstart: downHandler,
      touchend: upHanlder
    };
  }
  console.error(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `[evtd/create-trap-handler]: name \`${name}\` is invalid. This could be a bug of evtd.`
  );
  return {};
}
function ensureTrapHandlers(name, el, handler) {
  const handlers = traps[name];
  let elHandlers = handlers.get(el);
  if (elHandlers === void 0) {
    handlers.set(el, elHandlers = /* @__PURE__ */ new WeakMap());
  }
  let trapHandler = elHandlers.get(handler);
  if (trapHandler === void 0) {
    elHandlers.set(handler, trapHandler = createTrapHandler(name, el, handler));
  }
  return trapHandler;
}
function trapOn(name, el, handler, options) {
  if (name === "mousemoveoutside" || name === "clickoutside") {
    const trapHandlers = ensureTrapHandlers(name, el, handler);
    Object.keys(trapHandlers).forEach((key) => {
      on(key, document, trapHandlers[key], options);
    });
    return true;
  }
  return false;
}
function trapOff(name, el, handler, options) {
  if (name === "mousemoveoutside" || name === "clickoutside") {
    const trapHandlers = ensureTrapHandlers(name, el, handler);
    Object.keys(trapHandlers).forEach((key) => {
      off(key, document, trapHandlers[key], options);
    });
    return true;
  }
  return false;
}
function createDelegate() {
  if (typeof window === "undefined") {
    return {
      on: () => {
      },
      off: () => {
      }
    };
  }
  const propagationStopped = /* @__PURE__ */ new WeakMap();
  const immediatePropagationStopped = /* @__PURE__ */ new WeakMap();
  function trackPropagation() {
    propagationStopped.set(this, true);
  }
  function trackImmediate() {
    propagationStopped.set(this, true);
    immediatePropagationStopped.set(this, true);
  }
  function spy(event, propName, fn) {
    const source = event[propName];
    event[propName] = function() {
      fn.apply(event, arguments);
      return source.apply(event, arguments);
    };
    return event;
  }
  function unspy(event, propName) {
    event[propName] = Event.prototype[propName];
  }
  const currentTargets = /* @__PURE__ */ new WeakMap();
  const currentTargetDescriptor = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
  function getCurrentTarget() {
    var _a;
    return (_a = currentTargets.get(this)) !== null && _a !== void 0 ? _a : null;
  }
  function defineCurrentTarget(event, getter) {
    if (currentTargetDescriptor === void 0)
      return;
    Object.defineProperty(event, "currentTarget", {
      configurable: true,
      enumerable: true,
      get: getter !== null && getter !== void 0 ? getter : currentTargetDescriptor.get
    });
  }
  const phaseToTypeToElToHandlers = {
    bubble: {},
    capture: {}
  };
  const typeToWindowEventHandlers = {};
  function createUnifiedHandler() {
    const delegeteHandler = function(e) {
      const { type, eventPhase, bubbles } = e;
      const target = getEventTarget(e);
      if (eventPhase === 2)
        return;
      const phase = eventPhase === 1 ? "capture" : "bubble";
      let cursor = target;
      const path = [];
      while (true) {
        if (cursor === null)
          cursor = window;
        path.push(cursor);
        if (cursor === window) {
          break;
        }
        cursor = cursor.parentNode || null;
      }
      const captureElToHandlers = phaseToTypeToElToHandlers.capture[type];
      const bubbleElToHandlers = phaseToTypeToElToHandlers.bubble[type];
      spy(e, "stopPropagation", trackPropagation);
      spy(e, "stopImmediatePropagation", trackImmediate);
      defineCurrentTarget(e, getCurrentTarget);
      if (phase === "capture") {
        if (captureElToHandlers === void 0)
          return;
        for (let i = path.length - 1; i >= 0; --i) {
          if (propagationStopped.has(e))
            break;
          const target2 = path[i];
          const handlers = captureElToHandlers.get(target2);
          if (handlers !== void 0) {
            currentTargets.set(e, target2);
            for (const handler of handlers) {
              if (immediatePropagationStopped.has(e))
                break;
              handler(e);
            }
          }
          if (i === 0 && !bubbles && bubbleElToHandlers !== void 0) {
            const bubbleHandlers = bubbleElToHandlers.get(target2);
            if (bubbleHandlers !== void 0) {
              for (const handler of bubbleHandlers) {
                if (immediatePropagationStopped.has(e))
                  break;
                handler(e);
              }
            }
          }
        }
      } else if (phase === "bubble") {
        if (bubbleElToHandlers === void 0)
          return;
        for (let i = 0; i < path.length; ++i) {
          if (propagationStopped.has(e))
            break;
          const target2 = path[i];
          const handlers = bubbleElToHandlers.get(target2);
          if (handlers !== void 0) {
            currentTargets.set(e, target2);
            for (const handler of handlers) {
              if (immediatePropagationStopped.has(e))
                break;
              handler(e);
            }
          }
        }
      }
      unspy(e, "stopPropagation");
      unspy(e, "stopImmediatePropagation");
      defineCurrentTarget(e);
    };
    delegeteHandler.displayName = "evtdUnifiedHandler";
    return delegeteHandler;
  }
  function createUnifiedWindowEventHandler() {
    const delegateHandler = function(e) {
      const { type, eventPhase } = e;
      if (eventPhase !== 2)
        return;
      const handlers = typeToWindowEventHandlers[type];
      if (handlers === void 0)
        return;
      handlers.forEach((handler) => handler(e));
    };
    delegateHandler.displayName = "evtdUnifiedWindowEventHandler";
    return delegateHandler;
  }
  const unifiedHandler = createUnifiedHandler();
  const unfiendWindowEventHandler = createUnifiedWindowEventHandler();
  function ensureElToHandlers(phase, type) {
    const phaseHandlers = phaseToTypeToElToHandlers[phase];
    if (phaseHandlers[type] === void 0) {
      phaseHandlers[type] = /* @__PURE__ */ new Map();
      window.addEventListener(type, unifiedHandler, phase === "capture");
    }
    return phaseHandlers[type];
  }
  function ensureWindowEventHandlers(type) {
    const windowEventHandlers = typeToWindowEventHandlers[type];
    if (windowEventHandlers === void 0) {
      typeToWindowEventHandlers[type] = /* @__PURE__ */ new Set();
      window.addEventListener(type, unfiendWindowEventHandler);
    }
    return typeToWindowEventHandlers[type];
  }
  function ensureHandlers(elToHandlers, el) {
    let elHandlers = elToHandlers.get(el);
    if (elHandlers === void 0) {
      elToHandlers.set(el, elHandlers = /* @__PURE__ */ new Set());
    }
    return elHandlers;
  }
  function handlerExist(el, phase, type, handler) {
    const elToHandlers = phaseToTypeToElToHandlers[phase][type];
    if (elToHandlers !== void 0) {
      const handlers = elToHandlers.get(el);
      if (handlers !== void 0) {
        if (handlers.has(handler))
          return true;
      }
    }
    return false;
  }
  function windowEventHandlerExist(type, handler) {
    const handlers = typeToWindowEventHandlers[type];
    if (handlers !== void 0) {
      if (handlers.has(handler)) {
        return true;
      }
    }
    return false;
  }
  function on2(type, el, handler, options) {
    let mergedHandler;
    if (typeof options === "object" && options.once === true) {
      mergedHandler = (e) => {
        off2(type, el, mergedHandler, options);
        handler(e);
      };
    } else {
      mergedHandler = handler;
    }
    const trapped = trapOn(type, el, mergedHandler, options);
    if (trapped)
      return;
    const phase = options === true || typeof options === "object" && options.capture === true ? "capture" : "bubble";
    const elToHandlers = ensureElToHandlers(phase, type);
    const handlers = ensureHandlers(elToHandlers, el);
    if (!handlers.has(mergedHandler))
      handlers.add(mergedHandler);
    if (el === window) {
      const windowEventHandlers = ensureWindowEventHandlers(type);
      if (!windowEventHandlers.has(mergedHandler)) {
        windowEventHandlers.add(mergedHandler);
      }
    }
  }
  function off2(type, el, handler, options) {
    const trapped = trapOff(type, el, handler, options);
    if (trapped)
      return;
    const capture = options === true || typeof options === "object" && options.capture === true;
    const phase = capture ? "capture" : "bubble";
    const elToHandlers = ensureElToHandlers(phase, type);
    const handlers = ensureHandlers(elToHandlers, el);
    if (el === window) {
      const mirrorPhase = capture ? "bubble" : "capture";
      if (!handlerExist(el, mirrorPhase, type, handler) && windowEventHandlerExist(type, handler)) {
        const windowEventHandlers = typeToWindowEventHandlers[type];
        windowEventHandlers.delete(handler);
        if (windowEventHandlers.size === 0) {
          window.removeEventListener(type, unfiendWindowEventHandler);
          typeToWindowEventHandlers[type] = void 0;
        }
      }
    }
    if (handlers.has(handler))
      handlers.delete(handler);
    if (handlers.size === 0) {
      elToHandlers.delete(el);
    }
    if (elToHandlers.size === 0) {
      window.removeEventListener(type, unifiedHandler, phase === "capture");
      phaseToTypeToElToHandlers[phase][type] = void 0;
    }
  }
  return {
    on: on2,
    off: off2
  };
}
const { on, off } = createDelegate();
function useMergedState(controlledStateRef, uncontrolledStateRef) {
  watch(controlledStateRef, (value) => {
    if (value !== void 0) {
      uncontrolledStateRef.value = value;
    }
  });
  return computed(() => {
    if (controlledStateRef.value === void 0) {
      return uncontrolledStateRef.value;
    }
    return controlledStateRef.value;
  });
}
function isMounted() {
  const isMounted2 = ref(false);
  onMounted(() => {
    isMounted2.value = true;
  });
  return readonly(isMounted2);
}
function useCompitable(reactive, keys2) {
  return computed(() => {
    for (const key of keys2) {
      if (reactive[key] !== void 0)
        return reactive[key];
    }
    return reactive[keys2[keys2.length - 1]];
  });
}
const isIos = (typeof window === "undefined" ? false : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
!window.MSStream;
function useIsIos() {
  return isIos;
}
const internalSelectionMenuInjectionKey = createInjectionKey("n-internal-select-menu");
const internalSelectionMenuBodyInjectionKey = createInjectionKey("n-internal-select-menu-body");
const modalBodyInjectionKey = createInjectionKey("n-modal-body");
const drawerBodyInjectionKey = createInjectionKey("n-drawer-body");
const popoverBodyInjectionKey = createInjectionKey("n-popover-body");
const teleportDisabled = "__disabled__";
function useAdjustedTo(props) {
  const modal = inject(modalBodyInjectionKey, null);
  const drawer = inject(drawerBodyInjectionKey, null);
  const popover = inject(popoverBodyInjectionKey, null);
  const selectMenu = inject(internalSelectionMenuBodyInjectionKey, null);
  const fullscreenElementRef = ref();
  if (typeof document !== "undefined") {
    fullscreenElementRef.value = document.fullscreenElement;
    const handleFullscreenChange = () => {
      fullscreenElementRef.value = document.fullscreenElement;
    };
    onMounted(() => {
      on("fullscreenchange", document, handleFullscreenChange);
    });
    onBeforeUnmount(() => {
      off("fullscreenchange", document, handleFullscreenChange);
    });
  }
  return useMemo(() => {
    var _a;
    const { to } = props;
    if (to !== void 0) {
      if (to === false)
        return teleportDisabled;
      if (to === true)
        return fullscreenElementRef.value || "body";
      return to;
    }
    if (modal === null || modal === void 0 ? void 0 : modal.value) {
      return (_a = modal.value.$el) !== null && _a !== void 0 ? _a : modal.value;
    }
    if (drawer === null || drawer === void 0 ? void 0 : drawer.value)
      return drawer.value;
    if (popover === null || popover === void 0 ? void 0 : popover.value)
      return popover.value;
    if (selectMenu === null || selectMenu === void 0 ? void 0 : selectMenu.value)
      return selectMenu.value;
    return to !== null && to !== void 0 ? to : fullscreenElementRef.value || "body";
  });
}
useAdjustedTo.tdkey = teleportDisabled;
useAdjustedTo.propTo = {
  type: [String, Object, Boolean],
  default: void 0
};
function getSlot(scope, slots, slotName = "default") {
  const slot = slots[slotName];
  if (slot === void 0) {
    throw new Error(`[vueuc/${scope}]: slot[${slotName}] is empty.`);
  }
  return slot();
}
function flatten$1(vNodes, filterCommentNode = true, result = []) {
  vNodes.forEach((vNode) => {
    if (vNode === null)
      return;
    if (typeof vNode !== "object") {
      if (typeof vNode === "string" || typeof vNode === "number") {
        result.push(createTextVNode(String(vNode)));
      }
      return;
    }
    if (Array.isArray(vNode)) {
      flatten$1(vNode, filterCommentNode, result);
      return;
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null)
        return;
      if (Array.isArray(vNode.children)) {
        flatten$1(vNode.children, filterCommentNode, result);
      }
    } else if (vNode.type !== Comment) {
      result.push(vNode);
    }
  });
  return result;
}
function getFirstVNode(scope, slots, slotName = "default") {
  const slot = slots[slotName];
  if (slot === void 0) {
    throw new Error(`[vueuc/${scope}]: slot[${slotName}] is empty.`);
  }
  const content = flatten$1(slot());
  if (content.length === 1) {
    return content[0];
  } else {
    throw new Error(`[vueuc/${scope}]: slot[${slotName}] should have exactly one child.`);
  }
}
let viewMeasurer = null;
function ensureViewBoundingRect() {
  if (viewMeasurer === null) {
    viewMeasurer = document.getElementById("v-binder-view-measurer");
    if (viewMeasurer === null) {
      viewMeasurer = document.createElement("div");
      viewMeasurer.id = "v-binder-view-measurer";
      const { style: style2 } = viewMeasurer;
      style2.position = "fixed";
      style2.left = "0";
      style2.right = "0";
      style2.top = "0";
      style2.bottom = "0";
      style2.pointerEvents = "none";
      style2.visibility = "hidden";
      document.body.appendChild(viewMeasurer);
    }
  }
  return viewMeasurer.getBoundingClientRect();
}
function getPointRect(x, y) {
  const viewRect = ensureViewBoundingRect();
  return {
    top: y,
    left: x,
    height: 0,
    width: 0,
    right: viewRect.width - x,
    bottom: viewRect.height - y
  };
}
function getRect(el) {
  const elRect = el.getBoundingClientRect();
  const viewRect = ensureViewBoundingRect();
  return {
    left: elRect.left - viewRect.left,
    top: elRect.top - viewRect.top,
    bottom: viewRect.height + viewRect.top - elRect.bottom,
    right: viewRect.width + viewRect.left - elRect.right,
    width: elRect.width,
    height: elRect.height
  };
}
function getParentNode(node) {
  if (node.nodeType === 9) {
    return null;
  }
  return node.parentNode;
}
function getScrollParent(node) {
  if (node === null)
    return null;
  const parentNode = getParentNode(node);
  if (parentNode === null) {
    return null;
  }
  if (parentNode.nodeType === 9) {
    return document;
  }
  if (parentNode.nodeType === 1) {
    const { overflow, overflowX, overflowY } = getComputedStyle(parentNode);
    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return parentNode;
    }
  }
  return getScrollParent(parentNode);
}
const Binder = /* @__PURE__ */ defineComponent({
  name: "Binder",
  props: {
    syncTargetWithParent: Boolean,
    syncTarget: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    var _a;
    provide("VBinder", (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy);
    const VBinder2 = inject("VBinder", null);
    const targetRef = ref(null);
    const setTargetRef = (el) => {
      targetRef.value = el;
      if (VBinder2 && props.syncTargetWithParent) {
        VBinder2.setTargetRef(el);
      }
    };
    let scrollableNodes = [];
    const ensureScrollListener = () => {
      let cursor = targetRef.value;
      while (true) {
        cursor = getScrollParent(cursor);
        if (cursor === null)
          break;
        scrollableNodes.push(cursor);
      }
      for (const el of scrollableNodes) {
        on("scroll", el, onScroll, true);
      }
    };
    const removeScrollListeners = () => {
      for (const el of scrollableNodes) {
        off("scroll", el, onScroll, true);
      }
      scrollableNodes = [];
    };
    const followerScrollListeners = /* @__PURE__ */ new Set();
    const addScrollListener = (listener) => {
      if (followerScrollListeners.size === 0) {
        ensureScrollListener();
      }
      if (!followerScrollListeners.has(listener)) {
        followerScrollListeners.add(listener);
      }
    };
    const removeScrollListener = (listener) => {
      if (followerScrollListeners.has(listener)) {
        followerScrollListeners.delete(listener);
      }
      if (followerScrollListeners.size === 0) {
        removeScrollListeners();
      }
    };
    const onScroll = () => {
      beforeNextFrameOnce(onScrollRaf);
    };
    const onScrollRaf = () => {
      followerScrollListeners.forEach((listener) => listener());
    };
    const followerResizeListeners = /* @__PURE__ */ new Set();
    const addResizeListener = (listener) => {
      if (followerResizeListeners.size === 0) {
        on("resize", window, onResize);
      }
      if (!followerResizeListeners.has(listener)) {
        followerResizeListeners.add(listener);
      }
    };
    const removeResizeListener = (listener) => {
      if (followerResizeListeners.has(listener)) {
        followerResizeListeners.delete(listener);
      }
      if (followerResizeListeners.size === 0) {
        off("resize", window, onResize);
      }
    };
    const onResize = () => {
      followerResizeListeners.forEach((listener) => listener());
    };
    onBeforeUnmount(() => {
      off("resize", window, onResize);
      removeScrollListeners();
    });
    return {
      targetRef,
      setTargetRef,
      addScrollListener,
      removeScrollListener,
      addResizeListener,
      removeResizeListener
    };
  },
  render() {
    return getSlot("binder", this.$slots);
  }
});
const VBinder = Binder;
const VTarget = /* @__PURE__ */ defineComponent({
  name: "Target",
  setup() {
    const { setTargetRef, syncTarget } = inject("VBinder");
    const setTargetDirective = {
      mounted: setTargetRef,
      updated: setTargetRef
    };
    return {
      syncTarget,
      setTargetDirective
    };
  },
  render() {
    const { syncTarget, setTargetDirective } = this;
    if (syncTarget) {
      return withDirectives(getFirstVNode("follower", this.$slots), [
        [setTargetDirective]
      ]);
    }
    return getFirstVNode("follower", this.$slots);
  }
});
const ctxKey$1 = "@@mmoContext";
const mousemoveoutside = {
  mounted(el, { value }) {
    el[ctxKey$1] = {
      handler: void 0
    };
    if (typeof value === "function") {
      el[ctxKey$1].handler = value;
      on("mousemoveoutside", el, value);
    }
  },
  updated(el, { value }) {
    const ctx2 = el[ctxKey$1];
    if (typeof value === "function") {
      if (ctx2.handler) {
        if (ctx2.handler !== value) {
          off("mousemoveoutside", el, ctx2.handler);
          ctx2.handler = value;
          on("mousemoveoutside", el, value);
        }
      } else {
        el[ctxKey$1].handler = value;
        on("mousemoveoutside", el, value);
      }
    } else {
      if (ctx2.handler) {
        off("mousemoveoutside", el, ctx2.handler);
        ctx2.handler = void 0;
      }
    }
  },
  unmounted(el) {
    const { handler } = el[ctxKey$1];
    if (handler) {
      off("mousemoveoutside", el, handler);
    }
    el[ctxKey$1].handler = void 0;
  }
};
const mousemoveoutside$1 = mousemoveoutside;
const ctxKey = "@@coContext";
const clickoutside = {
  mounted(el, { value, modifiers }) {
    el[ctxKey] = {
      handler: void 0
    };
    if (typeof value === "function") {
      el[ctxKey].handler = value;
      on("clickoutside", el, value, {
        capture: modifiers.capture
      });
    }
  },
  updated(el, { value, modifiers }) {
    const ctx2 = el[ctxKey];
    if (typeof value === "function") {
      if (ctx2.handler) {
        if (ctx2.handler !== value) {
          off("clickoutside", el, ctx2.handler, {
            capture: modifiers.capture
          });
          ctx2.handler = value;
          on("clickoutside", el, value, {
            capture: modifiers.capture
          });
        }
      } else {
        el[ctxKey].handler = value;
        on("clickoutside", el, value, {
          capture: modifiers.capture
        });
      }
    } else {
      if (ctx2.handler) {
        off("clickoutside", el, ctx2.handler, {
          capture: modifiers.capture
        });
        ctx2.handler = void 0;
      }
    }
  },
  unmounted(el, { modifiers }) {
    const { handler } = el[ctxKey];
    if (handler) {
      off("clickoutside", el, handler, {
        capture: modifiers.capture
      });
    }
    el[ctxKey].handler = void 0;
  }
};
const clickoutside$1 = clickoutside;
function warn$1(location, message) {
  console.error(`[vdirs/${location}]: ${message}`);
}
class ZIndexManager {
  constructor() {
    this.elementZIndex = /* @__PURE__ */ new Map();
    this.nextZIndex = 2e3;
  }
  get elementCount() {
    return this.elementZIndex.size;
  }
  ensureZIndex(el, zIndex) {
    const { elementZIndex } = this;
    if (zIndex !== void 0) {
      el.style.zIndex = `${zIndex}`;
      elementZIndex.delete(el);
      return;
    }
    const { nextZIndex } = this;
    if (elementZIndex.has(el)) {
      const currentZIndex = elementZIndex.get(el);
      if (currentZIndex + 1 === this.nextZIndex)
        return;
    }
    el.style.zIndex = `${nextZIndex}`;
    elementZIndex.set(el, nextZIndex);
    this.nextZIndex = nextZIndex + 1;
    this.squashState();
  }
  unregister(el, zIndex) {
    const { elementZIndex } = this;
    if (elementZIndex.has(el)) {
      elementZIndex.delete(el);
    } else if (zIndex === void 0) {
      warn$1("z-index-manager/unregister-element", "Element not found when unregistering.");
    }
    this.squashState();
  }
  squashState() {
    const { elementCount } = this;
    if (!elementCount) {
      this.nextZIndex = 2e3;
    }
    if (this.nextZIndex - elementCount > 2500)
      this.rearrange();
  }
  rearrange() {
    const elementZIndexPair = Array.from(this.elementZIndex.entries());
    elementZIndexPair.sort((pair1, pair2) => {
      return pair1[1] - pair2[1];
    });
    this.nextZIndex = 2e3;
    elementZIndexPair.forEach((pair) => {
      const el = pair[0];
      const zIndex = this.nextZIndex++;
      if (`${zIndex}` !== el.style.zIndex)
        el.style.zIndex = `${zIndex}`;
    });
  }
}
const zIndexManager = new ZIndexManager();
const ctx = "@@ziContext";
const zindexable = {
  mounted(el, bindings) {
    const { value = {} } = bindings;
    const { zIndex, enabled } = value;
    el[ctx] = {
      enabled: !!enabled,
      initialized: false
    };
    if (enabled) {
      zIndexManager.ensureZIndex(el, zIndex);
      el[ctx].initialized = true;
    }
  },
  updated(el, bindings) {
    const { value = {} } = bindings;
    const { zIndex, enabled } = value;
    const cachedEnabled = el[ctx].enabled;
    if (enabled && !cachedEnabled) {
      zIndexManager.ensureZIndex(el, zIndex);
      el[ctx].initialized = true;
    }
    el[ctx].enabled = !!enabled;
  },
  unmounted(el, bindings) {
    if (!el[ctx].initialized)
      return;
    const { value = {} } = bindings;
    const { zIndex } = value;
    zIndexManager.unregister(el, zIndex);
  }
};
const zindexable$1 = zindexable;
function warn(location, message) {
  console.error(`[vueuc/${location}]: ${message}`);
}
const { c } = CssRender();
const cssrAnchorMetaName$1 = "vueuc-style";
function lowBit(n) {
  return n & -n;
}
class FinweckTree {
  /**
   * @param l length of the array
   * @param min min value of the array
   */
  constructor(l, min) {
    this.l = l;
    this.min = min;
    const ft = new Array(l + 1);
    for (let i = 0; i < l + 1; ++i) {
      ft[i] = 0;
    }
    this.ft = ft;
  }
  /**
   * Add arr[i] by n, start from 0
   * @param i the index of the element to be added
   * @param n the value to be added
   */
  add(i, n) {
    if (n === 0)
      return;
    const { l, ft } = this;
    i += 1;
    while (i <= l) {
      ft[i] += n;
      i += lowBit(i);
    }
  }
  /**
   * Get the value of index i
   * @param i index
   * @returns value of the index
   */
  get(i) {
    return this.sum(i + 1) - this.sum(i);
  }
  /**
   * Get the sum of first i elements
   * @param i count of head elements to be added
   * @returns the sum of first i elements
   */
  sum(i) {
    if (i === void 0)
      i = this.l;
    if (i <= 0)
      return 0;
    const { ft, min, l } = this;
    if (i > l)
      throw new Error("[FinweckTree.sum]: `i` is larger than length.");
    let ret = i * min;
    while (i > 0) {
      ret += ft[i];
      i -= lowBit(i);
    }
    return ret;
  }
  /**
   * Get the largest count of head elements whose sum are <= threshold
   * @param threshold
   * @returns the largest count of head elements whose sum are <= threshold
   */
  getBound(threshold) {
    let l = 0;
    let r = this.l;
    while (r > l) {
      const m = Math.floor((l + r) / 2);
      const sumM = this.sum(m);
      if (sumM > threshold) {
        r = m;
        continue;
      } else if (sumM < threshold) {
        if (l === m) {
          if (this.sum(l + 1) <= threshold)
            return l + 1;
          return m;
        }
        l = m;
      } else {
        return m;
      }
    }
    return l;
  }
}
function resolveTo(selector) {
  if (typeof selector === "string") {
    return document.querySelector(selector);
  }
  return selector();
}
const LazyTeleport = /* @__PURE__ */ defineComponent({
  name: "LazyTeleport",
  props: {
    to: {
      type: [String, Object],
      default: void 0
    },
    disabled: Boolean,
    show: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    return {
      showTeleport: useFalseUntilTruthy(toRef(props, "show")),
      mergedTo: computed(() => {
        const { to } = props;
        return to !== null && to !== void 0 ? to : "body";
      })
    };
  },
  render() {
    return this.showTeleport ? this.disabled ? getSlot("lazy-teleport", this.$slots) : h(Teleport, {
      disabled: this.disabled,
      to: this.mergedTo
    }, getSlot("lazy-teleport", this.$slots)) : null;
  }
});
const oppositionPositions = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
const oppositeAligns = {
  start: "end",
  center: "center",
  end: "start"
};
const propToCompare = {
  top: "height",
  bottom: "height",
  left: "width",
  right: "width"
};
const transformOrigins = {
  "bottom-start": "top left",
  bottom: "top center",
  "bottom-end": "top right",
  "top-start": "bottom left",
  top: "bottom center",
  "top-end": "bottom right",
  "right-start": "top left",
  right: "center left",
  "right-end": "bottom left",
  "left-start": "top right",
  left: "center right",
  "left-end": "bottom right"
};
const overlapTransformOrigin = {
  "bottom-start": "bottom left",
  bottom: "bottom center",
  "bottom-end": "bottom right",
  "top-start": "top left",
  top: "top center",
  "top-end": "top right",
  "right-start": "top right",
  right: "center right",
  "right-end": "bottom right",
  "left-start": "top left",
  left: "center left",
  "left-end": "bottom left"
};
const oppositeAlignCssPositionProps = {
  "bottom-start": "right",
  "bottom-end": "left",
  "top-start": "right",
  "top-end": "left",
  "right-start": "bottom",
  "right-end": "top",
  "left-start": "bottom",
  "left-end": "top"
};
const keepOffsetDirection = {
  top: true,
  bottom: false,
  left: true,
  right: false
  // left--
};
const cssPositionToOppositeAlign = {
  top: "end",
  bottom: "start",
  left: "end",
  right: "start"
};
function getPlacementAndOffsetOfFollower(placement, targetRect, followerRect, shift, flip, overlap) {
  if (!flip || overlap) {
    return { placement, top: 0, left: 0 };
  }
  const [position, align] = placement.split("-");
  let properAlign = align !== null && align !== void 0 ? align : "center";
  let properOffset = {
    top: 0,
    left: 0
  };
  const deriveOffset = (oppositeAlignCssSizeProp, alignCssPositionProp, offsetVertically2) => {
    let left = 0;
    let top = 0;
    const diff = followerRect[oppositeAlignCssSizeProp] - targetRect[alignCssPositionProp] - targetRect[oppositeAlignCssSizeProp];
    if (diff > 0 && shift) {
      if (offsetVertically2) {
        top = keepOffsetDirection[alignCssPositionProp] ? diff : -diff;
      } else {
        left = keepOffsetDirection[alignCssPositionProp] ? diff : -diff;
      }
    }
    return {
      left,
      top
    };
  };
  const offsetVertically = position === "left" || position === "right";
  if (properAlign !== "center") {
    const oppositeAlignCssPositionProp = oppositeAlignCssPositionProps[placement];
    const currentAlignCssPositionProp = oppositionPositions[oppositeAlignCssPositionProp];
    const oppositeAlignCssSizeProp = propToCompare[oppositeAlignCssPositionProp];
    if (followerRect[oppositeAlignCssSizeProp] > targetRect[oppositeAlignCssSizeProp]) {
      if (
        // current space is not enough
        // ----------[ target ]---------|
        // -------[     follower        ]
        targetRect[oppositeAlignCssPositionProp] + targetRect[oppositeAlignCssSizeProp] < followerRect[oppositeAlignCssSizeProp]
      ) {
        const followerOverTargetSize = (followerRect[oppositeAlignCssSizeProp] - targetRect[oppositeAlignCssSizeProp]) / 2;
        if (targetRect[oppositeAlignCssPositionProp] < followerOverTargetSize || targetRect[currentAlignCssPositionProp] < followerOverTargetSize) {
          if (targetRect[oppositeAlignCssPositionProp] < targetRect[currentAlignCssPositionProp]) {
            properAlign = oppositeAligns[align];
            properOffset = deriveOffset(oppositeAlignCssSizeProp, currentAlignCssPositionProp, offsetVertically);
          } else {
            properOffset = deriveOffset(oppositeAlignCssSizeProp, oppositeAlignCssPositionProp, offsetVertically);
          }
        } else {
          properAlign = "center";
        }
      }
    } else if (followerRect[oppositeAlignCssSizeProp] < targetRect[oppositeAlignCssSizeProp]) {
      if (targetRect[currentAlignCssPositionProp] < 0 && // opposite align has larger space
      // ------------[   target   ]
      // ----------------[follower]
      targetRect[oppositeAlignCssPositionProp] > targetRect[currentAlignCssPositionProp]) {
        properAlign = oppositeAligns[align];
      }
    }
  } else {
    const possibleAlternativeAlignCssPositionProp1 = position === "bottom" || position === "top" ? "left" : "top";
    const possibleAlternativeAlignCssPositionProp2 = oppositionPositions[possibleAlternativeAlignCssPositionProp1];
    const alternativeAlignCssSizeProp = propToCompare[possibleAlternativeAlignCssPositionProp1];
    const followerOverTargetSize = (followerRect[alternativeAlignCssSizeProp] - targetRect[alternativeAlignCssSizeProp]) / 2;
    if (
      // center is not enough
      // ----------- [ target ]--|
      // -------[     follower     ]
      targetRect[possibleAlternativeAlignCssPositionProp1] < followerOverTargetSize || targetRect[possibleAlternativeAlignCssPositionProp2] < followerOverTargetSize
    ) {
      if (targetRect[possibleAlternativeAlignCssPositionProp1] > targetRect[possibleAlternativeAlignCssPositionProp2]) {
        properAlign = cssPositionToOppositeAlign[possibleAlternativeAlignCssPositionProp1];
        properOffset = deriveOffset(alternativeAlignCssSizeProp, possibleAlternativeAlignCssPositionProp1, offsetVertically);
      } else {
        properAlign = cssPositionToOppositeAlign[possibleAlternativeAlignCssPositionProp2];
        properOffset = deriveOffset(alternativeAlignCssSizeProp, possibleAlternativeAlignCssPositionProp2, offsetVertically);
      }
    }
  }
  let properPosition = position;
  if (
    // space is not enough
    targetRect[position] < followerRect[propToCompare[position]] && // opposite position's space is larger
    targetRect[position] < targetRect[oppositionPositions[position]]
  ) {
    properPosition = oppositionPositions[position];
  }
  return {
    placement: properAlign !== "center" ? `${properPosition}-${properAlign}` : properPosition,
    left: properOffset.left,
    top: properOffset.top
  };
}
function getProperTransformOrigin(placement, overlap) {
  if (overlap)
    return overlapTransformOrigin[placement];
  return transformOrigins[placement];
}
function getOffset(placement, offsetRect, targetRect, offsetTopToStandardPlacement, offsetLeftToStandardPlacement, overlap) {
  if (overlap) {
    switch (placement) {
      case "bottom-start":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left)}px`,
          transform: "translateY(-100%)"
        };
      case "bottom-end":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
          transform: "translateX(-100%) translateY(-100%)"
        };
      case "top-start":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left)}px`,
          transform: ""
        };
      case "top-end":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
          transform: "translateX(-100%)"
        };
      case "right-start":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
          transform: "translateX(-100%)"
        };
      case "right-end":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
          transform: "translateX(-100%) translateY(-100%)"
        };
      case "left-start":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left)}px`,
          transform: ""
        };
      case "left-end":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left)}px`,
          transform: "translateY(-100%)"
        };
      case "top":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2)}px`,
          transform: "translateX(-50%)"
        };
      case "right":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
          transform: "translateX(-100%) translateY(-50%)"
        };
      case "left":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left)}px`,
          transform: "translateY(-50%)"
        };
      case "bottom":
      default:
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2)}px`,
          transform: "translateX(-50%) translateY(-100%)"
        };
    }
  }
  switch (placement) {
    case "bottom-start":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        transform: ""
      };
    case "bottom-end":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        transform: "translateX(-100%)"
      };
    case "top-start":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        transform: "translateY(-100%)"
      };
    case "top-end":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        transform: "translateX(-100%) translateY(-100%)"
      };
    case "right-start":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        transform: ""
      };
    case "right-end":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        transform: "translateY(-100%)"
      };
    case "left-start":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        transform: "translateX(-100%)"
      };
    case "left-end":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        transform: "translateX(-100%) translateY(-100%)"
      };
    case "top":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2 + offsetLeftToStandardPlacement)}px`,
        transform: "translateY(-100%) translateX(-50%)"
      };
    case "right":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2 + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        transform: "translateY(-50%)"
      };
    case "left":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2 + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        transform: "translateY(-50%) translateX(-100%)"
      };
    case "bottom":
    default:
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2 + offsetLeftToStandardPlacement)}px`,
        transform: "translateX(-50%)"
      };
  }
}
const style$n = c([
  c(".v-binder-follower-container", {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "0",
    pointerEvents: "none",
    zIndex: "auto"
  }),
  c(".v-binder-follower-content", {
    position: "absolute",
    zIndex: "auto"
  }, [
    c("> *", {
      pointerEvents: "all"
    })
  ])
]);
const VFollower = /* @__PURE__ */ defineComponent({
  name: "Follower",
  inheritAttrs: false,
  props: {
    show: Boolean,
    enabled: {
      type: Boolean,
      default: void 0
    },
    placement: {
      type: String,
      default: "bottom"
    },
    syncTrigger: {
      type: Array,
      default: ["resize", "scroll"]
    },
    to: [String, Object],
    flip: {
      type: Boolean,
      default: true
    },
    internalShift: Boolean,
    x: Number,
    y: Number,
    width: String,
    minWidth: String,
    containerClass: String,
    teleportDisabled: Boolean,
    zindexable: {
      type: Boolean,
      default: true
    },
    zIndex: Number,
    overlap: Boolean
  },
  setup(props) {
    const VBinder2 = inject("VBinder");
    const mergedEnabledRef = useMemo(() => {
      return props.enabled !== void 0 ? props.enabled : props.show;
    });
    const followerRef = ref(null);
    const offsetContainerRef = ref(null);
    const ensureListeners = () => {
      const { syncTrigger } = props;
      if (syncTrigger.includes("scroll")) {
        VBinder2.addScrollListener(syncPosition);
      }
      if (syncTrigger.includes("resize")) {
        VBinder2.addResizeListener(syncPosition);
      }
    };
    const removeListeners = () => {
      VBinder2.removeScrollListener(syncPosition);
      VBinder2.removeResizeListener(syncPosition);
    };
    onMounted(() => {
      if (mergedEnabledRef.value) {
        syncPosition();
        ensureListeners();
      }
    });
    const ssrAdapter2 = useSsrAdapter();
    style$n.mount({
      id: "vueuc/binder",
      head: true,
      anchorMetaName: cssrAnchorMetaName$1,
      ssr: ssrAdapter2
    });
    onBeforeUnmount(() => {
      removeListeners();
    });
    onFontsReady(() => {
      if (mergedEnabledRef.value) {
        syncPosition();
      }
    });
    const syncPosition = () => {
      if (!mergedEnabledRef.value) {
        return;
      }
      const follower = followerRef.value;
      if (follower === null)
        return;
      const target = VBinder2.targetRef;
      const { x, y, overlap } = props;
      const targetRect = x !== void 0 && y !== void 0 ? getPointRect(x, y) : getRect(target);
      follower.style.setProperty("--v-target-width", `${Math.round(targetRect.width)}px`);
      follower.style.setProperty("--v-target-height", `${Math.round(targetRect.height)}px`);
      const { width, minWidth, placement, internalShift, flip } = props;
      follower.setAttribute("v-placement", placement);
      if (overlap) {
        follower.setAttribute("v-overlap", "");
      } else {
        follower.removeAttribute("v-overlap");
      }
      const { style: style2 } = follower;
      if (width === "target") {
        style2.width = `${targetRect.width}px`;
      } else if (width !== void 0) {
        style2.width = width;
      } else {
        style2.width = "";
      }
      if (minWidth === "target") {
        style2.minWidth = `${targetRect.width}px`;
      } else if (minWidth !== void 0) {
        style2.minWidth = minWidth;
      } else {
        style2.minWidth = "";
      }
      const followerRect = getRect(follower);
      const offsetContainerRect = getRect(offsetContainerRef.value);
      const { left: offsetLeftToStandardPlacement, top: offsetTopToStandardPlacement, placement: properPlacement } = getPlacementAndOffsetOfFollower(placement, targetRect, followerRect, internalShift, flip, overlap);
      const properTransformOrigin = getProperTransformOrigin(properPlacement, overlap);
      const { left, top, transform } = getOffset(properPlacement, offsetContainerRect, targetRect, offsetTopToStandardPlacement, offsetLeftToStandardPlacement, overlap);
      follower.setAttribute("v-placement", properPlacement);
      follower.style.setProperty("--v-offset-left", `${Math.round(offsetLeftToStandardPlacement)}px`);
      follower.style.setProperty("--v-offset-top", `${Math.round(offsetTopToStandardPlacement)}px`);
      follower.style.transform = `translateX(${left}) translateY(${top}) ${transform}`;
      follower.style.setProperty("--v-transform-origin", properTransformOrigin);
      follower.style.transformOrigin = properTransformOrigin;
    };
    watch(mergedEnabledRef, (value) => {
      if (value) {
        ensureListeners();
        syncOnNextTick();
      } else {
        removeListeners();
      }
    });
    const syncOnNextTick = () => {
      nextTick().then(syncPosition).catch((e) => console.error(e));
    };
    [
      "placement",
      "x",
      "y",
      "internalShift",
      "flip",
      "width",
      "overlap",
      "minWidth"
    ].forEach((prop) => {
      watch(toRef(props, prop), syncPosition);
    });
    ["teleportDisabled"].forEach((prop) => {
      watch(toRef(props, prop), syncOnNextTick);
    });
    watch(toRef(props, "syncTrigger"), (value) => {
      if (!value.includes("resize")) {
        VBinder2.removeResizeListener(syncPosition);
      } else {
        VBinder2.addResizeListener(syncPosition);
      }
      if (!value.includes("scroll")) {
        VBinder2.removeScrollListener(syncPosition);
      } else {
        VBinder2.addScrollListener(syncPosition);
      }
    });
    const isMountedRef = isMounted();
    const mergedToRef = useMemo(() => {
      const { to } = props;
      if (to !== void 0)
        return to;
      if (isMountedRef.value) {
        return void 0;
      }
      return void 0;
    });
    return {
      VBinder: VBinder2,
      mergedEnabled: mergedEnabledRef,
      offsetContainerRef,
      followerRef,
      mergedTo: mergedToRef,
      syncPosition
    };
  },
  render() {
    return h(LazyTeleport, {
      show: this.show,
      to: this.mergedTo,
      disabled: this.teleportDisabled
    }, {
      default: () => {
        var _a, _b;
        const vNode = h("div", {
          class: ["v-binder-follower-container", this.containerClass],
          ref: "offsetContainerRef"
        }, [
          h("div", {
            class: "v-binder-follower-content",
            ref: "followerRef"
          }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a))
        ]);
        if (this.zindexable) {
          return withDirectives(vNode, [
            [
              zindexable$1,
              {
                enabled: this.mergedEnabled,
                zIndex: this.zIndex
              }
            ]
          ]);
        }
        return vNode;
      }
    });
  }
});
var resizeObservers = [];
var hasActiveObservations = function() {
  return resizeObservers.some(function(ro) {
    return ro.activeTargets.length > 0;
  });
};
var hasSkippedObservations = function() {
  return resizeObservers.some(function(ro) {
    return ro.skippedTargets.length > 0;
  });
};
var msg = "ResizeObserver loop completed with undelivered notifications.";
var deliverResizeLoopError = function() {
  var event;
  if (typeof ErrorEvent === "function") {
    event = new ErrorEvent("error", {
      message: msg
    });
  } else {
    event = document.createEvent("Event");
    event.initEvent("error", false, false);
    event.message = msg;
  }
  window.dispatchEvent(event);
};
var ResizeObserverBoxOptions;
(function(ResizeObserverBoxOptions2) {
  ResizeObserverBoxOptions2["BORDER_BOX"] = "border-box";
  ResizeObserverBoxOptions2["CONTENT_BOX"] = "content-box";
  ResizeObserverBoxOptions2["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
})(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));
var freeze = function(obj) {
  return Object.freeze(obj);
};
var ResizeObserverSize = function() {
  function ResizeObserverSize2(inlineSize, blockSize) {
    this.inlineSize = inlineSize;
    this.blockSize = blockSize;
    freeze(this);
  }
  return ResizeObserverSize2;
}();
var DOMRectReadOnly = function() {
  function DOMRectReadOnly2(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = this.y;
    this.left = this.x;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    return freeze(this);
  }
  DOMRectReadOnly2.prototype.toJSON = function() {
    var _a = this, x = _a.x, y = _a.y, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
    return { x, y, top, right, bottom, left, width, height };
  };
  DOMRectReadOnly2.fromRect = function(rectangle) {
    return new DOMRectReadOnly2(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  };
  return DOMRectReadOnly2;
}();
var isSVG = function(target) {
  return target instanceof SVGElement && "getBBox" in target;
};
var isHidden = function(target) {
  if (isSVG(target)) {
    var _a = target.getBBox(), width = _a.width, height = _a.height;
    return !width && !height;
  }
  var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
  return !(offsetWidth || offsetHeight || target.getClientRects().length);
};
var isElement = function(obj) {
  var _a;
  if (obj instanceof Element) {
    return true;
  }
  var scope = (_a = obj === null || obj === void 0 ? void 0 : obj.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView;
  return !!(scope && obj instanceof scope.Element);
};
var isReplacedElement = function(target) {
  switch (target.tagName) {
    case "INPUT":
      if (target.type !== "image") {
        break;
      }
    case "VIDEO":
    case "AUDIO":
    case "EMBED":
    case "OBJECT":
    case "CANVAS":
    case "IFRAME":
    case "IMG":
      return true;
  }
  return false;
};
var global$1 = typeof window !== "undefined" ? window : {};
var cache = /* @__PURE__ */ new WeakMap();
var scrollRegexp = /auto|scroll/;
var verticalRegexp = /^tb|vertical/;
var IE = /msie|trident/i.test(globalThis.navigator && global$1.navigator.userAgent);
var parseDimension = function(pixel) {
  return parseFloat(pixel || "0");
};
var size = function(inlineSize, blockSize, switchSizes) {
  if (inlineSize === void 0) {
    inlineSize = 0;
  }
  if (blockSize === void 0) {
    blockSize = 0;
  }
  if (switchSizes === void 0) {
    switchSizes = false;
  }
  return new ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
};
var zeroBoxes = freeze({
  devicePixelContentBoxSize: size(),
  borderBoxSize: size(),
  contentBoxSize: size(),
  contentRect: new DOMRectReadOnly(0, 0, 0, 0)
});
var calculateBoxSizes = function(target, forceRecalculation) {
  if (forceRecalculation === void 0) {
    forceRecalculation = false;
  }
  if (cache.has(target) && !forceRecalculation) {
    return cache.get(target);
  }
  if (isHidden(target)) {
    cache.set(target, zeroBoxes);
    return zeroBoxes;
  }
  var cs = getComputedStyle(target);
  var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
  var removePadding = !IE && cs.boxSizing === "border-box";
  var switchSizes = verticalRegexp.test(cs.writingMode || "");
  var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || "");
  var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || "");
  var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
  var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
  var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
  var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
  var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
  var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
  var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
  var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
  var horizontalPadding = paddingLeft + paddingRight;
  var verticalPadding = paddingTop + paddingBottom;
  var horizontalBorderArea = borderLeft + borderRight;
  var verticalBorderArea = borderTop + borderBottom;
  var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
  var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
  var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
  var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
  var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
  var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
  var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
  var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
  var boxes = freeze({
    devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
    borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
    contentBoxSize: size(contentWidth, contentHeight, switchSizes),
    contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
  });
  cache.set(target, boxes);
  return boxes;
};
var calculateBoxSize = function(target, observedBox, forceRecalculation) {
  var _a = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a.borderBoxSize, contentBoxSize = _a.contentBoxSize, devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
  switch (observedBox) {
    case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
      return devicePixelContentBoxSize;
    case ResizeObserverBoxOptions.BORDER_BOX:
      return borderBoxSize;
    default:
      return contentBoxSize;
  }
};
var ResizeObserverEntry = function() {
  function ResizeObserverEntry2(target) {
    var boxes = calculateBoxSizes(target);
    this.target = target;
    this.contentRect = boxes.contentRect;
    this.borderBoxSize = freeze([boxes.borderBoxSize]);
    this.contentBoxSize = freeze([boxes.contentBoxSize]);
    this.devicePixelContentBoxSize = freeze([boxes.devicePixelContentBoxSize]);
  }
  return ResizeObserverEntry2;
}();
var calculateDepthForNode = function(node) {
  if (isHidden(node)) {
    return Infinity;
  }
  var depth = 0;
  var parent = node.parentNode;
  while (parent) {
    depth += 1;
    parent = parent.parentNode;
  }
  return depth;
};
var broadcastActiveObservations = function() {
  var shallowestDepth = Infinity;
  var callbacks2 = [];
  resizeObservers.forEach(function processObserver(ro) {
    if (ro.activeTargets.length === 0) {
      return;
    }
    var entries = [];
    ro.activeTargets.forEach(function processTarget(ot) {
      var entry = new ResizeObserverEntry(ot.target);
      var targetDepth = calculateDepthForNode(ot.target);
      entries.push(entry);
      ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
      if (targetDepth < shallowestDepth) {
        shallowestDepth = targetDepth;
      }
    });
    callbacks2.push(function resizeObserverCallback() {
      ro.callback.call(ro.observer, entries, ro.observer);
    });
    ro.activeTargets.splice(0, ro.activeTargets.length);
  });
  for (var _i = 0, callbacks_1 = callbacks2; _i < callbacks_1.length; _i++) {
    var callback = callbacks_1[_i];
    callback();
  }
  return shallowestDepth;
};
var gatherActiveObservationsAtDepth = function(depth) {
  resizeObservers.forEach(function processObserver(ro) {
    ro.activeTargets.splice(0, ro.activeTargets.length);
    ro.skippedTargets.splice(0, ro.skippedTargets.length);
    ro.observationTargets.forEach(function processTarget(ot) {
      if (ot.isActive()) {
        if (calculateDepthForNode(ot.target) > depth) {
          ro.activeTargets.push(ot);
        } else {
          ro.skippedTargets.push(ot);
        }
      }
    });
  });
};
var process = function() {
  var depth = 0;
  gatherActiveObservationsAtDepth(depth);
  while (hasActiveObservations()) {
    depth = broadcastActiveObservations();
    gatherActiveObservationsAtDepth(depth);
  }
  if (hasSkippedObservations()) {
    deliverResizeLoopError();
  }
  return depth > 0;
};
var trigger;
var callbacks = [];
var notify = function() {
  return callbacks.splice(0).forEach(function(cb) {
    return cb();
  });
};
var queueMicroTask = function(callback) {
  if (!trigger) {
    var toggle_1 = 0;
    var el_1 = document.createTextNode("");
    var config = { characterData: true };
    new MutationObserver(function() {
      return notify();
    }).observe(el_1, config);
    trigger = function() {
      el_1.textContent = "".concat(toggle_1 ? toggle_1-- : toggle_1++);
    };
  }
  callbacks.push(callback);
  trigger();
};
var queueResizeObserver = function(cb) {
  queueMicroTask(function ResizeObserver2() {
    requestAnimationFrame(cb);
  });
};
var watching = 0;
var isWatching = function() {
  return !!watching;
};
var CATCH_PERIOD = 250;
var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
var events = [
  "resize",
  "load",
  "transitionend",
  "animationend",
  "animationstart",
  "animationiteration",
  "keyup",
  "keydown",
  "mouseup",
  "mousedown",
  "mouseover",
  "mouseout",
  "blur",
  "focus"
];
var time = function(timeout) {
  if (timeout === void 0) {
    timeout = 0;
  }
  return Date.now() + timeout;
};
var scheduled = false;
var Scheduler = function() {
  function Scheduler2() {
    var _this = this;
    this.stopped = true;
    this.listener = function() {
      return _this.schedule();
    };
  }
  Scheduler2.prototype.run = function(timeout) {
    var _this = this;
    if (timeout === void 0) {
      timeout = CATCH_PERIOD;
    }
    if (scheduled) {
      return;
    }
    scheduled = true;
    var until = time(timeout);
    queueResizeObserver(function() {
      var elementsHaveResized = false;
      try {
        elementsHaveResized = process();
      } finally {
        scheduled = false;
        timeout = until - time();
        if (!isWatching()) {
          return;
        }
        if (elementsHaveResized) {
          _this.run(1e3);
        } else if (timeout > 0) {
          _this.run(timeout);
        } else {
          _this.start();
        }
      }
    });
  };
  Scheduler2.prototype.schedule = function() {
    this.stop();
    this.run();
  };
  Scheduler2.prototype.observe = function() {
    var _this = this;
    var cb = function() {
      return _this.observer && _this.observer.observe(document.body, observerConfig);
    };
    document.body ? cb() : global$1.addEventListener("DOMContentLoaded", cb);
  };
  Scheduler2.prototype.start = function() {
    var _this = this;
    if (this.stopped) {
      this.stopped = false;
      this.observer = new MutationObserver(this.listener);
      this.observe();
      events.forEach(function(name) {
        return globalThis.addEventListener(name, _this.listener, true);
      });
    }
  };
  Scheduler2.prototype.stop = function() {
    var _this = this;
    if (!this.stopped) {
      this.observer && this.observer.disconnect();
      events.forEach(function(name) {
        return globalThis.removeEventListener(name, _this.listener, true);
      });
      this.stopped = true;
    }
  };
  return Scheduler2;
}();
var scheduler = new Scheduler();
var updateCount = function(n) {
  !watching && n > 0 && scheduler.start();
  watching += n;
  !watching && scheduler.stop();
};
var skipNotifyOnElement = function(target) {
  return !isSVG(target) && !isReplacedElement(target) && getComputedStyle(target).display === "inline";
};
var ResizeObservation = function() {
  function ResizeObservation2(target, observedBox) {
    this.target = target;
    this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
    this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  ResizeObservation2.prototype.isActive = function() {
    var size2 = calculateBoxSize(this.target, this.observedBox, true);
    if (skipNotifyOnElement(this.target)) {
      this.lastReportedSize = size2;
    }
    if (this.lastReportedSize.inlineSize !== size2.inlineSize || this.lastReportedSize.blockSize !== size2.blockSize) {
      return true;
    }
    return false;
  };
  return ResizeObservation2;
}();
var ResizeObserverDetail = function() {
  function ResizeObserverDetail2(resizeObserver, callback) {
    this.activeTargets = [];
    this.skippedTargets = [];
    this.observationTargets = [];
    this.observer = resizeObserver;
    this.callback = callback;
  }
  return ResizeObserverDetail2;
}();
var observerMap = /* @__PURE__ */ new WeakMap();
var getObservationIndex = function(observationTargets, target) {
  for (var i = 0; i < observationTargets.length; i += 1) {
    if (observationTargets[i].target === target) {
      return i;
    }
  }
  return -1;
};
var ResizeObserverController = function() {
  function ResizeObserverController2() {
  }
  ResizeObserverController2.connect = function(resizeObserver, callback) {
    var detail = new ResizeObserverDetail(resizeObserver, callback);
    observerMap.set(resizeObserver, detail);
  };
  ResizeObserverController2.observe = function(resizeObserver, target, options) {
    var detail = observerMap.get(resizeObserver);
    var firstObservation = detail.observationTargets.length === 0;
    if (getObservationIndex(detail.observationTargets, target) < 0) {
      firstObservation && resizeObservers.push(detail);
      detail.observationTargets.push(new ResizeObservation(target, options && options.box));
      updateCount(1);
      scheduler.schedule();
    }
  };
  ResizeObserverController2.unobserve = function(resizeObserver, target) {
    var detail = observerMap.get(resizeObserver);
    var index = getObservationIndex(detail.observationTargets, target);
    var lastObservation = detail.observationTargets.length === 1;
    if (index >= 0) {
      lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
      detail.observationTargets.splice(index, 1);
      updateCount(-1);
    }
  };
  ResizeObserverController2.disconnect = function(resizeObserver) {
    var _this = this;
    var detail = observerMap.get(resizeObserver);
    detail.observationTargets.slice().forEach(function(ot) {
      return _this.unobserve(resizeObserver, ot.target);
    });
    detail.activeTargets.splice(0, detail.activeTargets.length);
  };
  return ResizeObserverController2;
}();
var ResizeObserver = function() {
  function ResizeObserver2(callback) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    }
    if (typeof callback !== "function") {
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    }
    ResizeObserverController.connect(this, callback);
  }
  ResizeObserver2.prototype.observe = function(target, options) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    }
    if (!isElement(target)) {
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    }
    ResizeObserverController.observe(this, target, options);
  };
  ResizeObserver2.prototype.unobserve = function(target) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    }
    if (!isElement(target)) {
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    }
    ResizeObserverController.unobserve(this, target);
  };
  ResizeObserver2.prototype.disconnect = function() {
    ResizeObserverController.disconnect(this);
  };
  ResizeObserver2.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  };
  return ResizeObserver2;
}();
class ResizeObserverDelegate {
  constructor() {
    this.handleResize = this.handleResize.bind(this);
    this.observer = new (typeof window !== "undefined" && window.ResizeObserver || ResizeObserver)(this.handleResize);
    this.elHandlersMap = /* @__PURE__ */ new Map();
  }
  handleResize(entries) {
    for (const entry of entries) {
      const handler = this.elHandlersMap.get(entry.target);
      if (handler !== void 0) {
        handler(entry);
      }
    }
  }
  registerHandler(el, handler) {
    this.elHandlersMap.set(el, handler);
    this.observer.observe(el);
  }
  unregisterHandler(el) {
    if (!this.elHandlersMap.has(el)) {
      return;
    }
    this.elHandlersMap.delete(el);
    this.observer.unobserve(el);
  }
}
const resizeObserverManager = new ResizeObserverDelegate();
const VResizeObserver = /* @__PURE__ */ defineComponent({
  name: "ResizeObserver",
  props: {
    onResize: Function
  },
  setup(props) {
    let registered = false;
    const proxy = getCurrentInstance().proxy;
    function handleResize(entry) {
      const { onResize } = props;
      if (onResize !== void 0)
        onResize(entry);
    }
    onMounted(() => {
      const el = proxy.$el;
      if (el === void 0) {
        warn("resize-observer", "$el does not exist.");
        return;
      }
      if (el.nextElementSibling !== el.nextSibling) {
        if (el.nodeType === 3 && el.nodeValue !== "") {
          warn("resize-observer", "$el can not be observed (it may be a text node).");
          return;
        }
      }
      if (el.nextElementSibling !== null) {
        resizeObserverManager.registerHandler(el.nextElementSibling, handleResize);
        registered = true;
      }
    });
    onBeforeUnmount(() => {
      if (registered) {
        resizeObserverManager.unregisterHandler(proxy.$el.nextElementSibling);
      }
    });
  },
  render() {
    return renderSlot(this.$slots, "default");
  }
});
let maybeTouch;
function ensureMaybeTouch() {
  if (maybeTouch === void 0) {
    if ("matchMedia" in window) {
      maybeTouch = window.matchMedia("(pointer:coarse)").matches;
    } else {
      maybeTouch = false;
    }
  }
  return maybeTouch;
}
let wheelScale;
function ensureWheelScale() {
  if (wheelScale === void 0) {
    wheelScale = "chrome" in window ? window.devicePixelRatio : 1;
  }
  return wheelScale;
}
const styles = c(".v-vl", {
  maxHeight: "inherit",
  height: "100%",
  overflow: "auto",
  minWidth: "1px"
  // a zero width container won't be scrollable
}, [
  c("&:not(.v-vl--show-scrollbar)", {
    scrollbarWidth: "none"
  }, [
    c("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
      width: 0,
      height: 0,
      display: "none"
    })
  ])
]);
const VVirtualList = /* @__PURE__ */ defineComponent({
  name: "VirtualList",
  inheritAttrs: false,
  props: {
    showScrollbar: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default: () => []
    },
    // it is suppose to be the min height
    itemSize: {
      type: Number,
      required: true
    },
    itemResizable: Boolean,
    itemsStyle: [String, Object],
    visibleItemsTag: {
      type: [String, Object],
      default: "div"
    },
    visibleItemsProps: Object,
    ignoreItemResize: Boolean,
    onScroll: Function,
    onWheel: Function,
    onResize: Function,
    defaultScrollKey: [Number, String],
    defaultScrollIndex: Number,
    keyField: {
      type: String,
      default: "key"
    },
    // Whether it is a good API?
    // ResizeObserver + footer & header is not enough.
    // Too complex for simple case
    paddingTop: {
      type: [Number, String],
      default: 0
    },
    paddingBottom: {
      type: [Number, String],
      default: 0
    }
  },
  setup(props) {
    const ssrAdapter2 = useSsrAdapter();
    styles.mount({
      id: "vueuc/virtual-list",
      head: true,
      anchorMetaName: cssrAnchorMetaName$1,
      ssr: ssrAdapter2
    });
    onMounted(() => {
      const { defaultScrollIndex, defaultScrollKey } = props;
      if (defaultScrollIndex !== void 0 && defaultScrollIndex !== null) {
        scrollTo({ index: defaultScrollIndex });
      } else if (defaultScrollKey !== void 0 && defaultScrollKey !== null) {
        scrollTo({ key: defaultScrollKey });
      }
    });
    let isDeactivated = false;
    let activateStateInitialized = false;
    onActivated(() => {
      isDeactivated = false;
      if (!activateStateInitialized) {
        activateStateInitialized = true;
        return;
      }
      scrollTo({ top: scrollTopRef.value, left: scrollLeft });
    });
    onDeactivated(() => {
      isDeactivated = true;
      if (!activateStateInitialized) {
        activateStateInitialized = true;
      }
    });
    const keyIndexMapRef = computed(() => {
      const map2 = /* @__PURE__ */ new Map();
      const { keyField } = props;
      props.items.forEach((item, index) => {
        map2.set(item[keyField], index);
      });
      return map2;
    });
    const listElRef = ref(null);
    const listHeightRef = ref(void 0);
    const keyToHeightOffset = /* @__PURE__ */ new Map();
    const finweckTreeRef = computed(() => {
      const { items, itemSize, keyField } = props;
      const ft = new FinweckTree(items.length, itemSize);
      items.forEach((item, index) => {
        const key = item[keyField];
        const heightOffset = keyToHeightOffset.get(key);
        if (heightOffset !== void 0) {
          ft.add(index, heightOffset);
        }
      });
      return ft;
    });
    const finweckTreeUpdateTrigger = ref(0);
    let scrollLeft = 0;
    const scrollTopRef = ref(0);
    const startIndexRef = useMemo(() => {
      return Math.max(finweckTreeRef.value.getBound(scrollTopRef.value - depx(props.paddingTop)) - 1, 0);
    });
    const viewportItemsRef = computed(() => {
      const { value: listHeight } = listHeightRef;
      if (listHeight === void 0)
        return [];
      const { items, itemSize } = props;
      const startIndex = startIndexRef.value;
      const endIndex = Math.min(startIndex + Math.ceil(listHeight / itemSize + 1), items.length - 1);
      const viewportItems = [];
      for (let i = startIndex; i <= endIndex; ++i) {
        viewportItems.push(items[i]);
      }
      return viewportItems;
    });
    const scrollTo = (options, y) => {
      if (typeof options === "number") {
        scrollToPosition(options, y, "auto");
        return;
      }
      const { left, top, index, key, position, behavior, debounce = true } = options;
      if (left !== void 0 || top !== void 0) {
        scrollToPosition(left, top, behavior);
      } else if (index !== void 0) {
        scrollToIndex(index, behavior, debounce);
      } else if (key !== void 0) {
        const toIndex = keyIndexMapRef.value.get(key);
        if (toIndex !== void 0)
          scrollToIndex(toIndex, behavior, debounce);
      } else if (position === "bottom") {
        scrollToPosition(0, Number.MAX_SAFE_INTEGER, behavior);
      } else if (position === "top") {
        scrollToPosition(0, 0, behavior);
      }
    };
    let anchorIndex;
    let anchorTimerId = null;
    function scrollToIndex(index, behavior, debounce) {
      const { value: ft } = finweckTreeRef;
      const targetTop = ft.sum(index) + depx(props.paddingTop);
      if (!debounce) {
        listElRef.value.scrollTo({
          left: 0,
          top: targetTop,
          behavior
        });
      } else {
        anchorIndex = index;
        if (anchorTimerId !== null) {
          window.clearTimeout(anchorTimerId);
        }
        anchorTimerId = window.setTimeout(() => {
          anchorIndex = void 0;
          anchorTimerId = null;
        }, 16);
        const { scrollTop, offsetHeight } = listElRef.value;
        if (targetTop > scrollTop) {
          const itemSize = ft.get(index);
          if (targetTop + itemSize <= scrollTop + offsetHeight)
            ;
          else {
            listElRef.value.scrollTo({
              left: 0,
              top: targetTop + itemSize - offsetHeight,
              behavior
            });
          }
        } else {
          listElRef.value.scrollTo({
            left: 0,
            top: targetTop,
            behavior
          });
        }
      }
    }
    function scrollToPosition(left, top, behavior) {
      listElRef.value.scrollTo({
        left,
        top,
        behavior
      });
    }
    function handleItemResize(key, entry) {
      var _a, _b, _c;
      if (isDeactivated)
        return;
      if (props.ignoreItemResize)
        return;
      if (isHideByVShow(entry.target))
        return;
      const { value: ft } = finweckTreeRef;
      const index = keyIndexMapRef.value.get(key);
      const previousHeight = ft.get(index);
      const height = (_c = (_b = (_a = entry.borderBoxSize) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.blockSize) !== null && _c !== void 0 ? _c : entry.contentRect.height;
      if (height === previousHeight)
        return;
      const offset = height - props.itemSize;
      if (offset === 0) {
        keyToHeightOffset.delete(key);
      } else {
        keyToHeightOffset.set(key, height - props.itemSize);
      }
      const delta = height - previousHeight;
      if (delta === 0)
        return;
      ft.add(index, delta);
      const listEl = listElRef.value;
      if (listEl != null) {
        if (anchorIndex === void 0) {
          const previousHeightSum = ft.sum(index);
          if (listEl.scrollTop > previousHeightSum) {
            listEl.scrollBy(0, delta);
          }
        } else {
          if (index < anchorIndex) {
            listEl.scrollBy(0, delta);
          } else if (index === anchorIndex) {
            const previousHeightSum = ft.sum(index);
            if (height + previousHeightSum > // Note, listEl shouldn't have border, nor offsetHeight won't be
            // correct
            listEl.scrollTop + listEl.offsetHeight) {
              listEl.scrollBy(0, delta);
            }
          }
        }
        syncViewport();
      }
      finweckTreeUpdateTrigger.value++;
    }
    const mayUseWheel = !ensureMaybeTouch();
    let wheelCatched = false;
    function handleListScroll(e) {
      var _a;
      (_a = props.onScroll) === null || _a === void 0 ? void 0 : _a.call(props, e);
      if (!mayUseWheel || !wheelCatched) {
        syncViewport();
      }
    }
    function handleListWheel(e) {
      var _a;
      (_a = props.onWheel) === null || _a === void 0 ? void 0 : _a.call(props, e);
      if (mayUseWheel) {
        const listEl = listElRef.value;
        if (listEl != null) {
          if (e.deltaX === 0) {
            if (listEl.scrollTop === 0 && e.deltaY <= 0) {
              return;
            }
            if (listEl.scrollTop + listEl.offsetHeight >= listEl.scrollHeight && e.deltaY >= 0) {
              return;
            }
          }
          e.preventDefault();
          listEl.scrollTop += e.deltaY / ensureWheelScale();
          listEl.scrollLeft += e.deltaX / ensureWheelScale();
          syncViewport();
          wheelCatched = true;
          beforeNextFrameOnce(() => {
            wheelCatched = false;
          });
        }
      }
    }
    function handleListResize(entry) {
      if (isDeactivated)
        return;
      if (isHideByVShow(entry.target))
        return;
      if (entry.contentRect.height === listHeightRef.value)
        return;
      listHeightRef.value = entry.contentRect.height;
      const { onResize } = props;
      if (onResize !== void 0)
        onResize(entry);
    }
    function syncViewport() {
      const { value: listEl } = listElRef;
      if (listEl == null)
        return;
      scrollTopRef.value = listEl.scrollTop;
      scrollLeft = listEl.scrollLeft;
    }
    function isHideByVShow(el) {
      let cursor = el;
      while (cursor !== null) {
        if (cursor.style.display === "none")
          return true;
        cursor = cursor.parentElement;
      }
      return false;
    }
    return {
      listHeight: listHeightRef,
      listStyle: {
        overflow: "auto"
      },
      keyToIndex: keyIndexMapRef,
      itemsStyle: computed(() => {
        const { itemResizable } = props;
        const height = pxfy(finweckTreeRef.value.sum());
        finweckTreeUpdateTrigger.value;
        return [
          props.itemsStyle,
          {
            boxSizing: "content-box",
            height: itemResizable ? "" : height,
            minHeight: itemResizable ? height : "",
            paddingTop: pxfy(props.paddingTop),
            paddingBottom: pxfy(props.paddingBottom)
          }
        ];
      }),
      visibleItemsStyle: computed(() => {
        finweckTreeUpdateTrigger.value;
        return {
          transform: `translateY(${pxfy(finweckTreeRef.value.sum(startIndexRef.value))})`
        };
      }),
      viewportItems: viewportItemsRef,
      listElRef,
      itemsElRef: ref(null),
      scrollTo,
      handleListResize,
      handleListScroll,
      handleListWheel,
      handleItemResize
    };
  },
  render() {
    const { itemResizable, keyField, keyToIndex, visibleItemsTag } = this;
    return h(VResizeObserver, {
      onResize: this.handleListResize
    }, {
      default: () => {
        var _a, _b;
        return h("div", mergeProps(this.$attrs, {
          class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"],
          onScroll: this.handleListScroll,
          onWheel: this.handleListWheel,
          ref: "listElRef"
        }), [
          this.items.length !== 0 ? h("div", {
            ref: "itemsElRef",
            class: "v-vl-items",
            style: this.itemsStyle
          }, [
            h(visibleItemsTag, Object.assign({
              class: "v-vl-visible-items",
              style: this.visibleItemsStyle
            }, this.visibleItemsProps), {
              default: () => this.viewportItems.map((item) => {
                const key = item[keyField];
                const index = keyToIndex.get(key);
                const itemVNode = this.$slots.default({
                  item,
                  index
                })[0];
                if (itemResizable) {
                  return h(VResizeObserver, {
                    key,
                    onResize: (entry) => this.handleItemResize(key, entry)
                  }, {
                    default: () => itemVNode
                  });
                }
                itemVNode.key = key;
                return itemVNode;
              })
            })
          ]) : (_b = (_a = this.$slots).empty) === null || _b === void 0 ? void 0 : _b.call(_a)
        ]);
      }
    });
  }
});
const hiddenAttr = "v-hidden";
const style$m = c("[v-hidden]", {
  display: "none!important"
});
const VOverflow = /* @__PURE__ */ defineComponent({
  name: "Overflow",
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateOverflow: Function
  },
  setup(props, { slots }) {
    const selfRef = ref(null);
    const counterRef = ref(null);
    function deriveCounter() {
      const { value: self2 } = selfRef;
      const { getCounter, getTail } = props;
      let counter;
      if (getCounter !== void 0)
        counter = getCounter();
      else {
        counter = counterRef.value;
      }
      if (!self2 || !counter)
        return;
      if (counter.hasAttribute(hiddenAttr)) {
        counter.removeAttribute(hiddenAttr);
      }
      const { children } = self2;
      const containerWidth = self2.offsetWidth;
      const childWidths = [];
      const tail = slots.tail ? getTail === null || getTail === void 0 ? void 0 : getTail() : null;
      let childWidthSum = tail ? tail.offsetWidth : 0;
      let overflow = false;
      const len2 = self2.children.length - (slots.tail ? 1 : 0);
      for (let i = 0; i < len2 - 1; ++i) {
        if (i < 0)
          continue;
        const child = children[i];
        if (overflow) {
          if (!child.hasAttribute(hiddenAttr)) {
            child.setAttribute(hiddenAttr, "");
          }
          continue;
        } else if (child.hasAttribute(hiddenAttr)) {
          child.removeAttribute(hiddenAttr);
        }
        const childWidth = child.offsetWidth;
        childWidthSum += childWidth;
        childWidths[i] = childWidth;
        if (childWidthSum > containerWidth) {
          const { updateCounter } = props;
          for (let j = i; j >= 0; --j) {
            const restCount = len2 - 1 - j;
            if (updateCounter !== void 0) {
              updateCounter(restCount);
            } else {
              counter.textContent = `${restCount}`;
            }
            const counterWidth = counter.offsetWidth;
            childWidthSum -= childWidths[j];
            if (childWidthSum + counterWidth <= containerWidth || j === 0) {
              overflow = true;
              i = j - 1;
              if (tail) {
                if (i === -1) {
                  tail.style.maxWidth = `${containerWidth - counterWidth}px`;
                  tail.style.boxSizing = "border-box";
                } else {
                  tail.style.maxWidth = "";
                }
              }
              break;
            }
          }
        }
      }
      const { onUpdateOverflow } = props;
      if (!overflow) {
        if (onUpdateOverflow !== void 0) {
          onUpdateOverflow(false);
        }
        counter.setAttribute(hiddenAttr, "");
      } else {
        if (onUpdateOverflow !== void 0) {
          onUpdateOverflow(true);
        }
      }
    }
    const ssrAdapter2 = useSsrAdapter();
    style$m.mount({
      id: "vueuc/overflow",
      head: true,
      anchorMetaName: cssrAnchorMetaName$1,
      ssr: ssrAdapter2
    });
    onMounted(deriveCounter);
    return {
      selfRef,
      counterRef,
      sync: deriveCounter
    };
  },
  render() {
    const { $slots } = this;
    nextTick(this.sync);
    return h("div", {
      class: "v-overflow",
      ref: "selfRef"
    }, [
      renderSlot($slots, "default"),
      // $slots.counter should only has 1 element
      $slots.counter ? $slots.counter() : h("span", {
        style: {
          display: "inline-block"
        },
        ref: "counterRef"
      }),
      // $slots.tail should only has 1 element
      $slots.tail ? $slots.tail() : null
    ]);
  }
});
function isHTMLElement(node) {
  return node instanceof HTMLElement;
}
function focusFirstDescendant(node) {
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i];
    if (isHTMLElement(child)) {
      if (attemptFocus(child) || focusFirstDescendant(child)) {
        return true;
      }
    }
  }
  return false;
}
function focusLastDescendant(element) {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    const child = element.childNodes[i];
    if (isHTMLElement(child)) {
      if (attemptFocus(child) || focusLastDescendant(child)) {
        return true;
      }
    }
  }
  return false;
}
function attemptFocus(element) {
  if (!isFocusable(element)) {
    return false;
  }
  try {
    element.focus({ preventScroll: true });
  } catch (e) {
  }
  return document.activeElement === element;
}
function isFocusable(element) {
  if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute("tabIndex") !== null) {
    return true;
  }
  if (element.getAttribute("disabled")) {
    return false;
  }
  switch (element.nodeName) {
    case "A":
      return !!element.href && element.rel !== "ignore";
    case "INPUT":
      return element.type !== "hidden" && element.type !== "file";
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA":
      return true;
    default:
      return false;
  }
}
let stack = [];
const FocusTrap = /* @__PURE__ */ defineComponent({
  name: "FocusTrap",
  props: {
    disabled: Boolean,
    active: Boolean,
    autoFocus: {
      type: Boolean,
      default: true
    },
    onEsc: Function,
    initialFocusTo: String,
    finalFocusTo: String,
    returnFocusOnDeactivated: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const id = createId();
    const focusableStartRef = ref(null);
    const focusableEndRef = ref(null);
    let activated = false;
    let ignoreInternalFocusChange = false;
    const lastFocusedElement = typeof document === "undefined" ? null : document.activeElement;
    function isCurrentActive() {
      const currentActiveId = stack[stack.length - 1];
      return currentActiveId === id;
    }
    function handleDocumentKeydown(e) {
      var _a;
      if (e.code === "Escape") {
        if (isCurrentActive()) {
          (_a = props.onEsc) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }
      }
    }
    onMounted(() => {
      watch(() => props.active, (value) => {
        if (value) {
          activate();
          on("keydown", document, handleDocumentKeydown);
        } else {
          off("keydown", document, handleDocumentKeydown);
          if (activated) {
            deactivate();
          }
        }
      }, {
        immediate: true
      });
    });
    onBeforeUnmount(() => {
      off("keydown", document, handleDocumentKeydown);
      if (activated)
        deactivate();
    });
    function handleDocumentFocus(e) {
      if (ignoreInternalFocusChange)
        return;
      if (isCurrentActive()) {
        const mainEl = getMainEl();
        if (mainEl === null)
          return;
        if (mainEl.contains(getPreciseEventTarget(e)))
          return;
        resetFocusTo("first");
      }
    }
    function getMainEl() {
      const focusableStartEl = focusableStartRef.value;
      if (focusableStartEl === null)
        return null;
      let mainEl = focusableStartEl;
      while (true) {
        mainEl = mainEl.nextSibling;
        if (mainEl === null)
          break;
        if (mainEl instanceof Element && mainEl.tagName === "DIV") {
          break;
        }
      }
      return mainEl;
    }
    function activate() {
      var _a;
      if (props.disabled)
        return;
      stack.push(id);
      if (props.autoFocus) {
        const { initialFocusTo } = props;
        if (initialFocusTo === void 0) {
          resetFocusTo("first");
        } else {
          (_a = resolveTo(initialFocusTo)) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
        }
      }
      activated = true;
      document.addEventListener("focus", handleDocumentFocus, true);
    }
    function deactivate() {
      var _a;
      if (props.disabled)
        return;
      document.removeEventListener("focus", handleDocumentFocus, true);
      stack = stack.filter((idInStack) => idInStack !== id);
      if (isCurrentActive())
        return;
      const { finalFocusTo } = props;
      if (finalFocusTo !== void 0) {
        (_a = resolveTo(finalFocusTo)) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
      } else if (props.returnFocusOnDeactivated) {
        if (lastFocusedElement instanceof HTMLElement) {
          ignoreInternalFocusChange = true;
          lastFocusedElement.focus({ preventScroll: true });
          ignoreInternalFocusChange = false;
        }
      }
    }
    function resetFocusTo(target) {
      if (!isCurrentActive())
        return;
      if (props.active) {
        const focusableStartEl = focusableStartRef.value;
        const focusableEndEl = focusableEndRef.value;
        if (focusableStartEl !== null && focusableEndEl !== null) {
          const mainEl = getMainEl();
          if (mainEl == null || mainEl === focusableEndEl) {
            ignoreInternalFocusChange = true;
            focusableStartEl.focus({ preventScroll: true });
            ignoreInternalFocusChange = false;
            return;
          }
          ignoreInternalFocusChange = true;
          const focused = target === "first" ? focusFirstDescendant(mainEl) : focusLastDescendant(mainEl);
          ignoreInternalFocusChange = false;
          if (!focused) {
            ignoreInternalFocusChange = true;
            focusableStartEl.focus({ preventScroll: true });
            ignoreInternalFocusChange = false;
          }
        }
      }
    }
    function handleStartFocus(e) {
      if (ignoreInternalFocusChange)
        return;
      const mainEl = getMainEl();
      if (mainEl === null)
        return;
      if (e.relatedTarget !== null && mainEl.contains(e.relatedTarget)) {
        resetFocusTo("last");
      } else {
        resetFocusTo("first");
      }
    }
    function handleEndFocus(e) {
      if (ignoreInternalFocusChange)
        return;
      if (e.relatedTarget !== null && e.relatedTarget === focusableStartRef.value) {
        resetFocusTo("last");
      } else {
        resetFocusTo("first");
      }
    }
    return {
      focusableStartRef,
      focusableEndRef,
      focusableStyle: "position: absolute; height: 0; width: 0;",
      handleStartFocus,
      handleEndFocus
    };
  },
  render() {
    const { default: defaultSlot } = this.$slots;
    if (defaultSlot === void 0)
      return null;
    if (this.disabled)
      return defaultSlot();
    const { active, focusableStyle } = this;
    return h(Fragment, null, [
      h("div", {
        "aria-hidden": "true",
        tabindex: active ? "0" : "-1",
        ref: "focusableStartRef",
        style: focusableStyle,
        onFocus: this.handleStartFocus
      }),
      defaultSlot(),
      h("div", {
        "aria-hidden": "true",
        style: focusableStyle,
        ref: "focusableEndRef",
        tabindex: active ? "0" : "-1",
        onFocus: this.handleEndFocus
      })
    ]);
  }
});
function useOnResize(elRef, onResize) {
  if (onResize) {
    onMounted(() => {
      const { value: el } = elRef;
      if (el) {
        resizeObserverManager.registerHandler(el, onResize);
      }
    });
    onBeforeUnmount(() => {
      const { value: el } = elRef;
      if (el) {
        resizeObserverManager.unregisterHandler(el);
      }
    });
  }
}
function useReactivated(callback) {
  const isDeactivatedRef = { isDeactivated: false };
  let activateStateInitialized = false;
  onActivated(() => {
    isDeactivatedRef.isDeactivated = false;
    if (!activateStateInitialized) {
      activateStateInitialized = true;
      return;
    }
    callback();
  });
  onDeactivated(() => {
    isDeactivatedRef.isDeactivated = true;
    if (!activateStateInitialized) {
      activateStateInitialized = true;
    }
  });
  return isDeactivatedRef;
}
const formItemInjectionKey = createInjectionKey("n-form-item");
function useFormItem(props, { defaultSize = "medium", mergedSize, mergedDisabled } = {}) {
  const NFormItem = inject(formItemInjectionKey, null);
  provide(formItemInjectionKey, null);
  const mergedSizeRef = computed(mergedSize ? () => mergedSize(NFormItem) : () => {
    const { size: size2 } = props;
    if (size2)
      return size2;
    if (NFormItem) {
      const { mergedSize: mergedSize2 } = NFormItem;
      if (mergedSize2.value !== void 0) {
        return mergedSize2.value;
      }
    }
    return defaultSize;
  });
  const mergedDisabledRef = computed(mergedDisabled ? () => mergedDisabled(NFormItem) : () => {
    const { disabled } = props;
    if (disabled !== void 0) {
      return disabled;
    }
    if (NFormItem) {
      return NFormItem.disabled.value;
    }
    return false;
  });
  const mergedStatusRef = computed(() => {
    const { status } = props;
    if (status)
      return status;
    return NFormItem === null || NFormItem === void 0 ? void 0 : NFormItem.mergedValidationStatus.value;
  });
  onBeforeUnmount(() => {
    if (NFormItem) {
      NFormItem.restoreValidation();
    }
  });
  return {
    mergedSizeRef,
    mergedDisabledRef,
    mergedStatusRef,
    nTriggerFormBlur() {
      if (NFormItem) {
        NFormItem.handleContentBlur();
      }
    },
    nTriggerFormChange() {
      if (NFormItem) {
        NFormItem.handleContentChange();
      }
    },
    nTriggerFormFocus() {
      if (NFormItem) {
        NFormItem.handleContentFocus();
      }
    },
    nTriggerFormInput() {
      if (NFormItem) {
        NFormItem.handleContentInput();
      }
    }
  };
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$e = Object.prototype;
var hasOwnProperty$b = objectProto$e.hasOwnProperty;
var nativeObjectToString$1 = objectProto$e.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$b.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$d = Object.prototype;
var nativeObjectToString = objectProto$d.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag$1 = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
}
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var isArray = Array.isArray;
const isArray$1 = isArray;
var INFINITY$1 = 1 / 0;
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$1(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
function identity(value) {
  return value;
}
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$c = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$a).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap$1 = getNative(root$1, "WeakMap");
const WeakMap$2 = WeakMap$1;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
const baseCreate$1 = baseCreate;
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
const defineProperty$1 = defineProperty;
var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
  return defineProperty$1(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
const baseSetToString$1 = baseSetToString;
var setToString = shortOut(baseSetToString$1);
const setToString$1 = setToString;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$b = Object.prototype;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$9.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
function baseRest(func, start) {
  return setToString$1(overRest(func, start, identity), func + "");
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var objectProto$a = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$a;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$9 = Object.prototype;
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$8.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$8 = Object.prototype;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$7.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$6.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$5.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray$1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$4.call(data, key) ? data[key] : void 0;
}
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$3.call(data, key);
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root$1, "Map");
const Map$2 = Map$1;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size2 = data.size;
  data.set(key, value);
  this.size += data.size == size2 ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
    if (cache2.has(key)) {
      return cache2.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache2.set(key, result) || cache2;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}
memoize.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache2.size === MAX_MEMOIZE_SIZE) {
      cache2.clear();
    }
    return key;
  });
  var cache2 = result.cache;
  return result;
}
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match2, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match2);
  });
  return result;
});
const stringToPath$1 = stringToPath;
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function castPath(value, object) {
  if (isArray$1(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath$1(toString(value));
}
var INFINITY = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : void 0;
}
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet(object, path);
  return result === void 0 ? defaultValue : result;
}
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
var objectTag$2 = "[object Object]";
var funcProto = Function.prototype, objectProto$3 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$2) {
    return false;
  }
  var proto = getPrototype$1(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$2.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
function baseSlice(array, start, end) {
  var index = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
function castSlice(array, start, end) {
  var length = array.length;
  end = end === void 0 ? length : end;
  return !start && end >= length ? array : baseSlice(array, start, end);
}
var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1, rsVarRange$1 = "\\ufe0e\\ufe0f";
var rsZWJ$1 = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + "]");
function hasUnicode(string) {
  return reHasUnicode.test(string);
}
function asciiToArray(string) {
  return string.split("");
}
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d";
var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}
function stringToArray(string) {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);
    var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
var upperFirst = createCaseFirst("toUpperCase");
const upperFirst$1 = upperFirst;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$2 = Object.prototype;
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
const getSymbols$1 = getSymbols;
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
var DataView = getNative(root$1, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set$1 = getNative(root$1, "Set");
const Set$2 = Set$1;
var mapTag$1 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
var dataViewTag$1 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$2);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$1 || Map$2 && getTag(new Map$2()) != mapTag$1 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$1 || WeakMap$2 && getTag(new WeakMap$2()) != weakMapTag) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$1;
        case mapCtorString:
          return mapTag$1;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$1;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var Uint8Array = root$1.Uint8Array;
const Uint8Array$1 = Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
function setCacheHas(value) {
  return this.__data__.has(value);
}
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
function cacheHas(cache2, key) {
  return cache2.has(key);
}
var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack2) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack2.get(array);
  var othStacked = stack2.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
  stack2.set(array, other);
  stack2.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack2) : customizer(arrValue, othValue, index, array, other, stack2);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack2))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack2))) {
      result = false;
      break;
    }
  }
  stack2["delete"](array);
  stack2["delete"](other);
  return result;
}
function mapToArray(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack2) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag:
      var convert = mapToArray;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack2.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;
      stack2.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack2);
      stack2["delete"](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var COMPARE_PARTIAL_FLAG$3 = 1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack2) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack2.get(object);
  var othStacked = stack2.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack2.set(object, other);
  stack2.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack2) : customizer(objValue, othValue, key, object, other, stack2);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack2) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack2["delete"](object);
  stack2["delete"](other);
  return result;
}
var COMPARE_PARTIAL_FLAG$2 = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack2) {
  var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer$1(object)) {
    if (!isBuffer$1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack2 || (stack2 = new Stack());
    return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack2) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack2);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack2 || (stack2 = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack2);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack2 || (stack2 = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack2);
}
function baseIsEqual(value, other, bitmask, customizer, stack2) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack2);
}
var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack2 = new Stack();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack2);
      }
      if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack2) : result)) {
        return false;
      }
    }
  }
  return true;
}
function isStrictComparable(value) {
  return value === value && !isObject(value);
}
function getMatchData(object) {
  var result = keys(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray$1(object) || isArguments$1(object));
}
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == "object") {
    return isArray$1(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }
  return property(value);
}
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var baseFor = createBaseFor();
const baseFor$1 = baseFor;
function baseForOwn(object, iteratee) {
  return object && baseFor$1(object, iteratee, keys);
}
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var baseEach = createBaseEach(baseForOwn);
const baseEach$1 = baseEach;
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack2) {
  var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack2.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack2) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray$1(srcValue), isBuff = !isArr && isBuffer$1(srcValue), isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$1(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments$1(srcValue)) {
      newValue = objValue;
      if (isArguments$1(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack2.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack2);
    stack2["delete"](srcValue);
  }
  assignMergeValue(object, key, newValue);
}
function baseMerge(object, source, srcIndex, customizer, stack2) {
  if (object === source) {
    return;
  }
  baseFor$1(source, function(srcValue, key) {
    stack2 || (stack2 = new Stack());
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack2);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack2) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
function baseMap(collection, iteratee) {
  var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
  baseEach$1(collection, function(value, key, collection2) {
    result[++index] = iteratee(value, key, collection2);
  });
  return result;
}
function map(collection, iteratee) {
  var func = isArray$1(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee));
}
var merge$1 = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
const merge$2 = merge$1;
const commonVariables$9 = {
  fontFamily: 'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontFamilyMono: "v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace",
  fontWeight: "400",
  fontWeightStrong: "500",
  cubicBezierEaseInOut: "cubic-bezier(.4, 0, .2, 1)",
  cubicBezierEaseOut: "cubic-bezier(0, 0, .2, 1)",
  cubicBezierEaseIn: "cubic-bezier(.4, 0, 1, 1)",
  borderRadius: "3px",
  borderRadiusSmall: "2px",
  fontSize: "14px",
  fontSizeMini: "12px",
  fontSizeTiny: "12px",
  fontSizeSmall: "14px",
  fontSizeMedium: "14px",
  fontSizeLarge: "15px",
  fontSizeHuge: "16px",
  lineHeight: "1.6",
  heightMini: "16px",
  heightTiny: "22px",
  heightSmall: "28px",
  heightMedium: "34px",
  heightLarge: "40px",
  heightHuge: "46px"
};
const {
  fontSize,
  fontFamily,
  lineHeight
} = commonVariables$9;
const globalStyle = c$1("body", `
 margin: 0;
 font-size: ${fontSize};
 font-family: ${fontFamily};
 line-height: ${lineHeight};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [c$1("input", `
 font-family: inherit;
 font-size: inherit;
 `)]);
const configProviderInjectionKey = createInjectionKey("n-config-provider");
const cssrAnchorMetaName = "naive-ui-style";
function createTheme(theme) {
  return theme;
}
function useTheme(resolveId, mountId, style2, defaultTheme, props, clsPrefixRef) {
  const ssrAdapter2 = useSsrAdapter();
  const NConfigProvider = inject(configProviderInjectionKey, null);
  if (style2) {
    const mountStyle = () => {
      const clsPrefix = clsPrefixRef === null || clsPrefixRef === void 0 ? void 0 : clsPrefixRef.value;
      style2.mount({
        id: clsPrefix === void 0 ? mountId : clsPrefix + mountId,
        head: true,
        props: {
          bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
        },
        anchorMetaName: cssrAnchorMetaName,
        ssr: ssrAdapter2
      });
      if (!(NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.preflightStyleDisabled)) {
        globalStyle.mount({
          id: "n-global",
          head: true,
          anchorMetaName: cssrAnchorMetaName,
          ssr: ssrAdapter2
        });
      }
    };
    if (ssrAdapter2) {
      mountStyle();
    } else {
      onBeforeMount(mountStyle);
    }
  }
  const mergedThemeRef = computed(() => {
    var _a;
    const { theme: { common: selfCommon, self: self2, peers = {} } = {}, themeOverrides: selfOverrides = {}, builtinThemeOverrides: builtinOverrides = {} } = props;
    const { common: selfCommonOverrides, peers: peersOverrides } = selfOverrides;
    const { common: globalCommon = void 0, [resolveId]: { common: globalSelfCommon = void 0, self: globalSelf = void 0, peers: globalPeers = {} } = {} } = (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeRef.value) || {};
    const { common: globalCommonOverrides = void 0, [resolveId]: globalSelfOverrides = {} } = (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeOverridesRef.value) || {};
    const { common: globalSelfCommonOverrides, peers: globalPeersOverrides = {} } = globalSelfOverrides;
    const mergedCommon = merge$2({}, selfCommon || globalSelfCommon || globalCommon || defaultTheme.common, globalCommonOverrides, globalSelfCommonOverrides, selfCommonOverrides);
    const mergedSelf = merge$2(
      // {}, executed every time, no need for empty obj
      (_a = self2 || globalSelf || defaultTheme.self) === null || _a === void 0 ? void 0 : _a(mergedCommon),
      builtinOverrides,
      globalSelfOverrides,
      selfOverrides
    );
    return {
      common: mergedCommon,
      self: mergedSelf,
      peers: merge$2({}, defaultTheme.peers, globalPeers, peers),
      peerOverrides: merge$2({}, builtinOverrides.peers, globalPeersOverrides, peersOverrides)
    };
  });
  return mergedThemeRef;
}
useTheme.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
};
const defaultClsPrefix = "n";
function useConfig(props = {}, options = {
  defaultBordered: true
}) {
  const NConfigProvider = inject(configProviderInjectionKey, null);
  return {
    // NConfigProvider,
    inlineThemeDisabled: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.inlineThemeDisabled,
    mergedRtlRef: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedRtlRef,
    mergedComponentPropsRef: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedComponentPropsRef,
    mergedBreakpointsRef: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedBreakpointsRef,
    mergedBorderedRef: computed(() => {
      var _a, _b;
      const { bordered } = props;
      if (bordered !== void 0)
        return bordered;
      return (_b = (_a = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedBorderedRef.value) !== null && _a !== void 0 ? _a : options.defaultBordered) !== null && _b !== void 0 ? _b : true;
    }),
    mergedClsPrefixRef: computed(() => {
      const clsPrefix = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedClsPrefixRef.value;
      return clsPrefix || defaultClsPrefix;
    }),
    namespaceRef: computed(() => NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedNamespaceRef.value)
  };
}
const enUS = {
  name: "en-US",
  global: {
    undo: "Undo",
    redo: "Redo",
    confirm: "Confirm",
    clear: "Clear"
  },
  Popconfirm: {
    positiveText: "Confirm",
    negativeText: "Cancel"
  },
  Cascader: {
    placeholder: "Please Select",
    loading: "Loading",
    loadingRequiredMessage: (label) => `Please load all ${label}'s descendants before checking it.`
  },
  Time: {
    dateFormat: "yyyy-MM-dd",
    dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
  },
  DatePicker: {
    yearFormat: "yyyy",
    monthFormat: "MMM",
    dayFormat: "eeeeee",
    yearTypeFormat: "yyyy",
    monthTypeFormat: "yyyy-MM",
    dateFormat: "yyyy-MM-dd",
    dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
    quarterFormat: "yyyy-qqq",
    clear: "Clear",
    now: "Now",
    confirm: "Confirm",
    selectTime: "Select Time",
    selectDate: "Select Date",
    datePlaceholder: "Select Date",
    datetimePlaceholder: "Select Date and Time",
    monthPlaceholder: "Select Month",
    yearPlaceholder: "Select Year",
    quarterPlaceholder: "Select Quarter",
    startDatePlaceholder: "Start Date",
    endDatePlaceholder: "End Date",
    startDatetimePlaceholder: "Start Date and Time",
    endDatetimePlaceholder: "End Date and Time",
    startMonthPlaceholder: "Start Month",
    endMonthPlaceholder: "End Month",
    monthBeforeYear: true,
    firstDayOfWeek: 6,
    today: "Today"
  },
  DataTable: {
    checkTableAll: "Select all in the table",
    uncheckTableAll: "Unselect all in the table",
    confirm: "Confirm",
    clear: "Clear"
  },
  LegacyTransfer: {
    sourceTitle: "Source",
    targetTitle: "Target"
  },
  Transfer: {
    selectAll: "Select all",
    unselectAll: "Unselect all",
    clearAll: "Clear",
    total: (num) => `Total ${num} items`,
    selected: (num) => `${num} items selected`
  },
  Empty: {
    description: "No Data"
  },
  Select: {
    placeholder: "Please Select"
  },
  TimePicker: {
    placeholder: "Select Time",
    positiveText: "OK",
    negativeText: "Cancel",
    now: "Now"
  },
  Pagination: {
    goto: "Goto",
    selectionSuffix: "page"
  },
  DynamicTags: {
    add: "Add"
  },
  Log: {
    loading: "Loading"
  },
  Input: {
    placeholder: "Please Input"
  },
  InputNumber: {
    placeholder: "Please Input"
  },
  DynamicInput: {
    create: "Create"
  },
  ThemeEditor: {
    title: "Theme Editor",
    clearAllVars: "Clear All Variables",
    clearSearch: "Clear Search",
    filterCompName: "Filter Component Name",
    filterVarName: "Filter Variable Name",
    import: "Import",
    export: "Export",
    restore: "Reset to Default"
  },
  Image: {
    tipPrevious: "Previous picture (←)",
    tipNext: "Next picture (→)",
    tipCounterclockwise: "Counterclockwise",
    tipClockwise: "Clockwise",
    tipZoomOut: "Zoom out",
    tipZoomIn: "Zoom in",
    tipClose: "Close (Esc)",
    // TODO: translation
    tipOriginalSize: "Zoom to original size"
  }
};
const enUS$1 = enUS;
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
const formatDistance$1 = formatDistance;
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
const formatLong$1 = formatLong;
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = function formatRelative2(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
const formatRelative$1 = formatRelative;
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
const localize$1 = localize;
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
const match$1 = match;
var locale = {
  code: "en-US",
  formatDistance: formatDistance$1,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const defaultLocale = locale;
const dateEnUs = {
  name: "en-US",
  locale: defaultLocale
};
const dateEnUS = dateEnUs;
function useLocale(ns) {
  const { mergedLocaleRef, mergedDateLocaleRef } = inject(configProviderInjectionKey, null) || {};
  const localeRef = computed(() => {
    var _a, _b;
    return (_b = (_a = mergedLocaleRef === null || mergedLocaleRef === void 0 ? void 0 : mergedLocaleRef.value) === null || _a === void 0 ? void 0 : _a[ns]) !== null && _b !== void 0 ? _b : enUS$1[ns];
  });
  const dateLocaleRef = computed(() => {
    var _a;
    return (_a = mergedDateLocaleRef === null || mergedDateLocaleRef === void 0 ? void 0 : mergedDateLocaleRef.value) !== null && _a !== void 0 ? _a : dateEnUS;
  });
  return {
    dateLocaleRef,
    localeRef
  };
}
function useStyle(mountId, style2, clsPrefixRef) {
  if (!style2) {
    return;
  }
  const ssrAdapter2 = useSsrAdapter();
  const NConfigProvider = inject(configProviderInjectionKey, null);
  const mountStyle = () => {
    const clsPrefix = clsPrefixRef === null || clsPrefixRef === void 0 ? void 0 : clsPrefixRef.value;
    style2.mount({
      id: clsPrefix === void 0 ? mountId : clsPrefix + mountId,
      head: true,
      anchorMetaName: cssrAnchorMetaName,
      props: {
        bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
      },
      ssr: ssrAdapter2
    });
    if (!(NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.preflightStyleDisabled)) {
      globalStyle.mount({
        id: "n-global",
        head: true,
        anchorMetaName: cssrAnchorMetaName,
        ssr: ssrAdapter2
      });
    }
  };
  if (ssrAdapter2) {
    mountStyle();
  } else {
    onBeforeMount(mountStyle);
  }
}
function useThemeClass(componentName, hashRef, cssVarsRef, props) {
  var _a;
  if (!cssVarsRef)
    throwError("useThemeClass", "cssVarsRef is not passed");
  const mergedThemeHashRef = (_a = inject(configProviderInjectionKey, null)) === null || _a === void 0 ? void 0 : _a.mergedThemeHashRef;
  const themeClassRef = ref("");
  const ssrAdapter2 = useSsrAdapter();
  let renderCallback;
  const hashClassPrefix = `__${componentName}`;
  const mountStyle = () => {
    let finalThemeHash = hashClassPrefix;
    const hashValue = hashRef ? hashRef.value : void 0;
    const themeHash = mergedThemeHashRef === null || mergedThemeHashRef === void 0 ? void 0 : mergedThemeHashRef.value;
    if (themeHash)
      finalThemeHash += "-" + themeHash;
    if (hashValue)
      finalThemeHash += "-" + hashValue;
    const { themeOverrides, builtinThemeOverrides } = props;
    if (themeOverrides) {
      finalThemeHash += "-" + murmur2(JSON.stringify(themeOverrides));
    }
    if (builtinThemeOverrides) {
      finalThemeHash += "-" + murmur2(JSON.stringify(builtinThemeOverrides));
    }
    themeClassRef.value = finalThemeHash;
    renderCallback = () => {
      const cssVars = cssVarsRef.value;
      let style2 = "";
      for (const key in cssVars) {
        style2 += `${key}: ${cssVars[key]};`;
      }
      c$1(`.${finalThemeHash}`, style2).mount({
        id: finalThemeHash,
        ssr: ssrAdapter2
      });
      renderCallback = void 0;
    };
  };
  watchEffect(() => {
    mountStyle();
  });
  return {
    themeClass: themeClassRef,
    onRender: () => {
      renderCallback === null || renderCallback === void 0 ? void 0 : renderCallback();
    }
  };
}
function useRtl(mountId, rtlStateRef, clsPrefixRef) {
  if (!rtlStateRef)
    return void 0;
  const ssrAdapter2 = useSsrAdapter();
  const componentRtlStateRef = computed(() => {
    const { value: rtlState } = rtlStateRef;
    if (!rtlState) {
      return void 0;
    }
    const componentRtlState = rtlState[mountId];
    if (!componentRtlState) {
      return void 0;
    }
    return componentRtlState;
  });
  const mountStyle = () => {
    watchEffect(() => {
      const { value: clsPrefix } = clsPrefixRef;
      const id = `${clsPrefix}${mountId}Rtl`;
      if (exists(id, ssrAdapter2))
        return;
      const { value: componentRtlState } = componentRtlStateRef;
      if (!componentRtlState)
        return;
      componentRtlState.style.mount({
        id,
        head: true,
        anchorMetaName: cssrAnchorMetaName,
        props: {
          bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
        },
        ssr: ssrAdapter2
      });
    });
  };
  if (ssrAdapter2) {
    mountStyle();
  } else {
    onBeforeMount(mountStyle);
  }
  return componentRtlStateRef;
}
const AddIcon = /* @__PURE__ */ defineComponent({
  name: "Add",
  render() {
    return h(
      "svg",
      { width: "512", height: "512", viewBox: "0 0 512 512", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      h("path", { d: "M256 112V400M400 256H112", stroke: "currentColor", "stroke-width": "32", "stroke-linecap": "round", "stroke-linejoin": "round" })
    );
  }
});
function replaceable(name, icon) {
  return /* @__PURE__ */ defineComponent({
    name: upperFirst$1(name),
    setup() {
      var _a;
      const mergedIconsRef = (_a = inject(configProviderInjectionKey, null)) === null || _a === void 0 ? void 0 : _a.mergedIconsRef;
      return () => {
        var _a2;
        const iconOverride = (_a2 = mergedIconsRef === null || mergedIconsRef === void 0 ? void 0 : mergedIconsRef.value) === null || _a2 === void 0 ? void 0 : _a2[name];
        return iconOverride ? iconOverride() : icon;
      };
    }
  });
}
const BackwardIcon = /* @__PURE__ */ defineComponent({
  name: "Backward",
  render() {
    return h(
      "svg",
      { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      h("path", { d: "M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z", fill: "currentColor" })
    );
  }
});
const FinishedIcon = /* @__PURE__ */ defineComponent({
  name: "Checkmark",
  render() {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" },
      h(
        "g",
        { fill: "none" },
        h("path", { d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z", fill: "currentColor" })
      )
    );
  }
});
const ErrorIcon = replaceable("close", h(
  "svg",
  { viewBox: "0 0 12 12", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true },
  h(
    "g",
    { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
    h(
      "g",
      { fill: "currentColor", "fill-rule": "nonzero" },
      h("path", { d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z" })
    )
  )
));
const EyeIcon = /* @__PURE__ */ defineComponent({
  name: "Eye",
  render() {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
      h("path", { d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32" }),
      h("circle", { cx: "256", cy: "256", r: "80", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" })
    );
  }
});
const EyeOffIcon = /* @__PURE__ */ defineComponent({
  name: "EyeOff",
  render() {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
      h("path", { d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z", fill: "currentColor" }),
      h("path", { d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z", fill: "currentColor" }),
      h("path", { d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z", fill: "currentColor" }),
      h("path", { d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z", fill: "currentColor" }),
      h("path", { d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z", fill: "currentColor" })
    );
  }
});
const EmptyIcon = /* @__PURE__ */ defineComponent({
  name: "Empty",
  render() {
    return h(
      "svg",
      { viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      h("path", { d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z", fill: "currentColor" }),
      h("path", { d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z", fill: "currentColor" })
    );
  }
});
const FastBackwardIcon = /* @__PURE__ */ defineComponent({
  name: "FastBackward",
  render() {
    return h(
      "svg",
      { viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
      h(
        "g",
        { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
        h(
          "g",
          { fill: "currentColor", "fill-rule": "nonzero" },
          h("path", { d: "M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z" })
        )
      )
    );
  }
});
const FastForwardIcon = /* @__PURE__ */ defineComponent({
  name: "FastForward",
  render() {
    return h(
      "svg",
      { viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
      h(
        "g",
        { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
        h(
          "g",
          { fill: "currentColor", "fill-rule": "nonzero" },
          h("path", { d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z" })
        )
      )
    );
  }
});
const ForwardIcon = /* @__PURE__ */ defineComponent({
  name: "Forward",
  render() {
    return h(
      "svg",
      { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      h("path", { d: "M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z", fill: "currentColor" })
    );
  }
});
const MoreIcon = /* @__PURE__ */ defineComponent({
  name: "More",
  render() {
    return h(
      "svg",
      { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
      h(
        "g",
        { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
        h(
          "g",
          { fill: "currentColor", "fill-rule": "nonzero" },
          h("path", { d: "M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z" })
        )
      )
    );
  }
});
const RemoveIcon = /* @__PURE__ */ defineComponent({
  name: "Remove",
  render() {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
      h("line", { x1: "400", y1: "256", x2: "112", y2: "256", style: "\n        fill: none;\n        stroke: currentColor;\n        stroke-linecap: round;\n        stroke-linejoin: round;\n        stroke-width: 32px;\n      " })
    );
  }
});
const ChevronDownIcon = /* @__PURE__ */ defineComponent({
  name: "ChevronDown",
  render() {
    return h(
      "svg",
      { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      h("path", { d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z", fill: "currentColor" })
    );
  }
});
const ClearIcon = replaceable("clear", h(
  "svg",
  { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
  h(
    "g",
    { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
    h(
      "g",
      { fill: "currentColor", "fill-rule": "nonzero" },
      h("path", { d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z" })
    )
  )
));
const NIconSwitchTransition = /* @__PURE__ */ defineComponent({
  name: "BaseIconSwitchTransition",
  setup(_, { slots }) {
    const isMountedRef = isMounted();
    return () => h(Transition, { name: "icon-switch-transition", appear: isMountedRef.value }, slots);
  }
});
const NFadeInExpandTransition = /* @__PURE__ */ defineComponent({
  name: "FadeInExpandTransition",
  props: {
    appear: Boolean,
    group: Boolean,
    mode: String,
    onLeave: Function,
    onAfterLeave: Function,
    onAfterEnter: Function,
    width: Boolean,
    // reverse mode is only used in tree
    // it make it from expanded to collapsed after mounted
    reverse: Boolean
  },
  setup(props, { slots }) {
    function handleBeforeLeave(el) {
      if (props.width) {
        el.style.maxWidth = `${el.offsetWidth}px`;
      } else {
        el.style.maxHeight = `${el.offsetHeight}px`;
      }
      void el.offsetWidth;
    }
    function handleLeave(el) {
      if (props.width) {
        el.style.maxWidth = "0";
      } else {
        el.style.maxHeight = "0";
      }
      void el.offsetWidth;
      const { onLeave } = props;
      if (onLeave)
        onLeave();
    }
    function handleAfterLeave(el) {
      if (props.width) {
        el.style.maxWidth = "";
      } else {
        el.style.maxHeight = "";
      }
      const { onAfterLeave } = props;
      if (onAfterLeave)
        onAfterLeave();
    }
    function handleEnter(el) {
      el.style.transition = "none";
      if (props.width) {
        const memorizedWidth = el.offsetWidth;
        el.style.maxWidth = "0";
        void el.offsetWidth;
        el.style.transition = "";
        el.style.maxWidth = `${memorizedWidth}px`;
      } else {
        if (props.reverse) {
          el.style.maxHeight = `${el.offsetHeight}px`;
          void el.offsetHeight;
          el.style.transition = "";
          el.style.maxHeight = "0";
        } else {
          const memorizedHeight = el.offsetHeight;
          el.style.maxHeight = "0";
          void el.offsetWidth;
          el.style.transition = "";
          el.style.maxHeight = `${memorizedHeight}px`;
        }
      }
      void el.offsetWidth;
    }
    function handleAfterEnter(el) {
      var _a;
      if (props.width) {
        el.style.maxWidth = "";
      } else {
        if (!props.reverse) {
          el.style.maxHeight = "";
        }
      }
      (_a = props.onAfterEnter) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    return () => {
      const { group, width, appear, mode } = props;
      const type = group ? TransitionGroup : Transition;
      const resolvedProps = {
        name: width ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
        appear,
        onEnter: handleEnter,
        onAfterEnter: handleAfterEnter,
        onBeforeLeave: handleBeforeLeave,
        onLeave: handleLeave,
        onAfterLeave: handleAfterLeave
      };
      if (!group) {
        resolvedProps.mode = mode;
      }
      return h(type, resolvedProps, slots);
    };
  }
});
const style$l = cB("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`, [c$1("svg", `
 height: 1em;
 width: 1em;
 `)]);
const NBaseIcon = /* @__PURE__ */ defineComponent({
  name: "BaseIcon",
  props: {
    role: String,
    ariaLabel: String,
    ariaDisabled: {
      type: Boolean,
      default: void 0
    },
    ariaHidden: {
      type: Boolean,
      default: void 0
    },
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function,
    onMousedown: Function,
    onMouseup: Function
  },
  setup(props) {
    useStyle("-base-icon", style$l, toRef(props, "clsPrefix"));
  },
  render() {
    return h("i", { class: `${this.clsPrefix}-base-icon`, onClick: this.onClick, onMousedown: this.onMousedown, onMouseup: this.onMouseup, role: this.role, "aria-label": this.ariaLabel, "aria-hidden": this.ariaHidden, "aria-disabled": this.ariaDisabled }, this.$slots);
  }
});
const style$k = cB("base-close", `
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`, [cM("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), c$1("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), cNotM("disabled", [c$1("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), c$1("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), c$1("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), c$1("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), c$1("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), cM("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), cM("round", [c$1("&::before", `
 border-radius: 50%;
 `)])]);
const NBaseClose = /* @__PURE__ */ defineComponent({
  name: "BaseClose",
  props: {
    isButtonTag: {
      type: Boolean,
      default: true
    },
    clsPrefix: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    focusable: {
      type: Boolean,
      default: true
    },
    round: Boolean,
    onClick: Function,
    absolute: Boolean
  },
  setup(props) {
    useStyle("-base-close", style$k, toRef(props, "clsPrefix"));
    return () => {
      const { clsPrefix, disabled, absolute, round, isButtonTag } = props;
      const Tag = isButtonTag ? "button" : "div";
      return h(
        Tag,
        { type: isButtonTag ? "button" : void 0, tabindex: disabled || !props.focusable ? -1 : 0, "aria-disabled": disabled, "aria-label": "close", role: isButtonTag ? void 0 : "button", disabled, class: [
          `${clsPrefix}-base-close`,
          absolute && `${clsPrefix}-base-close--absolute`,
          disabled && `${clsPrefix}-base-close--disabled`,
          round && `${clsPrefix}-base-close--round`
        ], onMousedown: (e) => {
          if (!props.focusable) {
            e.preventDefault();
          }
        }, onClick: props.onClick },
        h(NBaseIcon, { clsPrefix }, {
          default: () => h(ErrorIcon, null)
        })
      );
    };
  }
});
const FocusDetector = /* @__PURE__ */ defineComponent({
  props: {
    onFocus: Function,
    onBlur: Function
  },
  setup(props) {
    return () => h("div", { style: "width: 0; height: 0", tabindex: 0, onFocus: props.onFocus, onBlur: props.onBlur });
  }
});
const {
  cubicBezierEaseInOut: cubicBezierEaseInOut$3
} = commonVariables$9;
function iconSwitchTransition({
  originalTransform = "",
  left = 0,
  top = 0,
  transition = `all .3s ${cubicBezierEaseInOut$3} !important`
} = {}) {
  return [c$1("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
    transform: originalTransform + " scale(0.75)",
    left,
    top,
    opacity: 0
  }), c$1("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
    transform: `scale(1) ${originalTransform}`,
    left,
    top,
    opacity: 1
  }), c$1("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
    transformOrigin: "center",
    position: "absolute",
    left,
    top,
    transition
  })];
}
const style$j = c$1([c$1("@keyframes loading-container-rotate", `
 to {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }
 `), c$1("@keyframes loading-layer-rotate", `
 12.5% {
 -webkit-transform: rotate(135deg);
 transform: rotate(135deg);
 }
 25% {
 -webkit-transform: rotate(270deg);
 transform: rotate(270deg);
 }
 37.5% {
 -webkit-transform: rotate(405deg);
 transform: rotate(405deg);
 }
 50% {
 -webkit-transform: rotate(540deg);
 transform: rotate(540deg);
 }
 62.5% {
 -webkit-transform: rotate(675deg);
 transform: rotate(675deg);
 }
 75% {
 -webkit-transform: rotate(810deg);
 transform: rotate(810deg);
 }
 87.5% {
 -webkit-transform: rotate(945deg);
 transform: rotate(945deg);
 }
 100% {
 -webkit-transform: rotate(1080deg);
 transform: rotate(1080deg);
 } 
 `), c$1("@keyframes loading-left-spin", `
 from {
 -webkit-transform: rotate(265deg);
 transform: rotate(265deg);
 }
 50% {
 -webkit-transform: rotate(130deg);
 transform: rotate(130deg);
 }
 to {
 -webkit-transform: rotate(265deg);
 transform: rotate(265deg);
 }
 `), c$1("@keyframes loading-right-spin", `
 from {
 -webkit-transform: rotate(-265deg);
 transform: rotate(-265deg);
 }
 50% {
 -webkit-transform: rotate(-130deg);
 transform: rotate(-130deg);
 }
 to {
 -webkit-transform: rotate(-265deg);
 transform: rotate(-265deg);
 }
 `), cB("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [cE("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [iconSwitchTransition()]), cE("container", `
 display: inline-flex;
 position: relative;
 direction: ltr;
 line-height: 0;
 animation: loading-container-rotate 1568.2352941176ms linear infinite;
 font-size: 0;
 letter-spacing: 0;
 white-space: nowrap;
 opacity: 1;
 width: 100%;
 height: 100%;
 `, [cE("svg", `
 stroke: var(--n-text-color);
 fill: transparent;
 position: absolute;
 height: 100%;
 overflow: hidden;
 `), cE("container-layer", `
 position: absolute;
 width: 100%;
 height: 100%;
 animation: loading-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 `, [cE("container-layer-left", `
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `, [cE("svg", `
 animation: loading-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 width: 200%;
 `)]), cE("container-layer-patch", `
 position: absolute;
 top: 0;
 left: 47.5%;
 box-sizing: border-box;
 width: 5%;
 height: 100%;
 overflow: hidden;
 `, [cE("svg", `
 left: -900%;
 width: 2000%;
 transform: rotate(180deg);
 `)]), cE("container-layer-right", `
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `, [cE("svg", `
 animation: loading-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 left: -100%;
 width: 200%;
 `)])])]), cE("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [iconSwitchTransition({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})])])]);
const exposedLoadingProps = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: void 0
  }
};
const NBaseLoading = /* @__PURE__ */ defineComponent({
  name: "BaseLoading",
  props: Object.assign({ clsPrefix: {
    type: String,
    required: true
  }, show: {
    type: Boolean,
    default: true
  }, scale: {
    type: Number,
    default: 1
  }, radius: {
    type: Number,
    default: 100
  } }, exposedLoadingProps),
  setup(props) {
    useStyle("-base-loading", style$j, toRef(props, "clsPrefix"));
  },
  render() {
    const { clsPrefix, radius, strokeWidth, stroke, scale } = this;
    const scaledRadius = radius / scale;
    return h(
      "div",
      { class: `${clsPrefix}-base-loading`, role: "img", "aria-label": "loading" },
      h(NIconSwitchTransition, null, {
        default: () => this.show ? h(
          "div",
          { key: "icon", class: `${clsPrefix}-base-loading__transition-wrapper` },
          h(
            "div",
            { class: `${clsPrefix}-base-loading__container` },
            h(
              "div",
              { class: `${clsPrefix}-base-loading__container-layer` },
              h(
                "div",
                { class: `${clsPrefix}-base-loading__container-layer-left` },
                h(
                  "svg",
                  { class: `${clsPrefix}-base-loading__svg`, viewBox: `0 0 ${2 * scaledRadius} ${2 * scaledRadius}`, xmlns: "http://www.w3.org/2000/svg", style: { color: stroke } },
                  h("circle", { fill: "none", stroke: "currentColor", "stroke-width": strokeWidth, "stroke-linecap": "round", cx: scaledRadius, cy: scaledRadius, r: radius - strokeWidth / 2, "stroke-dasharray": 4.91 * radius, "stroke-dashoffset": 2.46 * radius })
                )
              ),
              h(
                "div",
                { class: `${clsPrefix}-base-loading__container-layer-patch` },
                h(
                  "svg",
                  { class: `${clsPrefix}-base-loading__svg`, viewBox: `0 0 ${2 * scaledRadius} ${2 * scaledRadius}`, xmlns: "http://www.w3.org/2000/svg", style: { color: stroke } },
                  h("circle", { fill: "none", stroke: "currentColor", "stroke-width": strokeWidth, "stroke-linecap": "round", cx: scaledRadius, cy: scaledRadius, r: radius - strokeWidth / 2, "stroke-dasharray": 4.91 * radius, "stroke-dashoffset": 2.46 * radius })
                )
              ),
              h(
                "div",
                { class: `${clsPrefix}-base-loading__container-layer-right` },
                h(
                  "svg",
                  { class: `${clsPrefix}-base-loading__svg`, viewBox: `0 0 ${2 * scaledRadius} ${2 * scaledRadius}`, xmlns: "http://www.w3.org/2000/svg", style: { color: stroke } },
                  h("circle", { fill: "none", stroke: "currentColor", "stroke-width": strokeWidth, "stroke-linecap": "round", cx: scaledRadius, cy: scaledRadius, r: radius - strokeWidth / 2, "stroke-dasharray": 4.91 * radius, "stroke-dashoffset": 2.46 * radius })
                )
              )
            )
          )
        ) : h("div", { key: "placeholder", class: `${clsPrefix}-base-loading__placeholder` }, this.$slots)
      })
    );
  }
});
function toArray(arg) {
  if (Array.isArray(arg))
    return arg;
  return [arg];
}
const TRAVERSE_COMMAND = {
  STOP: "STOP"
};
function traverseWithCb(treeNode, callback) {
  const command = callback(treeNode);
  if (treeNode.children !== void 0 && command !== TRAVERSE_COMMAND.STOP) {
    treeNode.children.forEach((childNode) => traverseWithCb(childNode, callback));
  }
}
function getNonLeafKeys(treeNodes, options = {}) {
  const { preserveGroup = false } = options;
  const keys2 = [];
  const cb = preserveGroup ? (node) => {
    if (!node.isLeaf) {
      keys2.push(node.key);
      traverse(node.children);
    }
  } : (node) => {
    if (!node.isLeaf) {
      if (!node.isGroup)
        keys2.push(node.key);
      traverse(node.children);
    }
  };
  function traverse(nodes) {
    nodes.forEach(cb);
  }
  traverse(treeNodes);
  return keys2;
}
function isLeaf(rawNode, getChildren) {
  const { isLeaf: isLeaf2 } = rawNode;
  if (isLeaf2 !== void 0)
    return isLeaf2;
  else if (!getChildren(rawNode))
    return true;
  return false;
}
function defaultGetChildren(node) {
  return node.children;
}
function defaultGetKey(node) {
  return node.key;
}
function isIgnored() {
  return false;
}
function isShallowLoaded(rawNode, getChildren) {
  const { isLeaf: isLeaf2 } = rawNode;
  if (isLeaf2 === false && !Array.isArray(getChildren(rawNode)))
    return false;
  return true;
}
function isDisabled(rawNode) {
  return rawNode.disabled === true;
}
function isExpilicitlyNotLoaded(rawNode, getChildren) {
  return rawNode.isLeaf === false && !Array.isArray(getChildren(rawNode));
}
function unwrapCheckedKeys(result) {
  var _a;
  if (result === void 0 || result === null)
    return [];
  if (Array.isArray(result))
    return result;
  return (_a = result.checkedKeys) !== null && _a !== void 0 ? _a : [];
}
function unwrapIndeterminateKeys(result) {
  var _a;
  if (result === void 0 || result === null || Array.isArray(result)) {
    return [];
  }
  return (_a = result.indeterminateKeys) !== null && _a !== void 0 ? _a : [];
}
function merge(originalKeys, keysToAdd) {
  const set = new Set(originalKeys);
  keysToAdd.forEach((key) => {
    if (!set.has(key)) {
      set.add(key);
    }
  });
  return Array.from(set);
}
function minus(originalKeys, keysToRemove) {
  const set = new Set(originalKeys);
  keysToRemove.forEach((key) => {
    if (set.has(key)) {
      set.delete(key);
    }
  });
  return Array.from(set);
}
function isGroup(rawNode) {
  return (rawNode === null || rawNode === void 0 ? void 0 : rawNode.type) === "group";
}
function createIndexGetter(treeNodes) {
  const map2 = /* @__PURE__ */ new Map();
  treeNodes.forEach((treeNode, i) => {
    map2.set(treeNode.key, i);
  });
  return (key) => {
    var _a;
    return (_a = map2.get(key)) !== null && _a !== void 0 ? _a : null;
  };
}
class SubtreeNotLoadedError extends Error {
  constructor() {
    super();
    this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function getExtendedCheckedKeySetAfterCheck(checkKeys, currentCheckedKeys, treeMate, allowNotLoaded) {
  return getExtendedCheckedKeySet(currentCheckedKeys.concat(checkKeys), treeMate, allowNotLoaded, false);
}
function getAvailableAscendantNodeSet(uncheckedKeys, treeMate) {
  const visitedKeys = /* @__PURE__ */ new Set();
  uncheckedKeys.forEach((uncheckedKey) => {
    const uncheckedTreeNode = treeMate.treeNodeMap.get(uncheckedKey);
    if (uncheckedTreeNode !== void 0) {
      let nodeCursor = uncheckedTreeNode.parent;
      while (nodeCursor !== null) {
        if (nodeCursor.disabled)
          break;
        if (visitedKeys.has(nodeCursor.key))
          break;
        else {
          visitedKeys.add(nodeCursor.key);
        }
        nodeCursor = nodeCursor.parent;
      }
    }
  });
  return visitedKeys;
}
function getExtendedCheckedKeySetAfterUncheck(uncheckedKeys, currentCheckedKeys, treeMate, allowNotLoaded) {
  const extendedCheckedKeySet = getExtendedCheckedKeySet(currentCheckedKeys, treeMate, allowNotLoaded, false);
  const extendedKeySetToUncheck = getExtendedCheckedKeySet(uncheckedKeys, treeMate, allowNotLoaded, true);
  const ascendantKeySet = getAvailableAscendantNodeSet(uncheckedKeys, treeMate);
  const keysToRemove = [];
  extendedCheckedKeySet.forEach((key) => {
    if (extendedKeySetToUncheck.has(key) || ascendantKeySet.has(key)) {
      keysToRemove.push(key);
    }
  });
  keysToRemove.forEach((key) => extendedCheckedKeySet.delete(key));
  return extendedCheckedKeySet;
}
function getCheckedKeys(options, treeMate) {
  const { checkedKeys, keysToCheck, keysToUncheck, indeterminateKeys, cascade, leafOnly, checkStrategy, allowNotLoaded } = options;
  if (!cascade) {
    if (keysToCheck !== void 0) {
      return {
        checkedKeys: merge(checkedKeys, keysToCheck),
        indeterminateKeys: Array.from(indeterminateKeys)
      };
    } else if (keysToUncheck !== void 0) {
      return {
        checkedKeys: minus(checkedKeys, keysToUncheck),
        indeterminateKeys: Array.from(indeterminateKeys)
      };
    } else {
      return {
        checkedKeys: Array.from(checkedKeys),
        indeterminateKeys: Array.from(indeterminateKeys)
      };
    }
  }
  const { levelTreeNodeMap } = treeMate;
  let extendedCheckedKeySet;
  if (keysToUncheck !== void 0) {
    extendedCheckedKeySet = getExtendedCheckedKeySetAfterUncheck(keysToUncheck, checkedKeys, treeMate, allowNotLoaded);
  } else if (keysToCheck !== void 0) {
    extendedCheckedKeySet = getExtendedCheckedKeySetAfterCheck(keysToCheck, checkedKeys, treeMate, allowNotLoaded);
  } else {
    extendedCheckedKeySet = getExtendedCheckedKeySet(checkedKeys, treeMate, allowNotLoaded, false);
  }
  const checkStrategyIsParent = checkStrategy === "parent";
  const checkStrategyIsChild = checkStrategy === "child" || leafOnly;
  const syntheticCheckedKeySet = extendedCheckedKeySet;
  const syntheticIndeterminateKeySet = /* @__PURE__ */ new Set();
  const maxLevel = Math.max.apply(null, Array.from(levelTreeNodeMap.keys()));
  for (let level = maxLevel; level >= 0; level -= 1) {
    const levelIsZero = level === 0;
    const levelTreeNodes = levelTreeNodeMap.get(level);
    for (const levelTreeNode of levelTreeNodes) {
      if (levelTreeNode.isLeaf)
        continue;
      const { key: levelTreeNodeKey, shallowLoaded } = levelTreeNode;
      if (checkStrategyIsChild && shallowLoaded) {
        levelTreeNode.children.forEach((v) => {
          if (!v.disabled && !v.isLeaf && v.shallowLoaded && syntheticCheckedKeySet.has(v.key)) {
            syntheticCheckedKeySet.delete(v.key);
          }
        });
      }
      if (levelTreeNode.disabled || !shallowLoaded) {
        continue;
      }
      let fullyChecked = true;
      let partialChecked = false;
      let allDisabled = true;
      for (const childNode of levelTreeNode.children) {
        const childKey = childNode.key;
        if (childNode.disabled)
          continue;
        if (allDisabled)
          allDisabled = false;
        if (syntheticCheckedKeySet.has(childKey)) {
          partialChecked = true;
        } else if (syntheticIndeterminateKeySet.has(childKey)) {
          partialChecked = true;
          fullyChecked = false;
          break;
        } else {
          fullyChecked = false;
          if (partialChecked) {
            break;
          }
        }
      }
      if (fullyChecked && !allDisabled) {
        if (checkStrategyIsParent) {
          levelTreeNode.children.forEach((v) => {
            if (!v.disabled && syntheticCheckedKeySet.has(v.key)) {
              syntheticCheckedKeySet.delete(v.key);
            }
          });
        }
        syntheticCheckedKeySet.add(levelTreeNodeKey);
      } else if (partialChecked) {
        syntheticIndeterminateKeySet.add(levelTreeNodeKey);
      }
      if (levelIsZero && checkStrategyIsChild && syntheticCheckedKeySet.has(levelTreeNodeKey)) {
        syntheticCheckedKeySet.delete(levelTreeNodeKey);
      }
    }
  }
  return {
    checkedKeys: Array.from(syntheticCheckedKeySet),
    indeterminateKeys: Array.from(syntheticIndeterminateKeySet)
  };
}
function getExtendedCheckedKeySet(checkedKeys, treeMate, allowNotLoaded, isUnchecking) {
  const { treeNodeMap, getChildren } = treeMate;
  const visitedKeySet = /* @__PURE__ */ new Set();
  const extendedKeySet = new Set(checkedKeys);
  checkedKeys.forEach((checkedKey) => {
    const checkedTreeNode = treeNodeMap.get(checkedKey);
    if (checkedTreeNode !== void 0) {
      traverseWithCb(checkedTreeNode, (treeNode) => {
        if (treeNode.disabled) {
          return TRAVERSE_COMMAND.STOP;
        }
        const { key } = treeNode;
        if (visitedKeySet.has(key))
          return;
        visitedKeySet.add(key);
        extendedKeySet.add(key);
        if (isExpilicitlyNotLoaded(treeNode.rawNode, getChildren)) {
          if (isUnchecking) {
            return TRAVERSE_COMMAND.STOP;
          } else if (!allowNotLoaded) {
            throw new SubtreeNotLoadedError();
          }
        }
      });
    }
  });
  return extendedKeySet;
}
function getPath(key, { includeGroup = false, includeSelf = true }, treeMate) {
  var _a;
  const treeNodeMap = treeMate.treeNodeMap;
  let treeNode = key === null || key === void 0 ? null : (_a = treeNodeMap.get(key)) !== null && _a !== void 0 ? _a : null;
  const mergedPath = {
    keyPath: [],
    treeNodePath: [],
    treeNode
  };
  if (treeNode === null || treeNode === void 0 ? void 0 : treeNode.ignored) {
    mergedPath.treeNode = null;
    return mergedPath;
  }
  while (treeNode) {
    if (!treeNode.ignored && (includeGroup || !treeNode.isGroup)) {
      mergedPath.treeNodePath.push(treeNode);
    }
    treeNode = treeNode.parent;
  }
  mergedPath.treeNodePath.reverse();
  if (!includeSelf)
    mergedPath.treeNodePath.pop();
  mergedPath.keyPath = mergedPath.treeNodePath.map((treeNode2) => treeNode2.key);
  return mergedPath;
}
function getFirstAvailableNode(nodes) {
  if (nodes.length === 0)
    return null;
  const node = nodes[0];
  if (node.isGroup || node.ignored || node.disabled) {
    return node.getNext();
  }
  return node;
}
function rawGetNext(node, loop) {
  const sibs = node.siblings;
  const l = sibs.length;
  const { index } = node;
  if (loop) {
    return sibs[(index + 1) % l];
  } else {
    if (index === sibs.length - 1)
      return null;
    return sibs[index + 1];
  }
}
function move(fromNode, dir, { loop = false, includeDisabled = false } = {}) {
  const iterate = dir === "prev" ? rawGetPrev : rawGetNext;
  const getChildOptions = {
    reverse: dir === "prev"
  };
  let meet = false;
  let endNode = null;
  function traverse(node) {
    if (node === null)
      return;
    if (node === fromNode) {
      if (!meet) {
        meet = true;
      } else if (!fromNode.disabled && !fromNode.isGroup) {
        endNode = fromNode;
        return;
      }
    } else {
      if ((!node.disabled || includeDisabled) && !node.ignored && !node.isGroup) {
        endNode = node;
        return;
      }
    }
    if (node.isGroup) {
      const child = getChild(node, getChildOptions);
      if (child !== null) {
        endNode = child;
      } else {
        traverse(iterate(node, loop));
      }
    } else {
      const nextNode = iterate(node, false);
      if (nextNode !== null) {
        traverse(nextNode);
      } else {
        const parent = rawGetParent(node);
        if (parent === null || parent === void 0 ? void 0 : parent.isGroup) {
          traverse(iterate(parent, loop));
        } else if (loop) {
          traverse(iterate(node, true));
        }
      }
    }
  }
  traverse(fromNode);
  return endNode;
}
function rawGetPrev(node, loop) {
  const sibs = node.siblings;
  const l = sibs.length;
  const { index } = node;
  if (loop) {
    return sibs[(index - 1 + l) % l];
  } else {
    if (index === 0)
      return null;
    return sibs[index - 1];
  }
}
function rawGetParent(node) {
  return node.parent;
}
function getChild(node, options = {}) {
  const { reverse = false } = options;
  const { children } = node;
  if (children) {
    const { length } = children;
    const start = reverse ? length - 1 : 0;
    const end = reverse ? -1 : length;
    const delta = reverse ? -1 : 1;
    for (let i = start; i !== end; i += delta) {
      const child = children[i];
      if (!child.disabled && !child.ignored) {
        if (child.isGroup) {
          const childInGroup = getChild(child, options);
          if (childInGroup !== null)
            return childInGroup;
        } else {
          return child;
        }
      }
    }
  }
  return null;
}
const moveMethods = {
  getChild() {
    if (this.ignored)
      return null;
    return getChild(this);
  },
  getParent() {
    const { parent } = this;
    if (parent === null || parent === void 0 ? void 0 : parent.isGroup) {
      return parent.getParent();
    }
    return parent;
  },
  getNext(options = {}) {
    return move(this, "next", options);
  },
  getPrev(options = {}) {
    return move(this, "prev", options);
  }
};
function flatten(treeNodes, expandedKeys) {
  const expandedKeySet = expandedKeys ? new Set(expandedKeys) : void 0;
  const flattenedNodes = [];
  function traverse(treeNodes2) {
    treeNodes2.forEach((treeNode) => {
      flattenedNodes.push(treeNode);
      if (treeNode.isLeaf || !treeNode.children || treeNode.ignored)
        return;
      if (treeNode.isGroup) {
        traverse(treeNode.children);
      } else if (
        // normal non-leaf node
        expandedKeySet === void 0 || expandedKeySet.has(treeNode.key)
      ) {
        traverse(treeNode.children);
      }
    });
  }
  traverse(treeNodes);
  return flattenedNodes;
}
function contains(parent, child) {
  const parentKey = parent.key;
  while (child) {
    if (child.key === parentKey)
      return true;
    child = child.parent;
  }
  return false;
}
function createTreeNodes(rawNodes, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren, parent = null, level = 0) {
  const treeNodes = [];
  rawNodes.forEach((rawNode, index) => {
    var _a;
    const treeNode = Object.create(nodeProto);
    treeNode.rawNode = rawNode;
    treeNode.siblings = treeNodes;
    treeNode.level = level;
    treeNode.index = index;
    treeNode.isFirstChild = index === 0;
    treeNode.isLastChild = index + 1 === rawNodes.length;
    treeNode.parent = parent;
    if (!treeNode.ignored) {
      const rawChildren = getChildren(rawNode);
      if (Array.isArray(rawChildren)) {
        treeNode.children = createTreeNodes(rawChildren, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren, treeNode, level + 1);
      }
    }
    treeNodes.push(treeNode);
    treeNodeMap.set(treeNode.key, treeNode);
    if (!levelTreeNodeMap.has(level))
      levelTreeNodeMap.set(level, []);
    (_a = levelTreeNodeMap.get(level)) === null || _a === void 0 ? void 0 : _a.push(treeNode);
  });
  return treeNodes;
}
function createTreeMate(rawNodes, options = {}) {
  var _a;
  const treeNodeMap = /* @__PURE__ */ new Map();
  const levelTreeNodeMap = /* @__PURE__ */ new Map();
  const { getDisabled = isDisabled, getIgnored: getIgnored2 = isIgnored, getIsGroup: getIsGroup2 = isGroup, getKey = defaultGetKey } = options;
  const _getChildren = (_a = options.getChildren) !== null && _a !== void 0 ? _a : defaultGetChildren;
  const getChildren = options.ignoreEmptyChildren ? (node) => {
    const children = _getChildren(node);
    if (Array.isArray(children)) {
      if (!children.length)
        return null;
      return children;
    }
    return children;
  } : _getChildren;
  const nodeProto = Object.assign({
    get key() {
      return getKey(this.rawNode);
    },
    get disabled() {
      return getDisabled(this.rawNode);
    },
    get isGroup() {
      return getIsGroup2(this.rawNode);
    },
    get isLeaf() {
      return isLeaf(this.rawNode, getChildren);
    },
    get shallowLoaded() {
      return isShallowLoaded(this.rawNode, getChildren);
    },
    get ignored() {
      return getIgnored2(this.rawNode);
    },
    contains(node) {
      return contains(this, node);
    }
  }, moveMethods);
  const treeNodes = createTreeNodes(rawNodes, treeNodeMap, levelTreeNodeMap, nodeProto, getChildren);
  function getNode(key) {
    if (key === null || key === void 0)
      return null;
    const tmNode = treeNodeMap.get(key);
    if (tmNode && !tmNode.isGroup && !tmNode.ignored) {
      return tmNode;
    }
    return null;
  }
  function _getNode(key) {
    if (key === null || key === void 0)
      return null;
    const tmNode = treeNodeMap.get(key);
    if (tmNode && !tmNode.ignored) {
      return tmNode;
    }
    return null;
  }
  function getPrev(key, options2) {
    const node = _getNode(key);
    if (!node)
      return null;
    return node.getPrev(options2);
  }
  function getNext(key, options2) {
    const node = _getNode(key);
    if (!node)
      return null;
    return node.getNext(options2);
  }
  function getParent(key) {
    const node = _getNode(key);
    if (!node)
      return null;
    return node.getParent();
  }
  function getChild2(key) {
    const node = _getNode(key);
    if (!node)
      return null;
    return node.getChild();
  }
  const treemate = {
    treeNodes,
    treeNodeMap,
    levelTreeNodeMap,
    maxLevel: Math.max(...levelTreeNodeMap.keys()),
    getChildren,
    getFlattenedNodes(expandedKeys) {
      return flatten(treeNodes, expandedKeys);
    },
    getNode,
    getPrev,
    getNext,
    getParent,
    getChild: getChild2,
    getFirstAvailableNode() {
      return getFirstAvailableNode(treeNodes);
    },
    getPath(key, options2 = {}) {
      return getPath(key, options2, treemate);
    },
    getCheckedKeys(checkedKeys, options2 = {}) {
      const { cascade = true, leafOnly = false, checkStrategy = "all", allowNotLoaded = false } = options2;
      return getCheckedKeys({
        checkedKeys: unwrapCheckedKeys(checkedKeys),
        indeterminateKeys: unwrapIndeterminateKeys(checkedKeys),
        cascade,
        leafOnly,
        checkStrategy,
        allowNotLoaded
      }, treemate);
    },
    check(keysToCheck, checkedKeys, options2 = {}) {
      const { cascade = true, leafOnly = false, checkStrategy = "all", allowNotLoaded = false } = options2;
      return getCheckedKeys({
        checkedKeys: unwrapCheckedKeys(checkedKeys),
        indeterminateKeys: unwrapIndeterminateKeys(checkedKeys),
        keysToCheck: keysToCheck === void 0 || keysToCheck === null ? [] : toArray(keysToCheck),
        cascade,
        leafOnly,
        checkStrategy,
        allowNotLoaded
      }, treemate);
    },
    uncheck(keysToUncheck, checkedKeys, options2 = {}) {
      const { cascade = true, leafOnly = false, checkStrategy = "all", allowNotLoaded = false } = options2;
      return getCheckedKeys({
        checkedKeys: unwrapCheckedKeys(checkedKeys),
        indeterminateKeys: unwrapIndeterminateKeys(checkedKeys),
        keysToUncheck: keysToUncheck === null || keysToUncheck === void 0 ? [] : toArray(keysToUncheck),
        cascade,
        leafOnly,
        checkStrategy,
        allowNotLoaded
      }, treemate);
    },
    getNonLeafKeys(options2 = {}) {
      return getNonLeafKeys(treeNodes, options2);
    }
  };
  return treemate;
}
const base = {
  neutralBase: "#FFF",
  neutralInvertBase: "#000",
  neutralTextBase: "#000",
  neutralPopover: "#fff",
  neutralCard: "#fff",
  neutralModal: "#fff",
  neutralBody: "#fff",
  alpha1: "0.82",
  alpha2: "0.72",
  alpha3: "0.38",
  alpha4: "0.24",
  alpha5: "0.18",
  alphaClose: "0.6",
  alphaDisabled: "0.5",
  alphaDisabledInput: "0.02",
  alphaPending: "0.05",
  alphaTablePending: "0.02",
  alphaPressed: "0.07",
  alphaAvatar: "0.2",
  alphaRail: "0.14",
  alphaProgressRail: ".08",
  alphaBorder: "0.12",
  alphaDivider: "0.06",
  alphaInput: "0",
  alphaAction: "0.02",
  alphaTab: "0.04",
  alphaScrollbar: "0.25",
  alphaScrollbarHover: "0.4",
  alphaCode: "0.05",
  alphaTag: "0.02",
  // primary
  primaryHover: "#36ad6a",
  primaryDefault: "#18a058",
  primaryActive: "#0c7a43",
  primarySuppl: "#36ad6a",
  // info
  infoHover: "#4098fc",
  infoDefault: "#2080f0",
  infoActive: "#1060c9",
  infoSuppl: "#4098fc",
  // error
  errorHover: "#de576d",
  errorDefault: "#d03050",
  errorActive: "#ab1f3f",
  errorSuppl: "#de576d",
  // warning
  warningHover: "#fcb040",
  warningDefault: "#f0a020",
  warningActive: "#c97c10",
  warningSuppl: "#fcb040",
  // success
  successHover: "#36ad6a",
  successDefault: "#18a058",
  successActive: "#0c7a43",
  successSuppl: "#36ad6a"
};
const baseBackgroundRgb = rgba(base.neutralBase);
const baseInvertBackgroundRgb = rgba(base.neutralInvertBase);
const overlayPrefix = "rgba(" + baseInvertBackgroundRgb.slice(0, 3).join(", ") + ", ";
function overlay(alpha) {
  return overlayPrefix + String(alpha) + ")";
}
function neutral(alpha) {
  const overlayRgba = Array.from(baseInvertBackgroundRgb);
  overlayRgba[3] = Number(alpha);
  return composite(baseBackgroundRgb, overlayRgba);
}
const derived = Object.assign(Object.assign({ name: "common" }, commonVariables$9), {
  baseColor: base.neutralBase,
  // primary color
  primaryColor: base.primaryDefault,
  primaryColorHover: base.primaryHover,
  primaryColorPressed: base.primaryActive,
  primaryColorSuppl: base.primarySuppl,
  // info color
  infoColor: base.infoDefault,
  infoColorHover: base.infoHover,
  infoColorPressed: base.infoActive,
  infoColorSuppl: base.infoSuppl,
  // success color
  successColor: base.successDefault,
  successColorHover: base.successHover,
  successColorPressed: base.successActive,
  successColorSuppl: base.successSuppl,
  // warning color
  warningColor: base.warningDefault,
  warningColorHover: base.warningHover,
  warningColorPressed: base.warningActive,
  warningColorSuppl: base.warningSuppl,
  // error color
  errorColor: base.errorDefault,
  errorColorHover: base.errorHover,
  errorColorPressed: base.errorActive,
  errorColorSuppl: base.errorSuppl,
  // text color
  textColorBase: base.neutralTextBase,
  textColor1: "rgb(31, 34, 37)",
  textColor2: "rgb(51, 54, 57)",
  textColor3: "rgb(118, 124, 130)",
  // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
  // textColor5: neutral(base.alpha5),
  textColorDisabled: neutral(base.alpha4),
  placeholderColor: neutral(base.alpha4),
  placeholderColorDisabled: neutral(base.alpha5),
  iconColor: neutral(base.alpha4),
  iconColorHover: scaleColor(neutral(base.alpha4), { lightness: 0.75 }),
  iconColorPressed: scaleColor(neutral(base.alpha4), { lightness: 0.9 }),
  iconColorDisabled: neutral(base.alpha5),
  opacity1: base.alpha1,
  opacity2: base.alpha2,
  opacity3: base.alpha3,
  opacity4: base.alpha4,
  opacity5: base.alpha5,
  dividerColor: "rgb(239, 239, 245)",
  borderColor: "rgb(224, 224, 230)",
  // close
  closeIconColor: neutral(Number(base.alphaClose)),
  closeIconColorHover: neutral(Number(base.alphaClose)),
  closeIconColorPressed: neutral(Number(base.alphaClose)),
  closeColorHover: "rgba(0, 0, 0, .09)",
  closeColorPressed: "rgba(0, 0, 0, .13)",
  // clear
  clearColor: neutral(base.alpha4),
  clearColorHover: scaleColor(neutral(base.alpha4), { lightness: 0.75 }),
  clearColorPressed: scaleColor(neutral(base.alpha4), { lightness: 0.9 }),
  scrollbarColor: overlay(base.alphaScrollbar),
  scrollbarColorHover: overlay(base.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: neutral(base.alphaProgressRail),
  railColor: "rgb(219, 219, 223)",
  popoverColor: base.neutralPopover,
  tableColor: base.neutralCard,
  cardColor: base.neutralCard,
  modalColor: base.neutralModal,
  bodyColor: base.neutralBody,
  tagColor: "#eee",
  avatarColor: neutral(base.alphaAvatar),
  invertedColor: "rgb(0, 20, 40)",
  inputColor: neutral(base.alphaInput),
  codeColor: "rgb(244, 244, 248)",
  tabColor: "rgb(247, 247, 250)",
  actionColor: "rgb(250, 250, 252)",
  tableHeaderColor: "rgb(250, 250, 252)",
  hoverColor: "rgb(243, 243, 245)",
  // use color with alpha since it can be nested with header filter & sorter effect
  tableColorHover: "rgba(0, 0, 100, 0.03)",
  tableColorStriped: "rgba(0, 0, 100, 0.02)",
  pressedColor: "rgb(237, 237, 239)",
  opacityDisabled: base.alphaDisabled,
  inputColorDisabled: "rgb(250, 250, 252)",
  // secondary button color
  // can also be used in tertiary button & quaternary button
  buttonColor2: "rgba(46, 51, 56, .05)",
  buttonColor2Hover: "rgba(46, 51, 56, .09)",
  buttonColor2Pressed: "rgba(46, 51, 56, .13)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
});
const commonLight = derived;
const commonVars$2 = {
  iconSizeSmall: "34px",
  iconSizeMedium: "40px",
  iconSizeLarge: "46px",
  iconSizeHuge: "52px"
};
const self$h = (vars) => {
  const { textColorDisabled, iconColor, textColor2, fontSizeSmall, fontSizeMedium, fontSizeLarge, fontSizeHuge } = vars;
  return Object.assign(Object.assign({}, commonVars$2), {
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    textColor: textColorDisabled,
    iconColor,
    extraTextColor: textColor2
  });
};
const emptyLight = {
  name: "Empty",
  common: commonLight,
  self: self$h
};
const emptyLight$1 = emptyLight;
const style$i = cB("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [cE("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [c$1("+", [cE("description", `
 margin-top: 8px;
 `)])]), cE("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), cE("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]);
const emptyProps = Object.assign(Object.assign({}, useTheme.props), { description: String, showDescription: {
  type: Boolean,
  default: true
}, showIcon: {
  type: Boolean,
  default: true
}, size: {
  type: String,
  default: "medium"
}, renderIcon: Function });
const NEmpty = /* @__PURE__ */ defineComponent({
  name: "Empty",
  props: emptyProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const themeRef = useTheme("Empty", "-empty", style$i, emptyLight$1, props, mergedClsPrefixRef);
    const { localeRef } = useLocale("Empty");
    const NConfigProvider = inject(configProviderInjectionKey, null);
    const mergedDescriptionRef = computed(() => {
      var _a, _b, _c;
      return (_a = props.description) !== null && _a !== void 0 ? _a : (_c = (_b = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedComponentPropsRef.value) === null || _b === void 0 ? void 0 : _b.Empty) === null || _c === void 0 ? void 0 : _c.description;
    });
    const mergedRenderIconRef = computed(() => {
      var _a, _b;
      return ((_b = (_a = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Empty) === null || _b === void 0 ? void 0 : _b.renderIcon) || (() => h(EmptyIcon, null));
    });
    const cssVarsRef = computed(() => {
      const { size: size2 } = props;
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: { [createKey("iconSize", size2)]: iconSize, [createKey("fontSize", size2)]: fontSize2, textColor, iconColor, extraTextColor } } = themeRef.value;
      return {
        "--n-icon-size": iconSize,
        "--n-font-size": fontSize2,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-text-color": textColor,
        "--n-icon-color": iconColor,
        "--n-extra-text-color": extraTextColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("empty", computed(() => {
      let hash = "";
      const { size: size2 } = props;
      hash += size2[0];
      return hash;
    }), cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedRenderIcon: mergedRenderIconRef,
      localizedDescription: computed(() => {
        return mergedDescriptionRef.value || localeRef.value.description;
      }),
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const { $slots, mergedClsPrefix, onRender } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h(
      "div",
      { class: [`${mergedClsPrefix}-empty`, this.themeClass], style: this.cssVars },
      this.showIcon ? h("div", { class: `${mergedClsPrefix}-empty__icon` }, $slots.icon ? $slots.icon() : h(NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: this.mergedRenderIcon })) : null,
      this.showDescription ? h("div", { class: `${mergedClsPrefix}-empty__description` }, $slots.default ? $slots.default() : this.localizedDescription) : null,
      $slots.extra ? h("div", { class: `${mergedClsPrefix}-empty__extra` }, $slots.extra()) : null
    );
  }
});
const self$g = (vars) => {
  const { scrollbarColor, scrollbarColorHover } = vars;
  return {
    color: scrollbarColor,
    colorHover: scrollbarColorHover
  };
};
const scrollbarLight = {
  name: "Scrollbar",
  common: commonLight,
  self: self$g
};
const scrollbarLight$1 = scrollbarLight;
const {
  cubicBezierEaseInOut: cubicBezierEaseInOut$2
} = commonVariables$9;
function fadeInTransition({
  name = "fade-in",
  enterDuration = "0.2s",
  leaveDuration = "0.2s",
  enterCubicBezier = cubicBezierEaseInOut$2,
  leaveCubicBezier = cubicBezierEaseInOut$2
} = {}) {
  return [c$1(`&.${name}-transition-enter-active`, {
    transition: `all ${enterDuration} ${enterCubicBezier}!important`
  }), c$1(`&.${name}-transition-leave-active`, {
    transition: `all ${leaveDuration} ${leaveCubicBezier}!important`
  }), c$1(`&.${name}-transition-enter-from, &.${name}-transition-leave-to`, {
    opacity: 0
  }), c$1(`&.${name}-transition-leave-from, &.${name}-transition-enter-to`, {
    opacity: 1
  })];
}
const style$h = cB("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [c$1(">", [cB("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 max-height: inherit;
 scrollbar-width: none;
 `, [c$1("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), c$1(">", [cB("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)])])]), c$1(">, +", [cB("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 -webkit-user-select: none;
 `, [cM("horizontal", `
 left: 2px;
 right: 2px;
 bottom: 4px;
 height: var(--n-scrollbar-height);
 `, [c$1(">", [cE("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), cM("vertical", `
 right: 4px;
 top: 2px;
 bottom: 2px;
 width: var(--n-scrollbar-width);
 `, [c$1(">", [cE("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), cM("disabled", [c$1(">", [cE("scrollbar", {
  pointerEvents: "none"
})])]), c$1(">", [cE("scrollbar", `
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [fadeInTransition(), c$1("&:hover", {
  backgroundColor: "var(--n-scrollbar-color-hover)"
})])])])])]);
const scrollbarProps = Object.assign(Object.assign({}, useTheme.props), {
  size: {
    type: Number,
    default: 5
  },
  duration: {
    type: Number,
    default: 0
  },
  scrollable: {
    type: Boolean,
    default: true
  },
  xScrollable: Boolean,
  trigger: {
    type: String,
    default: "hover"
  },
  useUnifiedContainer: Boolean,
  triggerDisplayManually: Boolean,
  // If container is set, resize observer won't not attached
  container: Function,
  content: Function,
  containerClass: String,
  containerStyle: [String, Object],
  contentClass: String,
  contentStyle: [String, Object],
  horizontalRailStyle: [String, Object],
  verticalRailStyle: [String, Object],
  onScroll: Function,
  onWheel: Function,
  onResize: Function,
  internalOnUpdateScrollLeft: Function,
  internalHoistYRail: Boolean
});
const Scrollbar = /* @__PURE__ */ defineComponent({
  name: "Scrollbar",
  props: scrollbarProps,
  inheritAttrs: false,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = useConfig(props);
    const rtlEnabledRef = useRtl("Scrollbar", mergedRtlRef, mergedClsPrefixRef);
    const wrapperRef = ref(null);
    const containerRef = ref(null);
    const contentRef = ref(null);
    const yRailRef = ref(null);
    const xRailRef = ref(null);
    const contentHeightRef = ref(null);
    const contentWidthRef = ref(null);
    const containerHeightRef = ref(null);
    const containerWidthRef = ref(null);
    const yRailSizeRef = ref(null);
    const xRailSizeRef = ref(null);
    const containerScrollTopRef = ref(0);
    const containerScrollLeftRef = ref(0);
    const isShowXBarRef = ref(false);
    const isShowYBarRef = ref(false);
    let yBarPressed = false;
    let xBarPressed = false;
    let xBarVanishTimerId;
    let yBarVanishTimerId;
    let memoYTop = 0;
    let memoXLeft = 0;
    let memoMouseX = 0;
    let memoMouseY = 0;
    const isIos2 = useIsIos();
    const yBarSizeRef = computed(() => {
      const { value: containerHeight } = containerHeightRef;
      const { value: contentHeight } = contentHeightRef;
      const { value: yRailSize } = yRailSizeRef;
      if (containerHeight === null || contentHeight === null || yRailSize === null) {
        return 0;
      } else {
        return Math.min(containerHeight, yRailSize * containerHeight / contentHeight + props.size * 1.5);
      }
    });
    const yBarSizePxRef = computed(() => {
      return `${yBarSizeRef.value}px`;
    });
    const xBarSizeRef = computed(() => {
      const { value: containerWidth } = containerWidthRef;
      const { value: contentWidth } = contentWidthRef;
      const { value: xRailSize } = xRailSizeRef;
      if (containerWidth === null || contentWidth === null || xRailSize === null) {
        return 0;
      } else {
        return xRailSize * containerWidth / contentWidth + props.size * 1.5;
      }
    });
    const xBarSizePxRef = computed(() => {
      return `${xBarSizeRef.value}px`;
    });
    const yBarTopRef = computed(() => {
      const { value: containerHeight } = containerHeightRef;
      const { value: containerScrollTop } = containerScrollTopRef;
      const { value: contentHeight } = contentHeightRef;
      const { value: yRailSize } = yRailSizeRef;
      if (containerHeight === null || contentHeight === null || yRailSize === null) {
        return 0;
      } else {
        const heightDiff = contentHeight - containerHeight;
        if (!heightDiff)
          return 0;
        return containerScrollTop / heightDiff * (yRailSize - yBarSizeRef.value);
      }
    });
    const yBarTopPxRef = computed(() => {
      return `${yBarTopRef.value}px`;
    });
    const xBarLeftRef = computed(() => {
      const { value: containerWidth } = containerWidthRef;
      const { value: containerScrollLeft } = containerScrollLeftRef;
      const { value: contentWidth } = contentWidthRef;
      const { value: xRailSize } = xRailSizeRef;
      if (containerWidth === null || contentWidth === null || xRailSize === null) {
        return 0;
      } else {
        const widthDiff = contentWidth - containerWidth;
        if (!widthDiff)
          return 0;
        return containerScrollLeft / widthDiff * (xRailSize - xBarSizeRef.value);
      }
    });
    const xBarLeftPxRef = computed(() => {
      return `${xBarLeftRef.value}px`;
    });
    const needYBarRef = computed(() => {
      const { value: containerHeight } = containerHeightRef;
      const { value: contentHeight } = contentHeightRef;
      return containerHeight !== null && contentHeight !== null && contentHeight > containerHeight;
    });
    const needXBarRef = computed(() => {
      const { value: containerWidth } = containerWidthRef;
      const { value: contentWidth } = contentWidthRef;
      return containerWidth !== null && contentWidth !== null && contentWidth > containerWidth;
    });
    const mergedShowXBarRef = computed(() => {
      const { trigger: trigger2 } = props;
      return trigger2 === "none" || isShowXBarRef.value;
    });
    const mergedShowYBarRef = computed(() => {
      const { trigger: trigger2 } = props;
      return trigger2 === "none" || isShowYBarRef.value;
    });
    const mergedContainerRef = computed(() => {
      const { container } = props;
      if (container)
        return container();
      return containerRef.value;
    });
    const mergedContentRef = computed(() => {
      const { content } = props;
      if (content)
        return content();
      return contentRef.value;
    });
    const activateState = useReactivated(() => {
      if (!props.container) {
        scrollTo({
          top: containerScrollTopRef.value,
          left: containerScrollLeftRef.value
        });
      }
    });
    const handleContentResize = () => {
      if (activateState.isDeactivated)
        return;
      sync();
    };
    const handleContainerResize = (e) => {
      if (activateState.isDeactivated)
        return;
      const { onResize } = props;
      if (onResize)
        onResize(e);
      sync();
    };
    const scrollTo = (options, y) => {
      if (!props.scrollable)
        return;
      if (typeof options === "number") {
        scrollToPosition(y !== null && y !== void 0 ? y : 0, options, 0, false, "auto");
        return;
      }
      const { left, top, index, elSize, position, behavior, el, debounce = true } = options;
      if (left !== void 0 || top !== void 0) {
        scrollToPosition(left !== null && left !== void 0 ? left : 0, top !== null && top !== void 0 ? top : 0, 0, false, behavior);
      }
      if (el !== void 0) {
        scrollToPosition(0, el.offsetTop, el.offsetHeight, debounce, behavior);
      } else if (index !== void 0 && elSize !== void 0) {
        scrollToPosition(0, index * elSize, elSize, debounce, behavior);
      } else if (position === "bottom") {
        scrollToPosition(0, Number.MAX_SAFE_INTEGER, 0, false, behavior);
      } else if (position === "top") {
        scrollToPosition(0, 0, 0, false, behavior);
      }
    };
    const scrollBy = (options, y) => {
      if (!props.scrollable)
        return;
      const { value: container } = mergedContainerRef;
      if (!container)
        return;
      if (typeof options === "object") {
        container.scrollBy(options);
      } else {
        container.scrollBy(options, y || 0);
      }
    };
    function scrollToPosition(left, top, elSize, debounce, behavior) {
      const { value: container } = mergedContainerRef;
      if (!container)
        return;
      if (debounce) {
        const { scrollTop, offsetHeight } = container;
        if (top > scrollTop) {
          if (top + elSize <= scrollTop + offsetHeight)
            ;
          else {
            container.scrollTo({
              left,
              top: top + elSize - offsetHeight,
              behavior
            });
          }
          return;
        }
      }
      container.scrollTo({
        left,
        top,
        behavior
      });
    }
    function handleMouseEnterWrapper() {
      showXBar();
      showYBar();
      sync();
    }
    function handleMouseLeaveWrapper() {
      hideBar();
    }
    function hideBar() {
      hideYBar();
      hideXBar();
    }
    function hideYBar() {
      if (yBarVanishTimerId !== void 0) {
        window.clearTimeout(yBarVanishTimerId);
      }
      yBarVanishTimerId = window.setTimeout(() => {
        isShowYBarRef.value = false;
      }, props.duration);
    }
    function hideXBar() {
      if (xBarVanishTimerId !== void 0) {
        window.clearTimeout(xBarVanishTimerId);
      }
      xBarVanishTimerId = window.setTimeout(() => {
        isShowXBarRef.value = false;
      }, props.duration);
    }
    function showXBar() {
      if (xBarVanishTimerId !== void 0) {
        window.clearTimeout(xBarVanishTimerId);
      }
      isShowXBarRef.value = true;
    }
    function showYBar() {
      if (yBarVanishTimerId !== void 0) {
        window.clearTimeout(yBarVanishTimerId);
      }
      isShowYBarRef.value = true;
    }
    function handleScroll(e) {
      const { onScroll } = props;
      if (onScroll)
        onScroll(e);
      syncScrollState();
    }
    function syncScrollState() {
      const { value: container } = mergedContainerRef;
      if (container) {
        containerScrollTopRef.value = container.scrollTop;
        containerScrollLeftRef.value = container.scrollLeft * ((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? -1 : 1);
      }
    }
    function syncPositionState() {
      const { value: content } = mergedContentRef;
      if (content) {
        contentHeightRef.value = content.offsetHeight;
        contentWidthRef.value = content.offsetWidth;
      }
      const { value: container } = mergedContainerRef;
      if (container) {
        containerHeightRef.value = container.offsetHeight;
        containerWidthRef.value = container.offsetWidth;
      }
      const { value: xRailEl } = xRailRef;
      const { value: yRailEl } = yRailRef;
      if (xRailEl) {
        xRailSizeRef.value = xRailEl.offsetWidth;
      }
      if (yRailEl) {
        yRailSizeRef.value = yRailEl.offsetHeight;
      }
    }
    function syncUnifiedContainer() {
      const { value: container } = mergedContainerRef;
      if (container) {
        containerScrollTopRef.value = container.scrollTop;
        containerScrollLeftRef.value = container.scrollLeft * ((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? -1 : 1);
        containerHeightRef.value = container.offsetHeight;
        containerWidthRef.value = container.offsetWidth;
        contentHeightRef.value = container.scrollHeight;
        contentWidthRef.value = container.scrollWidth;
      }
      const { value: xRailEl } = xRailRef;
      const { value: yRailEl } = yRailRef;
      if (xRailEl) {
        xRailSizeRef.value = xRailEl.offsetWidth;
      }
      if (yRailEl) {
        yRailSizeRef.value = yRailEl.offsetHeight;
      }
    }
    function sync() {
      if (!props.scrollable)
        return;
      if (props.useUnifiedContainer) {
        syncUnifiedContainer();
      } else {
        syncPositionState();
        syncScrollState();
      }
    }
    function isMouseUpAway(e) {
      var _a;
      return !((_a = wrapperRef.value) === null || _a === void 0 ? void 0 : _a.contains(getPreciseEventTarget(e)));
    }
    function handleXScrollMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();
      xBarPressed = true;
      on("mousemove", window, handleXScrollMouseMove, true);
      on("mouseup", window, handleXScrollMouseUp, true);
      memoXLeft = containerScrollLeftRef.value;
      memoMouseX = (rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? window.innerWidth - e.clientX : e.clientX;
    }
    function handleXScrollMouseMove(e) {
      if (!xBarPressed)
        return;
      if (xBarVanishTimerId !== void 0) {
        window.clearTimeout(xBarVanishTimerId);
      }
      if (yBarVanishTimerId !== void 0) {
        window.clearTimeout(yBarVanishTimerId);
      }
      const { value: containerWidth } = containerWidthRef;
      const { value: contentWidth } = contentWidthRef;
      const { value: xBarSize } = xBarSizeRef;
      if (containerWidth === null || contentWidth === null)
        return;
      const dX = (rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? window.innerWidth - e.clientX - memoMouseX : e.clientX - memoMouseX;
      const dScrollLeft = dX * (contentWidth - containerWidth) / (containerWidth - xBarSize);
      const toScrollLeftUpperBound = contentWidth - containerWidth;
      let toScrollLeft = memoXLeft + dScrollLeft;
      toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft);
      toScrollLeft = Math.max(toScrollLeft, 0);
      const { value: container } = mergedContainerRef;
      if (container) {
        container.scrollLeft = toScrollLeft * ((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? -1 : 1);
        const { internalOnUpdateScrollLeft } = props;
        if (internalOnUpdateScrollLeft)
          internalOnUpdateScrollLeft(toScrollLeft);
      }
    }
    function handleXScrollMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();
      off("mousemove", window, handleXScrollMouseMove, true);
      off("mouseup", window, handleXScrollMouseUp, true);
      xBarPressed = false;
      sync();
      if (isMouseUpAway(e)) {
        hideBar();
      }
    }
    function handleYScrollMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();
      yBarPressed = true;
      on("mousemove", window, handleYScrollMouseMove, true);
      on("mouseup", window, handleYScrollMouseUp, true);
      memoYTop = containerScrollTopRef.value;
      memoMouseY = e.clientY;
    }
    function handleYScrollMouseMove(e) {
      if (!yBarPressed)
        return;
      if (xBarVanishTimerId !== void 0) {
        window.clearTimeout(xBarVanishTimerId);
      }
      if (yBarVanishTimerId !== void 0) {
        window.clearTimeout(yBarVanishTimerId);
      }
      const { value: containerHeight } = containerHeightRef;
      const { value: contentHeight } = contentHeightRef;
      const { value: yBarSize } = yBarSizeRef;
      if (containerHeight === null || contentHeight === null)
        return;
      const dY = e.clientY - memoMouseY;
      const dScrollTop = dY * (contentHeight - containerHeight) / (containerHeight - yBarSize);
      const toScrollTopUpperBound = contentHeight - containerHeight;
      let toScrollTop = memoYTop + dScrollTop;
      toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop);
      toScrollTop = Math.max(toScrollTop, 0);
      const { value: container } = mergedContainerRef;
      if (container) {
        container.scrollTop = toScrollTop;
      }
    }
    function handleYScrollMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();
      off("mousemove", window, handleYScrollMouseMove, true);
      off("mouseup", window, handleYScrollMouseUp, true);
      yBarPressed = false;
      sync();
      if (isMouseUpAway(e)) {
        hideBar();
      }
    }
    watchEffect(() => {
      const { value: needXBar } = needXBarRef;
      const { value: needYBar } = needYBarRef;
      const { value: mergedClsPrefix } = mergedClsPrefixRef;
      const { value: xRailEl } = xRailRef;
      const { value: yRailEl } = yRailRef;
      if (xRailEl) {
        if (!needXBar) {
          xRailEl.classList.add(`${mergedClsPrefix}-scrollbar-rail--disabled`);
        } else {
          xRailEl.classList.remove(`${mergedClsPrefix}-scrollbar-rail--disabled`);
        }
      }
      if (yRailEl) {
        if (!needYBar) {
          yRailEl.classList.add(`${mergedClsPrefix}-scrollbar-rail--disabled`);
        } else {
          yRailEl.classList.remove(`${mergedClsPrefix}-scrollbar-rail--disabled`);
        }
      }
    });
    onMounted(() => {
      if (props.container)
        return;
      sync();
    });
    onBeforeUnmount(() => {
      if (xBarVanishTimerId !== void 0) {
        window.clearTimeout(xBarVanishTimerId);
      }
      if (yBarVanishTimerId !== void 0) {
        window.clearTimeout(yBarVanishTimerId);
      }
      off("mousemove", window, handleYScrollMouseMove, true);
      off("mouseup", window, handleYScrollMouseUp, true);
    });
    const themeRef = useTheme("Scrollbar", "-scrollbar", style$h, scrollbarLight$1, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2, scrollbarBorderRadius, scrollbarHeight, scrollbarWidth }, self: { color, colorHover } } = themeRef.value;
      return {
        "--n-scrollbar-bezier": cubicBezierEaseInOut2,
        "--n-scrollbar-color": color,
        "--n-scrollbar-color-hover": colorHover,
        "--n-scrollbar-border-radius": scrollbarBorderRadius,
        "--n-scrollbar-width": scrollbarWidth,
        "--n-scrollbar-height": scrollbarHeight
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("scrollbar", void 0, cssVarsRef, props) : void 0;
    const exposedMethods = {
      scrollTo,
      scrollBy,
      sync,
      syncUnifiedContainer,
      handleMouseEnterWrapper,
      handleMouseLeaveWrapper
    };
    return Object.assign(Object.assign({}, exposedMethods), {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      containerScrollTop: containerScrollTopRef,
      wrapperRef,
      containerRef,
      contentRef,
      yRailRef,
      xRailRef,
      needYBar: needYBarRef,
      needXBar: needXBarRef,
      yBarSizePx: yBarSizePxRef,
      xBarSizePx: xBarSizePxRef,
      yBarTopPx: yBarTopPxRef,
      xBarLeftPx: xBarLeftPxRef,
      isShowXBar: mergedShowXBarRef,
      isShowYBar: mergedShowYBarRef,
      isIos: isIos2,
      handleScroll,
      handleContentResize,
      handleContainerResize,
      handleYScrollMouseDown,
      handleXScrollMouseDown,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a;
    const { $slots, mergedClsPrefix, triggerDisplayManually, rtlEnabled, internalHoistYRail } = this;
    if (!this.scrollable)
      return (_a = $slots.default) === null || _a === void 0 ? void 0 : _a.call($slots);
    const triggerIsNone = this.trigger === "none";
    const createYRail = () => {
      return h("div", { ref: "yRailRef", class: [
        `${mergedClsPrefix}-scrollbar-rail`,
        `${mergedClsPrefix}-scrollbar-rail--vertical`
      ], "data-scrollbar-rail": true, style: this.verticalRailStyle, "aria-hidden": true }, h(triggerIsNone ? Wrapper : Transition, triggerIsNone ? null : { name: "fade-in-transition" }, {
        default: () => this.needYBar && this.isShowYBar && !this.isIos ? h("div", { class: `${mergedClsPrefix}-scrollbar-rail__scrollbar`, style: {
          height: this.yBarSizePx,
          top: this.yBarTopPx
        }, onMousedown: this.handleYScrollMouseDown }) : null
      }));
    };
    const createChildren = () => {
      var _a2, _b;
      (_a2 = this.onRender) === null || _a2 === void 0 ? void 0 : _a2.call(this);
      return h("div", mergeProps(this.$attrs, {
        role: "none",
        ref: "wrapperRef",
        class: [
          `${mergedClsPrefix}-scrollbar`,
          this.themeClass,
          rtlEnabled && `${mergedClsPrefix}-scrollbar--rtl`
        ],
        style: this.cssVars,
        onMouseenter: triggerDisplayManually ? void 0 : this.handleMouseEnterWrapper,
        onMouseleave: triggerDisplayManually ? void 0 : this.handleMouseLeaveWrapper
      }), [
        this.container ? (_b = $slots.default) === null || _b === void 0 ? void 0 : _b.call($slots) : h(
          "div",
          { role: "none", ref: "containerRef", class: [
            `${mergedClsPrefix}-scrollbar-container`,
            this.containerClass
          ], style: this.containerStyle, onScroll: this.handleScroll, onWheel: this.onWheel },
          h(VResizeObserver, { onResize: this.handleContentResize }, {
            default: () => h("div", { ref: "contentRef", role: "none", style: [
              {
                width: this.xScrollable ? "fit-content" : null
              },
              this.contentStyle
            ], class: [
              `${mergedClsPrefix}-scrollbar-content`,
              this.contentClass
            ] }, $slots)
          })
        ),
        internalHoistYRail ? null : createYRail(),
        this.xScrollable && h("div", { ref: "xRailRef", class: [
          `${mergedClsPrefix}-scrollbar-rail`,
          `${mergedClsPrefix}-scrollbar-rail--horizontal`
        ], style: this.horizontalRailStyle, "data-scrollbar-rail": true, "aria-hidden": true }, h(triggerIsNone ? Wrapper : Transition, triggerIsNone ? null : { name: "fade-in-transition" }, {
          default: () => this.needXBar && this.isShowXBar && !this.isIos ? h("div", { class: `${mergedClsPrefix}-scrollbar-rail__scrollbar`, style: {
            width: this.xBarSizePx,
            right: rtlEnabled ? this.xBarLeftPx : void 0,
            left: rtlEnabled ? void 0 : this.xBarLeftPx
          }, onMousedown: this.handleXScrollMouseDown }) : null
        }))
      ]);
    };
    const scrollbarNode = this.container ? createChildren() : h(VResizeObserver, { onResize: this.handleContainerResize }, {
      default: createChildren
    });
    if (internalHoistYRail) {
      return h(
        Fragment,
        null,
        scrollbarNode,
        createYRail()
      );
    } else {
      return scrollbarNode;
    }
  }
});
const NScrollbar = Scrollbar;
const XScrollbar = Scrollbar;
const commonVariables$8 = {
  height: "calc(var(--n-option-height) * 7.6)",
  paddingSmall: "4px 0",
  paddingMedium: "4px 0",
  paddingLarge: "4px 0",
  paddingHuge: "4px 0",
  optionPaddingSmall: "0 12px",
  optionPaddingMedium: "0 12px",
  optionPaddingLarge: "0 12px",
  optionPaddingHuge: "0 12px",
  loadingSize: "18px"
};
const self$f = (vars) => {
  const { borderRadius, popoverColor, textColor3, dividerColor, textColor2, primaryColorPressed, textColorDisabled, primaryColor, opacityDisabled, hoverColor, fontSizeSmall, fontSizeMedium, fontSizeLarge, fontSizeHuge, heightSmall, heightMedium, heightLarge, heightHuge } = vars;
  return Object.assign(Object.assign({}, commonVariables$8), { optionFontSizeSmall: fontSizeSmall, optionFontSizeMedium: fontSizeMedium, optionFontSizeLarge: fontSizeLarge, optionFontSizeHuge: fontSizeHuge, optionHeightSmall: heightSmall, optionHeightMedium: heightMedium, optionHeightLarge: heightLarge, optionHeightHuge: heightHuge, borderRadius, color: popoverColor, groupHeaderTextColor: textColor3, actionDividerColor: dividerColor, optionTextColor: textColor2, optionTextColorPressed: primaryColorPressed, optionTextColorDisabled: textColorDisabled, optionTextColorActive: primaryColor, optionOpacityDisabled: opacityDisabled, optionCheckColor: primaryColor, optionColorPending: hoverColor, optionColorActive: "rgba(0, 0, 0, 0)", optionColorActivePending: hoverColor, actionTextColor: textColor2, loadingColor: primaryColor });
};
const internalSelectMenuLight = createTheme({
  name: "InternalSelectMenu",
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight$1,
    Empty: emptyLight$1
  },
  self: self$f
});
const internalSelectMenuLight$1 = internalSelectMenuLight;
function renderCheckMark(show, clsPrefix) {
  return h(Transition, { name: "fade-in-scale-up-transition" }, {
    default: () => show ? h(NBaseIcon, { clsPrefix, class: `${clsPrefix}-base-select-option__check` }, {
      default: () => h(FinishedIcon)
    }) : null
  });
}
const NSelectOption = /* @__PURE__ */ defineComponent({
  name: "NBaseSelectOption",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const {
      valueRef,
      pendingTmNodeRef,
      multipleRef,
      valueSetRef,
      renderLabelRef,
      renderOptionRef,
      labelFieldRef,
      valueFieldRef,
      showCheckmarkRef,
      nodePropsRef,
      handleOptionClick,
      handleOptionMouseEnter
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(internalSelectionMenuInjectionKey);
    const isPendingRef = useMemo(() => {
      const { value: pendingTmNode } = pendingTmNodeRef;
      if (!pendingTmNode)
        return false;
      return props.tmNode.key === pendingTmNode.key;
    });
    function handleClick(e) {
      const { tmNode } = props;
      if (tmNode.disabled)
        return;
      handleOptionClick(e, tmNode);
    }
    function handleMouseEnter(e) {
      const { tmNode } = props;
      if (tmNode.disabled)
        return;
      handleOptionMouseEnter(e, tmNode);
    }
    function handleMouseMove(e) {
      const { tmNode } = props;
      const { value: isPending } = isPendingRef;
      if (tmNode.disabled || isPending)
        return;
      handleOptionMouseEnter(e, tmNode);
    }
    return {
      multiple: multipleRef,
      isGrouped: useMemo(() => {
        const { tmNode } = props;
        const { parent } = tmNode;
        return parent && parent.rawNode.type === "group";
      }),
      showCheckmark: showCheckmarkRef,
      nodeProps: nodePropsRef,
      isPending: isPendingRef,
      isSelected: useMemo(() => {
        const { value } = valueRef;
        const { value: multiple } = multipleRef;
        if (value === null)
          return false;
        const optionValue = props.tmNode.rawNode[valueFieldRef.value];
        if (multiple) {
          const { value: valueSet } = valueSetRef;
          return valueSet.has(optionValue);
        } else {
          return value === optionValue;
        }
      }),
      labelField: labelFieldRef,
      renderLabel: renderLabelRef,
      renderOption: renderOptionRef,
      handleMouseMove,
      handleMouseEnter,
      handleClick
    };
  },
  render() {
    const { clsPrefix, tmNode: { rawNode }, isSelected, isPending, isGrouped, showCheckmark, nodeProps, renderOption, renderLabel, handleClick, handleMouseEnter, handleMouseMove } = this;
    const checkmark = renderCheckMark(isSelected, clsPrefix);
    const children = renderLabel ? [renderLabel(rawNode, isSelected), showCheckmark && checkmark] : [
      render$1(rawNode[this.labelField], rawNode, isSelected),
      showCheckmark && checkmark
    ];
    const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(rawNode);
    const node = h(
      "div",
      Object.assign({}, attrs, { class: [
        `${clsPrefix}-base-select-option`,
        rawNode.class,
        attrs === null || attrs === void 0 ? void 0 : attrs.class,
        {
          [`${clsPrefix}-base-select-option--disabled`]: rawNode.disabled,
          [`${clsPrefix}-base-select-option--selected`]: isSelected,
          [`${clsPrefix}-base-select-option--grouped`]: isGrouped,
          [`${clsPrefix}-base-select-option--pending`]: isPending,
          [`${clsPrefix}-base-select-option--show-checkmark`]: showCheckmark
        }
      ], style: [(attrs === null || attrs === void 0 ? void 0 : attrs.style) || "", rawNode.style || ""], onClick: mergeEventHandlers([handleClick, attrs === null || attrs === void 0 ? void 0 : attrs.onClick]), onMouseenter: mergeEventHandlers([
        handleMouseEnter,
        attrs === null || attrs === void 0 ? void 0 : attrs.onMouseenter
      ]), onMousemove: mergeEventHandlers([handleMouseMove, attrs === null || attrs === void 0 ? void 0 : attrs.onMousemove]) }),
      h("div", { class: `${clsPrefix}-base-select-option__content` }, children)
    );
    return rawNode.render ? rawNode.render({ node, option: rawNode, selected: isSelected }) : renderOption ? renderOption({ node, option: rawNode, selected: isSelected }) : node;
  }
});
const NSelectGroupHeader = /* @__PURE__ */ defineComponent({
  name: "NBaseSelectGroupHeader",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup() {
    const {
      renderLabelRef,
      renderOptionRef,
      labelFieldRef,
      nodePropsRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(internalSelectionMenuInjectionKey);
    return {
      labelField: labelFieldRef,
      nodeProps: nodePropsRef,
      renderLabel: renderLabelRef,
      renderOption: renderOptionRef
    };
  },
  render() {
    const { clsPrefix, renderLabel, renderOption, nodeProps, tmNode: { rawNode } } = this;
    const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(rawNode);
    const children = renderLabel ? renderLabel(rawNode, false) : render$1(rawNode[this.labelField], rawNode, false);
    const node = h("div", Object.assign({}, attrs, { class: [`${clsPrefix}-base-select-group-header`, attrs === null || attrs === void 0 ? void 0 : attrs.class] }), children);
    return rawNode.render ? rawNode.render({ node, option: rawNode }) : renderOption ? renderOption({ node, option: rawNode, selected: false }) : node;
  }
});
const {
  cubicBezierEaseIn: cubicBezierEaseIn$1,
  cubicBezierEaseOut: cubicBezierEaseOut$1
} = commonVariables$9;
function fadeInScaleUpTransition({
  transformOrigin = "inherit",
  duration = ".2s",
  enterScale = ".9",
  originalTransform = "",
  originalTransition = ""
} = {}) {
  return [c$1("&.fade-in-scale-up-transition-leave-active", {
    transformOrigin,
    transition: `opacity ${duration} ${cubicBezierEaseIn$1}, transform ${duration} ${cubicBezierEaseIn$1} ${originalTransition && "," + originalTransition}`
  }), c$1("&.fade-in-scale-up-transition-enter-active", {
    transformOrigin,
    transition: `opacity ${duration} ${cubicBezierEaseOut$1}, transform ${duration} ${cubicBezierEaseOut$1} ${originalTransition && "," + originalTransition}`
  }), c$1("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
    opacity: 0,
    transform: `${originalTransform} scale(${enterScale})`
  }), c$1("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
    opacity: 1,
    transform: `${originalTransform} scale(1)`
  })];
}
const style$g = cB("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [cB("scrollbar", `
 max-height: var(--n-height);
 `), cB("virtual-list", `
 max-height: var(--n-height);
 `), cB("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [cE("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), cB("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), cB("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), cE("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), cE("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), cE("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), cB("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), cB("base-select-option", `
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `, [cM("show-checkmark", `
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `), c$1("&::before", `
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), c$1("&:active", `
 color: var(--n-option-text-color-pressed);
 `), cM("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), cM("pending", [c$1("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), cM("selected", `
 color: var(--n-option-text-color-active);
 `, [c$1("&::before", `
 background-color: var(--n-option-color-active);
 `), cM("pending", [c$1("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), cM("disabled", `
 cursor: not-allowed;
 `, [cNotM("selected", `
 color: var(--n-option-text-color-disabled);
 `), cM("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), cE("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [fadeInScaleUpTransition({
  enterScale: "0.5"
})])])]);
const NInternalSelectMenu = /* @__PURE__ */ defineComponent({
  name: "InternalSelectMenu",
  props: Object.assign(Object.assign({}, useTheme.props), {
    clsPrefix: {
      type: String,
      required: true
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    treeMate: {
      type: Object,
      required: true
    },
    multiple: Boolean,
    size: {
      type: String,
      default: "medium"
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    autoPending: Boolean,
    virtualScroll: {
      type: Boolean,
      default: true
    },
    // show is used to toggle pending state initialization
    show: {
      type: Boolean,
      default: true
    },
    labelField: {
      type: String,
      default: "label"
    },
    valueField: {
      type: String,
      default: "value"
    },
    loading: Boolean,
    focusable: Boolean,
    renderLabel: Function,
    renderOption: Function,
    nodeProps: Function,
    showCheckmark: { type: Boolean, default: true },
    onMousedown: Function,
    onScroll: Function,
    onFocus: Function,
    onBlur: Function,
    onKeyup: Function,
    onKeydown: Function,
    onTabOut: Function,
    onMouseenter: Function,
    onMouseleave: Function,
    onResize: Function,
    resetMenuOnOptionsChange: {
      type: Boolean,
      default: true
    },
    inlineThemeDisabled: Boolean,
    // deprecated
    onToggle: Function
  }),
  setup(props) {
    const themeRef = useTheme("InternalSelectMenu", "-internal-select-menu", style$g, internalSelectMenuLight$1, props, toRef(props, "clsPrefix"));
    const selfRef = ref(null);
    const virtualListRef = ref(null);
    const scrollbarRef = ref(null);
    const flattenedNodesRef = computed(() => props.treeMate.getFlattenedNodes());
    const fIndexGetterRef = computed(() => createIndexGetter(flattenedNodesRef.value));
    const pendingNodeRef = ref(null);
    function initPendingNode() {
      const { treeMate } = props;
      let defaultPendingNode = null;
      const { value } = props;
      if (value === null) {
        defaultPendingNode = treeMate.getFirstAvailableNode();
      } else {
        if (props.multiple) {
          defaultPendingNode = treeMate.getNode((value || [])[(value || []).length - 1]);
        } else {
          defaultPendingNode = treeMate.getNode(value);
        }
        if (!defaultPendingNode || defaultPendingNode.disabled) {
          defaultPendingNode = treeMate.getFirstAvailableNode();
        }
      }
      if (defaultPendingNode) {
        setPendingTmNode(defaultPendingNode);
      } else {
        setPendingTmNode(null);
      }
    }
    function clearPendingNodeIfInvalid() {
      const { value: pendingNode } = pendingNodeRef;
      if (pendingNode && !props.treeMate.getNode(pendingNode.key)) {
        pendingNodeRef.value = null;
      }
    }
    let initPendingNodeWatchStopHandle;
    watch(() => props.show, (show) => {
      if (show) {
        initPendingNodeWatchStopHandle = watch(() => props.treeMate, () => {
          if (props.resetMenuOnOptionsChange) {
            if (props.autoPending) {
              initPendingNode();
            } else {
              clearPendingNodeIfInvalid();
            }
            void nextTick(scrollToPendingNode);
          } else {
            clearPendingNodeIfInvalid();
          }
        }, {
          immediate: true
        });
      } else {
        initPendingNodeWatchStopHandle === null || initPendingNodeWatchStopHandle === void 0 ? void 0 : initPendingNodeWatchStopHandle();
      }
    }, {
      immediate: true
    });
    onBeforeUnmount(() => {
      initPendingNodeWatchStopHandle === null || initPendingNodeWatchStopHandle === void 0 ? void 0 : initPendingNodeWatchStopHandle();
    });
    const itemSizeRef = computed(() => {
      return depx(themeRef.value.self[createKey("optionHeight", props.size)]);
    });
    const paddingRef = computed(() => {
      return getMargin(themeRef.value.self[createKey("padding", props.size)]);
    });
    const valueSetRef = computed(() => {
      if (props.multiple && Array.isArray(props.value)) {
        return new Set(props.value);
      }
      return /* @__PURE__ */ new Set();
    });
    const emptyRef = computed(() => {
      const tmNodes = flattenedNodesRef.value;
      return tmNodes && tmNodes.length === 0;
    });
    function doToggle(tmNode) {
      const { onToggle } = props;
      if (onToggle)
        onToggle(tmNode);
    }
    function doScroll(e) {
      const { onScroll } = props;
      if (onScroll)
        onScroll(e);
    }
    function handleVirtualListScroll(e) {
      var _a;
      (_a = scrollbarRef.value) === null || _a === void 0 ? void 0 : _a.sync();
      doScroll(e);
    }
    function handleVirtualListResize() {
      var _a;
      (_a = scrollbarRef.value) === null || _a === void 0 ? void 0 : _a.sync();
    }
    function getPendingTmNode() {
      const { value: pendingTmNode } = pendingNodeRef;
      if (pendingTmNode)
        return pendingTmNode;
      return null;
    }
    function handleOptionMouseEnter(e, tmNode) {
      if (tmNode.disabled)
        return;
      setPendingTmNode(tmNode, false);
    }
    function handleOptionClick(e, tmNode) {
      if (tmNode.disabled)
        return;
      doToggle(tmNode);
    }
    function handleKeyUp(e) {
      var _a;
      if (happensIn(e, "action"))
        return;
      (_a = props.onKeyup) === null || _a === void 0 ? void 0 : _a.call(props, e);
    }
    function handleKeyDown(e) {
      var _a;
      if (happensIn(e, "action"))
        return;
      (_a = props.onKeydown) === null || _a === void 0 ? void 0 : _a.call(props, e);
    }
    function handleMouseDown(e) {
      var _a;
      (_a = props.onMousedown) === null || _a === void 0 ? void 0 : _a.call(props, e);
      if (props.focusable)
        return;
      e.preventDefault();
    }
    function next() {
      const { value: pendingTmNode } = pendingNodeRef;
      if (pendingTmNode) {
        setPendingTmNode(pendingTmNode.getNext({ loop: true }), true);
      }
    }
    function prev() {
      const { value: pendingTmNode } = pendingNodeRef;
      if (pendingTmNode) {
        setPendingTmNode(pendingTmNode.getPrev({ loop: true }), true);
      }
    }
    function setPendingTmNode(tmNode, doScroll2 = false) {
      pendingNodeRef.value = tmNode;
      if (doScroll2)
        scrollToPendingNode();
    }
    function scrollToPendingNode() {
      var _a, _b;
      const tmNode = pendingNodeRef.value;
      if (!tmNode)
        return;
      const fIndex = fIndexGetterRef.value(tmNode.key);
      if (fIndex === null)
        return;
      if (props.virtualScroll) {
        (_a = virtualListRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo({ index: fIndex });
      } else {
        (_b = scrollbarRef.value) === null || _b === void 0 ? void 0 : _b.scrollTo({
          index: fIndex,
          elSize: itemSizeRef.value
        });
      }
    }
    function handleFocusin(e) {
      var _a, _b;
      if ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
        (_b = props.onFocus) === null || _b === void 0 ? void 0 : _b.call(props, e);
      }
    }
    function handleFocusout(e) {
      var _a, _b;
      if (!((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))) {
        (_b = props.onBlur) === null || _b === void 0 ? void 0 : _b.call(props, e);
      }
    }
    provide(internalSelectionMenuInjectionKey, {
      handleOptionMouseEnter,
      handleOptionClick,
      valueSetRef,
      pendingTmNodeRef: pendingNodeRef,
      nodePropsRef: toRef(props, "nodeProps"),
      showCheckmarkRef: toRef(props, "showCheckmark"),
      multipleRef: toRef(props, "multiple"),
      valueRef: toRef(props, "value"),
      renderLabelRef: toRef(props, "renderLabel"),
      renderOptionRef: toRef(props, "renderOption"),
      labelFieldRef: toRef(props, "labelField"),
      valueFieldRef: toRef(props, "valueField")
    });
    provide(internalSelectionMenuBodyInjectionKey, selfRef);
    onMounted(() => {
      const { value } = scrollbarRef;
      if (value)
        value.sync();
    });
    const cssVarsRef = computed(() => {
      const { size: size2 } = props;
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: { height, borderRadius, color, groupHeaderTextColor, actionDividerColor, optionTextColorPressed, optionTextColor, optionTextColorDisabled, optionTextColorActive, optionOpacityDisabled, optionCheckColor, actionTextColor, optionColorPending, optionColorActive, loadingColor, loadingSize, optionColorActivePending, [createKey("optionFontSize", size2)]: fontSize2, [createKey("optionHeight", size2)]: optionHeight, [createKey("optionPadding", size2)]: optionPadding } } = themeRef.value;
      return {
        "--n-height": height,
        "--n-action-divider-color": actionDividerColor,
        "--n-action-text-color": actionTextColor,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-border-radius": borderRadius,
        "--n-color": color,
        "--n-option-font-size": fontSize2,
        "--n-group-header-text-color": groupHeaderTextColor,
        "--n-option-check-color": optionCheckColor,
        "--n-option-color-pending": optionColorPending,
        "--n-option-color-active": optionColorActive,
        "--n-option-color-active-pending": optionColorActivePending,
        "--n-option-height": optionHeight,
        "--n-option-opacity-disabled": optionOpacityDisabled,
        "--n-option-text-color": optionTextColor,
        "--n-option-text-color-active": optionTextColorActive,
        "--n-option-text-color-disabled": optionTextColorDisabled,
        "--n-option-text-color-pressed": optionTextColorPressed,
        "--n-option-padding": optionPadding,
        "--n-option-padding-left": getMargin(optionPadding, "left"),
        "--n-option-padding-right": getMargin(optionPadding, "right"),
        "--n-loading-color": loadingColor,
        "--n-loading-size": loadingSize
      };
    });
    const { inlineThemeDisabled } = props;
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("internal-select-menu", computed(() => props.size[0]), cssVarsRef, props) : void 0;
    const exposedProps = {
      selfRef,
      next,
      prev,
      getPendingTmNode
    };
    useOnResize(selfRef, props.onResize);
    return Object.assign({
      mergedTheme: themeRef,
      virtualListRef,
      scrollbarRef,
      itemSize: itemSizeRef,
      padding: paddingRef,
      flattenedNodes: flattenedNodesRef,
      empty: emptyRef,
      virtualListContainer() {
        const { value } = virtualListRef;
        return value === null || value === void 0 ? void 0 : value.listElRef;
      },
      virtualListContent() {
        const { value } = virtualListRef;
        return value === null || value === void 0 ? void 0 : value.itemsElRef;
      },
      doScroll,
      handleFocusin,
      handleFocusout,
      handleKeyUp,
      handleKeyDown,
      handleMouseDown,
      handleVirtualListResize,
      handleVirtualListScroll,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    }, exposedProps);
  },
  render() {
    const { $slots, virtualScroll, clsPrefix, mergedTheme, themeClass, onRender } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h(
      "div",
      { ref: "selfRef", tabindex: this.focusable ? 0 : -1, class: [
        `${clsPrefix}-base-select-menu`,
        themeClass,
        this.multiple && `${clsPrefix}-base-select-menu--multiple`
      ], style: this.cssVars, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onKeyup: this.handleKeyUp, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave },
      this.loading ? h(
        "div",
        { class: `${clsPrefix}-base-select-menu__loading` },
        h(NBaseLoading, { clsPrefix, strokeWidth: 20 })
      ) : !this.empty ? h(NScrollbar, { ref: "scrollbarRef", theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar, scrollable: this.scrollable, container: virtualScroll ? this.virtualListContainer : void 0, content: virtualScroll ? this.virtualListContent : void 0, onScroll: virtualScroll ? void 0 : this.doScroll }, {
        default: () => {
          return virtualScroll ? h(VVirtualList, { ref: "virtualListRef", class: `${clsPrefix}-virtual-list`, items: this.flattenedNodes, itemSize: this.itemSize, showScrollbar: false, paddingTop: this.padding.top, paddingBottom: this.padding.bottom, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemResizable: true }, {
            default: ({ item: tmNode }) => {
              return tmNode.isGroup ? h(NSelectGroupHeader, { key: tmNode.key, clsPrefix, tmNode }) : tmNode.ignored ? null : h(NSelectOption, { clsPrefix, key: tmNode.key, tmNode });
            }
          }) : h("div", { class: `${clsPrefix}-base-select-menu-option-wrapper`, style: {
            paddingTop: this.padding.top,
            paddingBottom: this.padding.bottom
          } }, this.flattenedNodes.map((tmNode) => tmNode.isGroup ? h(NSelectGroupHeader, { key: tmNode.key, clsPrefix, tmNode }) : h(NSelectOption, { clsPrefix, key: tmNode.key, tmNode })));
        }
      }) : h("div", { class: `${clsPrefix}-base-select-menu__empty`, "data-empty": true }, resolveSlot($slots.empty, () => [
        h(NEmpty, { theme: mergedTheme.peers.Empty, themeOverrides: mergedTheme.peerOverrides.Empty })
      ])),
      resolveWrappedSlot($slots.action, (children) => children && [
        h("div", { class: `${clsPrefix}-base-select-menu__action`, "data-action": true, key: "action" }, children),
        h(FocusDetector, { onFocus: this.onTabOut, key: "focus-detector" })
      ])
    );
  }
});
const style$f = cB("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`);
const NBaseWave = /* @__PURE__ */ defineComponent({
  name: "BaseWave",
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup(props) {
    useStyle("-base-wave", style$f, toRef(props, "clsPrefix"));
    const selfRef = ref(null);
    const activeRef = ref(false);
    let animationTimerId = null;
    onBeforeUnmount(() => {
      if (animationTimerId !== null) {
        window.clearTimeout(animationTimerId);
      }
    });
    return {
      active: activeRef,
      selfRef,
      play() {
        if (animationTimerId !== null) {
          window.clearTimeout(animationTimerId);
          activeRef.value = false;
          animationTimerId = null;
        }
        void nextTick(() => {
          var _a;
          void ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight);
          activeRef.value = true;
          animationTimerId = window.setTimeout(() => {
            activeRef.value = false;
            animationTimerId = null;
          }, 1e3);
        });
      }
    };
  },
  render() {
    const { clsPrefix } = this;
    return h("div", { ref: "selfRef", "aria-hidden": true, class: [
      `${clsPrefix}-base-wave`,
      this.active && `${clsPrefix}-base-wave--active`
    ] });
  }
});
const commonVariables$7 = {
  space: "6px",
  spaceArrow: "10px",
  arrowOffset: "10px",
  arrowOffsetVertical: "10px",
  arrowHeight: "6px",
  padding: "8px 14px"
};
const self$e = (vars) => {
  const { boxShadow2, popoverColor, textColor2, borderRadius, fontSize: fontSize2, dividerColor } = vars;
  return Object.assign(Object.assign({}, commonVariables$7), {
    fontSize: fontSize2,
    borderRadius,
    color: popoverColor,
    dividerColor,
    textColor: textColor2,
    boxShadow: boxShadow2
  });
};
const popoverLight = {
  name: "Popover",
  common: commonLight,
  self: self$e
};
const popoverLight$1 = popoverLight;
const oppositePlacement = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
const arrowSize = "var(--n-arrow-height) * 1.414";
const style$e = c$1([cB("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [c$1(">", [cB("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), cNotM("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [cNotM("scrollable", [cNotM("show-header-or-footer", "padding: var(--n-padding);")])]), cE("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), cE("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), cM("scrollable, show-header-or-footer", [cE("content", `
 padding: var(--n-padding);
 `)])]), cB("popover-shared", `
 transform-origin: inherit;
 `, [
  cB("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [cB("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${arrowSize});
 height: calc(${arrowSize});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),
  // body transition
  c$1("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `),
  c$1("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `),
  c$1("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),
  c$1("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)
]), placementStyle("top-start", `
 top: calc(${arrowSize} / -2);
 left: calc(${getArrowOffset("top-start")} - var(--v-offset-left));
 `), placementStyle("top", `
 top: calc(${arrowSize} / -2);
 transform: translateX(calc(${arrowSize} / -2)) rotate(45deg);
 left: 50%;
 `), placementStyle("top-end", `
 top: calc(${arrowSize} / -2);
 right: calc(${getArrowOffset("top-end")} + var(--v-offset-left));
 `), placementStyle("bottom-start", `
 bottom: calc(${arrowSize} / -2);
 left: calc(${getArrowOffset("bottom-start")} - var(--v-offset-left));
 `), placementStyle("bottom", `
 bottom: calc(${arrowSize} / -2);
 transform: translateX(calc(${arrowSize} / -2)) rotate(45deg);
 left: 50%;
 `), placementStyle("bottom-end", `
 bottom: calc(${arrowSize} / -2);
 right: calc(${getArrowOffset("bottom-end")} + var(--v-offset-left));
 `), placementStyle("left-start", `
 left: calc(${arrowSize} / -2);
 top: calc(${getArrowOffset("left-start")} - var(--v-offset-top));
 `), placementStyle("left", `
 left: calc(${arrowSize} / -2);
 transform: translateY(calc(${arrowSize} / -2)) rotate(45deg);
 top: 50%;
 `), placementStyle("left-end", `
 left: calc(${arrowSize} / -2);
 bottom: calc(${getArrowOffset("left-end")} + var(--v-offset-top));
 `), placementStyle("right-start", `
 right: calc(${arrowSize} / -2);
 top: calc(${getArrowOffset("right-start")} - var(--v-offset-top));
 `), placementStyle("right", `
 right: calc(${arrowSize} / -2);
 transform: translateY(calc(${arrowSize} / -2)) rotate(45deg);
 top: 50%;
 `), placementStyle("right-end", `
 right: calc(${arrowSize} / -2);
 bottom: calc(${getArrowOffset("right-end")} + var(--v-offset-top));
 `), ...map({
  top: ["right-start", "left-start"],
  right: ["top-end", "bottom-end"],
  bottom: ["right-end", "left-end"],
  left: ["top-start", "bottom-start"]
}, (placements, direction) => {
  const isVertical = ["right", "left"].includes(direction);
  const sizeType = isVertical ? "width" : "height";
  return placements.map((placement) => {
    const isReverse = placement.split("-")[1] === "end";
    const targetSize = `var(--v-target-${sizeType}, 0px)`;
    const centerOffset = `calc((${targetSize} - ${arrowSize}) / 2)`;
    const offset = getArrowOffset(placement);
    return c$1(`[v-placement="${placement}"] >`, [cB("popover-shared", [cM("center-arrow", [cB("popover-arrow", `${direction}: calc(max(${centerOffset}, ${offset}) ${isReverse ? "+" : "-"} var(--v-offset-${isVertical ? "left" : "top"}));`)])])]);
  });
})]);
function getArrowOffset(placement) {
  return ["top", "bottom"].includes(placement.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function placementStyle(placement, arrowStyleLiteral) {
  const position = placement.split("-")[0];
  const sizeStyle = ["top", "bottom"].includes(position) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return c$1(`[v-placement="${placement}"] >`, [cB("popover-shared", `
 margin-${oppositePlacement[position]}: var(--n-space);
 `, [cM("show-arrow", `
 margin-${oppositePlacement[position]}: var(--n-space-arrow);
 `), cM("overlap", `
 margin: 0;
 `), cCB("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${position}: 100%;
 ${oppositePlacement[position]}: auto;
 ${sizeStyle}
 `, [cB("popover-arrow", arrowStyleLiteral)])])]);
}
const popoverBodyProps = Object.assign(Object.assign({}, useTheme.props), {
  to: useAdjustedTo.propTo,
  show: Boolean,
  trigger: String,
  showArrow: Boolean,
  delay: Number,
  duration: Number,
  raw: Boolean,
  arrowPointToCenter: Boolean,
  arrowStyle: [String, Object],
  displayDirective: String,
  x: Number,
  y: Number,
  flip: Boolean,
  overlap: Boolean,
  placement: String,
  width: [Number, String],
  keepAliveOnHover: Boolean,
  scrollable: Boolean,
  contentStyle: [Object, String],
  headerStyle: [Object, String],
  footerStyle: [Object, String],
  // private
  internalDeactivateImmediately: Boolean,
  animated: Boolean,
  onClickoutside: Function,
  internalTrapFocus: Boolean,
  internalOnAfterLeave: Function,
  // deprecated
  minWidth: Number,
  maxWidth: Number
});
const renderArrow = ({ arrowStyle, clsPrefix }) => {
  return h(
    "div",
    { key: "__popover-arrow__", class: `${clsPrefix}-popover-arrow-wrapper` },
    h("div", { class: `${clsPrefix}-popover-arrow`, style: arrowStyle })
  );
};
const NPopoverBody = /* @__PURE__ */ defineComponent({
  name: "PopoverBody",
  inheritAttrs: false,
  props: popoverBodyProps,
  setup(props, { slots, attrs }) {
    const { namespaceRef, mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const themeRef = useTheme("Popover", "-popover", style$e, popoverLight$1, props, mergedClsPrefixRef);
    const followerRef = ref(null);
    const NPopover2 = inject("NPopover");
    const bodyRef = ref(null);
    const followerEnabledRef = ref(props.show);
    const displayedRef = ref(false);
    watchEffect(() => {
      const { show } = props;
      if (show && !isJsdom() && !props.internalDeactivateImmediately) {
        displayedRef.value = true;
      }
    });
    const directivesRef = computed(() => {
      const { trigger: trigger2, onClickoutside } = props;
      const directives = [];
      const { positionManuallyRef: { value: positionManually } } = NPopover2;
      if (!positionManually) {
        if (trigger2 === "click" && !onClickoutside) {
          directives.push([
            clickoutside$1,
            handleClickOutside,
            void 0,
            { capture: true }
          ]);
        }
        if (trigger2 === "hover") {
          directives.push([mousemoveoutside$1, handleMouseMoveOutside]);
        }
      }
      if (onClickoutside) {
        directives.push([
          clickoutside$1,
          handleClickOutside,
          void 0,
          { capture: true }
        ]);
      }
      if (props.displayDirective === "show" || props.animated && displayedRef.value) {
        directives.push([vShow, props.show]);
      }
      return directives;
    });
    const styleRef = computed(() => {
      const width = props.width === "trigger" ? void 0 : formatLength(props.width);
      const style2 = [];
      if (width) {
        style2.push({ width });
      }
      const { maxWidth, minWidth } = props;
      if (maxWidth) {
        style2.push({ maxWidth: formatLength(maxWidth) });
      }
      if (minWidth) {
        style2.push({ maxWidth: formatLength(minWidth) });
      }
      if (!inlineThemeDisabled) {
        style2.push(cssVarsRef.value);
      }
      return style2;
    });
    const cssVarsRef = computed(() => {
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2, cubicBezierEaseIn: cubicBezierEaseIn2, cubicBezierEaseOut: cubicBezierEaseOut2 }, self: { space, spaceArrow, padding, fontSize: fontSize2, textColor, dividerColor, color, boxShadow, borderRadius, arrowHeight, arrowOffset, arrowOffsetVertical } } = themeRef.value;
      return {
        "--n-box-shadow": boxShadow,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-bezier-ease-in": cubicBezierEaseIn2,
        "--n-bezier-ease-out": cubicBezierEaseOut2,
        "--n-font-size": fontSize2,
        "--n-text-color": textColor,
        "--n-color": color,
        "--n-divider-color": dividerColor,
        "--n-border-radius": borderRadius,
        "--n-arrow-height": arrowHeight,
        "--n-arrow-offset": arrowOffset,
        "--n-arrow-offset-vertical": arrowOffsetVertical,
        "--n-padding": padding,
        "--n-space": space,
        "--n-space-arrow": spaceArrow
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("popover", void 0, cssVarsRef, props) : void 0;
    NPopover2.setBodyInstance({
      syncPosition
    });
    onBeforeUnmount(() => {
      NPopover2.setBodyInstance(null);
    });
    watch(toRef(props, "show"), (value) => {
      if (props.animated)
        return;
      if (value) {
        followerEnabledRef.value = true;
      } else {
        followerEnabledRef.value = false;
      }
    });
    function syncPosition() {
      var _a;
      (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
    }
    function handleMouseEnter(e) {
      if (props.trigger === "hover" && props.keepAliveOnHover && props.show) {
        NPopover2.handleMouseEnter(e);
      }
    }
    function handleMouseLeave(e) {
      if (props.trigger === "hover" && props.keepAliveOnHover) {
        NPopover2.handleMouseLeave(e);
      }
    }
    function handleMouseMoveOutside(e) {
      if (props.trigger === "hover" && !getTriggerElement().contains(getPreciseEventTarget(e))) {
        NPopover2.handleMouseMoveOutside(e);
      }
    }
    function handleClickOutside(e) {
      if (props.trigger === "click" && !getTriggerElement().contains(getPreciseEventTarget(e)) || props.onClickoutside) {
        NPopover2.handleClickOutside(e);
      }
    }
    function getTriggerElement() {
      return NPopover2.getTriggerElement();
    }
    provide(popoverBodyInjectionKey, bodyRef);
    provide(drawerBodyInjectionKey, null);
    provide(modalBodyInjectionKey, null);
    function renderContentNode() {
      themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender();
      const shouldRenderDom = props.displayDirective === "show" || props.show || props.animated && displayedRef.value;
      if (!shouldRenderDom) {
        return null;
      }
      let contentNode;
      const renderBody = NPopover2.internalRenderBodyRef.value;
      const { value: mergedClsPrefix } = mergedClsPrefixRef;
      if (!renderBody) {
        const { value: extraClass } = NPopover2.extraClassRef;
        const { internalTrapFocus } = props;
        const hasHeaderOrFooter = !isSlotEmpty(slots.header) || !isSlotEmpty(slots.footer);
        const renderContentInnerNode = () => {
          var _a;
          const body = hasHeaderOrFooter ? h(
            Fragment,
            null,
            resolveWrappedSlot(slots.header, (children) => {
              return children ? h("div", { class: `${mergedClsPrefix}-popover__header`, style: props.headerStyle }, children) : null;
            }),
            resolveWrappedSlot(slots.default, (children) => {
              return children ? h("div", { class: `${mergedClsPrefix}-popover__content`, style: props.contentStyle }, slots) : null;
            }),
            resolveWrappedSlot(slots.footer, (children) => {
              return children ? h("div", { class: `${mergedClsPrefix}-popover__footer`, style: props.footerStyle }, children) : null;
            })
          ) : props.scrollable ? (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots) : h("div", { class: `${mergedClsPrefix}-popover__content`, style: props.contentStyle }, slots);
          const maybeScrollableBody = props.scrollable ? h(XScrollbar, { contentClass: hasHeaderOrFooter ? void 0 : `${mergedClsPrefix}-popover__content`, contentStyle: hasHeaderOrFooter ? void 0 : props.contentStyle }, {
            default: () => body
          }) : body;
          const arrow = props.showArrow ? renderArrow({
            arrowStyle: props.arrowStyle,
            clsPrefix: mergedClsPrefix
          }) : null;
          return [maybeScrollableBody, arrow];
        };
        contentNode = h("div", mergeProps({
          class: [
            `${mergedClsPrefix}-popover`,
            `${mergedClsPrefix}-popover-shared`,
            themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value,
            extraClass.map((v) => `${mergedClsPrefix}-${v}`),
            {
              [`${mergedClsPrefix}-popover--scrollable`]: props.scrollable,
              [`${mergedClsPrefix}-popover--show-header-or-footer`]: hasHeaderOrFooter,
              [`${mergedClsPrefix}-popover--raw`]: props.raw,
              [`${mergedClsPrefix}-popover-shared--overlap`]: props.overlap,
              [`${mergedClsPrefix}-popover-shared--show-arrow`]: props.showArrow,
              [`${mergedClsPrefix}-popover-shared--center-arrow`]: props.arrowPointToCenter
            }
          ],
          ref: bodyRef,
          style: styleRef.value,
          onKeydown: NPopover2.handleKeydown,
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave
        }, attrs), internalTrapFocus ? h(FocusTrap, { active: props.show, autoFocus: true }, { default: renderContentInnerNode }) : renderContentInnerNode());
      } else {
        contentNode = renderBody(
          // The popover class and overlap class must exists, they will be used
          // to place the body & transition animation.
          // Shadow class exists for reuse box-shadow.
          [
            `${mergedClsPrefix}-popover-shared`,
            themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value,
            props.overlap && `${mergedClsPrefix}-popover-shared--overlap`,
            props.showArrow && `${mergedClsPrefix}-popover-shared--show-arrow`,
            props.arrowPointToCenter && `${mergedClsPrefix}-popover-shared--center-arrow`
          ],
          bodyRef,
          styleRef.value,
          handleMouseEnter,
          handleMouseLeave
        );
      }
      return withDirectives(contentNode, directivesRef.value);
    }
    return {
      displayed: displayedRef,
      namespace: namespaceRef,
      isMounted: NPopover2.isMountedRef,
      zIndex: NPopover2.zIndexRef,
      followerRef,
      adjustedTo: useAdjustedTo(props),
      followerEnabled: followerEnabledRef,
      renderContentNode
    };
  },
  render() {
    return h(VFollower, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey }, {
      default: () => {
        return this.animated ? h(Transition, {
          name: "popover-transition",
          appear: this.isMounted,
          // Don't use watch to enable follower, since the transition may
          // make position sync timing very subtle and buggy.
          onEnter: () => {
            this.followerEnabled = true;
          },
          onAfterLeave: () => {
            var _a;
            (_a = this.internalOnAfterLeave) === null || _a === void 0 ? void 0 : _a.call(this);
            this.followerEnabled = false;
            this.displayed = false;
          }
        }, {
          default: this.renderContentNode
        }) : this.renderContentNode();
      }
    });
  }
});
const bodyPropKeys = Object.keys(popoverBodyProps);
const triggerEventMap = {
  focus: ["onFocus", "onBlur"],
  click: ["onClick"],
  hover: ["onMouseenter", "onMouseleave"],
  manual: [],
  nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
};
function appendEvents(vNode, trigger2, events2) {
  triggerEventMap[trigger2].forEach((eventName) => {
    if (!vNode.props)
      vNode.props = {};
    else {
      vNode.props = Object.assign({}, vNode.props);
    }
    const originalHandler = vNode.props[eventName];
    const handler = events2[eventName];
    if (!originalHandler)
      vNode.props[eventName] = handler;
    else {
      vNode.props[eventName] = (...args) => {
        originalHandler(...args);
        handler(...args);
      };
    }
  });
}
const popoverBaseProps = {
  show: {
    type: Boolean,
    default: void 0
  },
  defaultShow: Boolean,
  showArrow: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String,
    default: "hover"
  },
  delay: {
    type: Number,
    default: 100
  },
  duration: {
    type: Number,
    default: 100
  },
  raw: Boolean,
  placement: {
    type: String,
    default: "top"
  },
  x: Number,
  y: Number,
  arrowPointToCenter: Boolean,
  disabled: Boolean,
  getDisabled: Function,
  displayDirective: {
    type: String,
    default: "if"
  },
  arrowStyle: [String, Object],
  flip: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: true
  },
  width: {
    type: [Number, String],
    default: void 0
  },
  overlap: Boolean,
  keepAliveOnHover: {
    type: Boolean,
    default: true
  },
  zIndex: Number,
  to: useAdjustedTo.propTo,
  scrollable: Boolean,
  contentStyle: [Object, String],
  headerStyle: [Object, String],
  footerStyle: [Object, String],
  // events
  onClickoutside: Function,
  "onUpdate:show": [Function, Array],
  onUpdateShow: [Function, Array],
  // internal
  internalDeactivateImmediately: Boolean,
  internalSyncTargetWithParent: Boolean,
  internalInheritedEventHandlers: {
    type: Array,
    default: () => []
  },
  internalTrapFocus: Boolean,
  internalExtraClass: {
    type: Array,
    default: () => []
  },
  // deprecated
  onShow: [Function, Array],
  onHide: [Function, Array],
  arrow: {
    type: Boolean,
    default: void 0
  },
  minWidth: Number,
  maxWidth: Number
};
const popoverProps = Object.assign(Object.assign(Object.assign({}, useTheme.props), popoverBaseProps), { internalOnAfterLeave: Function, internalRenderBody: Function });
const NPopover = /* @__PURE__ */ defineComponent({
  name: "Popover",
  inheritAttrs: false,
  props: popoverProps,
  __popover__: true,
  setup(props) {
    const isMountedRef = isMounted();
    const binderInstRef = ref(null);
    const controlledShowRef = computed(() => props.show);
    const uncontrolledShowRef = ref(props.defaultShow);
    const mergedShowWithoutDisabledRef = useMergedState(controlledShowRef, uncontrolledShowRef);
    const mergedShowConsideringDisabledPropRef = useMemo(() => {
      if (props.disabled)
        return false;
      return mergedShowWithoutDisabledRef.value;
    });
    const getMergedDisabled = () => {
      if (props.disabled)
        return true;
      const { getDisabled } = props;
      if (getDisabled === null || getDisabled === void 0 ? void 0 : getDisabled())
        return true;
      return false;
    };
    const getMergedShow = () => {
      if (getMergedDisabled())
        return false;
      return mergedShowWithoutDisabledRef.value;
    };
    const compatibleShowArrowRef = useCompitable(props, ["arrow", "showArrow"]);
    const mergedShowArrowRef = computed(() => {
      if (props.overlap)
        return false;
      return compatibleShowArrowRef.value;
    });
    let bodyInstance = null;
    const showTimerIdRef = ref(null);
    const hideTimerIdRef = ref(null);
    const positionManuallyRef = useMemo(() => {
      return props.x !== void 0 && props.y !== void 0;
    });
    function doUpdateShow(value) {
      const { "onUpdate:show": _onUpdateShow, onUpdateShow, onShow, onHide } = props;
      uncontrolledShowRef.value = value;
      if (_onUpdateShow) {
        call(_onUpdateShow, value);
      }
      if (onUpdateShow) {
        call(onUpdateShow, value);
      }
      if (value && onShow) {
        call(onShow, true);
      }
      if (value && onHide) {
        call(onHide, false);
      }
    }
    function syncPosition() {
      if (bodyInstance) {
        bodyInstance.syncPosition();
      }
    }
    function clearShowTimer() {
      const { value: showTimerId } = showTimerIdRef;
      if (showTimerId) {
        window.clearTimeout(showTimerId);
        showTimerIdRef.value = null;
      }
    }
    function clearHideTimer() {
      const { value: hideTimerId } = hideTimerIdRef;
      if (hideTimerId) {
        window.clearTimeout(hideTimerId);
        hideTimerIdRef.value = null;
      }
    }
    function handleFocus() {
      const mergedDisabled = getMergedDisabled();
      if (props.trigger === "focus" && !mergedDisabled) {
        if (getMergedShow())
          return;
        doUpdateShow(true);
      }
    }
    function handleBlur() {
      const mergedDisabled = getMergedDisabled();
      if (props.trigger === "focus" && !mergedDisabled) {
        if (!getMergedShow())
          return;
        doUpdateShow(false);
      }
    }
    function handleMouseEnter() {
      const mergedDisabled = getMergedDisabled();
      if (props.trigger === "hover" && !mergedDisabled) {
        clearHideTimer();
        if (showTimerIdRef.value !== null)
          return;
        if (getMergedShow())
          return;
        const delayCallback = () => {
          doUpdateShow(true);
          showTimerIdRef.value = null;
        };
        const { delay } = props;
        if (delay === 0) {
          delayCallback();
        } else {
          showTimerIdRef.value = window.setTimeout(delayCallback, delay);
        }
      }
    }
    function handleMouseLeave() {
      const mergedDisabled = getMergedDisabled();
      if (props.trigger === "hover" && !mergedDisabled) {
        clearShowTimer();
        if (hideTimerIdRef.value !== null)
          return;
        if (!getMergedShow())
          return;
        const delayedCallback = () => {
          doUpdateShow(false);
          hideTimerIdRef.value = null;
        };
        const { duration } = props;
        if (duration === 0) {
          delayedCallback();
        } else {
          hideTimerIdRef.value = window.setTimeout(delayedCallback, duration);
        }
      }
    }
    function handleMouseMoveOutside() {
      handleMouseLeave();
    }
    function handleClickOutside(e) {
      var _a;
      if (!getMergedShow())
        return;
      if (props.trigger === "click") {
        clearShowTimer();
        clearHideTimer();
        doUpdateShow(false);
      }
      (_a = props.onClickoutside) === null || _a === void 0 ? void 0 : _a.call(props, e);
    }
    function handleClick() {
      if (props.trigger === "click" && !getMergedDisabled()) {
        clearShowTimer();
        clearHideTimer();
        const nextShow = !getMergedShow();
        doUpdateShow(nextShow);
      }
    }
    function handleKeydown(e) {
      if (!props.internalTrapFocus)
        return;
      if (e.key === "Escape") {
        clearShowTimer();
        clearHideTimer();
        doUpdateShow(false);
      }
    }
    function setShow(value) {
      uncontrolledShowRef.value = value;
    }
    function getTriggerElement() {
      var _a;
      return (_a = binderInstRef.value) === null || _a === void 0 ? void 0 : _a.targetRef;
    }
    function setBodyInstance(value) {
      bodyInstance = value;
    }
    provide("NPopover", {
      getTriggerElement,
      handleKeydown,
      handleMouseEnter,
      handleMouseLeave,
      handleClickOutside,
      handleMouseMoveOutside,
      setBodyInstance,
      positionManuallyRef,
      isMountedRef,
      zIndexRef: toRef(props, "zIndex"),
      extraClassRef: toRef(props, "internalExtraClass"),
      internalRenderBodyRef: toRef(props, "internalRenderBody")
    });
    watchEffect(() => {
      if (mergedShowWithoutDisabledRef.value && getMergedDisabled()) {
        doUpdateShow(false);
      }
    });
    return {
      binderInstRef,
      positionManually: positionManuallyRef,
      mergedShowConsideringDisabledProp: mergedShowConsideringDisabledPropRef,
      // if to show popover body
      uncontrolledShow: uncontrolledShowRef,
      mergedShowArrow: mergedShowArrowRef,
      getMergedShow,
      setShow,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      handleFocus,
      handleBlur,
      syncPosition
    };
  },
  render() {
    var _a;
    const { positionManually, $slots: slots } = this;
    let triggerVNode;
    let popoverInside = false;
    if (!positionManually) {
      if (slots.activator) {
        triggerVNode = getFirstSlotVNode(slots, "activator");
      } else {
        triggerVNode = getFirstSlotVNode(slots, "trigger");
      }
      if (triggerVNode) {
        triggerVNode = cloneVNode(triggerVNode);
        triggerVNode = triggerVNode.type === Text ? h("span", [triggerVNode]) : triggerVNode;
        const handlers = {
          onClick: this.handleClick,
          onMouseenter: this.handleMouseEnter,
          onMouseleave: this.handleMouseLeave,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        };
        if ((_a = triggerVNode.type) === null || _a === void 0 ? void 0 : _a.__popover__) {
          popoverInside = true;
          if (!triggerVNode.props) {
            triggerVNode.props = {
              internalSyncTargetWithParent: true,
              internalInheritedEventHandlers: []
            };
          }
          triggerVNode.props.internalSyncTargetWithParent = true;
          if (!triggerVNode.props.internalInheritedEventHandlers) {
            triggerVNode.props.internalInheritedEventHandlers = [handlers];
          } else {
            triggerVNode.props.internalInheritedEventHandlers = [
              handlers,
              ...triggerVNode.props.internalInheritedEventHandlers
            ];
          }
        } else {
          const { internalInheritedEventHandlers } = this;
          const ascendantAndCurrentHandlers = [
            handlers,
            ...internalInheritedEventHandlers
          ];
          const mergedHandlers = {
            onBlur: (e) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onBlur(e);
              });
            },
            onFocus: (e) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onFocus(e);
              });
            },
            onClick: (e) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onClick(e);
              });
            },
            onMouseenter: (e) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onMouseenter(e);
              });
            },
            onMouseleave: (e) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onMouseleave(e);
              });
            }
          };
          appendEvents(triggerVNode, internalInheritedEventHandlers ? "nested" : positionManually ? "manual" : this.trigger, mergedHandlers);
        }
      }
    }
    return h(VBinder, { ref: "binderInstRef", syncTarget: !popoverInside, syncTargetWithParent: this.internalSyncTargetWithParent }, {
      default: () => {
        void this.mergedShowConsideringDisabledProp;
        const mergedShow = this.getMergedShow();
        return [
          this.internalTrapFocus && mergedShow ? withDirectives(h("div", { style: { position: "fixed", inset: 0 } }), [
            [
              zindexable$1,
              {
                enabled: mergedShow,
                zIndex: this.zIndex
              }
            ]
          ]) : null,
          positionManually ? null : h(VTarget, null, {
            default: () => triggerVNode
          }),
          h(NPopoverBody, keep(this.$props, bodyPropKeys, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: mergedShow })), {
            default: () => {
              var _a2, _b;
              return (_b = (_a2 = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a2);
            },
            header: () => {
              var _a2, _b;
              return (_b = (_a2 = this.$slots).header) === null || _b === void 0 ? void 0 : _b.call(_a2);
            },
            footer: () => {
              var _a2, _b;
              return (_b = (_a2 = this.$slots).footer) === null || _b === void 0 ? void 0 : _b.call(_a2);
            }
          })
        ];
      }
    });
  }
});
const commonVariables$6 = {
  closeIconSizeTiny: "12px",
  closeIconSizeSmall: "12px",
  closeIconSizeMedium: "14px",
  closeIconSizeLarge: "14px",
  closeSizeTiny: "16px",
  closeSizeSmall: "16px",
  closeSizeMedium: "18px",
  closeSizeLarge: "18px",
  padding: "0 7px",
  closeMargin: "0 0 0 4px",
  closeMarginRtl: "0 4px 0 0"
};
const self$d = (vars) => {
  const { textColor2, primaryColorHover, primaryColorPressed, primaryColor, infoColor, successColor, warningColor, errorColor, baseColor, borderColor, opacityDisabled, tagColor, closeIconColor, closeIconColorHover, closeIconColorPressed, borderRadiusSmall: borderRadius, fontSizeMini, fontSizeTiny, fontSizeSmall, fontSizeMedium, heightMini, heightTiny, heightSmall, heightMedium, closeColorHover, closeColorPressed, buttonColor2Hover, buttonColor2Pressed, fontWeightStrong } = vars;
  return Object.assign(Object.assign({}, commonVariables$6), {
    closeBorderRadius: borderRadius,
    heightTiny: heightMini,
    heightSmall: heightTiny,
    heightMedium: heightSmall,
    heightLarge: heightMedium,
    borderRadius,
    opacityDisabled,
    fontSizeTiny: fontSizeMini,
    fontSizeSmall: fontSizeTiny,
    fontSizeMedium: fontSizeSmall,
    fontSizeLarge: fontSizeMedium,
    fontWeightStrong,
    // checked
    textColorCheckable: textColor2,
    textColorHoverCheckable: textColor2,
    textColorPressedCheckable: textColor2,
    textColorChecked: baseColor,
    colorCheckable: "#0000",
    colorHoverCheckable: buttonColor2Hover,
    colorPressedCheckable: buttonColor2Pressed,
    colorChecked: primaryColor,
    colorCheckedHover: primaryColorHover,
    colorCheckedPressed: primaryColorPressed,
    // default
    border: `1px solid ${borderColor}`,
    textColor: textColor2,
    color: tagColor,
    colorBordered: "rgb(250, 250, 252)",
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    borderPrimary: `1px solid ${changeColor(primaryColor, { alpha: 0.3 })}`,
    textColorPrimary: primaryColor,
    colorPrimary: changeColor(primaryColor, { alpha: 0.12 }),
    colorBorderedPrimary: changeColor(primaryColor, { alpha: 0.1 }),
    closeIconColorPrimary: primaryColor,
    closeIconColorHoverPrimary: primaryColor,
    closeIconColorPressedPrimary: primaryColor,
    closeColorHoverPrimary: changeColor(primaryColor, { alpha: 0.12 }),
    closeColorPressedPrimary: changeColor(primaryColor, { alpha: 0.18 }),
    borderInfo: `1px solid ${changeColor(infoColor, { alpha: 0.3 })}`,
    textColorInfo: infoColor,
    colorInfo: changeColor(infoColor, { alpha: 0.12 }),
    colorBorderedInfo: changeColor(infoColor, { alpha: 0.1 }),
    closeIconColorInfo: infoColor,
    closeIconColorHoverInfo: infoColor,
    closeIconColorPressedInfo: infoColor,
    closeColorHoverInfo: changeColor(infoColor, { alpha: 0.12 }),
    closeColorPressedInfo: changeColor(infoColor, { alpha: 0.18 }),
    borderSuccess: `1px solid ${changeColor(successColor, { alpha: 0.3 })}`,
    textColorSuccess: successColor,
    colorSuccess: changeColor(successColor, { alpha: 0.12 }),
    colorBorderedSuccess: changeColor(successColor, { alpha: 0.1 }),
    closeIconColorSuccess: successColor,
    closeIconColorHoverSuccess: successColor,
    closeIconColorPressedSuccess: successColor,
    closeColorHoverSuccess: changeColor(successColor, { alpha: 0.12 }),
    closeColorPressedSuccess: changeColor(successColor, { alpha: 0.18 }),
    borderWarning: `1px solid ${changeColor(warningColor, { alpha: 0.35 })}`,
    textColorWarning: warningColor,
    colorWarning: changeColor(warningColor, { alpha: 0.15 }),
    colorBorderedWarning: changeColor(warningColor, { alpha: 0.12 }),
    closeIconColorWarning: warningColor,
    closeIconColorHoverWarning: warningColor,
    closeIconColorPressedWarning: warningColor,
    closeColorHoverWarning: changeColor(warningColor, { alpha: 0.12 }),
    closeColorPressedWarning: changeColor(warningColor, { alpha: 0.18 }),
    borderError: `1px solid ${changeColor(errorColor, { alpha: 0.23 })}`,
    textColorError: errorColor,
    colorError: changeColor(errorColor, { alpha: 0.1 }),
    colorBorderedError: changeColor(errorColor, { alpha: 0.08 }),
    closeIconColorError: errorColor,
    closeIconColorHoverError: errorColor,
    closeIconColorPressedError: errorColor,
    closeColorHoverError: changeColor(errorColor, { alpha: 0.12 }),
    closeColorPressedError: changeColor(errorColor, { alpha: 0.18 })
  });
};
const tagLight = {
  name: "Tag",
  common: commonLight,
  self: self$d
};
const tagLight$1 = tagLight;
const commonProps = {
  color: Object,
  type: {
    type: String,
    default: "default"
  },
  round: Boolean,
  size: {
    type: String,
    default: "medium"
  },
  closable: Boolean,
  disabled: {
    type: Boolean,
    default: void 0
  }
};
const style$d = cB("tag", `
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`, [cM("strong", `
 font-weight: var(--n-font-weight-strong);
 `), cE("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), cE("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), cE("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), cE("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), cM("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [cE("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), cE("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), cM("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), cM("icon, avatar", [cM("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), cM("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), cM("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [cNotM("disabled", [c$1("&:hover", "background-color: var(--n-color-hover-checkable);", [cNotM("checked", "color: var(--n-text-color-hover-checkable);")]), c$1("&:active", "background-color: var(--n-color-pressed-checkable);", [cNotM("checked", "color: var(--n-text-color-pressed-checkable);")])]), cM("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [cNotM("disabled", [c$1("&:hover", "background-color: var(--n-color-checked-hover);"), c$1("&:active", "background-color: var(--n-color-checked-pressed);")])])])]);
const tagProps = Object.assign(Object.assign(Object.assign({}, useTheme.props), commonProps), {
  bordered: {
    type: Boolean,
    default: void 0
  },
  checked: Boolean,
  checkable: Boolean,
  strong: Boolean,
  triggerClickOnClose: Boolean,
  onClose: [Array, Function],
  onMouseenter: Function,
  onMouseleave: Function,
  "onUpdate:checked": Function,
  onUpdateChecked: Function,
  // private
  internalCloseFocusable: {
    type: Boolean,
    default: true
  },
  internalCloseIsButtonTag: {
    type: Boolean,
    default: true
  },
  // deprecated
  onCheckedChange: Function
});
const tagInjectionKey = createInjectionKey("n-tag");
const NTag = /* @__PURE__ */ defineComponent({
  name: "Tag",
  props: tagProps,
  setup(props) {
    const contentRef = ref(null);
    const { mergedBorderedRef, mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = useConfig(props);
    const themeRef = useTheme("Tag", "-tag", style$d, tagLight$1, props, mergedClsPrefixRef);
    provide(tagInjectionKey, {
      roundRef: toRef(props, "round")
    });
    function handleClick(e) {
      if (!props.disabled) {
        if (props.checkable) {
          const { checked, onCheckedChange, onUpdateChecked, "onUpdate:checked": _onUpdateChecked } = props;
          if (onUpdateChecked)
            onUpdateChecked(!checked);
          if (_onUpdateChecked)
            _onUpdateChecked(!checked);
          if (onCheckedChange)
            onCheckedChange(!checked);
        }
      }
    }
    function handleCloseClick(e) {
      if (!props.triggerClickOnClose) {
        e.stopPropagation();
      }
      if (!props.disabled) {
        const { onClose } = props;
        if (onClose)
          call(onClose, e);
      }
    }
    const tagPublicMethods = {
      setTextContent(textContent) {
        const { value } = contentRef;
        if (value)
          value.textContent = textContent;
      }
    };
    const rtlEnabledRef = useRtl("Tag", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { type, size: size2, color: { color, textColor } = {} } = props;
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: { padding, closeMargin, closeMarginRtl, borderRadius, opacityDisabled, textColorCheckable, textColorHoverCheckable, textColorPressedCheckable, textColorChecked, colorCheckable, colorHoverCheckable, colorPressedCheckable, colorChecked, colorCheckedHover, colorCheckedPressed, closeBorderRadius, fontWeightStrong, [createKey("colorBordered", type)]: colorBordered, [createKey("closeSize", size2)]: closeSize, [createKey("closeIconSize", size2)]: closeIconSize, [createKey("fontSize", size2)]: fontSize2, [createKey("height", size2)]: height, [createKey("color", type)]: typedColor, [createKey("textColor", type)]: typeTextColor, [createKey("border", type)]: border, [createKey("closeIconColor", type)]: closeIconColor, [createKey("closeIconColorHover", type)]: closeIconColorHover, [createKey("closeIconColorPressed", type)]: closeIconColorPressed, [createKey("closeColorHover", type)]: closeColorHover, [createKey("closeColorPressed", type)]: closeColorPressed } } = themeRef.value;
      return {
        "--n-font-weight-strong": fontWeightStrong,
        "--n-avatar-size-override": `calc(${height} - 8px)`,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-border-radius": borderRadius,
        "--n-border": border,
        "--n-close-icon-size": closeIconSize,
        "--n-close-color-pressed": closeColorPressed,
        "--n-close-color-hover": closeColorHover,
        "--n-close-border-radius": closeBorderRadius,
        "--n-close-icon-color": closeIconColor,
        "--n-close-icon-color-hover": closeIconColorHover,
        "--n-close-icon-color-pressed": closeIconColorPressed,
        "--n-close-icon-color-disabled": closeIconColor,
        "--n-close-margin": closeMargin,
        "--n-close-margin-rtl": closeMarginRtl,
        "--n-close-size": closeSize,
        "--n-color": color || (mergedBorderedRef.value ? colorBordered : typedColor),
        "--n-color-checkable": colorCheckable,
        "--n-color-checked": colorChecked,
        "--n-color-checked-hover": colorCheckedHover,
        "--n-color-checked-pressed": colorCheckedPressed,
        "--n-color-hover-checkable": colorHoverCheckable,
        "--n-color-pressed-checkable": colorPressedCheckable,
        "--n-font-size": fontSize2,
        "--n-height": height,
        "--n-opacity-disabled": opacityDisabled,
        "--n-padding": padding,
        "--n-text-color": textColor || typeTextColor,
        "--n-text-color-checkable": textColorCheckable,
        "--n-text-color-checked": textColorChecked,
        "--n-text-color-hover-checkable": textColorHoverCheckable,
        "--n-text-color-pressed-checkable": textColorPressedCheckable
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("tag", computed(() => {
      let hash = "";
      const { type, size: size2, color: { color, textColor } = {} } = props;
      hash += type[0];
      hash += size2[0];
      if (color) {
        hash += `a${color2Class(color)}`;
      }
      if (textColor) {
        hash += `b${color2Class(textColor)}`;
      }
      if (mergedBorderedRef.value) {
        hash += "c";
      }
      return hash;
    }), cssVarsRef, props) : void 0;
    return Object.assign(Object.assign({}, tagPublicMethods), {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      contentRef,
      mergedBordered: mergedBorderedRef,
      handleClick,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a, _b;
    const { mergedClsPrefix, rtlEnabled, closable, color: { borderColor } = {}, round, onRender, $slots } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const avatarNode = resolveWrappedSlot($slots.avatar, (children) => children && h("div", { class: `${mergedClsPrefix}-tag__avatar` }, children));
    const iconNode = resolveWrappedSlot($slots.icon, (children) => children && h("div", { class: `${mergedClsPrefix}-tag__icon` }, children));
    return h(
      "div",
      { class: [
        `${mergedClsPrefix}-tag`,
        this.themeClass,
        {
          [`${mergedClsPrefix}-tag--rtl`]: rtlEnabled,
          [`${mergedClsPrefix}-tag--strong`]: this.strong,
          [`${mergedClsPrefix}-tag--disabled`]: this.disabled,
          [`${mergedClsPrefix}-tag--checkable`]: this.checkable,
          [`${mergedClsPrefix}-tag--checked`]: this.checkable && this.checked,
          [`${mergedClsPrefix}-tag--round`]: round,
          [`${mergedClsPrefix}-tag--avatar`]: avatarNode,
          [`${mergedClsPrefix}-tag--icon`]: iconNode,
          [`${mergedClsPrefix}-tag--closable`]: closable
        }
      ], style: this.cssVars, onClick: this.handleClick, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave },
      iconNode || avatarNode,
      h("span", { class: `${mergedClsPrefix}-tag__content`, ref: "contentRef" }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)),
      !this.checkable && closable ? h(NBaseClose, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-tag__close`, disabled: this.disabled, onClick: this.handleCloseClick, focusable: this.internalCloseFocusable, round, isButtonTag: this.internalCloseIsButtonTag, absolute: true }) : null,
      !this.checkable && this.mergedBordered ? h("div", { class: `${mergedClsPrefix}-tag__border`, style: { borderColor } }) : null
    );
  }
});
const style$c = cB("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [c$1(">", [cE("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [c$1("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), c$1("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), cE("placeholder", `
 display: flex;
 `), cE("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [iconSwitchTransition({
  originalTransform: "translateX(-50%) translateY(-50%)",
  left: "50%",
  top: "50%"
})])])]);
const NBaseClear = /* @__PURE__ */ defineComponent({
  name: "BaseClear",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    show: Boolean,
    onClear: Function
  },
  setup(props) {
    useStyle("-base-clear", style$c, toRef(props, "clsPrefix"));
    return {
      handleMouseDown(e) {
        e.preventDefault();
      }
    };
  },
  render() {
    const { clsPrefix } = this;
    return h(
      "div",
      { class: `${clsPrefix}-base-clear` },
      h(NIconSwitchTransition, null, {
        default: () => {
          var _a, _b;
          return this.show ? h("div", { key: "dismiss", class: `${clsPrefix}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": true }, resolveSlot(this.$slots.icon, () => [
            h(NBaseIcon, { clsPrefix }, {
              default: () => h(ClearIcon, null)
            })
          ])) : h("div", { key: "icon", class: `${clsPrefix}-base-clear__placeholder` }, (_b = (_a = this.$slots).placeholder) === null || _b === void 0 ? void 0 : _b.call(_a));
        }
      })
    );
  }
});
const NBaseSuffix = /* @__PURE__ */ defineComponent({
  name: "InternalSelectionSuffix",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    showArrow: {
      type: Boolean,
      default: void 0
    },
    showClear: {
      type: Boolean,
      default: void 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    onClear: Function
  },
  setup(props, { slots }) {
    return () => {
      const { clsPrefix } = props;
      return h(NBaseLoading, { clsPrefix, class: `${clsPrefix}-base-suffix`, strokeWidth: 24, scale: 0.85, show: props.loading }, {
        default: () => props.showArrow ? h(NBaseClear, { clsPrefix, show: props.showClear, onClear: props.onClear }, {
          placeholder: () => h(NBaseIcon, { clsPrefix, class: `${clsPrefix}-base-suffix__arrow` }, {
            default: () => resolveSlot(slots.default, () => [
              h(ChevronDownIcon, null)
            ])
          })
        }) : null
      });
    };
  }
});
const commonVars$1 = {
  paddingSingle: "0 26px 0 12px",
  paddingMultiple: "3px 26px 0 12px",
  clearSize: "16px",
  arrowSize: "16px"
};
const self$c = (vars) => {
  const { borderRadius, textColor2, textColorDisabled, inputColor, inputColorDisabled, primaryColor, primaryColorHover, warningColor, warningColorHover, errorColor, errorColorHover, borderColor, iconColor, iconColorDisabled, clearColor, clearColorHover, clearColorPressed, placeholderColor, placeholderColorDisabled, fontSizeTiny, fontSizeSmall, fontSizeMedium, fontSizeLarge, heightTiny, heightSmall, heightMedium, heightLarge } = vars;
  return Object.assign(Object.assign({}, commonVars$1), {
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    borderRadius,
    // default
    textColor: textColor2,
    textColorDisabled,
    placeholderColor,
    placeholderColorDisabled,
    color: inputColor,
    colorDisabled: inputColorDisabled,
    colorActive: inputColor,
    border: `1px solid ${borderColor}`,
    borderHover: `1px solid ${primaryColorHover}`,
    borderActive: `1px solid ${primaryColor}`,
    borderFocus: `1px solid ${primaryColorHover}`,
    boxShadowHover: "none",
    boxShadowActive: `0 0 0 2px ${changeColor(primaryColor, {
      alpha: 0.2
    })}`,
    boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, {
      alpha: 0.2
    })}`,
    caretColor: primaryColor,
    arrowColor: iconColor,
    arrowColorDisabled: iconColorDisabled,
    loadingColor: primaryColor,
    // warning
    borderWarning: `1px solid ${warningColor}`,
    borderHoverWarning: `1px solid ${warningColorHover}`,
    borderActiveWarning: `1px solid ${warningColor}`,
    borderFocusWarning: `1px solid ${warningColorHover}`,
    boxShadowHoverWarning: "none",
    boxShadowActiveWarning: `0 0 0 2px ${changeColor(warningColor, {
      alpha: 0.2
    })}`,
    boxShadowFocusWarning: `0 0 0 2px ${changeColor(warningColor, {
      alpha: 0.2
    })}`,
    colorActiveWarning: inputColor,
    caretColorWarning: warningColor,
    // error
    borderError: `1px solid ${errorColor}`,
    borderHoverError: `1px solid ${errorColorHover}`,
    borderActiveError: `1px solid ${errorColor}`,
    borderFocusError: `1px solid ${errorColorHover}`,
    boxShadowHoverError: "none",
    boxShadowActiveError: `0 0 0 2px ${changeColor(errorColor, {
      alpha: 0.2
    })}`,
    boxShadowFocusError: `0 0 0 2px ${changeColor(errorColor, {
      alpha: 0.2
    })}`,
    colorActiveError: inputColor,
    caretColorError: errorColor,
    clearColor,
    clearColorHover,
    clearColorPressed
  });
};
const internalSelectionLight = createTheme({
  name: "InternalSelection",
  common: commonLight,
  peers: {
    Popover: popoverLight$1
  },
  self: self$c
});
const internalSelectionLight$1 = internalSelectionLight;
const style$b = c$1([cB("base-selection", `
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `, [cB("base-loading", `
 color: var(--n-loading-color);
 `), cB("base-selection-tags", "min-height: var(--n-height);"), cE("border, state-border", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `), cE("state-border", `
 z-index: 1;
 border-color: #0000;
 `), cB("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [cE("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), cB("base-selection-overlay", `
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `, [cE("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), cB("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [cE("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), cB("base-selection-tags", `
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), cB("base-selection-label", `
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `, [cB("base-selection-input", `
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `, [cE("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), cE("render-label", `
 color: var(--n-text-color);
 `)]), cNotM("disabled", [c$1("&:hover", [cE("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), cM("focus", [cE("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), cM("active", [cE("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), cB("base-selection-label", "background-color: var(--n-color-active);"), cB("base-selection-tags", "background-color: var(--n-color-active);")])]), cM("disabled", "cursor: not-allowed;", [cE("arrow", `
 color: var(--n-arrow-color-disabled);
 `), cB("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [cB("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), cE("render-label", `
 color: var(--n-text-color-disabled);
 `)]), cB("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), cB("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), cB("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [cE("input", `
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `), cE("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((status) => cM(`${status}-status`, [cE("state-border", `border: var(--n-border-${status});`), cNotM("disabled", [c$1("&:hover", [cE("state-border", `
 box-shadow: var(--n-box-shadow-hover-${status});
 border: var(--n-border-hover-${status});
 `)]), cM("active", [cE("state-border", `
 box-shadow: var(--n-box-shadow-active-${status});
 border: var(--n-border-active-${status});
 `), cB("base-selection-label", `background-color: var(--n-color-active-${status});`), cB("base-selection-tags", `background-color: var(--n-color-active-${status});`)]), cM("focus", [cE("state-border", `
 box-shadow: var(--n-box-shadow-focus-${status});
 border: var(--n-border-focus-${status});
 `)])])]))]), cB("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), cB("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [c$1("&:last-child", "padding-right: 0;"), cB("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [cE("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]);
const NInternalSelection = /* @__PURE__ */ defineComponent({
  name: "InternalSelection",
  props: Object.assign(Object.assign({}, useTheme.props), { clsPrefix: {
    type: String,
    required: true
  }, bordered: {
    type: Boolean,
    default: void 0
  }, active: Boolean, pattern: {
    type: String,
    default: ""
  }, placeholder: String, selectedOption: {
    type: Object,
    default: null
  }, selectedOptions: {
    type: Array,
    default: null
  }, labelField: { type: String, default: "label" }, valueField: {
    type: String,
    default: "value"
  }, multiple: Boolean, filterable: Boolean, clearable: Boolean, disabled: Boolean, size: {
    type: String,
    default: "medium"
  }, loading: Boolean, autofocus: Boolean, showArrow: {
    type: Boolean,
    default: true
  }, inputProps: Object, focused: Boolean, renderTag: Function, onKeydown: Function, onClick: Function, onBlur: Function, onFocus: Function, onDeleteOption: Function, maxTagCount: [String, Number], onClear: Function, onPatternInput: Function, onPatternFocus: Function, onPatternBlur: Function, renderLabel: Function, status: String, inlineThemeDisabled: Boolean, ignoreComposition: { type: Boolean, default: true }, onResize: Function }),
  setup(props) {
    const patternInputMirrorRef = ref(null);
    const patternInputRef = ref(null);
    const selfRef = ref(null);
    const multipleElRef = ref(null);
    const singleElRef = ref(null);
    const patternInputWrapperRef = ref(null);
    const counterRef = ref(null);
    const counterWrapperRef = ref(null);
    const overflowRef = ref(null);
    const inputTagElRef = ref(null);
    const showTagsPopoverRef = ref(false);
    const patternInputFocusedRef = ref(false);
    const hoverRef = ref(false);
    const themeRef = useTheme("InternalSelection", "-internal-selection", style$b, internalSelectionLight$1, props, toRef(props, "clsPrefix"));
    const mergedClearableRef = computed(() => {
      return props.clearable && !props.disabled && (hoverRef.value || props.active);
    });
    const filterablePlaceholderRef = computed(() => {
      return props.selectedOption ? props.renderTag ? props.renderTag({
        option: props.selectedOption,
        handleClose: () => {
        }
      }) : props.renderLabel ? props.renderLabel(props.selectedOption, true) : render$1(props.selectedOption[props.labelField], props.selectedOption, true) : props.placeholder;
    });
    const labelRef = computed(() => {
      const option = props.selectedOption;
      if (!option)
        return void 0;
      return option[props.labelField];
    });
    const selectedRef = computed(() => {
      if (props.multiple) {
        return !!(Array.isArray(props.selectedOptions) && props.selectedOptions.length);
      } else {
        return props.selectedOption !== null;
      }
    });
    function syncMirrorWidth() {
      var _a;
      const { value: patternInputMirrorEl } = patternInputMirrorRef;
      if (patternInputMirrorEl) {
        const { value: patternInputEl } = patternInputRef;
        if (patternInputEl) {
          patternInputEl.style.width = `${patternInputMirrorEl.offsetWidth}px`;
          if (props.maxTagCount !== "responsive") {
            (_a = overflowRef.value) === null || _a === void 0 ? void 0 : _a.sync();
          }
        }
      }
    }
    function hideInputTag() {
      const { value: inputTagEl } = inputTagElRef;
      if (inputTagEl)
        inputTagEl.style.display = "none";
    }
    function showInputTag() {
      const { value: inputTagEl } = inputTagElRef;
      if (inputTagEl)
        inputTagEl.style.display = "inline-block";
    }
    watch(toRef(props, "active"), (value) => {
      if (!value)
        hideInputTag();
    });
    watch(toRef(props, "pattern"), () => {
      if (props.multiple) {
        void nextTick(syncMirrorWidth);
      }
    });
    function doFocus(e) {
      const { onFocus } = props;
      if (onFocus)
        onFocus(e);
    }
    function doBlur(e) {
      const { onBlur } = props;
      if (onBlur)
        onBlur(e);
    }
    function doDeleteOption(value) {
      const { onDeleteOption } = props;
      if (onDeleteOption)
        onDeleteOption(value);
    }
    function doClear(e) {
      const { onClear } = props;
      if (onClear)
        onClear(e);
    }
    function doPatternInput(value) {
      const { onPatternInput } = props;
      if (onPatternInput)
        onPatternInput(value);
    }
    function handleFocusin(e) {
      var _a;
      if (!e.relatedTarget || !((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))) {
        doFocus(e);
      }
    }
    function handleFocusout(e) {
      var _a;
      if ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))
        return;
      doBlur(e);
    }
    function handleClear(e) {
      doClear(e);
    }
    function handleMouseEnter() {
      hoverRef.value = true;
    }
    function handleMouseLeave() {
      hoverRef.value = false;
    }
    function handleMouseDown(e) {
      if (!props.active || !props.filterable)
        return;
      if (e.target === patternInputRef.value)
        return;
      e.preventDefault();
    }
    function handleDeleteOption(option) {
      doDeleteOption(option);
    }
    function handlePatternKeyDown(e) {
      if (e.key === "Backspace" && !isComposingRef.value) {
        if (!props.pattern.length) {
          const { selectedOptions } = props;
          if (selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.length) {
            handleDeleteOption(selectedOptions[selectedOptions.length - 1]);
          }
        }
      }
    }
    const isComposingRef = ref(false);
    let cachedInputEvent = null;
    function handlePatternInputInput(e) {
      const { value: patternInputMirrorEl } = patternInputMirrorRef;
      if (patternInputMirrorEl) {
        const inputText = e.target.value;
        patternInputMirrorEl.textContent = inputText;
        syncMirrorWidth();
      }
      if (props.ignoreComposition) {
        if (!isComposingRef.value) {
          doPatternInput(e);
        } else {
          cachedInputEvent = e;
        }
      } else {
        doPatternInput(e);
      }
    }
    function handleCompositionStart() {
      isComposingRef.value = true;
    }
    function handleCompositionEnd() {
      isComposingRef.value = false;
      if (props.ignoreComposition) {
        doPatternInput(cachedInputEvent);
      }
      cachedInputEvent = null;
    }
    function handlePatternInputFocus(e) {
      var _a;
      patternInputFocusedRef.value = true;
      (_a = props.onPatternFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
    }
    function handlePatternInputBlur(e) {
      var _a;
      patternInputFocusedRef.value = false;
      (_a = props.onPatternBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
    }
    function blur() {
      var _a, _b;
      if (props.filterable) {
        patternInputFocusedRef.value = false;
        (_a = patternInputWrapperRef.value) === null || _a === void 0 ? void 0 : _a.blur();
        (_b = patternInputRef.value) === null || _b === void 0 ? void 0 : _b.blur();
      } else if (props.multiple) {
        const { value: multipleEl } = multipleElRef;
        multipleEl === null || multipleEl === void 0 ? void 0 : multipleEl.blur();
      } else {
        const { value: singleEl } = singleElRef;
        singleEl === null || singleEl === void 0 ? void 0 : singleEl.blur();
      }
    }
    function focus() {
      var _a, _b, _c;
      if (props.filterable) {
        patternInputFocusedRef.value = false;
        (_a = patternInputWrapperRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      } else if (props.multiple) {
        (_b = multipleElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
      } else {
        (_c = singleElRef.value) === null || _c === void 0 ? void 0 : _c.focus();
      }
    }
    function focusInput() {
      const { value: patternInputEl } = patternInputRef;
      if (patternInputEl) {
        showInputTag();
        patternInputEl.focus();
      }
    }
    function blurInput() {
      const { value: patternInputEl } = patternInputRef;
      if (patternInputEl) {
        patternInputEl.blur();
      }
    }
    function updateCounter(count) {
      const { value } = counterRef;
      if (value) {
        value.setTextContent(`+${count}`);
      }
    }
    function getCounter() {
      const { value } = counterWrapperRef;
      return value;
    }
    function getTail() {
      return patternInputRef.value;
    }
    let enterTimerId = null;
    function clearEnterTimer() {
      if (enterTimerId !== null)
        window.clearTimeout(enterTimerId);
    }
    function handleMouseEnterCounter() {
      if (props.disabled || props.active)
        return;
      clearEnterTimer();
      enterTimerId = window.setTimeout(() => {
        if (selectedRef.value) {
          showTagsPopoverRef.value = true;
        }
      }, 100);
    }
    function handleMouseLeaveCounter() {
      clearEnterTimer();
    }
    function onPopoverUpdateShow(show) {
      if (!show) {
        clearEnterTimer();
        showTagsPopoverRef.value = false;
      }
    }
    watch(selectedRef, (value) => {
      if (!value) {
        showTagsPopoverRef.value = false;
      }
    });
    onMounted(() => {
      watchEffect(() => {
        const patternInputWrapperEl = patternInputWrapperRef.value;
        if (!patternInputWrapperEl)
          return;
        patternInputWrapperEl.tabIndex = props.disabled || patternInputFocusedRef.value ? -1 : 0;
      });
    });
    useOnResize(selfRef, props.onResize);
    const { inlineThemeDisabled } = props;
    const cssVarsRef = computed(() => {
      const { size: size2 } = props;
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: {
        borderRadius,
        color,
        placeholderColor,
        textColor,
        paddingSingle,
        paddingMultiple,
        caretColor,
        colorDisabled,
        textColorDisabled,
        placeholderColorDisabled,
        colorActive,
        boxShadowFocus,
        boxShadowActive,
        boxShadowHover,
        border,
        borderFocus,
        borderHover,
        borderActive,
        arrowColor,
        arrowColorDisabled,
        loadingColor,
        // form warning
        colorActiveWarning,
        boxShadowFocusWarning,
        boxShadowActiveWarning,
        boxShadowHoverWarning,
        borderWarning,
        borderFocusWarning,
        borderHoverWarning,
        borderActiveWarning,
        // form error
        colorActiveError,
        boxShadowFocusError,
        boxShadowActiveError,
        boxShadowHoverError,
        borderError,
        borderFocusError,
        borderHoverError,
        borderActiveError,
        // clear
        clearColor,
        clearColorHover,
        clearColorPressed,
        clearSize,
        // arrow
        arrowSize: arrowSize2,
        [createKey("height", size2)]: height,
        [createKey("fontSize", size2)]: fontSize2
      } } = themeRef.value;
      return {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-border": border,
        "--n-border-active": borderActive,
        "--n-border-focus": borderFocus,
        "--n-border-hover": borderHover,
        "--n-border-radius": borderRadius,
        "--n-box-shadow-active": boxShadowActive,
        "--n-box-shadow-focus": boxShadowFocus,
        "--n-box-shadow-hover": boxShadowHover,
        "--n-caret-color": caretColor,
        "--n-color": color,
        "--n-color-active": colorActive,
        "--n-color-disabled": colorDisabled,
        "--n-font-size": fontSize2,
        "--n-height": height,
        "--n-padding-single": paddingSingle,
        "--n-padding-multiple": paddingMultiple,
        "--n-placeholder-color": placeholderColor,
        "--n-placeholder-color-disabled": placeholderColorDisabled,
        "--n-text-color": textColor,
        "--n-text-color-disabled": textColorDisabled,
        "--n-arrow-color": arrowColor,
        "--n-arrow-color-disabled": arrowColorDisabled,
        "--n-loading-color": loadingColor,
        // form warning
        "--n-color-active-warning": colorActiveWarning,
        "--n-box-shadow-focus-warning": boxShadowFocusWarning,
        "--n-box-shadow-active-warning": boxShadowActiveWarning,
        "--n-box-shadow-hover-warning": boxShadowHoverWarning,
        "--n-border-warning": borderWarning,
        "--n-border-focus-warning": borderFocusWarning,
        "--n-border-hover-warning": borderHoverWarning,
        "--n-border-active-warning": borderActiveWarning,
        // form error
        "--n-color-active-error": colorActiveError,
        "--n-box-shadow-focus-error": boxShadowFocusError,
        "--n-box-shadow-active-error": boxShadowActiveError,
        "--n-box-shadow-hover-error": boxShadowHoverError,
        "--n-border-error": borderError,
        "--n-border-focus-error": borderFocusError,
        "--n-border-hover-error": borderHoverError,
        "--n-border-active-error": borderActiveError,
        // clear
        "--n-clear-size": clearSize,
        "--n-clear-color": clearColor,
        "--n-clear-color-hover": clearColorHover,
        "--n-clear-color-pressed": clearColorPressed,
        // arrow-size
        "--n-arrow-size": arrowSize2
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("internal-selection", computed(() => {
      return props.size[0];
    }), cssVarsRef, props) : void 0;
    return {
      mergedTheme: themeRef,
      mergedClearable: mergedClearableRef,
      patternInputFocused: patternInputFocusedRef,
      filterablePlaceholder: filterablePlaceholderRef,
      label: labelRef,
      selected: selectedRef,
      showTagsPanel: showTagsPopoverRef,
      isComposing: isComposingRef,
      // dom ref
      counterRef,
      counterWrapperRef,
      patternInputMirrorRef,
      patternInputRef,
      selfRef,
      multipleElRef,
      singleElRef,
      patternInputWrapperRef,
      overflowRef,
      inputTagElRef,
      handleMouseDown,
      handleFocusin,
      handleClear,
      handleMouseEnter,
      handleMouseLeave,
      handleDeleteOption,
      handlePatternKeyDown,
      handlePatternInputInput,
      handlePatternInputBlur,
      handlePatternInputFocus,
      handleMouseEnterCounter,
      handleMouseLeaveCounter,
      handleFocusout,
      handleCompositionEnd,
      handleCompositionStart,
      onPopoverUpdateShow,
      focus,
      focusInput,
      blur,
      blurInput,
      updateCounter,
      getCounter,
      getTail,
      renderLabel: props.renderLabel,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const { status, multiple, size: size2, disabled, filterable, maxTagCount, bordered, clsPrefix, onRender, renderTag, renderLabel } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const maxTagCountResponsive = maxTagCount === "responsive";
    const maxTagCountNumeric = typeof maxTagCount === "number";
    const useMaxTagCount = maxTagCountResponsive || maxTagCountNumeric;
    const suffix2 = h(Wrapper, null, {
      default: () => h(NBaseSuffix, { clsPrefix, loading: this.loading, showArrow: this.showArrow, showClear: this.mergedClearable && this.selected, onClear: this.handleClear }, {
        default: () => {
          var _a, _b;
          return (_b = (_a = this.$slots).arrow) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
      })
    });
    let body;
    if (multiple) {
      const { labelField } = this;
      const createTag = (option) => h("div", { class: `${clsPrefix}-base-selection-tag-wrapper`, key: option.value }, renderTag ? renderTag({
        option,
        handleClose: () => {
          this.handleDeleteOption(option);
        }
      }) : h(NTag, { size: size2, closable: !option.disabled, disabled, onClose: () => {
        this.handleDeleteOption(option);
      }, internalCloseIsButtonTag: false, internalCloseFocusable: false }, {
        default: () => renderLabel ? renderLabel(option, true) : render$1(option[labelField], option, true)
      }));
      const createOriginalTagNodes = () => (maxTagCountNumeric ? this.selectedOptions.slice(0, maxTagCount) : this.selectedOptions).map(createTag);
      const input = filterable ? h(
        "div",
        { class: `${clsPrefix}-base-selection-input-tag`, ref: "inputTagElRef", key: "__input-tag__" },
        h("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", tabindex: -1, disabled, value: this.pattern, autofocus: this.autofocus, class: `${clsPrefix}-base-selection-input-tag__input`, onBlur: this.handlePatternInputBlur, onFocus: this.handlePatternInputFocus, onKeydown: this.handlePatternKeyDown, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
        h("span", { ref: "patternInputMirrorRef", class: `${clsPrefix}-base-selection-input-tag__mirror` }, this.pattern)
      ) : null;
      const renderCounter = maxTagCountResponsive ? () => h(
        "div",
        { class: `${clsPrefix}-base-selection-tag-wrapper`, ref: "counterWrapperRef" },
        h(NTag, { size: size2, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, onMouseleave: this.handleMouseLeaveCounter, disabled })
      ) : void 0;
      let counter;
      if (maxTagCountNumeric) {
        const rest = this.selectedOptions.length - maxTagCount;
        if (rest > 0) {
          counter = h(
            "div",
            { class: `${clsPrefix}-base-selection-tag-wrapper`, key: "__counter__" },
            h(NTag, { size: size2, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, disabled }, {
              default: () => `+${rest}`
            })
          );
        }
      }
      const tags = maxTagCountResponsive ? filterable ? h(VOverflow, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, getTail: this.getTail, style: {
        width: "100%",
        display: "flex",
        overflow: "hidden"
      } }, {
        default: createOriginalTagNodes,
        counter: renderCounter,
        tail: () => input
      }) : h(VOverflow, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, style: {
        width: "100%",
        display: "flex",
        overflow: "hidden"
      } }, {
        default: createOriginalTagNodes,
        counter: renderCounter
      }) : maxTagCountNumeric ? createOriginalTagNodes().concat(counter) : createOriginalTagNodes();
      const renderPopover = useMaxTagCount ? () => h("div", { class: `${clsPrefix}-base-selection-popover` }, maxTagCountResponsive ? createOriginalTagNodes() : this.selectedOptions.map(createTag)) : void 0;
      const popoverProps2 = useMaxTagCount ? {
        show: this.showTagsPanel,
        trigger: "hover",
        overlap: true,
        placement: "top",
        width: "trigger",
        onUpdateShow: this.onPopoverUpdateShow,
        theme: this.mergedTheme.peers.Popover,
        themeOverrides: this.mergedTheme.peerOverrides.Popover
      } : null;
      const showPlaceholder = this.selected ? false : this.active ? !this.pattern && !this.isComposing : true;
      const placeholder = showPlaceholder ? h(
        "div",
        { class: `${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay` },
        h("div", { class: `${clsPrefix}-base-selection-placeholder__inner` }, this.placeholder)
      ) : null;
      const popoverTrigger = filterable ? h(
        "div",
        { ref: "patternInputWrapperRef", class: `${clsPrefix}-base-selection-tags` },
        tags,
        maxTagCountResponsive ? null : input,
        suffix2
      ) : h(
        "div",
        { ref: "multipleElRef", class: `${clsPrefix}-base-selection-tags`, tabindex: disabled ? void 0 : 0 },
        tags,
        suffix2
      );
      body = h(
        Fragment,
        null,
        useMaxTagCount ? h(NPopover, Object.assign({}, popoverProps2, { scrollable: true, style: "max-height: calc(var(--v-target-height) * 6.6);" }), {
          trigger: () => popoverTrigger,
          default: renderPopover
        }) : popoverTrigger,
        placeholder
      );
    } else {
      if (filterable) {
        const hasInput = this.pattern || this.isComposing;
        const showPlaceholder = this.active ? !hasInput : !this.selected;
        const showSelectedLabel = this.active ? false : this.selected;
        body = h(
          "div",
          { ref: "patternInputWrapperRef", class: `${clsPrefix}-base-selection-label` },
          h("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", class: `${clsPrefix}-base-selection-input`, value: this.active ? this.pattern : "", placeholder: "", readonly: disabled, disabled, tabindex: -1, autofocus: this.autofocus, onFocus: this.handlePatternInputFocus, onBlur: this.handlePatternInputBlur, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
          showSelectedLabel ? h(
            "div",
            { class: `${clsPrefix}-base-selection-label__render-label ${clsPrefix}-base-selection-overlay`, key: "input" },
            h("div", { class: `${clsPrefix}-base-selection-overlay__wrapper` }, renderTag ? renderTag({
              option: this.selectedOption,
              handleClose: () => {
              }
            }) : renderLabel ? renderLabel(this.selectedOption, true) : render$1(this.label, this.selectedOption, true))
          ) : null,
          showPlaceholder ? h(
            "div",
            { class: `${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`, key: "placeholder" },
            h("div", { class: `${clsPrefix}-base-selection-overlay__wrapper` }, this.filterablePlaceholder)
          ) : null,
          suffix2
        );
      } else {
        body = h(
          "div",
          { ref: "singleElRef", class: `${clsPrefix}-base-selection-label`, tabindex: this.disabled ? void 0 : 0 },
          this.label !== void 0 ? h(
            "div",
            { class: `${clsPrefix}-base-selection-input`, title: getTitleAttribute(this.label), key: "input" },
            h("div", { class: `${clsPrefix}-base-selection-input__content` }, renderTag ? renderTag({
              option: this.selectedOption,
              handleClose: () => {
              }
            }) : renderLabel ? renderLabel(this.selectedOption, true) : render$1(this.label, this.selectedOption, true))
          ) : h(
            "div",
            { class: `${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`, key: "placeholder" },
            h("div", { class: `${clsPrefix}-base-selection-placeholder__inner` }, this.placeholder)
          ),
          suffix2
        );
      }
    }
    return h(
      "div",
      { ref: "selfRef", class: [
        `${clsPrefix}-base-selection`,
        this.themeClass,
        status && `${clsPrefix}-base-selection--${status}-status`,
        {
          [`${clsPrefix}-base-selection--active`]: this.active,
          [`${clsPrefix}-base-selection--selected`]: this.selected || this.active && this.pattern,
          [`${clsPrefix}-base-selection--disabled`]: this.disabled,
          [`${clsPrefix}-base-selection--multiple`]: this.multiple,
          // focus is not controlled by selection itself since it always need
          // to be managed together with menu. provide :focus style will cause
          // many redundant codes.
          [`${clsPrefix}-base-selection--focus`]: this.focused
        }
      ], style: this.cssVars, onClick: this.onClick, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onKeydown: this.onKeydown, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onMousedown: this.handleMouseDown },
      body,
      bordered ? h("div", { class: `${clsPrefix}-base-selection__border` }) : null,
      bordered ? h("div", { class: `${clsPrefix}-base-selection__state-border` }) : null
    );
  }
});
const {
  cubicBezierEaseInOut: cubicBezierEaseInOut$1
} = commonVariables$9;
function fadeInWidthExpandTransition({
  duration = ".2s",
  delay = ".1s"
} = {}) {
  return [c$1("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
    opacity: 1
  }), c$1("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), c$1("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${duration} ${cubicBezierEaseInOut$1},
 max-width ${duration} ${cubicBezierEaseInOut$1} ${delay},
 margin-left ${duration} ${cubicBezierEaseInOut$1} ${delay},
 margin-right ${duration} ${cubicBezierEaseInOut$1} ${delay};
 `), c$1("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${duration} ${cubicBezierEaseInOut$1} ${delay},
 max-width ${duration} ${cubicBezierEaseInOut$1},
 margin-left ${duration} ${cubicBezierEaseInOut$1},
 margin-right ${duration} ${cubicBezierEaseInOut$1};
 `)];
}
const {
  cubicBezierEaseInOut,
  cubicBezierEaseOut,
  cubicBezierEaseIn
} = commonVariables$9;
function fadeInHeightExpandTransition({
  overflow = "hidden",
  duration = ".3s",
  originalTransition = "",
  leavingDelay = "0s",
  foldPadding = false,
  enterToProps = void 0,
  leaveToProps = void 0,
  reverse = false
} = {}) {
  const enterClass = reverse ? "leave" : "enter";
  const leaveClass = reverse ? "enter" : "leave";
  return [c$1(`&.fade-in-height-expand-transition-${leaveClass}-from,
 &.fade-in-height-expand-transition-${enterClass}-to`, Object.assign(Object.assign({}, enterToProps), {
    opacity: 1
  })), c$1(`&.fade-in-height-expand-transition-${leaveClass}-to,
 &.fade-in-height-expand-transition-${enterClass}-from`, Object.assign(Object.assign({}, leaveToProps), {
    opacity: 0,
    marginTop: "0 !important",
    marginBottom: "0 !important",
    paddingTop: foldPadding ? "0 !important" : void 0,
    paddingBottom: foldPadding ? "0 !important" : void 0
  })), c$1(`&.fade-in-height-expand-transition-${leaveClass}-active`, `
 overflow: ${overflow};
 transition:
 max-height ${duration} ${cubicBezierEaseInOut} ${leavingDelay},
 opacity ${duration} ${cubicBezierEaseOut} ${leavingDelay},
 margin-top ${duration} ${cubicBezierEaseInOut} ${leavingDelay},
 margin-bottom ${duration} ${cubicBezierEaseInOut} ${leavingDelay},
 padding-top ${duration} ${cubicBezierEaseInOut} ${leavingDelay},
 padding-bottom ${duration} ${cubicBezierEaseInOut} ${leavingDelay}
 ${originalTransition ? "," + originalTransition : ""}
 `), c$1(`&.fade-in-height-expand-transition-${enterClass}-active`, `
 overflow: ${overflow};
 transition:
 max-height ${duration} ${cubicBezierEaseInOut},
 opacity ${duration} ${cubicBezierEaseIn},
 margin-top ${duration} ${cubicBezierEaseInOut},
 margin-bottom ${duration} ${cubicBezierEaseInOut},
 padding-top ${duration} ${cubicBezierEaseInOut},
 padding-bottom ${duration} ${cubicBezierEaseInOut}
 ${originalTransition ? "," + originalTransition : ""}
 `)];
}
function getIsGroup(option) {
  return option.type === "group";
}
function getIgnored(option) {
  return option.type === "ignored";
}
function patternMatched(pattern, value) {
  try {
    return !!(1 + value.toString().toLowerCase().indexOf(pattern.trim().toLowerCase()));
  } catch (err) {
    return false;
  }
}
function createTmOptions(valueField, childrenField) {
  const options = {
    getIsGroup,
    getIgnored,
    getKey(option) {
      if (getIsGroup(option)) {
        return option.name || option.key || "key-required";
      }
      return option[valueField];
    },
    getChildren(option) {
      return option[childrenField];
    }
  };
  return options;
}
function filterOptions(originalOpts, filter, pattern, childrenField) {
  if (!filter)
    return originalOpts;
  function traverse(options) {
    if (!Array.isArray(options))
      return [];
    const filteredOptions = [];
    for (const option of options) {
      if (getIsGroup(option)) {
        const children = traverse(option[childrenField]);
        if (children.length) {
          filteredOptions.push(Object.assign({}, option, {
            [childrenField]: children
          }));
        }
      } else if (getIgnored(option)) {
        continue;
      } else if (filter(pattern, option)) {
        filteredOptions.push(option);
      }
    }
    return filteredOptions;
  }
  return traverse(originalOpts);
}
function createValOptMap(options, valueField, childrenField) {
  const valOptMap = /* @__PURE__ */ new Map();
  options.forEach((option) => {
    if (getIsGroup(option)) {
      option[childrenField].forEach((selectGroupOption) => {
        valOptMap.set(selectGroupOption[valueField], selectGroupOption);
      });
    } else {
      valOptMap.set(option[valueField], option);
    }
  });
  return valOptMap;
}
const isChrome = isBrowser$1 && "chrome" in window;
isBrowser$1 && navigator.userAgent.includes("Firefox");
const isSafari = isBrowser$1 && navigator.userAgent.includes("Safari") && !isChrome;
const commonVariables$5 = {
  paddingTiny: "0 8px",
  paddingSmall: "0 10px",
  paddingMedium: "0 12px",
  paddingLarge: "0 14px",
  clearSize: "16px"
};
const self$b = (vars) => {
  const { textColor2, textColor3, textColorDisabled, primaryColor, primaryColorHover, inputColor, inputColorDisabled, borderColor, warningColor, warningColorHover, errorColor, errorColorHover, borderRadius, lineHeight: lineHeight2, fontSizeTiny, fontSizeSmall, fontSizeMedium, fontSizeLarge, heightTiny, heightSmall, heightMedium, heightLarge, actionColor, clearColor, clearColorHover, clearColorPressed, placeholderColor, placeholderColorDisabled, iconColor, iconColorDisabled, iconColorHover, iconColorPressed } = vars;
  return Object.assign(Object.assign({}, commonVariables$5), {
    countTextColorDisabled: textColorDisabled,
    countTextColor: textColor3,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    lineHeight: lineHeight2,
    lineHeightTextarea: lineHeight2,
    borderRadius,
    iconSize: "16px",
    groupLabelColor: actionColor,
    groupLabelTextColor: textColor2,
    textColor: textColor2,
    textColorDisabled,
    textDecorationColor: textColor2,
    caretColor: primaryColor,
    placeholderColor,
    placeholderColorDisabled,
    color: inputColor,
    colorDisabled: inputColorDisabled,
    colorFocus: inputColor,
    groupLabelBorder: `1px solid ${borderColor}`,
    border: `1px solid ${borderColor}`,
    borderHover: `1px solid ${primaryColorHover}`,
    borderDisabled: `1px solid ${borderColor}`,
    borderFocus: `1px solid ${primaryColorHover}`,
    boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
    loadingColor: primaryColor,
    // warning
    loadingColorWarning: warningColor,
    borderWarning: `1px solid ${warningColor}`,
    borderHoverWarning: `1px solid ${warningColorHover}`,
    colorFocusWarning: inputColor,
    borderFocusWarning: `1px solid ${warningColorHover}`,
    boxShadowFocusWarning: `0 0 0 2px ${changeColor(warningColor, {
      alpha: 0.2
    })}`,
    caretColorWarning: warningColor,
    // error
    loadingColorError: errorColor,
    borderError: `1px solid ${errorColor}`,
    borderHoverError: `1px solid ${errorColorHover}`,
    colorFocusError: inputColor,
    borderFocusError: `1px solid ${errorColorHover}`,
    boxShadowFocusError: `0 0 0 2px ${changeColor(errorColor, {
      alpha: 0.2
    })}`,
    caretColorError: errorColor,
    clearColor,
    clearColorHover,
    clearColorPressed,
    iconColor,
    iconColorDisabled,
    iconColorHover,
    iconColorPressed,
    suffixTextColor: textColor2
  });
};
const inputLight = {
  name: "Input",
  common: commonLight,
  self: self$b
};
const inputLight$1 = inputLight;
const inputInjectionKey = createInjectionKey("n-input");
function len(s) {
  let count = 0;
  for (const _ of s) {
    count++;
  }
  return count;
}
function isEmptyInputValue(value) {
  return value === "" || value == null;
}
function useCursor(inputElRef) {
  const selectionRef = ref(null);
  function recordCursor() {
    const { value: input } = inputElRef;
    if (!(input === null || input === void 0 ? void 0 : input.focus)) {
      reset();
      return;
    }
    const { selectionStart, selectionEnd, value } = input;
    if (selectionStart == null || selectionEnd == null) {
      reset();
      return;
    }
    selectionRef.value = {
      start: selectionStart,
      end: selectionEnd,
      beforeText: value.slice(0, selectionStart),
      afterText: value.slice(selectionEnd)
    };
  }
  function restoreCursor() {
    var _a;
    const { value: selection } = selectionRef;
    const { value: inputEl } = inputElRef;
    if (!selection || !inputEl) {
      return;
    }
    const { value } = inputEl;
    const { start, beforeText, afterText } = selection;
    let startPos = value.length;
    if (value.endsWith(afterText)) {
      startPos = value.length - afterText.length;
    } else if (value.startsWith(beforeText)) {
      startPos = beforeText.length;
    } else {
      const beforeLastChar = beforeText[start - 1];
      const newIndex = value.indexOf(beforeLastChar, start - 1);
      if (newIndex !== -1) {
        startPos = newIndex + 1;
      }
    }
    (_a = inputEl.setSelectionRange) === null || _a === void 0 ? void 0 : _a.call(inputEl, startPos, startPos);
  }
  function reset() {
    selectionRef.value = null;
  }
  watch(inputElRef, reset);
  return {
    recordCursor,
    restoreCursor
  };
}
const WordCount = /* @__PURE__ */ defineComponent({
  name: "InputWordCount",
  setup(_, { slots }) {
    const { mergedValueRef, maxlengthRef, mergedClsPrefixRef, countGraphemesRef } = (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inject(inputInjectionKey)
    );
    const wordCountRef = computed(() => {
      const { value: mergedValue } = mergedValueRef;
      if (mergedValue === null || Array.isArray(mergedValue))
        return 0;
      return (countGraphemesRef.value || len)(mergedValue);
    });
    return () => {
      const { value: maxlength } = maxlengthRef;
      const { value: mergedValue } = mergedValueRef;
      return h("span", { class: `${mergedClsPrefixRef.value}-input-word-count` }, resolveSlotWithProps(slots.default, {
        value: mergedValue === null || Array.isArray(mergedValue) ? "" : mergedValue
      }, () => [
        maxlength === void 0 ? wordCountRef.value : `${wordCountRef.value} / ${maxlength}`
      ]));
    };
  }
});
const style$a = cB("input", `
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`, [
  // common
  cE("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),
  cE("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `),
  cE("input-el, textarea-el", `
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `, [c$1("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), c$1("&::placeholder", `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), c$1("&:-webkit-autofill ~", [cE("placeholder", "display: none;")])]),
  cM("round", [cNotM("textarea", "border-radius: calc(var(--n-height) / 2);")]),
  cE("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [c$1("span", `
 width: 100%;
 display: inline-block;
 `)]),
  cM("textarea", [cE("placeholder", "overflow: visible;")]),
  cNotM("autosize", "width: 100%;"),
  cM("autosize", [cE("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
  // input
  cB("input-wrapper", `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),
  cE("input-mirror", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),
  cE("input-el", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [c$1("+", [cE("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
  cNotM("textarea", [cE("placeholder", "white-space: nowrap;")]),
  cE("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),
  // textarea
  cM("textarea", "width: 100%;", [cB("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), cM("resizable", [cB("input-wrapper", `
 resize: vertical;
 min-height: var(--n-height);
 `)]), cE("textarea-el, textarea-mirror, placeholder", `
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 `), cE("textarea-mirror", `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),
  // pair
  cM("pair", [cE("input-el, placeholder", "text-align: center;"), cE("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [cB("icon", `
 color: var(--n-icon-color);
 `), cB("base-icon", `
 color: var(--n-icon-color);
 `)])]),
  cM("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [cE("border", "border: var(--n-border-disabled);"), cE("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), cE("placeholder", "color: var(--n-placeholder-color-disabled);"), cE("separator", "color: var(--n-text-color-disabled);", [cB("icon", `
 color: var(--n-icon-color-disabled);
 `), cB("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), cB("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), cE("suffix, prefix", "color: var(--n-text-color-disabled);", [cB("icon", `
 color: var(--n-icon-color-disabled);
 `), cB("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]),
  cNotM("disabled", [cE("eye", `
 color: var(--n-icon-color);
 cursor: pointer;
 `, [c$1("&:hover", `
 color: var(--n-icon-color-hover);
 `), c$1("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), c$1("&:hover", [cE("state-border", "border: var(--n-border-hover);")]), cM("focus", "background-color: var(--n-color-focus);", [cE("state-border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),
  cE("border, state-border", `
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),
  cE("state-border", `
 border-color: #0000;
 z-index: 1;
 `),
  cE("prefix", "margin-right: 4px;"),
  cE("suffix", `
 margin-left: 4px;
 `),
  cE("suffix, prefix", `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `, [cB("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), cB("base-clear", `
 font-size: var(--n-icon-size);
 `, [cE("placeholder", [cB("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), c$1(">", [cB("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), cB("base-icon", `
 font-size: var(--n-icon-size);
 `)]),
  cB("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),
  ["warning", "error"].map((status) => cM(`${status}-status`, [cNotM("disabled", [cB("base-loading", `
 color: var(--n-loading-color-${status})
 `), cE("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${status});
 `), cE("state-border", `
 border: var(--n-border-${status});
 `), c$1("&:hover", [cE("state-border", `
 border: var(--n-border-hover-${status});
 `)]), c$1("&:focus", `
 background-color: var(--n-color-focus-${status});
 `, [cE("state-border", `
 box-shadow: var(--n-box-shadow-focus-${status});
 border: var(--n-border-focus-${status});
 `)]), cM("focus", `
 background-color: var(--n-color-focus-${status});
 `, [cE("state-border", `
 box-shadow: var(--n-box-shadow-focus-${status});
 border: var(--n-border-focus-${status});
 `)])])]))
]);
const safariStyle = cB("input", [cM("disabled", [cE("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]);
const inputProps = Object.assign(Object.assign({}, useTheme.props), {
  bordered: {
    type: Boolean,
    default: void 0
  },
  type: {
    type: String,
    default: "text"
  },
  placeholder: [Array, String],
  defaultValue: {
    type: [String, Array],
    default: null
  },
  value: [String, Array],
  disabled: {
    type: Boolean,
    default: void 0
  },
  size: String,
  rows: {
    type: [Number, String],
    default: 3
  },
  round: Boolean,
  minlength: [String, Number],
  maxlength: [String, Number],
  clearable: Boolean,
  autosize: {
    type: [Boolean, Object],
    default: false
  },
  pair: Boolean,
  separator: String,
  readonly: {
    type: [String, Boolean],
    default: false
  },
  passivelyActivated: Boolean,
  showPasswordOn: String,
  stateful: {
    type: Boolean,
    default: true
  },
  autofocus: Boolean,
  inputProps: Object,
  resizable: {
    type: Boolean,
    default: true
  },
  showCount: Boolean,
  loading: {
    type: Boolean,
    default: void 0
  },
  allowInput: Function,
  renderCount: Function,
  onMousedown: Function,
  onKeydown: Function,
  onKeyup: Function,
  onInput: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
  onClick: [Function, Array],
  onChange: [Function, Array],
  onClear: [Function, Array],
  countGraphemes: Function,
  status: String,
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  /** private */
  textDecoration: [String, Array],
  attrSize: {
    type: Number,
    default: 20
  },
  onInputBlur: [Function, Array],
  onInputFocus: [Function, Array],
  onDeactivate: [Function, Array],
  onActivate: [Function, Array],
  onWrapperFocus: [Function, Array],
  onWrapperBlur: [Function, Array],
  internalDeactivateOnEnter: Boolean,
  internalForceFocus: Boolean,
  internalLoadingBeforeSuffix: Boolean,
  /** deprecated */
  showPasswordToggle: Boolean
});
const NInput = /* @__PURE__ */ defineComponent({
  name: "Input",
  props: inputProps,
  setup(props) {
    const { mergedClsPrefixRef, mergedBorderedRef, inlineThemeDisabled, mergedRtlRef } = useConfig(props);
    const themeRef = useTheme("Input", "-input", style$a, inputLight$1, props, mergedClsPrefixRef);
    if (isSafari) {
      useStyle("-input-safari", safariStyle, mergedClsPrefixRef);
    }
    const wrapperElRef = ref(null);
    const textareaElRef = ref(null);
    const textareaMirrorElRef = ref(null);
    const inputMirrorElRef = ref(null);
    const inputElRef = ref(null);
    const inputEl2Ref = ref(null);
    const currentFocusedInputRef = ref(null);
    const focusedInputCursorControl = useCursor(currentFocusedInputRef);
    const textareaScrollbarInstRef = ref(null);
    const { localeRef } = useLocale("Input");
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, "value");
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const formItem = useFormItem(props);
    const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem;
    const focusedRef = ref(false);
    const hoverRef = ref(false);
    const isComposingRef = ref(false);
    const activatedRef = ref(false);
    let syncSource = null;
    const mergedPlaceholderRef = computed(() => {
      const { placeholder, pair } = props;
      if (pair) {
        if (Array.isArray(placeholder)) {
          return placeholder;
        } else if (placeholder === void 0) {
          return ["", ""];
        }
        return [placeholder, placeholder];
      } else if (placeholder === void 0) {
        return [localeRef.value.placeholder];
      } else {
        return [placeholder];
      }
    });
    const showPlaceholder1Ref = computed(() => {
      const { value: isComposing } = isComposingRef;
      const { value: mergedValue } = mergedValueRef;
      const { value: mergedPlaceholder } = mergedPlaceholderRef;
      return !isComposing && (isEmptyInputValue(mergedValue) || Array.isArray(mergedValue) && isEmptyInputValue(mergedValue[0])) && mergedPlaceholder[0];
    });
    const showPlaceholder2Ref = computed(() => {
      const { value: isComposing } = isComposingRef;
      const { value: mergedValue } = mergedValueRef;
      const { value: mergedPlaceholder } = mergedPlaceholderRef;
      return !isComposing && mergedPlaceholder[1] && (isEmptyInputValue(mergedValue) || Array.isArray(mergedValue) && isEmptyInputValue(mergedValue[1]));
    });
    const mergedFocusRef = useMemo(() => {
      return props.internalForceFocus || focusedRef.value;
    });
    const showClearButton = useMemo(() => {
      if (mergedDisabledRef.value || props.readonly || !props.clearable || !mergedFocusRef.value && !hoverRef.value) {
        return false;
      }
      const { value: mergedValue } = mergedValueRef;
      const { value: mergedFocus } = mergedFocusRef;
      if (props.pair) {
        return !!(Array.isArray(mergedValue) && (mergedValue[0] || mergedValue[1])) && (hoverRef.value || mergedFocus);
      } else {
        return !!mergedValue && (hoverRef.value || mergedFocus);
      }
    });
    const mergedShowPasswordOnRef = computed(() => {
      const { showPasswordOn } = props;
      if (showPasswordOn) {
        return showPasswordOn;
      }
      if (props.showPasswordToggle)
        return "click";
      return void 0;
    });
    const passwordVisibleRef = ref(false);
    const textDecorationStyleRef = computed(() => {
      const { textDecoration } = props;
      if (!textDecoration)
        return ["", ""];
      if (Array.isArray(textDecoration)) {
        return textDecoration.map((v) => ({
          textDecoration: v
        }));
      }
      return [
        {
          textDecoration
        }
      ];
    });
    const textAreaScrollContainerWidthRef = ref(void 0);
    const updateTextAreaStyle = () => {
      var _a, _b;
      if (props.type === "textarea") {
        const { autosize } = props;
        if (autosize) {
          textAreaScrollContainerWidthRef.value = (_b = (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.$el) === null || _b === void 0 ? void 0 : _b.offsetWidth;
        }
        if (!textareaElRef.value)
          return;
        if (typeof autosize === "boolean")
          return;
        const { paddingTop: stylePaddingTop, paddingBottom: stylePaddingBottom, lineHeight: styleLineHeight } = window.getComputedStyle(textareaElRef.value);
        const paddingTop = Number(stylePaddingTop.slice(0, -2));
        const paddingBottom = Number(stylePaddingBottom.slice(0, -2));
        const lineHeight2 = Number(styleLineHeight.slice(0, -2));
        const { value: textareaMirrorEl } = textareaMirrorElRef;
        if (!textareaMirrorEl)
          return;
        if (autosize.minRows) {
          const minRows = Math.max(autosize.minRows, 1);
          const styleMinHeight = `${paddingTop + paddingBottom + lineHeight2 * minRows}px`;
          textareaMirrorEl.style.minHeight = styleMinHeight;
        }
        if (autosize.maxRows) {
          const styleMaxHeight = `${paddingTop + paddingBottom + lineHeight2 * autosize.maxRows}px`;
          textareaMirrorEl.style.maxHeight = styleMaxHeight;
        }
      }
    };
    const maxlengthRef = computed(() => {
      const { maxlength } = props;
      return maxlength === void 0 ? void 0 : Number(maxlength);
    });
    onMounted(() => {
      const { value } = mergedValueRef;
      if (!Array.isArray(value)) {
        syncMirror(value);
      }
    });
    const vm = getCurrentInstance().proxy;
    function doUpdateValue(value) {
      const { onUpdateValue, "onUpdate:value": _onUpdateValue, onInput } = props;
      const { nTriggerFormInput } = formItem;
      if (onUpdateValue)
        call(onUpdateValue, value);
      if (_onUpdateValue)
        call(_onUpdateValue, value);
      if (onInput)
        call(onInput, value);
      uncontrolledValueRef.value = value;
      nTriggerFormInput();
    }
    function doChange(value) {
      const { onChange } = props;
      const { nTriggerFormChange } = formItem;
      if (onChange)
        call(onChange, value);
      uncontrolledValueRef.value = value;
      nTriggerFormChange();
    }
    function doBlur(e) {
      const { onBlur } = props;
      const { nTriggerFormBlur } = formItem;
      if (onBlur)
        call(onBlur, e);
      nTriggerFormBlur();
    }
    function doFocus(e) {
      const { onFocus } = props;
      const { nTriggerFormFocus } = formItem;
      if (onFocus)
        call(onFocus, e);
      nTriggerFormFocus();
    }
    function doClear(e) {
      const { onClear } = props;
      if (onClear)
        call(onClear, e);
    }
    function doUpdateValueBlur(e) {
      const { onInputBlur } = props;
      if (onInputBlur)
        call(onInputBlur, e);
    }
    function doUpdateValueFocus(e) {
      const { onInputFocus } = props;
      if (onInputFocus)
        call(onInputFocus, e);
    }
    function doDeactivate() {
      const { onDeactivate } = props;
      if (onDeactivate)
        call(onDeactivate);
    }
    function doActivate() {
      const { onActivate } = props;
      if (onActivate)
        call(onActivate);
    }
    function doClick(e) {
      const { onClick } = props;
      if (onClick)
        call(onClick, e);
    }
    function doWrapperFocus(e) {
      const { onWrapperFocus } = props;
      if (onWrapperFocus)
        call(onWrapperFocus, e);
    }
    function doWrapperBlur(e) {
      const { onWrapperBlur } = props;
      if (onWrapperBlur)
        call(onWrapperBlur, e);
    }
    function handleCompositionStart() {
      isComposingRef.value = true;
    }
    function handleCompositionEnd(e) {
      isComposingRef.value = false;
      if (e.target === inputEl2Ref.value) {
        handleInput(e, 1);
      } else {
        handleInput(e, 0);
      }
    }
    function handleInput(e, index = 0, event = "input") {
      const targetValue = e.target.value;
      syncMirror(targetValue);
      if (e instanceof InputEvent && !e.isComposing) {
        isComposingRef.value = false;
      }
      if (props.type === "textarea") {
        const { value: textareaScrollbarInst } = textareaScrollbarInstRef;
        if (textareaScrollbarInst) {
          textareaScrollbarInst.syncUnifiedContainer();
        }
      }
      syncSource = targetValue;
      if (isComposingRef.value)
        return;
      focusedInputCursorControl.recordCursor();
      const isIncomingValueValid = allowInput(targetValue);
      if (isIncomingValueValid) {
        if (!props.pair) {
          event === "input" ? doUpdateValue(targetValue) : doChange(targetValue);
        } else {
          let { value } = mergedValueRef;
          if (!Array.isArray(value)) {
            value = ["", ""];
          } else {
            value = [value[0], value[1]];
          }
          value[index] = targetValue;
          event === "input" ? doUpdateValue(value) : doChange(value);
        }
      }
      vm.$forceUpdate();
      if (!isIncomingValueValid) {
        void nextTick(focusedInputCursorControl.restoreCursor);
      }
    }
    function allowInput(value) {
      const { countGraphemes, maxlength, minlength } = props;
      if (countGraphemes) {
        let graphemesCount;
        if (maxlength !== void 0) {
          if (graphemesCount === void 0) {
            graphemesCount = countGraphemes(value);
          }
          if (graphemesCount > Number(maxlength))
            return false;
        }
        if (minlength !== void 0) {
          if (graphemesCount === void 0) {
            graphemesCount = countGraphemes(value);
          }
          if (graphemesCount < Number(maxlength))
            return false;
        }
      }
      const { allowInput: allowInput2 } = props;
      if (typeof allowInput2 === "function") {
        return allowInput2(value);
      }
      return true;
    }
    function handleInputBlur(e) {
      doUpdateValueBlur(e);
      if (e.relatedTarget === wrapperElRef.value) {
        doDeactivate();
      }
      if (!(e.relatedTarget !== null && (e.relatedTarget === inputElRef.value || e.relatedTarget === inputEl2Ref.value || e.relatedTarget === textareaElRef.value))) {
        activatedRef.value = false;
      }
      dealWithEvent(e, "blur");
      currentFocusedInputRef.value = null;
    }
    function handleInputFocus(e, index) {
      doUpdateValueFocus(e);
      focusedRef.value = true;
      activatedRef.value = true;
      doActivate();
      dealWithEvent(e, "focus");
      if (index === 0) {
        currentFocusedInputRef.value = inputElRef.value;
      } else if (index === 1) {
        currentFocusedInputRef.value = inputEl2Ref.value;
      } else if (index === 2) {
        currentFocusedInputRef.value = textareaElRef.value;
      }
    }
    function handleWrapperBlur(e) {
      if (props.passivelyActivated) {
        doWrapperBlur(e);
        dealWithEvent(e, "blur");
      }
    }
    function handleWrapperFocus(e) {
      if (props.passivelyActivated) {
        focusedRef.value = true;
        doWrapperFocus(e);
        dealWithEvent(e, "focus");
      }
    }
    function dealWithEvent(e, type) {
      if (e.relatedTarget !== null && (e.relatedTarget === inputElRef.value || e.relatedTarget === inputEl2Ref.value || e.relatedTarget === textareaElRef.value || e.relatedTarget === wrapperElRef.value))
        ;
      else {
        if (type === "focus") {
          doFocus(e);
          focusedRef.value = true;
        } else if (type === "blur") {
          doBlur(e);
          focusedRef.value = false;
        }
      }
    }
    function handleChange(e, index) {
      handleInput(e, index, "change");
    }
    function handleClick(e) {
      doClick(e);
    }
    function handleClear(e) {
      doClear(e);
      if (props.pair) {
        doUpdateValue(["", ""]);
        doChange(["", ""]);
      } else {
        doUpdateValue("");
        doChange("");
      }
    }
    function handleMouseDown(e) {
      const { onMousedown } = props;
      if (onMousedown)
        onMousedown(e);
      const { tagName } = e.target;
      if (tagName !== "INPUT" && tagName !== "TEXTAREA") {
        if (props.resizable) {
          const { value: wrapperEl } = wrapperElRef;
          if (wrapperEl) {
            const { left, top, width, height } = wrapperEl.getBoundingClientRect();
            const resizeHandleSize = 14;
            if (left + width - resizeHandleSize < e.clientX && e.clientX < left + width && top + height - resizeHandleSize < e.clientY && e.clientY < top + height) {
              return;
            }
          }
        }
        e.preventDefault();
        if (!focusedRef.value) {
          focus();
        }
      }
    }
    function handleMouseEnter() {
      var _a;
      hoverRef.value = true;
      if (props.type === "textarea") {
        (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.handleMouseEnterWrapper();
      }
    }
    function handleMouseLeave() {
      var _a;
      hoverRef.value = false;
      if (props.type === "textarea") {
        (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.handleMouseLeaveWrapper();
      }
    }
    function handlePasswordToggleClick() {
      if (mergedDisabledRef.value)
        return;
      if (mergedShowPasswordOnRef.value !== "click")
        return;
      passwordVisibleRef.value = !passwordVisibleRef.value;
    }
    function handlePasswordToggleMousedown(e) {
      if (mergedDisabledRef.value)
        return;
      e.preventDefault();
      const preventDefaultOnce = (e2) => {
        e2.preventDefault();
        off("mouseup", document, preventDefaultOnce);
      };
      on("mouseup", document, preventDefaultOnce);
      if (mergedShowPasswordOnRef.value !== "mousedown")
        return;
      passwordVisibleRef.value = true;
      const hidePassword = () => {
        passwordVisibleRef.value = false;
        off("mouseup", document, hidePassword);
      };
      on("mouseup", document, hidePassword);
    }
    function handleWrapperKeydown(e) {
      var _a;
      (_a = props.onKeydown) === null || _a === void 0 ? void 0 : _a.call(props, e);
      switch (e.key) {
        case "Escape":
          handleWrapperKeydownEsc();
          break;
        case "Enter":
          handleWrapperKeydownEnter(e);
          break;
      }
    }
    function handleWrapperKeydownEnter(e) {
      var _a, _b;
      if (props.passivelyActivated) {
        const { value: focused } = activatedRef;
        if (focused) {
          if (props.internalDeactivateOnEnter) {
            handleWrapperKeydownEsc();
          }
          return;
        }
        e.preventDefault();
        if (props.type === "textarea") {
          (_a = textareaElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
        } else {
          (_b = inputElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
        }
      }
    }
    function handleWrapperKeydownEsc() {
      if (props.passivelyActivated) {
        activatedRef.value = false;
        void nextTick(() => {
          var _a;
          (_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
        });
      }
    }
    function focus() {
      var _a, _b, _c;
      if (mergedDisabledRef.value)
        return;
      if (props.passivelyActivated) {
        (_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      } else {
        (_b = textareaElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
        (_c = inputElRef.value) === null || _c === void 0 ? void 0 : _c.focus();
      }
    }
    function blur() {
      var _a;
      if ((_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    }
    function select() {
      var _a, _b;
      (_a = textareaElRef.value) === null || _a === void 0 ? void 0 : _a.select();
      (_b = inputElRef.value) === null || _b === void 0 ? void 0 : _b.select();
    }
    function activate() {
      if (mergedDisabledRef.value)
        return;
      if (textareaElRef.value)
        textareaElRef.value.focus();
      else if (inputElRef.value)
        inputElRef.value.focus();
    }
    function deactivate() {
      const { value: wrapperEl } = wrapperElRef;
      if ((wrapperEl === null || wrapperEl === void 0 ? void 0 : wrapperEl.contains(document.activeElement)) && wrapperEl !== document.activeElement) {
        handleWrapperKeydownEsc();
      }
    }
    function scrollTo(options) {
      if (props.type === "textarea") {
        const { value: textareaEl } = textareaElRef;
        textareaEl === null || textareaEl === void 0 ? void 0 : textareaEl.scrollTo(options);
      } else {
        const { value: inputEl } = inputElRef;
        inputEl === null || inputEl === void 0 ? void 0 : inputEl.scrollTo(options);
      }
    }
    function syncMirror(value) {
      const { type, pair, autosize } = props;
      if (!pair && autosize) {
        if (type === "textarea") {
          const { value: textareaMirrorEl } = textareaMirrorElRef;
          if (textareaMirrorEl) {
            textareaMirrorEl.textContent = (value !== null && value !== void 0 ? value : "") + "\r\n";
          }
        } else {
          const { value: inputMirrorEl } = inputMirrorElRef;
          if (inputMirrorEl) {
            if (value) {
              inputMirrorEl.textContent = value;
            } else {
              inputMirrorEl.innerHTML = "&nbsp;";
            }
          }
        }
      }
    }
    function handleTextAreaMirrorResize() {
      updateTextAreaStyle();
    }
    const placeholderStyleRef = ref({
      top: "0"
    });
    function handleTextAreaScroll(e) {
      var _a;
      const { scrollTop } = e.target;
      placeholderStyleRef.value.top = `${-scrollTop}px`;
      (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.syncUnifiedContainer();
    }
    let stopWatchMergedValue1 = null;
    watchEffect(() => {
      const { autosize, type } = props;
      if (autosize && type === "textarea") {
        stopWatchMergedValue1 = watch(mergedValueRef, (value) => {
          if (!Array.isArray(value) && value !== syncSource) {
            syncMirror(value);
          }
        });
      } else {
        stopWatchMergedValue1 === null || stopWatchMergedValue1 === void 0 ? void 0 : stopWatchMergedValue1();
      }
    });
    let stopWatchMergedValue2 = null;
    watchEffect(() => {
      if (props.type === "textarea") {
        stopWatchMergedValue2 = watch(mergedValueRef, (value) => {
          var _a;
          if (!Array.isArray(value) && value !== syncSource) {
            (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.syncUnifiedContainer();
          }
        });
      } else {
        stopWatchMergedValue2 === null || stopWatchMergedValue2 === void 0 ? void 0 : stopWatchMergedValue2();
      }
    });
    provide(inputInjectionKey, {
      mergedValueRef,
      maxlengthRef,
      mergedClsPrefixRef,
      countGraphemesRef: toRef(props, "countGraphemes")
    });
    const exposedProps = {
      wrapperElRef,
      inputElRef,
      textareaElRef,
      isCompositing: isComposingRef,
      focus,
      blur,
      select,
      deactivate,
      activate,
      scrollTo
    };
    const rtlEnabledRef = useRtl("Input", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { value: size2 } = mergedSizeRef;
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: { color, borderRadius, textColor, caretColor, caretColorError, caretColorWarning, textDecorationColor, border, borderDisabled, borderHover, borderFocus, placeholderColor, placeholderColorDisabled, lineHeightTextarea, colorDisabled, colorFocus, textColorDisabled, boxShadowFocus, iconSize, colorFocusWarning, boxShadowFocusWarning, borderWarning, borderFocusWarning, borderHoverWarning, colorFocusError, boxShadowFocusError, borderError, borderFocusError, borderHoverError, clearSize, clearColor, clearColorHover, clearColorPressed, iconColor, iconColorDisabled, suffixTextColor, countTextColor, countTextColorDisabled, iconColorHover, iconColorPressed, loadingColor, loadingColorError, loadingColorWarning, [createKey("padding", size2)]: padding, [createKey("fontSize", size2)]: fontSize2, [createKey("height", size2)]: height } } = themeRef.value;
      const { left: paddingLeft, right: paddingRight } = getMargin(padding);
      return {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-count-text-color": countTextColor,
        "--n-count-text-color-disabled": countTextColorDisabled,
        "--n-color": color,
        "--n-font-size": fontSize2,
        "--n-border-radius": borderRadius,
        "--n-height": height,
        "--n-padding-left": paddingLeft,
        "--n-padding-right": paddingRight,
        "--n-text-color": textColor,
        "--n-caret-color": caretColor,
        "--n-text-decoration-color": textDecorationColor,
        "--n-border": border,
        "--n-border-disabled": borderDisabled,
        "--n-border-hover": borderHover,
        "--n-border-focus": borderFocus,
        "--n-placeholder-color": placeholderColor,
        "--n-placeholder-color-disabled": placeholderColorDisabled,
        "--n-icon-size": iconSize,
        "--n-line-height-textarea": lineHeightTextarea,
        "--n-color-disabled": colorDisabled,
        "--n-color-focus": colorFocus,
        "--n-text-color-disabled": textColorDisabled,
        "--n-box-shadow-focus": boxShadowFocus,
        "--n-loading-color": loadingColor,
        // form warning
        "--n-caret-color-warning": caretColorWarning,
        "--n-color-focus-warning": colorFocusWarning,
        "--n-box-shadow-focus-warning": boxShadowFocusWarning,
        "--n-border-warning": borderWarning,
        "--n-border-focus-warning": borderFocusWarning,
        "--n-border-hover-warning": borderHoverWarning,
        "--n-loading-color-warning": loadingColorWarning,
        // form error
        "--n-caret-color-error": caretColorError,
        "--n-color-focus-error": colorFocusError,
        "--n-box-shadow-focus-error": boxShadowFocusError,
        "--n-border-error": borderError,
        "--n-border-focus-error": borderFocusError,
        "--n-border-hover-error": borderHoverError,
        "--n-loading-color-error": loadingColorError,
        // clear-button
        "--n-clear-color": clearColor,
        "--n-clear-size": clearSize,
        "--n-clear-color-hover": clearColorHover,
        "--n-clear-color-pressed": clearColorPressed,
        "--n-icon-color": iconColor,
        "--n-icon-color-hover": iconColorHover,
        "--n-icon-color-pressed": iconColorPressed,
        "--n-icon-color-disabled": iconColorDisabled,
        "--n-suffix-text-color": suffixTextColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("input", computed(() => {
      const { value: size2 } = mergedSizeRef;
      return size2[0];
    }), cssVarsRef, props) : void 0;
    return Object.assign(Object.assign({}, exposedProps), {
      // DOM ref
      wrapperElRef,
      inputElRef,
      inputMirrorElRef,
      inputEl2Ref,
      textareaElRef,
      textareaMirrorElRef,
      textareaScrollbarInstRef,
      // value
      rtlEnabled: rtlEnabledRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      passwordVisible: passwordVisibleRef,
      mergedPlaceholder: mergedPlaceholderRef,
      showPlaceholder1: showPlaceholder1Ref,
      showPlaceholder2: showPlaceholder2Ref,
      mergedFocus: mergedFocusRef,
      isComposing: isComposingRef,
      activated: activatedRef,
      showClearButton,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      textDecorationStyle: textDecorationStyleRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      mergedShowPasswordOn: mergedShowPasswordOnRef,
      placeholderStyle: placeholderStyleRef,
      mergedStatus: mergedStatusRef,
      textAreaScrollContainerWidth: textAreaScrollContainerWidthRef,
      // methods
      handleTextAreaScroll,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
      handleInputBlur,
      handleInputFocus,
      handleWrapperBlur,
      handleWrapperFocus,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseDown,
      handleChange,
      handleClick,
      handleClear,
      handlePasswordToggleClick,
      handlePasswordToggleMousedown,
      handleWrapperKeydown,
      handleTextAreaMirrorResize,
      getTextareaScrollContainer: () => {
        return textareaElRef.value;
      },
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a, _b;
    const { mergedClsPrefix, mergedStatus, themeClass, type, countGraphemes, onRender } = this;
    const $slots = this.$slots;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h(
      "div",
      { ref: "wrapperElRef", class: [
        `${mergedClsPrefix}-input`,
        themeClass,
        mergedStatus && `${mergedClsPrefix}-input--${mergedStatus}-status`,
        {
          [`${mergedClsPrefix}-input--rtl`]: this.rtlEnabled,
          [`${mergedClsPrefix}-input--disabled`]: this.mergedDisabled,
          [`${mergedClsPrefix}-input--textarea`]: type === "textarea",
          [`${mergedClsPrefix}-input--resizable`]: this.resizable && !this.autosize,
          [`${mergedClsPrefix}-input--autosize`]: this.autosize,
          [`${mergedClsPrefix}-input--round`]: this.round && !(type === "textarea"),
          [`${mergedClsPrefix}-input--pair`]: this.pair,
          [`${mergedClsPrefix}-input--focus`]: this.mergedFocus,
          [`${mergedClsPrefix}-input--stateful`]: this.stateful
        }
      ], style: this.cssVars, tabindex: !this.mergedDisabled && this.passivelyActivated && !this.activated ? 0 : void 0, onFocus: this.handleWrapperFocus, onBlur: this.handleWrapperBlur, onClick: this.handleClick, onMousedown: this.handleMouseDown, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd, onKeyup: this.onKeyup, onKeydown: this.handleWrapperKeydown },
      h(
        "div",
        { class: `${mergedClsPrefix}-input-wrapper` },
        resolveWrappedSlot($slots.prefix, (children) => children && h("div", { class: `${mergedClsPrefix}-input__prefix` }, children)),
        type === "textarea" ? h(NScrollbar, { ref: "textareaScrollbarInstRef", class: `${mergedClsPrefix}-input__textarea`, container: this.getTextareaScrollContainer, triggerDisplayManually: true, useUnifiedContainer: true, internalHoistYRail: true }, {
          default: () => {
            var _a2, _b2;
            const { textAreaScrollContainerWidth } = this;
            const scrollContainerWidthStyle = {
              width: this.autosize && textAreaScrollContainerWidth && `${textAreaScrollContainerWidth}px`
            };
            return h(
              Fragment,
              null,
              h("textarea", Object.assign({}, this.inputProps, { ref: "textareaElRef", class: [
                `${mergedClsPrefix}-input__textarea-el`,
                (_a2 = this.inputProps) === null || _a2 === void 0 ? void 0 : _a2.class
              ], autofocus: this.autofocus, rows: Number(this.rows), placeholder: this.placeholder, value: this.mergedValue, disabled: this.mergedDisabled, maxlength: countGraphemes ? void 0 : this.maxlength, minlength: countGraphemes ? void 0 : this.minlength, readonly: this.readonly, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, style: [
                this.textDecorationStyle[0],
                (_b2 = this.inputProps) === null || _b2 === void 0 ? void 0 : _b2.style,
                scrollContainerWidthStyle
              ], onBlur: this.handleInputBlur, onFocus: (e) => {
                this.handleInputFocus(e, 2);
              }, onInput: this.handleInput, onChange: this.handleChange, onScroll: this.handleTextAreaScroll })),
              this.showPlaceholder1 ? h("div", { class: `${mergedClsPrefix}-input__placeholder`, style: [
                this.placeholderStyle,
                scrollContainerWidthStyle
              ], key: "placeholder" }, this.mergedPlaceholder[0]) : null,
              this.autosize ? h(VResizeObserver, { onResize: this.handleTextAreaMirrorResize }, {
                default: () => h("div", { ref: "textareaMirrorElRef", class: `${mergedClsPrefix}-input__textarea-mirror`, key: "mirror" })
              }) : null
            );
          }
        }) : h(
          "div",
          { class: `${mergedClsPrefix}-input__input` },
          h("input", Object.assign({ type: type === "password" && this.mergedShowPasswordOn && this.passwordVisible ? "text" : type }, this.inputProps, { ref: "inputElRef", class: [
            `${mergedClsPrefix}-input__input-el`,
            (_a = this.inputProps) === null || _a === void 0 ? void 0 : _a.class
          ], style: [
            this.textDecorationStyle[0],
            (_b = this.inputProps) === null || _b === void 0 ? void 0 : _b.style
          ], tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, placeholder: this.mergedPlaceholder[0], disabled: this.mergedDisabled, maxlength: countGraphemes ? void 0 : this.maxlength, minlength: countGraphemes ? void 0 : this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[0] : this.mergedValue, readonly: this.readonly, autofocus: this.autofocus, size: this.attrSize, onBlur: this.handleInputBlur, onFocus: (e) => {
            this.handleInputFocus(e, 0);
          }, onInput: (e) => {
            this.handleInput(e, 0);
          }, onChange: (e) => {
            this.handleChange(e, 0);
          } })),
          this.showPlaceholder1 ? h(
            "div",
            { class: `${mergedClsPrefix}-input__placeholder` },
            h("span", null, this.mergedPlaceholder[0])
          ) : null,
          this.autosize ? h("div", { class: `${mergedClsPrefix}-input__input-mirror`, key: "mirror", ref: "inputMirrorElRef" }, " ") : null
        ),
        !this.pair && resolveWrappedSlot($slots.suffix, (children) => {
          return children || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? h("div", { class: `${mergedClsPrefix}-input__suffix` }, [
            resolveWrappedSlot($slots["clear-icon-placeholder"], (children2) => {
              return (this.clearable || children2) && h(NBaseClear, { clsPrefix: mergedClsPrefix, show: this.showClearButton, onClear: this.handleClear }, {
                placeholder: () => children2,
                icon: () => {
                  var _a2, _b2;
                  return (_b2 = (_a2 = this.$slots)["clear-icon"]) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
                }
              });
            }),
            !this.internalLoadingBeforeSuffix ? children : null,
            this.loading !== void 0 ? h(NBaseSuffix, { clsPrefix: mergedClsPrefix, loading: this.loading, showArrow: false, showClear: false, style: this.cssVars }) : null,
            this.internalLoadingBeforeSuffix ? children : null,
            this.showCount && this.type !== "textarea" ? h(WordCount, null, {
              default: (props) => {
                var _a2;
                return (_a2 = $slots.count) === null || _a2 === void 0 ? void 0 : _a2.call($slots, props);
              }
            }) : null,
            this.mergedShowPasswordOn && this.type === "password" ? h("div", { class: `${mergedClsPrefix}-input__eye`, onMousedown: this.handlePasswordToggleMousedown, onClick: this.handlePasswordToggleClick }, this.passwordVisible ? resolveSlot($slots["password-visible-icon"], () => [
              h(NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => h(EyeIcon, null) })
            ]) : resolveSlot($slots["password-invisible-icon"], () => [
              h(NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => h(EyeOffIcon, null) })
            ])) : null
          ]) : null;
        })
      ),
      this.pair ? h("span", { class: `${mergedClsPrefix}-input__separator` }, resolveSlot($slots.separator, () => [this.separator])) : null,
      this.pair ? h(
        "div",
        { class: `${mergedClsPrefix}-input-wrapper` },
        h(
          "div",
          { class: `${mergedClsPrefix}-input__input` },
          h("input", { ref: "inputEl2Ref", type: this.type, class: `${mergedClsPrefix}-input__input-el`, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, placeholder: this.mergedPlaceholder[1], disabled: this.mergedDisabled, maxlength: countGraphemes ? void 0 : this.maxlength, minlength: countGraphemes ? void 0 : this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[1] : void 0, readonly: this.readonly, style: this.textDecorationStyle[1], onBlur: this.handleInputBlur, onFocus: (e) => {
            this.handleInputFocus(e, 1);
          }, onInput: (e) => {
            this.handleInput(e, 1);
          }, onChange: (e) => {
            this.handleChange(e, 1);
          } }),
          this.showPlaceholder2 ? h(
            "div",
            { class: `${mergedClsPrefix}-input__placeholder` },
            h("span", null, this.mergedPlaceholder[1])
          ) : null
        ),
        resolveWrappedSlot($slots.suffix, (children) => {
          return (this.clearable || children) && h("div", { class: `${mergedClsPrefix}-input__suffix` }, [
            this.clearable && h(NBaseClear, { clsPrefix: mergedClsPrefix, show: this.showClearButton, onClear: this.handleClear }, {
              icon: () => {
                var _a2;
                return (_a2 = $slots["clear-icon"]) === null || _a2 === void 0 ? void 0 : _a2.call($slots);
              },
              placeholder: () => {
                var _a2;
                return (_a2 = $slots["clear-icon-placeholder"]) === null || _a2 === void 0 ? void 0 : _a2.call($slots);
              }
            }),
            children
          ]);
        })
      ) : null,
      this.mergedBordered ? h("div", { class: `${mergedClsPrefix}-input__border` }) : null,
      this.mergedBordered ? h("div", { class: `${mergedClsPrefix}-input__state-border` }) : null,
      this.showCount && type === "textarea" ? h(WordCount, null, {
        default: (props) => {
          var _a2;
          const { renderCount } = this;
          if (renderCount) {
            return renderCount(props);
          }
          return (_a2 = $slots.count) === null || _a2 === void 0 ? void 0 : _a2.call($slots, props);
        }
      }) : null
    );
  }
});
function createHoverColor(rgb) {
  return composite(rgb, [255, 255, 255, 0.16]);
}
function createPressedColor(rgb) {
  return composite(rgb, [0, 0, 0, 0.12]);
}
const buttonGroupInjectionKey = createInjectionKey("n-button-group");
const commonVariables$4 = {
  paddingTiny: "0 6px",
  paddingSmall: "0 10px",
  paddingMedium: "0 14px",
  paddingLarge: "0 18px",
  paddingRoundTiny: "0 10px",
  paddingRoundSmall: "0 14px",
  paddingRoundMedium: "0 18px",
  paddingRoundLarge: "0 22px",
  iconMarginTiny: "6px",
  iconMarginSmall: "6px",
  iconMarginMedium: "6px",
  iconMarginLarge: "6px",
  iconSizeTiny: "14px",
  iconSizeSmall: "18px",
  iconSizeMedium: "18px",
  iconSizeLarge: "20px",
  rippleDuration: ".6s"
};
const self$a = (vars) => {
  const { heightTiny, heightSmall, heightMedium, heightLarge, borderRadius, fontSizeTiny, fontSizeSmall, fontSizeMedium, fontSizeLarge, opacityDisabled, textColor2, textColor3, primaryColorHover, primaryColorPressed, borderColor, primaryColor, baseColor, infoColor, infoColorHover, infoColorPressed, successColor, successColorHover, successColorPressed, warningColor, warningColorHover, warningColorPressed, errorColor, errorColorHover, errorColorPressed, fontWeight, buttonColor2, buttonColor2Hover, buttonColor2Pressed, fontWeightStrong } = vars;
  return Object.assign(Object.assign({}, commonVariables$4), {
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    borderRadiusTiny: borderRadius,
    borderRadiusSmall: borderRadius,
    borderRadiusMedium: borderRadius,
    borderRadiusLarge: borderRadius,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    opacityDisabled,
    // secondary
    colorOpacitySecondary: "0.16",
    colorOpacitySecondaryHover: "0.22",
    colorOpacitySecondaryPressed: "0.28",
    colorSecondary: buttonColor2,
    colorSecondaryHover: buttonColor2Hover,
    colorSecondaryPressed: buttonColor2Pressed,
    // tertiary
    colorTertiary: buttonColor2,
    colorTertiaryHover: buttonColor2Hover,
    colorTertiaryPressed: buttonColor2Pressed,
    // quaternary
    colorQuaternary: "#0000",
    colorQuaternaryHover: buttonColor2Hover,
    colorQuaternaryPressed: buttonColor2Pressed,
    // default type
    color: "#0000",
    colorHover: "#0000",
    colorPressed: "#0000",
    colorFocus: "#0000",
    colorDisabled: "#0000",
    textColor: textColor2,
    textColorTertiary: textColor3,
    textColorHover: primaryColorHover,
    textColorPressed: primaryColorPressed,
    textColorFocus: primaryColorHover,
    textColorDisabled: textColor2,
    textColorText: textColor2,
    textColorTextHover: primaryColorHover,
    textColorTextPressed: primaryColorPressed,
    textColorTextFocus: primaryColorHover,
    textColorTextDisabled: textColor2,
    textColorGhost: textColor2,
    textColorGhostHover: primaryColorHover,
    textColorGhostPressed: primaryColorPressed,
    textColorGhostFocus: primaryColorHover,
    textColorGhostDisabled: textColor2,
    border: `1px solid ${borderColor}`,
    borderHover: `1px solid ${primaryColorHover}`,
    borderPressed: `1px solid ${primaryColorPressed}`,
    borderFocus: `1px solid ${primaryColorHover}`,
    borderDisabled: `1px solid ${borderColor}`,
    rippleColor: primaryColor,
    // primary
    colorPrimary: primaryColor,
    colorHoverPrimary: primaryColorHover,
    colorPressedPrimary: primaryColorPressed,
    colorFocusPrimary: primaryColorHover,
    colorDisabledPrimary: primaryColor,
    textColorPrimary: baseColor,
    textColorHoverPrimary: baseColor,
    textColorPressedPrimary: baseColor,
    textColorFocusPrimary: baseColor,
    textColorDisabledPrimary: baseColor,
    textColorTextPrimary: primaryColor,
    textColorTextHoverPrimary: primaryColorHover,
    textColorTextPressedPrimary: primaryColorPressed,
    textColorTextFocusPrimary: primaryColorHover,
    textColorTextDisabledPrimary: textColor2,
    textColorGhostPrimary: primaryColor,
    textColorGhostHoverPrimary: primaryColorHover,
    textColorGhostPressedPrimary: primaryColorPressed,
    textColorGhostFocusPrimary: primaryColorHover,
    textColorGhostDisabledPrimary: primaryColor,
    borderPrimary: `1px solid ${primaryColor}`,
    borderHoverPrimary: `1px solid ${primaryColorHover}`,
    borderPressedPrimary: `1px solid ${primaryColorPressed}`,
    borderFocusPrimary: `1px solid ${primaryColorHover}`,
    borderDisabledPrimary: `1px solid ${primaryColor}`,
    rippleColorPrimary: primaryColor,
    // info
    colorInfo: infoColor,
    colorHoverInfo: infoColorHover,
    colorPressedInfo: infoColorPressed,
    colorFocusInfo: infoColorHover,
    colorDisabledInfo: infoColor,
    textColorInfo: baseColor,
    textColorHoverInfo: baseColor,
    textColorPressedInfo: baseColor,
    textColorFocusInfo: baseColor,
    textColorDisabledInfo: baseColor,
    textColorTextInfo: infoColor,
    textColorTextHoverInfo: infoColorHover,
    textColorTextPressedInfo: infoColorPressed,
    textColorTextFocusInfo: infoColorHover,
    textColorTextDisabledInfo: textColor2,
    textColorGhostInfo: infoColor,
    textColorGhostHoverInfo: infoColorHover,
    textColorGhostPressedInfo: infoColorPressed,
    textColorGhostFocusInfo: infoColorHover,
    textColorGhostDisabledInfo: infoColor,
    borderInfo: `1px solid ${infoColor}`,
    borderHoverInfo: `1px solid ${infoColorHover}`,
    borderPressedInfo: `1px solid ${infoColorPressed}`,
    borderFocusInfo: `1px solid ${infoColorHover}`,
    borderDisabledInfo: `1px solid ${infoColor}`,
    rippleColorInfo: infoColor,
    // success
    colorSuccess: successColor,
    colorHoverSuccess: successColorHover,
    colorPressedSuccess: successColorPressed,
    colorFocusSuccess: successColorHover,
    colorDisabledSuccess: successColor,
    textColorSuccess: baseColor,
    textColorHoverSuccess: baseColor,
    textColorPressedSuccess: baseColor,
    textColorFocusSuccess: baseColor,
    textColorDisabledSuccess: baseColor,
    textColorTextSuccess: successColor,
    textColorTextHoverSuccess: successColorHover,
    textColorTextPressedSuccess: successColorPressed,
    textColorTextFocusSuccess: successColorHover,
    textColorTextDisabledSuccess: textColor2,
    textColorGhostSuccess: successColor,
    textColorGhostHoverSuccess: successColorHover,
    textColorGhostPressedSuccess: successColorPressed,
    textColorGhostFocusSuccess: successColorHover,
    textColorGhostDisabledSuccess: successColor,
    borderSuccess: `1px solid ${successColor}`,
    borderHoverSuccess: `1px solid ${successColorHover}`,
    borderPressedSuccess: `1px solid ${successColorPressed}`,
    borderFocusSuccess: `1px solid ${successColorHover}`,
    borderDisabledSuccess: `1px solid ${successColor}`,
    rippleColorSuccess: successColor,
    // warning
    colorWarning: warningColor,
    colorHoverWarning: warningColorHover,
    colorPressedWarning: warningColorPressed,
    colorFocusWarning: warningColorHover,
    colorDisabledWarning: warningColor,
    textColorWarning: baseColor,
    textColorHoverWarning: baseColor,
    textColorPressedWarning: baseColor,
    textColorFocusWarning: baseColor,
    textColorDisabledWarning: baseColor,
    textColorTextWarning: warningColor,
    textColorTextHoverWarning: warningColorHover,
    textColorTextPressedWarning: warningColorPressed,
    textColorTextFocusWarning: warningColorHover,
    textColorTextDisabledWarning: textColor2,
    textColorGhostWarning: warningColor,
    textColorGhostHoverWarning: warningColorHover,
    textColorGhostPressedWarning: warningColorPressed,
    textColorGhostFocusWarning: warningColorHover,
    textColorGhostDisabledWarning: warningColor,
    borderWarning: `1px solid ${warningColor}`,
    borderHoverWarning: `1px solid ${warningColorHover}`,
    borderPressedWarning: `1px solid ${warningColorPressed}`,
    borderFocusWarning: `1px solid ${warningColorHover}`,
    borderDisabledWarning: `1px solid ${warningColor}`,
    rippleColorWarning: warningColor,
    // error
    colorError: errorColor,
    colorHoverError: errorColorHover,
    colorPressedError: errorColorPressed,
    colorFocusError: errorColorHover,
    colorDisabledError: errorColor,
    textColorError: baseColor,
    textColorHoverError: baseColor,
    textColorPressedError: baseColor,
    textColorFocusError: baseColor,
    textColorDisabledError: baseColor,
    textColorTextError: errorColor,
    textColorTextHoverError: errorColorHover,
    textColorTextPressedError: errorColorPressed,
    textColorTextFocusError: errorColorHover,
    textColorTextDisabledError: textColor2,
    textColorGhostError: errorColor,
    textColorGhostHoverError: errorColorHover,
    textColorGhostPressedError: errorColorPressed,
    textColorGhostFocusError: errorColorHover,
    textColorGhostDisabledError: errorColor,
    borderError: `1px solid ${errorColor}`,
    borderHoverError: `1px solid ${errorColorHover}`,
    borderPressedError: `1px solid ${errorColorPressed}`,
    borderFocusError: `1px solid ${errorColorHover}`,
    borderDisabledError: `1px solid ${errorColor}`,
    rippleColorError: errorColor,
    waveOpacity: "0.6",
    fontWeight,
    fontWeightStrong
  });
};
const buttonLight = {
  name: "Button",
  common: commonLight,
  self: self$a
};
const buttonLight$1 = buttonLight;
const style$9 = c$1([cB("button", `
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [cM("color", [cE("border", {
  borderColor: "var(--n-border-color)"
}), cM("disabled", [cE("border", {
  borderColor: "var(--n-border-color-disabled)"
})]), cNotM("disabled", [c$1("&:focus", [cE("state-border", {
  borderColor: "var(--n-border-color-focus)"
})]), c$1("&:hover", [cE("state-border", {
  borderColor: "var(--n-border-color-hover)"
})]), c$1("&:active", [cE("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})]), cM("pressed", [cE("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})])])]), cM("disabled", {
  backgroundColor: "var(--n-color-disabled)",
  color: "var(--n-text-color-disabled)"
}, [cE("border", {
  border: "var(--n-border-disabled)"
})]), cNotM("disabled", [c$1("&:focus", {
  backgroundColor: "var(--n-color-focus)",
  color: "var(--n-text-color-focus)"
}, [cE("state-border", {
  border: "var(--n-border-focus)"
})]), c$1("&:hover", {
  backgroundColor: "var(--n-color-hover)",
  color: "var(--n-text-color-hover)"
}, [cE("state-border", {
  border: "var(--n-border-hover)"
})]), c$1("&:active", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [cE("state-border", {
  border: "var(--n-border-pressed)"
})]), cM("pressed", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [cE("state-border", {
  border: "var(--n-border-pressed)"
})])]), cM("loading", "cursor: wait;"), cB("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [cM("active", {
  zIndex: 1,
  animationName: "button-wave-spread, button-wave-opacity"
})]), isBrowser$1 && "MozBoxSizing" in document.createElement("div").style ? c$1("&::moz-focus-inner", {
  border: 0
}) : null, cE("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), cE("border", {
  border: "var(--n-border)"
}), cE("state-border", {
  border: "var(--n-border)",
  borderColor: "#0000",
  zIndex: 1
}), cE("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [cB("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [iconSwitchTransition({
  top: "50%",
  originalTransform: "translateY(-50%)"
})]), fadeInWidthExpandTransition()]), cE("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [c$1("~", [cE("icon", {
  margin: "var(--n-icon-margin)",
  marginRight: 0
})])]), cM("block", `
 display: flex;
 width: 100%;
 `), cM("dashed", [cE("border, state-border", {
  borderStyle: "dashed !important"
})]), cM("disabled", {
  cursor: "not-allowed",
  opacity: "var(--n-opacity-disabled)"
})]), c$1("@keyframes button-wave-spread", {
  from: {
    boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
  },
  to: {
    // don't use exact 5px since chrome will display the animation with glitches
    boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
  }
}), c$1("@keyframes button-wave-opacity", {
  from: {
    opacity: "var(--n-wave-opacity)"
  },
  to: {
    opacity: 0
  }
})]);
const buttonProps = Object.assign(Object.assign({}, useTheme.props), { color: String, textColor: String, text: Boolean, block: Boolean, loading: Boolean, disabled: Boolean, circle: Boolean, size: String, ghost: Boolean, round: Boolean, secondary: Boolean, tertiary: Boolean, quaternary: Boolean, strong: Boolean, focusable: {
  type: Boolean,
  default: true
}, keyboard: {
  type: Boolean,
  default: true
}, tag: {
  type: String,
  default: "button"
}, type: {
  type: String,
  default: "default"
}, dashed: Boolean, renderIcon: Function, iconPlacement: {
  type: String,
  default: "left"
}, attrType: {
  type: String,
  default: "button"
}, bordered: {
  type: Boolean,
  default: true
}, onClick: [Function, Array], nativeFocusBehavior: {
  type: Boolean,
  default: !isSafari
} });
const Button = /* @__PURE__ */ defineComponent({
  name: "Button",
  props: buttonProps,
  setup(props) {
    const selfElRef = ref(null);
    const waveElRef = ref(null);
    const enterPressedRef = ref(false);
    const showBorderRef = useMemo(() => {
      return !props.quaternary && !props.tertiary && !props.secondary && !props.text && (!props.color || props.ghost || props.dashed) && props.bordered;
    });
    const NButtonGroup = inject(buttonGroupInjectionKey, {});
    const { mergedSizeRef } = useFormItem({}, {
      defaultSize: "medium",
      mergedSize: (NFormItem) => {
        const { size: size2 } = props;
        if (size2)
          return size2;
        const { size: buttonGroupSize } = NButtonGroup;
        if (buttonGroupSize)
          return buttonGroupSize;
        const { mergedSize: formItemSize } = NFormItem || {};
        if (formItemSize) {
          return formItemSize.value;
        }
        return "medium";
      }
    });
    const mergedFocusableRef = computed(() => {
      return props.focusable && !props.disabled;
    });
    const handleMousedown = (e) => {
      var _a;
      if (!mergedFocusableRef.value) {
        e.preventDefault();
      }
      if (props.nativeFocusBehavior) {
        return;
      }
      e.preventDefault();
      if (props.disabled) {
        return;
      }
      if (mergedFocusableRef.value) {
        (_a = selfElRef.value) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
      }
    };
    const handleClick = (e) => {
      var _a;
      if (!props.disabled && !props.loading) {
        const { onClick } = props;
        if (onClick)
          call(onClick, e);
        if (!props.text) {
          (_a = waveElRef.value) === null || _a === void 0 ? void 0 : _a.play();
        }
      }
    };
    const handleKeyup = (e) => {
      switch (e.key) {
        case "Enter":
          if (!props.keyboard) {
            return;
          }
          enterPressedRef.value = false;
      }
    };
    const handleKeydown = (e) => {
      switch (e.key) {
        case "Enter":
          if (!props.keyboard || props.loading) {
            e.preventDefault();
            return;
          }
          enterPressedRef.value = true;
      }
    };
    const handleBlur = () => {
      enterPressedRef.value = false;
    };
    const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef } = useConfig(props);
    const themeRef = useTheme("Button", "-button", style$9, buttonLight$1, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl("Button", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const theme = themeRef.value;
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2, cubicBezierEaseOut: cubicBezierEaseOut2 }, self: self2 } = theme;
      const { rippleDuration, opacityDisabled, fontWeight, fontWeightStrong } = self2;
      const size2 = mergedSizeRef.value;
      const { dashed, type, ghost, text, color, round, circle, textColor, secondary, tertiary, quaternary, strong } = props;
      const fontProps = {
        "font-weight": strong ? fontWeightStrong : fontWeight
      };
      let colorProps = {
        "--n-color": "initial",
        "--n-color-hover": "initial",
        "--n-color-pressed": "initial",
        "--n-color-focus": "initial",
        "--n-color-disabled": "initial",
        "--n-ripple-color": "initial",
        "--n-text-color": "initial",
        "--n-text-color-hover": "initial",
        "--n-text-color-pressed": "initial",
        "--n-text-color-focus": "initial",
        "--n-text-color-disabled": "initial"
      };
      const typeIsTertiary = type === "tertiary";
      const typeIsDefault = type === "default";
      const mergedType = typeIsTertiary ? "default" : type;
      if (text) {
        const propTextColor = textColor || color;
        const mergedTextColor = propTextColor || self2[createKey("textColorText", mergedType)];
        colorProps = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": "#0000",
          "--n-text-color": mergedTextColor,
          "--n-text-color-hover": propTextColor ? createHoverColor(propTextColor) : self2[createKey("textColorTextHover", mergedType)],
          "--n-text-color-pressed": propTextColor ? createPressedColor(propTextColor) : self2[createKey("textColorTextPressed", mergedType)],
          "--n-text-color-focus": propTextColor ? createHoverColor(propTextColor) : self2[createKey("textColorTextHover", mergedType)],
          "--n-text-color-disabled": propTextColor || self2[createKey("textColorTextDisabled", mergedType)]
        };
      } else if (ghost || dashed) {
        const mergedTextColor = textColor || color;
        colorProps = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": color || self2[createKey("rippleColor", mergedType)],
          "--n-text-color": mergedTextColor || self2[createKey("textColorGhost", mergedType)],
          "--n-text-color-hover": mergedTextColor ? createHoverColor(mergedTextColor) : self2[createKey("textColorGhostHover", mergedType)],
          "--n-text-color-pressed": mergedTextColor ? createPressedColor(mergedTextColor) : self2[createKey("textColorGhostPressed", mergedType)],
          "--n-text-color-focus": mergedTextColor ? createHoverColor(mergedTextColor) : self2[createKey("textColorGhostHover", mergedType)],
          "--n-text-color-disabled": mergedTextColor || self2[createKey("textColorGhostDisabled", mergedType)]
        };
      } else if (secondary) {
        const typeTextColor = typeIsDefault ? self2.textColor : typeIsTertiary ? self2.textColorTertiary : self2[createKey("color", mergedType)];
        const mergedTextColor = color || typeTextColor;
        const isColoredType = type !== "default" && type !== "tertiary";
        colorProps = {
          "--n-color": isColoredType ? changeColor(mergedTextColor, {
            alpha: Number(self2.colorOpacitySecondary)
          }) : self2.colorSecondary,
          "--n-color-hover": isColoredType ? changeColor(mergedTextColor, {
            alpha: Number(self2.colorOpacitySecondaryHover)
          }) : self2.colorSecondaryHover,
          "--n-color-pressed": isColoredType ? changeColor(mergedTextColor, {
            alpha: Number(self2.colorOpacitySecondaryPressed)
          }) : self2.colorSecondaryPressed,
          "--n-color-focus": isColoredType ? changeColor(mergedTextColor, {
            alpha: Number(self2.colorOpacitySecondaryHover)
          }) : self2.colorSecondaryHover,
          "--n-color-disabled": self2.colorSecondary,
          "--n-ripple-color": "#0000",
          "--n-text-color": mergedTextColor,
          "--n-text-color-hover": mergedTextColor,
          "--n-text-color-pressed": mergedTextColor,
          "--n-text-color-focus": mergedTextColor,
          "--n-text-color-disabled": mergedTextColor
        };
      } else if (tertiary || quaternary) {
        const typeColor = typeIsDefault ? self2.textColor : typeIsTertiary ? self2.textColorTertiary : self2[createKey("color", mergedType)];
        const mergedColor = color || typeColor;
        if (tertiary) {
          colorProps["--n-color"] = self2.colorTertiary;
          colorProps["--n-color-hover"] = self2.colorTertiaryHover;
          colorProps["--n-color-pressed"] = self2.colorTertiaryPressed;
          colorProps["--n-color-focus"] = self2.colorSecondaryHover;
          colorProps["--n-color-disabled"] = self2.colorTertiary;
        } else {
          colorProps["--n-color"] = self2.colorQuaternary;
          colorProps["--n-color-hover"] = self2.colorQuaternaryHover;
          colorProps["--n-color-pressed"] = self2.colorQuaternaryPressed;
          colorProps["--n-color-focus"] = self2.colorQuaternaryHover;
          colorProps["--n-color-disabled"] = self2.colorQuaternary;
        }
        colorProps["--n-ripple-color"] = "#0000";
        colorProps["--n-text-color"] = mergedColor;
        colorProps["--n-text-color-hover"] = mergedColor;
        colorProps["--n-text-color-pressed"] = mergedColor;
        colorProps["--n-text-color-focus"] = mergedColor;
        colorProps["--n-text-color-disabled"] = mergedColor;
      } else {
        colorProps = {
          "--n-color": color || self2[createKey("color", mergedType)],
          "--n-color-hover": color ? createHoverColor(color) : self2[createKey("colorHover", mergedType)],
          "--n-color-pressed": color ? createPressedColor(color) : self2[createKey("colorPressed", mergedType)],
          "--n-color-focus": color ? createHoverColor(color) : self2[createKey("colorFocus", mergedType)],
          "--n-color-disabled": color || self2[createKey("colorDisabled", mergedType)],
          "--n-ripple-color": color || self2[createKey("rippleColor", mergedType)],
          "--n-text-color": textColor || (color ? self2.textColorPrimary : typeIsTertiary ? self2.textColorTertiary : self2[createKey("textColor", mergedType)]),
          "--n-text-color-hover": textColor || (color ? self2.textColorHoverPrimary : self2[createKey("textColorHover", mergedType)]),
          "--n-text-color-pressed": textColor || (color ? self2.textColorPressedPrimary : self2[createKey("textColorPressed", mergedType)]),
          "--n-text-color-focus": textColor || (color ? self2.textColorFocusPrimary : self2[createKey("textColorFocus", mergedType)]),
          "--n-text-color-disabled": textColor || (color ? self2.textColorDisabledPrimary : self2[createKey("textColorDisabled", mergedType)])
        };
      }
      let borderProps = {
        "--n-border": "initial",
        "--n-border-hover": "initial",
        "--n-border-pressed": "initial",
        "--n-border-focus": "initial",
        "--n-border-disabled": "initial"
      };
      if (text) {
        borderProps = {
          "--n-border": "none",
          "--n-border-hover": "none",
          "--n-border-pressed": "none",
          "--n-border-focus": "none",
          "--n-border-disabled": "none"
        };
      } else {
        borderProps = {
          "--n-border": self2[createKey("border", mergedType)],
          "--n-border-hover": self2[createKey("borderHover", mergedType)],
          "--n-border-pressed": self2[createKey("borderPressed", mergedType)],
          "--n-border-focus": self2[createKey("borderFocus", mergedType)],
          "--n-border-disabled": self2[createKey("borderDisabled", mergedType)]
        };
      }
      const { [createKey("height", size2)]: height, [createKey("fontSize", size2)]: fontSize2, [createKey("padding", size2)]: padding, [createKey("paddingRound", size2)]: paddingRound, [createKey("iconSize", size2)]: iconSize, [createKey("borderRadius", size2)]: borderRadius, [createKey("iconMargin", size2)]: iconMargin, waveOpacity } = self2;
      const sizeProps = {
        "--n-width": circle && !text ? height : "initial",
        "--n-height": text ? "initial" : height,
        "--n-font-size": fontSize2,
        "--n-padding": circle ? "initial" : text ? "initial" : round ? paddingRound : padding,
        "--n-icon-size": iconSize,
        "--n-icon-margin": iconMargin,
        "--n-border-radius": text ? "initial" : circle || round ? height : borderRadius
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({ "--n-bezier": cubicBezierEaseInOut2, "--n-bezier-ease-out": cubicBezierEaseOut2, "--n-ripple-duration": rippleDuration, "--n-opacity-disabled": opacityDisabled, "--n-wave-opacity": waveOpacity }, fontProps), colorProps), borderProps), sizeProps);
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("button", computed(() => {
      let hash = "";
      const { dashed, type, ghost, text, color, round, circle, textColor, secondary, tertiary, quaternary, strong } = props;
      if (dashed)
        hash += "a";
      if (ghost)
        hash += "b";
      if (text)
        hash += "c";
      if (round)
        hash += "d";
      if (circle)
        hash += "e";
      if (secondary)
        hash += "f";
      if (tertiary)
        hash += "g";
      if (quaternary)
        hash += "h";
      if (strong)
        hash += "i";
      if (color)
        hash += "j" + color2Class(color);
      if (textColor)
        hash += "k" + color2Class(textColor);
      const { value: size2 } = mergedSizeRef;
      hash += "l" + size2[0];
      hash += "m" + type[0];
      return hash;
    }), cssVarsRef, props) : void 0;
    return {
      selfElRef,
      waveElRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedFocusable: mergedFocusableRef,
      mergedSize: mergedSizeRef,
      showBorder: showBorderRef,
      enterPressed: enterPressedRef,
      rtlEnabled: rtlEnabledRef,
      handleMousedown,
      handleKeydown,
      handleBlur,
      handleKeyup,
      handleClick,
      customColorCssVars: computed(() => {
        const { color } = props;
        if (!color)
          return null;
        const hoverColor = createHoverColor(color);
        return {
          "--n-border-color": color,
          "--n-border-color-hover": hoverColor,
          "--n-border-color-pressed": createPressedColor(color),
          "--n-border-color-focus": hoverColor,
          "--n-border-color-disabled": color
        };
      }),
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const { mergedClsPrefix, tag: Component, onRender } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const children = resolveWrappedSlot(this.$slots.default, (children2) => children2 && h("span", { class: `${mergedClsPrefix}-button__content` }, children2));
    return h(
      Component,
      { ref: "selfElRef", class: [
        this.themeClass,
        `${mergedClsPrefix}-button`,
        `${mergedClsPrefix}-button--${this.type}-type`,
        `${mergedClsPrefix}-button--${this.mergedSize}-type`,
        this.rtlEnabled && `${mergedClsPrefix}-button--rtl`,
        this.disabled && `${mergedClsPrefix}-button--disabled`,
        this.block && `${mergedClsPrefix}-button--block`,
        this.enterPressed && `${mergedClsPrefix}-button--pressed`,
        !this.text && this.dashed && `${mergedClsPrefix}-button--dashed`,
        this.color && `${mergedClsPrefix}-button--color`,
        this.secondary && `${mergedClsPrefix}-button--secondary`,
        this.loading && `${mergedClsPrefix}-button--loading`,
        this.ghost && `${mergedClsPrefix}-button--ghost`
        // required for button group border collapse
      ], tabindex: this.mergedFocusable ? 0 : -1, type: this.attrType, style: this.cssVars, disabled: this.disabled, onClick: this.handleClick, onBlur: this.handleBlur, onMousedown: this.handleMousedown, onKeyup: this.handleKeyup, onKeydown: this.handleKeydown },
      this.iconPlacement === "right" && children,
      h(NFadeInExpandTransition, { width: true }, {
        default: () => resolveWrappedSlot(this.$slots.icon, (children2) => (this.loading || this.renderIcon || children2) && h(
          "span",
          { class: `${mergedClsPrefix}-button__icon`, style: {
            margin: isSlotEmpty(this.$slots.default) ? "0" : ""
          } },
          h(NIconSwitchTransition, null, {
            default: () => this.loading ? h(NBaseLoading, { clsPrefix: mergedClsPrefix, key: "loading", class: `${mergedClsPrefix}-icon-slot`, strokeWidth: 20 }) : h("div", { key: "icon", class: `${mergedClsPrefix}-icon-slot`, role: "none" }, this.renderIcon ? this.renderIcon() : children2)
          })
        ))
      }),
      this.iconPlacement === "left" && children,
      !this.text ? h(NBaseWave, { ref: "waveElRef", clsPrefix: mergedClsPrefix }) : null,
      this.showBorder ? h("div", { "aria-hidden": true, class: `${mergedClsPrefix}-button__border`, style: this.customColorCssVars }) : null,
      this.showBorder ? h("div", { "aria-hidden": true, class: `${mergedClsPrefix}-button__state-border`, style: this.customColorCssVars }) : null
    );
  }
});
const NButton = Button;
const XButton = Button;
const commonVariables$3 = {
  paddingSmall: "12px 16px 12px",
  paddingMedium: "19px 24px 20px",
  paddingLarge: "23px 32px 24px",
  paddingHuge: "27px 40px 28px",
  titleFontSizeSmall: "16px",
  titleFontSizeMedium: "18px",
  titleFontSizeLarge: "18px",
  titleFontSizeHuge: "18px",
  closeIconSize: "18px",
  closeSize: "22px"
};
const self$9 = (vars) => {
  const { primaryColor, borderRadius, lineHeight: lineHeight2, fontSize: fontSize2, cardColor, textColor2, textColor1, dividerColor, fontWeightStrong, closeIconColor, closeIconColorHover, closeIconColorPressed, closeColorHover, closeColorPressed, modalColor, boxShadow1, popoverColor, actionColor } = vars;
  return Object.assign(Object.assign({}, commonVariables$3), {
    lineHeight: lineHeight2,
    color: cardColor,
    colorModal: modalColor,
    colorPopover: popoverColor,
    colorTarget: primaryColor,
    colorEmbedded: actionColor,
    colorEmbeddedModal: actionColor,
    colorEmbeddedPopover: actionColor,
    textColor: textColor2,
    titleTextColor: textColor1,
    borderColor: dividerColor,
    actionColor,
    titleFontWeight: fontWeightStrong,
    closeColorHover,
    closeColorPressed,
    closeBorderRadius: borderRadius,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    fontSizeSmall: fontSize2,
    fontSizeMedium: fontSize2,
    fontSizeLarge: fontSize2,
    fontSizeHuge: fontSize2,
    boxShadow: boxShadow1,
    borderRadius
  });
};
const cardLight = {
  name: "Card",
  common: commonLight,
  self: self$9
};
const cardLight$1 = cardLight;
const style$8 = c$1([cB("card", `
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [asModal({
  background: "var(--n-color-modal)"
}), cM("hoverable", [c$1("&:hover", "box-shadow: var(--n-box-shadow);")]), cM("content-segmented", [c$1(">", [cE("content", {
  paddingTop: "var(--n-padding-bottom)"
})])]), cM("content-soft-segmented", [c$1(">", [cE("content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])]), cM("footer-segmented", [c$1(">", [cE("footer", {
  paddingTop: "var(--n-padding-bottom)"
})])]), cM("footer-soft-segmented", [c$1(">", [cE("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]), c$1(">", [cB("card-header", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `, [cE("main", `
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `), cE("extra", `
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), cE("close", `
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), cE("action", `
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `), cE("content", "flex: 1; min-width: 0;"), cE("content, footer", `
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `, [c$1("&:first-child", {
  paddingTop: "var(--n-padding-bottom)"
})]), cE("action", `
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]), cB("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `, [c$1("img", `
 display: block;
 width: 100%;
 `)]), cM("bordered", `
 border: 1px solid var(--n-border-color);
 `, [c$1("&:target", "border-color: var(--n-color-target);")]), cM("action-segmented", [c$1(">", [cE("action", [c$1("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), cM("content-segmented, content-soft-segmented", [c$1(">", [cE("content", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [c$1("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), cM("footer-segmented, footer-soft-segmented", [c$1(">", [cE("footer", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [c$1("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), cM("embedded", `
 background-color: var(--n-color-embedded);
 `)]), insideModal(cB("card", `
 background: var(--n-color-modal);
 `, [cM("embedded", `
 background-color: var(--n-color-embedded-modal);
 `)])), insidePopover(cB("card", `
 background: var(--n-color-popover);
 `, [cM("embedded", `
 background-color: var(--n-color-embedded-popover);
 `)]))]);
const cardBaseProps = {
  title: String,
  contentStyle: [Object, String],
  headerStyle: [Object, String],
  headerExtraStyle: [Object, String],
  footerStyle: [Object, String],
  embedded: Boolean,
  segmented: {
    type: [Boolean, Object],
    default: false
  },
  size: {
    type: String,
    default: "medium"
  },
  bordered: {
    type: Boolean,
    default: true
  },
  closable: Boolean,
  hoverable: Boolean,
  role: String,
  onClose: [Function, Array],
  tag: {
    type: String,
    default: "div"
  }
};
const cardProps = Object.assign(Object.assign({}, useTheme.props), cardBaseProps);
const NCard = /* @__PURE__ */ defineComponent({
  name: "Card",
  props: cardProps,
  setup(props) {
    const handleCloseClick = () => {
      const { onClose } = props;
      if (onClose)
        call(onClose);
    };
    const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef } = useConfig(props);
    const themeRef = useTheme("Card", "-card", style$8, cardLight$1, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl("Card", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { size: size2 } = props;
      const { self: { color, colorModal, colorTarget, textColor, titleTextColor, titleFontWeight, borderColor, actionColor, borderRadius, lineHeight: lineHeight2, closeIconColor, closeIconColorHover, closeIconColorPressed, closeColorHover, closeColorPressed, closeBorderRadius, closeIconSize, closeSize, boxShadow, colorPopover, colorEmbedded, colorEmbeddedModal, colorEmbeddedPopover, [createKey("padding", size2)]: padding, [createKey("fontSize", size2)]: fontSize2, [createKey("titleFontSize", size2)]: titleFontSize }, common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 } } = themeRef.value;
      const { top: paddingTop, left: paddingLeft, bottom: paddingBottom } = getMargin(padding);
      return {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-border-radius": borderRadius,
        "--n-color": color,
        "--n-color-modal": colorModal,
        "--n-color-popover": colorPopover,
        "--n-color-embedded": colorEmbedded,
        "--n-color-embedded-modal": colorEmbeddedModal,
        "--n-color-embedded-popover": colorEmbeddedPopover,
        "--n-color-target": colorTarget,
        "--n-text-color": textColor,
        "--n-line-height": lineHeight2,
        "--n-action-color": actionColor,
        "--n-title-text-color": titleTextColor,
        "--n-title-font-weight": titleFontWeight,
        "--n-close-icon-color": closeIconColor,
        "--n-close-icon-color-hover": closeIconColorHover,
        "--n-close-icon-color-pressed": closeIconColorPressed,
        "--n-close-color-hover": closeColorHover,
        "--n-close-color-pressed": closeColorPressed,
        "--n-border-color": borderColor,
        "--n-box-shadow": boxShadow,
        // size
        "--n-padding-top": paddingTop,
        "--n-padding-bottom": paddingBottom,
        "--n-padding-left": paddingLeft,
        "--n-font-size": fontSize2,
        "--n-title-font-size": titleFontSize,
        "--n-close-size": closeSize,
        "--n-close-icon-size": closeIconSize,
        "--n-close-border-radius": closeBorderRadius
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("card", computed(() => {
      return props.size[0];
    }), cssVarsRef, props) : void 0;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const { segmented, bordered, hoverable, mergedClsPrefix, rtlEnabled, onRender, embedded, tag: Component, $slots } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h(
      Component,
      { class: [
        `${mergedClsPrefix}-card`,
        this.themeClass,
        embedded && `${mergedClsPrefix}-card--embedded`,
        {
          [`${mergedClsPrefix}-card--rtl`]: rtlEnabled,
          [`${mergedClsPrefix}-card--content${typeof segmented !== "boolean" && segmented.content === "soft" ? "-soft" : ""}-segmented`]: segmented === true || segmented !== false && segmented.content,
          [`${mergedClsPrefix}-card--footer${typeof segmented !== "boolean" && segmented.footer === "soft" ? "-soft" : ""}-segmented`]: segmented === true || segmented !== false && segmented.footer,
          [`${mergedClsPrefix}-card--action-segmented`]: segmented === true || segmented !== false && segmented.action,
          [`${mergedClsPrefix}-card--bordered`]: bordered,
          [`${mergedClsPrefix}-card--hoverable`]: hoverable
        }
      ], style: this.cssVars, role: this.role },
      resolveWrappedSlot($slots.cover, (children) => children && h("div", { class: `${mergedClsPrefix}-card-cover`, role: "none" }, children)),
      resolveWrappedSlot($slots.header, (children) => {
        return children || this.title || this.closable ? h(
          "div",
          { class: `${mergedClsPrefix}-card-header`, style: this.headerStyle },
          h("div", { class: `${mergedClsPrefix}-card-header__main`, role: "heading" }, children || this.title),
          resolveWrappedSlot($slots["header-extra"], (children2) => children2 && h("div", { class: `${mergedClsPrefix}-card-header__extra`, style: this.headerExtraStyle }, children2)),
          this.closable ? h(NBaseClose, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-card-header__close`, onClick: this.handleCloseClick, absolute: true }) : null
        ) : null;
      }),
      resolveWrappedSlot($slots.default, (children) => children && h("div", { class: `${mergedClsPrefix}-card__content`, style: this.contentStyle, role: "none" }, children)),
      resolveWrappedSlot($slots.footer, (children) => children && [
        h("div", { class: `${mergedClsPrefix}-card__footer`, style: this.footerStyle, role: "none" }, children)
      ]),
      resolveWrappedSlot($slots.action, (children) => children && h("div", { class: `${mergedClsPrefix}-card__action`, role: "none" }, children))
    );
  }
});
const commonVariables$2 = {
  sizeSmall: "14px",
  sizeMedium: "16px",
  sizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
const self$8 = (vars) => {
  const { baseColor, inputColorDisabled, cardColor, modalColor, popoverColor, textColorDisabled, borderColor, primaryColor, textColor2, fontSizeSmall, fontSizeMedium, fontSizeLarge, borderRadiusSmall, lineHeight: lineHeight2 } = vars;
  return Object.assign(Object.assign({}, commonVariables$2), {
    labelLineHeight: lineHeight2,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadius: borderRadiusSmall,
    color: baseColor,
    colorChecked: primaryColor,
    colorDisabled: inputColorDisabled,
    colorDisabledChecked: inputColorDisabled,
    colorTableHeader: cardColor,
    colorTableHeaderModal: modalColor,
    colorTableHeaderPopover: popoverColor,
    checkMarkColor: baseColor,
    checkMarkColorDisabled: textColorDisabled,
    checkMarkColorDisabledChecked: textColorDisabled,
    border: `1px solid ${borderColor}`,
    borderDisabled: `1px solid ${borderColor}`,
    borderDisabledChecked: `1px solid ${borderColor}`,
    borderChecked: `1px solid ${primaryColor}`,
    borderFocus: `1px solid ${primaryColor}`,
    boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
    textColor: textColor2,
    textColorDisabled
  });
};
const checkboxLight = {
  name: "Checkbox",
  common: commonLight,
  self: self$8
};
const checkboxLight$1 = checkboxLight;
const CheckMark = h(
  "svg",
  { viewBox: "0 0 64 64", class: "check-icon" },
  h("path", { d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z" })
);
const LineMark = h(
  "svg",
  { viewBox: "0 0 100 100", class: "line-icon" },
  h("path", { d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z" })
);
const checkboxGroupInjectionKey = createInjectionKey("n-checkbox-group");
const checkboxGroupProps = {
  min: Number,
  max: Number,
  size: String,
  value: Array,
  defaultValue: {
    type: Array,
    default: null
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  // deprecated
  onChange: [Function, Array]
};
const NCheckboxGroup = /* @__PURE__ */ defineComponent({
  name: "CheckboxGroup",
  props: checkboxGroupProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    const formItem = useFormItem(props);
    const { mergedSizeRef, mergedDisabledRef } = formItem;
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = computed(() => props.value);
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const checkedCount = computed(() => {
      var _a;
      return ((_a = mergedValueRef.value) === null || _a === void 0 ? void 0 : _a.length) || 0;
    });
    const valueSetRef = computed(() => {
      if (Array.isArray(mergedValueRef.value)) {
        return new Set(mergedValueRef.value);
      }
      return /* @__PURE__ */ new Set();
    });
    function toggleCheckbox(checked, checkboxValue) {
      const { nTriggerFormInput, nTriggerFormChange } = formItem;
      const { onChange, "onUpdate:value": _onUpdateValue, onUpdateValue } = props;
      if (Array.isArray(mergedValueRef.value)) {
        const groupValue = Array.from(mergedValueRef.value);
        const index = groupValue.findIndex((value) => value === checkboxValue);
        if (checked) {
          if (!~index) {
            groupValue.push(checkboxValue);
            if (onUpdateValue) {
              call(onUpdateValue, groupValue, {
                actionType: "check",
                value: checkboxValue
              });
            }
            if (_onUpdateValue) {
              call(_onUpdateValue, groupValue, {
                actionType: "check",
                value: checkboxValue
              });
            }
            nTriggerFormInput();
            nTriggerFormChange();
            uncontrolledValueRef.value = groupValue;
            if (onChange)
              call(onChange, groupValue);
          }
        } else {
          if (~index) {
            groupValue.splice(index, 1);
            if (onUpdateValue) {
              call(onUpdateValue, groupValue, {
                actionType: "uncheck",
                value: checkboxValue
              });
            }
            if (_onUpdateValue) {
              call(_onUpdateValue, groupValue, {
                actionType: "uncheck",
                value: checkboxValue
              });
            }
            if (onChange)
              call(onChange, groupValue);
            uncontrolledValueRef.value = groupValue;
            nTriggerFormInput();
            nTriggerFormChange();
          }
        }
      } else {
        if (checked) {
          if (onUpdateValue) {
            call(onUpdateValue, [checkboxValue], {
              actionType: "check",
              value: checkboxValue
            });
          }
          if (_onUpdateValue) {
            call(_onUpdateValue, [checkboxValue], {
              actionType: "check",
              value: checkboxValue
            });
          }
          if (onChange)
            call(onChange, [checkboxValue]);
          uncontrolledValueRef.value = [checkboxValue];
          nTriggerFormInput();
          nTriggerFormChange();
        } else {
          if (onUpdateValue) {
            call(onUpdateValue, [], {
              actionType: "uncheck",
              value: checkboxValue
            });
          }
          if (_onUpdateValue) {
            call(_onUpdateValue, [], {
              actionType: "uncheck",
              value: checkboxValue
            });
          }
          if (onChange)
            call(onChange, []);
          uncontrolledValueRef.value = [];
          nTriggerFormInput();
          nTriggerFormChange();
        }
      }
    }
    provide(checkboxGroupInjectionKey, {
      checkedCountRef: checkedCount,
      maxRef: toRef(props, "max"),
      minRef: toRef(props, "min"),
      valueSetRef,
      disabledRef: mergedDisabledRef,
      mergedSizeRef,
      toggleCheckbox
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef
    };
  },
  render() {
    return h("div", { class: `${this.mergedClsPrefix}-checkbox-group`, role: "group" }, this.$slots);
  }
});
const style$7 = c$1([
  cB("checkbox", `
 line-height: var(--n-label-line-height);
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 --n-merged-color-table: var(--n-color-table);
 `, [c$1("&:hover", [cB("checkbox-box", [cE("border", {
    border: "var(--n-border-checked)"
  })])]), c$1("&:focus:not(:active)", [cB("checkbox-box", [cE("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), cM("inside-table", [cB("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), cM("checked", [cB("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [cB("checkbox-icon", [
    // if not set width to 100%, safari & old chrome won't display the icon
    c$1(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
  ])])]), cM("indeterminate", [cB("checkbox-box", [cB("checkbox-icon", [c$1(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), c$1(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), cM("checked, indeterminate", [c$1("&:focus:not(:active)", [cB("checkbox-box", [cE("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), cB("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [cE("border", {
    border: "var(--n-border-checked)"
  })])]), cM("disabled", {
    cursor: "not-allowed"
  }, [cM("checked", [cB("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [cE("border", {
    border: "var(--n-border-disabled-checked)"
  }), cB("checkbox-icon", [c$1(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled-checked)"
  })])])]), cB("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [cE("border", {
    border: "var(--n-border-disabled)"
  }), cB("checkbox-icon", [c$1(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled)"
  })])]), cE("label", {
    color: "var(--n-text-color-disabled)"
  })]), cB("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), cB("checkbox-box", `
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `, [cE("border", `
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `), cB("checkbox-icon", `
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `, [c$1(".check-icon, .line-icon", `
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `), iconSwitchTransition({
    left: "1px",
    top: "1px"
  })])]), cE("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [c$1("&:empty", {
    display: "none"
  })])]),
  // modal table header checkbox
  insideModal(cB("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
  // popover table header checkbox
  insidePopover(cB("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
]);
const checkboxProps = Object.assign(Object.assign({}, useTheme.props), {
  size: String,
  checked: {
    type: [Boolean, String, Number],
    default: void 0
  },
  defaultChecked: {
    type: [Boolean, String, Number],
    default: false
  },
  value: [String, Number],
  disabled: {
    type: Boolean,
    default: void 0
  },
  indeterminate: Boolean,
  label: String,
  focusable: {
    type: Boolean,
    default: true
  },
  checkedValue: {
    type: [Boolean, String, Number],
    default: true
  },
  uncheckedValue: {
    type: [Boolean, String, Number],
    default: false
  },
  "onUpdate:checked": [Function, Array],
  onUpdateChecked: [Function, Array],
  // private
  privateInsideTable: Boolean,
  // deprecated
  onChange: [Function, Array]
});
const NCheckbox = /* @__PURE__ */ defineComponent({
  name: "Checkbox",
  props: checkboxProps,
  setup(props) {
    const selfRef = ref(null);
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = useConfig(props);
    const formItem = useFormItem(props, {
      mergedSize(NFormItem) {
        const { size: size2 } = props;
        if (size2 !== void 0)
          return size2;
        if (NCheckboxGroup2) {
          const { value: mergedSize } = NCheckboxGroup2.mergedSizeRef;
          if (mergedSize !== void 0) {
            return mergedSize;
          }
        }
        if (NFormItem) {
          const { mergedSize } = NFormItem;
          if (mergedSize !== void 0)
            return mergedSize.value;
        }
        return "medium";
      },
      mergedDisabled(NFormItem) {
        const { disabled } = props;
        if (disabled !== void 0)
          return disabled;
        if (NCheckboxGroup2) {
          if (NCheckboxGroup2.disabledRef.value)
            return true;
          const { maxRef: { value: max }, checkedCountRef } = NCheckboxGroup2;
          if (max !== void 0 && checkedCountRef.value >= max && !renderedCheckedRef.value) {
            return true;
          }
          const { minRef: { value: min } } = NCheckboxGroup2;
          if (min !== void 0 && checkedCountRef.value <= min && renderedCheckedRef.value) {
            return true;
          }
        }
        if (NFormItem) {
          return NFormItem.disabled.value;
        }
        return false;
      }
    });
    const { mergedDisabledRef, mergedSizeRef } = formItem;
    const NCheckboxGroup2 = inject(checkboxGroupInjectionKey, null);
    const uncontrolledCheckedRef = ref(props.defaultChecked);
    const controlledCheckedRef = toRef(props, "checked");
    const mergedCheckedRef = useMergedState(controlledCheckedRef, uncontrolledCheckedRef);
    const renderedCheckedRef = useMemo(() => {
      if (NCheckboxGroup2) {
        const groupValueSet = NCheckboxGroup2.valueSetRef.value;
        if (groupValueSet && props.value !== void 0) {
          return groupValueSet.has(props.value);
        }
        return false;
      } else {
        return mergedCheckedRef.value === props.checkedValue;
      }
    });
    const themeRef = useTheme("Checkbox", "-checkbox", style$7, checkboxLight$1, props, mergedClsPrefixRef);
    function toggle(e) {
      if (NCheckboxGroup2 && props.value !== void 0) {
        NCheckboxGroup2.toggleCheckbox(!renderedCheckedRef.value, props.value);
      } else {
        const { onChange, "onUpdate:checked": _onUpdateCheck, onUpdateChecked } = props;
        const { nTriggerFormInput, nTriggerFormChange } = formItem;
        const nextChecked = renderedCheckedRef.value ? props.uncheckedValue : props.checkedValue;
        if (_onUpdateCheck) {
          call(_onUpdateCheck, nextChecked, e);
        }
        if (onUpdateChecked) {
          call(onUpdateChecked, nextChecked, e);
        }
        if (onChange)
          call(onChange, nextChecked, e);
        nTriggerFormInput();
        nTriggerFormChange();
        uncontrolledCheckedRef.value = nextChecked;
      }
    }
    function handleClick(e) {
      if (!mergedDisabledRef.value) {
        toggle(e);
      }
    }
    function handleKeyUp(e) {
      if (mergedDisabledRef.value)
        return;
      switch (e.key) {
        case " ":
        case "Enter":
          toggle(e);
      }
    }
    function handleKeyDown(e) {
      switch (e.key) {
        case " ":
          e.preventDefault();
      }
    }
    const exposedMethods = {
      focus: () => {
        var _a;
        (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.blur();
      }
    };
    const rtlEnabledRef = useRtl("Checkbox", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { value: mergedSize } = mergedSizeRef;
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: { borderRadius, color, colorChecked, colorDisabled, colorTableHeader, colorTableHeaderModal, colorTableHeaderPopover, checkMarkColor, checkMarkColorDisabled, border, borderFocus, borderDisabled, borderChecked, boxShadowFocus, textColor, textColorDisabled, checkMarkColorDisabledChecked, colorDisabledChecked, borderDisabledChecked, labelPadding, labelLineHeight, labelFontWeight, [createKey("fontSize", mergedSize)]: fontSize2, [createKey("size", mergedSize)]: size2 } } = themeRef.value;
      return {
        "--n-label-line-height": labelLineHeight,
        "--n-label-font-weight": labelFontWeight,
        "--n-size": size2,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-border-radius": borderRadius,
        "--n-border": border,
        "--n-border-checked": borderChecked,
        "--n-border-focus": borderFocus,
        "--n-border-disabled": borderDisabled,
        "--n-border-disabled-checked": borderDisabledChecked,
        "--n-box-shadow-focus": boxShadowFocus,
        "--n-color": color,
        "--n-color-checked": colorChecked,
        "--n-color-table": colorTableHeader,
        "--n-color-table-modal": colorTableHeaderModal,
        "--n-color-table-popover": colorTableHeaderPopover,
        "--n-color-disabled": colorDisabled,
        "--n-color-disabled-checked": colorDisabledChecked,
        "--n-text-color": textColor,
        "--n-text-color-disabled": textColorDisabled,
        "--n-check-mark-color": checkMarkColor,
        "--n-check-mark-color-disabled": checkMarkColorDisabled,
        "--n-check-mark-color-disabled-checked": checkMarkColorDisabledChecked,
        "--n-font-size": fontSize2,
        "--n-label-padding": labelPadding
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("checkbox", computed(() => mergedSizeRef.value[0]), cssVarsRef, props) : void 0;
    return Object.assign(formItem, exposedMethods, {
      rtlEnabled: rtlEnabledRef,
      selfRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedDisabled: mergedDisabledRef,
      renderedChecked: renderedCheckedRef,
      mergedTheme: themeRef,
      labelId: createId(),
      handleClick,
      handleKeyUp,
      handleKeyDown,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a;
    const { $slots, renderedChecked, mergedDisabled, indeterminate, privateInsideTable, cssVars, labelId, label, mergedClsPrefix, focusable, handleKeyUp, handleKeyDown, handleClick } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h(
      "div",
      { ref: "selfRef", class: [
        `${mergedClsPrefix}-checkbox`,
        this.themeClass,
        this.rtlEnabled && `${mergedClsPrefix}-checkbox--rtl`,
        renderedChecked && `${mergedClsPrefix}-checkbox--checked`,
        mergedDisabled && `${mergedClsPrefix}-checkbox--disabled`,
        indeterminate && `${mergedClsPrefix}-checkbox--indeterminate`,
        privateInsideTable && `${mergedClsPrefix}-checkbox--inside-table`
      ], tabindex: mergedDisabled || !focusable ? void 0 : 0, role: "checkbox", "aria-checked": indeterminate ? "mixed" : renderedChecked, "aria-labelledby": labelId, style: cssVars, onKeyup: handleKeyUp, onKeydown: handleKeyDown, onClick: handleClick, onMousedown: () => {
        on("selectstart", window, (e) => {
          e.preventDefault();
        }, {
          once: true
        });
      } },
      h(
        "div",
        { class: `${mergedClsPrefix}-checkbox-box-wrapper` },
        " ",
        h(
          "div",
          { class: `${mergedClsPrefix}-checkbox-box` },
          h(NIconSwitchTransition, null, {
            default: () => this.indeterminate ? h("div", { key: "indeterminate", class: `${mergedClsPrefix}-checkbox-icon` }, LineMark) : h("div", { key: "check", class: `${mergedClsPrefix}-checkbox-icon` }, CheckMark)
          }),
          h("div", { class: `${mergedClsPrefix}-checkbox-box__border` })
        )
      ),
      label !== null || $slots.default ? h("span", { class: `${mergedClsPrefix}-checkbox__label`, id: labelId }, $slots.default ? $slots.default() : label) : null
    );
  }
});
const style$6 = cB("collapse-transition", {
  width: "100%"
}, [fadeInHeightExpandTransition()]);
const self$7 = (vars) => {
  const { cubicBezierEaseInOut: cubicBezierEaseInOut2 } = vars;
  return {
    bezier: cubicBezierEaseInOut2
  };
};
const collapseTransitionLight = {
  name: "CollapseTransition",
  common: commonLight,
  self: self$7
};
const collapseTransitionLight$1 = collapseTransitionLight;
const collapseTransitionProps = Object.assign(Object.assign({}, useTheme.props), {
  show: {
    type: Boolean,
    default: true
  },
  appear: Boolean,
  // The collapsed is implemented with mistake, collapsed=true would make it show
  // However there's no possibility to change so I just let it deprecated and use
  // `show` prop instead.
  /** @deprecated */
  collapsed: {
    type: Boolean,
    default: void 0
  }
});
const NCollapseTransition = /* @__PURE__ */ defineComponent({
  name: "CollapseTransition",
  props: collapseTransitionProps,
  inheritAttrs: false,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = useConfig(props);
    const mergedThemeRef = useTheme("CollapseTransition", "-collapse-transition", style$6, collapseTransitionLight$1, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl("CollapseTransition", mergedRtlRef, mergedClsPrefixRef);
    const mergedShowRef = computed(() => {
      if (props.collapsed !== void 0) {
        return props.collapsed;
      }
      return props.show;
    });
    const cssVarsRef = computed(() => {
      const { self: { bezier } } = mergedThemeRef.value;
      return {
        "--n-bezier": bezier
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("collapse-transition", void 0, cssVarsRef, props) : void 0;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedShow: mergedShowRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    return h(NFadeInExpandTransition, { appear: this.appear }, {
      default: () => {
        var _a;
        if (!this.mergedShow)
          return;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return h(
          "div",
          // Don't use jsx since it would cause useless spread in each rendering
          mergeProps({
            class: [
              `${this.mergedClsPrefix}-collapse-transition`,
              this.rtlEnabled && `${this.mergedClsPrefix}-collapse-transition--rtl`,
              this.themeClass
            ],
            style: this.cssVars
          }, this.$attrs),
          this.$slots
        );
      }
    });
  }
});
function self$6(vars) {
  const { boxShadow2 } = vars;
  return {
    menuBoxShadow: boxShadow2
  };
}
const popselectLight = createTheme({
  name: "Popselect",
  common: commonLight,
  peers: {
    Popover: popoverLight$1,
    InternalSelectMenu: internalSelectMenuLight$1
  },
  self: self$6
});
const popselectLight$1 = popselectLight;
const popselectInjectionKey = createInjectionKey("n-popselect");
const style$5 = cB("popselect-menu", `
 box-shadow: var(--n-menu-box-shadow);
`);
const panelProps = {
  multiple: Boolean,
  value: {
    type: [String, Number, Array],
    default: null
  },
  cancelable: Boolean,
  options: {
    type: Array,
    default: () => []
  },
  size: {
    type: String,
    default: "medium"
  },
  scrollable: Boolean,
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  onMouseenter: Function,
  onMouseleave: Function,
  renderLabel: Function,
  showCheckmark: {
    type: Boolean,
    default: void 0
  },
  nodeProps: Function,
  virtualScroll: Boolean,
  // deprecated
  onChange: [Function, Array]
};
const panelPropKeys = keysOf(panelProps);
const NPopselectPanel = /* @__PURE__ */ defineComponent({
  name: "PopselectPanel",
  props: panelProps,
  setup(props) {
    const NPopselect2 = inject(popselectInjectionKey);
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const themeRef = useTheme("Popselect", "-pop-select", style$5, popselectLight$1, NPopselect2.props, mergedClsPrefixRef);
    const treeMateRef = computed(() => {
      return createTreeMate(props.options, createTmOptions("value", "children"));
    });
    function doUpdateValue(value, option) {
      const { onUpdateValue, "onUpdate:value": _onUpdateValue, onChange } = props;
      if (onUpdateValue)
        call(onUpdateValue, value, option);
      if (_onUpdateValue) {
        call(_onUpdateValue, value, option);
      }
      if (onChange)
        call(onChange, value, option);
    }
    function handleToggle(tmNode) {
      toggle(tmNode.key);
    }
    function handleMenuMousedown(e) {
      if (!happensIn(e, "action"))
        e.preventDefault();
    }
    function toggle(value) {
      const { value: { getNode } } = treeMateRef;
      if (props.multiple) {
        if (Array.isArray(props.value)) {
          const newValue = [];
          const newOptions = [];
          let shouldAddValue = true;
          props.value.forEach((v) => {
            if (v === value) {
              shouldAddValue = false;
              return;
            }
            const tmNode = getNode(v);
            if (tmNode) {
              newValue.push(tmNode.key);
              newOptions.push(tmNode.rawNode);
            }
          });
          if (shouldAddValue) {
            newValue.push(value);
            newOptions.push(getNode(value).rawNode);
          }
          doUpdateValue(newValue, newOptions);
        } else {
          const tmNode = getNode(value);
          if (tmNode) {
            doUpdateValue([value], [tmNode.rawNode]);
          }
        }
      } else {
        if (props.value === value && props.cancelable) {
          doUpdateValue(null, null);
        } else {
          const tmNode = getNode(value);
          if (tmNode) {
            doUpdateValue(value, tmNode.rawNode);
          }
          const { "onUpdate:show": _onUpdateShow, onUpdateShow } = NPopselect2.props;
          if (_onUpdateShow)
            call(_onUpdateShow, false);
          if (onUpdateShow)
            call(onUpdateShow, false);
          NPopselect2.setShow(false);
        }
      }
      void nextTick(() => {
        NPopselect2.syncPosition();
      });
    }
    watch(toRef(props, "options"), () => {
      void nextTick(() => {
        NPopselect2.syncPosition();
      });
    });
    const cssVarsRef = computed(() => {
      const { self: { menuBoxShadow } } = themeRef.value;
      return {
        "--n-menu-box-shadow": menuBoxShadow
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("select", void 0, cssVarsRef, NPopselect2.props) : void 0;
    return {
      mergedTheme: NPopselect2.mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      treeMate: treeMateRef,
      handleToggle,
      handleMenuMousedown,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h(NInternalSelectMenu, { clsPrefix: this.mergedClsPrefix, focusable: true, nodeProps: this.nodeProps, class: [`${this.mergedClsPrefix}-popselect-menu`, this.themeClass], style: this.cssVars, theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu, multiple: this.multiple, treeMate: this.treeMate, size: this.size, value: this.value, virtualScroll: this.virtualScroll, scrollable: this.scrollable, renderLabel: this.renderLabel, onToggle: this.handleToggle, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseenter, onMousedown: this.handleMenuMousedown, showCheckmark: this.showCheckmark }, {
      action: () => {
        var _a2, _b;
        return ((_b = (_a2 = this.$slots).action) === null || _b === void 0 ? void 0 : _b.call(_a2)) || [];
      },
      empty: () => {
        var _a2, _b;
        return ((_b = (_a2 = this.$slots).empty) === null || _b === void 0 ? void 0 : _b.call(_a2)) || [];
      }
    });
  }
});
const popselectProps = Object.assign(Object.assign(Object.assign(Object.assign({}, useTheme.props), omit(popoverBaseProps, ["showArrow", "arrow"])), { placement: Object.assign(Object.assign({}, popoverBaseProps.placement), { default: "bottom" }), trigger: {
  type: String,
  default: "hover"
} }), panelProps);
const NPopselect = /* @__PURE__ */ defineComponent({
  name: "Popselect",
  props: popselectProps,
  inheritAttrs: false,
  __popover__: true,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    const themeRef = useTheme("Popselect", "-popselect", void 0, popselectLight$1, props, mergedClsPrefixRef);
    const popoverInstRef = ref(null);
    function syncPosition() {
      var _a;
      (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
    }
    function setShow(value) {
      var _a;
      (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.setShow(value);
    }
    provide(popselectInjectionKey, {
      props,
      mergedThemeRef: themeRef,
      syncPosition,
      setShow
    });
    const exposedMethods = {
      syncPosition,
      setShow
    };
    return Object.assign(Object.assign({}, exposedMethods), { popoverInstRef, mergedTheme: themeRef });
  },
  render() {
    const { mergedTheme } = this;
    const popoverProps2 = {
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      builtinThemeOverrides: {
        padding: "0"
      },
      ref: "popoverInstRef",
      internalRenderBody: (className, ref2, style2, onMouseenter, onMouseleave) => {
        const { $attrs } = this;
        return h(NPopselectPanel, Object.assign({}, $attrs, { class: [$attrs.class, className], style: [$attrs.style, style2] }, keep(this.$props, panelPropKeys), { ref: createRefSetter(ref2), onMouseenter: mergeEventHandlers([
          onMouseenter,
          $attrs.onMouseenter
        ]), onMouseleave: mergeEventHandlers([
          onMouseleave,
          $attrs.onMouseleave
        ]) }), {
          action: () => {
            var _a, _b;
            return (_b = (_a = this.$slots).action) === null || _b === void 0 ? void 0 : _b.call(_a);
          },
          empty: () => {
            var _a, _b;
            return (_b = (_a = this.$slots).empty) === null || _b === void 0 ? void 0 : _b.call(_a);
          }
        });
      }
    };
    return h(NPopover, Object.assign({}, omit(this.$props, panelPropKeys), popoverProps2, { internalDeactivateImmediately: true }), {
      trigger: () => {
        var _a, _b;
        return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    });
  }
});
function self$5(vars) {
  const { boxShadow2 } = vars;
  return {
    menuBoxShadow: boxShadow2
  };
}
const selectLight = createTheme({
  name: "Select",
  common: commonLight,
  peers: {
    InternalSelection: internalSelectionLight$1,
    InternalSelectMenu: internalSelectMenuLight$1
  },
  self: self$5
});
const selectLight$1 = selectLight;
const style$4 = c$1([cB("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `), cB("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [fadeInScaleUpTransition({
  originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
})])]);
const selectProps = Object.assign(Object.assign({}, useTheme.props), {
  to: useAdjustedTo.propTo,
  bordered: {
    type: Boolean,
    default: void 0
  },
  clearable: Boolean,
  clearFilterAfterSelect: {
    type: Boolean,
    default: true
  },
  options: {
    type: Array,
    default: () => []
  },
  defaultValue: {
    type: [String, Number, Array],
    default: null
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  value: [String, Number, Array],
  placeholder: String,
  menuProps: Object,
  multiple: Boolean,
  size: String,
  filterable: Boolean,
  disabled: {
    type: Boolean,
    default: void 0
  },
  remote: Boolean,
  loading: Boolean,
  filter: Function,
  placement: {
    type: String,
    default: "bottom-start"
  },
  widthMode: {
    type: String,
    default: "trigger"
  },
  tag: Boolean,
  onCreate: Function,
  fallbackOption: {
    type: [Function, Boolean],
    default: void 0
  },
  show: {
    type: Boolean,
    default: void 0
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  maxTagCount: [Number, String],
  consistentMenuWidth: {
    type: Boolean,
    default: true
  },
  virtualScroll: {
    type: Boolean,
    default: true
  },
  labelField: {
    type: String,
    default: "label"
  },
  valueField: {
    type: String,
    default: "value"
  },
  childrenField: {
    type: String,
    default: "children"
  },
  renderLabel: Function,
  renderOption: Function,
  renderTag: Function,
  "onUpdate:value": [Function, Array],
  inputProps: Object,
  nodeProps: Function,
  ignoreComposition: { type: Boolean, default: true },
  showOnFocus: Boolean,
  // for jsx
  onUpdateValue: [Function, Array],
  onBlur: [Function, Array],
  onClear: [Function, Array],
  onFocus: [Function, Array],
  onScroll: [Function, Array],
  onSearch: [Function, Array],
  onUpdateShow: [Function, Array],
  "onUpdate:show": [Function, Array],
  displayDirective: {
    type: String,
    default: "show"
  },
  resetMenuOnOptionsChange: {
    type: Boolean,
    default: true
  },
  status: String,
  showCheckmark: {
    type: Boolean,
    default: true
  },
  /** deprecated */
  onChange: [Function, Array],
  items: Array
});
const NSelect = /* @__PURE__ */ defineComponent({
  name: "Select",
  props: selectProps,
  setup(props) {
    const { mergedClsPrefixRef, mergedBorderedRef, namespaceRef, inlineThemeDisabled } = useConfig(props);
    const themeRef = useTheme("Select", "-select", style$4, selectLight$1, props, mergedClsPrefixRef);
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, "value");
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const focusedRef = ref(false);
    const patternRef = ref("");
    const treeMateRef = computed(() => {
      const { valueField, childrenField } = props;
      const options = createTmOptions(valueField, childrenField);
      return createTreeMate(filteredOptionsRef.value, options);
    });
    const valOptMapRef = computed(() => createValOptMap(localOptionsRef.value, props.valueField, props.childrenField));
    const uncontrolledShowRef = ref(false);
    const mergedShowRef = useMergedState(toRef(props, "show"), uncontrolledShowRef);
    const triggerRef = ref(null);
    const followerRef = ref(null);
    const menuRef = ref(null);
    const { localeRef } = useLocale("Select");
    const localizedPlaceholderRef = computed(() => {
      var _a;
      return (_a = props.placeholder) !== null && _a !== void 0 ? _a : localeRef.value.placeholder;
    });
    const compitableOptionsRef = useCompitable(props, ["items", "options"]);
    const emptyArray = [];
    const createdOptionsRef = ref([]);
    const beingCreatedOptionsRef = ref([]);
    const memoValOptMapRef = ref(/* @__PURE__ */ new Map());
    const wrappedFallbackOptionRef = computed(() => {
      const { fallbackOption } = props;
      if (fallbackOption === void 0) {
        const { labelField, valueField } = props;
        return (value) => ({
          [labelField]: String(value),
          [valueField]: value
        });
      }
      if (fallbackOption === false)
        return false;
      return (value) => {
        return Object.assign(fallbackOption(value), {
          value
        });
      };
    });
    const localOptionsRef = computed(() => {
      return beingCreatedOptionsRef.value.concat(createdOptionsRef.value).concat(compitableOptionsRef.value);
    });
    const resolvedFilterRef = computed(() => {
      const { filter } = props;
      if (filter)
        return filter;
      const { labelField, valueField } = props;
      return (pattern, option) => {
        if (!option)
          return false;
        const label = option[labelField];
        if (typeof label === "string") {
          return patternMatched(pattern, label);
        }
        const value = option[valueField];
        if (typeof value === "string") {
          return patternMatched(pattern, value);
        }
        if (typeof value === "number") {
          return patternMatched(pattern, String(value));
        }
        return false;
      };
    });
    const filteredOptionsRef = computed(() => {
      if (props.remote) {
        return compitableOptionsRef.value;
      } else {
        const { value: localOptions } = localOptionsRef;
        const { value: pattern } = patternRef;
        if (!pattern.length || !props.filterable) {
          return localOptions;
        } else {
          return filterOptions(localOptions, resolvedFilterRef.value, pattern, props.childrenField);
        }
      }
    });
    function getMergedOptions(values) {
      const remote = props.remote;
      const { value: memoValOptMap } = memoValOptMapRef;
      const { value: valOptMap } = valOptMapRef;
      const { value: wrappedFallbackOption } = wrappedFallbackOptionRef;
      const options = [];
      values.forEach((value) => {
        if (valOptMap.has(value)) {
          options.push(valOptMap.get(value));
        } else if (remote && memoValOptMap.has(value)) {
          options.push(memoValOptMap.get(value));
        } else if (wrappedFallbackOption) {
          const option = wrappedFallbackOption(value);
          if (option) {
            options.push(option);
          }
        }
      });
      return options;
    }
    const selectedOptionsRef = computed(() => {
      if (props.multiple) {
        const { value: values } = mergedValueRef;
        if (!Array.isArray(values))
          return [];
        return getMergedOptions(values);
      }
      return null;
    });
    const selectedOptionRef = computed(() => {
      const { value: mergedValue } = mergedValueRef;
      if (!props.multiple && !Array.isArray(mergedValue)) {
        if (mergedValue === null)
          return null;
        return getMergedOptions([mergedValue])[0] || null;
      }
      return null;
    });
    const formItem = useFormItem(props);
    const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem;
    function doUpdateValue(value, option) {
      const { onChange, "onUpdate:value": _onUpdateValue, onUpdateValue } = props;
      const { nTriggerFormChange, nTriggerFormInput } = formItem;
      if (onChange)
        call(onChange, value, option);
      if (onUpdateValue)
        call(onUpdateValue, value, option);
      if (_onUpdateValue) {
        call(_onUpdateValue, value, option);
      }
      uncontrolledValueRef.value = value;
      nTriggerFormChange();
      nTriggerFormInput();
    }
    function doBlur(e) {
      const { onBlur } = props;
      const { nTriggerFormBlur } = formItem;
      if (onBlur)
        call(onBlur, e);
      nTriggerFormBlur();
    }
    function doClear() {
      const { onClear } = props;
      if (onClear)
        call(onClear);
    }
    function doFocus(e) {
      const { onFocus, showOnFocus } = props;
      const { nTriggerFormFocus } = formItem;
      if (onFocus)
        call(onFocus, e);
      nTriggerFormFocus();
      if (showOnFocus) {
        openMenu();
      }
    }
    function doSearch(value) {
      const { onSearch } = props;
      if (onSearch)
        call(onSearch, value);
    }
    function doScroll(e) {
      const { onScroll } = props;
      if (onScroll)
        call(onScroll, e);
    }
    function updateMemorizedOptions() {
      var _a;
      const { remote, multiple } = props;
      if (remote) {
        const { value: memoValOptMap } = memoValOptMapRef;
        if (multiple) {
          const { valueField } = props;
          (_a = selectedOptionsRef.value) === null || _a === void 0 ? void 0 : _a.forEach((option) => {
            memoValOptMap.set(option[valueField], option);
          });
        } else {
          const option = selectedOptionRef.value;
          if (option) {
            memoValOptMap.set(option[props.valueField], option);
          }
        }
      }
    }
    function doUpdateShow(value) {
      const { onUpdateShow, "onUpdate:show": _onUpdateShow } = props;
      if (onUpdateShow)
        call(onUpdateShow, value);
      if (_onUpdateShow)
        call(_onUpdateShow, value);
      uncontrolledShowRef.value = value;
    }
    function openMenu() {
      if (!mergedDisabledRef.value) {
        doUpdateShow(true);
        uncontrolledShowRef.value = true;
        if (props.filterable) {
          focusSelectionInput();
        }
      }
    }
    function closeMenu() {
      doUpdateShow(false);
    }
    function handleMenuAfterLeave() {
      patternRef.value = "";
      beingCreatedOptionsRef.value = emptyArray;
    }
    const activeWithoutMenuOpenRef = ref(false);
    function onTriggerInputFocus() {
      if (props.filterable) {
        activeWithoutMenuOpenRef.value = true;
      }
    }
    function onTriggerInputBlur() {
      if (props.filterable) {
        activeWithoutMenuOpenRef.value = false;
        if (!mergedShowRef.value) {
          handleMenuAfterLeave();
        }
      }
    }
    function handleTriggerClick() {
      if (mergedDisabledRef.value)
        return;
      if (!mergedShowRef.value) {
        openMenu();
      } else {
        if (!props.filterable) {
          closeMenu();
        } else {
          focusSelectionInput();
        }
      }
    }
    function handleTriggerBlur(e) {
      var _a, _b;
      if ((_b = (_a = menuRef.value) === null || _a === void 0 ? void 0 : _a.selfRef) === null || _b === void 0 ? void 0 : _b.contains(e.relatedTarget)) {
        return;
      }
      focusedRef.value = false;
      doBlur(e);
      closeMenu();
    }
    function handleTriggerFocus(e) {
      doFocus(e);
      focusedRef.value = true;
    }
    function handleMenuFocus(e) {
      focusedRef.value = true;
    }
    function handleMenuBlur(e) {
      var _a;
      if ((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(e.relatedTarget))
        return;
      focusedRef.value = false;
      doBlur(e);
      closeMenu();
    }
    function handleMenuTabOut() {
      var _a;
      (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      closeMenu();
    }
    function handleMenuClickOutside(e) {
      var _a;
      if (mergedShowRef.value) {
        if (!((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(getPreciseEventTarget(e)))) {
          closeMenu();
        }
      }
    }
    function createClearedMultipleSelectValue(value) {
      if (!Array.isArray(value))
        return [];
      if (wrappedFallbackOptionRef.value) {
        return Array.from(value);
      } else {
        const { remote } = props;
        const { value: valOptMap } = valOptMapRef;
        if (remote) {
          const { value: memoValOptMap } = memoValOptMapRef;
          return value.filter((v) => valOptMap.has(v) || memoValOptMap.has(v));
        } else {
          return value.filter((v) => valOptMap.has(v));
        }
      }
    }
    function handleToggleByTmNode(tmNode) {
      handleToggleByOption(tmNode.rawNode);
    }
    function handleToggleByOption(option) {
      if (mergedDisabledRef.value)
        return;
      const { tag, remote, clearFilterAfterSelect, valueField } = props;
      if (tag && !remote) {
        const { value: beingCreatedOptions } = beingCreatedOptionsRef;
        const beingCreatedOption = beingCreatedOptions[0] || null;
        if (beingCreatedOption) {
          const createdOptions = createdOptionsRef.value;
          if (!createdOptions.length) {
            createdOptionsRef.value = [beingCreatedOption];
          } else {
            createdOptions.push(beingCreatedOption);
          }
          beingCreatedOptionsRef.value = emptyArray;
        }
      }
      if (remote) {
        memoValOptMapRef.value.set(option[valueField], option);
      }
      if (props.multiple) {
        const changedValue = createClearedMultipleSelectValue(mergedValueRef.value);
        const index = changedValue.findIndex((value) => value === option[valueField]);
        if (~index) {
          changedValue.splice(index, 1);
          if (tag && !remote) {
            const createdOptionIndex = getCreatedOptionIndex(option[valueField]);
            if (~createdOptionIndex) {
              createdOptionsRef.value.splice(createdOptionIndex, 1);
              if (clearFilterAfterSelect)
                patternRef.value = "";
            }
          }
        } else {
          changedValue.push(option[valueField]);
          if (clearFilterAfterSelect)
            patternRef.value = "";
        }
        doUpdateValue(changedValue, getMergedOptions(changedValue));
      } else {
        if (tag && !remote) {
          const createdOptionIndex = getCreatedOptionIndex(option[valueField]);
          if (~createdOptionIndex) {
            createdOptionsRef.value = [
              createdOptionsRef.value[createdOptionIndex]
            ];
          } else {
            createdOptionsRef.value = emptyArray;
          }
        }
        focusSelection();
        closeMenu();
        doUpdateValue(option[valueField], option);
      }
    }
    function getCreatedOptionIndex(optionValue) {
      const createdOptions = createdOptionsRef.value;
      return createdOptions.findIndex((createdOption) => createdOption[props.valueField] === optionValue);
    }
    function handlePatternInput(e) {
      if (!mergedShowRef.value) {
        openMenu();
      }
      const { value } = e.target;
      patternRef.value = value;
      const { tag, remote } = props;
      doSearch(value);
      if (tag && !remote) {
        if (!value) {
          beingCreatedOptionsRef.value = emptyArray;
          return;
        }
        const { onCreate } = props;
        const optionBeingCreated = onCreate ? onCreate(value) : { [props.labelField]: value, [props.valueField]: value };
        const { valueField } = props;
        if (compitableOptionsRef.value.some((option) => option[valueField] === optionBeingCreated[valueField]) || createdOptionsRef.value.some((option) => option[valueField] === optionBeingCreated[valueField])) {
          beingCreatedOptionsRef.value = emptyArray;
        } else {
          beingCreatedOptionsRef.value = [optionBeingCreated];
        }
      }
    }
    function handleClear(e) {
      e.stopPropagation();
      const { multiple } = props;
      if (!multiple && props.filterable) {
        closeMenu();
      }
      doClear();
      if (multiple) {
        doUpdateValue([], []);
      } else {
        doUpdateValue(null, null);
      }
    }
    function handleMenuMousedown(e) {
      if (!happensIn(e, "action") && !happensIn(e, "empty"))
        e.preventDefault();
    }
    function handleMenuScroll(e) {
      doScroll(e);
    }
    function handleKeydown(e) {
      var _a, _b, _c, _d, _e;
      if (!props.keyboard) {
        e.preventDefault();
        return;
      }
      switch (e.key) {
        case " ":
          if (props.filterable)
            break;
          else {
            e.preventDefault();
          }
        case "Enter":
          if (!((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.isComposing)) {
            if (mergedShowRef.value) {
              const pendingTmNode = (_b = menuRef.value) === null || _b === void 0 ? void 0 : _b.getPendingTmNode();
              if (pendingTmNode) {
                handleToggleByTmNode(pendingTmNode);
              } else if (!props.filterable) {
                closeMenu();
                focusSelection();
              }
            } else {
              openMenu();
              if (props.tag && activeWithoutMenuOpenRef.value) {
                const beingCreatedOption = beingCreatedOptionsRef.value[0];
                if (beingCreatedOption) {
                  const optionValue = beingCreatedOption[props.valueField];
                  const { value: mergedValue } = mergedValueRef;
                  if (props.multiple) {
                    if (Array.isArray(mergedValue) && mergedValue.some((value) => value === optionValue))
                      ;
                    else {
                      handleToggleByOption(beingCreatedOption);
                    }
                  } else {
                    handleToggleByOption(beingCreatedOption);
                  }
                }
              }
            }
          }
          e.preventDefault();
          break;
        case "ArrowUp":
          e.preventDefault();
          if (props.loading)
            return;
          if (mergedShowRef.value) {
            (_c = menuRef.value) === null || _c === void 0 ? void 0 : _c.prev();
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (props.loading)
            return;
          if (mergedShowRef.value) {
            (_d = menuRef.value) === null || _d === void 0 ? void 0 : _d.next();
          } else {
            openMenu();
          }
          break;
        case "Escape":
          if (mergedShowRef.value) {
            markEventEffectPerformed(e);
            closeMenu();
          }
          (_e = triggerRef.value) === null || _e === void 0 ? void 0 : _e.focus();
          break;
      }
    }
    function focusSelection() {
      var _a;
      (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
    }
    function focusSelectionInput() {
      var _a;
      (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focusInput();
    }
    function handleTriggerOrMenuResize() {
      var _a;
      if (!mergedShowRef.value)
        return;
      (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
    }
    updateMemorizedOptions();
    watch(toRef(props, "options"), updateMemorizedOptions);
    const exposedMethods = {
      focus: () => {
        var _a;
        (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.blur();
      }
    };
    const cssVarsRef = computed(() => {
      const { self: { menuBoxShadow } } = themeRef.value;
      return {
        "--n-menu-box-shadow": menuBoxShadow
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("select", void 0, cssVarsRef, props) : void 0;
    return Object.assign(Object.assign({}, exposedMethods), {
      mergedStatus: mergedStatusRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      namespace: namespaceRef,
      treeMate: treeMateRef,
      isMounted: isMounted(),
      triggerRef,
      menuRef,
      pattern: patternRef,
      uncontrolledShow: uncontrolledShowRef,
      mergedShow: mergedShowRef,
      adjustedTo: useAdjustedTo(props),
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      followerRef,
      localizedPlaceholder: localizedPlaceholderRef,
      selectedOption: selectedOptionRef,
      selectedOptions: selectedOptionsRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      focused: focusedRef,
      activeWithoutMenuOpen: activeWithoutMenuOpenRef,
      inlineThemeDisabled,
      onTriggerInputFocus,
      onTriggerInputBlur,
      handleTriggerOrMenuResize,
      handleMenuFocus,
      handleMenuBlur,
      handleMenuTabOut,
      handleTriggerClick,
      handleToggle: handleToggleByTmNode,
      handleDeleteOption: handleToggleByOption,
      handlePatternInput,
      handleClear,
      handleTriggerBlur,
      handleTriggerFocus,
      handleKeydown,
      handleMenuAfterLeave,
      handleMenuClickOutside,
      handleMenuScroll,
      handleMenuKeydown: handleKeydown,
      handleMenuMousedown,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    return h(
      "div",
      { class: `${this.mergedClsPrefix}-select` },
      h(VBinder, null, {
        default: () => [
          h(VTarget, null, {
            default: () => h(NInternalSelection, { ref: "triggerRef", inlineThemeDisabled: this.inlineThemeDisabled, status: this.mergedStatus, inputProps: this.inputProps, clsPrefix: this.mergedClsPrefix, showArrow: this.showArrow, maxTagCount: this.maxTagCount, bordered: this.mergedBordered, active: this.activeWithoutMenuOpen || this.mergedShow, pattern: this.pattern, placeholder: this.localizedPlaceholder, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, multiple: this.multiple, renderTag: this.renderTag, renderLabel: this.renderLabel, filterable: this.filterable, clearable: this.clearable, disabled: this.mergedDisabled, size: this.mergedSize, theme: this.mergedTheme.peers.InternalSelection, labelField: this.labelField, valueField: this.valueField, themeOverrides: this.mergedTheme.peerOverrides.InternalSelection, loading: this.loading, focused: this.focused, onClick: this.handleTriggerClick, onDeleteOption: this.handleDeleteOption, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onBlur: this.handleTriggerBlur, onFocus: this.handleTriggerFocus, onKeydown: this.handleKeydown, onPatternBlur: this.onTriggerInputBlur, onPatternFocus: this.onTriggerInputFocus, onResize: this.handleTriggerOrMenuResize, ignoreComposition: this.ignoreComposition }, {
              arrow: () => {
                var _a, _b;
                return [(_b = (_a = this.$slots).arrow) === null || _b === void 0 ? void 0 : _b.call(_a)];
              }
            })
          }),
          h(VFollower, { ref: "followerRef", show: this.mergedShow, to: this.adjustedTo, teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? "target" : void 0, minWidth: "target", placement: this.placement }, {
            default: () => h(Transition, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterLeave: this.handleMenuAfterLeave }, {
              default: () => {
                var _a, _b, _c;
                if (!(this.mergedShow || this.displayDirective === "show")) {
                  return null;
                }
                (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
                return withDirectives(h(NInternalSelectMenu, Object.assign({}, this.menuProps, { ref: "menuRef", onResize: this.handleTriggerOrMenuResize, inlineThemeDisabled: this.inlineThemeDisabled, virtualScroll: this.consistentMenuWidth && this.virtualScroll, class: [
                  `${this.mergedClsPrefix}-select-menu`,
                  this.themeClass,
                  (_b = this.menuProps) === null || _b === void 0 ? void 0 : _b.class
                ], clsPrefix: this.mergedClsPrefix, focusable: true, labelField: this.labelField, valueField: this.valueField, autoPending: true, nodeProps: this.nodeProps, theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu, treeMate: this.treeMate, multiple: this.multiple, size: "medium", renderOption: this.renderOption, renderLabel: this.renderLabel, value: this.mergedValue, style: [(_c = this.menuProps) === null || _c === void 0 ? void 0 : _c.style, this.cssVars], onToggle: this.handleToggle, onScroll: this.handleMenuScroll, onFocus: this.handleMenuFocus, onBlur: this.handleMenuBlur, onKeydown: this.handleMenuKeydown, onTabOut: this.handleMenuTabOut, onMousedown: this.handleMenuMousedown, show: this.mergedShow, showCheckmark: this.showCheckmark, resetMenuOnOptionsChange: this.resetMenuOnOptionsChange }), {
                  empty: () => {
                    var _a2, _b2;
                    return [(_b2 = (_a2 = this.$slots).empty) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)];
                  },
                  action: () => {
                    var _a2, _b2;
                    return [(_b2 = (_a2 = this.$slots).action) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)];
                  }
                }), this.displayDirective === "show" ? [
                  [vShow, this.mergedShow],
                  [
                    clickoutside$1,
                    this.handleMenuClickOutside,
                    void 0,
                    { capture: true }
                  ]
                ] : [
                  [
                    clickoutside$1,
                    this.handleMenuClickOutside,
                    void 0,
                    { capture: true }
                  ]
                ]);
              }
            })
          })
        ]
      })
    );
  }
});
const commonVariables$1 = {
  itemPaddingSmall: "0 4px",
  itemMarginSmall: "0 0 0 8px",
  itemMarginSmallRtl: "0 8px 0 0",
  itemPaddingMedium: "0 4px",
  itemMarginMedium: "0 0 0 8px",
  itemMarginMediumRtl: "0 8px 0 0",
  itemPaddingLarge: "0 4px",
  itemMarginLarge: "0 0 0 8px",
  itemMarginLargeRtl: "0 8px 0 0",
  buttonIconSizeSmall: "14px",
  buttonIconSizeMedium: "16px",
  buttonIconSizeLarge: "18px",
  inputWidthSmall: "60px",
  selectWidthSmall: "unset",
  inputMarginSmall: "0 0 0 8px",
  inputMarginSmallRtl: "0 8px 0 0",
  selectMarginSmall: "0 0 0 8px",
  prefixMarginSmall: "0 8px 0 0",
  suffixMarginSmall: "0 0 0 8px",
  inputWidthMedium: "60px",
  selectWidthMedium: "unset",
  inputMarginMedium: "0 0 0 8px",
  inputMarginMediumRtl: "0 8px 0 0",
  selectMarginMedium: "0 0 0 8px",
  prefixMarginMedium: "0 8px 0 0",
  suffixMarginMedium: "0 0 0 8px",
  inputWidthLarge: "60px",
  selectWidthLarge: "unset",
  inputMarginLarge: "0 0 0 8px",
  inputMarginLargeRtl: "0 8px 0 0",
  selectMarginLarge: "0 0 0 8px",
  prefixMarginLarge: "0 8px 0 0",
  suffixMarginLarge: "0 0 0 8px"
};
const self$4 = (vars) => {
  const {
    textColor2,
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    inputColorDisabled,
    textColorDisabled,
    borderColor,
    borderRadius,
    // item font size
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    // item size
    heightTiny,
    heightSmall,
    heightMedium
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$1), { buttonColor: "#0000", buttonColorHover: "#0000", buttonColorPressed: "#0000", buttonBorder: `1px solid ${borderColor}`, buttonBorderHover: `1px solid ${borderColor}`, buttonBorderPressed: `1px solid ${borderColor}`, buttonIconColor: textColor2, buttonIconColorHover: textColor2, buttonIconColorPressed: textColor2, itemTextColor: textColor2, itemTextColorHover: primaryColorHover, itemTextColorPressed: primaryColorPressed, itemTextColorActive: primaryColor, itemTextColorDisabled: textColorDisabled, itemColor: "#0000", itemColorHover: "#0000", itemColorPressed: "#0000", itemColorActive: "#0000", itemColorActiveHover: "#0000", itemColorDisabled: inputColorDisabled, itemBorder: "1px solid #0000", itemBorderHover: "1px solid #0000", itemBorderPressed: "1px solid #0000", itemBorderActive: `1px solid ${primaryColor}`, itemBorderDisabled: `1px solid ${borderColor}`, itemBorderRadius: borderRadius, itemSizeSmall: heightTiny, itemSizeMedium: heightSmall, itemSizeLarge: heightMedium, itemFontSizeSmall: fontSizeTiny, itemFontSizeMedium: fontSizeSmall, itemFontSizeLarge: fontSizeMedium, jumperFontSizeSmall: fontSizeTiny, jumperFontSizeMedium: fontSizeSmall, jumperFontSizeLarge: fontSizeMedium, jumperTextColor: textColor2, jumperTextColorDisabled: textColorDisabled });
};
const paginationLight = createTheme({
  name: "Pagination",
  common: commonLight,
  peers: {
    Select: selectLight$1,
    Input: inputLight$1,
    Popselect: popselectLight$1
  },
  self: self$4
});
const paginationLight$1 = paginationLight;
function createPageItemsInfo(currentPage, pageCount, pageSlot) {
  let hasFastBackward = false;
  let hasFastForward = false;
  let fastBackwardTo = 1;
  let fastForwardTo = pageCount;
  if (pageCount === 1) {
    return {
      hasFastBackward: false,
      hasFastForward: false,
      fastForwardTo,
      fastBackwardTo,
      items: [
        {
          type: "page",
          label: 1,
          active: currentPage === 1,
          mayBeFastBackward: false,
          mayBeFastForward: false
        }
      ]
    };
  }
  if (pageCount === 2) {
    return {
      hasFastBackward: false,
      hasFastForward: false,
      fastForwardTo,
      fastBackwardTo,
      items: [
        {
          type: "page",
          label: 1,
          active: currentPage === 1,
          mayBeFastBackward: false,
          mayBeFastForward: false
        },
        {
          type: "page",
          label: 2,
          active: currentPage === 2,
          mayBeFastBackward: true,
          mayBeFastForward: false
        }
      ]
    };
  }
  const firstPage = 1;
  const lastPage = pageCount;
  let middleStart = currentPage;
  let middleEnd = currentPage;
  const middleDelta = (pageSlot - 5) / 2;
  middleEnd += Math.ceil(middleDelta);
  middleEnd = Math.min(Math.max(middleEnd, firstPage + pageSlot - 3), lastPage - 2);
  middleStart -= Math.floor(middleDelta);
  middleStart = Math.max(Math.min(middleStart, lastPage - pageSlot + 3), firstPage + 2);
  let leftSplit = false;
  let rightSplit = false;
  if (middleStart > firstPage + 2)
    leftSplit = true;
  if (middleEnd < lastPage - 2)
    rightSplit = true;
  const items = [];
  items.push({
    type: "page",
    label: 1,
    active: currentPage === 1,
    mayBeFastBackward: false,
    mayBeFastForward: false
  });
  if (leftSplit) {
    hasFastBackward = true;
    fastBackwardTo = middleStart - 1;
    items.push({
      type: "fast-backward",
      active: false,
      label: void 0,
      options: createRange(firstPage + 1, middleStart - 1)
    });
  } else if (lastPage >= firstPage + 1) {
    items.push({
      type: "page",
      label: firstPage + 1,
      mayBeFastBackward: true,
      mayBeFastForward: false,
      active: currentPage === firstPage + 1
    });
  }
  for (let i = middleStart; i <= middleEnd; ++i) {
    items.push({
      type: "page",
      label: i,
      mayBeFastBackward: false,
      mayBeFastForward: false,
      active: currentPage === i
    });
  }
  if (rightSplit) {
    hasFastForward = true;
    fastForwardTo = middleEnd + 1;
    items.push({
      type: "fast-forward",
      active: false,
      label: void 0,
      options: createRange(middleEnd + 1, lastPage - 1)
    });
  } else if (middleEnd === lastPage - 2 && items[items.length - 1].label !== lastPage - 1) {
    items.push({
      type: "page",
      mayBeFastForward: true,
      mayBeFastBackward: false,
      label: lastPage - 1,
      active: currentPage === lastPage - 1
    });
  }
  if (items[items.length - 1].label !== lastPage) {
    items.push({
      type: "page",
      mayBeFastForward: false,
      mayBeFastBackward: false,
      label: lastPage,
      active: currentPage === lastPage
    });
  }
  return {
    hasFastBackward,
    hasFastForward,
    fastBackwardTo,
    fastForwardTo,
    items
  };
}
function createRange(from, to) {
  const range = [];
  for (let i = from; i <= to; ++i) {
    range.push({
      label: `${i}`,
      value: i
    });
  }
  return range;
}
const hoverStyleProps = `
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`;
const hoverStyleChildren = [cM("button", `
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)];
const style$3 = cB("pagination", `
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`, [cB("pagination-prefix", `
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `), cB("pagination-suffix", `
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `), c$1("> *:not(:first-child)", `
 margin: var(--n-item-margin);
 `), cB("select", `
 width: var(--n-select-width);
 `), c$1("&.transition-disabled", [cB("pagination-item", "transition: none!important;")]), cB("pagination-quick-jumper", `
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `, [cB("input", `
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]), cB("pagination-item", `
 position: relative;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 display: flex;
 align-items: center;
 justify-content: center;
 box-sizing: border-box;
 min-width: var(--n-item-size);
 height: var(--n-item-size);
 padding: var(--n-item-padding);
 background-color: var(--n-item-color);
 color: var(--n-item-text-color);
 border-radius: var(--n-item-border-radius);
 border: var(--n-item-border);
 fill: var(--n-button-icon-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 fill .3s var(--n-bezier);
 `, [cM("button", `
 background: var(--n-button-color);
 color: var(--n-button-icon-color);
 border: var(--n-button-border);
 padding: 0;
 `, [cB("base-icon", `
 font-size: var(--n-button-icon-size);
 `)]), cNotM("disabled", [cM("hover", hoverStyleProps, hoverStyleChildren), c$1("&:hover", hoverStyleProps, hoverStyleChildren), c$1("&:active", `
 background: var(--n-item-color-pressed);
 color: var(--n-item-text-color-pressed);
 border: var(--n-item-border-pressed);
 `, [cM("button", `
 background: var(--n-button-color-pressed);
 border: var(--n-button-border-pressed);
 color: var(--n-button-icon-color-pressed);
 `)]), cM("active", `
 background: var(--n-item-color-active);
 color: var(--n-item-text-color-active);
 border: var(--n-item-border-active);
 `, [c$1("&:hover", `
 background: var(--n-item-color-active-hover);
 `)])]), cM("disabled", `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `, [cM("active, button", `
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]), cM("disabled", `
 cursor: not-allowed;
 `, [cB("pagination-quick-jumper", `
 color: var(--n-jumper-text-color-disabled);
 `)]), cM("simple", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [cB("pagination-quick-jumper", [cB("input", `
 margin: 0;
 `)])])]);
const paginationProps = Object.assign(Object.assign({}, useTheme.props), {
  simple: Boolean,
  page: Number,
  defaultPage: {
    type: Number,
    default: 1
  },
  itemCount: Number,
  pageCount: Number,
  defaultPageCount: {
    type: Number,
    default: 1
  },
  showSizePicker: Boolean,
  pageSize: Number,
  defaultPageSize: Number,
  pageSizes: {
    type: Array,
    default() {
      return [10];
    }
  },
  showQuickJumper: Boolean,
  size: {
    type: String,
    default: "medium"
  },
  disabled: Boolean,
  pageSlot: {
    type: Number,
    default: 9
  },
  selectProps: Object,
  prev: Function,
  next: Function,
  goto: Function,
  prefix: Function,
  suffix: Function,
  label: Function,
  displayOrder: {
    type: Array,
    default: ["pages", "size-picker", "quick-jumper"]
  },
  to: useAdjustedTo.propTo,
  "onUpdate:page": [Function, Array],
  onUpdatePage: [Function, Array],
  "onUpdate:pageSize": [Function, Array],
  onUpdatePageSize: [Function, Array],
  /** @deprecated */
  onPageSizeChange: [Function, Array],
  /** @deprecated */
  onChange: [Function, Array]
});
const NPagination = /* @__PURE__ */ defineComponent({
  name: "Pagination",
  props: paginationProps,
  setup(props) {
    const { mergedComponentPropsRef, mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = useConfig(props);
    const themeRef = useTheme("Pagination", "-pagination", style$3, paginationLight$1, props, mergedClsPrefixRef);
    const { localeRef } = useLocale("Pagination");
    const selfRef = ref(null);
    const uncontrolledPageRef = ref(props.defaultPage);
    const getDefaultPageSize = () => {
      const { defaultPageSize } = props;
      if (defaultPageSize !== void 0)
        return defaultPageSize;
      const pageSizeOption = props.pageSizes[0];
      if (typeof pageSizeOption === "number")
        return pageSizeOption;
      return pageSizeOption.value || 10;
    };
    const uncontrolledPageSizeRef = ref(getDefaultPageSize());
    const mergedPageRef = useMergedState(toRef(props, "page"), uncontrolledPageRef);
    const mergedPageSizeRef = useMergedState(toRef(props, "pageSize"), uncontrolledPageSizeRef);
    const mergedPageCountRef = computed(() => {
      const { itemCount } = props;
      if (itemCount !== void 0) {
        return Math.max(1, Math.ceil(itemCount / mergedPageSizeRef.value));
      }
      const { pageCount } = props;
      if (pageCount !== void 0)
        return Math.max(pageCount, 1);
      return 1;
    });
    const jumperValueRef = ref("");
    watchEffect(() => {
      void props.simple;
      jumperValueRef.value = String(mergedPageRef.value);
    });
    const fastForwardActiveRef = ref(false);
    const fastBackwardActiveRef = ref(false);
    const showFastForwardMenuRef = ref(false);
    const showFastBackwardMenuRef = ref(false);
    const handleFastForwardMouseenter = () => {
      if (props.disabled)
        return;
      fastForwardActiveRef.value = true;
      disableTransitionOneTick();
    };
    const handleFastForwardMouseleave = () => {
      if (props.disabled)
        return;
      fastForwardActiveRef.value = false;
      disableTransitionOneTick();
    };
    const handleFastBackwardMouseenter = () => {
      fastBackwardActiveRef.value = true;
      disableTransitionOneTick();
    };
    const handleFastBackwardMouseleave = () => {
      fastBackwardActiveRef.value = false;
      disableTransitionOneTick();
    };
    const handleMenuSelect = (value) => {
      doUpdatePage(value);
    };
    const pageItemsInfo = computed(() => createPageItemsInfo(mergedPageRef.value, mergedPageCountRef.value, props.pageSlot));
    watchEffect(() => {
      if (!pageItemsInfo.value.hasFastBackward) {
        fastBackwardActiveRef.value = false;
        showFastBackwardMenuRef.value = false;
      } else if (!pageItemsInfo.value.hasFastForward) {
        fastForwardActiveRef.value = false;
        showFastForwardMenuRef.value = false;
      }
    });
    const pageSizeOptionsRef = computed(() => {
      const suffix2 = localeRef.value.selectionSuffix;
      return props.pageSizes.map((size2) => {
        if (typeof size2 === "number") {
          return {
            label: `${size2} / ${suffix2}`,
            value: size2
          };
        } else {
          return size2;
        }
      });
    });
    const inputSizeRef = computed(() => {
      var _a, _b;
      return ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Pagination) === null || _b === void 0 ? void 0 : _b.inputSize) || smallerSize(props.size);
    });
    const selectSizeRef = computed(() => {
      var _a, _b;
      return ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Pagination) === null || _b === void 0 ? void 0 : _b.selectSize) || smallerSize(props.size);
    });
    const startIndexRef = computed(() => {
      return (mergedPageRef.value - 1) * mergedPageSizeRef.value;
    });
    const endIndexRef = computed(() => {
      const endIndex = mergedPageRef.value * mergedPageSizeRef.value - 1;
      const { itemCount } = props;
      if (itemCount !== void 0) {
        return endIndex > itemCount - 1 ? itemCount - 1 : endIndex;
      }
      return endIndex;
    });
    const mergedItemCountRef = computed(() => {
      const { itemCount } = props;
      if (itemCount !== void 0)
        return itemCount;
      return (props.pageCount || 1) * mergedPageSizeRef.value;
    });
    const rtlEnabledRef = useRtl("Pagination", mergedRtlRef, mergedClsPrefixRef);
    const disableTransitionOneTick = () => {
      void nextTick(() => {
        var _a;
        const { value: selfEl } = selfRef;
        if (!selfEl)
          return;
        selfEl.classList.add("transition-disabled");
        void ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.offsetWidth);
        selfEl.classList.remove("transition-disabled");
      });
    };
    function doUpdatePage(page) {
      if (page === mergedPageRef.value)
        return;
      const { "onUpdate:page": _onUpdatePage, onUpdatePage, onChange, simple } = props;
      if (_onUpdatePage)
        call(_onUpdatePage, page);
      if (onUpdatePage)
        call(onUpdatePage, page);
      if (onChange)
        call(onChange, page);
      uncontrolledPageRef.value = page;
      if (simple) {
        jumperValueRef.value = String(page);
      }
    }
    function doUpdatePageSize(pageSize) {
      if (pageSize === mergedPageSizeRef.value)
        return;
      const { "onUpdate:pageSize": _onUpdatePageSize, onUpdatePageSize, onPageSizeChange } = props;
      if (_onUpdatePageSize)
        call(_onUpdatePageSize, pageSize);
      if (onUpdatePageSize)
        call(onUpdatePageSize, pageSize);
      if (onPageSizeChange)
        call(onPageSizeChange, pageSize);
      uncontrolledPageSizeRef.value = pageSize;
      if (mergedPageCountRef.value < mergedPageRef.value) {
        doUpdatePage(mergedPageCountRef.value);
      }
    }
    function forward() {
      if (props.disabled)
        return;
      const page = Math.min(mergedPageRef.value + 1, mergedPageCountRef.value);
      doUpdatePage(page);
    }
    function backward() {
      if (props.disabled)
        return;
      const page = Math.max(mergedPageRef.value - 1, 1);
      doUpdatePage(page);
    }
    function fastForward() {
      if (props.disabled)
        return;
      const page = Math.min(pageItemsInfo.value.fastForwardTo, mergedPageCountRef.value);
      doUpdatePage(page);
    }
    function fastBackward() {
      if (props.disabled)
        return;
      const page = Math.max(pageItemsInfo.value.fastBackwardTo, 1);
      doUpdatePage(page);
    }
    function handleSizePickerChange(value) {
      doUpdatePageSize(value);
    }
    function doQuickJump() {
      const page = parseInt(jumperValueRef.value);
      if (Number.isNaN(page))
        return;
      doUpdatePage(Math.max(1, Math.min(page, mergedPageCountRef.value)));
      if (!props.simple) {
        jumperValueRef.value = "";
      }
    }
    function handleQuickJumperChange() {
      doQuickJump();
    }
    function handlePageItemClick(pageItem) {
      if (props.disabled)
        return;
      switch (pageItem.type) {
        case "page":
          doUpdatePage(pageItem.label);
          break;
        case "fast-backward":
          fastBackward();
          break;
        case "fast-forward":
          fastForward();
          break;
      }
    }
    function handleJumperInput(value) {
      jumperValueRef.value = value.replace(/\D+/g, "");
    }
    watchEffect(() => {
      void mergedPageRef.value;
      void mergedPageSizeRef.value;
      disableTransitionOneTick();
    });
    const cssVarsRef = computed(() => {
      const { size: size2 } = props;
      const { self: { buttonBorder, buttonBorderHover, buttonBorderPressed, buttonIconColor, buttonIconColorHover, buttonIconColorPressed, itemTextColor, itemTextColorHover, itemTextColorPressed, itemTextColorActive, itemTextColorDisabled, itemColor, itemColorHover, itemColorPressed, itemColorActive, itemColorActiveHover, itemColorDisabled, itemBorder, itemBorderHover, itemBorderPressed, itemBorderActive, itemBorderDisabled, itemBorderRadius, jumperTextColor, jumperTextColorDisabled, buttonColor, buttonColorHover, buttonColorPressed, [createKey("itemPadding", size2)]: itemPadding, [createKey("itemMargin", size2)]: itemMargin, [createKey("inputWidth", size2)]: inputWidth, [createKey("selectWidth", size2)]: selectWidth, [createKey("inputMargin", size2)]: inputMargin, [createKey("selectMargin", size2)]: selectMargin, [createKey("jumperFontSize", size2)]: jumperFontSize, [createKey("prefixMargin", size2)]: prefixMargin, [createKey("suffixMargin", size2)]: suffixMargin, [createKey("itemSize", size2)]: itemSize, [createKey("buttonIconSize", size2)]: buttonIconSize, [createKey("itemFontSize", size2)]: itemFontSize, [`${createKey("itemMargin", size2)}Rtl`]: itemMarginRtl, [`${createKey("inputMargin", size2)}Rtl`]: inputMarginRtl }, common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 } } = themeRef.value;
      return {
        "--n-prefix-margin": prefixMargin,
        "--n-suffix-margin": suffixMargin,
        "--n-item-font-size": itemFontSize,
        "--n-select-width": selectWidth,
        "--n-select-margin": selectMargin,
        "--n-input-width": inputWidth,
        "--n-input-margin": inputMargin,
        "--n-input-margin-rtl": inputMarginRtl,
        "--n-item-size": itemSize,
        "--n-item-text-color": itemTextColor,
        "--n-item-text-color-disabled": itemTextColorDisabled,
        "--n-item-text-color-hover": itemTextColorHover,
        "--n-item-text-color-active": itemTextColorActive,
        "--n-item-text-color-pressed": itemTextColorPressed,
        "--n-item-color": itemColor,
        "--n-item-color-hover": itemColorHover,
        "--n-item-color-disabled": itemColorDisabled,
        "--n-item-color-active": itemColorActive,
        "--n-item-color-active-hover": itemColorActiveHover,
        "--n-item-color-pressed": itemColorPressed,
        "--n-item-border": itemBorder,
        "--n-item-border-hover": itemBorderHover,
        "--n-item-border-disabled": itemBorderDisabled,
        "--n-item-border-active": itemBorderActive,
        "--n-item-border-pressed": itemBorderPressed,
        "--n-item-padding": itemPadding,
        "--n-item-border-radius": itemBorderRadius,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-jumper-font-size": jumperFontSize,
        "--n-jumper-text-color": jumperTextColor,
        "--n-jumper-text-color-disabled": jumperTextColorDisabled,
        "--n-item-margin": itemMargin,
        "--n-item-margin-rtl": itemMarginRtl,
        "--n-button-icon-size": buttonIconSize,
        "--n-button-icon-color": buttonIconColor,
        "--n-button-icon-color-hover": buttonIconColorHover,
        "--n-button-icon-color-pressed": buttonIconColorPressed,
        "--n-button-color-hover": buttonColorHover,
        "--n-button-color": buttonColor,
        "--n-button-color-pressed": buttonColorPressed,
        "--n-button-border": buttonBorder,
        "--n-button-border-hover": buttonBorderHover,
        "--n-button-border-pressed": buttonBorderPressed
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("pagination", computed(() => {
      let hash = "";
      const { size: size2 } = props;
      hash += size2[0];
      return hash;
    }), cssVarsRef, props) : void 0;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      locale: localeRef,
      selfRef,
      mergedPage: mergedPageRef,
      pageItems: computed(() => {
        return pageItemsInfo.value.items;
      }),
      mergedItemCount: mergedItemCountRef,
      jumperValue: jumperValueRef,
      pageSizeOptions: pageSizeOptionsRef,
      mergedPageSize: mergedPageSizeRef,
      inputSize: inputSizeRef,
      selectSize: selectSizeRef,
      mergedTheme: themeRef,
      mergedPageCount: mergedPageCountRef,
      startIndex: startIndexRef,
      endIndex: endIndexRef,
      showFastForwardMenu: showFastForwardMenuRef,
      showFastBackwardMenu: showFastBackwardMenuRef,
      fastForwardActive: fastForwardActiveRef,
      fastBackwardActive: fastBackwardActiveRef,
      handleMenuSelect,
      handleFastForwardMouseenter,
      handleFastForwardMouseleave,
      handleFastBackwardMouseenter,
      handleFastBackwardMouseleave,
      handleJumperInput,
      handleBackwardClick: backward,
      handleForwardClick: forward,
      handlePageItemClick,
      handleSizePickerChange,
      handleQuickJumperChange,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const { $slots, mergedClsPrefix, disabled, cssVars, mergedPage, mergedPageCount, pageItems, showSizePicker, showQuickJumper, mergedTheme, locale: locale2, inputSize, selectSize, mergedPageSize, pageSizeOptions, jumperValue, simple, prev, next, prefix: prefix2, suffix: suffix2, label, goto, handleJumperInput, handleSizePickerChange, handleBackwardClick, handlePageItemClick, handleForwardClick, handleQuickJumperChange, onRender } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const renderPrefix = $slots.prefix || prefix2;
    const renderSuffix = $slots.suffix || suffix2;
    const renderPrev = prev || $slots.prev;
    const renderNext = next || $slots.next;
    const renderLabel = label || $slots.label;
    return h(
      "div",
      { ref: "selfRef", class: [
        `${mergedClsPrefix}-pagination`,
        this.themeClass,
        this.rtlEnabled && `${mergedClsPrefix}-pagination--rtl`,
        disabled && `${mergedClsPrefix}-pagination--disabled`,
        simple && `${mergedClsPrefix}-pagination--simple`
      ], style: cssVars },
      renderPrefix ? h("div", { class: `${mergedClsPrefix}-pagination-prefix` }, renderPrefix({
        page: mergedPage,
        pageSize: mergedPageSize,
        pageCount: mergedPageCount,
        startIndex: this.startIndex,
        endIndex: this.endIndex,
        itemCount: this.mergedItemCount
      })) : null,
      this.displayOrder.map((part) => {
        switch (part) {
          case "pages":
            return h(
              Fragment,
              null,
              h("div", { class: [
                `${mergedClsPrefix}-pagination-item`,
                !renderPrev && `${mergedClsPrefix}-pagination-item--button`,
                (mergedPage <= 1 || mergedPage > mergedPageCount || disabled) && `${mergedClsPrefix}-pagination-item--disabled`
              ], onClick: handleBackwardClick }, renderPrev ? renderPrev({
                page: mergedPage,
                pageSize: mergedPageSize,
                pageCount: mergedPageCount,
                startIndex: this.startIndex,
                endIndex: this.endIndex,
                itemCount: this.mergedItemCount
              }) : h(NBaseIcon, { clsPrefix: mergedClsPrefix }, {
                default: () => this.rtlEnabled ? h(ForwardIcon, null) : h(BackwardIcon, null)
              })),
              simple ? h(
                Fragment,
                null,
                h(
                  "div",
                  { class: `${mergedClsPrefix}-pagination-quick-jumper` },
                  h(NInput, { value: jumperValue, onUpdateValue: handleJumperInput, size: inputSize, placeholder: "", disabled, theme: mergedTheme.peers.Input, themeOverrides: mergedTheme.peerOverrides.Input, onChange: handleQuickJumperChange })
                ),
                " / ",
                mergedPageCount
              ) : pageItems.map((pageItem, index) => {
                let contentNode;
                let onMouseenter;
                let onMouseleave;
                const { type } = pageItem;
                switch (type) {
                  case "page":
                    const pageNode = pageItem.label;
                    if (renderLabel) {
                      contentNode = renderLabel({
                        type: "page",
                        node: pageNode,
                        active: pageItem.active
                      });
                    } else {
                      contentNode = pageNode;
                    }
                    break;
                  case "fast-forward":
                    const fastForwardNode = this.fastForwardActive ? h(NBaseIcon, { clsPrefix: mergedClsPrefix }, {
                      default: () => this.rtlEnabled ? h(FastBackwardIcon, null) : h(FastForwardIcon, null)
                    }) : h(NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => h(MoreIcon, null) });
                    if (renderLabel) {
                      contentNode = renderLabel({
                        type: "fast-forward",
                        node: fastForwardNode,
                        active: this.fastForwardActive || this.showFastForwardMenu
                      });
                    } else {
                      contentNode = fastForwardNode;
                    }
                    onMouseenter = this.handleFastForwardMouseenter;
                    onMouseleave = this.handleFastForwardMouseleave;
                    break;
                  case "fast-backward":
                    const fastBackwardNode = this.fastBackwardActive ? h(NBaseIcon, { clsPrefix: mergedClsPrefix }, {
                      default: () => this.rtlEnabled ? h(FastForwardIcon, null) : h(FastBackwardIcon, null)
                    }) : h(NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => h(MoreIcon, null) });
                    if (renderLabel) {
                      contentNode = renderLabel({
                        type: "fast-backward",
                        node: fastBackwardNode,
                        active: this.fastBackwardActive || this.showFastBackwardMenu
                      });
                    } else {
                      contentNode = fastBackwardNode;
                    }
                    onMouseenter = this.handleFastBackwardMouseenter;
                    onMouseleave = this.handleFastBackwardMouseleave;
                    break;
                }
                const itemNode = h("div", { key: index, class: [
                  `${mergedClsPrefix}-pagination-item`,
                  pageItem.active && `${mergedClsPrefix}-pagination-item--active`,
                  type !== "page" && (type === "fast-backward" && this.showFastBackwardMenu || type === "fast-forward" && this.showFastForwardMenu) && `${mergedClsPrefix}-pagination-item--hover`,
                  disabled && `${mergedClsPrefix}-pagination-item--disabled`,
                  type === "page" && `${mergedClsPrefix}-pagination-item--clickable`
                ], onClick: () => {
                  handlePageItemClick(pageItem);
                }, onMouseenter, onMouseleave }, contentNode);
                if (type === "page" && !pageItem.mayBeFastBackward && !pageItem.mayBeFastForward) {
                  return itemNode;
                } else {
                  const key = pageItem.type === "page" ? pageItem.mayBeFastBackward ? "fast-backward" : "fast-forward" : pageItem.type;
                  return h(NPopselect, { to: this.to, key, disabled, trigger: "hover", virtualScroll: true, style: { width: "60px" }, theme: mergedTheme.peers.Popselect, themeOverrides: mergedTheme.peerOverrides.Popselect, builtinThemeOverrides: {
                    peers: {
                      InternalSelectMenu: {
                        height: "calc(var(--n-option-height) * 4.6)"
                      }
                    }
                  }, nodeProps: () => ({
                    style: {
                      justifyContent: "center"
                    }
                  }), show: type === "page" ? false : type === "fast-backward" ? this.showFastBackwardMenu : this.showFastForwardMenu, onUpdateShow: (value) => {
                    if (type === "page")
                      return;
                    if (value) {
                      if (type === "fast-backward") {
                        this.showFastBackwardMenu = value;
                      } else {
                        this.showFastForwardMenu = value;
                      }
                    } else {
                      this.showFastBackwardMenu = false;
                      this.showFastForwardMenu = false;
                    }
                  }, options: pageItem.type !== "page" ? pageItem.options : [], onUpdateValue: this.handleMenuSelect, scrollable: true, showCheckmark: false }, { default: () => itemNode });
                }
              }),
              h("div", { class: [
                `${mergedClsPrefix}-pagination-item`,
                !renderNext && `${mergedClsPrefix}-pagination-item--button`,
                {
                  [`${mergedClsPrefix}-pagination-item--disabled`]: mergedPage < 1 || mergedPage >= mergedPageCount || disabled
                }
              ], onClick: handleForwardClick }, renderNext ? renderNext({
                page: mergedPage,
                pageSize: mergedPageSize,
                pageCount: mergedPageCount,
                itemCount: this.mergedItemCount,
                startIndex: this.startIndex,
                endIndex: this.endIndex
              }) : h(NBaseIcon, { clsPrefix: mergedClsPrefix }, {
                default: () => this.rtlEnabled ? h(BackwardIcon, null) : h(ForwardIcon, null)
              }))
            );
          case "size-picker": {
            return !simple && showSizePicker ? h(NSelect, Object.assign({ consistentMenuWidth: false, placeholder: "", showCheckmark: false, to: this.to }, this.selectProps, { size: selectSize, options: pageSizeOptions, value: mergedPageSize, disabled, theme: mergedTheme.peers.Select, themeOverrides: mergedTheme.peerOverrides.Select, onUpdateValue: handleSizePickerChange })) : null;
          }
          case "quick-jumper":
            return !simple && showQuickJumper ? h(
              "div",
              { class: `${mergedClsPrefix}-pagination-quick-jumper` },
              goto ? goto() : resolveSlot(this.$slots.goto, () => [locale2.goto]),
              h(NInput, { value: jumperValue, onUpdateValue: handleJumperInput, size: inputSize, placeholder: "", disabled, theme: mergedTheme.peers.Input, themeOverrides: mergedTheme.peerOverrides.Input, onChange: handleQuickJumperChange })
            ) : null;
          default:
            return null;
        }
      }),
      renderSuffix ? h("div", { class: `${mergedClsPrefix}-pagination-suffix` }, renderSuffix({
        page: mergedPage,
        pageSize: mergedPageSize,
        pageCount: mergedPageCount,
        startIndex: this.startIndex,
        endIndex: this.endIndex,
        itemCount: this.mergedItemCount
      })) : null
    );
  }
});
const commonVariables = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
const self$3 = (vars) => {
  const { borderColor, primaryColor, baseColor, textColorDisabled, inputColorDisabled, textColor2, opacityDisabled, borderRadius, fontSizeSmall, fontSizeMedium, fontSizeLarge, heightSmall, heightMedium, heightLarge, lineHeight: lineHeight2 } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    labelLineHeight: lineHeight2,
    buttonHeightSmall: heightSmall,
    buttonHeightMedium: heightMedium,
    buttonHeightLarge: heightLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    boxShadow: `inset 0 0 0 1px ${borderColor}`,
    boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
    boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
    boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
    boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
    color: baseColor,
    colorDisabled: inputColorDisabled,
    colorActive: "#0000",
    textColor: textColor2,
    textColorDisabled,
    dotColorActive: primaryColor,
    dotColorDisabled: borderColor,
    buttonBorderColor: borderColor,
    buttonBorderColorActive: primaryColor,
    buttonBorderColorHover: borderColor,
    buttonColor: baseColor,
    buttonColorActive: baseColor,
    buttonTextColor: textColor2,
    buttonTextColorActive: primaryColor,
    buttonTextColorHover: primaryColor,
    opacityDisabled,
    buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
    buttonBoxShadowHover: "inset 0 0 0 1px #0000",
    buttonBoxShadow: "inset 0 0 0 1px #0000",
    buttonBorderRadius: borderRadius
  });
};
const radioLight = {
  name: "Radio",
  common: commonLight,
  self: self$3
};
const radioLight$1 = radioLight;
const radioProps = {
  name: String,
  value: {
    type: [String, Number, Boolean],
    default: "on"
  },
  checked: {
    type: Boolean,
    default: void 0
  },
  defaultChecked: Boolean,
  disabled: {
    type: Boolean,
    default: void 0
  },
  label: String,
  size: String,
  onUpdateChecked: [Function, Array],
  "onUpdate:checked": [Function, Array],
  // deprecated
  checkedValue: {
    type: Boolean,
    default: void 0
  }
};
const radioGroupInjectionKey = createInjectionKey("n-radio-group");
function setup(props) {
  const formItem = useFormItem(props, {
    mergedSize(NFormItem) {
      const { size: size2 } = props;
      if (size2 !== void 0)
        return size2;
      if (NRadioGroup2) {
        const { mergedSizeRef: { value: mergedSize } } = NRadioGroup2;
        if (mergedSize !== void 0) {
          return mergedSize;
        }
      }
      if (NFormItem) {
        return NFormItem.mergedSize.value;
      }
      return "medium";
    },
    mergedDisabled(NFormItem) {
      if (props.disabled)
        return true;
      if (NRadioGroup2 === null || NRadioGroup2 === void 0 ? void 0 : NRadioGroup2.disabledRef.value)
        return true;
      if (NFormItem === null || NFormItem === void 0 ? void 0 : NFormItem.disabled.value)
        return true;
      return false;
    }
  });
  const { mergedSizeRef, mergedDisabledRef } = formItem;
  const inputRef = ref(null);
  const labelRef = ref(null);
  const NRadioGroup2 = inject(radioGroupInjectionKey, null);
  const uncontrolledCheckedRef = ref(props.defaultChecked);
  const controlledCheckedRef = toRef(props, "checked");
  const mergedCheckedRef = useMergedState(controlledCheckedRef, uncontrolledCheckedRef);
  const renderSafeCheckedRef = useMemo(() => {
    if (NRadioGroup2)
      return NRadioGroup2.valueRef.value === props.value;
    return mergedCheckedRef.value;
  });
  const mergedNameRef = useMemo(() => {
    const { name } = props;
    if (name !== void 0)
      return name;
    if (NRadioGroup2)
      return NRadioGroup2.nameRef.value;
  });
  const focusRef = ref(false);
  function doUpdateChecked() {
    if (NRadioGroup2) {
      const { doUpdateValue } = NRadioGroup2;
      const { value } = props;
      call(doUpdateValue, value);
    } else {
      const { onUpdateChecked, "onUpdate:checked": _onUpdateChecked } = props;
      const { nTriggerFormInput, nTriggerFormChange } = formItem;
      if (onUpdateChecked)
        call(onUpdateChecked, true);
      if (_onUpdateChecked)
        call(_onUpdateChecked, true);
      nTriggerFormInput();
      nTriggerFormChange();
      uncontrolledCheckedRef.value = true;
    }
  }
  function toggle() {
    if (mergedDisabledRef.value)
      return;
    if (!renderSafeCheckedRef.value) {
      doUpdateChecked();
    }
  }
  function handleRadioInputChange() {
    toggle();
  }
  function handleRadioInputBlur() {
    focusRef.value = false;
  }
  function handleRadioInputFocus() {
    focusRef.value = true;
  }
  return {
    mergedClsPrefix: NRadioGroup2 ? NRadioGroup2.mergedClsPrefixRef : useConfig(props).mergedClsPrefixRef,
    inputRef,
    labelRef,
    mergedName: mergedNameRef,
    mergedDisabled: mergedDisabledRef,
    uncontrolledChecked: uncontrolledCheckedRef,
    renderSafeChecked: renderSafeCheckedRef,
    focus: focusRef,
    mergedSize: mergedSizeRef,
    handleRadioInputChange,
    handleRadioInputBlur,
    handleRadioInputFocus
  };
}
const style$2 = cB("radio", `
 line-height: var(--n-label-line-height);
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 align-items: flex-start;
 flex-wrap: nowrap;
 font-size: var(--n-font-size);
 word-break: break-word;
`, [cM("checked", [cE("dot", `
 background-color: var(--n-color-active);
 `)]), cE("dot-wrapper", `
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `), cB("radio-input", `
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 cursor: pointer;
 `), cE("dot", `
 position: absolute;
 top: 50%;
 left: 0;
 transform: translateY(-50%);
 height: var(--n-radio-size);
 width: var(--n-radio-size);
 background: var(--n-color);
 box-shadow: var(--n-box-shadow);
 border-radius: 50%;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `, [c$1("&::before", `
 content: "";
 opacity: 0;
 position: absolute;
 left: 4px;
 top: 4px;
 height: calc(100% - 8px);
 width: calc(100% - 8px);
 border-radius: 50%;
 transform: scale(.8);
 background: var(--n-dot-color-active);
 transition: 
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `), cM("checked", {
  boxShadow: "var(--n-box-shadow-active)"
}, [c$1("&::before", `
 opacity: 1;
 transform: scale(1);
 `)])]), cE("label", `
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `), cNotM("disabled", `
 cursor: pointer;
 `, [c$1("&:hover", [cE("dot", {
  boxShadow: "var(--n-box-shadow-hover)"
})]), cM("focus", [c$1("&:not(:active)", [cE("dot", {
  boxShadow: "var(--n-box-shadow-focus)"
})])])]), cM("disabled", `
 cursor: not-allowed;
 `, [cE("dot", {
  boxShadow: "var(--n-box-shadow-disabled)",
  backgroundColor: "var(--n-color-disabled)"
}, [c$1("&::before", {
  backgroundColor: "var(--n-dot-color-disabled)"
}), cM("checked", `
 opacity: 1;
 `)]), cE("label", {
  color: "var(--n-text-color-disabled)"
}), cB("radio-input", `
 cursor: not-allowed;
 `)])]);
const NRadio = /* @__PURE__ */ defineComponent({
  name: "Radio",
  props: Object.assign(Object.assign({}, useTheme.props), radioProps),
  setup(props) {
    const radio = setup(props);
    const themeRef = useTheme("Radio", "-radio", style$2, radioLight$1, props, radio.mergedClsPrefix);
    const cssVarsRef = computed(() => {
      const { mergedSize: { value: size2 } } = radio;
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: { boxShadow, boxShadowActive, boxShadowDisabled, boxShadowFocus, boxShadowHover, color, colorDisabled, colorActive, textColor, textColorDisabled, dotColorActive, dotColorDisabled, labelPadding, labelLineHeight, labelFontWeight, [createKey("fontSize", size2)]: fontSize2, [createKey("radioSize", size2)]: radioSize } } = themeRef.value;
      return {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-label-line-height": labelLineHeight,
        "--n-label-font-weight": labelFontWeight,
        "--n-box-shadow": boxShadow,
        "--n-box-shadow-active": boxShadowActive,
        "--n-box-shadow-disabled": boxShadowDisabled,
        "--n-box-shadow-focus": boxShadowFocus,
        "--n-box-shadow-hover": boxShadowHover,
        "--n-color": color,
        "--n-color-active": colorActive,
        "--n-color-disabled": colorDisabled,
        "--n-dot-color-active": dotColorActive,
        "--n-dot-color-disabled": dotColorDisabled,
        "--n-font-size": fontSize2,
        "--n-radio-size": radioSize,
        "--n-text-color": textColor,
        "--n-text-color-disabled": textColorDisabled,
        "--n-label-padding": labelPadding
      };
    });
    const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef } = useConfig(props);
    const rtlEnabledRef = useRtl("Radio", mergedRtlRef, mergedClsPrefixRef);
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("radio", computed(() => radio.mergedSize.value[0]), cssVarsRef, props) : void 0;
    return Object.assign(radio, {
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    const { $slots, mergedClsPrefix, onRender, label } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h(
      "label",
      { class: [
        `${mergedClsPrefix}-radio`,
        this.themeClass,
        {
          [`${mergedClsPrefix}-radio--rtl`]: this.rtlEnabled,
          [`${mergedClsPrefix}-radio--disabled`]: this.mergedDisabled,
          [`${mergedClsPrefix}-radio--checked`]: this.renderSafeChecked,
          [`${mergedClsPrefix}-radio--focus`]: this.focus
        }
      ], style: this.cssVars },
      h("input", { ref: "inputRef", type: "radio", class: `${mergedClsPrefix}-radio-input`, value: this.value, name: this.mergedName, checked: this.renderSafeChecked, disabled: this.mergedDisabled, onChange: this.handleRadioInputChange, onFocus: this.handleRadioInputFocus, onBlur: this.handleRadioInputBlur }),
      h(
        "div",
        { class: `${mergedClsPrefix}-radio__dot-wrapper` },
        " ",
        h("div", { class: [
          `${mergedClsPrefix}-radio__dot`,
          this.renderSafeChecked && `${mergedClsPrefix}-radio__dot--checked`
        ] })
      ),
      resolveWrappedSlot($slots.default, (children) => {
        if (!children && !label)
          return null;
        return h("div", { ref: "labelRef", class: `${mergedClsPrefix}-radio__label` }, children || label);
      })
    );
  }
});
const style$1 = cB("radio-group", `
 display: inline-block;
 font-size: var(--n-font-size);
`, [cE("splitor", `
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `, [cM("checked", {
  backgroundColor: "var(--n-button-border-color-active)"
}), cM("disabled", {
  opacity: "var(--n-opacity-disabled)"
})]), cM("button-group", `
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [cB("radio-button", {
  height: "var(--n-height)",
  lineHeight: "var(--n-height)"
}), cE("splitor", {
  height: "var(--n-height)"
})]), cB("radio-button", `
 vertical-align: bottom;
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-block;
 box-sizing: border-box;
 padding-left: 14px;
 padding-right: 14px;
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: var(--n-button-text-color);
 border-top: 1px solid var(--n-button-border-color);
 border-bottom: 1px solid var(--n-button-border-color);
 `, [cB("radio-input", `
 pointer-events: none;
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 `), cE("state-border", `
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `), c$1("&:first-child", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `, [cE("state-border", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]), c$1("&:last-child", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `, [cE("state-border", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]), cNotM("disabled", `
 cursor: pointer;
 `, [c$1("&:hover", [cE("state-border", `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `), cNotM("checked", {
  color: "var(--n-button-text-color-hover)"
})]), cM("focus", [c$1("&:not(:active)", [cE("state-border", {
  boxShadow: "var(--n-button-box-shadow-focus)"
})])])]), cM("checked", `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `), cM("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);
function mapSlot(defaultSlot, value, clsPrefix) {
  var _a;
  const children = [];
  let isButtonGroup = false;
  for (let i = 0; i < defaultSlot.length; ++i) {
    const wrappedInstance = defaultSlot[i];
    const name = (_a = wrappedInstance.type) === null || _a === void 0 ? void 0 : _a.name;
    if (name === "RadioButton") {
      isButtonGroup = true;
    }
    const instanceProps = wrappedInstance.props;
    if (name !== "RadioButton") {
      children.push(wrappedInstance);
      continue;
    }
    if (i === 0) {
      children.push(wrappedInstance);
    } else {
      const lastInstanceProps = children[children.length - 1].props;
      const lastInstanceChecked = value === lastInstanceProps.value;
      const lastInstanceDisabled = lastInstanceProps.disabled;
      const currentInstanceChecked = value === instanceProps.value;
      const currentInstanceDisabled = instanceProps.disabled;
      const lastInstancePriority = (lastInstanceChecked ? 2 : 0) + (!lastInstanceDisabled ? 1 : 0);
      const currentInstancePriority = (currentInstanceChecked ? 2 : 0) + (!currentInstanceDisabled ? 1 : 0);
      const lastInstanceClass = {
        [`${clsPrefix}-radio-group__splitor--disabled`]: lastInstanceDisabled,
        [`${clsPrefix}-radio-group__splitor--checked`]: lastInstanceChecked
      };
      const currentInstanceClass = {
        [`${clsPrefix}-radio-group__splitor--disabled`]: currentInstanceDisabled,
        [`${clsPrefix}-radio-group__splitor--checked`]: currentInstanceChecked
      };
      const splitorClass = lastInstancePriority < currentInstancePriority ? currentInstanceClass : lastInstanceClass;
      children.push(h("div", { class: [`${clsPrefix}-radio-group__splitor`, splitorClass] }), wrappedInstance);
    }
  }
  return {
    children,
    isButtonGroup
  };
}
const radioGroupProps = Object.assign(Object.assign({}, useTheme.props), { name: String, value: [String, Number, Boolean], defaultValue: {
  type: [String, Number, Boolean],
  default: null
}, size: String, disabled: {
  type: Boolean,
  default: void 0
}, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array] });
const NRadioGroup = /* @__PURE__ */ defineComponent({
  name: "RadioGroup",
  props: radioGroupProps,
  setup(props) {
    const selfElRef = ref(null);
    const { mergedSizeRef, mergedDisabledRef, nTriggerFormChange, nTriggerFormInput, nTriggerFormBlur, nTriggerFormFocus } = useFormItem(props);
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = useConfig(props);
    const themeRef = useTheme("Radio", "-radio-group", style$1, radioLight$1, props, mergedClsPrefixRef);
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, "value");
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    function doUpdateValue(value) {
      const { onUpdateValue, "onUpdate:value": _onUpdateValue } = props;
      if (onUpdateValue) {
        call(onUpdateValue, value);
      }
      if (_onUpdateValue) {
        call(_onUpdateValue, value);
      }
      uncontrolledValueRef.value = value;
      nTriggerFormChange();
      nTriggerFormInput();
    }
    function handleFocusin(e) {
      const { value: selfEl } = selfElRef;
      if (!selfEl)
        return;
      if (selfEl.contains(e.relatedTarget))
        return;
      nTriggerFormFocus();
    }
    function handleFocusout(e) {
      const { value: selfEl } = selfElRef;
      if (!selfEl)
        return;
      if (selfEl.contains(e.relatedTarget))
        return;
      nTriggerFormBlur();
    }
    provide(radioGroupInjectionKey, {
      mergedClsPrefixRef,
      nameRef: toRef(props, "name"),
      valueRef: mergedValueRef,
      disabledRef: mergedDisabledRef,
      mergedSizeRef,
      doUpdateValue
    });
    const rtlEnabledRef = useRtl("Radio", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { value: size2 } = mergedSizeRef;
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: { buttonBorderColor, buttonBorderColorActive, buttonBorderRadius, buttonBoxShadow, buttonBoxShadowFocus, buttonBoxShadowHover, buttonColorActive, buttonTextColor, buttonTextColorActive, buttonTextColorHover, opacityDisabled, [createKey("buttonHeight", size2)]: height, [createKey("fontSize", size2)]: fontSize2 } } = themeRef.value;
      return {
        "--n-font-size": fontSize2,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-button-border-color": buttonBorderColor,
        "--n-button-border-color-active": buttonBorderColorActive,
        "--n-button-border-radius": buttonBorderRadius,
        "--n-button-box-shadow": buttonBoxShadow,
        "--n-button-box-shadow-focus": buttonBoxShadowFocus,
        "--n-button-box-shadow-hover": buttonBoxShadowHover,
        "--n-button-color-active": buttonColorActive,
        "--n-button-text-color": buttonTextColor,
        "--n-button-text-color-hover": buttonTextColorHover,
        "--n-button-text-color-active": buttonTextColorActive,
        "--n-height": height,
        "--n-opacity-disabled": opacityDisabled
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("radio-group", computed(() => mergedSizeRef.value[0]), cssVarsRef, props) : void 0;
    return {
      selfElRef,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      handleFocusout,
      handleFocusin,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const { mergedValue, mergedClsPrefix, handleFocusin, handleFocusout } = this;
    const { children, isButtonGroup } = mapSlot(flatten$2(getSlot$1(this)), mergedValue, mergedClsPrefix);
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", { onFocusin: handleFocusin, onFocusout: handleFocusout, ref: "selfElRef", class: [
      `${mergedClsPrefix}-radio-group`,
      this.rtlEnabled && `${mergedClsPrefix}-radio-group--rtl`,
      this.themeClass,
      isButtonGroup && `${mergedClsPrefix}-radio-group--button-group`
    ], style: this.cssVars }, children);
  }
});
const commonVars = {
  gapSmall: "4px 8px",
  gapMedium: "8px 12px",
  gapLarge: "12px 16px"
};
const self$2 = () => {
  return commonVars;
};
const spaceLight = {
  name: "Space",
  self: self$2
};
const spaceLight$1 = spaceLight;
let supportFlexGap;
const ensureSupportFlexGap = () => {
  if (!isBrowser$1)
    return true;
  if (supportFlexGap === void 0) {
    const flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";
    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));
    document.body.appendChild(flex);
    const isSupported = flex.scrollHeight === 1;
    document.body.removeChild(flex);
    return supportFlexGap = isSupported;
  }
  return supportFlexGap;
};
const spaceProps = Object.assign(Object.assign({}, useTheme.props), {
  align: String,
  justify: {
    type: String,
    default: "start"
  },
  inline: Boolean,
  vertical: Boolean,
  size: {
    type: [String, Number, Array],
    default: "medium"
  },
  wrapItem: {
    type: Boolean,
    default: true
  },
  itemStyle: [String, Object],
  wrap: {
    type: Boolean,
    default: true
  },
  // internal
  internalUseGap: {
    type: Boolean,
    default: void 0
  }
});
const NSpace = /* @__PURE__ */ defineComponent({
  name: "Space",
  props: spaceProps,
  setup(props) {
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props);
    const themeRef = useTheme("Space", "-space", void 0, spaceLight$1, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl("Space", mergedRtlRef, mergedClsPrefixRef);
    return {
      useGap: ensureSupportFlexGap(),
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      margin: computed(() => {
        const { size: size2 } = props;
        if (Array.isArray(size2)) {
          return {
            horizontal: size2[0],
            vertical: size2[1]
          };
        }
        if (typeof size2 === "number") {
          return {
            horizontal: size2,
            vertical: size2
          };
        }
        const { self: { [createKey("gap", size2)]: gap } } = themeRef.value;
        const { row, col } = getGap(gap);
        return {
          horizontal: depx(col),
          vertical: depx(row)
        };
      })
    };
  },
  render() {
    const { vertical, align, inline, justify, itemStyle, margin, wrap, mergedClsPrefix, rtlEnabled, useGap, wrapItem, internalUseGap } = this;
    const children = flatten$2(getSlot$1(this));
    if (!children.length)
      return null;
    const horizontalMargin = `${margin.horizontal}px`;
    const semiHorizontalMargin = `${margin.horizontal / 2}px`;
    const verticalMargin = `${margin.vertical}px`;
    const semiVerticalMargin = `${margin.vertical / 2}px`;
    const lastIndex = children.length - 1;
    const isJustifySpace = justify.startsWith("space-");
    return h("div", { role: "none", class: [
      `${mergedClsPrefix}-space`,
      rtlEnabled && `${mergedClsPrefix}-space--rtl`
    ], style: {
      display: inline ? "inline-flex" : "flex",
      flexDirection: vertical ? "column" : "row",
      justifyContent: ["start", "end"].includes(justify) ? "flex-" + justify : justify,
      flexWrap: !wrap || vertical ? "nowrap" : "wrap",
      marginTop: useGap || vertical ? "" : `-${semiVerticalMargin}`,
      marginBottom: useGap || vertical ? "" : `-${semiVerticalMargin}`,
      alignItems: align,
      gap: useGap ? `${margin.vertical}px ${margin.horizontal}px` : ""
    } }, !wrapItem && (useGap || internalUseGap) ? children : children.map((child, index) => h("div", { role: "none", style: [
      itemStyle,
      {
        maxWidth: "100%"
      },
      useGap ? "" : vertical ? {
        marginBottom: index !== lastIndex ? verticalMargin : ""
      } : rtlEnabled ? {
        marginLeft: isJustifySpace ? justify === "space-between" && index === lastIndex ? "" : semiHorizontalMargin : index !== lastIndex ? horizontalMargin : "",
        marginRight: isJustifySpace ? justify === "space-between" && index === 0 ? "" : semiHorizontalMargin : "",
        paddingTop: semiVerticalMargin,
        paddingBottom: semiVerticalMargin
      } : {
        marginRight: isJustifySpace ? justify === "space-between" && index === lastIndex ? "" : semiHorizontalMargin : index !== lastIndex ? horizontalMargin : "",
        marginLeft: isJustifySpace ? justify === "space-between" && index === 0 ? "" : semiHorizontalMargin : "",
        paddingTop: semiVerticalMargin,
        paddingBottom: semiVerticalMargin
      }
    ] }, child)));
  }
});
const self$1 = (vars) => {
  const { textColorDisabled } = vars;
  return {
    iconColorDisabled: textColorDisabled
  };
};
const inputNumberLight = createTheme({
  name: "InputNumber",
  common: commonLight,
  peers: {
    Button: buttonLight$1,
    Input: inputLight$1
  },
  self: self$1
});
const inputNumberLight$1 = inputNumberLight;
function parse(value) {
  if (value === void 0 || value === null || typeof value === "string" && value.trim() === "") {
    return null;
  }
  return Number(value);
}
function isWipValue(value) {
  return value.includes(".") && (/^(-)?\d+.*(\.|0)$/.test(value) || /^\.\d+$/.test(value));
}
function validator(value) {
  if (value === void 0 || value === null)
    return true;
  if (Number.isNaN(value))
    return false;
  return true;
}
function format(value, precision) {
  if (value === void 0 || value === null)
    return "";
  return precision === void 0 ? String(value) : value.toFixed(precision);
}
function parseNumber(number) {
  if (number === null)
    return null;
  if (typeof number === "number") {
    return number;
  } else {
    const parsedNumber = Number(number);
    if (Number.isNaN(parsedNumber))
      return null;
    else {
      return parsedNumber;
    }
  }
}
const style = c$1([cB("input-number-suffix", `
 display: inline-block;
 margin-right: 10px;
 `), cB("input-number-prefix", `
 display: inline-block;
 margin-left: 10px;
 `)]);
const HOLDING_CHANGE_THRESHOLD = 800;
const HOLDING_CHANGE_INTERVAL = 100;
const inputNumberProps = Object.assign(Object.assign({}, useTheme.props), {
  autofocus: Boolean,
  loading: {
    type: Boolean,
    default: void 0
  },
  placeholder: String,
  defaultValue: {
    type: Number,
    default: null
  },
  value: Number,
  step: {
    type: [Number, String],
    default: 1
  },
  min: [Number, String],
  max: [Number, String],
  size: String,
  disabled: {
    type: Boolean,
    default: void 0
  },
  validator: Function,
  bordered: {
    type: Boolean,
    default: void 0
  },
  showButton: {
    type: Boolean,
    default: true
  },
  buttonPlacement: {
    type: String,
    default: "right"
  },
  readonly: Boolean,
  clearable: Boolean,
  keyboard: {
    type: Object,
    default: {}
  },
  updateValueOnInput: {
    type: Boolean,
    default: true
  },
  parse: Function,
  format: Function,
  precision: Number,
  status: String,
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
  onClear: [Function, Array],
  // deprecated
  onChange: [Function, Array]
});
const NInputNumber = /* @__PURE__ */ defineComponent({
  name: "InputNumber",
  props: inputNumberProps,
  setup(props) {
    const { mergedBorderedRef, mergedClsPrefixRef, mergedRtlRef } = useConfig(props);
    const themeRef = useTheme("InputNumber", "-input-number", style, inputNumberLight$1, props, mergedClsPrefixRef);
    const { localeRef } = useLocale("InputNumber");
    const formItem = useFormItem(props);
    const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem;
    const inputInstRef = ref(null);
    const minusButtonInstRef = ref(null);
    const addButtonInstRef = ref(null);
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, "value");
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const displayedValueRef = ref("");
    const getPrecision = (value) => {
      const fraction = String(value).split(".")[1];
      return fraction ? fraction.length : 0;
    };
    const getMaxPrecision = (currentValue) => {
      const precisions = [props.min, props.max, props.step, currentValue].map((value) => {
        if (value === void 0)
          return 0;
        return getPrecision(value);
      });
      return Math.max(...precisions);
    };
    const mergedPlaceholderRef = useMemo(() => {
      const { placeholder } = props;
      if (placeholder !== void 0)
        return placeholder;
      return localeRef.value.placeholder;
    });
    const mergedStepRef = useMemo(() => {
      const parsedNumber = parseNumber(props.step);
      if (parsedNumber !== null) {
        return parsedNumber === 0 ? 1 : Math.abs(parsedNumber);
      }
      return 1;
    });
    const mergedMinRef = useMemo(() => {
      const parsedNumber = parseNumber(props.min);
      if (parsedNumber !== null)
        return parsedNumber;
      else
        return null;
    });
    const mergedMaxRef = useMemo(() => {
      const parsedNumber = parseNumber(props.max);
      if (parsedNumber !== null)
        return parsedNumber;
      else
        return null;
    });
    const doUpdateValue = (value) => {
      const { value: mergedValue } = mergedValueRef;
      if (value === mergedValue) {
        deriveDisplayedValueFromValue();
        return;
      }
      const { "onUpdate:value": _onUpdateValue, onUpdateValue, onChange } = props;
      const { nTriggerFormInput, nTriggerFormChange } = formItem;
      if (onChange)
        call(onChange, value);
      if (onUpdateValue)
        call(onUpdateValue, value);
      if (_onUpdateValue)
        call(_onUpdateValue, value);
      uncontrolledValueRef.value = value;
      nTriggerFormInput();
      nTriggerFormChange();
    };
    const deriveValueFromDisplayedValue = ({ offset, doUpdateIfValid, fixPrecision, isInputing }) => {
      const { value: displayedValue } = displayedValueRef;
      if (isInputing && isWipValue(displayedValue)) {
        return false;
      }
      const parsedValue = (props.parse || parse)(displayedValue);
      if (parsedValue === null) {
        if (doUpdateIfValid)
          doUpdateValue(null);
        return null;
      }
      if (validator(parsedValue)) {
        const currentPrecision = getPrecision(parsedValue);
        const { precision } = props;
        if (precision !== void 0 && precision < currentPrecision && !fixPrecision) {
          return false;
        }
        let nextValue = parseFloat((parsedValue + offset).toFixed(precision !== null && precision !== void 0 ? precision : getMaxPrecision(parsedValue)));
        if (validator(nextValue)) {
          const { value: mergedMax } = mergedMaxRef;
          const { value: mergedMin } = mergedMinRef;
          if (mergedMax !== null && nextValue > mergedMax) {
            if (!doUpdateIfValid || isInputing)
              return false;
            nextValue = mergedMax;
          }
          if (mergedMin !== null && nextValue < mergedMin) {
            if (!doUpdateIfValid || isInputing)
              return false;
            nextValue = mergedMin;
          }
          if (props.validator && !props.validator(nextValue))
            return false;
          if (doUpdateIfValid)
            doUpdateValue(nextValue);
          return nextValue;
        }
      }
      return false;
    };
    const deriveDisplayedValueFromValue = () => {
      const { value: mergedValue } = mergedValueRef;
      if (validator(mergedValue)) {
        const { format: formatProp, precision } = props;
        if (formatProp) {
          displayedValueRef.value = formatProp(mergedValue);
        } else {
          if (mergedValue === null || precision === void 0 || // precision overflow
          getPrecision(mergedValue) > precision) {
            displayedValueRef.value = format(mergedValue, void 0);
          } else {
            displayedValueRef.value = format(mergedValue, precision);
          }
        }
      } else {
        displayedValueRef.value = String(mergedValue);
      }
    };
    deriveDisplayedValueFromValue();
    const displayedValueInvalidRef = useMemo(() => {
      const derivedValue = deriveValueFromDisplayedValue({
        offset: 0,
        doUpdateIfValid: false,
        isInputing: false,
        fixPrecision: false
      });
      return derivedValue === false;
    });
    const minusableRef = useMemo(() => {
      const { value: mergedValue } = mergedValueRef;
      if (props.validator && mergedValue === null) {
        return false;
      }
      const { value: mergedStep } = mergedStepRef;
      const derivedNextValue = deriveValueFromDisplayedValue({
        offset: -mergedStep,
        doUpdateIfValid: false,
        isInputing: false,
        fixPrecision: false
      });
      return derivedNextValue !== false;
    });
    const addableRef = useMemo(() => {
      const { value: mergedValue } = mergedValueRef;
      if (props.validator && mergedValue === null) {
        return false;
      }
      const { value: mergedStep } = mergedStepRef;
      const derivedNextValue = deriveValueFromDisplayedValue({
        offset: +mergedStep,
        doUpdateIfValid: false,
        isInputing: false,
        fixPrecision: false
      });
      return derivedNextValue !== false;
    });
    function doFocus(e) {
      const { onFocus } = props;
      const { nTriggerFormFocus } = formItem;
      if (onFocus)
        call(onFocus, e);
      nTriggerFormFocus();
    }
    function doBlur(e) {
      var _a, _b;
      if (e.target === ((_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.wrapperElRef)) {
        return;
      }
      const value = deriveValueFromDisplayedValue({
        offset: 0,
        doUpdateIfValid: true,
        isInputing: false,
        fixPrecision: true
      });
      if (value !== false) {
        const inputElRef = (_b = inputInstRef.value) === null || _b === void 0 ? void 0 : _b.inputElRef;
        if (inputElRef) {
          inputElRef.value = String(value || "");
        }
        if (mergedValueRef.value === value) {
          deriveDisplayedValueFromValue();
        }
      } else {
        deriveDisplayedValueFromValue();
      }
      const { onBlur } = props;
      const { nTriggerFormBlur } = formItem;
      if (onBlur)
        call(onBlur, e);
      nTriggerFormBlur();
      void nextTick(() => {
        deriveDisplayedValueFromValue();
      });
    }
    function doClear(e) {
      const { onClear } = props;
      if (onClear)
        call(onClear, e);
    }
    function doAdd() {
      const { value: addable } = addableRef;
      if (!addable) {
        clearAddHoldTimeout();
        return;
      }
      const { value: mergedValue } = mergedValueRef;
      if (mergedValue === null) {
        if (!props.validator) {
          doUpdateValue(createValidValue());
        }
      } else {
        const { value: mergedStep } = mergedStepRef;
        deriveValueFromDisplayedValue({
          offset: mergedStep,
          doUpdateIfValid: true,
          isInputing: false,
          fixPrecision: true
        });
      }
    }
    function doMinus() {
      const { value: minusable } = minusableRef;
      if (!minusable) {
        clearMinusHoldTimeout();
        return;
      }
      const { value: mergedValue } = mergedValueRef;
      if (mergedValue === null) {
        if (!props.validator) {
          doUpdateValue(createValidValue());
        }
      } else {
        const { value: mergedStep } = mergedStepRef;
        deriveValueFromDisplayedValue({
          offset: -mergedStep,
          doUpdateIfValid: true,
          isInputing: false,
          fixPrecision: true
        });
      }
    }
    const handleFocus = doFocus;
    const handleBlur = doBlur;
    function createValidValue() {
      if (props.validator)
        return null;
      const { value: mergedMin } = mergedMinRef;
      const { value: mergedMax } = mergedMaxRef;
      if (mergedMin !== null) {
        return Math.max(0, mergedMin);
      } else if (mergedMax !== null) {
        return Math.min(0, mergedMax);
      } else {
        return 0;
      }
    }
    function handleClear(e) {
      doClear(e);
      doUpdateValue(null);
    }
    function handleMouseDown(e) {
      var _a, _b, _c;
      if ((_a = addButtonInstRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(e.target)) {
        e.preventDefault();
      }
      if ((_b = minusButtonInstRef.value) === null || _b === void 0 ? void 0 : _b.$el.contains(e.target)) {
        e.preventDefault();
      }
      (_c = inputInstRef.value) === null || _c === void 0 ? void 0 : _c.activate();
    }
    let minusHoldStateIntervalId = null;
    let addHoldStateIntervalId = null;
    let firstMinusMousedownId = null;
    function clearMinusHoldTimeout() {
      if (firstMinusMousedownId) {
        window.clearTimeout(firstMinusMousedownId);
        firstMinusMousedownId = null;
      }
      if (minusHoldStateIntervalId) {
        window.clearInterval(minusHoldStateIntervalId);
        minusHoldStateIntervalId = null;
      }
    }
    function clearAddHoldTimeout() {
      if (firstAddMousedownId) {
        window.clearTimeout(firstAddMousedownId);
        firstAddMousedownId = null;
      }
      if (addHoldStateIntervalId) {
        window.clearInterval(addHoldStateIntervalId);
        addHoldStateIntervalId = null;
      }
    }
    function handleMinusMousedown() {
      clearMinusHoldTimeout();
      firstMinusMousedownId = window.setTimeout(() => {
        minusHoldStateIntervalId = window.setInterval(() => {
          doMinus();
        }, HOLDING_CHANGE_INTERVAL);
      }, HOLDING_CHANGE_THRESHOLD);
      on("mouseup", document, clearMinusHoldTimeout, {
        once: true
      });
    }
    let firstAddMousedownId = null;
    function handleAddMousedown() {
      clearAddHoldTimeout();
      firstAddMousedownId = window.setTimeout(() => {
        addHoldStateIntervalId = window.setInterval(() => {
          doAdd();
        }, HOLDING_CHANGE_INTERVAL);
      }, HOLDING_CHANGE_THRESHOLD);
      on("mouseup", document, clearAddHoldTimeout, {
        once: true
      });
    }
    const handleAddClick = () => {
      if (addHoldStateIntervalId)
        return;
      doAdd();
    };
    const handleMinusClick = () => {
      if (minusHoldStateIntervalId)
        return;
      doMinus();
    };
    function handleKeyDown(e) {
      var _a, _b;
      if (e.key === "Enter") {
        if (e.target === ((_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.wrapperElRef)) {
          return;
        }
        const value = deriveValueFromDisplayedValue({
          offset: 0,
          doUpdateIfValid: true,
          isInputing: false,
          fixPrecision: true
        });
        if (value !== false) {
          (_b = inputInstRef.value) === null || _b === void 0 ? void 0 : _b.deactivate();
        }
      } else if (e.key === "ArrowUp") {
        if (!addableRef.value)
          return;
        if (props.keyboard.ArrowUp === false)
          return;
        e.preventDefault();
        const value = deriveValueFromDisplayedValue({
          offset: 0,
          doUpdateIfValid: true,
          isInputing: false,
          fixPrecision: true
        });
        if (value !== false) {
          doAdd();
        }
      } else if (e.key === "ArrowDown") {
        if (!minusableRef.value)
          return;
        if (props.keyboard.ArrowDown === false)
          return;
        e.preventDefault();
        const value = deriveValueFromDisplayedValue({
          offset: 0,
          doUpdateIfValid: true,
          isInputing: false,
          fixPrecision: true
        });
        if (value !== false) {
          doMinus();
        }
      }
    }
    function handleUpdateDisplayedValue(value) {
      displayedValueRef.value = value;
      if (props.updateValueOnInput && !props.format && !props.parse && props.precision === void 0) {
        deriveValueFromDisplayedValue({
          offset: 0,
          doUpdateIfValid: true,
          isInputing: true,
          fixPrecision: false
        });
      }
    }
    watch(mergedValueRef, () => {
      deriveDisplayedValueFromValue();
    });
    const exposedMethods = {
      focus: () => {
        var _a;
        return (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        return (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.blur();
      }
    };
    const rtlEnabledRef = useRtl("InputNumber", mergedRtlRef, mergedClsPrefixRef);
    return Object.assign(Object.assign({}, exposedMethods), {
      rtlEnabled: rtlEnabledRef,
      inputInstRef,
      minusButtonInstRef,
      addButtonInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      mergedPlaceholder: mergedPlaceholderRef,
      displayedValueInvalid: displayedValueInvalidRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      displayedValue: displayedValueRef,
      addable: addableRef,
      minusable: minusableRef,
      mergedStatus: mergedStatusRef,
      handleFocus,
      handleBlur,
      handleClear,
      handleMouseDown,
      handleAddClick,
      handleMinusClick,
      handleAddMousedown,
      handleMinusMousedown,
      handleKeyDown,
      handleUpdateDisplayedValue,
      // theme
      mergedTheme: themeRef,
      inputThemeOverrides: {
        paddingSmall: "0 8px 0 10px",
        paddingMedium: "0 8px 0 12px",
        paddingLarge: "0 8px 0 14px"
      },
      buttonThemeOverrides: computed(() => {
        const { self: { iconColorDisabled } } = themeRef.value;
        const [r, g, b, a] = rgba(iconColorDisabled);
        return {
          textColorTextDisabled: `rgb(${r}, ${g}, ${b})`,
          opacityDisabled: `${a}`
        };
      })
    });
  },
  render() {
    const { mergedClsPrefix, $slots } = this;
    const renderMinusButton = () => {
      return h(XButton, { text: true, disabled: !this.minusable || this.mergedDisabled || this.readonly, focusable: false, theme: this.mergedTheme.peers.Button, themeOverrides: this.mergedTheme.peerOverrides.Button, builtinThemeOverrides: this.buttonThemeOverrides, onClick: this.handleMinusClick, onMousedown: this.handleMinusMousedown, ref: "minusButtonInstRef" }, {
        icon: () => resolveSlot($slots["minus-icon"], () => [
          h(NBaseIcon, { clsPrefix: mergedClsPrefix }, {
            default: () => h(RemoveIcon, null)
          })
        ])
      });
    };
    const renderAddButton = () => {
      return h(XButton, { text: true, disabled: !this.addable || this.mergedDisabled || this.readonly, focusable: false, theme: this.mergedTheme.peers.Button, themeOverrides: this.mergedTheme.peerOverrides.Button, builtinThemeOverrides: this.buttonThemeOverrides, onClick: this.handleAddClick, onMousedown: this.handleAddMousedown, ref: "addButtonInstRef" }, {
        icon: () => resolveSlot($slots["add-icon"], () => [
          h(NBaseIcon, { clsPrefix: mergedClsPrefix }, {
            default: () => h(AddIcon, null)
          })
        ])
      });
    };
    return h(
      "div",
      { class: [
        `${mergedClsPrefix}-input-number`,
        this.rtlEnabled && `${mergedClsPrefix}-input-number--rtl`
      ] },
      h(NInput, { ref: "inputInstRef", autofocus: this.autofocus, status: this.mergedStatus, bordered: this.mergedBordered, loading: this.loading, value: this.displayedValue, onUpdateValue: this.handleUpdateDisplayedValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, builtinThemeOverrides: this.inputThemeOverrides, size: this.mergedSize, placeholder: this.mergedPlaceholder, disabled: this.mergedDisabled, readonly: this.readonly, textDecoration: this.displayedValueInvalid ? "line-through" : void 0, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onClear: this.handleClear, clearable: this.clearable, internalLoadingBeforeSuffix: true }, {
        prefix: () => {
          var _a;
          return this.showButton && this.buttonPlacement === "both" ? [
            renderMinusButton(),
            resolveWrappedSlot($slots.prefix, (children) => {
              if (children) {
                return h("span", { class: `${mergedClsPrefix}-input-number-prefix` }, children);
              }
              return null;
            })
          ] : (_a = $slots.prefix) === null || _a === void 0 ? void 0 : _a.call($slots);
        },
        suffix: () => {
          var _a;
          return this.showButton ? [
            resolveWrappedSlot($slots.suffix, (children) => {
              if (children) {
                return h("span", { class: `${mergedClsPrefix}-input-number-suffix` }, children);
              }
              return null;
            }),
            this.buttonPlacement === "right" ? renderMinusButton() : null,
            renderAddButton()
          ] : (_a = $slots.suffix) === null || _a === void 0 ? void 0 : _a.call($slots);
        }
      })
    );
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-119a3cfe"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "wrapper" };
const _hoisted_2 = { class: "inner" };
const _hoisted_3 = { class: "input-group" };
const _hoisted_4 = {
  key: 0,
  class: "too-long-warning"
};
const _hoisted_5 = {
  key: 1,
  class: "too-long-warning"
};
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "too-long-warning" }, "当前条件较多，可能会消耗巨量时间和空间", -1));
const _hoisted_7 = {
  key: 0,
  class: "empty-placeholder"
};
const _hoisted_8 = { class: "result-count" };
const _hoisted_9 = { class: "number" };
const _hoisted_10 = { class: "expression" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "hero-sequence",
  setup(__props) {
    const show = ref(false);
    onMounted(() => {
      show.value = true;
    });
    const heroString = ref("114514");
    const equalsValue = ref(0);
    const mode = ref("default");
    const isGenerating = ref(false);
    const isEmptyResults = ref(false);
    const page = ref(1);
    const operators = ref(["+", "-", "*", "/"]);
    const isAbleToGenerate = computed(() => {
      if (mode.value === "default") {
        return heroString.value.length > 1 && !Number.isNaN(Number(heroString.value));
      } else if (mode.value === "equals") {
        return heroString.value.length !== 0 && !Number.isNaN(Number(heroString.value)) && typeof equalsValue.value === "number" && equalsValue.value >= 0;
      }
      return false;
    });
    const isHeroStringTooLong = computed(() => {
      if (mode.value === "default") {
        if (!Number.isNaN(Number(heroString.value)) && heroString.value.length + operators.value.length > 11) {
          return true;
        }
        return false;
      } else if (mode.value === "equals") {
        if (!Number.isNaN(Number(heroString.value)) && heroString.value.length + operators.value.length > 10) {
          return true;
        }
        return false;
      }
      return false;
    });
    const results = shallowRef([]);
    const resultsPage = computed(() => {
      return results.value.slice((page.value - 1) * 20, page.value * 20);
    });
    let worker;
    const handleGenerate = () => {
      if (isGenerating.value) {
        return;
      }
      worker = new Worker(new URL("" + new URL("hero-gen-1ad3a577.js", import.meta.url).href, self.location), {
        type: "module"
      });
      worker.addEventListener("message", (event) => {
        const { name, data } = event.data;
        switch (name) {
          case "start":
            isGenerating.value = true;
            break;
          case "result":
            if (data.length === 0) {
              isEmptyResults.value = true;
            } else {
              isEmptyResults.value = false;
            }
            page.value = 1;
            results.value = data;
            isGenerating.value = false;
            break;
        }
      });
      worker.postMessage({
        mode: mode.value,
        operators: toRaw(operators.value),
        value1: heroString.value,
        value2: equalsValue.value
      });
    };
    const handleCancel = () => {
      if (isGenerating.value) {
        worker.terminate();
        isGenerating.value = false;
      }
    };
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(unref(NInput), {
              class: "input",
              value: unref(heroString),
              "onUpdate:value": _cache[0] || (_cache[0] = ($event) => isRef(heroString) ? heroString.value = $event : null),
              clearable: "",
              onKeyup: withKeys(handleGenerate, ["enter"]),
              placeholder: "序列"
            }, null, 8, ["value", "onKeyup"]),
            unref(mode) === "equals" ? (openBlock(), createBlock(unref(NInputNumber), {
              key: 0,
              placeholder: "等于的值",
              value: unref(equalsValue),
              "onUpdate:value": _cache[1] || (_cache[1] = ($event) => isRef(equalsValue) ? equalsValue.value = $event : null),
              onKeyup: withKeys(handleGenerate, ["enter"]),
              "show-button": false,
              class: "input"
            }, null, 8, ["value", "onKeyup"])) : createCommentVNode("", true),
            !unref(isGenerating) ? (openBlock(), createBlock(unref(NButton), {
              key: 1,
              disabled: !unref(isAbleToGenerate),
              onClick: handleGenerate,
              class: "button",
              type: "primary"
            }, {
              default: withCtx(() => [
                createTextVNode("生成")
              ]),
              _: 1
            }, 8, ["disabled"])) : (openBlock(), createBlock(unref(NButton), {
              key: 2,
              onClick: handleCancel,
              type: "error",
              class: "button"
            }, {
              default: withCtx(() => [
                createTextVNode("停止")
              ]),
              _: 1
            }))
          ]),
          createVNode(unref(NRadioGroup), {
            class: "mode",
            value: unref(mode),
            "onUpdate:value": _cache[2] || (_cache[2] = ($event) => isRef(mode) ? mode.value = $event : null)
          }, {
            default: withCtx(() => [
              createVNode(unref(NRadio), { value: "default" }, {
                default: withCtx(() => [
                  createTextVNode("默认规则")
                ]),
                _: 1
              }),
              createVNode(unref(NRadio), { value: "equals" }, {
                default: withCtx(() => [
                  createTextVNode("等于某值")
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["value"]),
          createVNode(unref(NCheckboxGroup), {
            value: unref(operators),
            "onUpdate:value": _cache[3] || (_cache[3] = ($event) => isRef(operators) ? operators.value = $event : null),
            class: "operators"
          }, {
            default: withCtx(() => [
              createVNode(unref(NSpace), null, {
                default: withCtx(() => [
                  createVNode(unref(NCheckbox), { value: "+" }, {
                    default: withCtx(() => [
                      createTextVNode("加")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(NCheckbox), { value: "-" }, {
                    default: withCtx(() => [
                      createTextVNode("减")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(NCheckbox), { value: "*" }, {
                    default: withCtx(() => [
                      createTextVNode("乘")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(NCheckbox), { value: "/" }, {
                    default: withCtx(() => [
                      createTextVNode("除")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(NCheckbox), { value: "^" }, {
                    default: withCtx(() => [
                      createTextVNode("幂")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["value"]),
          createVNode(unref(NCollapseTransition), {
            style: { "margin-bottom": "12px" },
            show: !unref(isAbleToGenerate)
          }, {
            default: withCtx(() => [
              unref(mode) === "default" ? (openBlock(), createElementBlock("span", _hoisted_4, "左侧是数字字符串")) : unref(mode) === "equals" ? (openBlock(), createElementBlock("span", _hoisted_5, "左侧是数字字符串，右侧是大于 0 的值")) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["show"]),
          createVNode(unref(NCollapseTransition), {
            style: { "margin-bottom": "12px" },
            show: unref(isHeroStringTooLong)
          }, {
            default: withCtx(() => [
              _hoisted_6
            ]),
            _: 1
          }, 8, ["show"]),
          createVNode(unref(NCard), null, {
            default: withCtx(() => [
              unref(results).length === 0 ? (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(unref(isEmptyResults) ? "没有符合条件的计算式喵" : "还没有结果喵"), 1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("div", _hoisted_8, "结果共 " + toDisplayString(unref(results).length) + " 条", 1),
                createVNode(unref(NPagination), {
                  simple: "",
                  style: { "margin-bottom": "12px" },
                  page: unref(page),
                  "onUpdate:page": _cache[4] || (_cache[4] = ($event) => isRef(page) ? page.value = $event : null),
                  "page-size": 20,
                  "item-count": unref(results).length
                }, null, 8, ["page", "item-count"]),
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(resultsPage), (r, index) => {
                  return openBlock(), createElementBlock("div", null, [
                    createBaseVNode("span", _hoisted_9, toDisplayString(unref(page) * 20 - 19 + index) + ": ", 1),
                    createBaseVNode("span", _hoisted_10, toDisplayString(r), 1)
                  ]);
                }), 256))
              ], 64))
            ]),
            _: 1
          })
        ])
      ], 512)), [
        [vShow, unref(show)]
      ]);
    };
  }
});
const heroSequence_vue_vue_type_style_index_0_scoped_119a3cfe_lang = "";
const heroSequence = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-119a3cfe"]]);
export {
  heroSequence as default
};
