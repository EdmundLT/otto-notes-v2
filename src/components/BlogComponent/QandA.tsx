import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type QandAItem = {
  question: string;
  answer: string;
};

export function AccordionDemo({ qAndAItems }: { qAndAItems: QandAItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {qAndAItems.map((item, idx) => (
        <AccordionItem value={`faq-${idx}`} key={item.question}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
