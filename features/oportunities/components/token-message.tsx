import { motion } from "framer-motion"

interface TokenMessageProps {
  token: string | null
}

export const TokenMessage = ({ token }: TokenMessageProps) => {
  if (!token) return null
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-sm text-green-600 bg-green-50 p-3 rounded-lg"
    >
      ✓ Token de acceso verificado
    </motion.div>
  )
}
