import { prisma } from './src/lib/db';

async function main() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      email: "sarah@example.com",
      message: "Lizzy's Beauty Studio completely transformed my nail care routine. The attention to detail is unmatched, and my gel manicures last longer than ever before.",
      rating: 5,
      isApproved: true,
    },
    {
      name: "Emily Rodriguez",
      email: "emily@example.com",
      message: "I booked Lizzy for my bridal party and the experience was incredible. We felt so pampered, and our nails looked flawless for the wedding photos.",
      rating: 5,
      isApproved: true,
    },
    {
      name: "Jessica Chen",
      email: "jessica@example.com",
      message: "The most relaxing, hygienic, and premium salon experience I've had in the city. The staff is so welcoming and talented.",
      rating: 5,
      isApproved: true,
    },
  ];

  console.log('Seeding testimonials...');
  
  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: t
    });
  }
  
  console.log('Testimonials seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
