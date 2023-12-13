import { z } from "zod";

/**
 * The application pattern.
 */
export const patternKindSchema = z.union([
  z.record(z.unknown()).and(
    z.object({
      use: z.literal("brownfield"),
    }),
  ),
  z.record(z.unknown()).and(
    z.object({
      use: z.literal("isolation"),
      options: z.record(z.unknown()).and(
        z.object({
          /**
           * The dir containing the index.html file that contains the secure isolation application.
           */
          dir: z.string(),
        }),
      ),
    }),
  ),
]);

/**
 * An URL to open on a Tauri webview window.
 */
export const windowUrlSchema = z.string();

/**
 * System theme.
 */
export const themeSchema = z.union([z.literal("Light"), z.literal("Dark")]);

/**
 * How the window title bar should be displayed on macOS.
 */
export const titleBarStyleSchema = z.union([
  z.literal("Visible"),
  z.literal("Transparent"),
  z.literal("Overlay"),
]);

/**
 * Platform-specific window effects
 */
export const windowEffectSchema = z.union([
  z.literal("appearanceBased"),
  z.literal("light"),
  z.literal("dark"),
  z.literal("mediumLight"),
  z.literal("ultraDark"),
  z.literal("titlebar"),
  z.literal("selection"),
  z.literal("menu"),
  z.literal("popover"),
  z.literal("sidebar"),
  z.literal("headerView"),
  z.literal("sheet"),
  z.literal("windowBackground"),
  z.literal("hudWindow"),
  z.literal("fullScreenUI"),
  z.literal("tooltip"),
  z.literal("contentBackground"),
  z.literal("underWindowBackground"),
  z.literal("underPageBackground"),
  z.literal("mica"),
  z.literal("micaDark"),
  z.literal("micaLight"),
  z.literal("tabbed"),
  z.literal("tabbedDark"),
  z.literal("tabbedLight"),
  z.literal("blur"),
  z.literal("acrylic"),
]);

/**
 * Window effect state **macOS only**
 *
 * <https://developer.apple.com/documentation/appkit/nsvisualeffectview/state>
 */
export const windowEffectStateSchema = z.union([
  z.literal("followsWindowActiveState"),
  z.literal("active"),
  z.literal("inactive"),
]);

/**
 * a tuple struct of RGBA colors. Each value has minimum of 0 and maximum of 255.
 *
 * @minItems 4
 * @maxItems 4
 */
export const colorSchema = z.tuple([
  z.number(),
  z.number(),
  z.number(),
  z.number(),
]);

/**
 * A bundle referenced by tauri-bundler.
 */
export const bundleTypeSchema = z.union([
  z.literal("deb"),
  z.literal("appimage"),
  z.literal("msi"),
  z.literal("nsis"),
  z.literal("app"),
  z.literal("dmg"),
  z.literal("updater"),
]);

/**
 * Definition for bundle resources. Can be either a list of paths to include or a map of source to target paths.
 */
export const bundleResourcesSchema = z.union([
  z.array(z.string()),
  z.record(z.string()),
]);

/**
 * An extension for a [`FileAssociation`].
 *
 * A leading `.` is automatically stripped.
 */
export const associationExtSchema = z.string();

/**
 * macOS-only. Corresponds to CFBundleTypeRole
 */
export const bundleTypeRoleSchema = z.union([
  z.literal("Editor"),
  z.literal("Viewer"),
  z.literal("Shell"),
  z.literal("QLGenerator"),
  z.literal("None"),
]);

/**
 * Install modes for the Webview2 runtime. Note that for the updater bundle [`Self::DownloadBootstrapper`] is used.
 *
 * For more information see <https://tauri.app/v1/guides/building/windows>.
 */
export const webviewInstallModeSchema = z.union([
  z.object({
    type: z.literal("skip"),
  }),
  z.object({
    type: z.literal("downloadBootstrapper"),
    /**
     * Instructs the installer to run the bootstrapper in silent mode. Defaults to `true`.
     */
    silent: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("embedBootstrapper"),
    /**
     * Instructs the installer to run the bootstrapper in silent mode. Defaults to `true`.
     */
    silent: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("offlineInstaller"),
    /**
     * Instructs the installer to run the installer in silent mode. Defaults to `true`.
     */
    silent: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("fixedRuntime"),
    /**
     * The path to the fixed runtime to use.
     *
     * The fixed version can be downloaded [on the official website](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section). The `.cab` file must be extracted to a folder and this folder path must be defined on this field.
     */
    path: z.string(),
  }),
]);

/**
 * Install Modes for the NSIS installer.
 */
export const nSISInstallerModeSchema = z.union([
  z.literal("currentUser"),
  z.literal("perMachine"),
  z.literal("both"),
]);

/**
 * Compression algorithms used in the NSIS installer.
 *
 * See <https://nsis.sourceforge.io/Reference/SetCompressor>
 */
export const nsisCompressionSchema = z.union([
  z.literal("zlib"),
  z.literal("bzip2"),
  z.literal("lzma"),
]);

/**
 * Install modes for the Windows update.
 */
export const windowsUpdateInstallModeSchema = z.union([
  z.literal("basicUi"),
  z.literal("quiet"),
  z.literal("passive"),
]);

/**
 * A Content-Security-Policy directive source list. See <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/Sources#sources>.
 */
export const cspDirectiveSourcesSchema = z.union([
  z.string(),
  z.array(z.string()),
]);

