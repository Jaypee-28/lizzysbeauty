import { Metadata } from "next";
import { serviceService } from "@/modules/services/service.service";
import { ServicesClient } from "./services-client";

export const metadata: Metadata = {
  title: "Services | Lizzy's Beauty Studio",
  description: "Explore our premium hair services and book your appointment today.",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await serviceService.getAllServices();

  return <ServicesClient services={services} />;
}
