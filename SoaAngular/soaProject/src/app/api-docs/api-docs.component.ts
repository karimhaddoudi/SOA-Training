import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var SwaggerUIBundle: any;

@Component({
  selector: 'app-api-docs',
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.css']
})
export class ApiDocsComponent implements OnInit {
  @ViewChild('swagger') swaggerElement?: ElementRef;

  ngOnInit(): void {
    this.initSwaggerUI();
  }

  private initSwaggerUI(): void {
    // Charger dynamiquement Swagger UI
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.js';
    script.onload = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css';
      document.head.appendChild(link);

      setTimeout(() => {
        if (typeof SwaggerUIBundle !== 'undefined') {
          SwaggerUIBundle({
            url: 'assets/swagger.yaml',
            dom_id: '#swagger-ui',
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIBundle.SwaggerUIStandalonePreset
            ],
            layout: 'BaseLayout',
            deepLinking: true
          });
        }
      }, 100);
    };
    document.head.appendChild(script);
  }
}