/**
 * The possible values for the `dangerous_disable_asset_csp_modification` config option.
 */
export const disabledCspModificationKindSchema = z.union([
  z.boolean(),
  z.array(z.string()),
]);

/**
 * Protocol scope definition. It is a list of glob patterns that restrict the API access from the webview.
 *
 * Each pattern can start with a variable that resolves to a system base directory. The variables are: `$AUDIO`, `$CACHE`, `$CONFIG`, `$DATA`, `$LOCALDATA`, `$DESKTOP`, `$DOCUMENT`, `$DOWNLOAD`, `$EXE`, `$FONT`, `$HOME`, `$PICTURE`, `$PUBLIC`, `$RUNTIME`, `$TEMPLATE`, `$VIDEO`, `$RESOURCE`, `$APP`, `$LOG`, `$TEMP`, `$APPCONFIG`, `$APPDATA`, `$APPLOCALDATA`, `$APPCACHE`, `$APPLOG`.
 */
export const fsScopeSchema = z.union([
  z.array(z.string()),
  z.record(z.unknown()).and(
    z.object({
      /**
       * A list of paths that are allowed by this scope.
       */
      allow: z.array(z.string()).optional(),
      /**
       * A list of paths that are not allowed by this scope. This gets precedence over the [`Self::Scope::allow`] list.
       */
      deny: z.array(z.string()).optional(),
      /**
       * Whether or not paths that contain components that start with a `.` will require that `.` appears literally in the pattern; `*`, `?`, `**`, or `[...]` will not match. This is useful because such files are conventionally considered hidden on Unix systems and it might be desirable to skip them when listing files.
       *
       * Defaults to `true` on Unix systems and `false` on Windows
       */
      requireLiteralLeadingDot: z.boolean().optional().nullable(),
    }),
  ),
]);

/**
 * Defines the URL or assets to embed in the application.
 */
export const appUrlSchema = z.union([windowUrlSchema, z.array(z.string())]);

/**
 * Describes the shell command to run before `tauri dev`.
 */
export const beforeDevCommandSchema = z.union([
  z.string(),
  z.record(z.unknown()).and(
    z.object({
      /**
       * The script to execute.
       */
      script: z.string(),
      /**
       * The current working directory.
       */
      cwd: z.string().optional().nullable(),
      /**
       * Whether `tauri dev` should wait for the command to finish or not. Defaults to `false`.
       */
      wait: z.boolean().optional(),
    }),
  ),
]);

/**
 * Describes a shell command to be executed when a CLI hook is triggered.
 */
export const hookCommandSchema = z.union([
  z.string(),
  z.record(z.unknown()).and(
    z.object({
      /**
       * The script to execute.
       */
      script: z.string(),
      /**
       * The current working directory.
       */
      cwd: z.string().optional().nullable(),
    }),
  ),
]);

/**
 * The package configuration.
 *
 * See more: <https://tauri.app/v1/api/config#packageconfig>
 */
export const packageConfigSchema = z.object({
  /**
   * App name.
   */
  productName: z.string().optional().nullable(),
  /**
   * App version. It is a semver version number or a path to a `package.json` file containing the `version` field. If removed the version number from `Cargo.toml` is used.
   */
  version: z.string().optional().nullable(),
});

/**
 * The Build configuration object.
 *
 * See more: <https://tauri.app/v1/api/config#buildconfig>
 */
export const buildConfigSchema = z.object({
  /**
   * The binary used to build and run the application.
   */
  runner: z.string().optional().nullable(),
  /**
   * The path to the application assets or URL to load in development.
   *
   * This is usually an URL to a dev server, which serves your application assets with live reloading. Most modern JavaScript bundlers provides a way to start a dev server by default.
   *
   * See [vite](https://vitejs.dev/guide/), [Webpack DevServer](https://webpack.js.org/configuration/dev-server/) and [sirv](https://github.com/lukeed/sirv) for examples on how to set up a dev server.
   */
  devPath: appUrlSchema.and(z.string()),
  /**
   * The path to the application assets or URL to load in production.
   *
   * When a path relative to the configuration file is provided, it is read recursively and all files are embedded in the application binary. Tauri then looks for an `index.html` file unless you provide a custom window URL.
   *
   * You can also provide a list of paths to be embedded, which allows granular control over what files are added to the binary. In this case, all files are added to the root and you must reference it that way in your HTML files.
   *
   * When an URL is provided, the application won't have bundled assets and the application will load that URL by default.
   */
  distDir: appUrlSchema.and(z.string()),
  /**
   * A shell command to run before `tauri dev` kicks in.
   *
   * The TAURI_ENV_PLATFORM, TAURI_ENV_ARCH, TAURI_ENV_FAMILY, TAURI_ENV_PLATFORM_VERSION, TAURI_ENV_PLATFORM_TYPE and TAURI_ENV_DEBUG environment variables are set if you perform conditional compilation.
   */
  beforeDevCommand: beforeDevCommandSchema.optional().nullable(),
  /**
   * A shell command to run before `tauri build` kicks in.
   *
   * The TAURI_ENV_PLATFORM, TAURI_ENV_ARCH, TAURI_ENV_FAMILY, TAURI_ENV_PLATFORM_VERSION, TAURI_ENV_PLATFORM_TYPE and TAURI_ENV_DEBUG environment variables are set if you perform conditional compilation.
   */
  beforeBuildCommand: hookCommandSchema.optional().nullable(),
  /**
   * A shell command to run before the bundling phase in `tauri build` kicks in.
   *
   * The TAURI_ENV_PLATFORM, TAURI_ENV_ARCH, TAURI_ENV_FAMILY, TAURI_ENV_PLATFORM_VERSION, TAURI_ENV_PLATFORM_TYPE and TAURI_ENV_DEBUG environment variables are set if you perform conditional compilation.
   */
  beforeBundleCommand: hookCommandSchema.optional().nullable(),
  /**
   * Features passed to `cargo` commands.
   */
  features: z.array(z.string()).optional().nullable(),
  /**
   * Whether we should inject the Tauri API on `window.__TAURI__` or not.
   */
  withGlobalTauri: z.boolean().optional(),
});

