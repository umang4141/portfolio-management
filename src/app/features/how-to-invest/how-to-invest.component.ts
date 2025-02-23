import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-to-invest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-to-invest.component.html',
  styleUrls: ['./how-to-invest.component.css']
})
export class HowToInvestComponent implements OnInit {
  sections: any[] = [];
  isLoading = false;
  currentPage = 1;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
      this.loadMore();
    }
  }

  ngOnInit(): void {
    this.loadInitialContent();
  }

  private loadInitialContent(): void {
    this.sections = this.generateSections(0, 5);
  }

  private loadMore(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      setTimeout(() => {
        const newSections = this.generateSections(this.currentPage * 5, 5);
        this.sections = [...this.sections, ...newSections];
        this.currentPage++;
        this.isLoading = false;
      }, 800);
    }
  }

  private generateSections(start: number, count: number): any[] {
    return Array(count).fill(0).map((_, i) => ({
      id: start + i,
      title: `Investment Strategy ${start + i + 1}`,
      type: ['basics', 'advanced', 'expert'][Math.floor(Math.random() * 3)],
      content: this.getContent(start + i)
    }));
  }

  private getContent(index: number): string {
    const contents = [
      'Understanding market fundamentals...',
      'Technical analysis basics...',
      'Portfolio diversification strategies...',
      'Risk management techniques...',
      'Long-term investment approaches...'
    ];
    return contents[index % contents.length];
  }
}