import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Dumbbell, 
  Utensils, 
  Bed, 
  Target, 
  Brain,
  Settings,
  Zap
} from "lucide-react";
import type { User } from "@shared/schema";

interface SidebarProps {
  user: User | null;
  isOpen: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { name: "Dashboard", icon: BarChart3, active: true },
  { name: "Workouts", icon: Dumbbell, active: false },
  { name: "Nutrition", icon: Utensils, active: false },
  { name: "Recovery", icon: Bed, active: false },
  { name: "Goals", icon: Target, active: false },
  { name: "AI Coach", icon: Brain, active: false },
];

export function Sidebar({ user, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <nav className={cn(
        "fixed left-0 top-0 h-full w-64 z-40 transition-transform duration-300 ease-in-out",
        "bg-dark-secondary/90 backdrop-blur-xl border-r border-white/10",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Zap className="text-white h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Apex Coach</h1>
              <p className="text-xs text-gray-400">AI Fitness Coaching</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={item.active ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start space-x-3 h-12",
                    item.active 
                      ? "gradient-primary text-white font-medium" 
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Button>
              );
            })}
          </div>

          {/* User Profile */}
          {user && (
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glassmorphism p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img 
                    src={user.profileImage || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"} 
                    alt="User profile" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-white truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {user.membershipType} Member
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
