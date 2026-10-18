import { useEffect, useRef } from "react";
import { driver, type DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import { useLocation } from "react-router-dom";

const STORAGE_KEY = "apr-digital-tour-done";

const STEPS: DriveStep[] = [
  {
    element: "[data-tour='progress']",
    popover: {
      title: "Voce esta em 7 etapas",
      description:
        "Preencha na ordem: contexto, triagem de riscos, checklist, EPIs, riscos locais, revisao e recusa. A barra mostra onde voce esta.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "[data-tour='contexto']",
    popover: {
      title: "Preencha o contexto",
      description:
        "Nome, area, atividade, matricula, data e horario identificam a APR. Todos os campos sao obrigatorios.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "[data-tour='topcontrols']",
    popover: {
      title: "Os 3 controles criticos iniciais",
      description:
        "Se voce responder NAO em qualquer um deles, o Dever de Recusa sera ativado automaticamente. Isso nao e um erro — e protecao.",
      side: "top",
      align: "start",
    },
  },
  {
    element: "[data-tour='next']",
    popover: {
      title: "Avance pelo wizard",
      description:
        "Use Proximo e Voltar para navegar. Tudo e salvo automaticamente — voce pode fechar e continuar depois.",
      side: "top",
      align: "end",
    },
  },
];

export function OnboardingTour() {
  const location = useLocation();
  const driverRef = useRef<ReturnType<typeof driver> | null>(null);

  useEffect(() => {
    if (location.pathname !== "/contexto" && location.pathname !== "/") {
      return;
    }

    const done = localStorage.getItem(STORAGE_KEY);
    if (done === "true") return;

    // pequeno delay para o DOM montar antes de procurar os elementos
    const timer = setTimeout(() => {
      const d = driver({
        showProgress: true,
        progressText: "{{current}} de {{total}}",
        nextBtnText: "Proximo",
        prevBtnText: "Anterior",
        doneBtnText: "Entendi",
        allowClose: true,
        overlayColor: "rgba(0, 0, 0, 0.6)",
        stagePadding: 6,
        steps: STEPS,
        onDestroyed: () => {
          localStorage.setItem(STORAGE_KEY, "true");
        },
      });
      driverRef.current = d;
      d.drive();
    }, 600);

    return () => {
      clearTimeout(timer);
      if (driverRef.current) {
        driverRef.current.destroy();
        driverRef.current = null;
      }
    };
  }, [location.pathname]);

  return null;
}
