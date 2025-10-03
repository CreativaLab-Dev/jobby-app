import {getUser} from "@/lib/get-user";
import ChangePassword from "@/features/user/components/change-password";

export default async function ChangePasswordPage() {
  const user = await getUser();
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">No tienes acceso a esta página. Por favor, inicia sesión.</p>
      </div>
    );
  }
  return (
    <ChangePassword user={user} />
  )
}