/**
 * The plugin configs holds a HashMap mapping a plugin name to its configuration object.
 *
 * See more: <https://tauri.app/v1/api/config#pluginconfig>
 */
export const pluginConfigSchema = z.record(z.unknown());

/**
 * Configuration for application tray icon.
 *
 * See more: <https://tauri.app/v1/api/config#trayiconconfig>
 */
export const trayIconConfigSchema = z.object({
  /**
   * Set an id for this tray icon so you can reference it later, defaults to `main`.
   */
  id: z.string().optional().nullable(),
  /**
   * Path to the default icon to use for the tray icon.
   */
  iconPath: z.string(),
  /**
   * A Boolean value that determines whether the image represents a [template](https://developer.apple.com/documentation/appkit/nsimage/1520017-template?language=objc) image on macOS.
   */
  iconAsTemplate: z.boolean().optional(),
  /**
   * A Boolean value that determines whether the menu should appear when the tray icon receives a left click on macOS.
   */
  menuOnLeftClick: z.boolean().optional(),
  /**
   * Title for MacOS tray
   */
  title: z.string().optional().nullable(),
  /**
   * Tray icon tooltip on Windows and macOS
   */
  tooltip: z.string().optional().nullable(),
});

/**
 * The window effects configuration object
 */
export const windowEffectsConfigSchema = z.object({
  /**
   * List of Window effects to apply to the Window. Conflicting effects will apply the first one and ignore the rest.
   */
  effects: z.array(windowEffectSchema),
  /**
   * Window effect state **macOS Only**
   */
  state: windowEffectStateSchema.optional().nullable(),
  /**
   * Window effect corner radius **macOS Only**
   */
  radius: z.number().optional().nullable(),
  /**
   * Window effect color. Affects [`WindowEffect::Blur`] and [`WindowEffect::Acrylic`] only on Windows 10 v1903+. Doesn't have any effect on Windows 7 or Windows 11.
   */
  color: colorSchema.optional().nullable(),
});

/**
 * Configuration for AppImage bundles.
 *
 * See more: <https://tauri.app/v1/api/config#appimageconfig>
 */
export const appImageConfigSchema = z.object({
  /**
   * Include additional gstreamer dependencies needed for audio and video playback. This increases the bundle size by ~15-35MB depending on your build system.
   */
  bundleMediaFramework: z.boolean().optional(),
});

/**
 * Configuration for Debian (.deb) bundles.
 *
 * See more: <https://tauri.app/v1/api/config#debconfig>
 */
export const debConfigSchema = z.object({
  /**
   * The list of deb dependencies your application relies on.
   */
  depends: z.array(z.string()).optional().nullable(),
  /**
   * The files to include on the package.
   */
  files: z.record(z.string()).optional(),
  /**
   * Path to a custom desktop file Handlebars template.
   *
   * Available variables: `categories`, `comment` (optional), `exec`, `icon` and `name`.
   */
  desktopTemplate: z.string().optional().nullable(),
});

/**
 * Configuration for the macOS bundles.
 *
 * See more: <https://tauri.app/v1/api/config#macconfig>
 */
export const macConfigSchema = z.object({
  /**
   * A list of strings indicating any macOS X frameworks that need to be bundled with the application.
   *
   * If a name is used, ".framework" must be omitted and it will look for standard install locations. You may also use a path to a specific framework.
   */
  frameworks: z.array(z.string()).optional().nullable(),
  /**
   * A version string indicating the minimum macOS X version that the bundled application supports. Defaults to `10.13`.
   *
   * Setting it to `null` completely removes the `LSMinimumSystemVersion` field on the bundle's `Info.plist` and the `MACOSX_DEPLOYMENT_TARGET` environment variable.
   *
   * An empty string is considered an invalid value so the default value is used.
   */
  minimumSystemVersion: z.string().optional().nullable(),
  /**
   * Allows your application to communicate with the outside world. It should be a lowercase, without port and protocol domain name.
   */
  exceptionDomain: z.string().optional().nullable(),
  /**
   * The path to the license file to add to the DMG bundle.
   */
  license: z.string().optional().nullable(),
  /**
   * Identity to use for code signing.
   */
  signingIdentity: z.string().optional().nullable(),
  /**
   * Provider short name for notarization.
   */
  providerShortName: z.string().optional().nullable(),
  /**
   * Path to the entitlements file.
   */
  entitlements: z.string().optional().nullable(),
});

/**
 * General configuration for the iOS target.
 */
export const iosConfigSchema = z.object({
  /**
   * The development team. This value is required for iOS development because code signing is enforced. The `APPLE_DEVELOPMENT_TEAM` environment variable can be set to overwrite it.
   */
  developmentTeam: z.string().optional().nullable(),
});

/**
 * General configuration for the iOS target.
 */
