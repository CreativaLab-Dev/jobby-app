"use client"

import {useState, useTransition} from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import {OpportunitySelect} from "@/features/oportunities/components/opportunity-select";
import {addOpportunitySelection} from "@/features/oportunities/actions/add-opportunity-selection";
import {OpportunitySelection} from "@prisma/client";

interface OpportunityPageProps {
  opportunity?: OpportunitySelection
}

export default function OpportunityPage({opportunity}: OpportunityPageProps) {
  const [selectedType, setSelectedType] = useState(opportunity?.type || "")
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  const handleStart = () => {
    if (selectedType) {
      localStorage.setItem("opportunity-type", selectedType)
      onSubmit()
      router.push(`/options`)
    }
  }
  
  const onSubmit = () => {
    if (isPending) return
    startTransition(() => {
      addOpportunitySelection(selectedType).then((result) => {
        if (result?.success) {
          router.push(`/options`)
        }
      })
    })
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            CV Score y Oportunidades
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-12"
          >
            Descubre tu potencial y encuentra las mejores oportunidades académicas y profesionales
          </motion.p>
          
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">¿Qué tipo de oportunidad buscas?</CardTitle>
              <CardDescription>Selecciona el área que más te interese para personalizar tu experiencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <OpportunitySelect value={selectedType} onChange={setSelectedType} />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleStart}
                  disabled={!selectedType || isPending}
                  className="w-full h-14 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 cursor-pointer"
                >
                  Comenzar Análisis
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
