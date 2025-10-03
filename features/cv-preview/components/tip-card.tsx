import { Card, CardContent } from "@/components/ui/card"

interface TipCardProps {
  opportunityType: string
}

export function TipCard({ opportunityType }: TipCardProps) {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-orange-50">
      <CardContent className="p-6">
        <h4 className="font-semibold text-gray-800 mb-2">💡 Consejo</h4>
        <p className="text-sm text-gray-600">
          Tu CV está optimizado para {opportunityType}. El análisis te mostrará cómo mejorarlo aún más.
        </p>
      </CardContent>
    </Card>
  )
}
