import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, MapPin, ExternalLink, Mail, MessageCircleQuestion, Sparkles } from 'lucide-react';
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
      navigate(`/?room=${item.mapLocationId}`);
    } else if (item.externalLink) {
      window.open(item.externalLink, '_blank');
    }
  };

  const FaqList = () => (
    <div className="space-y-12 md:space-y-16 pb-24 md:pb-12 w-full max-w-3xl mx-auto relative z-10">
      {(Object.keys(groupedFaq) as FaqCategory[]).map((category) => (
        <div key={category} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Category Header */}
          <div className="flex items-center gap-3 sticky top-4 z-20 w-max">
            <div className="p-2 bg-foreground text-background rounded-xl shadow-lg">
              {category === 'admin' && <MapPin className="w-5 h-5" />}
              {category === 'info' && <HelpCircle className="w-5 h-5" />}
              {category === 'app' && <MessageCircleQuestion className="w-5 h-5" />}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {faqCategories[category]}
            </h2>
          </div>

          {/* Accordion List */}
          <Accordion type="single" collapsible className="w-full space-y-3" value={openItem} onValueChange={setOpenItem}>
            {groupedFaq[category].map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id} 
                className="border border-border/40 bg-background/60 backdrop-blur-xl rounded-2xl px-2 md:px-4 overflow-hidden transition-all duration-300 data-[state=open]:border-foreground/20 data-[state=open]:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:data-[state=open]:shadow-[0_8px_30px_rgb(255,255,255,0.04)] hover:border-foreground/30"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:text-foreground transition-all py-5 hover:no-underline group">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm md:text-base leading-relaxed">
                  <div className="pl-1 space-y-4">
                    <p className="opacity-90">{item.answer}</p>

                    {(item.mapLocationId || item.externalLink) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full gap-2 h-9 md:h-10 px-4 md:px-6 text-xs md:text-sm font-medium border-border/50 hover:bg-foreground hover:text-background transition-all duration-300 active:scale-95 shadow-sm"
                        onClick={() => handleAction(item)}
                      >
                        {item.mapLocationId && <MapPin className="w-4 h-4" />}
                        {item.externalLink?.startsWith('mailto:') && <Mail className="w-4 h-4" />}
                        {item.externalLink && !item.externalLink.startsWith('mailto:') && <ExternalLink className="w-4 h-4" />}
                        {item.actionLabel || "Детальніше"}
                      </Button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-background relative overflow-y-auto overflow-x-hidden selection:bg-foreground selection:text-background pb-20">
      
      {/* 2026 Trend: Subtle Tech Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 pt-12 md:pt-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16 md:mb-24 animate-in fade-in slide-in-from-top-8 duration-1000">
          <div className="inline-flex items-center justify-center p-2 mb-4 bg-muted/50 rounded-full border border-border/50 backdrop-blur-sm">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-2">
              <Sparkles className="w-3 h-3" /> Довідник студента
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Гід по коледжу
          </h1>
          
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mx-auto font-medium">
            Загубився в коридорах чи шукаєш деканат? Тут ми зібрали всю необхідну інформацію, щоб ти почувався впевнено.
          </p>
        </div>

        {/* Content */}
        <FaqList />
      </div>
    </div>
  );
}