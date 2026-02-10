import { useNavigate } from "react-router-dom";
import { BookOpen, MapPin, Building2, User, Landmark } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handbookData, type HandbookItem } from "@/config/handbookData";

export default function HandbookPage() {
    const navigate = useNavigate();

    // Групування даних за категоріями
    const categories = {
        administration: handbookData.filter(item => item.category === 'administration'),
        departments: handbookData.filter(item => item.category === 'departments'),
        infrastructure: handbookData.filter(item => item.category === 'infrastructure'),
    };

    const handleShowOnMap = (floorId: number, roomId: string) => {
        // Навігація на карту з параметрами (поки що просто перехід)
        // У майбутньому можна додати query params: ?floor={floorId}&highlight={roomId}
        navigate(`/?floor=${floorId}&room=${roomId}`);
    };

    return (
        <div className="container mx-auto px-4 md:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Заголовок */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-full">
                    <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Довідник</h1>
                    <p className="text-muted-foreground mt-1">
                        Знайдіть потрібний кабінет, кафедру або сервіс коледжу
                    </p>
                </div>
            </div>

            {/* Вкладки категорій */}
            <Tabs defaultValue="administration" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
                    <TabsTrigger value="administration" className="text-sm md:text-base">
                        <User className="w-4 h-4 mr-2 hidden sm:inline" />
                        Адміністрація
                    </TabsTrigger>
                    <TabsTrigger value="departments" className="text-sm md:text-base">
                        <Building2 className="w-4 h-4 mr-2 hidden sm:inline" />
                        Кафедри
                    </TabsTrigger>
                    <TabsTrigger value="infrastructure" className="text-sm md:text-base">
                        <Landmark className="w-4 h-4 mr-2 hidden sm:inline" />
                        Інфраструктура
                    </TabsTrigger>
                </TabsList>

                {/* Контент вкладок (Card List) */}
                <ScrollArea className="h-[600px] w-full rounded-md border p-4 bg-muted/20">
                    <TabsContent value="administration" className="mt-0 space-y-4">
                        <CategoryList items={categories.administration} onShowMap={handleShowOnMap} />
                    </TabsContent>
                    <TabsContent value="departments" className="mt-0 space-y-4">
                        <CategoryList items={categories.departments} onShowMap={handleShowOnMap} />
                    </TabsContent>
                    <TabsContent value="infrastructure" className="mt-0 space-y-4">
                        <CategoryList items={categories.infrastructure} onShowMap={handleShowOnMap} />
                    </TabsContent>
                </ScrollArea>
            </Tabs>

        </div>
    );
}

function CategoryList({ items, onShowMap }: { items: HandbookItem[], onShowMap: (f: number, r: string) => void }) {
    if (items.length === 0) {
        return <div className="text-center py-10 text-muted-foreground">Нічого не знайдено в цій категорії</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-start justify-between gap-2">
                            <span>{item.name}</span>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                            {item.location ? `Поверх ${item.location.floorId}, ауд. ${item.location.roomId}` : "Місце не вказано"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {item.description && (
                            <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                        )}

                        <Button
                            variant="outline"
                            className="w-full group"
                            onClick={() => item.location && onShowMap(item.location.floorId, item.location.roomId)}
                            disabled={!item.location}
                        >
                            <MapPin className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                            Показати на мапі
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