export const androidConfigSchema = z.object({
  /**
   * The minimum API level required for the application to run. The Android system will prevent the user from installing the application if the system's API level is lower than the value specified.
   */
  minSdkVersion: z.number().optional(),
});

/**
 * File association
 */
export const fileAssociationSchema = z.object({
  /**
   * File extensions to associate with this app. e.g. 'png'
   */
  ext: z.array(associationExtSchema),
  /**
   * The name. Maps to `CFBundleTypeName` on macOS. Default to `ext[0]`
   */
  name: z.string().optional().nullable(),
  /**
   * The association description. Windows-only. It is displayed on the `Type` column on Windows Explorer.
   */
  description: z.string().optional().nullable(),
  /**
   * The app’s role with respect to the type. Maps to `CFBundleTypeRole` on macOS.
   */
  role: bundleTypeRoleSchema.and(z.string()),
  /**
   * The mime-type e.g. 'image/png' or 'text/plain'. Linux-only.
   */
  mimeType: z.string().optional().nullable(),
});

/**
 * Position coordinates struct.
 */
export const positionSchema = z.object({
  /**
   * X coordinate.
   */
  x: z.number(),
  /**
   * Y coordinate.
   */
  y: z.number(),
});

/**
 * Size of the window.
 */
export const sizeSchema = z.object({
  /**
   * Width of the window.
   */
  width: z.number(),
  /**
   * Height of the window.
   */
  height: z.number(),
});

/**
 * Configuration for the Installer bundle using NSIS.
 */
export const nsisConfigSchema = z.object({
  /**
   * A custom .nsi template to use.
   */
  template: z.string().optional().nullable(),
  /**
   * The path to the license file to render on the installer.
   */
  license: z.string().optional().nullable(),
  /**
   * The path to a bitmap file to display on the header of installers pages.
   *
   * The recommended dimensions are 150px x 57px.
   */
  headerImage: z.string().optional().nullable(),
  /**
   * The path to a bitmap file for the Welcome page and the Finish page.
   *
   * The recommended dimensions are 164px x 314px.
   */
  sidebarImage: z.string().optional().nullable(),
  /**
   * The path to an icon file used as the installer icon.
   */
  installerIcon: z.string().optional().nullable(),
  /**
   * Whether the installation will be for all users or just the current user.
   */
  installMode: nSISInstallerModeSchema.and(z.string()),
  /**
   * A list of installer languages. By default the OS language is used. If the OS language is not in the list of languages, the first language will be used. To allow the user to select the language, set `display_language_selector` to `true`.
   *
   * See <https://github.com/kichik/nsis/tree/9465c08046f00ccb6eda985abbdbf52c275c6c4d/Contrib/Language%20files> for the complete list of languages.
   */
  languages: z.array(z.string()).optional().nullable(),
  /**
   * A key-value pair where the key is the language and the value is the path to a custom `.nsh` file that holds the translated text for tauri's custom messages.
   *
   * See <https://github.com/tauri-apps/tauri/blob/dev/tooling/bundler/src/bundle/windows/templates/nsis-languages/English.nsh> for an example `.nsh` file.
   *
   * **Note**: the key must be a valid NSIS language and it must be added to [`NsisConfig`] languages array,
   */
  customLanguageFiles: z.record(z.string()).optional().nullable(),
  /**
   * Whether to display a language selector dialog before the installer and uninstaller windows are rendered or not. By default the OS language is selected, with a fallback to the first language in the `languages` array.
   */
  displayLanguageSelector: z.boolean().optional(),
  /**
   * Set the compression algorithm used to compress files in the installer.
   *
   * See <https://nsis.sourceforge.io/Reference/SetCompressor>
   */
  compression: nsisCompressionSchema.optional().nullable(),
});

/**
 * Configuration for a target language for the WiX build.
 *
 * See more: <https://tauri.app/v1/api/config#wixlanguageconfig>
 */
export const wixLanguageConfigSchema = z.object({
  /**
   * The path to a locale (`.wxl`) file. See <https://wixtoolset.org/documentation/manual/v3/howtos/ui_and_localization/build_a_localized_version.html>.
   */
  localePath: z.string().optional().nullable(),
});

/**
 * The updater configuration for Windows.
 *
 * See more: <https://tauri.app/v1/api/config#updaterwindowsconfig>
 */
export const updaterWindowsConfigSchema = z.object({
  /**
   * The installation mode for the update on Windows. Defaults to `passive`.
   */
  installMode: windowsUpdateInstallModeSchema.and(z.string()),
});

/**
 * External command access definition.
 */
export const remoteDomainAccessScopeSchema = z.object({
  /**
   * The URL scheme to allow. By default, all schemas are allowed.
   */
  scheme: z.string().optional().nullable(),
  /**
   * The domain to allow.
   */
  domain: z.string(),
  /**
   * The list of window labels this scope applies to.
   */
  windows: z.array(z.string()),
  /**
   * The list of plugins that are allowed in this scope. The names should be without the `tauri-plugin-` prefix, for example `"store"` for `tauri-plugin-store`.
   */
  plugins: z.array(z.string()).optional(),
});

/**
 * Config for the asset custom protocol.
 *
 * See more: <https://tauri.app/v1/api/config#assetprotocolconfig>
 */
export const assetProtocolConfigSchema = z.object({
  /**
   * The access scope for the asset protocol.
   */
  scope: fsScopeSchema.optional(),
  /**
   * Enables the asset protocol.
   */
  enable: z.boolean().optional(),
});

