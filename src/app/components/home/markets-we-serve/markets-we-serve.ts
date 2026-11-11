
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-markets-we-serve',
  imports: [],
  templateUrl: './markets-we-serve.html',
  styleUrl: './markets-we-serve.css',
})
export class MarketsWeServe implements AfterViewInit {

  @ViewChild('marketTrack')
  marketTrack!: ElementRef<HTMLDivElement>;

  scrollProgress = 0;

  markets = [
    { name: 'Individual Buyers', icon: 'bi-people' },
    { name: 'Resellers', icon: 'bi-shop' },
    { name: 'Event Organisers', icon: 'bi-calendar-event' },
    { name: 'Catering Companies', icon: 'bi-cup-hot' },
    { name: 'Entertainment Venues', icon: 'bi-music-note-beamed' },
    { name: 'Retail Stores', icon: 'bi-basket' },
    { name: 'Bars', icon: 'bi-cup-straw' },
    { name: 'Restaurants', icon: 'bi-fork-knife' },
    { name: 'Forecourts', icon: 'bi-fuel-pump' },
    { name: 'Liquor Stores', icon: 'bi-bag' },
  ];

  ngAfterViewInit(): void {
    this.updateScrollProgress();
  }

  scrollMarkets(direction: number): void {
    const carousel = this.marketTrack.nativeElement;

    carousel.scrollBy({
      left: direction * (carousel.clientWidth * 0.75),
      behavior: 'smooth',
    });
  }

  updateScrollProgress(): void {
    const carousel = this.marketTrack.nativeElement;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    this.scrollProgress = maxScroll > 0
      ? (carousel.scrollLeft / maxScroll) * 100
      : 0;
  }

}
