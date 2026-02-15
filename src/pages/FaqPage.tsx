import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { HelpCircle, MapPin, ExternalLink, Mail, MessageCircleQuestion } from 'lucide-react';
import { faqData, faqCategories, type FaqCategory } from '@/config/faqConfig';
import { useNavigate } from 'react-router-dom';

export default function FaqPage() {
  const navigate = useNavigate();
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  // Group FAQ items by category
  const groupedFaq = Object.keys(faqCategories).reduce((acc, cat) => {
    const category = cat as FaqCategory;
    const items = faqData.filter(item => item.category === category);
    if (items.length > 0) {
      acc[category] = items;
    }
    return acc;
  }, {} as Record<FaqCategory, typeof faqData>);

  const handleAction = (item: typeof faqData[0]) => {
    if (item.mapLocationId) {
      // Navigate to map with room selected
      navigate(`/?room=${item.mapLocationId}`);
    } else if (item.externalLink) {
      window.open(item.externalLink, '_blank');
    }
  };

  const FaqList = () => (
    <div className="space-y-6 md:space-y-8 pb-24 md:pb-0 w-full max-w-3xl mx-auto">
      {(Object.keys(groupedFaq) as FaqCategory[]).map((category) => (
        <div key={category} className="space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
            {category === 'admin' && <MapPin className="w-5 h-5" />}
            {category === 'info' && <HelpCircle className="w-5 h-5" />}
            {category === 'app' && <MessageCircleQuestion className="w-5 h-5" />}
            {faqCategories[category]}
          </h2>

          <Accordion type="single" collapsible className="w-full" value={openItem} onValueChange={setOpenItem}>
            {groupedFaq[category].map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-b-border/40">
                <AccordionTrigger className="text-left text-base font-medium hover:text-primary transition-colors py-3">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-3 text-sm md:text-base leading-relaxed">
                  <p>{item.answer}</p>

                  {(item.mapLocationId || item.externalLink) && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 gap-2 h-8 text-xs md:text-sm md:h-9"
                      onClick={() => handleAction(item)}
                    >
                      {item.mapLocationId && <MapPin className="w-3 h-3 md:w-4 md:h-4" />}
                      {item.externalLink?.startsWith('mailto:') && <Mail className="w-3 h-3 md:w-4 md:h-4" />}
                      {item.externalLink && !item.externalLink.startsWith('mailto:') && <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />}
                      {item.actionLabel || "Детальніше"}
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col bg-background overflow-auto">
      <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 pt-6 md:pt-12">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Гід по коледжу
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Загубився в коридорах чи шукаєш деканат? Тут ми зібрали всю необхідну інформацію, щоб ти почувався впевнено.
          </p>
          <div className="h-px w-24 bg-border mx-auto mt-6" />
        </div>

        {/* Content */}
        <FaqList />
      </div>
    </div>
  );
}
