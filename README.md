# TmaxBeton
A **Ionic/Cordova** based application for **Ecole Française du Béton** developed by [Nicolas Taltaud](mailto:nicolas.taltaud@gmail.com)

## Platforms
| Android 4.4+ | iOS 8+ | Windows 8.1/10 |
| --- | --- | --- |
| version `1.0.0`  | version `1.0.1`  | version `1.0.1` |
| [Google Play](https://play.google.com/store/apps/details?id=efbeton.tmaxbeton.app)  | *link coming soon*  | *link coming soon* |

## Installation
### Tools
* Ionic Framework: [Ionic website](https://ionicframework.com/docs/intro/installation/)
* NPM: [NPM website](https://www.npmjs.com/)

### Installation
```
npm install
```
(in project folder)

## Browser development
```
ionic serve -w chrome
```
(for [Google Chrome](https://www.google.com/chrome/))

## Generate apps
* Set up: [Ionic website](https://ionicframework.com/docs/developer-resources/platform-setup/windows-setup.html)
* Full procedure: [Ionic website](https://ionicframework.com/docs/intro/deploying/)
### Android
```
ionic cordova build android --prod --release
```
(install first [Android Studio](https://developer.android.com/studio/index.html))

### iOS
```
ionic cordova build ios --prod --release
```
(install first [XCode](https://developer.apple.com/xcode/))

### Windows
```
ionic cordova build windows -- --arch=x86 --appx=uap
```
(install first [Visual Studio](https://www.visualstudio.com/fr/vs/))

## Deploy and sign apps
[Official documentation](https://ionicframework.com/docs/intro/deploying/)
