import SidebarPortal from "@/src/components/Portal/SidebarPortal";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Portal | Shopee Indonesia";
  const description = "Portal Shopee Indonesia";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/shopee2.png",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F6F6F6] w-full h-180 flex justify-between items-start">
      <SidebarPortal />
      {children}
    </div>
  );
}
