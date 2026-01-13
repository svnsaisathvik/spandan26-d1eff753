import { Trophy } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            <span className="font-display text-xl tracking-wider">SPORTS FEST '25</span>
          </div>
          <div className="text-sm text-primary-foreground/80 text-center">
            <p>January 22-25, 2025</p>
            <p className="mt-1">Intra-College Sports Championship</p>
          </div>
          <div className="text-xs text-primary-foreground/60">
            © 2025 Sports Committee
          </div>
        </div>
      </div>
    </footer>
  );
}