/**
 * Targets to bundle. Each value is case insensitive.
 */
export const bundleTargetSchema = z.union([
  z.literal("all"),
  z.array(bundleTypeSchema),
  bundleTypeSchema,
]);

/**
 * The languages to build using WiX.
 */
export const wixLanguageSchema = z.union([
  z.string(),
  z.array(z.string()),
  z.record(wixLanguageConfigSchema),
]);

/**
 * A Content-Security-Policy definition. See <https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP>.
 */
export const cspSchema = z.union([
  z.string(),
  z.record(cspDirectiveSourcesSchema),
]);

/**
 * The window configuration object.
 *
 * See more: <https://tauri.app/v1/api/config#windowconfig>
 */
export const windowConfigSchema = z.object({
  /**
   * The window identifier. It must be alphanumeric.
   */
  label: z.string().optional(),
  /**
   * The window webview URL.
   */
  url: windowUrlSchema.and(z.string()),
  /**
   * The user agent for the webview
   */
  userAgent: z.string().optional().nullable(),
  /**
   * Whether the file drop is enabled or not on the webview. By default it is enabled.
   *
   * Disabling it is required to use drag and drop on the frontend on Windows.
   */
  fileDropEnabled: z.boolean().optional(),
  /**
   * Whether or not the window starts centered or not.
   */
  center: z.boolean().optional(),
  /**
   * The horizontal position of the window's top left corner
   */
  x: z.number().optional().nullable(),
  /**
   * The vertical position of the window's top left corner
   */
  y: z.number().optional().nullable(),
  /**
   * The window width.
   */
  width: z.number().optional(),
  /**
   * The window height.
   */
  height: z.number().optional(),
  /**
   * The min window width.
   */
  minWidth: z.number().optional().nullable(),
  /**
   * The min window height.
   */
  minHeight: z.number().optional().nullable(),
  /**
   * The max window width.
   */
  maxWidth: z.number().optional().nullable(),
  /**
   * The max window height.
   */
  maxHeight: z.number().optional().nullable(),
  /**
   * Whether the window is resizable or not. When resizable is set to false, native window's maximize button is automatically disabled.
   */
  resizable: z.boolean().optional(),
  /**
   * Whether the window's native maximize button is enabled or not. If resizable is set to false, this setting is ignored.
   *
   * ## Platform-specific
   *
   * - **macOS:** Disables the "zoom" button in the window titlebar, which is also used to enter fullscreen mode. - **Linux / iOS / Android:** Unsupported.
   */
  maximizable: z.boolean().optional(),
  /**
   * Whether the window's native minimize button is enabled or not.
   *
   * ## Platform-specific
   *
   * - **Linux / iOS / Android:** Unsupported.
   */
  minimizable: z.boolean().optional(),
  /**
   * Whether the window's native close button is enabled or not.
   *
   * ## Platform-specific
   *
   * - **Linux:** "GTK+ will do its best to convince the window manager not to show a close button. Depending on the system, this function may not have any effect when called on a window that is already visible" - **iOS / Android:** Unsupported.
   */
  closable: z.boolean().optional(),
  /**
   * The window title.
   */
  title: z.string().optional(),
  /**
   * Whether the window starts as fullscreen or not.
   */
  fullscreen: z.boolean().optional(),
  /**
   * Whether the window will be initially focused or not.
   */
  focus: z.boolean().optional(),
  /**
   * Whether the window is transparent or not.
   *
   * Note that on `macOS` this requires the `macos-private-api` feature flag, enabled under `tauri > macOSPrivateApi`. WARNING: Using private APIs on `macOS` prevents your application from being accepted to the `App Store`.
   */
  transparent: z.boolean().optional(),
  /**
   * Whether the window is maximized or not.
   */
  maximized: z.boolean().optional(),
  /**
   * Whether the window is visible or not.
   */
  visible: z.boolean().optional(),
  /**
   * Whether the window should have borders and bars.
   */
  decorations: z.boolean().optional(),
  /**
   * Whether the window should always be below other windows.
   */
  alwaysOnBottom: z.boolean().optional(),
  /**
   * Whether the window should always be on top of other windows.
   */
  alwaysOnTop: z.boolean().optional(),
  /**
   * Whether the window should be visible on all workspaces or virtual desktops.
   */
  visibleOnAllWorkspaces: z.boolean().optional(),
  /**
   * Prevents the window contents from being captured by other apps.
   */
  contentProtected: z.boolean().optional(),
  /**
   * If `true`, hides the window icon from the taskbar on Windows and Linux.
   */
  skipTaskbar: z.boolean().optional(),
  /**
   * The initial window theme. Defaults to the system theme. Only implemented on Windows and macOS 10.14+.
   */
  theme: themeSchema.optional().nullable(),
  /**
   * The style of the macOS title bar.
   */
  titleBarStyle: titleBarStyleSchema.and(z.string()),
  /**
   * If `true`, sets the window title to be hidden on macOS.
   */
  hiddenTitle: z.boolean().optional(),
  /**
   * Whether clicking an inactive window also clicks through to the webview on macOS.
   */
  acceptFirstMouse: z.boolean().optional(),
  /**
   * Defines the window [tabbing identifier] for macOS.
   *
   * Windows with matching tabbing identifiers will be grouped together. If the tabbing identifier is not set, automatic tabbing will be disabled.
   *
   * [tabbing identifier]: <https://developer.apple.com/documentation/appkit/nswindow/1644704-tabbingidentifier>
   */
  tabbingIdentifier: z.string().optional().nullable(),
  /**
   * Defines additional browser arguments on Windows. By default wry passes `--disable-features=msWebOOUI,msPdfOOUI,msSmartScreenProtection` so if you use this method, you also need to disable these components by yourself if you want.
   */
  additionalBrowserArgs: z.string().optional().nullable(),
  /**
   * Whether or not the window has shadow.
   *
   * ## Platform-specific
   *
   * - **Windows:** - `false` has no effect on decorated window, shadow are always ON. - `true` will make ndecorated window have a 1px white border, and on Windows 11, it will have a rounded corners. - **Linux:** Unsupported.
   */
  shadow: z.boolean().optional(),
  /**
   * Window effects.
   *
   * Requires the window to be transparent.
   *
   * ## Platform-specific:
   *
   * - **Windows**: If using decorations or shadows, you may want to try this workaround <https://github.com/tauri-apps/tao/issues/72#issuecomment-975607891> - **Linux**: Unsupported
   */
  windowEffects: windowEffectsConfigSchema.optional().nullable(),
  /**
   * Whether or not the webview should be launched in incognito  mode.
   *
   * ## Platform-specific:
   *
   * - **Android**: Unsupported.
   */
  incognito: z.boolean().optional(),
});

