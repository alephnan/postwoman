<template>
  <div class="wrapper">
    <div class="content">
      <div class="columns">
        <aside class="nav-first">
          <nav class="primary-nav">
            <!--
              We're using manual checks for linkActive because the query string
              seems to mess up the nuxt-link active class.
            -->
            <nuxt-link
              :to="localePath('index')"
              :class="linkActive('/')"
              v-tooltip.right="$t('home')"
              aria-label="Home"
            >
              <logo alt class="material-icons" style="height: 24px;"></logo>
            </nuxt-link>
            <nuxt-link
              :to="localePath('settings')"
              :class="linkActive('/settings')"
              v-tooltip.right="$t('settings')"
              aria-label="Settings"
            >
              <i class="material-icons">settings</i>
            </nuxt-link>
          </nav>
          <div v-if="$route.path === '/'"></div>
          <div v-else-if="$route.path === '/settings'"></div>
        </aside>
        <div class="main" id="main">
          <header class="header">
            <div class="flex-wrap">
              <span class="slide-in">
                <nuxt-link :to="localePath('index')">
                  <h1 class="logo">Postwoman</h1>
                </nuxt-link>
              </span>
              <span>
                <a
                  href="https://github.com/liyasthomas/postwoman"
                  target="_blank"
                  aria-label="GitHub"
                  rel="noopener"
                >
                  <button class="icon" aria-label="GitHub" v-tooltip="'GitHub'">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      class="material-icons"
                    >
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </button>
                </a>
                <button
                  class="icon"
                  id="installPWA"
                  @click.prevent="showInstallPrompt()"
                  v-tooltip="$t('install_pwa')"
                >
                  <i class="material-icons">offline_bolt</i>
                </button>
                <v-popover>
                  <button class="icon" v-tooltip="'More'">
                    <i class="material-icons">more_vert</i>
                  </button>
                  <template slot="popover">
                    <div>
                      <button class="icon" @click="showShortcuts = true" v-close-popover>
                        <i class="material-icons">keyboard</i>
                        <span>{{ $t("shortcuts") }}</span>
                      </button>
                    </div>
                  </template>
                </v-popover>
              </span>
            </div>
          </header>
          <nuxt />
          <footer class="footer">
            <div class="flex-wrap">
              <span v-if="version.name" class="mono">
                <!-- <a
                  v-bind:href="
                    'https://github.com/liyasthomas/postwoman/releases/tag/' +
                      version.name
                  "
                  target="_blank"
                  rel="noopener"
                  v-tooltip="'GitHub'"
                ></a>-->
                {{ version.name }}
              </span>
              <span>
                <v-popover>
                  <button class="icon" v-tooltip="$t('choose_language')">
                    <i class="material-icons">translate</i>
                  </button>
                  <template slot="popover">
                    <div v-for="locale in availableLocales" :key="locale.code">
                      <nuxt-link :to="switchLocalePath(locale.code)">
                        <button class="icon" v-close-popover>{{ locale.name }}</button>
                      </nuxt-link>
                    </div>
                  </template>
                </v-popover>
              </span>
            </div>
          </footer>
        </div>
        <aside class="nav-second"></aside>
      </div>
    </div>
    <modal v-if="showShortcuts" @close="showShortcuts = false">
      <div slot="header">
        <ul>
          <li>
            <div class="flex-wrap">
              <h3 class="title">{{ $t("shortcuts") }}</h3>
              <div>
                <button class="icon" @click="showShortcuts = false">
                  <i class="material-icons">close</i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div slot="body">
        <br />
        <div>
          <label>{{ $t("send_request") }}</label>
          <kbd>⌘ G</kbd>
        </div>
        <br />
        <div>
          <label>{{ $t("save_to_collections") }}</label>
          <kbd>⌘ S</kbd>
        </div>
        <br />
        <div>
          <label>{{ $t("copy_request_link") }}</label>
          <kbd>⌘ K</kbd>
        </div>
        <br />
        <div>
          <label>{{ $t("reset_request") }}</label>
          <kbd>⌘ L</kbd>
        </div>
        <br />
      </div>
      <div slot="footer"></div>
    </modal>
  </div>
</template>

<style scoped lang="scss"></style>

<script>
import intializePwa from "../assets/js/pwa";
import * as version from "../.postwoman/version.json";

export default {
  components: {
    logo: () => import("../components/logo"),
    modal: () => import("../components/modal")
  },

  methods: {
    linkActive(path) {
      return {
        "nuxt-link-exact-active": this.$route.path === path,
        "nuxt-link-active": this.$route.path === path
      };
    }
  },

  data() {
    return {
      // Once the PWA code is initialized, this holds a method
      // that can be called to show the user the installation
      // prompt.
      showInstallPrompt: null,
      version: {},
      showShortcuts: false
    };
  },

  beforeMount() {
    // Set version data
    this.version = version.default;

    // Load theme settings
    (() => {
      // Apply theme from settings.
      document.documentElement.className =
        this.$store.state.postwoman.settings.THEME_CLASS || "";
      // Load theme color data from settings, or use default color.
      let color = this.$store.state.postwoman.settings.THEME_COLOR || "#50fa7b";
      let vibrant = this.$store.state.postwoman.settings.THEME_COLOR_VIBRANT;
      if (vibrant == null) vibrant = true;
      document.documentElement.style.setProperty("--ac-color", color);
      document.documentElement.style.setProperty(
        "--act-color",
        vibrant ? "rgb(37, 38, 40)" : "#ffffff"
      );
    })();
  },

  mounted() {
    if (process.client) {
      document.body.classList.add("afterLoad");
    }

    document
      .querySelector("meta[name=theme-color]")
      .setAttribute(
        "content",
        this.$store.state.postwoman.settings.THEME_TAB_COLOR || "#252628"
      );

    // Initializes the PWA code - checks if the app is installed,
    // etc.
    (async () => {
      this.showInstallPrompt = await intializePwa();
      let cookiesAllowed = localStorage.getItem("cookiesAllowed") === "yes";
      if (!cookiesAllowed) {
        this.$toast.show("We use cookies", {
          icon: "info",
          duration: 5000,
          theme: "toasted-primary",
          action: [
            {
              text: "Dismiss",
              onClick: (e, toastObject) => {
                localStorage.setItem("cookiesAllowed", "yes");
                toastObject.goAway(0);
              }
            }
          ]
        });
      }
    })();

    window.addEventListener("scroll", event => {
      let mainNavLinks = document.querySelectorAll("nav ul li a");
      let fromTop = window.scrollY;
      mainNavLinks.forEach(link => {
        let section = document.querySelector(link.hash);

        if (
          section &&
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add("current");
        } else {
          link.classList.remove("current");
        }
      });
    });
  },

  watch: {
    $route() {
      this.$toast.clear();
    }
  },

  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  }
};
</script>
