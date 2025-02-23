import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  isDarkTheme = false;
  language = 'en';
  notificationsEnabled = true;
  autoUpdateEnabled = false;
  privacyModeEnabled = false;
  dataSaverEnabled = false;
  locationAccessEnabled = false;
  backupEnabled = false;

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }

  changeLanguage(language: string): void {
    this.language = language;
  }

  toggleNotifications(): void {
    this.notificationsEnabled = !this.notificationsEnabled;
  }

  toggleAutoUpdate(): void {
    this.autoUpdateEnabled = !this.autoUpdateEnabled;
  }

  togglePrivacyMode(): void {
    this.privacyModeEnabled = !this.privacyModeEnabled;
  }

  toggleDataSaver(): void {
    this.dataSaverEnabled = !this.dataSaverEnabled;
  }

  toggleLocationAccess(): void {
    this.locationAccessEnabled = !this.locationAccessEnabled;
  }

  toggleBackup(): void {
    this.backupEnabled = !this.backupEnabled;
  }
}