/**
 * Security configuration.
 *
 * See more: <https://tauri.app/v1/api/config#securityconfig>
 */
export const securityConfigSchema = z.object({
  /**
   * The Content Security Policy that will be injected on all HTML files on the built application. If [`dev_csp`](#SecurityConfig.devCsp) is not specified, this value is also injected on dev.
   *
   * This is a really important part of the configuration since it helps you ensure your WebView is secured. See <https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP>.
   */
  csp: cspSchema.optional().nullable(),
  /**
   * The Content Security Policy that will be injected on all HTML files on development.
   *
   * This is a really important part of the configuration since it helps you ensure your WebView is secured. See <https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP>.
   */
  devCsp: cspSchema.optional().nullable(),
  /**
   * Freeze the `Object.prototype` when using the custom protocol.
   */
  freezePrototype: z.boolean().optional(),
  /**
   * Disables the Tauri-injected CSP sources.
   *
   * At compile time, Tauri parses all the frontend assets and changes the Content-Security-Policy to only allow loading of your own scripts and styles by injecting nonce and hash sources. This stricts your CSP, which may introduce issues when using along with other flexing sources.
   *
   * This configuration option allows both a boolean and a list of strings as value. A boolean instructs Tauri to disable the injection for all CSP injections, and a list of strings indicates the CSP directives that Tauri cannot inject.
   *
   * **WARNING:** Only disable this if you know what you are doing and have properly configured the CSP. Your application might be vulnerable to XSS attacks without this Tauri protection.
   */
  dangerousDisableAssetCspModification: disabledCspModificationKindSchema.and(
    z.boolean(),
  ),
  /**
   * Allow external domains to send command to Tauri.
   *
   * By default, external domains do not have access to `window.__TAURI__`, which means they cannot communicate with the commands defined in Rust. This prevents attacks where an externally loaded malicious or compromised sites could start executing commands on the user's device.
   *
   * This configuration allows a set of external domains to have access to the Tauri commands. When you configure a domain to be allowed to access the IPC, all subpaths are allowed. Subdomains are not allowed.
   *
   * **WARNING:** Only use this option if you either have internal checks against malicious external sites or you can trust the allowed external sites. You application might be vulnerable to dangerous Tauri command related attacks otherwise.
   */
  dangerousRemoteDomainIpcAccess: z
    .array(remoteDomainAccessScopeSchema)
    .optional(),
  /**
   * Custom protocol config.
   */
  assetProtocol: assetProtocolConfigSchema.optional(),
});

/**
 * Configuration for Apple Disk Image (.dmg) bundles.
 *
 * See more: https://tauri.app/v1/api/config#dmgconfig
 */
export const dmgConfigSchema = z.object({
  /**
   * Image to use as the background in dmg file. Accepted formats: `png`/`jpg`/`gif`.
   */
  background: z.string().optional().nullable(),
  /**
   * Position of volume window on screen.
   */
  windowPosition: positionSchema.optional().nullable(),
  /**
   * Size of volume window.
   */
  windowSize: sizeSchema.optional(),
  /**
   * Position of app file on window.
   */
  appPosition: positionSchema.optional(),
  /**
   * Position of application folder on window.
   */
  applicationFolderPosition: positionSchema.optional(),
});

/**
 * The Updater configuration object.
 *
 * See more: <https://tauri.app/v1/api/config#updaterconfig>
 */
export const updaterConfigSchema = z.object({
  /**
   * Whether the updater is active or not.
   */
  active: z.boolean().optional(),
  /**
   * Signature public key.
   */
  pubkey: z.string().optional(),
  /**
   * The Windows configuration for the updater.
   */
  windows: updaterWindowsConfigSchema.optional(),
});

/**
 * Configuration for the MSI bundle using WiX.
 *
 * See more: <https://tauri.app/v1/api/config#wixconfig>
 */
