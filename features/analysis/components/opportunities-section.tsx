"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, ExternalLink } from "lucide-react"
import type { Opportunity } from "@/types/analysis"

interface OpportunitiesSectionProps {
  opportunities: Opportunity[]
}

export function OpportunitiesSection({ opportunities }: OpportunitiesSectionProps) {
  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-gray-800">
          <Award className="w-8 h-8 mr-3 text-purple-500" />
          Top 5 Oportunidades para Ti
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {opportunities.map((opp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-white"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{opp.title}</h3>
                <div className="flex items-center gap-4 mb-3">
                  <Badge variant="outline">{opp.type}</Badge>
                  <span className="text-sm text-gray-500">Fecha límite: {opp.deadline}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600 mb-1">{opp.match}%</div>
                <p className="text-sm text-gray-500">Match</p>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Requisitos:</h4>
              <div className="flex flex-wrap gap-2">
                {opp.requirements.map((req, reqIndex) => (
                  <Badge key={reqIndex} variant="secondary" className="text-xs">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Progress value={opp.match} className="flex-1 mr-4" />
              <Button size="sm" variant="outline">
                <ExternalLink className="w-4 h-4 mr-1" />
                Ver más
              </Button>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
