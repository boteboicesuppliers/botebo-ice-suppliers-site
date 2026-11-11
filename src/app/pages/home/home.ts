import { Component } from '@angular/core';
import { Banner } from '../../components/home/banner/banner';
import { MarketsWeServe } from '../../components/home/markets-we-serve/markets-we-serve';
import { BusinessReach } from '../../components/home/business-reach/business-reach';
import { ContactFormHomePage } from '../../components/home/contact-form-home-page/contact-form-home-page';

@Component({
  selector: 'app-home',
  imports: [Banner, MarketsWeServe, BusinessReach, ContactFormHomePage],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}