"use client";
import Link from "next/link";
import { navData } from "@/constants/data";
import { usePathname } from "next/navigation";
const NavLinks = () => {
  const pathname = usePathname();
  
  return (
    <div className="hidden md:inline-flex w-1/3 font-semibold items-center gap-6 text-text  text-sm capitalize">
      {navData?.map((item) => (
        <Link
          key={item?.title}
          href={item?.href}
          className={`hover:text-accent hoverEffect relative group ${pathname === item?.href && "text-accent"}`}
        >
          {item?.title}
          <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300
            ${pathname === item?.href && "scale-x-100"}`} />
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
