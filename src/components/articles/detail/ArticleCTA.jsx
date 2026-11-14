import { Button, Container } from "@/components/ui";

export default function ArticleCTA() {
  return (
    <section className="bg-navy">
      <Container className="py-16 text-center sm:py-20">
        <p className="eyebrow !text-ice-300">Beyond the headlines</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl leading-tight !text-white sm:text-4xl">
          Turn market understanding into informed decisions.
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ice-300/90">
          Explore our research and advisory offerings for a more structured approach to market analysis.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/advisory" variant="light">Explore Advisory</Button>
          <Button href="/contact" variant="outline" className="!border-white/25 !bg-transparent !text-white hover:!bg-white/10">
            Get in Touch
          </Button>
        </div>
      </Container>
    </section>
  );
}
