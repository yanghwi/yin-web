import SwiftUI
import AudioToolbox

@main
struct YinTimerApp: App {
    @StateObject private var audioManager = MeditationAudioManager()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(audioManager)
        }
    }
}

final class MeditationAudioManager: ObservableObject {
    private let systemSoundId: SystemSoundID = 1016 // Glass

    func playEndBell() {
        AudioServicesPlaySystemSound(systemSoundId)
    }
}
