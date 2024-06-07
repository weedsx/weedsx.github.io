<template>
  <Layout>
<!--    <template #doc-footer-before>-->
<!--      <Annotations />-->
<!--    </template>-->

    <template #doc-after>
      <PrevNext />
      <Comments />
    </template>
  </Layout>
</template>

<script
  lang="ts"
  setup
>
import DefaultTheme from "vitepress/theme";
import Annotations from "../components/Annotations.vue";
import PrevNext from "../components/PrevNext.vue";
import Comments from "../components/Comments.vue";
import { useData } from "vitepress";
import { nextTick, provide } from "vue";

const { Layout } = DefaultTheme;

const { isDark } = useData();

const enableTransitions = () => "startViewTransition" in document &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }
  
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ];
  
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;
  
  document.documentElement.animate({ clipPath: isDark.value ? clipPath.reverse() : clipPath }, {
    duration: 300,
    easing: "ease-in",
    pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`
  });
});
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>

<style>
/* Post Item */
.vp-doc h1 {
  font-size: 25px;
}

.vp-doc h2 {
  font-size: 22px;
  margin-top: 40px;
  margin-bottom: 20px;
}

.vp-doc h3 {
  font-size: 19px;
  margin-top: 24px;
  margin-bottom: 12px;
}

.vp-doc h4 {
  font-size: 17px;
  margin-top: 20px;
  margin-bottom: 10px;
}

/* hack for post elements's margin-bottom */
.main div[name="post-elements"]+* {
  margin-top: 0;
}

/* cover size */
.main div[name="post-elements"]+figure img {
  width: 100%;
}

.main figure>img {
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 0.8rem var(--ct-c-shadow);
  margin-bottom: 0.8rem;
  margin-left: auto;
  margin-right: auto;
}

.main figure>img.transparent-img {
  border-radius: 0;
  box-shadow: none;
}

.dark .main figure>img {
  border: 0.1rem solid var(--vp-c-neutral);
  box-shadow: none;
  background: var(--vp-c-default-1);
}

.zoom07 {
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}

img.inline-img {
  float: left;
  margin: 0.3rem 0.8rem 0.4rem 0;
  border: 3px solid var(--vp-c-default-1);
}

/* image subtitle */
figure figcaption {
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 13px;
  font-weight: 400;
}

figure figcaption a {
  color: var(--vp-c-text-3) !important;
}

/* Markdown Footnotes */
sup.footnote-ref a {
  text-decoration: none;
}

ol.footnotes-list li p {
  margin: 0;
  line-height: 24px;
}

ol.footnotes-list li p a.footnote-backref {
  text-decoration: none;
  font-family: monospace;
}

li.footnote-item p em {
  color: var(--vp-c-text-2);
}

sup.footnote-ref a[id^=fnref] {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}
</style>
