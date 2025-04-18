export type TranslationKey = keyof (typeof translations)['en'];

export const translations = {
  en: {
    common: {
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      submit: 'Submit',
      cancel: 'Cancel',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
    navigation: {
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      support: 'Support',
    },
    form: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      project: 'Project',
      required: 'Required field',
      invalidEmail: 'Invalid email',
      minLength: 'Minimum {length} characters required',
      maxLength: 'Maximum {length} characters allowed',
    },
    support: {
      title: 'FredonBytes Tech Support',
      description: 'Fill out the form below to get in touch with our support team.',
      success: 'Your message has been sent successfully!',
      error: 'There was an error sending your message. Please try again.',
    },
    errors: {
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email',
      serverError: 'Server error occurred. Please try again later.',
    },
    home: {
      title: 'FredonBytes Tech Support',
      description:
        "Need help with one of our projects? Fill out the form below and we'll get back to you as soon as possible.",
    },
  },
  cs: {
    common: {
      language: 'Jazyk',
      theme: 'Téma',
      light: 'Světlý',
      dark: 'Tmavý',
      submit: 'Odeslat',
      cancel: 'Zrušit',
      loading: 'Načítání...',
      error: 'Chyba',
      success: 'Úspěch',
    },
    navigation: {
      home: 'Domů',
      about: 'O nás',
      contact: 'Kontakt',
      support: 'Podpora',
    },
    form: {
      name: 'Jméno',
      email: 'Email',
      subject: 'Předmět',
      message: 'Zpráva',
      project: 'Projekt',
      required: 'Povinné pole',
      invalidEmail: 'Neplatný email',
      minLength: 'Minimálně {length} znaků',
      maxLength: 'Maximálně {length} znaků',
    },
    support: {
      title: 'FredonBytes Technická Podpora',
      description: 'Vyplňte formulář níže pro kontakt s naším týmem podpory.',
      success: 'Vaše zpráva byla úspěšně odeslána!',
      error: 'Při odesílání zprávy došlo k chybě. Zkuste to prosím znovu.',
    },
    errors: {
      required: 'Toto pole je povinné',
      invalidEmail: 'Zadejte platný email',
      serverError: 'Došlo k chybě serveru. Zkuste to prosím později.',
    },
    home: {
      title: 'FredonBytes Technická Podpora',
      description:
        'Potřebujete pomoc s některým z našich projektů? Vyplňte formulář níže a my se vám ozveme co nejdříve.',
    },
  },
} as const;
