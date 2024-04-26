import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function AccordionDemo({qAndAItems}) {

    return (
      <Accordion type="single" collapsible className="w-full">

        {qAndAItems.map((item, idx)=> {
            return (
        <AccordionItem value={`${item.__typename}-${idx}`} key={`${item.__typename}-${idx}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            {item.answer}
          </AccordionContent>
        </AccordionItem>

            )
        })}
      </Accordion>
    )
  }
  