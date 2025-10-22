import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type NewsCategory = 'news' | 'events' | 'announcements' | 'achievements';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: NewsCategory;
  excerpt: string;
  image?: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'Студенты ИКИТ заняли первое место на всероссийской олимпиаде по программированию',
    date: '20 октября 2025',
    category: 'achievements',
    excerpt: 'Команда института одержала победу в престижном соревновании, обойдя 50 команд из ведущих вузов страны.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Открытие новой лаборатории искусственного интеллекта',
    date: '18 октября 2025',
    category: 'news',
    excerpt: 'В институте состоялось торжественное открытие современной лаборатории для исследований в области ИИ и машинного обучения.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Приглашаем на День открытых дверей',
    date: '15 октября 2025',
    category: 'events',
    excerpt: '25 октября приглашаем школьников и их родителей познакомиться с нашим институтом, преподавателями и студентами.',
  },
  {
    id: 4,
    title: 'Изменение расписания занятий на период 23-27 октября',
    date: '14 октября 2025',
    category: 'announcements',
    excerpt: 'В связи с проведением научной конференции расписание занятий будет скорректировано. Подробности на сайте.',
  },
  {
    id: 5,
    title: 'Лекция приглашенного профессора из Стэнфорда',
    date: '12 октября 2025',
    category: 'events',
    excerpt: 'Профессор Джон Смит прочитает лекцию на тему "Будущее квантовых вычислений" в актовом зале.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Запуск нового образовательного курса по Data Science',
    date: '10 октября 2025',
    category: 'news',
    excerpt: 'Институт объявляет набор на новый курс повышения квалификации для студентов и специалистов.',
  }
];

const categoryLabels: Record<NewsCategory, string> = {
  news: 'Новости',
  events: 'События',
  announcements: 'Объявления',
  achievements: 'Достижения'
};

const categoryColors: Record<NewsCategory, string> = {
  news: 'bg-blue-500',
  events: 'bg-purple-500',
  announcements: 'bg-orange-500',
  achievements: 'bg-green-500'
};

export default function Index() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'all'>('all');

  const filteredNews = activeCategory === 'all' 
    ? mockNews 
    : mockNews.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">ИКИТ</h1>
                <p className="text-sm text-slate-600">Институт космических и информационных технологий</p>
              </div>
            </div>
          </div>
          
          <nav className="flex gap-1 pb-4 overflow-x-auto">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory('all')}
              className="whitespace-nowrap"
            >
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </Button>
            <Button
              variant={activeCategory === 'news' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory('news')}
              className="whitespace-nowrap"
            >
              <Icon name="Newspaper" size={16} className="mr-2" />
              Новости
            </Button>
            <Button
              variant={activeCategory === 'events' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory('events')}
              className="whitespace-nowrap"
            >
              <Icon name="Calendar" size={16} className="mr-2" />
              События
            </Button>
            <Button
              variant={activeCategory === 'announcements' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory('announcements')}
              className="whitespace-nowrap"
            >
              <Icon name="Megaphone" size={16} className="mr-2" />
              Объявления
            </Button>
            <Button
              variant={activeCategory === 'achievements' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory('achievements')}
              className="whitespace-nowrap"
            >
              <Icon name="Trophy" size={16} className="mr-2" />
              Достижения
            </Button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {activeCategory === 'all' ? 'Все публикации' : categoryLabels[activeCategory as NewsCategory]}
          </h2>
          <p className="text-slate-600">
            Актуальная информация о жизни института
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item, index) => (
            <Card 
              key={item.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item.image && (
                <div className="h-48 overflow-hidden bg-slate-200">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${categoryColors[item.category]} text-white`}>
                    {categoryLabels[item.category]}
                  </Badge>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    {item.date}
                  </span>
                </div>
                <CardTitle className="text-lg leading-tight hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {item.excerpt}
                </p>
                <Button variant="outline" size="sm" className="w-full group">
                  Читать далее
                  <Icon name="ArrowRight" size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <Icon name="FileQuestion" size={64} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Публикаций не найдено</h3>
            <p className="text-slate-500">В этом разделе пока нет материалов</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">ИКИТ СибГУ</h3>
              <p className="text-sm text-slate-600">
                Институт космических и информационных технологий
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Контакты</h3>
              <p className="text-sm text-slate-600">
                г. Красноярск<br />
                пр. им. газеты Красноярский Рабочий, 31
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Следите за нами</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon">
                  <Icon name="Mail" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Phone" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-slate-600">
            © 2025 ИКИТ СибГУ. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
