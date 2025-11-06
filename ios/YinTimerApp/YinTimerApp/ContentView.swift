import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var audioManager: MeditationAudioManager
    @State private var duration: Double = 10
    @State private var remaining: Int = 600
    @State private var isRunning = false
    @State private var showEndAlert = false
    @State private var timer: Timer?
    @State private var hasStarted = false

    private var formattedRemaining: String {
        let minutes = remaining / 60
        let seconds = remaining % 60
        return String(format: "%02d:%02d", minutes, seconds)
    }

    var body: some View {
        VStack(spacing: 32) {
            Text("Yin Timer")
                .font(.largeTitle.weight(.semibold))

            VStack(spacing: 12) {
                Text("Session Length")
                    .font(.headline)

                Slider(value: $duration, in: 1...60, step: 1) { editing in
                    if editing {
                        pauseTimer()
                    } else {
                        applyDurationChange()
                    }
                }
                .accessibilityLabel("Timer duration")

                Text("\(Int(duration)) minutes")
                    .font(.title3)
                    .monospacedDigit()
            }
            .padding()
            .background(RoundedRectangle(cornerRadius: 16).fill(Color(.secondarySystemBackground)))

            VStack(spacing: 16) {
                Text(formattedRemaining)
                    .font(.system(size: 64, weight: .medium, design: .monospaced))
                    .accessibilityIdentifier("remaining-time")

                HStack(spacing: 20) {
                    Button(action: toggleTimer) {
                        Label(isRunning ? "Pause" : (hasStarted ? "Resume" : "Start"), systemImage: isRunning ? "pause.circle.fill" : "play.circle.fill")
                            .font(.title2)
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(isRunning ? .orange : .green)

                    Button(action: resetTimer) {
                        Label("Reset", systemImage: "stop.circle")
                            .font(.title2)
                    }
                    .buttonStyle(.bordered)
                    .tint(.red)
                }
            }
            .padding()
            .background(RoundedRectangle(cornerRadius: 16).fill(Color(.systemBackground)).shadow(color: Color.black.opacity(0.1), radius: 10, x: 0, y: 4))

            Spacer()
        }
        .padding()
        .background(LinearGradient(gradient: Gradient(colors: [Color(.systemGray6), Color(.systemGray5)]), startPoint: .topLeading, endPoint: .bottomTrailing).ignoresSafeArea())
        .onAppear {
            applyDurationChange()
        }
        .onDisappear {
            pauseTimer()
        }
        .alert("Session Complete", isPresented: $showEndAlert) {
            Button("OK", role: .cancel) {
                showEndAlert = false
            }
        } message: {
            Text("Take a moment to notice how you feel.")
        }
    }

    private func applyDurationChange() {
        let newTotal = Int(duration) * 60
        remaining = newTotal
        hasStarted = false
    }

    private func toggleTimer() {
        isRunning ? pauseTimer() : startTimer()
    }

    private func startTimer() {
        if !hasStarted {
            remaining = Int(duration) * 60
            hasStarted = true
        }

        guard remaining > 0 else {
            completeTimer()
            return
        }

        isRunning = true
        timer?.invalidate()
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
            guard remaining > 0 else {
                completeTimer()
                return
            }
            remaining -= 1
        }
    }

    private func pauseTimer() {
        timer?.invalidate()
        timer = nil
        isRunning = false
    }

    private func resetTimer() {
        pauseTimer()
        applyDurationChange()
    }

    private func completeTimer() {
        pauseTimer()
        audioManager.playEndBell()
        showEndAlert = true
        hasStarted = false
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(MeditationAudioManager())
    }
}
