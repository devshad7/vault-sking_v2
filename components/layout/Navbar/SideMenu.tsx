import React from "react";
import { useOutsideClick } from "@/hooks";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navData } from "@/constants/data";
import SocialMedia from "@/components/layout/Navbar/SocialMedia";
interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div 
      className={`fixed inset-y-0 left-0 z-50 w-full bg-black/50 shadow-xl ${isOpen ? "translate-x-0" : "-translate-x-full"} hoverEffect`}
    >
      <div ref={sidebarRef} 
      className="min-w-72 max-w-96 bg-black h-screen border-r border-r-accent p-10 flex-col gap-6">
        <div className="flex items-center         justify-between gap-5">
         
          <button type="button" className="text-white hover:text-accent hoverEffect" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="flex flex-col space-y-4 font-semibold text-lg text-white mt-10">
          {navData?.map((item) => (
            <a
              key={item.title}
              href={item.href}
          className={`text-white hover:text-accent hoverEffect
             ${
              pathname === item?.href && "text-accent"
             }`}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-5 border-t border-t-accent pt-5">
        <SocialMedia />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
