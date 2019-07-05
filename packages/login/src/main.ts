import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if(!customElements.get('login-pkg')) {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}
