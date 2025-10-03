"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CVPreviewFull } from "@/features/cv-preview/components/c-v-preview-full"
import { ActionsSidebar } from "@/features/cv-preview/components/actions-sidebar"
import { TipCard } from "@/features/cv-preview/components/tip-card"
import {CVData} from "@/types/cv";
import {LoadingModal} from "@/components/loading-modal";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {Play} from "lucide-react";

interface PreviewCVComponentProps {
  cv: CVData
  cvId?: string
  opportunityType: string
}

export function PreviewCVComponent({ cv: cvData, cvId, opportunityType }: PreviewCVComponentProps) {
  const [openModal, setOpenModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false)
  const router = useRouter()
  
  const handleStartAnalysis = async () => {
    console.log("Starting analysis for CV:", cvData);
    try {
      setOpenModal(true);
      setIsDisabled(true);
      // Simulate analysis process
      const response = await axios.post(`/api/cv/analysis`, {cvData, cvId: cvId});
      if (response.status === 200) {
        console.log("Analysis started successfully");
        // Redirect to analysis page or show success message
        router.push("/analysis");
      } else {
        console.error("Failed to start analysis:", response.data);
      }
    } catch (error) {
      console.error("Error starting analysis:", error)
      setIsDisabled(false);
    } finally {
      setOpenModal(false);
    }
  }
  // Todo onichan
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {openModal && <LoadingModal show={openModal} error={null}/> }
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-white shadow-md rounded-2xl mb-8 border border-gray-100">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Vista Previa de tu CV</h1>
              <p className="text-gray-600">Revisa tu CV antes de continuar con el
              <strong>{" "} análisis</strong>
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-md px-3 py-1 capitalize border-gray-300 bg-gray-50 text-gray-700">
                {opportunityType}
              </Badge>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  disabled={isDisabled}
                  onClick={handleStartAnalysis}
                  className="flex items-center gap-2 h-12 px-6 text-md font-medium text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl cursor-pointer"
                >
                  <motion.div
                    animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Play className="w-4 h-4" />
                  </motion.div>
                  Análisis con IA
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5], x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    ✨
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
          
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* CV Preview */}
            <div className="lg:col-span-3">
              <Card className="shadow-xl border-0 bg-white">
                <CardContent className="p-0">
                  <CVPreviewFull data={cvData} type={opportunityType} />
                </CardContent>
              </Card>
            </div>
            
            {/* Actions Sidebar */}
            <div className="space-y-6">
              <ActionsSidebar
                isDisabled={isDisabled}
                cvData={cvData}
                opportunityType={opportunityType}
                onEditCV={() => router.push("/create-cv")}
              />
              <TipCard opportunityType={opportunityType} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