export const wixConfigSchema = z.object({
  /**
   * The installer languages to build. See <https://docs.microsoft.com/en-us/windows/win32/msi/localizing-the-error-and-actiontext-tables>.
   */
  language: wixLanguageSchema.and(z.string()),
  /**
   * A custom .wxs template to use.
   */
  template: z.string().optional().nullable(),
  /**
   * A list of paths to .wxs files with WiX fragments to use.
   */
  fragmentPaths: z.array(z.string()).optional(),
  /**
   * The ComponentGroup element ids you want to reference from the fragments.
   */
  componentGroupRefs: z.array(z.string()).optional(),
  /**
   * The Component element ids you want to reference from the fragments.
   */
  componentRefs: z.array(z.string()).optional(),
  /**
   * The FeatureGroup element ids you want to reference from the fragments.
   */
  featureGroupRefs: z.array(z.string()).optional(),
  /**
   * The Feature element ids you want to reference from the fragments.
   */
  featureRefs: z.array(z.string()).optional(),
  /**
   * The Merge element ids you want to reference from the fragments.
   */
  mergeRefs: z.array(z.string()).optional(),
  /**
   * Disables the Webview2 runtime installation after app install.
   *
   * Will be removed in v2, prefer the [`WindowsConfig::webview_install_mode`] option.
   */
  skipWebviewInstall: z.boolean().optional(),
  /**
   * The path to the license file to render on the installer.
   *
   * Must be an RTF file, so if a different extension is provided, we convert it to the RTF format.
   */
  license: z.string().optional().nullable(),
  /**
   * Create an elevated update task within Windows Task Scheduler.
   */
  enableElevatedUpdateTask: z.boolean().optional(),
  /**
   * Path to a bitmap file to use as the installation user interface banner. This bitmap will appear at the top of all but the first page of the installer.
   *
   * The required dimensions are 493px × 58px.
   */
  bannerPath: z.string().optional().nullable(),
  /**
   * Path to a bitmap file to use on the installation user interface dialogs. It is used on the welcome and completion dialogs. The required dimensions are 493px × 312px.
   */
  dialogImagePath: z.string().optional().nullable(),
});

/**
 * Windows bundler configuration.
 *
 * See more: <https://tauri.app/v1/api/config#windowsconfig>
 */
export const windowsConfigSchema = z.object({
  /**
   * Specifies the file digest algorithm to use for creating file signatures. Required for code signing. SHA-256 is recommended.
   */
  digestAlgorithm: z.string().optional().nullable(),
  /**
   * Specifies the SHA1 hash of the signing certificate.
   */
  certificateThumbprint: z.string().optional().nullable(),
  /**
   * Server to use during timestamping.
   */
  timestampUrl: z.string().optional().nullable(),
  /**
   * Whether to use Time-Stamp Protocol (TSP, a.k.a. RFC 3161) for the timestamp server. Your code signing provider may use a TSP timestamp server, like e.g. SSL.com does. If so, enable TSP by setting to true.
   */
  tsp: z.boolean().optional(),
  /**
   * The installation mode for the Webview2 runtime.
   */
  webviewInstallMode: webviewInstallModeSchema.optional(),
  /**
   * Path to the webview fixed runtime to use. Overwrites [`Self::webview_install_mode`] if set.
   *
   * Will be removed in v2, prefer the [`Self::webview_install_mode`] option.
   *
   * The fixed version can be downloaded [on the official website](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section). The `.cab` file must be extracted to a folder and this folder path must be defined on this field.
   */
  webviewFixedRuntimePath: z.string().optional().nullable(),
  /**
   * Validates a second app installation, blocking the user from installing an older version if set to `false`.
   *
   * For instance, if `1.2.1` is installed, the user won't be able to install app version `1.2.0` or `1.1.5`.
   *
   * The default value of this flag is `true`.
   */
  allowDowngrades: z.boolean().optional(),
  /**
   * Configuration for the MSI generated with WiX.
   */
  wix: wixConfigSchema.optional().nullable(),
  /**
   * Configuration for the installer generated with NSIS.
   */
  nsis: nsisConfigSchema.optional().nullable(),
});

/**
 * Configuration for tauri-bundler.
 *
 * See more: <https://tauri.app/v1/api/config#bundleconfig>
 */
