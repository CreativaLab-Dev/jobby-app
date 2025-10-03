import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog"
import {Analyzing} from "@/features/analysis/components/analyzing";

export function LoadingModal({ show, error }: { show: boolean, error: string | null }) {
  return (
    <Dialog open={show} modal={true} >
      <DialogTitle className="text-center text-2xl font-semibold">
        Análisis en Progreso
      </DialogTitle>
      <DialogContent className="flex flex-col items-center gap-4">
        {
          error ? (
            <div className="text-red-500 text-center">
              <p>Error al analizar el CV:</p>
              <p>{error}</p>
              <p>Por favor, inténtalo de nuevo más tarde.</p>
              <p>Si el problema persiste, contacta con el soporte.</p>
              <p>Gracias por tu paciencia.</p>
              <p>¡Estamos trabajando para solucionarlo!</p>
              <p>¡Tu CV es importante para nosotros!</p>
              <p>¡Gracias por tu comprensión!</p>
              <p>¡Estamos aquí para ayudarte!</p>
              <p>¡Tu éxito es nuestra prioridad!</p>
              <p>¡Gracias por confiar en nosotros!</p>
            </div>
          ) : (
            <Analyzing />
          )
        }
      </DialogContent>
    </Dialog>
  )
}