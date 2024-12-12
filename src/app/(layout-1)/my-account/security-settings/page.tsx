import { LoggedInSessions } from "@/components/profile/myAccount/LoggedInSessions";
import { SecuritySettings } from "@/components/profile/myAccount/SecuritySettings";

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Security Settings</h2>
      <SecuritySettings />
      <LoggedInSessions/>
    </div>
  )
}