export const bundleConfigSchema = z.object({
  /**
   * Whether Tauri should bundle your application or just output the executable.
   */
  active: z.boolean().optional(),
  /**
   * The bundle targets, currently supports ["deb", "appimage", "nsis", "msi", "app", "dmg", "updater"] or "all".
   */
  targets: bundleTargetSchema.and(z.string()),
  /**
   * The application identifier in reverse domain name notation (e.g. `com.tauri.example`). This string must be unique across applications since it is used in system configurations like the bundle ID and path to the webview data directory. This string must contain only alphanumeric characters (A–Z, a–z, and 0–9), hyphens (-), and periods (.).
   */
  identifier: z.string(),
  /**
   * The application's publisher. Defaults to the second element in the identifier string. Currently maps to the Manufacturer property of the Windows Installer.
   */
  publisher: z.string().optional().nullable(),
  /**
   * The app's icons
   */
  icon: z.array(z.string()).optional(),
  /**
   * App resources to bundle. Each resource is a path to a file or directory. Glob patterns are supported.
   */
  resources: bundleResourcesSchema.optional().nullable(),
  /**
   * A copyright string associated with your application.
   */
  copyright: z.string().optional().nullable(),
  /**
   * The application kind.
   *
   * Should be one of the following: Business, DeveloperTool, Education, Entertainment, Finance, Game, ActionGame, AdventureGame, ArcadeGame, BoardGame, CardGame, CasinoGame, DiceGame, EducationalGame, FamilyGame, KidsGame, MusicGame, PuzzleGame, RacingGame, RolePlayingGame, SimulationGame, SportsGame, StrategyGame, TriviaGame, WordGame, GraphicsAndDesign, HealthcareAndFitness, Lifestyle, Medical, Music, News, Photography, Productivity, Reference, SocialNetworking, Sports, Travel, Utility, Video, Weather.
   */
  category: z.string().optional().nullable(),
  /**
   * File associations to application.
   */
  fileAssociations: z.array(fileAssociationSchema).optional().nullable(),
  /**
   * A short description of your application.
   */
  shortDescription: z.string().optional().nullable(),
  /**
   * A longer, multi-line description of the application.
   */
  longDescription: z.string().optional().nullable(),
  /**
   * Configuration for the AppImage bundle.
   */
  appimage: appImageConfigSchema.optional(),
  /**
   * Configuration for the Debian bundle.
   */
  deb: debConfigSchema.optional(),
  /**
   * DMG-specific settings.
   */
  dmg: dmgConfigSchema.optional(),
  /**
   * Configuration for the macOS bundles.
   */
  macOS: macConfigSchema.optional(),
  /**
   * A list of—either absolute or relative—paths to binaries to embed with your application.
   *
   * Note that Tauri will look for system-specific binaries following the pattern "binary-name{-target-triple}{.system-extension}".
   *
   * E.g. for the external binary "my-binary", Tauri looks for:
   *
   * - "my-binary-x86_64-pc-windows-msvc.exe" for Windows - "my-binary-x86_64-apple-darwin" for macOS - "my-binary-x86_64-unknown-linux-gnu" for Linux
   *
   * so don't forget to provide binaries for all targeted platforms.
   */
  externalBin: z.array(z.string()).optional().nullable(),
  /**
   * Configuration for the Windows bundle.
   */
  windows: windowsConfigSchema.optional(),
  /**
   * iOS configuration.
   */
  iOS: iosConfigSchema.optional(),
  /**
   * Android configuration.
   */
  android: androidConfigSchema.optional(),
  /**
   * The updater configuration.
   */
  updater: updaterConfigSchema.optional(),
});

/**
 * The Tauri configuration object.
 *
 * See more: <https://tauri.app/v1/api/config#tauriconfig>
 */
export const tauriConfigSchema = z.object({
  /**
   * The pattern to use.
   */
  pattern: patternKindSchema.optional(),
  /**
   * The windows configuration.
   */
  windows: z.array(windowConfigSchema).optional(),
  /**
   * The bundler configuration.
   */
  bundle: bundleConfigSchema.optional(),
  /**
   * Security configuration.
   */
  security: securityConfigSchema.optional(),
  /**
   * Configuration for app tray icon.
   */
  trayIcon: trayIconConfigSchema.optional().nullable(),
  /**
   * MacOS private API configuration. Enables the transparent background API and sets the `fullScreenEnabled` preference to `true`.
   */
  macOSPrivateApi: z.boolean().optional(),
});

/**
 * The Tauri configuration object. It is read from a file where you can define your frontend assets, configure the bundler and define a tray icon.
 *
 * The configuration file is generated by the [`tauri init`](https://tauri.app/v1/api/cli#init) command that lives in your Tauri application source directory (src-tauri).
 *
 * Once generated, you may modify it at will to customize your Tauri application.
 *
 * ## File Formats
 *
 * By default, the configuration is defined as a JSON file named `tauri.conf.json`.
 *
 * Tauri also supports JSON5 and TOML files via the `config-json5` and `config-toml` Cargo features, respectively. The JSON5 file name must be either `tauri.conf.json` or `tauri.conf.json5`. The TOML file name is `Tauri.toml`.
 *
 * ## Platform-Specific Configuration
 *
 * In addition to the default configuration file, Tauri can read a platform-specific configuration from `tauri.linux.conf.json`, `tauri.windows.conf.json`, `tauri.macos.conf.json`, `tauri.android.conf.json` and `tauri.ios.conf.json` (or `Tauri.linux.toml`, `Tauri.windows.toml`, `Tauri.macos.toml`, `Tauri.android.toml` and `Tauri.ios.toml` if the `Tauri.toml` format is used), which gets merged with the main configuration object.
 *
 * ## Configuration Structure
 *
 * The configuration is composed of the following objects:
 *
 * - [`package`](#packageconfig): Package settings - [`tauri`](#tauriconfig): The Tauri config - [`build`](#buildconfig): The build configuration - [`plugins`](#pluginconfig): The plugins config
 *
 * ```json title="Example tauri.config.json file" { "build": { "beforeBuildCommand": "", "beforeDevCommand": "", "devPath": "../dist", "distDir": "../dist" }, "package": { "productName": "tauri-app", "version": "0.1.0" }, "tauri": { "bundle": {}, "security": { "csp": null }, "windows": [ { "fullscreen": false, "height": 600, "resizable": true, "title": "Tauri App", "width": 800 } ] } } ```
 */
export const configSchema = z.object({
  /**
   * The JSON schema for the Tauri config.
   */
  $schema: z.string().optional().nullable(),
  /**
   * Package settings.
   */
  package: packageConfigSchema.optional(),
  /**
   * The Tauri configuration.
   */
  tauri: tauriConfigSchema.optional(),
  /**
   * The build configuration.
   */
  build: buildConfigSchema.optional(),
  /**
   * The plugins config.
   */
  plugins: pluginConfigSchema.optional(),
});
