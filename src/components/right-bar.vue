<script>
localStorage.setItem("rightbar_isopen", true);
import {layoutMethods, layoutComputed} from "@/state/helpers";

/**
 * Right sidebar component
 */
export default {
  data() {
    return {
      config: {
        handler: this.handleRightBarClick,
        middleware: this.middleware,
        events: ["click"],
      },
    };
  },
  methods: {
    ...layoutMethods,
    hide() {
      this.$parent.toggleRightSidebar();
    },
    handleRightBarClick() {
      this.$parent.hideRightSidebar();
    },
    middleware(event) {
      if (event.target.classList)
        return !event.target.classList.contains("toggle-right");
    },
    removeExtraFade() {
      let fade = document.getElementsByClassName('offcanvas-backdrop fade show');
      for (let i = 0; i < fade.length; i++) {
        while (fade.length > 1) {
          fade[i].remove();
        }
      }
    },

    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    resizeWindow() {
      var windowSize = document.documentElement.clientWidth;
      if (windowSize >= 1025) {
        if (document.documentElement.getAttribute("data-layout") === "vertical") {
          document.documentElement.setAttribute("data-sidebar-size", this.$store.state.layout.sidebarSize);
        }
        if (document.documentElement.getAttribute("data-layout") === "semibox") {
          document.documentElement.setAttribute("data-sidebar-size", this.$store.state.layout.sidebarSize);
        }
        if (document.documentElement.getAttribute("data-sidebar-visibility") === "show" && document.querySelector(".hamburger-icon")) {
          document.querySelector(".hamburger-icon").classList.remove("open");
        }
      } else if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove("twocolumn-panel");
        if (document.documentElement.getAttribute("data-layout") === "vertical") {
          document.documentElement.setAttribute("data-sidebar-size", "sm");
        }
        if (document.documentElement.getAttribute("data-layout") === "semibox") {
          document.documentElement.setAttribute("data-sidebar-size", "sm");
        }
        if (document.querySelector(".hamburger-icon")) {
          document.querySelector(".hamburger-icon").classList.add("open");
        }
      } else if (windowSize <= 767) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.body.classList.add("twocolumn-panel");
        if (document.documentElement.getAttribute("data-layout") !== "horizontal") {
          document.documentElement.setAttribute("data-sidebar-size", "lg");
        }
        if (document.querySelector(".hamburger-icon")) {
          document.querySelector(".hamburger-icon").classList.add("open");
        }
      }
    }

  },
  computed: {
    ...layoutComputed,
    layoutType: {
      get() {
        return this.$store ? this.$store.state.layout.layoutType : {} || {};
      },
      set(layout) {
        localStorage.setItem("rightbar_isopen", true);
        if (layout == 'semibox') {
          this.changeLayoutType({layoutType: layout});
          this.changeSidebarView({sidebarView: "default"});
          this.changeLayoutWidth({layoutWidth: "fluid"});
          this.changeSidebarSize({sidebarSize: 'lg'});
        } else {
          this.changeLayoutType({layoutType: layout,});
          this.changeVisibility({visibility: 'show'});
          document.querySelector(".hamburger-icon").classList.remove("open");
        }
      },
    },
    layoutWidth: {
      get() {
        return this.$store ? this.$store.state.layout.layoutWidth : {} || {};
      },
      set(width) {
        if (width == 'boxed') {
          this.changeLayoutWidth({layoutWidth: width});
          this.changeSidebarSize({sidebarSize: 'sm-hover'});
        } else {
          this.changeLayoutWidth({layoutWidth: width});
        }
      },
    },
    topbar: {
      get() {
        return this.$store ? this.$store.state.layout.topbar : {} || {};
      },
      set(topbar) {
        this.changeTopbar({
          topbar: topbar,
        });
      },
    },
    sidebarSize: {
      get() {
        return this.$store ? this.$store.state.layout.sidebarSize : {} || {};
      },
      set(type) {
        return this.changeSidebarSize({
          sidebarSize: type,
        });
      },
    },
    position: {
      get() {
        return this.$store ? this.$store.state.layout.position : {} || {};
      },
      set(position) {
        return this.changePosition({
          position: position,
        });
      },
    },
    sidebarView: {
      get() {
        return this.$store ? this.$store.state.layout.sidebarView : {} || {};
      },
      set(sidebarView) {
        return this.changeSidebarView({
          sidebarView: sidebarView,
        });
      },
    },
    sidebarColor: {
      get() {
        return this.$store ? this.$store.state.layout.sidebarColor : {} || {};
      },
      set(sidebarColor) {
        return this.changeSidebarColor({
          sidebarColor: sidebarColor,
        });
      },
    },
    sidebarImage: {
      get() {
        return this.$store ? this.$store.state.layout.sidebarImage : {} || {};
      },
      set(sidebarImage) {
        return this.changeSidebarImage({
          sidebarImage: sidebarImage,
        });
      },
    },
    preloader: {
      get() {
        return this.$store ? this.$store.state.layout.preloader : {} || {};
      },
      set(preloader) {
        return this.changePreloader({
          preloader: preloader,
        });
      },
    },
    mode: {
      get() {
        return this.$store ? this.$store.state.layout.mode : {} || {};
      },
      set(mode) {
        return this.changeMode({
          mode: mode,
        });
      },
    },
    visibility: {
      get() {
        return this.$store ? this.$store.state.layout.visibility : {} || {};
      },
      set(visibility) {
        if (visibility == 'hidden') {
          document.querySelector(".hamburger-icon").classList.add("open");
        } else {
          document.querySelector(".hamburger-icon").classList.remove("open");
        }
        this.changeVisibility({
          visibility: visibility,
        });
      },
    },
  },
  watch: {
    mode: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.documentElement.setAttribute("data-bs-theme", "dark");
              break;
            case "light":
              document.documentElement.setAttribute(
                  "data-bs-theme",
                  "light"
              );
              break;
          }
        }
      },
    },
    sidebarColor: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.documentElement.setAttribute("data-sidebar", "dark");
              break;
            case "light":
              document.documentElement.setAttribute("data-sidebar", "light");
              break;
            case "gradient":
              document.documentElement.setAttribute("data-sidebar", "gradient");
              break;
            case "gradient-2":
              document.documentElement.setAttribute("data-sidebar", "gradient-2");
              break;
            case "gradient-3":
              document.documentElement.setAttribute("data-sidebar", "gradient-3");
              break;
            case "gradient-4":
              document.documentElement.setAttribute("data-sidebar", "gradient-4");
              break;
          }
        }
      },
    },
    preloader: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          localStorage.setItem('data-preloader', newVal);
        }
      },
    },
    sidebarImage: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "img-1":
              document.documentElement.setAttribute("data-sidebar-image", "img-1");
              break;
            case "img-2":
              document.documentElement.setAttribute("data-sidebar-image", "img-2");
              break;
            case "img-3":
              document.documentElement.setAttribute("data-sidebar-image", "img-3");
              break;
            case "img-4":
              document.documentElement.setAttribute("data-sidebar-image", "img-4");
              break;
            case "none":
              document.documentElement.setAttribute("data-sidebar-image", "none");
              break;
          }
        }
      },
    },
    sidebarView: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "detached":
              document.documentElement.setAttribute(
                  "data-layout-style",
                  "detached"
              );
              break;
            case "default":
              document.documentElement.setAttribute(
                  "data-layout-style",
                  "default"
              );
              break;
          }
        }
      },
    },
    position: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "fixed":
              document.documentElement.setAttribute(
                  "data-layout-position",
                  "fixed"
              );
              break;
            case "scrollable":
              document.documentElement.setAttribute(
                  "data-layout-position",
                  "scrollable"
              );
              break;
          }
        }
      },
    },
    sidebarSize: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "lg":
              document.documentElement.setAttribute("data-sidebar-size", "lg");
              break;
            case "sm":
              document.documentElement.setAttribute("data-sidebar-size", "sm");
              break;
            case "md":
              document.documentElement.setAttribute("data-sidebar-size", "md");
              break;
            case "sm-hover":
              document.documentElement.setAttribute(
                  "data-sidebar-size",
                  "sm-hover"
              );
              break;
          }
        }
      },
    },
    topbar: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "light":
              document.documentElement.setAttribute("data-topbar", "light");
              break;
            case "dark":
              document.documentElement.setAttribute("data-topbar", "dark");
              break;
          }
        }
      },
    },
    layoutWidth: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "fluid":
              document.documentElement.setAttribute(
                  "data-layout-width",
                  "fluid"
              );
              break;
            case "boxed":
              document.documentElement.setAttribute(
                  "data-layout-width",
                  "boxed"
              );
              break;
          }
        }
      },
    },
    layoutType: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "horizontal":
              document.documentElement.setAttribute(
                  "data-layout",
                  "horizontal"
              );
              break;
            case "vertical":
              document.documentElement.setAttribute("data-layout", "vertical");
              break;
            case "twocolumn":
              document.documentElement.setAttribute("data-layout", "twocolumn");
              break;
            case "semibox":
              document.documentElement.setAttribute("data-layout", "semibox");
              break;
          }
        }
      },
    },
    visibility: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "show":
              document.documentElement.setAttribute(
                  "data-sidebar-visibility",
                  "show"
              );
              break;
            case "hidden":
              document.documentElement.setAttribute(
                  "data-sidebar-visibility",
                  "hidden"
              );
              break;
          }
        }
      },
    },
  },
};
</script>
<template>
  <div>
  </div>
</template>