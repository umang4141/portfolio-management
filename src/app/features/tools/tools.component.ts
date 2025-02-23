import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent {
  @Input() isDarkTheme = false;
  
  tools = [
    { icon: 'fas fa-cogs', label: 'Execution Algos' },
    { icon: 'fas fa-lightbulb', label: 'Research Ideas' },
    { icon: 'fas fa-chart-line', label: 'Stock SIP' },
    { icon: 'fas fa-rocket', label: 'Start with 100 Freedom SIP' },
    { icon: 'fas fa-basket', label: 'Basket Order' },
    { icon: 'fas fa-tools', label: 'Other Options' }
  ];
}