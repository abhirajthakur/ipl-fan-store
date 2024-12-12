"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IPL_TEAMS } from "@/lib/constants";
import { toast } from "sonner";
import Image from "next/image";
import { Settings, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isChanging, setIsChanging] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(session?.user?.team.id);

  if (!session?.user) {
    router.push("/login");
    return null;
  }

  const handleTeamChange = async () => {
    if (!selectedTeam || selectedTeam === session.user.team.id) {
      return;
    }

    setIsChanging(true);
    try {
      const response = await fetch("/api/team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId: selectedTeam }),
      });

      if (!response.ok) {
        throw new Error("Failed to update team");
      }

      const data = await response.json();
      await update();

      toast.success(`Welcome to ${data.user.team.name} Fan Store!`);
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to update team");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: session.user.team.colors.secondary }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Change Your Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {IPL_TEAMS.map((team) => (
              <div
                key={team.id}
                className={cn(
                  `relative rounded-lg hover:scale-105 overflow-hidden cursor-pointer transition-all duration-300 ring-${team.colors.secondary}`,
                  {
                    "ring-4": selectedTeam === team.id,
                  },
                )}
                style={{
                  backgroundColor: team.colors.primary,
                }}
                onClick={() => setSelectedTeam(team.id)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={team.logo}
                    alt={team.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-center">
                    <p className="text-sm font-semibold">{team.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <Button
              onClick={handleTeamChange}
              disabled={isChanging || selectedTeam === session.user.team.id}
              style={{
                backgroundColor: session.user.team.colors.primary,
                color: "#fff",
              }}
            >
              {isChanging ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Changing Team...
                </>
              ) : (
                "Change Team"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
