/* eslint-disable no-undef */
/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js")

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
	{
		url: "_config.yml",
		revision: "474f14a024e368440e2f95769cff7bb4"
	},
	{
		url: "404.html",
		revision: "a9ad7186d668528581b6f5f9e578ce8b"
	},
	{
		url: "config.txt",
		revision: "b0eee78989b2e84093f5080802103273"
	},
	{
		url: "css/style.css",
		revision: "7e23e54660f9b0274adb3afb70f8fcf1"
	},
	{
		url: "favicon.ico",
		revision: "3214324a79fc5ec0aee03c0495673df8"
	},
	{
		url: "index.html",
		revision: "618d1bcfaf54a5690555820704799af6"
	},
	{
		url: "js/index.js",
		revision: "bf403de7a925546dbafb321c5e01c247"
	},
	{
		url: "manifests/browserconfig.xml",
		revision: "fc880f2a7d3aa81fdf69af8000505a8a"
	},
	{
		url: "manifests/site.webmanifest",
		revision: "e217925ed363c7a1b50ca24ae5aad155"
	},
	{
		url: "no-javascript.html",
		revision: "819ac091369ecf7a4055ed487fe5202a"
	},
	{
		url: "README.md",
		revision: "dfe91c3a6098b164b378accfcf6e42e9"
	},
	{
		url: "resources/android-chrome-144x144.png",
		revision: "777117eb9eb7b42a7736fe4cc65bb7f4"
	},
	{
		url: "resources/android-chrome-36x36.png",
		revision: "2a0824b72ce1665cc94f0066667ff54c"
	},
	{
		url: "resources/android-chrome-48x48.png",
		revision: "85b1774486f8355642cca058ac6ff6cc"
	},
	{
		url: "resources/android-chrome-72x72.png",
		revision: "28b4ed835fa12b3a911991e590e8b9a0"
	},
	{
		url: "resources/android-chrome-96x96.png",
		revision: "e93973f7622b28f6cbadb2ac1fe195a6"
	},
	{
		url: "resources/mstile-150x150.png",
		revision: "373eab10b7c2918c1cb2e5a2ff7295ba"
	},
	{
		url: "workbox-config.js",
		revision: "5fee5a9cf219335a8f572478b432f31f"
	}
].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
/* eslint-enable no-undef */
