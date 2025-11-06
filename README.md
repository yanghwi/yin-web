# Yin Meditation Timer

A radically minimal meditation timer for iOS built with SwiftUI.

## Project Structure

```
ios/
└── YinTimerApp/
    ├── YinTimerApp.xcodeproj/        # Xcode project for the SwiftUI application
    └── YinTimerApp/
        ├── Assets.xcassets/          # App icon, accent color, and image assets
        ├── Base.lproj/               # Localized resources (Launch Screen)
        ├── ContentView.swift         # Timer UI and interaction logic
        ├── Info.plist                # Application configuration
        ├── LaunchScreen.storyboard   # Minimal launch screen
        ├── Preview Content/          # SwiftUI preview assets
        └── YinTimerApp.swift         # App entry point and audio manager
```

## Features

- Adjustable session length from 1 to 60 minutes using an accessible slider.
- Large, legible countdown display with start, pause/resume, and reset controls.
- Completion alert with a native "glass" system sound.
- Gentle gradient background and launch screen for a cohesive experience.

## Requirements

- Xcode 13 or newer
- iOS 15.0+ deployment target

## Building the App

1. Open `ios/YinTimerApp/YinTimerApp.xcodeproj` in Xcode.
2. Select the **YinTimerApp** scheme and choose an iOS Simulator or a connected device.
3. Build and run with <kbd>⌘R</kbd>.

## Using the Timer

1. Adjust the session length with the slider. The display updates to show the total duration.
2. Tap **Start** to begin counting down. Use **Pause** and **Resume** to control the session without resetting.
3. Tap **Reset** at any time to stop the timer and return to the chosen session length.
4. When the countdown reaches zero, the timer plays a gentle bell and presents a completion reminder.

## Assets

- **App Icon**: Single scalable vector (`AppIcon.svg`) referenced from the asset catalog so no binary image files are required.
- **Accent Color**: A muted teal accent stored in `Assets.xcassets`.
- **Launch Screen**: Centered “Yin Timer” typography on a light background defined in `LaunchScreen.storyboard`.
