# FredonBytes Tech Support

Technical support portal for FredonBytes services.

## Features

- 🌍 Internationalization (cs/en)
- 🎨 Theme switching (light/dark)
- 📝 Support ticket submission
- ⚡ Next.js powered

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Localization

The application uses a custom localization system based on JSON files:

- Translations are stored in `public/locales/{cs,en}.json`
- Language detection order:
  1. Cookie (NEXT_LOCALE)
  2. Browser language
  3. Fallback to 'cs'
- Language switching is persisted in cookies

### Adding Translations

1. Add new translation keys to both `cs.json` and `en.json`
2. Use the `useTranslations` hook in your components:

```tsx
import { useTranslations } from '@/app/context/TranslationContext';

function MyComponent() {
  const { translations } = useTranslations();
  return <div>{translations.path.to.key}</div>;
}
```

### Adding New Language

1. Create a new JSON file in `public/locales/`
2. Copy the structure from an existing language file
3. Update `TranslationContext.tsx` to include the new language

## Theme Support

The application supports light and dark themes:

- Theme selection is persisted in localStorage
- Automatic system theme detection
- Manual toggle via ThemeSwitcher component

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
