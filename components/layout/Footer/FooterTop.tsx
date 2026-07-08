import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle: "Kathamndu, Nepal",
    icon: (
      <MapPin className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+977 123456789",
    icon: (
      <Phone className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <Clock className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "contact@vaultenterprises.com.np",
    icon: (
      <Mail className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b border-accent/90">
      {data?.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 group hover:bg-gray-50 p-4 transition-colors hoverEffect"
        >
          {item?.icon}
          <div>
            <h3 className="font-semibold text-primary group-hover:text-accent hoverEffect">
              {item?.title}
            </h3>
            <p className="text-primary text-sm mt-1 group-hover:text-accent hoverEffect">
              {item?.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;