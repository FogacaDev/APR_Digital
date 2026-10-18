import { Providers } from "@/app/providers";
import { AppRouter } from "@/app/router";
import { OnboardingTour } from "@/app/onboarding-tour";

export default function App() {
  return (
    <Providers>
      <AppRouter />
      <OnboardingTour />
    </Providers>
  );
}
